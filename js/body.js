// 身體數據頁：個人資料、國健署熱量、BMR/TDEE、體脂、骨骼肌、減重目標、體重紀錄
window.BodyPage = (function () {
  'use strict';
  const { esc, num, $, $$ } = U;

  const WORK = [
    ['light', '輕度工作', '大多坐著：上班族、家管、銷售員'],
    ['moderate', '中度工作', '站立走動多：保母、護理師、服務生'],
    ['heavy', '重度工作', '粗重體力：農漁業、建築、搬家工人、運動員'],
  ];
  const EX = [['none', '幾乎不運動'], ['low', '每週 1–3 次'], ['mid', '每週 3–5 次'], ['high', '每週 6–7 次']];
  const PACE = [[0.25, '0.25 kg（溫和）'], [0.5, '0.5 kg（建議）'], [0.75, '0.75 kg（積極）'], [1, '1 kg（激進）']];

  function seg(name, opts, val) {
    return `<div class="seg" data-seg="${name}">${opts.map(([v, l]) =>
      `<button type="button" data-v="${v}" class="${String(v) === String(val) ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  }

  function render() {
    const p = Store.get().profile;
    const el = $('#page-body');
    el.innerHTML = `
      <div class="page-head"><div><h1>📊 身體數據</h1><p class="muted">輸入基本資料，即時算出每日熱量需求、體脂肪與骨骼肌估算，並給出減脂目標。</p></div></div>
      <div class="grid" style="grid-template-columns: 380px 1fr; align-items:start">
        <div class="grid">
          <div class="card">
            <h2>基本資料</h2>
            <div class="grid" style="gap:12px">
              <label class="f"><span>性別</span>${seg('sex', [['M', '男'], ['F', '女']], p.sex)}</label>
              <div class="grid g3 m3" style="gap:10px">
                <label class="f"><span>年齡（歲）</span><input data-k="age" type="number" min="15" max="100" value="${esc(p.age)}"></label>
                <label class="f"><span>身高（cm）</span><input data-k="height" type="number" min="120" max="230" step="0.1" value="${esc(p.height)}"></label>
                <label class="f"><span>體重（kg）</span><input data-k="weight" type="number" min="30" max="250" step="0.1" value="${esc(p.weight)}"></label>
              </div>
              <label class="f"><span>工作量（國健署分類）</span>
                <select data-k="work">${WORK.map(([v, l, d]) => `<option value="${v}" ${p.work === v ? 'selected' : ''}>${l}－${d}</option>`).join('')}</select></label>
              <label class="f"><span>運動頻率（每次 30 分鐘以上）</span>${seg('exFreq', EX, p.exFreq)}</label>
              <label class="f"><span>訓練程度（會調整菜單組數）</span>${seg('level', [['新手', '新手'], ['中階', '中階'], ['進階', '進階']], p.level)}</label>
            </div>
          </div>
          <div class="card">
            <h2>圍度與實測值 <span class="pill gray">選填</span></h2>
            <p class="muted small">量了腰圍、頸圍（女性加臀圍），體脂改用美國海軍圍度法，準確度明顯提高。腰圍量肚臍上緣、吐氣後；頸圍量喉結下方。</p>
            <div class="grid g3 m3" style="gap:10px">
              <label class="f"><span>腰圍 cm</span><input data-k="waist" type="number" step="0.5" value="${esc(p.waist)}"></label>
              <label class="f"><span>頸圍 cm</span><input data-k="neck" type="number" step="0.5" value="${esc(p.neck)}"></label>
              <label class="f"><span>臀圍 cm</span><input data-k="hip" type="number" step="0.5" value="${esc(p.hip)}"></label>
            </div>
            <div class="grid g2 m2" style="gap:10px; margin-top:10px">
              <label class="f"><span>實測體脂率 %（InBody）</span><input data-k="measuredBf" type="number" step="0.1" value="${esc(p.measuredBf)}"></label>
              <label class="f"><span>實測骨骼肌 kg（InBody）</span><input data-k="measuredSmm" type="number" step="0.1" value="${esc(p.measuredSmm)}"></label>
            </div>
          </div>
          <div class="card">
            <h2>減重目標</h2>
            <div class="grid" style="gap:12px">
              <label class="f"><span>目標體重（kg，留空＝健康體位上限）</span><input data-k="targetWeight" type="number" step="0.1" value="${esc(p.targetWeight)}"></label>
              <label class="f"><span>每週減重速度</span>${seg('pace', PACE, p.pace)}</label>
            </div>
          </div>
        </div>
        <div id="bodyResult"></div>
      </div>`;

    $$('input[data-k], select[data-k]', el).forEach(inp => inp.addEventListener('input', () => {
      const k = inp.dataset.k;
      const numeric = inp.type === 'number';
      p[k] = numeric ? (inp.value === '' ? '' : +inp.value) : inp.value;
      if (k === 'weight' && +inp.value > 0) Store.get().weights[U.today()] = +inp.value;
      Store.save(); renderResult(); App.refresh('body');
    }));
    $$('.seg', el).forEach(s => s.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', s).forEach(x => x.classList.toggle('on', x === b));
      const k = s.dataset.seg;
      p[k] = k === 'pace' ? +b.dataset.v : b.dataset.v;
      Store.save(); renderResult(); App.refresh('body');
    }));
    renderResult();
  }

  function valid(p) { return p.height > 100 && p.weight > 25 && p.age >= 10; }

  function renderResult() {
    const p = Store.get().profile;
    const box = $('#bodyResult');
    if (!valid(p)) { box.innerHTML = `<div class="card"><p class="muted">請輸入完整的年齡、身高、體重。</p></div>`; return; }
    const r = Calc.plan(p);
    const bmiPos = Math.max(0, Math.min(100, (r.bmi - 15) / (40 - 15) * 100));
    const hpaCols = ['體重過輕', '正常體重', '過重或肥胖'];
    const hpaRows = [['light', '輕度工作', [35, 30, 25]], ['moderate', '中度工作', [40, 35, 30]], ['heavy', '重度工作', [45, 40, 35]]];

    box.innerHTML = `
      <div class="grid g3 mb">
        <div class="stat hl"><div class="label">國健署每日所需熱量</div><div class="value">${num(r.hpa.kcal)}<small>大卡</small></div><div class="sub">${num(p.weight, 1)} kg × ${r.hpa.perKg} 大卡/kg</div></div>
        <div class="stat"><div class="label">減脂建議每日攝取</div><div class="value" style="color:var(--brand)">${num(r.goalKcal)}<small>大卡</small></div><div class="sub">${r.losing ? `每天少 ${num(r.dailyDeficit)} 大卡 → 每週約 −${r.pace} kg` : '已達目標，維持即可'}</div></div>
        <div class="stat"><div class="label">BMI</div><div class="value">${num(r.bmi, 1)} <span class="pill ${r.cls.color}">${r.cls.label}</span></div>
          <div class="gauge"><i style="left:${bmiPos}%"></i></div><div class="gauge-l"><span>15</span><span>18.5</span><span>24</span><span>27</span><span>40</span></div></div>
      </div>
      <div class="grid g4 mb">
        <div class="stat"><div class="label">基礎代謝 BMR</div><div class="value">${num(r.bmr)}<small>大卡</small></div><div class="sub">躺著不動一天的消耗</div></div>
        <div class="stat"><div class="label">每日總消耗 TDEE</div><div class="value">${num(r.tdee)}<small>大卡</small></div><div class="sub">BMR × ${r.pal}（${r.palLabel}）</div></div>
        <div class="stat"><div class="label">體脂率（估）</div><div class="value">${num(r.bf.pct, 1)}<small>%</small></div><div class="sub"><span class="pill ${r.bfCls.color}">${r.bfCls.label}</span> 脂肪 ${num(r.fatKg, 1)} kg</div></div>
        <div class="stat"><div class="label">骨骼肌重（估）</div><div class="value">${num(r.smm.kg, 1)}<small>kg</small></div><div class="sub">骨骼肌率 ${num(r.smmPct, 1)}%．除脂體重 ${num(r.ffm, 1)} kg</div></div>
      </div>

      <div class="grid mb" style="grid-template-columns: minmax(0,1fr) minmax(0,1.5fr)">
        <div class="card">
          <h2>🎯 減脂計畫</h2>
          <table class="t">
            <tr><td>健康體重範圍（BMI 18.5–24）</td><td class="r"><b>${num(r.rangeLo, 1)} – ${num(r.rangeHi, 1)} kg</b></td></tr>
            <tr><td>理想體重（BMI 22）</td><td class="r">${num(r.idealW, 1)} kg</td></tr>
            <tr><td>目標體重</td><td class="r"><b>${num(r.target, 1)} kg</b>（${r.losing ? '−' + num(p.weight - r.target, 1) + ' kg' : '已達成'}）</td></tr>
            <tr><td>預估需要</td><td class="r">${r.losing ? `<b>${r.weeks} 週</b>（約 ${num(r.weeks / 4.3, 1)} 個月）` : '—'}</td></tr>
            <tr><td>每日喝水</td><td class="r">${num(r.water)} ml 以上</td></tr>
            <tr><td>每日膳食纖維</td><td class="r">${r.fiber} g 以上</td></tr>
          </table>
          ${r.warnings.length ? `<ul class="tips" style="margin-top:12px">${r.warnings.map(w => `<li class="warn">${esc(w)}</li>`).join('')}</ul>` : ''}
        </div>
        ${macroCard(r, p)}
      </div>

      <div class="grid g2 mb">
        <div class="card">
          <h2>國健署計算方式</h2>
          <p class="muted small">每日所需熱量 ＝ 目前體重 × 每公斤所需熱量（依工作量與 BMI 分級查表）。你的位置已標出：</p>
          <table class="t">
            <tr><th>工作量 ＼ 體位</th>${hpaCols.map(c => `<th class="r">${c}</th>`).join('')}</tr>
            ${hpaRows.map(([k, l, v]) => `<tr><td>${l}</td>${v.map((x, i) => `<td class="r">${k === p.work && i === r.hpa.bmiIdx ? `<span class="pill bad">${x} 大卡</span>` : x}</td>`).join('')}</tr>`).join('')}
          </table>
          <p class="muted tiny" style="margin-top:8px">國健署這個數字是「維持目前狀態」的參考量，過重者已用較低係數。想更精準減脂，請以右上「減脂建議攝取」為準（Mifflin-St Jeor 公式 × 活動係數 − 赤字）。</p>
        </div>
        <div class="card">
          <h2>體組成說明</h2>
          <table class="t">
            <tr><td>體脂率算法</td><td>${esc(r.bf.method)}</td></tr>
            <tr><td>骨骼肌算法</td><td>${esc(r.smm.method)}</td></tr>
            ${r.waistInfo ? `<tr><td>腰圍</td><td>${num(p.waist, 1)} cm ${r.waistInfo.over ? `<span class="pill bad">腹部肥胖（≥${r.waistInfo.lim}）</span>` : `<span class="pill good">正常（＜${r.waistInfo.lim}）</span>`}</td></tr>
            <tr><td>腰高比</td><td>${num(r.waistInfo.whtr, 2)} ${r.waistInfo.whtr >= 0.5 ? '<span class="pill warn">≥0.5 代謝風險升高</span>' : '<span class="pill good">良好</span>'}</td></tr>` : `<tr><td>腰圍</td><td class="muted">未填（國健署：男 ≥90、女 ≥80 cm 為腹部肥胖）</td></tr>`}
          </table>
          <p class="muted tiny" style="margin-top:8px">體脂與骨骼肌是用公式推估的，每 2–4 週用同一台體脂計、同一時段（早上空腹如廁後）量，看「趨勢」比看單次數字重要。</p>
        </div>
      </div>
      ${weightCard(r)}`;

    $$('[data-mseg] button').forEach(b => b.addEventListener('click', () => {
      p.macroMode = b.dataset.v; Store.save(); renderResult();
    }));
    $$('[data-mk]').forEach(inp => inp.addEventListener('change', () => {
      const k = inp.dataset.mk;
      p[k] = inp.type === 'checkbox' ? inp.checked : +inp.value;
      Store.save(); renderResult();
    }));

    const btn = $('#wSave');
    if (btn) btn.addEventListener('click', () => {
      const d = $('#wDate').value, v = +$('#wVal').value;
      if (!d || !(v > 25)) { U.toast('請輸入正確的日期與體重'); return; }
      Store.get().weights[d] = v;
      if (d >= U.today() || d === latestDate()) { p.weight = v; }
      Store.save(); render(); App.refresh('body'); U.toast('體重已記錄');
    });
    $$('[data-delw]').forEach(b => b.addEventListener('click', () => {
      delete Store.get().weights[b.dataset.delw]; Store.save(); renderResult();
    }));
  }

  function latestDate() { const ks = Object.keys(Store.get().weights).sort(); return ks[ks.length - 1]; }

  function macroCard(r, p) {
    const M = Calc.MACRO_MODES;
    const rows = [['蛋白質', r.protein, 4, 'p'], ['碳水化合物', r.carb, 4, 'c'], ['脂肪', r.fat, 9, 'f']];
    const nT = U.trainDays();
    const tr = Calc.dayTargets(r, true, nT), rs = Calc.dayTargets(r, false, nT);
    const base = r.bmi >= 27 ? r.target : p.weight;
    const meals = [['breakfast', '早餐'], ['lunch', '午餐'], ['dinner', '晚餐'], ['snack', '點心']];
    const fp = Math.max(0, 100 - (+p.pPct || 30) - (+p.cPct || 45));
    return `<div class="card">
      <h2>🍽️ 三大營養素目標</h2>
      <div class="seg" data-mseg style="margin-bottom:8px">${Object.keys(M).map(k => `<button type="button" data-v="${k}" class="${r.macroMode === k ? 'on' : ''}">${M[k].label}</button>`).join('')}</div>
      <p class="muted small">${esc(M[r.macroMode].desc)}${r.bmi >= 27 ? `　BMI ≥27 時蛋白質以目標體重 ${num(r.target, 1)} kg 計算，避免高估。` : ''}</p>
      ${r.macroMode === 'custom' ? `<div class="row small" style="margin-bottom:8px">蛋白質 <input data-mk="pPct" type="number" min="10" max="60" value="${esc(p.pPct)}" style="width:64px">%
        碳水 <input data-mk="cPct" type="number" min="5" max="70" value="${esc(p.cPct)}" style="width:64px">%
        脂肪 <b>${fp}%</b>（自動）</div>` : ''}
      <table class="t" style="white-space:nowrap">
        <tr><th>營養素</th><th class="r">每日克數</th><th class="r">每公斤${r.bmi >= 27 ? '目標' : ''}體重</th><th class="r">熱量</th><th style="width:34%">占比</th></tr>
        ${rows.map(([n, g, k, cls]) => { const pct = Math.round(g * k / r.goalKcal * 100); return `<tr><td>${n}</td><td class="r"><b>${g} g</b></td><td class="r">${num(g / base, 1)} g/kg</td><td class="r">${num(g * k)}</td>
          <td><div class="row" style="gap:6px;flex-wrap:nowrap"><div class="bar ${cls}" style="flex:1"><i style="width:${pct}%"></i></div><small>${pct}%</small></div></td></tr>`; }).join('')}
      </table>
      <label class="row small" style="margin-top:12px"><input type="checkbox" data-mk="carbCycle" ${p.carbCycle ? 'checked' : ''}> <b>訓練日／休息日碳水循環</b><span class="muted">（依「訓練菜單」的週課表自動切換）</span></label>
      ${p.carbCycle ? `<p class="muted tiny" style="margin:4px 0 0">練的那天多吃碳水補肝醣、提升訓練表現；休息日少吃。蛋白質、脂肪不變，依每週訓練 ${nT} 天計算，<b>一週總熱量與平常相同</b>。${nT === 0 || nT === 7 ? '（目前週課表沒有休息日或沒有訓練日，循環不會生效）' : ''}</p>
      <table class="t small" style="margin-top:6px;white-space:nowrap">
        <tr><th></th><th class="r">熱量</th><th class="r">蛋白質</th><th class="r">碳水</th><th class="r">脂肪</th></tr>
        <tr><td>🏋️ ${tr.label}</td><td class="r">${num(tr.kcal)}</td><td class="r">${tr.p} g</td><td class="r"><b>${tr.c} g</b></td><td class="r">${tr.f} g</td></tr>
        <tr><td>😴 ${rs.label}</td><td class="r">${num(rs.kcal)}</td><td class="r">${rs.p} g</td><td class="r"><b>${rs.c} g</b></td><td class="r">${rs.f} g</td></tr></table>` : ''}
      <details style="margin-top:10px"><summary>每餐分配建議（早 25%／午 35%／晚 30%／點心 10%）</summary>
        <table class="t small" style="margin-top:6px"><tr><th>餐別</th><th class="r">熱量</th><th class="r">蛋白質</th><th class="r">碳水</th><th class="r">脂肪</th></tr>
        ${meals.map(([k, l]) => { const s = Calc.MEAL_SPLIT[k]; return `<tr><td>${l}</td><td class="r">${num(r.goalKcal * s)}</td><td class="r">${Math.round(r.protein * s)} g</td><td class="r">${Math.round(r.carb * s)} g</td><td class="r">${Math.round(r.fat * s)} g</td></tr>`; }).join('')}</table></details>
      <ul class="tips" style="margin-top:12px">
        <li class="info"><b>蛋白質</b>：平均分到三餐，每餐約 ${Math.round(r.protein * 0.3)} g（一個手掌大的雞胸／魚約 25–30 g），一餐吃太多吸收效率反而差。</li>
        <li class="info"><b>碳水</b>：優先選糙米、地瓜、燕麥、水果等原型食物；集中在早餐與訓練前後，晚餐（非訓練後）減半。</li>
        <li class="info"><b>脂肪</b>：不要低於 ${r.fatMin} g；多從魚、堅果、橄欖油、酪梨來，少吃油炸與肥肉。</li>
      </ul>
    </div>`;
  }

  function weightCard(r) {
    const w = Store.get().weights;
    const keys = Object.keys(w).sort();
    const last = keys.slice(-60);
    return `<div class="card">
      <div class="row between"><h2>⚖️ 體重紀錄</h2>
        <div class="row"><input id="wDate" type="date" value="${U.today()}"><input id="wVal" type="number" step="0.1" placeholder="kg" style="width:90px" value="${esc(Store.get().profile.weight)}"><button id="wSave">記錄</button></div></div>
      ${last.length >= 2 ? weightChart(last.map(k => [k, w[k]]), r.target) : `<p class="muted">記錄 2 天以上就會出現趨勢圖。建議每天早上起床如廁後、吃東西前量。</p>`}
      ${keys.length ? `<details style="margin-top:8px"><summary>全部紀錄（${keys.length} 筆）</summary><table class="t">${keys.slice().reverse().map(k => `<tr><td>${k}</td><td class="r">${num(w[k], 1)} kg</td><td class="r"><button class="icon" data-delw="${k}">✕</button></td></tr>`).join('')}</table></details>` : ''}
    </div>`;
  }

  function weightChart(pts, target) {
    const W = 760, H = 220, L = 40, R = 12, T = 12, B = 26;
    const vals = pts.map(p => p[1]).concat([target]);
    const lo = Math.floor(Math.min(...vals) - 1), hi = Math.ceil(Math.max(...vals) + 1);
    const x = i => L + (W - L - R) * (pts.length === 1 ? 0.5 : i / (pts.length - 1));
    const y = v => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
    // 7 日移動平均：每天體重會因水分波動 1–2 kg，看平均線才準
    const ma = pts.map((_, i) => { const s = pts.slice(Math.max(0, i - 6), i + 1); return s.reduce((a, b) => a + b[1], 0) / s.length; });
    const path = arr => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
    const ticks = [];
    for (let v = lo; v <= hi; v += Math.max(1, Math.round((hi - lo) / 5))) ticks.push(v);
    const step = Math.max(1, Math.ceil(pts.length / 8));
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="體重趨勢">
      ${ticks.map(v => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join('')}
      <line x1="${L}" x2="${W - R}" y1="${y(target)}" y2="${y(target)}" stroke="var(--good)" stroke-dasharray="6 4" stroke-width="2"/>
      <text x="${W - R}" y="${y(target) - 5}" text-anchor="end" style="fill:var(--good)">目標 ${target.toFixed(1)}</text>
      <path d="${path(pts.map(p => p[1]))}" fill="none" stroke="var(--brand)" stroke-opacity=".35" stroke-width="1.5"/>
      ${pts.map((p, i) => `<circle cx="${x(i)}" cy="${y(p[1])}" r="3" fill="var(--brand)"><title>${p[0]}：${p[1]} kg</title></circle>`).join('')}
      <path d="${path(ma)}" fill="none" stroke="var(--brand)" stroke-width="3"/>
      ${pts.map((p, i) => i % step === 0 || i === pts.length - 1 ? `<text x="${x(i)}" y="${H - 6}" text-anchor="middle">${p[0].slice(5)}</text>` : '').join('')}
    </svg><p class="muted tiny">粗線＝7 日平均（看這條就好，單日起伏多半是水分）；淡線點＝每日實測。</p>`;
  }

  return { render };
})();
