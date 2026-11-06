// 身體數據計算核心（純函式，不碰畫面）
window.Calc = (function () {
  'use strict';

  const round = (v, d = 0) => { const k = Math.pow(10, d); return Math.round(v * k) / k; };

  // ---- BMI 與台灣（國健署）分級 ----
  function bmi(h, w) { return w / Math.pow(h / 100, 2); }

  function bmiClass(b) {
    if (b < 18.5) return { key: 'under', label: '體重過輕', color: 'warn' };
    if (b < 24) return { key: 'normal', label: '健康體位', color: 'good' };
    if (b < 27) return { key: 'over', label: '過重', color: 'warn' };
    if (b < 30) return { key: 'obese1', label: '輕度肥胖', color: 'bad' };
    if (b < 35) return { key: 'obese2', label: '中度肥胖', color: 'bad' };
    return { key: 'obese3', label: '重度肥胖', color: 'bad' };
  }

  // ---- 國健署每日熱量計算 ----
  // 實測反推（2026-11-06 送 10 組數值到 hpa.gov.tw 全部吻合）：
  // 目前體重 × 每公斤熱量；係數只看 BMI 三級與工作量，性別年齡不影響。
  const HPA_TABLE = {
    //        過輕 正常 過重/肥胖
    light:    [35, 30, 25],
    moderate: [40, 35, 30],
    heavy:    [45, 40, 35],
  };
  function hpaKcal(h, w, work) {
    const b = bmi(h, w);
    const idx = b < 18.5 ? 0 : (b < 24 ? 1 : 2);
    const perKg = HPA_TABLE[work][idx];
    return { kcal: Math.round(w * perKg), perKg, bmiIdx: idx };
  }

  // ---- 基礎代謝（Mifflin-St Jeor，目前公認最準的預測式）----
  function bmrMifflin(p) {
    return 10 * p.weight + 6.25 * p.height - 5 * p.age + (p.sex === 'M' ? 5 : -161);
  }

  // ---- 活動係數：工作量 + 每週運動次數 ----
  const PAL = [1.2, 1.375, 1.55, 1.725, 1.9];
  const PAL_LABEL = ['久坐', '輕度活動', '中度活動', '高度活動', '非常高度活動'];
  function palIndex(work, exFreq) {
    const w = { light: 0, moderate: 1, heavy: 2 }[work] || 0;
    const e = { none: 0, low: 1, mid: 2, high: 3 }[exFreq] || 0;
    return Math.min(4, w + e);
  }

  // ---- 體脂率 ----
  // 有腰圍+頸圍（女性再加臀圍）→ 美國海軍圍度法；否則用 Deurenberg BMI 推估式
  function bodyFatNavy(p) {
    const { sex, height: h, waist, neck, hip } = p;
    if (!waist || !neck) return null;
    if (sex === 'M') {
      if (waist - neck <= 0) return null;
      return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)) - 450;
    }
    if (!hip || waist + hip - neck <= 0) return null;
    return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(h)) - 450;
  }
  function bodyFatDeurenberg(p) {
    return 1.2 * bmi(p.height, p.weight) + 0.23 * p.age - 10.8 * (p.sex === 'M' ? 1 : 0) - 5.4;
  }
  function bodyFat(p) {
    if (p.measuredBf) return { pct: +p.measuredBf, method: '你輸入的實測值（體脂計/InBody）' };
    const navy = bodyFatNavy(p);
    if (navy && navy > 2 && navy < 70) return { pct: navy, method: '美國海軍圍度法（誤差約 ±3%）' };
    return { pct: Math.max(3, bodyFatDeurenberg(p)), method: 'Deurenberg BMI 推估式（誤差約 ±4–5%，量腰圍頸圍可更準）' };
  }

  function bodyFatClass(sex, pct) {
    // 國健署：成年男性 ≥25%、女性 ≥30% 為肥胖
    const t = sex === 'M'
      ? [[6, '偏低（過低）', 'warn'], [14, '運動員', 'good'], [18, '健美', 'good'], [25, '標準', 'good'], [99, '肥胖', 'bad']]
      : [[14, '偏低（過低）', 'warn'], [21, '運動員', 'good'], [25, '健美', 'good'], [30, '標準', 'good'], [99, '肥胖', 'bad']];
    for (const [lim, label, color] of t) if (pct < lim) return { label, color };
    return { label: '肥胖', color: 'bad' };
  }

  // ---- 骨骼肌重估算 ----
  // 骨骼肌約占除脂體重 54–57%（InBody 類 BIA 量測的成人平均比例），40 歲後每年約少 0.1%
  function skeletalMuscle(p, bfPct) {
    if (p.measuredSmm) return { kg: +p.measuredSmm, method: '你輸入的實測值' };
    const ffm = p.weight * (1 - bfPct / 100);
    const ratio = (p.sex === 'M' ? 0.565 : 0.54) - Math.max(0, p.age - 40) * 0.001;
    return { kg: ffm * ratio, method: '由除脂體重推估（僅供參考，InBody 量測較準）' };
  }

  // ---- 減重目標 ----
  function plan(p) {
    const h = p.height, w = p.weight;
    const b = bmi(h, w);
    const cls = bmiClass(b);
    const hpa = hpaKcal(h, w, p.work);
    const bmr = bmrMifflin(p);
    const pi = palIndex(p.work, p.exFreq);
    const tdee = bmr * PAL[pi];
    const bf = bodyFat(p);
    const bfCls = bodyFatClass(p.sex, bf.pct);
    const fatKg = w * bf.pct / 100;
    const ffm = w - fatKg;
    const smm = skeletalMuscle(p, bf.pct);
    const hm = h / 100;
    const idealW = 22 * hm * hm;
    const rangeLo = 18.5 * hm * hm, rangeHi = 24 * hm * hm;
    const target = p.targetWeight || Math.min(w, rangeHi);

    // 每週減重速度：每公斤脂肪約 7700 大卡
    const pace = +p.pace || 0.5;
    const losing = target < w - 0.1;
    const dailyDeficit = losing ? pace * 7700 / 7 : 0;
    const floor = p.sex === 'M' ? 1500 : 1200;
    let goalKcal = tdee - dailyDeficit;
    const warnings = [];
    if (losing && goalKcal < Math.max(bmr, floor)) {
      warnings.push(`依你設定的速度每天要少吃 ${round(dailyDeficit)} 大卡，會低於基礎代謝或安全下限，已自動調高到 ${round(Math.max(bmr, floor))} 大卡；建議把速度調慢或增加活動量。`);
      goalKcal = Math.max(bmr, floor);
    }
    if (losing && pace / w > 0.01) warnings.push('每週減重超過體重 1% 容易掉肌肉，建議放慢到每週 0.5–1%。');
    if (target < rangeLo) warnings.push(`目標體重低於健康範圍下限（${round(rangeLo, 1)} kg），不建議。`);
    const weeks = losing ? Math.ceil((w - target) / pace) : 0;

    // 三大營養素：依策略分配；BMI ≥27 時蛋白質以「目標體重」計，避免高估
    const mBase = b >= 27 ? target : w;
    const kcalR = Math.round(goalKcal / 10) * 10;
    const mac = macros(kcalR, p, mBase, w, warnings);
    const protein = mac.p, fat = mac.f, carb = mac.c;

    // 腰圍：國健署 男 ≥90、女 ≥80 為腹部肥胖；腰高比 ≥0.5 代謝風險升高
    let waistInfo = null;
    if (p.waist) {
      const lim = p.sex === 'M' ? 90 : 80;
      waistInfo = { over: p.waist >= lim, lim, whtr: p.waist / h };
    }

    return {
      bmi: b, cls, hpa, bmr, tdee, pal: PAL[pi], palLabel: PAL_LABEL[pi],
      bf, bfCls, fatKg, ffm, smm, smmPct: smm.kg / w * 100,
      idealW, rangeLo, rangeHi, target, pace, losing, dailyDeficit, weeks,
      goalKcal: kcalR, protein, fat, carb, macroMode: mac.mode, pPerKg: protein / w, fatMin: mac.fatMin,
      carbCycle: !!p.carbCycle,
      water: Math.round(w * 35 / 100) * 100, fiber: p.sex === 'M' ? 30 : 25,
      waistInfo, warnings,
    };
  }

  // ---- 三大營養素策略 ----
  const MACRO_MODES = {
    balanced:    { label: '均衡減脂', pKg: 1.8, fatPct: 0.25, desc: '蛋白質 1.8 g/kg、脂肪 25%、其餘碳水。最容易長期執行，大多數人的首選。' },
    highProtein: { label: '高蛋白',   pKg: 2.2, fatPct: 0.25, desc: '蛋白質 2.2 g/kg、脂肪 25%。飽足感最高、最能保住肌肉，適合有重訓、減脂後期。' },
    lowCarb:     { label: '低碳水',   pKg: 2.0, carbPct: 0.25, desc: '碳水約 25% 熱量、蛋白質 2.0 g/kg、其餘脂肪。適合不愛吃澱粉或血糖偏高者；高強度訓練表現可能下降。' },
    custom:      { label: '自訂比例', desc: '自己設定蛋白質與碳水的熱量百分比，脂肪自動補滿 100%。' },
  };
  // 每餐分配（早 25%、午 35%、晚 30%、點心 10%，宵夜不配額）
  const MEAL_SPLIT = { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10, late: 0 };

  function macros(kcal, p, base, weight, warnings) {
    const mode = MACRO_MODES[p.macroMode] ? p.macroMode : 'balanced';
    const m = MACRO_MODES[mode];
    let P, C, F;
    if (mode === 'custom') {
      const pp = +p.pPct || 30, cp = +p.cPct || 45;
      P = kcal * pp / 400; C = kcal * cp / 400; F = kcal * Math.max(0, 100 - pp - cp) / 900;
    } else if (m.carbPct) {
      P = m.pKg * base; C = kcal * m.carbPct / 4; F = (kcal - P * 4 - C * 4) / 9;
    } else {
      P = m.pKg * base; F = kcal * m.fatPct / 9; C = (kcal - P * 4 - F * 9) / 4;
    }
    // 安全下限：脂肪 ≥0.6 g/kg（荷爾蒙與脂溶性維生素）、蛋白質 ≥1.2 g/kg、碳水 ≥50 g（大腦與訓練）
    const fatMin = Math.round(0.6 * weight);
    if (F < fatMin) {
      warnings.push(`脂肪只剩 ${Math.round(F)} g，低於安全下限 ${fatMin} g（0.6 g/kg），已自動調高並從碳水扣除。長期脂肪太低會影響荷爾蒙與月經。`);
      C -= (fatMin - F) * 9 / 4; F = fatMin;
    }
    if (P < 1.2 * base) warnings.push(`蛋白質 ${Math.round(P)} g 只有 ${(P / base).toFixed(1)} g/kg，減脂期低於 1.2 g/kg 很容易掉肌肉，建議提高蛋白質比例。`);
    if (C < 50) { warnings.push('碳水低於 50 g，容易頭暈、訓練沒力，已調到 50 g。'); C = 50; }
    if (mode === 'custom' && (+p.pPct || 30) + (+p.cPct || 45) > 90) warnings.push('自訂比例的脂肪不到 10%，太低了，建議脂肪至少 20%。');
    return { mode, p: Math.round(P), c: Math.round(C), f: Math.round(F), fatMin };
  }

  // 某一天的目標。開啟「碳水循環」時：訓練日碳水 +20%，休息日依訓練天數扣回，
  // 蛋白質與脂肪不變，一週總熱量與基準相同（不會吃掉減脂赤字）
  function dayTargets(pl, isTraining, nTrain) {
    const t = { kcal: pl.goalKcal, p: pl.protein, c: pl.carb, f: pl.fat, label: '' };
    const n = nTrain == null ? 4 : nTrain;
    if (!pl.carbCycle || n <= 0 || n >= 7) return t;
    let up = Math.round(pl.carb * 0.2);
    let down = up * n / (7 - n);
    const restMin = Math.max(50, pl.carb * 0.5);        // 休息日碳水不低於 50 g，也不低於平常的一半
    if (pl.carb - down < restMin) { down = pl.carb - restMin; up = down * (7 - n) / n; }
    if (isTraining) { t.c = Math.round(pl.carb + up); t.label = '訓練日（高碳）'; }
    else { t.c = Math.round(pl.carb - down); t.label = '休息日（低碳）'; }
    t.kcal = Math.round((t.p * 4 + t.c * 4 + t.f * 9) / 10) * 10;
    return t;
  }

  // 運動消耗：MET × 體重 × 小時
  function burn(met, weight, minutes) { return met * weight * minutes / 60; }

  return { round, bmi, bmiClass, hpaKcal, bmrMifflin, bodyFat, bodyFatClass, skeletalMuscle, plan, burn, dayTargets, PAL, PAL_LABEL, MACRO_MODES, MEAL_SPLIT };
})();
