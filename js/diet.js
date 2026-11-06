// 飲食頁：搜尋/一句話輸入 → 拆解成食物 → 熱量總結 → 依狀態給建議
window.DietPage = (function () {
  'use strict';
  const { esc, num, $, $$ } = U;

  const MEALS = [['breakfast', '🌅 早餐'], ['lunch', '☀️ 午餐'], ['dinner', '🌆 晚餐'], ['snack', '🍎 點心'], ['late', '🌙 宵夜']];
  let curDate = U.today();
  let curMeal = defaultMeal();

  function defaultMeal() {
    const h = new Date().getHours();
    return h < 10 ? 'breakfast' : h < 14 ? 'lunch' : h < 17 ? 'snack' : h < 21 ? 'dinner' : 'late';
  }
  const SUPP_QUICK = [['whey_protein', '🥤 乳清'], ['whey_isolate', '分離乳清'], ['protein_rtd', '高蛋白飲'], ['bcaa', 'BCAA'], ['eaa', 'EAA'], ['creatine', '💊 肌酸'], ['pre_workout', '訓練前補劑'], ['fish_oil', '魚油']];
  const FOODS = () => (window.FOOD_DB || []).concat(Store.get().customFoods || []);
  const PRESETS = () => window.MEAL_PRESETS || [];
  const foodById = id => FOODS().find(f => f.id === id);

  // ---- 搜尋索引與比對 ----
  function entries() {
    const list = [];
    PRESETS().forEach(p => list.push({ type: 'preset', ref: p, names: [p.name].concat(p.aliases || []) }));
    FOODS().forEach(f => list.push({ type: 'food', ref: f, names: [f.name].concat(f.aliases || []) }));
    return list;
  }
  function score(names, q) {
    let best = 0;
    for (const n of names) {
      if (!n) continue;
      if (n === q) best = Math.max(best, 100);
      else if (n.startsWith(q)) best = Math.max(best, 80 - (n.length - q.length));
      else if (n.includes(q)) best = Math.max(best, 60 - (n.length - q.length));
      else if (q.includes(n) && n.length >= 2) best = Math.max(best, 40 + n.length * 3);
    }
    return best;
  }
  function search(q, limit = 12) {
    q = q.trim(); if (!q) return [];
    return entries().map(e => ({ e, raw: score(e.names, q) }))
      .filter(x => x.raw > 0).map(x => Object.assign(x, { s: x.raw + (x.e.type === 'preset' ? 3 : 0) }))
      .sort((a, b) => b.s - a.s).slice(0, limit).map(x => x.e);
  }
  function entryKcal(e) {
    if (e.type === 'food') return e.ref.kcal;
    return e.ref.items.reduce((s, it) => s + ((foodById(it.food) || {}).kcal || 0) * it.qty, 0);
  }

  // 「2顆滷蛋」「滷蛋x2」「半碗飯」→ { name, qty }
  const CN = { 一: 1, 兩: 2, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 半: 0.5 };
  function parseQty(seg) {
    let qty = 1, s = seg.trim();
    // 阿拉伯數字單位可省略（2茶葉蛋）；國字數量一定要接單位，避免「半糖珍奶」的半被當成 0.5
    let m = s.match(/^(\d+(?:\.\d+)?)\s*(?:個|顆|碗|杯|份|塊|片|支|隻|條|根|盤|串|粒|瓶|包)?|^([一兩二三四五六半])\s*(?:個|顆|碗|杯|份|塊|片|支|隻|條|根|盤|串|粒|瓶|包)/);
    if (m && m[2]) m[1] = m[2];
    if (m && m[0]) { qty = CN[m[1]] || +m[1]; s = s.slice(m[0].length); }
    m = s.match(/(?:[x×*＊]\s*(\d+(?:\.\d+)?)|(\d+)\s*(?:個|顆|碗|杯|份|塊|片|支|條|串)$)/i);
    if (m) { qty = +(m[1] || m[2]); s = s.replace(m[0], ''); }
    return { name: s.trim(), qty: qty || 1 };
  }

  // ---- 加入紀錄 ----
  function dayLog(date) {
    const fl = Store.get().foodLog;
    if (!fl[date]) fl[date] = {};
    MEALS.forEach(([k]) => { if (!fl[date][k]) fl[date][k] = []; });
    return fl[date];
  }
  function snap(f, qty, from) {
    const o = { fid: f.id, name: f.name, unit: f.unit, kcal: f.kcal, p: f.p, c: f.c, f: f.f, cat: f.cat, cook: f.cook || '', tags: f.tags || [], qty, from: from || '' };
    // 自訂食物（營養標示）多帶糖、鈉與每份公克數
    if (f.sugar != null) o.sugar = f.sugar;
    if (f.sodium != null) o.sodium = f.sodium;
    if (f.serving) { o.grams = f.serving; o.gUnit = f.servUnit || 'g'; }
    return o;
  }
  function addEntry(e, qty = 1, meal = curMeal) {
    const log = dayLog(curDate)[meal];
    if (e.type === 'food') log.push(snap(e.ref, qty));
    else e.ref.items.forEach(it => { const f = foodById(it.food); if (f) log.push(snap(f, it.qty * qty, e.ref.name)); });
    remember(e);
    Store.save();
  }
  function remember(e) {
    const st = Store.get();
    const r = (st.recentFoods || []).filter(x => !(x.type === e.type && x.id === e.ref.id));
    r.unshift({ type: e.type, id: e.ref.id });
    st.recentFoods = r.slice(0, 14);
  }
  function findEntry(x) {
    return x.type === 'preset' ? (PRESETS().find(p => p.id === x.id) && { type: 'preset', ref: PRESETS().find(p => p.id === x.id) })
      : (foodById(x.id) && { type: 'food', ref: foodById(x.id) });
  }

  // ---- 營養合計 ----
  function totals(items) {
    return items.reduce((t, it) => {
      t.kcal += it.kcal * it.qty; t.p += it.p * it.qty; t.c += it.c * it.qty; t.f += it.f * it.qty;
      if (it.sugar != null) { t.sugar += it.sugar * it.qty; t.sugarN++; }   // 只有有標示糖的食物才計入
      return t;
    }, { kcal: 0, p: 0, c: 0, f: 0, sugar: 0, sugarN: 0 });
  }
  function allItems(date) {
    const d = Store.get().foodLog[date]; if (!d) return [];
    return MEALS.flatMap(([k]) => (d[k] || []).map(it => Object.assign({ meal: k }, it)));
  }
  function dayTotal(date) { return totals(allItems(date)); }

  // ---- 建議引擎（營養師＋教練觀點）----
  function advise(date, plan) {
    const items = allItems(date);
    const tips = [];
    if (!items.length) return [{ cls: 'info', t: '還沒有紀錄。輸入吃了什麼（例如「雞腿飯、無糖綠茶」），我會幫你算熱量並給建議。' }];
    const tot = totals(items);
    const isToday = date === U.today();
    const hour = new Date().getHours();
    const dayOver = !isToday || hour >= 21;
    const tg = targetsFor(date, plan);
    const goal = tg.kcal;
    const diff = tot.kcal - goal;
    const walkMin = kcal => Math.round(kcal / Calc.burn(4.3, Store.get().profile.weight, 1));

    // 1. 總熱量
    if (diff > 100) tips.push({ cls: 'bad', t: `今天已超過目標 <b>${num(diff)} 大卡</b>，約等於快走 ${walkMin(diff)} 分鐘。不用餓下一餐補回來，明天回到計畫就好；偶爾超標不會毀掉進度，持續超標才會。` });
    else if (Math.abs(diff) <= goal * 0.08 && dayOver) tips.push({ cls: 'good', t: `熱量 ${num(tot.kcal)} 大卡，剛好落在目標附近，做得很好！` });
    else if (diff < 0 && isToday && !dayOver) tips.push({ cls: 'info', t: `今天還可以吃 <b>${num(-diff)} 大卡</b>。${nextMealHint(-diff, tg.p - tot.p, date)}` });
    if (dayOver && tot.kcal < plan.bmr * 0.85) tips.push({ cls: 'warn', t: `今天只吃 ${num(tot.kcal)} 大卡，低於基礎代謝（${num(plan.bmr)}）太多。長期吃太少會掉肌肉、代謝變慢、更容易復胖，請至少吃到 ${num(Math.min(goal, plan.bmr))} 大卡。` });

    // 2. 替換建議（同一食物只說一次）
    const seen = new Set();
    items.forEach(it => {
      const f = foodById(it.fid);
      if (!f || !f.swap || seen.has(f.id)) return;
      seen.add(f.id);
      const to = f.swap.to && foodById(f.swap.to);
      const save = to ? Math.round((f.kcal - to.kcal) * it.qty) : 0;
      tips.push({ cls: 'swap', t: `<b>${esc(f.name)}</b>：${esc(f.swap.tip)}${to && save >= 30 ? `（換成「${esc(to.name)}」約省 ${save} 大卡）` : ''}` });
    });

    // 3. 蛋白質
    const pPct = tot.p / tg.p;
    if (pPct >= 0.9) tips.push({ cls: 'good', t: `蛋白質 ${num(tot.p)} g，達到目標 ${tg.p} g 的 ${Math.round(pPct * 100)}%，有助於減脂時保住肌肉。` });
    else if (dayOver) tips.push({ cls: 'warn', t: `蛋白質只有 ${num(tot.p)} g（目標 ${tg.p} g，只達 ${Math.round(pPct * 100)}%）。蛋白質長期不足，減掉的會有很大比例是肌肉，代謝跟著下降。` });

    // 3-1. 三大營養素控制：超標找來源、不足給補法
    const cOver = tot.c - tg.c, fOver = tot.f - tg.f;
    if (cOver > tg.c * 0.15) tips.push({ cls: 'warn', t: `碳水 ${num(tot.c)} g，超過目標 ${tg.c} g 約 ${num(cOver)} g。主要來源：${topSources(items, 'c')}。下一餐澱粉減半，或改吃蛋白質＋青菜。` });
    if (fOver > tg.f * 0.15) tips.push({ cls: 'warn', t: `脂肪 ${num(tot.f)} g，超過目標 ${tg.f} g 約 ${num(fOver)} g（${num(fOver * 9)} 大卡）。主要來源：${topSources(items, 'f')}。改滷、蒸、烤，醬料另外放、肉去皮。` });
    if (dayOver && pPct >= 0.9 && Math.abs(cOver) <= tg.c * 0.15 && Math.abs(fOver) <= tg.f * 0.15)
      tips.push({ cls: 'good', t: `三大營養素都控制在目標 ±15% 內（蛋白質 ${num(tot.p)}／碳水 ${num(tot.c)}／脂肪 ${num(tot.f)} g），這就是減脂最理想的一天！` });
    if (isToday && !dayOver) { const fill = fillPlan(tg, tot); if (fill) tips.push({ cls: 'info', t: fill }); }

    // 4. 含糖飲料／油炸／酒精／宵夜
    const sugar = items.filter(it => (it.tags || []).includes('含糖飲料'));
    if (sugar.length) tips.push({ cls: 'warn', t: `含糖飲料 ${sugar.length} 杯共 ${num(sugar.reduce((s, it) => s + it.kcal * it.qty, 0))} 大卡，喝的熱量沒有飽足感，是減脂最容易省下的地方：改微糖→無糖，或改無糖茶、氣泡水。` });
    const fried = items.filter(it => it.cook === '炸' || (it.tags || []).includes('油炸'));
    if (fried.length >= 2) tips.push({ cls: 'bad', t: `今天吃了 ${fried.length} 樣油炸食物（${[...new Set(fried.map(i => i.name))].slice(0, 4).join('、')}），一天最多一樣，其他改滷、烤、蒸、水煮。` });
    else if (fried.length === 1) tips.push({ cls: 'info', t: `有一樣炸物（${esc(fried[0].name)}），可以去皮或把麵衣剝掉，熱量約少 1/3。` });
    if (items.some(it => (it.tags || []).includes('酒精'))) tips.push({ cls: 'warn', t: '酒精每克 7 大卡且會暫停脂肪代謝，減脂期盡量少喝；真的要喝選啤酒小杯或調酒不加糖漿，並搭配高蛋白下酒菜。' });
    const late = (Store.get().foodLog[date] || {}).late || [];
    if (late.length) tips.push({ cls: 'warn', t: `宵夜 ${num(totals(late).kcal)} 大卡。睡前 3 小時內進食會影響睡眠品質與隔天食慾；真的餓，選無糖豆漿、茶葉蛋、小番茄。` });

    // 4-1. 運動補充品（蛋白粉、胺基酸、肌酸、訓練前補劑）
    const has = id => items.some(it => it.fid === id);
    const hasPowder = items.some(it => MyFoods.isPowder(it));
    const supp = items.filter(it => it.cat === '補充品');
    if (supp.length) {
      const suppKcal = supp.reduce((s, it) => s + it.kcal * it.qty, 0);
      const suppP = supp.reduce((s, it) => s + it.p * it.qty, 0);
      tips.push({ cls: 'info', t: `補充品共 ${num(suppKcal)} 大卡、蛋白質 ${num(suppP)} g，已計入今天的總熱量。` });
      if (suppP > 30 && suppP / Math.max(1, tot.p) > 0.5) tips.push({ cls: 'warn', t: `今天有 ${Math.round(suppP / tot.p * 100)}% 的蛋白質來自補充品。雞蛋、魚、豆腐、肉類還有鐵、鋅、維生素 B12 和飽足感，蛋白粉當作「補不足」就好，一天 1–2 匙為宜。` });
      if (has('creatine')) tips.push({ cls: 'good', t: '肌酸 0 大卡，是研究證據最充足的補充品：每天 3–5 g，任何時間吃都可以，不必先「衝劑量」，重點是每天持續。前 2–4 週體重可能多 0.5–1.5 kg，那是肌肉裡的水分，不是變胖。有腎臟疾病請先問醫師。' });
      if (has('bcaa')) tips.push({ cls: 'info', t: tot.p >= tg.p * 0.8
        ? 'BCAA：你今天的蛋白質已經吃夠，額外喝 BCAA 幾乎沒有增肌效果，可以省下來。'
        : hasPowder
          ? 'BCAA：一匙乳清本身就含約 5 g BCAA，有喝乳清就不必再另外喝 BCAA；把錢省下來多吃一份原型蛋白質更有效。'
          : 'BCAA 只有 3 種胺基酸，單獨喝無法合成肌肉；空腹訓練想補，改用 EAA（9 種必需胺基酸）或直接一匙乳清更有效。' });
      if (has('eaa') && hasPowder) tips.push({ cls: 'info', t: 'EAA 和乳清同一天都有：乳清本身就是完整蛋白質，若蛋白質已達標，EAA 只在「空腹訓練」或「兩餐間隔很長」時才需要。' });
      if (has('pre_workout') || has('caffeine_tab')) {
        const cut = U.fmtMin(SleepPage.compute(Store.get().schedule, Store.get().profile).bed - 480);
        tips.push({ cls: 'warn', t: `訓練前補劑／咖啡因錠通常含 150–300 mg 咖啡因，請在 ${cut} 前喝（睡前 8 小時），一天咖啡因總量不超過 400 mg（含咖啡、茶）。` });
      }
      const wheyN = items.filter(it => MyFoods.isPowder(it)).reduce((s, it) => s + it.qty, 0);
      if (wheyN >= 3) tips.push({ cls: 'warn', t: `蛋白粉今天 ${num(wheyN, 1)} 份，偏多。蛋白質一餐吸收利用約 20–40 g 最有效率，多的會被當熱量燒掉或存起來。` });
    }

    // 5. 三大營養素比例
    if (tot.kcal > 300) {
      const fatPct = tot.f * 9 / tot.kcal;
      if (fatPct > 0.4 && fOver <= tg.f * 0.15) tips.push({ cls: 'info', t: `脂肪克數還在目標內，但占已吃熱量的 ${Math.round(fatPct * 100)}%，接下來的餐點選低脂的（雞胸、魚、豆腐、燙青菜）。` });
      const refined = items.filter(it => (it.tags || []).includes('精緻澱粉')).reduce((s, it) => s + it.qty, 0);
      if (refined >= 3) tips.push({ cls: 'info', t: '精緻澱粉（白飯、麵、麵包）偏多，其中一餐改糙米、地瓜、燕麥，飽足感更久、血糖較穩。' });
    }

    // 6. 蔬菜水果
    const veg = items.filter(it => it.cat === '蔬菜').reduce((s, it) => s + it.qty, 0);
    if (dayOver && veg < 3) tips.push({ cls: 'info', t: `蔬菜只有約 ${num(veg, 1)} 份，每天至少 3 份（煮熟約 1.5 碗）：便當可以請店家多給一格青菜，或晚餐加一盤燙青菜。` });
    const fruit = items.filter(it => it.cat === '水果').length;
    if (dayOver && !fruit) tips.push({ cls: 'info', t: '今天沒有水果，建議 2 份（約 2 個拳頭），芭樂、奇異果、蘋果的熱量低、纖維高。' });
    // 自訂食物有標示糖：衛福部建議添加糖不超過總熱量 10%（以目標熱量換算克數）
    const sugarLim = Math.round(goal * 0.1 / 4);
    if (tot.sugarN && tot.sugar > sugarLim * 0.5) tips.push({ cls: tot.sugar > sugarLim ? 'warn' : 'info', t: `有標示糖的食品合計糖 ${num(tot.sugar, 1)} g；每日糖建議不超過總熱量 10%（你約 ${sugarLim} g）${tot.sugar > sugarLim ? '，已經超過' : ''}。` });
    const salty = items.filter(it => (it.tags || []).includes('高鈉')).length;
    if (salty >= 3) tips.push({ cls: 'info', t: '高鈉食物偏多，明天體重可能因水腫多 0.5–1 kg，不用慌；多喝水、湯少喝。' });
    if (dayOver && !((Store.get().foodLog[date] || {}).breakfast || []).length && isToday) tips.push({ cls: 'info', t: '今天沒吃早餐。不吃早餐本身不會變胖，但若因此午晚餐吃更多就得不償失，可以準備茶葉蛋＋無糖豆漿。' });
    return tips;
  }

  // 當天目標（碳水循環時依週課表判斷訓練日／休息日）
  function targetsFor(date, plan) {
    return Calc.dayTargets(plan, !!TrainPage.planFor(date).main, U.trainDays());
  }

  // 某營養素貢獻最多的前 3 樣
  function topSources(items, key) {
    const m = {};
    items.forEach(it => { m[it.name] = (m[it.name] || 0) + it[key] * it.qty; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 3).filter(x => x[1] > 0)
      .map(([n, g]) => `${esc(n)} ${Math.round(g)} g`).join('、');
  }

  // 補齊建議：依還差的蛋白質／碳水／脂肪挑食物與份量，附「加入」按鈕
  const FILL = {
    p: [['chicken_breast', 28], ['greek_yogurt', 15], ['tofu_firm', 6.5], ['tea_egg', 7]],
    c: [['sweet_potato', 42], ['brown_rice', 56], ['banana', 22]],
    f: [['nuts_mixed', 13], ['avocado', 15]],
  };
  function fillPlan(tg, tot) {
    const gap = { p: tg.p - tot.p, c: tg.c - tot.c, f: tg.f - tot.f };
    let kcalLeft = tg.kcal - tot.kcal;
    if (kcalLeft < 80) return '';
    const parts = [], btns = [];
    const pick = (key, min, unitHint) => {
      if (gap[key] < min) return;
      const [id, per] = FILL[key].find(([fid]) => foodById(fid)) || [];
      const f = id && foodById(id); if (!f) return;
      const need = gap[key];
      // 份量以 0.5 為單位，且不超過剩餘熱量額度
      const maxQ = Math.floor(kcalLeft / Math.max(1, f.kcal) * 2) / 2;
      if (maxQ < 0.5) return;
      const qty = Math.min(maxQ, Math.max(0.5, Math.round(need / per * 2) / 2));
      kcalLeft -= f.kcal * qty;
      gap.p -= f.p * qty; gap.c -= f.c * qty; gap.f -= f.f * qty;   // 這樣食物同時補到的其他營養素也扣掉
      parts.push(`${unitHint} <b>${Math.round(need)} g</b> → ${esc(f.name)} ${qty} 份（${esc(f.unit)}，${num(f.kcal * qty)} 大卡）`);
      btns.push(`<button class="ghost small" data-fill="${id}:${qty}">＋${esc(f.name)}</button>`);
    };
    pick('p', 12, '蛋白質還差');
    pick('c', 25, '碳水還差');
    pick('f', 8, '脂肪還差');
    if (!parts.length) return '';
    const short = gap.p > 12 || gap.c > 40;
    const why = short ? `<br><span class="muted">熱量額度只夠補這些，今天會有缺口。明天把蛋白質排進早餐和午餐，含糖飲料、炸物先換掉，額度就夠了。</span>` : '';
    return `<b>今天還缺：</b><br>${parts.join('<br>')}${why}<div class="row" style="gap:6px;margin-top:6px">${btns.join('')}</div>`;
  }
  // 補齊按鈕在飲食頁與總覽頁都會出現，用事件委派
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-fill]'); if (!b) return;
    const [id, q] = b.dataset.fill.split(':'); const f = foodById(id); if (!f) return;
    curDate = U.today();
    addEntry({ type: 'food', ref: f }, +q, defaultMeal());
    U.toast(`已加入${MEALS.find(m => m[0] === defaultMeal())[1].slice(2)}：${f.name} ×${q}`);
    if (document.getElementById('page-diet').classList.contains('active')) renderDay(); else App.go(document.querySelector('#nav .active').dataset.page);
  });

  function nextMealHint(left, pLeft, date) {
    const d = Store.get().foodLog[date] || {};
    const next = !(d.lunch || []).length ? '午餐' : !(d.dinner || []).length ? '晚餐' : '下一餐';
    const pTxt = pLeft > 15 ? `，記得補足蛋白質約 ${Math.round(pLeft)} g` : '';
    if (left >= 650) return `${next}可以正常吃一個便當（建議滷雞腿或烤魚、飯 7 分滿、青菜加量）${pTxt}。`;
    if (left >= 400) return `${next}建議：超商雞胸肉＋地瓜＋沙拉（約 400 大卡），或健康餐盒${pTxt}。`;
    if (left >= 200) return `${next}吃清淡一點：燙青菜＋豆腐＋茶葉蛋，或無糖豆漿＋水果${pTxt}。`;
    return `額度快用完了，餓的話選無糖茶、小番茄、黃瓜、無糖豆漿${pTxt}。`;
  }

  // ---- 畫面 ----
  function render() {
    const el = $('#page-diet');
    el.innerHTML = `
      <div class="page-head">
        <div><h1>🍱 飲食紀錄</h1><p class="muted">打字搜尋或用一句話輸入，自動拆解熱量並給出營養建議。</p></div>
        <div class="row"><button class="ghost small" id="dPrev">◀</button><input type="date" id="dDate" value="${curDate}"><button class="ghost small" id="dNext">▶</button><button class="ghost small" id="dToday">今天</button></div>
      </div>
      <div class="grid" style="grid-template-columns: minmax(0,1.35fr) minmax(0,1fr); align-items:start">
        <div>
          <div class="card mb">
            <div class="row between mb"><h2 style="margin:0">新增食物</h2>
              <div class="seg" id="mealSeg">${MEALS.map(([k, l]) => `<button data-v="${k}" class="${k === curMeal ? 'on' : ''}">${l}</button>`).join('')}</div></div>
            <div class="search-wrap mb">
              <input id="fSearch" style="width:100%" placeholder="🔍 搜尋食物或便當，例如：雞腿飯、滷蛋、珍奶半糖">
              <div id="fSuggest" class="suggest" hidden></div>
            </div>
            <div class="row" style="align-items:stretch">
              <input id="fQuick" style="flex:1" placeholder="✍️ 一句話輸入：雞腿飯、2顆茶葉蛋、半糖珍奶">
              <button id="fQuickBtn">拆解加入</button>
            </div>
            <div id="quickMsg" class="small" style="margin-top:6px"></div>
            ${recentChips()}
            <div class="row" style="margin-top:8px; gap:6px" id="suppChips">${suppChips()}</div>
            <details id="mfDetails" style="margin-top:10px"><summary>🧾 依營養標示新增／管理我的食物（蛋白粉、包裝食品）${MyFoods.list().length ? `．已存 ${MyFoods.list().length} 項` : ''}</summary>
              <div id="mfMount" style="margin-top:10px"></div></details>
          </div>
          <div id="mealList"></div>
        </div>
        <div>
          <div class="card mb" id="dSummary"></div>
          <div class="card mb"><h2>🧑‍⚕️ 教練與營養師建議</h2><ul class="tips" id="dTips"></ul></div>
          <div class="card"><h2>近 7 天熱量</h2><div id="dWeek"></div></div>
        </div>
      </div>`;
    if (!window.FOOD_DB) $('#quickMsg').innerHTML = '<span class="pill bad">找不到 data/foods.js，食物資料庫沒有載入</span>';
    bind(el);
    renderDay();
  }

  function recentChips() {
    const r = (Store.get().recentFoods || []).map(findEntry).filter(Boolean).slice(0, 10);
    if (!r.length) return '';
    return `<div class="row" style="margin-top:10px; gap:6px"><span class="muted small">最近吃過：</span>${r.map((e, i) =>
      `<button class="ghost small" data-recent="${i}">${esc(e.ref.name)}</button>`).join('')}</div>`;
  }

  function bind(el) {
    $('#dDate').addEventListener('change', e => { curDate = e.target.value || U.today(); renderDay(); });
    $('#dPrev').addEventListener('click', () => { curDate = U.addDays(curDate, -1); $('#dDate').value = curDate; renderDay(); });
    $('#dNext').addEventListener('click', () => { curDate = U.addDays(curDate, 1); $('#dDate').value = curDate; renderDay(); });
    $('#dToday').addEventListener('click', () => { curDate = U.today(); $('#dDate').value = curDate; renderDay(); });
    $('#mealSeg').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      curMeal = b.dataset.v; $$('#mealSeg button').forEach(x => x.classList.toggle('on', x === b));
      const sa = $('#mfSaveAdd'); if (sa) sa.textContent = sa.textContent.replace(/到.*$/, '到' + mealName());
    });

    const inp = $('#fSearch'), box = $('#fSuggest');
    let results = [], sel = 0;
    const show = () => {
      results = search(inp.value);
      sel = 0;
      if (!results.length) { box.hidden = !inp.value.trim(); box.innerHTML = '<div class="opt"><small>找不到，試試別的說法，或在下方自己新增</small></div>'; return; }
      box.hidden = false;
      box.innerHTML = results.map((e, i) => `<div class="opt ${i === sel ? 'sel' : ''}" data-i="${i}">
        <span>${e.type === 'preset' ? '🍱 ' : ''}${esc(e.ref.name)} <small>${e.type === 'preset' ? '套餐拆解：' + e.ref.items.map(it => (foodById(it.food) || {}).name).filter(Boolean).join('＋') : esc(e.ref.unit)}</small></span>
        <b class="num">${num(entryKcal(e))} 大卡</b></div>`).join('');
    };
    inp.addEventListener('input', show);
    inp.addEventListener('keydown', e => {
      if (box.hidden || !results.length) return;
      if (e.key === 'ArrowDown') { sel = Math.min(results.length - 1, sel + 1); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); e.preventDefault(); }
      else if (e.key === 'Enter') { pick(results[sel]); return; }
      else if (e.key === 'Escape') { box.hidden = true; return; }
      $$('.opt', box).forEach((o, i) => o.classList.toggle('sel', i === sel));
    });
    box.addEventListener('mousedown', e => { const o = e.target.closest('[data-i]'); if (o) { e.preventDefault(); pick(results[+o.dataset.i]); } });
    inp.addEventListener('blur', () => setTimeout(() => { box.hidden = true; }, 120));
    function pick(e) {
      addEntry(e); inp.value = ''; box.hidden = true;
      U.toast(`已加入${MEALS.find(m => m[0] === curMeal)[1].slice(2)}：${e.ref.name}`);
      renderDay(); refreshRecent();
    }

    const quick = () => {
      const txt = $('#fQuick').value.trim(); if (!txt) return;
      const segs = txt.split(/[、,，;；+＋\n和跟配]|加(?!州)/).map(s => s.trim()).filter(Boolean);
      const ok = [], miss = [];
      segs.forEach(sg => {
        const { name, qty } = parseQty(sg);
        const hit = name && search(name, 1)[0];
        if (hit && score(hit.names, name) >= 40) { addEntry(hit, qty); ok.push(`${hit.ref.name}${qty !== 1 ? '×' + qty : ''}`); }
        else miss.push(sg);
      });
      $('#quickMsg').innerHTML = (ok.length ? `<span class="pill good">已加入</span> ${esc(ok.join('、'))} ` : '') +
        (miss.length ? `<span class="pill warn">找不到</span> ${esc(miss.join('、'))}（請改用上方搜尋或自己新增）` : '');
      $('#fQuick').value = miss.join('、');
      renderDay(); refreshRecent();
    };
    $('#fQuickBtn').addEventListener('click', quick);
    $('#fQuick').addEventListener('keydown', e => { if (e.key === 'Enter') quick(); });

    el.addEventListener('click', e => {
      const r = e.target.closest('[data-recent]');
      if (r) { const ent = (Store.get().recentFoods || []).map(findEntry).filter(Boolean)[+r.dataset.recent]; if (ent) { addEntry(ent); U.toast('已加入：' + ent.ref.name); renderDay(); } }
      const sp = e.target.closest('[data-supp]');
      if (sp) { const f = foodById(sp.dataset.supp); addEntry({ type: 'food', ref: f }); U.toast(`已加入：${f.name}（${f.kcal} 大卡）`); renderDay(); refreshRecent(); }
    });

    MyFoods.mount($('#mfMount'), f => {
      addEntry({ type: 'food', ref: f });
      U.toast(`已加入${mealName()}：${f.name}（${num(f.kcal, 1)} 大卡）`);
      renderDay(); refreshRecent(); $('#suppChips').innerHTML = suppChips();
    });
    // 存檔／刪除後快速鍵也要更新
    $('#mfMount').addEventListener('click', () => setTimeout(() => { const c = $('#suppChips'); if (c) c.innerHTML = suppChips(); }, 0));
  }

  function mealName() { return MEALS.find(m => m[0] === curMeal)[1].slice(2); }

  // 常用補充品快速鍵：⭐我的蛋白粉 → 其他自訂補充品 → 內建
  function suppChips() {
    const mine = MyFoods.myProtein();
    const custom = MyFoods.list().filter(f => f.cat === '補充品' && (!mine || f.id !== mine.id));
    const btn = (id, l) => `<button class="ghost small" data-supp="${id}">${l}</button>`;
    return `<span class="muted small">常用補充品：</span>` +
      (mine ? btn(mine.id, `⭐ ${esc(mine.name)}`) : '') +
      custom.map(f => btn(f.id, esc(f.name))).join('') +
      SUPP_QUICK.filter(([id]) => foodById(id) && !(mine && id === 'whey_protein')).map(([id, l]) => btn(id, l)).join('');
  }

  function refreshRecent() {
    const old = $('#page-diet [data-recent]');
    const wrap = old && old.parentElement;
    const html = recentChips();
    if (wrap) wrap.outerHTML = html;
    else $('#quickMsg').insertAdjacentHTML('afterend', html);
  }

  function renderDay() {
    const st = Store.get();
    const plan = Calc.plan(st.profile);
    const tg = targetsFor(curDate, plan);
    const log = st.foodLog[curDate] || {};
    // 套餐：同一次加入的一組用 from 標示
    $('#mealList').innerHTML = MEALS.map(([k, label]) => {
      const items = log[k] || [];
      const t = totals(items);
      const s = Calc.MEAL_SPLIT[k];
      const mt = s ? `建議 ${num(tg.kcal * s)} 大卡．P${Math.round(tg.p * s)}／C${Math.round(tg.c * s)}／F${Math.round(tg.f * s)}` : '建議不吃';
      return `<div class="meal"><div class="meal-head"><b>${label}</b><span class="num small">${items.length
        ? `<b style="font-size:15px">${num(t.kcal)}</b> 大卡．<span style="color:var(--p)">蛋白質 ${num(t.p)}</span>／<span style="color:var(--c)">碳水 ${num(t.c)}</span>／<span style="color:var(--f)">脂肪 ${num(t.f)}</span> g`
        : '<span class="muted">未記錄</span>'}<br><span class="muted tiny">${mt}</span></span></div>
        <ul class="meal-items">${items.length ? items.map((it, i) => `<li>
          <span>${esc(it.name)}${it.cook === '炸' ? '<span class="chip fried">油炸</span>' : ''}${(it.tags || []).includes('含糖飲料') ? '<span class="chip sugar">含糖</span>' : ''}${it.cat === '補充品' ? '<span class="chip">補充品</span>' : ''}${it.from ? `<span class="chip">${esc(it.from)}</span>` : ''}<br><small class="muted">${esc(it.unit)}</small></span>
          <span class="row" style="gap:4px"><input type="number" min="0" step="${it.grams ? 0.1 : 0.5}" value="${it.qty}" data-qty="${k}:${i}"><small class="muted">份${it.grams ? `<br>${num(it.grams * it.qty, 1)} ${it.gUnit}` : ''}</small></span>
          <span class="k">${num(it.kcal * it.qty)} 大卡</span>
          <button class="icon" title="刪除" data-del="${k}:${i}">✕</button></li>`).join('') : '<li class="empty">—</li>'}</ul></div>`;
    }).join('');
    $$('[data-qty]').forEach(inp => inp.addEventListener('change', () => {
      const [k, i] = inp.dataset.qty.split(':'); const v = +inp.value;
      if (v > 0) st.foodLog[curDate][k][+i].qty = v; else st.foodLog[curDate][k].splice(+i, 1);
      Store.save(); renderDay();
    }));
    $$('[data-del]').forEach(b => b.addEventListener('click', () => {
      const [k, i] = b.dataset.del.split(':'); st.foodLog[curDate][k].splice(+i, 1); Store.save(); renderDay();
    }));

    const items = allItems(curDate);
    const tot = totals(items);
    const goal = tg.kcal;
    const pct = Math.min(1, tot.kcal / goal);
    const over = tot.kcal > goal;
    const R = 72, C = 2 * Math.PI * R;
    $('#dSummary').innerHTML = `
      <div class="row between"><h2 style="margin:0">熱量總結</h2><span class="muted small">${curDate === U.today() ? '今天' : curDate}（${U.WEEK[U.weekday(curDate)]}）</span></div>
      <div class="ring" style="margin-top:8px"><svg width="170" height="170"><circle cx="85" cy="85" r="${R}" fill="none" stroke="var(--panel-2)" stroke-width="14"/>
        <circle cx="85" cy="85" r="${R}" fill="none" stroke="${over ? 'var(--bad)' : 'var(--brand)'}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C * pct} ${C}"/></svg>
        <div class="c"><b style="color:${over ? 'var(--bad)' : 'inherit'}">${num(tot.kcal)}</b><small>／ ${num(goal)} 大卡</small><small>${over ? '超過 ' + num(tot.kcal - goal) : '還剩 ' + num(goal - tot.kcal)}</small></div></div>
      ${tg.label ? `<p class="small" style="text-align:center;margin:6px 0 0"><span class="pill info">碳水循環：${tg.label}</span></p>` : ''}
      ${macro('蛋白質', tot.p, tg.p, 'p')}${macro('碳水', tot.c, tg.c, 'c')}${macro('脂肪', tot.f, tg.f, 'f')}
      <p class="muted tiny" style="margin:2px 0 0">剩餘：蛋白質 ${num(Math.max(0, tg.p - tot.p))} g．碳水 ${num(Math.max(0, tg.c - tot.c))} g．脂肪 ${num(Math.max(0, tg.f - tot.f))} g　<a href="#body" style="color:var(--brand)">調整策略</a></p>
      ${items.length ? `<details open style="margin-top:12px"><summary>熱量明細</summary><div class="receipt">
        ${MEALS.filter(([k]) => (log[k] || []).length).map(([k, l]) => `<div class="small muted" style="margin-top:8px">${l}</div>` +
          log[k].map(it => `<div class="ln"><span>${esc(it.name)}${it.qty !== 1 ? ' ×' + it.qty : ''}</span><span class="num"><small class="muted">P${num(it.p * it.qty, 1)} C${num(it.c * it.qty, 1)} F${num(it.f * it.qty, 1)}${it.sugar != null ? ` 糖${num(it.sugar * it.qty, 1)}` : ''}</small>　${num(it.kcal * it.qty)} 大卡</span></div>`).join('')).join('')}
        <div class="ln tot"><span>合計</span><span class="num"><small class="muted">P${num(tot.p)} C${num(tot.c)} F${num(tot.f)}</small>　${num(tot.kcal)} 大卡</span></div>
        ${tot.sugarN ? `<div class="muted tiny" style="text-align:right">有標示糖的 ${tot.sugarN} 項合計糖 ${num(tot.sugar, 1)} g</div>` : ''}</div></details>` : ''}`;
    $('#dTips').innerHTML = advise(curDate, plan).map(t => `<li class="${t.cls}">${t.t}</li>`).join('');
    renderWeek(goal);
  }

  function macro(name, v, goal, cls) {
    const pct = goal ? v / goal * 100 : 0;
    return `<div class="macro"><span>${name}</span><div class="bar ${cls} ${pct > 115 ? 'over' : ''}"><i style="width:${Math.min(100, pct)}%"></i></div><span class="r">${num(v)} / ${goal} g</span></div>`;
  }

  function renderWeek(goal) {
    const days = []; for (let i = 6; i >= 0; i--) days.push(U.addDays(curDate, -i));
    const tots = days.map(d => dayTotal(d));
    const vals = tots.map(t => t.kcal);
    const lt = tots.filter(t => t.kcal > 0);
    const avgM = k => lt.length ? lt.reduce((s, t) => s + t[k], 0) / lt.length : 0;
    const max = Math.max(goal * 1.3, ...vals);
    const logged = vals.filter(v => v > 0);
    const avg = logged.length ? logged.reduce((a, b) => a + b, 0) / logged.length : 0;
    $('#dWeek').innerHTML = `<div class="week-bars">
      <div class="goal-line" style="bottom:${22 + goal / max * 100}px" title="目標 ${goal}"></div>
      ${days.map((d, i) => `<div class="wb"><small class="num">${vals[i] ? num(vals[i]) : ''}</small><i class="${!vals[i] ? 'none' : vals[i] > goal * 1.05 ? 'over' : ''}" style="height:${(vals[i] || goal * 0.02) / max * 100}px"></i><small>${U.WEEK[U.weekday(d)].slice(1)}</small></div>`).join('')}
    </div><p class="muted small" style="margin-top:6px">${logged.length ? `有紀錄 ${logged.length} 天，平均 <b>${num(avg)}</b> 大卡／天（目標 ${num(goal)}）。${avg <= goal * 1.05 ? '保持下去，體重會穩定下降。' : '平均超標，先從最常超標的那一餐調整。'}<br>
      平均蛋白質 <b style="color:var(--p)">${num(avgM('p'))}</b>／碳水 <b style="color:var(--c)">${num(avgM('c'))}</b>／脂肪 <b style="color:var(--f)">${num(avgM('f'))}</b> g` : '綠色虛線＝每日目標'}</p>`;
  }

  return { render, dayTotal, advise, MEALS, search, parseQty, addEntry, foodById, setDate: d => { curDate = d; }, currentMeal: () => mealName() };
})();
