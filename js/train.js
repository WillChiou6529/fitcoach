// 訓練頁：月曆／週課表 → 某一天的部位與第幾套菜單 → 伸展／熱身／充血／主訓練／輔助／收操
// 每天的課表 = 個別調整（schedOverride[日期]）優先，否則用每週固定課表（week[星期]）
window.TrainPage = (function () {
  'use strict';
  const { esc, num, $, $$ } = U;

  const DB = () => window.WORKOUT_DB || {};
  const ORDER = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'hiit', 'cardio'];
  const PHASE_NO = { pre: 1, warmup: 2, activation: 3, main: 4, accessory: 5, cooldown: 6, post: 7 };
  const SD = () => window.STRETCH_DB;

  let selDate = U.today();
  let calMonth = U.today().slice(0, 7);

  // 每週天數 → 課表（main / addon）；變化版本依程度決定
  const TEMPLATES = {
    3: { 0: ['chest', 'arms'], 2: ['back', 'core'], 4: ['legs', 'cardio'] },
    4: { 0: ['chest', 'shoulders'], 1: ['legs', 'core'], 3: ['back', 'arms'], 5: ['hiit', ''] },
    5: { 0: ['chest', 'core'], 1: ['back', ''], 2: ['legs', ''], 3: ['shoulders', 'arms'], 5: ['hiit', 'core'] },
    6: { 0: ['chest', 'core'], 1: ['back', 'arms'], 2: ['cardio', ''], 3: ['legs', 'core'], 4: ['shoulders', 'arms'], 5: ['hiit', ''] },
  };

  // ---- 每天的課表 ----
  function overrides() { const s = Store.get(); return s.schedOverride || (s.schedOverride = {}); }
  function mondayOf(date) { return U.addDays(date, -U.weekday(date)); }
  function weeksBetween(a, b) { return Math.round((new Date(mondayOf(b) + 'T00:00:00') - new Date(mondayOf(a) + 'T00:00:00')) / 6048e5); }

  // 週課表套到某一天（含每週自動輪替）
  function templatePlan(date) {
    const st = Store.get();
    const t = st.week[U.weekday(date)] || {};
    if (!t.main || !DB()[t.main]) return { main: '', addon: '', variant: 1 };
    const n = DB()[t.main].variants.length;
    let v = t.variant || 1;
    // 輪替只從開啟那週往後生效
    if (st.rotate && st.rotateFrom && date >= st.rotateFrom) v = (((v - 1 + weeksBetween(st.rotateFrom, date)) % n) + n) % n + 1;
    return { main: t.main, addon: t.addon || '', variant: v };
  }
  // 優先順序：個別調整 > 當天已練過的存檔（之後改課表、輪替都不影響歷史）> 週課表
  function history() { const s = Store.get(); return s.trainHistory || (s.trainHistory = {}); }
  function planFor(date) {
    const ov = overrides()[date];
    if (ov) return { main: ov.main || '', addon: ov.main ? (ov.addon || '') : '', variant: ov.variant || 1, override: true };
    const h = history()[date];
    if (h) return { main: h.main, addon: h.addon || '', variant: h.variant || 1, override: false };
    return Object.assign(templatePlan(date), { override: false });
  }
  // 開始打勾時把當天的課表存檔；全部取消勾選就移除
  function snapshot(date) {
    const d = Store.get().done[date];
    if (d && Object.keys(d).length) { const p = planFor(date); history()[date] = { main: p.main, addon: p.addon, variant: p.variant }; }
    else delete history()[date];
  }
  // 只改這一天；跟週課表一樣就移除個別調整
  function setOverride(date, plan) {
    const t = history()[date] || templatePlan(date);
    const p = { main: plan.main || '', addon: plan.main ? (plan.addon || '') : '', variant: plan.variant || 1 };
    if (p.main === t.main && p.addon === t.addon && (!p.main || p.variant === t.variant)) delete overrides()[date];
    else overrides()[date] = p;
    Store.save();
  }

  // ---- 一次訓練的完整流程（月曆完成度與明細共用，打勾 key 必須一致）----
  function stretchPhases(main, addon) {
    const sd = SD(); const g = sd && sd.groups[main];
    if (!g) return { pre: null, post: null, min: 0 };
    const post = g.post.slice();
    // 附加項目最多補 3 個伸展，避免收操拖太長而被跳過
    if (addon && sd.groups[addon]) sd.groups[addon].post.filter(it => !post.some(x => x.name === it.name)).slice(0, 3).forEach(it => post.push(it));
    const pre = sd.general.items.concat(g.pre);
    // 一般熱身約 5 分鐘＋每個動態伸展約 1 分鐘；靜態伸展每項約 1 分鐘（含換邊）
    const min = 5 + g.pre.length + post.length;
    return {
      pre: { key: 'pre', title: '運動前：一般熱身＋動態伸展', items: pre },
      post: { key: 'post', title: '運動後：靜態伸展（不痛只緊，慢慢吐氣）', items: post },
      min,
    };
  }
  function session(plan) {
    const g = DB()[plan.main];
    if (!g) return null;
    const vi = Math.min(Math.max(1, plan.variant || 1), g.variants.length);
    const v = g.variants[vi - 1];
    const addon = DB()[plan.addon];
    const addonVi = addon ? Math.min(vi, addon.variants.length) : 0;
    const addonV = addon ? addon.variants[addonVi - 1] : null;
    const sp = stretchPhases(plan.main, addonV ? plan.addon : '');
    const blocks = [];
    if (sp.pre) blocks.push({ ph: sp.pre, vid: 'stretch_' + plan.main });
    v.phases.filter(ph => ph.key !== 'cooldown').forEach(ph => blocks.push({ ph, vid: v.id }));
    if (addonV) addonV.phases.filter(p => p.key === 'main' || p.key === 'accessory').forEach(ph => blocks.push({ ph, vid: addonV.id, addon: true }));
    v.phases.filter(ph => ph.key === 'cooldown').forEach(ph => blocks.push({ ph, vid: v.id }));
    if (sp.post) blocks.push({ ph: sp.post, vid: 'stretch_' + plan.main + (addonV ? '_' + plan.addon : '') });
    const keys = blocks.flatMap(b => b.ph.items.map((_, i) => `${b.vid}:${b.ph.key}:${i}`));
    const addonMin = addonV ? Math.round(addonV.durationMin * 0.6) : 0;
    return { g, vi, v, addon, addonVi, addonV, sp, blocks, keys, addonMin, totalMin: v.durationMin + addonMin + sp.min };
  }

  // ---- 訓練消耗估算 ----
  // 每個動作的時間 = 組數 ×（每組做的時間 + 組間休息）；每組時間 = 次數 × 每下秒數（節奏加總，沒寫用 3 秒）或維持秒數，「每側」× 2
  // 熱量 =（MET − 1）× 體重 × 小時：只算「淨消耗」，因為基礎代謝已經算在每天的消耗裡，避免重複
  // MET 參考 2024 Compendium of Physical Activities：阻力訓練（含組間休息）中高強度 5.0、一般 3.5～4.0、伸展 2.3、HIIT 8.0
  const PHASE_MET = { pre: 4.0, warmup: 3.5, activation: 3.5, main: 5.0, accessory: 4.0, cooldown: 2.3, post: 2.3, restday: 2.3 };
  const GROUP_MET = { hiit: 8.0, cardio: 7.0 };
  function itemMinutes(it, sets) {
    const r = String(it.reps || '');
    const side = /每側|每邊|每腳|每隻/.test(r) ? 2 : 1;
    const ns = (r.match(/\d+(?:\.\d+)?/g) || []).map(Number);
    const n = ns.length >= 2 && /^\D*\d+(?:\.\d+)?\s*[–~-]/.test(r) ? (ns[0] + ns[1]) / 2 : ns[0];
    // 時間寫法可能是組合的：「45 秒衝刺＋75 秒輕鬆」→ 全部加起來；範圍取中間
    const tm = [...r.matchAll(/(\d+(?:\.\d+)?)(?:\s*[–~-]\s*(\d+(?:\.\d+)?))?\s*(分鐘|秒)/g)];
    let work;
    if (it.hold) work = it.hold * side;
    else if (tm.length) work = tm.reduce((s, m) => s + (+m[1] + +(m[2] || m[1])) / 2 * (m[3] === '秒' ? 1 : 60), 0) * side;
    else if (/公尺|米/.test(r)) work = (n || 100) * 0.5;   // 距離：划船約 0.25、負重走約 0.8 秒／公尺，取 0.5
    else {
      const tp = String(it.tempo || '');
      const per = /爆發/.test(tp) ? 1.5 : (tp.match(/\d+/g) || []).reduce((a, b) => a + +b, 0) || 3;
      work = (/力竭/.test(r) && !/^\D*\d+\s*[–~-]/.test(r) ? 12 : n || 12) * side * per;
    }
    return sets * (work + (it.rest || 0)) / 60;
  }
  function burnOf(date) {
    const w = Store.get().profile.weight || 70;
    const plan = planFor(date);
    const s = session(plan);
    const done = Store.get().done[date] || {};
    let blocks;
    if (s) blocks = s.blocks.map(b => ({ ph: b.ph, vid: b.vid, group: b.addon ? plan.addon : plan.main }));
    else { const rd = SD() && SD().restDay; blocks = rd ? [{ ph: { key: 'restday', items: rd.items }, vid: 'restday', group: '' }] : []; }
    const r = { planned: 0, done: 0, plannedMin: 0, doneMin: 0, n: 0, total: 0 };
    blocks.forEach(b => b.ph.items.forEach((it, i) => {
      const key = b.ph.key;
      const met = (key === 'main' || key === 'accessory') && GROUP_MET[b.group] ? GROUP_MET[b.group] : PHASE_MET[key] || 3.5;
      const min = itemMinutes(it, key === 'restday' || !s ? it.sets || 1 : adjustSets(it, key).sets);
      const kcal = (met - 1) * w * min / 60;
      r.planned += kcal; r.plannedMin += min; r.total++;
      if (done[`${b.vid}:${key}:${i}`]) { r.done += kcal; r.doneMin += min; r.n++; }
    }));
    ['planned', 'done', 'plannedMin', 'doneMin'].forEach(k => { r[k] = Math.round(r[k]); });
    r.rest = !s;
    return r;
  }

  // 某一天的完成狀態
  function status(date) {
    const plan = planFor(date);
    const s = session(plan);
    const today = U.today();
    if (!s) return { kind: 'rest', plan };
    const done = Store.get().done[date] || {};
    const n = s.keys.filter(k => done[k]).length;
    const pct = s.keys.length ? n / s.keys.length : 0;
    let kind;
    if (pct >= 0.8) kind = 'done';
    else if (n > 0) kind = 'partial';
    else if (date < today) kind = 'missed';
    else if (date === today) kind = 'todo';
    else kind = 'planned';
    return { kind, plan, s, n, total: s.keys.length, pct };
  }

  function groupOpts(val, allowNone, noneLabel) {
    return (allowNone ? `<option value="">${noneLabel}</option>` : '') +
      ORDER.filter(k => DB()[k]).map(k => `<option value="${k}" ${k === val ? 'selected' : ''}>${DB()[k].emoji} ${DB()[k].name}</option>`).join('');
  }

  function adjustSets(item, phaseKey) {
    const lv = Store.get().profile.level;
    let s = item.sets, why = '';
    if (lv === '新手' && (phaseKey === 'main' || phaseKey === 'accessory') && s > 2) { s -= 1; why = '新手少 1 組'; }
    if (lv === '進階' && phaseKey === 'main' && s >= 3 && s < 6) { s += 1; why = '進階多 1 組'; }
    return { sets: s, why };
  }

  // ---- 頁面 ----
  function render() {
    const el = $('#page-train');
    if (!Object.keys(DB()).length) { el.innerHTML = '<div class="card"><p>找不到訓練資料（data/workouts_a.js、workouts_b.js）。</p></div>'; return; }
    const st = Store.get();
    const view = st.trainView || 'calendar';
    // 舊版沒有存檔的打勾紀錄，補存一次
    Object.keys(st.done || {}).forEach(d => { if (!history()[d]) snapshot(d); });
    Store.save();
    el.innerHTML = `
      <div class="page-head">
        <div><h1>🏋️ 訓練菜單</h1><p class="muted">月曆一眼看出哪天練什麼、有沒有完成；點日期看當天完整菜單，拖拉可以對調兩天的訓練。</p></div>
        <div class="row"><div class="seg" id="viewSeg"><button data-v="calendar" class="${view === 'calendar' ? 'on' : ''}">📅 月曆</button><button data-v="week" class="${view === 'week' ? 'on' : ''}">🗓️ 每週固定課表</button></div></div>
      </div>
      <div id="trainTop"></div>
      <div id="dayDetail"></div>
      <div class="card" id="liftProgress" style="margin-top:16px">${Lift.progress()}</div>`;
    $('#viewSeg').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      Store.get().trainView = b.dataset.v; Store.save(); render();
    });
    if (view === 'week') renderWeekView(); else renderCalendar();
    renderDetail();
  }

  function templateBar() {
    return `<div class="row"><span class="muted small">一鍵排課表：</span>${[3, 4, 5, 6].map(n => `<button class="ghost small" data-tpl="${n}">每週 ${n} 天</button>`).join('')}</div>`;
  }
  function bindTemplateBar(root) { $$('[data-tpl]', root).forEach(b => b.addEventListener('click', () => applyTemplate(+b.dataset.tpl))); }

  function applyTemplate(n) {
    const lv = Store.get().profile.level;
    const v = lv === '新手' ? 3 : lv === '進階' ? 1 : 2;
    const tpl = TEMPLATES[n];
    const week = {};
    for (let i = 0; i < 7; i++) week[i] = tpl[i] ? { main: tpl[i][0], variant: v, addon: tpl[i][1] } : { main: '', variant: v, addon: '' };
    const st = Store.get();
    st.week = week;
    // 今天以後的個別調整是依舊課表排的，一併清掉；過去的保留當紀錄
    const ov = overrides(); Object.keys(ov).forEach(d => { if (d >= U.today()) delete ov[d]; });
    Store.save();
    U.toast(`已套用每週 ${n} 天課表（${lv}程度預設第 ${v} 套）`);
    render(); App.refresh('train');
  }

  // ---- 月曆 ----
  function renderCalendar() {
    const st = Store.get();
    const first = calMonth + '-01';
    const start = mondayOf(first);
    const [y, m] = calMonth.split('-').map(Number);
    const nextMonth = U.dateKey(new Date(y, m, 1)).slice(0, 7);
    const days = [];
    for (let d = start; days.length < 42; d = U.addDays(d, 1)) {
      if (days.length % 7 === 0 && d.slice(0, 7) === nextMonth && days.length >= 28) break;
      days.push(d);
    }
    const today = U.today();
    const inMonth = days.filter(d => d.slice(0, 7) === calMonth);
    const stats = monthStats(inMonth);

    $('#trainTop').innerHTML = `
      <div class="card mb">
        <div class="row between mb">
          <div class="row"><button class="ghost small" id="calPrev">◀</button><h2 style="margin:0;min-width:130px;text-align:center">${y} 年 ${m} 月</h2><button class="ghost small" id="calNext">▶</button><button class="ghost small" id="calToday">今天</button></div>
          <div class="row"><label class="row small" title="每週自動換下一套，避免身體適應而停滯"><input type="checkbox" id="rotate" ${st.rotate ? 'checked' : ''}> 每週自動輪替 5 套菜單</label>${templateBar()}</div>
        </div>
        <div class="cal-head">${U.WEEK.map(w => `<div>${w}</div>`).join('')}</div>
        <div class="cal-grid">${days.map(d => calCell(d, today)).join('')}</div>
        <div class="row small muted" style="margin-top:10px;gap:14px">
          <span><i class="lg s-done"></i>完成</span><span><i class="lg s-partial"></i>部分完成</span><span><i class="lg s-missed"></i>漏練</span>
          <span><i class="lg s-planned"></i>已排定</span><span>✎ 個別調整過</span><span>拖拉卡片可對調兩天的訓練</span>
        </div>
      </div>
      <div class="grid g4 mb">
        <div class="stat"><div class="label">本月計畫</div><div class="value">${stats.planned}<small>次</small></div><div class="sub">至今應完成 ${stats.due} 次</div></div>
        <div class="stat"><div class="label">已完成</div><div class="value" style="color:var(--good)">${stats.done}<small>次</small></div><div class="sub">部分完成 ${stats.partial} 次．漏練 ${stats.missed} 次</div></div>
        <div class="stat"><div class="label">完成率</div><div class="value">${stats.due ? Math.round(stats.done / stats.due * 100) : 0}<small>%</small></div>
          <div class="bar" style="margin-top:6px"><i style="width:${stats.due ? stats.done / stats.due * 100 : 0}%;background:var(--good)"></i></div></div>
        <div class="stat"><div class="label">連續達成</div><div class="value">${streak()}<small>次訓練</small></div><div class="sub">漏練一次就重新計算</div></div>
      </div>
      ${stats.groups.length ? `<div class="card mb"><h3>本月各部位訓練次數</h3><div class="row" style="gap:14px">${stats.groups.map(([k, c]) =>
        `<span class="small">${DB()[k].emoji} ${DB()[k].name} <b>${c.plan}</b> 次${c.done ? `（完成 ${c.done}）` : ''}</span>`).join('')}</div>${balanceTip(stats)}</div>` : ''}`;

    $('#calPrev').addEventListener('click', () => { calMonth = U.dateKey(new Date(y, m - 2, 1)).slice(0, 7); renderCalendar(); });
    $('#calNext').addEventListener('click', () => { calMonth = U.dateKey(new Date(y, m, 1)).slice(0, 7); renderCalendar(); });
    $('#calToday').addEventListener('click', () => { calMonth = today.slice(0, 7); selDate = today; renderCalendar(); renderDetail(); });
    $('#rotate').addEventListener('change', e => {
      const s = Store.get(); s.rotate = e.target.checked; s.rotateFrom = mondayOf(today); Store.save();
      U.toast(s.rotate ? '已開啟：從本週起每週自動換下一套菜單' : '已關閉自動輪替'); renderCalendar(); renderDetail();
    });
    bindTemplateBar($('#trainTop'));
    $$('.cal-cell').forEach(c => {
      c.addEventListener('click', () => { selDate = c.dataset.date; renderCalendar(); renderDetail(); $('#dayDetail').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      c.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', c.dataset.date); c.classList.add('dragging'); });
      c.addEventListener('dragend', () => c.classList.remove('dragging'));
      c.addEventListener('dragover', e => { e.preventDefault(); c.classList.add('drop'); });
      c.addEventListener('dragleave', () => c.classList.remove('drop'));
      c.addEventListener('drop', e => {
        e.preventDefault(); c.classList.remove('drop');
        const src = e.dataTransfer.getData('text/plain'), dst = c.dataset.date;
        if (!src || src === dst) return;
        const a = planFor(src), b = planFor(dst);
        setOverride(dst, a); setOverride(src, b);
        selDate = dst;
        U.toast(`已對調：${src.slice(5)} ⇄ ${dst.slice(5)}`);
        renderCalendar(); renderDetail(); App.refresh('train');
      });
    });
  }

  function calCell(d, today) {
    const s = status(d);
    const out = d.slice(0, 7) !== calMonth;
    const g = s.s && s.s.g;
    const cls = ['cal-cell', 's-' + s.kind, out ? 'out' : '', d === today ? 'today' : '', d === selDate ? 'sel' : ''].join(' ');
    // .bt 是文字說明，手機窄格只留符號
    const badge = { done: '✅', partial: `◐<span class="bt"> ${Math.round((s.pct || 0) * 100)}%</span>`, missed: '✕<span class="bt"> 漏練</span>', todo: '<span class="bt">今天</span>', planned: '', rest: '' }[s.kind];
    return `<div class="${cls}" data-date="${d}" ${g ? 'draggable="true"' : ''} title="${g ? `${g.name}．第 ${s.s.vi} 套 ${esc(s.s.v.name)}` : '休息日'}">
      <div class="cal-d"><span>${+d.slice(8)}</span><small>${badge}</small></div>
      ${g ? `<div class="cal-g"><i class="ge">${g.emoji}</i> <b class="gn">${g.name}</b>${s.s.addon ? `<span class="muted">＋${s.s.addon.name}</span>` : ''}</div>
        <div class="cal-v">第 ${s.s.vi} 套${s.plan.override ? ' ✎' : ''}</div>`
        : `<div class="cal-rest"><i class="ge">😴</i> 休息${s.plan.override ? ' ✎' : ''}</div>`}
    </div>`;
  }

  function monthStats(days) {
    const today = U.today();
    const r = { planned: 0, due: 0, done: 0, partial: 0, missed: 0, groups: [] };
    const gm = {};
    days.forEach(d => {
      const s = status(d);
      if (s.kind === 'rest') return;
      r.planned++;
      const k = s.plan.main;
      gm[k] = gm[k] || { plan: 0, done: 0 }; gm[k].plan++;
      if (s.plan.addon) { gm[s.plan.addon] = gm[s.plan.addon] || { plan: 0, done: 0 }; gm[s.plan.addon].plan++; }
      if (d <= today) r.due++;
      if (s.kind === 'done') { r.done++; gm[k].done++; }
      if (s.kind === 'partial') r.partial++;
      if (s.kind === 'missed') r.missed++;
    });
    r.groups = ORDER.filter(k => gm[k]).map(k => [k, gm[k]]);
    return r;
  }

  // 從今天往回數，連續完成的訓練次數（休息日略過；今天還沒練不算中斷）
  function streak() {
    let n = 0;
    for (let i = 0, d = U.today(); i < 120; i++, d = U.addDays(d, -1)) {
      const s = status(d);
      if (s.kind === 'rest' || s.kind === 'todo') continue;
      if (s.kind === 'done') n++; else break;
    }
    return n;
  }

  function balanceTip(stats) {
    const map = Object.fromEntries(stats.groups);
    const tips = [];
    if (!map.legs) tips.push('本月沒有排腿臀，腿是全身最大肌群，練腿消耗最多熱量');
    // 胸（推）明顯多於背（拉）容易圓肩；肩膀菜單已含後三角拉類動作，不列入
    const push = map.chest ? map.chest.plan : 0;
    const pull = map.back ? map.back.plan : 0;
    if (push > 0 && pull * 1.5 < push) tips.push(`胸（推 ${push} 次）明顯多於背（拉 ${pull} 次），容易圓肩駝背，背部至少要跟胸一樣多`);
    return tips.length ? `<ul class="tips" style="margin-top:10px">${tips.map(t => `<li class="warn">${t}</li>`).join('')}</ul>` : '';
  }

  // ---- 每週固定課表 ----
  function renderWeekView() {
    const week = Store.get().week;
    const today = U.today();
    const selW = U.weekday(selDate);
    $('#trainTop').innerHTML = `<div class="card mb">
      <div class="row between mb"><h2 style="margin:0">每週固定課表 <span class="muted small" style="font-weight:400">（月曆會依這裡自動排；個別日期的調整請到月曆點日期）</span></h2>${templateBar()}</div>
      <div class="week-grid">${U.WEEK.map((w, i) => {
        const d = week[i] || {}; const g = DB()[d.main];
        return `<div class="day ${i === selW ? 'sel' : ''} ${i === U.weekday(today) ? 'today' : ''}" data-day="${i}">
          <div class="dn">${w}</div>
          <div class="em">${g ? g.emoji : '😴'}</div>
          <div class="nm">${g ? g.name : '休息日'}${d.addon && DB()[d.addon] ? `<span class="muted small">＋${DB()[d.addon].name}</span>` : ''}</div>
          <select data-main="${i}">${groupOpts(d.main, true, '😴 休息')}</select>
          <select data-addon="${i}" ${g ? '' : 'disabled'}>${groupOpts(d.addon, true, '＋附加：無')}</select>
          <select data-var="${i}" ${g ? '' : 'disabled'}>${g ? g.variants.map((x, k) => `<option value="${k + 1}" ${k + 1 === (d.variant || 1) ? 'selected' : ''}>第 ${k + 1} 套 ${esc(x.name)}</option>`).join('') : '<option>—</option>'}</select>
        </div>`;
      }).join('')}</div>
      <ul class="tips" style="margin-top:12px">${weekAdvice().map(t => `<li class="${t.cls}">${t.t}</li>`).join('')}</ul></div>`;
    bindTemplateBar($('#trainTop'));
    const w = Store.get().week;
    $$('#trainTop .day').forEach(c => c.addEventListener('click', e => {
      if (e.target.tagName === 'SELECT') return;
      selDate = U.addDays(mondayOf(today), +c.dataset.day); renderWeekView(); renderDetail();
    }));
    const after = i => { Store.save(); selDate = U.addDays(mondayOf(today), i); renderWeekView(); renderDetail(); App.refresh('train'); };
    $$('[data-main]').forEach(s => s.addEventListener('change', () => {
      const i = +s.dataset.main; w[i] = Object.assign({ variant: 1, addon: '' }, w[i], { main: s.value });
      if (!s.value) w[i].addon = '';
      after(i);
    }));
    $$('[data-addon]').forEach(s => s.addEventListener('change', () => { const i = +s.dataset.addon; w[i].addon = s.value; after(i); }));
    $$('[data-var]').forEach(s => s.addEventListener('change', () => { const i = +s.dataset.var; w[i].variant = +s.value; after(i); }));
  }

  // 教練檢查一週課表的合理性
  function weekAdvice() {
    const w = Store.get().week;
    const days = [0, 1, 2, 3, 4, 5, 6].map(i => w[i] || {});
    const tips = [];
    const train = days.filter(d => d.main).length;
    const all = days.flatMap(d => [d.main, d.addon]).filter(Boolean);
    const big = ['chest', 'back', 'legs', 'shoulders', 'arms'];
    if (train === 7) tips.push({ cls: 'warn', t: '一週 7 天都排訓練，至少留 1 天完全休息，肌肉是在休息時長的。' });
    if (train === 0) tips.push({ cls: 'info', t: '還沒排訓練，可以按「一鍵排課表」，減脂建議每週 3–5 天。' });
    for (let i = 0; i < 7; i++) {
      const a = days[i], b = days[(i + 1) % 7];
      const ga = [a.main, a.addon].filter(x => big.includes(x)), gb = [b.main, b.addon].filter(x => big.includes(x));
      const same = ga.filter(x => gb.includes(x));
      if (same.length) tips.push({ cls: 'warn', t: `${U.WEEK[i]}和${U.WEEK[(i + 1) % 7]}連續練${same.map(x => DB()[x].name).join('、')}，同一肌群建議間隔 48 小時。` });
      const pushPull = (a.main === 'chest' && b.main === 'shoulders') || (a.main === 'shoulders' && b.main === 'chest');
      if (pushPull) tips.push({ cls: 'info', t: `${U.WEEK[i]}、${U.WEEK[(i + 1) % 7]}連續做胸和肩，前三角肌會連續出力，可以中間插一天背或腿。` });
    }
    if (train >= 2 && !all.includes('legs')) tips.push({ cls: 'warn', t: '沒有排腿臀。腿是全身最大肌群，練腿消耗的熱量最多，減脂一定要練。' });
    if (train >= 3 && !all.some(x => x === 'cardio' || x === 'hiit')) tips.push({ cls: 'info', t: '可以加 1–2 次有氧或燃脂（附加在重訓後 20–30 分鐘即可），加速熱量赤字。' });
    if (train >= 3 && !tips.some(t => t.cls === 'warn')) tips.push({ cls: 'good', t: `一週訓練 ${train} 天，肌群分配與休息安排都合理。` });
    return tips;
  }

  // ---- 某一天的明細 ----
  function dayHeader(date, plan) {
    const wk = U.WEEK[U.weekday(date)];
    const rel = date === U.today() ? '今天' : date === U.addDays(U.today(), 1) ? '明天' : date === U.addDays(U.today(), -1) ? '昨天' : '';
    return `<div class="row between mb" style="padding-bottom:10px;border-bottom:1px solid var(--line)">
      <div class="row"><b style="font-size:17px">📅 ${date.slice(0, 4)}/${date.slice(5, 7)}/${date.slice(8)}（${wk}）${rel ? `<span class="pill info">${rel}</span>` : ''}</b>
        ${plan.override ? '<span class="pill warn">✎ 這天有個別調整</span>' : '<span class="pill gray">依每週固定課表</span>'}</div>
      <div class="row small">只改這一天：
        <select id="ovMain">${groupOpts(plan.main, true, '😴 休息')}</select>
        <select id="ovAddon" ${plan.main ? '' : 'disabled'}>${groupOpts(plan.addon, true, '＋附加：無')}</select>
        ${plan.override ? '<button class="ghost small" id="ovReset">↺ 還原為週課表</button>' : ''}
        ${plan.main ? '<button class="ghost small" id="allDone">✅ 整天標記完成</button><button class="ghost small" id="clrDone">清除勾選</button>' : ''}
      </div></div>`;
  }

  function bindHeader(box, date, plan, s) {
    const ovMain = $('#ovMain', box), ovAddon = $('#ovAddon', box);
    if (ovMain) ovMain.addEventListener('change', () => { setOverride(date, { main: ovMain.value, addon: ovMain.value ? plan.addon : '', variant: plan.variant }); refreshAll(); });
    if (ovAddon) ovAddon.addEventListener('change', () => { setOverride(date, Object.assign({}, plan, { addon: ovAddon.value })); refreshAll(); });
    const rs = $('#ovReset', box); if (rs) rs.addEventListener('click', () => { delete overrides()[date]; Store.save(); refreshAll(); });
    const ad = $('#allDone', box);
    if (ad && s) ad.addEventListener('click', () => { const d = Store.get().done[date] = {}; s.keys.forEach(k => { d[k] = true; }); snapshot(date); Store.save(); U.toast('已標記完成，做得好！💪'); refreshAll(); });
    const cd = $('#clrDone', box); if (cd) cd.addEventListener('click', () => { delete Store.get().done[date]; snapshot(date); Store.save(); refreshAll(); });
  }

  function refreshAll() {
    if ((Store.get().trainView || 'calendar') === 'week') renderWeekView(); else renderCalendar();
    renderDetail(); App.refresh('train');
  }

  function renderDetail() {
    const st = Store.get();
    const date = selDate;
    const plan = planFor(date);
    const s = session(plan);
    const box = $('#dayDetail');
    if (!s) {
      const rd = SD() && SD().restDay;
      box.innerHTML = `<div class="card">${dayHeader(date, plan)}<h2>休息日 😴</h2>
        <ul class="tips"><li class="info">休息日不是什麼都不做：散步 30–60 分鐘或每天 8,000 步以上（NEAT 日常活動消耗往往比運動本身還多）。</li>
        <li class="info">休息日的飲食照常，蛋白質一樣要吃足；有吃肌酸的話休息日也要吃。</li></ul>
        ${rd ? phaseHtml({ key: 'restday', title: rd.title, items: rd.items }, 'restday', date) : ''}</div>
        <div class="card" id="burnCard" style="margin-top:16px"></div>`;
      bindHeader(box, date, plan, null);
      bindDetail(box, date);
      return;
    }
    const { g, vi, v, addon, addonVi, addonV, sp } = s;
    const w = st.profile.weight;
    const kcal = burnOf(date).planned;
    const firstAddon = s.blocks.findIndex(b => b.addon);
    const addonBlocks = s.blocks.filter(b => b.addon);

    box.innerHTML = `<div class="card">
      ${dayHeader(date, plan)}
      <div class="row between" style="align-items:flex-start">
        <div><h2 style="margin-bottom:4px">${g.emoji} ${g.name}${addon ? `＋${addon.name}` : ''}</h2>
          <div class="row" style="gap:6px"><span class="pill info">第 ${vi} 套：${esc(v.name)}</span><span class="pill gray">${esc(v.level)}</span>
          <span class="pill gray">⏱ 約 ${s.totalMin} 分鐘（含前後伸展 ${sp.min} 分）</span><span class="pill gray" title="依組數、次數、休息時間推算的淨消耗">🔥 全部做完約 ${num(kcal)} 大卡</span>
          ${st.profile.level !== '中階' ? `<span class="pill warn">已依「${st.profile.level}」調整組數</span>` : ''}</div></div>
        <div class="row"><div class="variant-tabs">${g.variants.map((x, i) => `<button class="${i + 1 === vi ? 'on' : ''}" data-v="${i + 1}" title="${esc(x.name)}">${i + 1}. ${esc(x.name)}</button>`).join('')}</div>
          <button class="ghost small" id="vRand">🎲 換一套</button></div>
      </div>
      <p style="margin-top:10px"><b>重點：</b>${esc(v.focus)}　<span class="muted">器材：${esc((v.equipment || []).join('、') || '無')}</span></p>
      ${g.tips ? `<details><summary>${g.name}通用技術要點</summary><ul class="tips" style="margin-top:8px">${g.tips.map(t => `<li class="info">${esc(t)}</li>`).join('')}</ul></details>` : ''}
      ${SD() && SD().principles ? `<details><summary>熱身與伸展原則</summary><ul class="tips" style="margin-top:8px">${SD().principles.map(t => `<li class="info">${esc(t)}</li>`).join('')}</ul></details>` : ''}
      <div class="row" style="justify-content:flex-end;margin-top:12px;gap:6px"><button class="ghost small" data-foldall="1">全部收合</button><button class="ghost small" data-foldall="0">全部展開</button></div>
      ${s.blocks.map((b, i) => {
        if (!b.addon) return phaseHtml(b.ph, b.vid, date, false);
        if (i !== firstAddon) return '';
        // 附加部位的各段合成一個可收合區塊
        return foldWrap('addon', date, 'phase',
          `<div class="no" style="background:#555">＋</div><h3>附加：${addon.emoji} ${addon.name}（第 ${addonVi} 套 ${esc(addonV.name)}，已熱身故直接做主項）</h3>`,
          addonBlocks.map(x => phaseHtml(x.ph, x.vid, date, true)).join(''),
          addonBlocks.flatMap(x => x.ph.items.map((_, j) => `${x.vid}:${x.ph.key}:${j}`)),
          addonBlocks.flatMap(x => x.ph.items.map(it => it.name)));
      }).join('')}
    </div>
    <div class="card" id="burnCard" style="margin-top:16px"></div>
    ${fuelCard(w)}`;

    bindHeader(box, date, plan, s);
    $$('.variant-tabs button', box).forEach(b => b.addEventListener('click', () => setVariant(+b.dataset.v)));
    $('#vRand').addEventListener('click', () => {
      let n; do { n = 1 + Math.floor(Math.random() * g.variants.length); } while (n === vi && g.variants.length > 1);
      setVariant(n); U.toast(`這天換成第 ${n} 套：${g.variants[n - 1].name}`);
    });
    bindDetail(box, date);
  }

  // 換第幾套：只影響這一天（週課表的預設套數在「每週固定課表」改）
  function setVariant(n) { const p = planFor(selDate); setOverride(selDate, Object.assign({}, p, { variant: n })); refreshAll(); }

  // 訓練日補給：訓練前／中／後與補充品（依體重算份量）
  function fuelCard(w) {
    const pPost = Math.round(w * 0.3);
    const mine = MyFoods.myProtein();
    const pw = mine || (window.FOOD_DB || []).find(f => f.id === 'whey_protein') || { id: 'whey_protein', name: '乳清', p: 24, kcal: 121 };
    let when = '';
    try {
      const r = SleepPage.compute(Store.get().schedule, Store.get().profile);
      if (r.trainStart != null) when = `（依你的作息：訓練 ${U.fmtMin(r.trainStart)}，訓練前餐約 ${U.fmtMin(r.trainStart - 75)}）`;
    } catch (e) { /* 作息未設定就不顯示時間 */ }
    return `<div class="card" style="margin-top:16px"><div class="row between"><h2 style="margin:0">🥤 訓練日補給${when ? `<span class="muted small" style="font-weight:400"> ${when}</span>` : ''}</h2>
      <div class="row"><button class="ghost small" data-fuel="${pw.id}">＋記錄一份${mine ? '⭐ ' + esc(mine.name) : '乳清'}</button><button class="ghost small" data-fuel="creatine">＋記錄肌酸</button></div></div>
      <table class="t" style="margin-top:10px">
        <tr><td style="width:120px"><b>訓練前 60–90 分</b></td><td>一份澱粉＋蛋白質，約 200–300 大卡：香蕉＋無糖豆漿、飯糰＋茶葉蛋，或半匙乳清＋燕麥。空腹訓練也可以，但重訓表現較差。</td></tr>
        <tr><td><b>訓練中</b></td><td>每 15–20 分鐘喝 150–250 ml 水；超過 60 分鐘或大量流汗加電解質（約 10 大卡）。BCAA／EAA 非必要。</td></tr>
        <tr><td><b>訓練後 2 小時內</b></td><td>蛋白質約 <b>${pPost} g</b>（體重 × 0.3 g；${mine ? `你的蛋白粉 1 份 ${num(pw.p, 1)} g／${num(pw.kcal)} 大卡，約需 ${num(pPost / pw.p, 1)} 份` : '約 1 匙乳清 24 g／121 大卡'}，或一份正餐）＋澱粉補回肝醣。不需要急著 30 分鐘內喝，正餐有吃到即可。</td></tr>
        <tr><td><b>肌酸</b></td><td>每天 3–5 g、0 大卡，訓練日休息日都吃，時間不拘；配水或乳清即可。</td></tr>
        <tr><td><b>咖啡因</b></td><td>訓練前 30–60 分鐘，每公斤體重 3 mg（你約 ${Math.round(w * 3)} mg ≈ 美式咖啡 ${Math.max(1, Math.round(w * 3 / 150))} 杯）；傍晚後訓練就不要喝，以免影響睡眠。</td></tr>
      </table></div>`;
  }

  function bindDetail(box, date) {
    const st = Store.get();
    Balance.mount($('#burnCard', box), date);
    $$('[data-fuel]', box).forEach(b => b.addEventListener('click', () => {
      const f = DietPage.foodById(b.dataset.fuel); if (!f) return;
      DietPage.setDate(U.today()); DietPage.addEntry({ type: 'food', ref: f }, 1, 'snack');
      U.toast(`已記到今天點心：${f.name}（${f.kcal} 大卡）`);
    }));
    $$('[data-hold]', box).forEach(b => b.addEventListener('click', () => Timer.start(+b.dataset.hold, b.dataset.name, '伸展中')));
    $$('[data-done]', box).forEach(c => c.addEventListener('change', () => {
      const done = st.done[date] || (st.done[date] = {});
      if (c.checked) done[c.dataset.done] = true; else delete done[c.dataset.done];
      snapshot(date);
      Store.save(); c.closest('.ex').classList.toggle('done', c.checked);
      const f = c.closest('.fold'); if (f) updateFold(f, date);
      Balance.mount($('#burnCard'), date);
      // 月曆上的完成狀態跟著更新
      if ((st.trainView || 'calendar') === 'calendar') renderCalendar();
      App.refresh('train');
    }));
    $$('[data-rest]', box).forEach(b => b.addEventListener('click', () => Timer.start(+b.dataset.rest, b.dataset.name)));
    $$('[data-fold-btn]', box).forEach(h => h.addEventListener('click', () => { const f = h.closest('.fold'); setFold(f, date, !f.classList.contains('folded')); }));
    $$('[data-foldall]', box).forEach(b => b.addEventListener('click', () => $$('.fold', box).forEach(f => setFold(f, date, b.dataset.foldall === '1'))));
  }

  // ---- 段落收合 ----
  // 沒做完的段落：收合狀態依段落種類記住（例如習慣收起運動前伸展）；整段做完：預設收起，手動展開只在這次有效
  const foldOpen = new Set();
  function foldWrap(fk, date, cls, head, body, keys, names) {
    const done = Store.get().done[date] || {};
    const n = keys.filter(k => done[k]).length, total = keys.length;
    const complete = total > 0 && n === total;
    const folded = complete ? !foldOpen.has(date + ':' + fk) : !!(Store.get().phaseFold || {})[fk];
    return `<div class="${cls} fold ${folded ? 'folded' : ''}" data-fold="${fk}" data-complete="${complete ? 1 : 0}">
      <div class="phase-title" data-fold-btn title="點一下收合／展開">${head}<span class="pill ${complete ? 'good' : 'gray'} ph-cnt">${complete ? '✓ ' : ''}${n}/${total}</span><span class="chev">›</span></div>
      <div class="ph-sum">${esc(names.map(x => x.replace(/（.*?）/g, '')).join('、'))}</div>
      <div class="phase-body">${body}</div></div>`;
  }
  function setFold(f, date, fold) {
    const fk = f.dataset.fold;
    if (f.dataset.complete === '1') { if (fold) foldOpen.delete(date + ':' + fk); else foldOpen.add(date + ':' + fk); }
    else {
      const st = Store.get(); const pf = st.phaseFold || (st.phaseFold = {});
      if (fold) pf[fk] = true; else delete pf[fk];
      Store.save();
    }
    f.classList.toggle('folded', fold);
  }
  // 打勾後更新進度；整段剛做完就自動收起
  function updateFold(f, date) {
    const cs = $$('[data-done]', f);
    const n = cs.filter(c => c.checked).length, complete = n === cs.length;
    const was = f.dataset.complete === '1';
    f.dataset.complete = complete ? 1 : 0;
    const cnt = $('.ph-cnt', f);
    cnt.className = `pill ${complete ? 'good' : 'gray'} ph-cnt`; cnt.textContent = `${complete ? '✓ ' : ''}${n}/${cs.length}`;
    if (complete && !was) { foldOpen.delete(date + ':' + f.dataset.fold); setTimeout(() => f.classList.add('folded'), 350); }
    if (!complete && was) f.classList.toggle('folded', !!(Store.get().phaseFold || {})[f.dataset.fold]);
  }

  function phaseHtml(ph, vid, date, compact) {
    const done = Store.get().done[date] || {};
    const items = ph.items.map((it0, i) => {
        const key = `${vid}:${ph.key}:${i}`;
        const { it, sw } = Swap.resolve(it0, ph.key, date, key);
        const a = adjustSets(it, ph.key);
        return `<div class="ex ${done[key] ? 'done' : ''}">
          <input type="checkbox" data-done="${key}" ${done[key] ? 'checked' : ''} title="完成打勾">
          <div><div class="ex-name">${esc(it.name)}</div>
            <div class="ex-meta"><span class="sr">${a.sets} 組 × ${esc(it.reps)}</span>
              <span>休息 ${U.fmtRest(it.rest)}</span>${it.load ? `<span>強度 ${esc(it.load)}</span>` : ''}${it.tempo ? `<span title="離心-停頓-向心（秒）">節奏 ${esc(it.tempo)}</span>` : ''}${a.why ? `<span>${a.why}</span>` : ''}</div>
            ${it.note ? `<div class="ex-note">${esc(it.note)}</div>` : ''}${Lift.html(it, ph.key, key, date, a.sets)}${compact ? '' : Swap.button(it0, ph.key, key, sw)}</div>
          ${it.hold ? `<button class="ghost small rest-btn" data-hold="${it.hold}" data-name="${esc(it.name)}">⏱ 計時 ${it.hold} 秒</button>`
            : it.rest ? `<button class="ghost small rest-btn" data-rest="${it.rest}" data-name="${esc(it.name)}">⏱ 休息 ${U.fmtRest(it.rest)}</button>` : '<span></span>'}
        </div>`;
    }).join('');
    if (compact) return `<div class="phase ${ph.key}"><div class="small muted" style="margin:8px 0 4px">${esc(ph.title)}</div>${items}</div>`;
    return foldWrap(ph.key, date, 'phase ' + ph.key,
      `<div class="no">${PHASE_NO[ph.key] || ''}</div><h3>${esc(ph.key === 'warmup' ? '專項熱身（輕重量）' : ph.title)}</h3>`,
      items, ph.items.map((_, i) => `${vid}:${ph.key}:${i}`), ph.items.map(it => it.name));
  }

  // 今日訓練摘要（總覽頁用）
  function todaySummary() {
    const st = status(U.today());
    if (!st.s) return null;
    const s = st.s;
    return { g: s.g, v: s.v, addon: s.addon, total: st.total, done: st.n, main: (s.v.phases.find(p => p.key === 'main') || { items: [] }).items };
  }

  return { render, todaySummary, planFor, status, burnOf, redraw: () => renderDetail(), selected: () => selDate };
})();

// 組間休息／伸展計時器（右下角浮動）
window.Timer = (function () {
  'use strict';
  let end = 0, tick = null, ctx = null, kind = '休息中';
  function beep() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.25, 0.5].forEach(t => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0.25, ctx.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.2);
        o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.2);
      });
    } catch (e) { /* 沒有音效裝置就略過 */ }
    try { if (navigator.vibrate) navigator.vibrate([300, 150, 300]); } catch (e) { /* 手機震動，不支援就略過 */ }
  }
  function draw() {
    const left = Math.max(0, Math.round((end - Date.now()) / 1000));
    document.getElementById('timerTime').textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    const box = document.getElementById('timer');
    if (left === 0 && !box.classList.contains('zero')) { box.classList.add('zero'); beep(); document.querySelector('#timer .timer-label').textContent = kind === '伸展中' ? '時間到，換邊或下一個動作' : '休息結束，開始下一組！'; }
  }
  function start(sec, name, k) {
    kind = k || '休息中';
    end = Date.now() + sec * 1000;
    const box = document.getElementById('timer');
    box.classList.remove('hidden', 'zero');
    box.querySelector('.timer-label').textContent = name ? `${kind}：${name}` : '組間休息';
    clearInterval(tick); tick = setInterval(draw, 250); draw();
  }
  function stop() { clearInterval(tick); document.getElementById('timer').classList.add('hidden'); }
  function init() {
    document.getElementById('timerStop').addEventListener('click', stop);
    document.getElementById('timerAdd').addEventListener('click', () => {
      end = Math.max(end, Date.now()) + 30000; document.getElementById('timer').classList.remove('zero');
      document.querySelector('#timer .timer-label').textContent = '組間休息'; draw();
    });
  }
  return { start, stop, init };
})();
