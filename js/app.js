// 主控：頁面切換、今日總覽、資料管理
window.App = (function () {
  'use strict';
  const { esc, num, $, $$ } = U;
  const PAGES = { home: renderHome, body: () => BodyPage.render(), diet: () => DietPage.render(), train: () => TrainPage.render(), sleep: () => SleepPage.render(), settings: renderSettings };
  let current = 'home';

  function go(page) {
    current = page;
    $$('#nav button').forEach(b => b.classList.toggle('active', b.dataset.page === page));
    $$('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + page));
    PAGES[page]();
    $('main').scrollTop = 0; window.scrollTo(0, 0);
    try { sessionStorage.setItem('fitcoach.page', page); } catch (e) { /* 無痕模式略過 */ }
  }

  // 其他頁資料變動時呼叫；總覽頁是即時組出來的，切回去時會重畫，這裡不必做事
  function refresh() { }

  function greet() {
    const h = new Date().getHours();
    return h < 5 ? '夜深了，早點休息 🌙' : h < 11 ? '早安！今天也一起加油 ☀️' : h < 14 ? '午安，記得吃飽吃對 🍱' : h < 18 ? '下午好，起來動一動 💪' : '晚安，今天辛苦了 🌆';
  }

  function renderHome() {
    const st = Store.get();
    const p = st.profile;
    const el = $('#page-home');
    if (!(p.height > 100 && p.weight > 25)) { el.innerHTML = '<div class="card"><h2>歡迎使用減肥啦幹</h2><p>請先到「身體數據」輸入身高體重。</p></div>'; return; }
    const plan = Calc.plan(p);
    const today = U.today();
    const tg = Calc.dayTargets(plan, !!TrainPage.planFor(today).main, U.trainDays());
    const tot = DietPage.dayTotal(today);
    const tr = TrainPage.todaySummary();
    const { r, next } = SleepPage.nextEvent();
    const tips = DietPage.advise(today, plan).slice(0, 4);
    const left = tg.kcal - tot.kcal;
    const mbar = (n, v, g, cls) => `<div class="macro" style="grid-template-columns:44px 1fr 74px;margin:3px 0"><span>${n}</span><div class="bar ${cls} ${v > g * 1.15 ? 'over' : ''}"><i style="width:${Math.min(100, v / g * 100)}%"></i></div><span class="r">${num(v)}/${g}g</span></div>`;
    const wk = Object.keys(st.weights).sort();
    const first = wk.length ? st.weights[wk[0]] : p.weight;

    el.innerHTML = `
      <div class="page-head"><div><h1>${greet()}</h1><p class="muted">${today}（${U.WEEK[U.weekday(today)]}）．目標：${num(p.weight, 1)} → ${num(plan.target, 1)} kg</p></div>
        <div class="row"><button data-go="diet">🍱 記錄飲食</button><button class="ghost" data-go="train">🏋️ 今天練什麼</button></div></div>
      <div class="grid g4 mb">
        <div class="stat hl m-wide"><div class="label">今日熱量</div><div class="value">${num(tot.kcal)}<small>／${num(tg.kcal)} 大卡</small></div>
          <div class="sub">${left >= 0 ? `還可以吃 ${num(left)} 大卡` : `超過 ${num(-left)} 大卡`}${tg.label ? `．${tg.label}` : ''}</div></div>
        <div class="stat m-wide"><div class="label">三大營養素（${Calc.MACRO_MODES[plan.macroMode].label}）</div>
          ${mbar('蛋白質', tot.p, tg.p, 'p')}${mbar('碳水', tot.c, tg.c, 'c')}${mbar('脂肪', tot.f, tg.f, 'f')}</div>
        <div class="stat"><div class="label">今日訓練</div><div class="value" style="font-size:22px">${tr ? `${tr.g.emoji} ${esc(tr.g.name)}` : '😴 休息日'}</div>
          <div class="sub">${tr ? `${esc(tr.v.name)}．完成 ${tr.done}/${tr.total} 項` : '散步 30 分鐘或 8,000 步'}</div></div>
        <div class="stat"><div class="label">體重</div><div class="value">${num(p.weight, 1)}<small>kg</small></div>
          <div class="sub">${wk.length >= 2 ? `比第一筆 ${p.weight - first <= 0 ? '−' : '+'}${num(Math.abs(p.weight - first), 1)} kg．` : ''}距目標 ${num(Math.max(0, p.weight - plan.target), 1)} kg</div></div>
      </div>
      <div class="card mb">${Balance.summary(today, true)}</div>
      <div class="grid g3 mb" style="align-items:start">
        <div class="card span2"><div class="row between"><h2>🧑‍⚕️ 今日飲食建議</h2><button class="ghost small" data-go="diet">看明細 →</button></div>
          <ul class="tips">${tips.map(t => `<li class="${t.cls}">${t.t}</li>`).join('')}</ul></div>
        <div class="card"><div class="row between"><h2>🌙 作息</h2><button class="ghost small" data-go="sleep">調整 →</button></div>
          <table class="t"><tr><td>起床</td><td class="r"><b>${U.fmtMin(r.wake)}</b></td></tr><tr><td>上床</td><td class="r"><b>${U.fmtMin(r.bed)}</b></td></tr>
          ${r.trainStart != null ? `<tr><td>訓練</td><td class="r">${U.fmtMin(r.trainStart)}–${U.fmtMin(r.trainEnd)}</td></tr>` : ''}</table>
          <ul class="tips" style="margin-top:10px"><li class="info">下一件事：<b>${U.fmtMin(next.t)} ${esc(next.title)}</b><br><small class="muted">${esc(next.desc)}</small></li></ul></div>
      </div>
      ${tr ? `<div class="card"><div class="row between"><h2>🏋️ 今日主訓練：${esc(tr.g.name)}（${esc(tr.v.name)}）</h2><button class="ghost small" data-go="train">完整菜單與計時 →</button></div>
        <table class="t"><tr><th>動作</th><th class="r">組 × 次</th><th class="r">休息</th><th>強度</th></tr>
        ${tr.main.map(it => `<tr><td>${esc(it.name)}</td><td class="r">${it.sets} × ${esc(it.reps)}</td><td class="r">${U.fmtRest(it.rest)}</td><td>${esc(it.load)}</td></tr>`).join('')}</table></div>` : ''}`;
    $$('[data-go]', el).forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
  }

  function renderSettings() {
    const st = Store.get();
    const el = $('#page-settings');
    const days = Object.keys(st.foodLog).filter(d => DietPage.dayTotal(d).kcal > 0).length;
    el.innerHTML = `
      <div class="page-head"><div><h1>⚙️ 資料管理</h1><p class="muted">資料存在這台裝置裡（電腦是瀏覽器，手機是 App）。換裝置、清除資料或解除安裝 App 前，請先備份。</p></div></div>
      <div class="grid g3 m3 mb">
        <div class="stat"><div class="label">飲食紀錄</div><div class="value">${days}<small>天</small></div></div>
        <div class="stat"><div class="label">體重紀錄</div><div class="value">${Object.keys(st.weights).length}<small>筆</small></div></div>
        <div class="stat"><div class="label">自訂食物</div><div class="value">${(st.customFoods || []).length}<small>項</small></div></div>
      </div>
      <div class="grid g3">
        <div class="card web-only"><h2>💾 匯出備份</h2><p class="muted small">下載一個 .json 檔，包含所有個人資料與紀錄。</p><button id="exp">匯出</button></div>
        <div class="card"><h2>📂 匯入備份</h2><p class="muted small">選擇之前匯出的 .json，會覆蓋目前資料。</p><input type="file" id="imp" accept=".json,application/json"></div>
        <div class="card m-only"><h2>📋 用文字備份（手機）</h2><p class="muted small">App 裡不能直接下載檔案：按「複製」後貼到 LINE 記事本或 Email 存起來；還原時貼回下方再按「還原」。</p>
          <div class="row"><button id="copyBk">複製備份文字</button><button class="ghost" id="pasteBk">從文字還原</button></div>
          <textarea id="bkText" rows="4" style="width:100%;margin-top:8px" placeholder="還原時把備份文字貼在這裡"></textarea></div>
        <div class="card"><h2>❓ 新手教學</h2><p class="muted small">一步一步帶你認識每一頁怎麼用，約 2 分鐘，隨時可以略過。</p><button id="tourAgain">重新看教學</button></div>
        <div class="card m-only"><h2>🌓 外觀</h2><p class="muted small">深色／淺色模式切換。</p><button class="ghost" id="themeBtn2">切換深淺色</button></div>
        <div class="card"><h2>🗑️ 清除全部</h2><p class="muted small">回到初始狀態，無法復原（建議先匯出）。</p><button id="rst" style="background:var(--bad)">清除全部資料</button></div>
      </div>
      <div class="card" style="margin-top:16px"><h2>資料來源與說明</h2><ul class="tips">
        <li class="info">每日熱量：衛福部國民健康署「每日熱量需求計算」（目前體重 × 依工作量與 BMI 查表的每公斤熱量）。</li>
        <li class="info">基礎代謝：Mifflin-St Jeor 公式；體脂：美國海軍圍度法／Deurenberg 公式；骨骼肌：除脂體重比例推估。</li>
        <li class="info">食物熱量：參考衛福部食藥署食品營養成分資料庫與國健署食物代換表，外食份量為一般估計，實際依店家而異。</li>
        <li class="warn">本程式提供一般健康建議，不能取代醫療診斷。懷孕、哺乳、糖尿病、腎臟病、心血管疾病或正在服藥者，請先諮詢醫師與營養師。</li>
      </ul></div>`;
    $('#exp').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(Store.get(), null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = `減肥啦幹備份_${U.today()}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    $('#copyBk').addEventListener('click', async () => {
      const txt = JSON.stringify(Store.get());
      const ta = $('#bkText'); ta.value = txt;
      try { await navigator.clipboard.writeText(txt); U.toast('已複製，貼到記事本或 Email 存起來'); }
      catch (e) { ta.select(); try { document.execCommand('copy'); U.toast('已複製'); } catch (e2) { U.toast('請長按文字框 → 全選 → 複製'); } }
    });
    $('#pasteBk').addEventListener('click', () => {
      try {
        const obj = JSON.parse($('#bkText').value.trim());
        if (!obj.profile) throw new Error('格式不對');
        if (!confirm('用這份備份覆蓋目前資料？')) return;
        Store.replace(obj); U.toast('還原完成'); renderSettings();
      } catch (err) { U.toast('還原失敗：請貼上完整的備份文字'); }
    });
    $('#themeBtn2').addEventListener('click', toggleTheme);
    $('#tourAgain').addEventListener('click', () => Tour.start());
    $('#imp').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const obj = JSON.parse(rd.result);
          if (!obj.profile) throw new Error('格式不對');
          Store.replace(obj); U.toast('匯入完成'); renderSettings();
        } catch (err) { U.toast('匯入失敗：檔案格式不正確'); }
      };
      rd.readAsText(f);
    });
    $('#rst').addEventListener('click', () => {
      if (confirm('確定要清除全部資料嗎？這個動作無法復原。')) { Store.reset(); U.toast('已清除'); renderSettings(); }
    });
  }

  function initTheme() {
    let t = null;
    try { t = localStorage.getItem('fitcoach.theme'); } catch (e) { /* 略過 */ }
    if (t) document.documentElement.dataset.theme = t;
    $('#themeBtn').addEventListener('click', toggleTheme);
  }
  function toggleTheme() {
    const dark = document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('fitcoach.theme', next); } catch (e) { /* 略過 */ }
  }

  // 寬表格包一層可左右滑的容器（各頁會重畫，所以用 MutationObserver 統一處理）
  function wrapTables(root) {
    $$('table.t', root).forEach(t => {
      if (t.parentElement.classList.contains('tscroll')) return;
      const w = document.createElement('div'); w.className = 'tscroll';
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
  }

  function init() {
    Store.load();
    if (!Store.save()) U.toast('⚠️ 瀏覽器不允許存資料，關掉後紀錄會消失');
    initTheme();
    if (window.Capacitor) document.documentElement.classList.add('in-app');
    // App 版的返回鍵：先關換動作面板、計時器 → 回總覽 → 才離開 App
    const capApp = window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.App;
    if (capApp) capApp.addListener('backButton', () => {
      if (document.querySelector('.swap-sheet')) Swap.close();
      else if (!$('#timer').classList.contains('hidden')) Timer.stop();
      else if (current !== 'home') go('home');
      else capApp.exitApp();
    });
    wrapTables(document);
    new MutationObserver(() => wrapTables(document)).observe($('main'), { childList: true, subtree: true });
    // 網頁版（http/https）註冊離線快取；App 版（Capacitor）與直接開檔不需要
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !window.Capacitor) navigator.serviceWorker.register('sw.js').catch(() => { });
    Timer.init();
    $$('#nav button').forEach(b => b.addEventListener('click', () => go(b.dataset.page)));
    let start = location.hash.slice(1);
    if (!PAGES[start]) { try { start = sessionStorage.getItem('fitcoach.page') || 'home'; } catch (e) { start = 'home'; } }
    go(PAGES[start] ? start : 'home');
    $('#tourBtn').addEventListener('click', () => Tour.start());
    Tour.maybeStart();
    window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (PAGES[h] && h !== current) go(h); });
  }

  document.addEventListener('DOMContentLoaded', init);
  return { go, refresh };
})();
