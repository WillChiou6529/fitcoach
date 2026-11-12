// 新手教學：一步一步切到各頁、框出要操作的地方；隨時可以略過，之後在「資料管理」可重看
window.Tour = (function () {
  'use strict';
  const { $, $$, esc } = U;
  const mobile = () => matchMedia('(max-width: 760px)').matches;
  // 依標題找卡片（各頁會重畫，所以每次都重新找）
  const card = (page, text) => () => $$(`#page-${page} .card`).find(c => { const h = c.querySelector('h2'); return h && h.textContent.includes(text); });
  const sel = s => () => $(s);

  const STEPS = [
    { page: 'home', title: '歡迎使用減肥啦幹 🔥', text: '大約 2 分鐘，帶你走一遍：<b>設定身體數據 → 記錄飲食 → 排訓練 → 作息</b>。<br>每一步都可以直接動手操作；不想看可以按「略過教學」，之後在「資料管理」可以重看。' },
    { page: 'home', find: sel('#nav'), title: '切換頁面', text: () => `用${mobile() ? '下方' : '左邊'}的選單切換六個頁面。接下來我們先到「身體數據」。` },
    { page: 'body', find: card('body', '基本資料'), title: '① 填基本資料', text: '性別、年齡、身高、體重、工作量、運動頻率。<b>改了就自動存</b>，結果會即時更新。', act: '現在就可以直接改看看' },
    { page: 'body', find: card('body', '減重目標'), title: '② 設定減重目標', text: '目標體重和每週減重速度。建議每週 0.5 kg：掉得太快容易掉肌肉、復胖。' },
    { page: 'body', find: sel('#bodyResult .grid'), title: '③ 你的每日熱量', text: '左邊是國健署算法的每日所需熱量，中間是<b>減脂建議攝取量</b>，飲食頁就照這個目標幫你算。' },
    { page: 'body', find: card('body', '三大營養素目標'), title: '④ 三大營養素', text: '選一個策略：均衡、高蛋白、低碳或自訂比例。勾「碳水循環」的話，訓練日多吃碳水、休息日少吃，一週總熱量不變。' },
    { page: 'body', find: card('body', '體重紀錄'), title: '⑤ 記體重', text: '每週固定時間（例如起床上完廁所）量一次記在這裡，看 7 日平均趨勢，不要被每天的水分波動影響心情。' },
    { page: 'diet', find: sel('#mealSeg'), title: '⑥ 記錄飲食：先選餐別', text: '早餐、午餐、晚餐、點心、宵夜，選好再加食物。' },
    { page: 'diet', find: () => { const i = $('#fSearch'); return i && i.closest('.search-wrap'); }, extra: sel('#fSuggest'), top: true, title: '⑦ 搜尋食物', text: '打「雞腿飯」會自動拆成雞腿、白飯、配菜、滷蛋，每樣熱量都看得到；份數之後可以改。', act: '試著打「雞腿飯」' },
    { page: 'diet', find: () => { const i = $('#fQuick'); return i && i.closest('.row'); }, title: '⑧ 一句話輸入', text: '懶得一個一個找？直接打「雞腿飯、2顆茶葉蛋、半糖珍奶」，按「拆解加入」一次加好。' },
    { page: 'diet', find: sel('#mfDetails'), title: '⑨ 我的食物（蛋白粉）', text: '包裝食品照背面營養標示輸入一次就存起來；勾「⭐ 我的蛋白粉」之後，快速鍵和訓練頁都會用它。' },
    { page: 'diet', find: () => { const t = $('#dTips'); return t && t.closest('.card'); }, title: '⑩ 教練建議', text: '依你今天吃的內容給建議：怎麼換比較省熱量、蛋白質還差多少、剩下的熱量可以吃什麼。' },
    { page: 'train', find: () => { const b = $('[data-tpl]'); return b && b.closest('.row'); }, title: '⑪ 一鍵排課表', text: '第一次先選「每週幾天」，會自動排好每天練的部位，之後也可以個別調整。' },
    { page: 'train', find: sel('#trainTop .cal-grid') , alt: sel('.cal-grid'), title: '⑫ 訓練月曆', text: '每天練什麼、有沒有完成一眼看得到（綠＝完成、黃＝部分、紅＝漏練）。<b>點日期</b>就會打開那天的菜單。' },
    { page: 'train', find: sel('#dayDetail'), title: '⑬ 當天菜單', text: '從熱身、充血、主訓練到收操，每個動作都有組數、次數和休息時間。<br>做完就打勾；按「⏱ 休息」開始倒數；<b>點段落標題可以收合</b>。<br>器材被占用？按「🔄 器材沒空？換動作」，換成練同部位的動作；「🏋️ 算我的正式重量」幫你算該用幾公斤；練完按「📝 記錄這次的重量」，會告訴你下次要不要加重。', tall: true },
    { page: 'train', find: sel('#burnCard'), title: '⑭ 消耗與熱量赤字', text: '打勾的動作會依組數、次數和休息時間算出消耗；練完跑跑步機，就在下面填時間和機器顯示的熱量。<br>程式會用「消耗 − 吃的」算出今天的<b>熱量赤字</b>，總覽和飲食頁也看得到。' },
    { page: 'sleep', find: card('sleep', '我的工作時間'), title: '⑮ 作息規劃', text: '輸入上下班時間和通勤時間，自動排好起床、睡覺、三餐、訓練時段和咖啡因截止時間（支援夜班）。' },
    { page: 'home', find: sel('#page-home .grid'), title: '⑯ 每天先看總覽', text: '今天還能吃多少、三大營養素進度、今天練什麼，這裡都看得到。' },
    { page: 'settings', find: () => $$('#page-settings .card').find(c => c.offsetParent && /備份/.test(c.textContent)), title: '⑰ 記得備份', text: '資料只存在這台裝置裡。換手機、清除資料或解除安裝前，記得先備份。<br>想再看一次教學，就到這頁按「新手教學」。' },
    { page: 'home', title: '準備好了！💪', text: '建議順序：<b>身體數據</b>確認一次 → 每餐<b>記錄飲食</b> → 照<b>月曆</b>訓練打勾 → 每週記一次體重。<br>加油，一起瘦下來！', last: true },
  ];

  let i = 0, els = null, timer = null, target = null;

  function build() {
    els = document.createElement('div');
    els.className = 'tour';
    els.innerHTML = `<div class="tour-block" data-b="t"></div><div class="tour-block" data-b="b"></div><div class="tour-block" data-b="l"></div><div class="tour-block" data-b="r"></div>
      <div class="tour-hole"></div>
      <div class="tour-card" role="dialog" aria-live="polite">
        <div class="tour-top"><span class="tour-step"></span><button class="icon tour-skip">略過教學 ✕</button></div>
        <h3 class="tour-title"></h3><div class="tour-text"></div><div class="tour-act"></div>
        <div class="tour-dots"></div>
        <div class="tour-btns"><button class="ghost small tour-prev">上一步</button><button class="small tour-next">下一步</button></div>
      </div>`;
    document.body.appendChild(els);
    $('.tour-skip', els).addEventListener('click', () => end(true));
    $('.tour-prev', els).addEventListener('click', () => show(i - 1));
    $('.tour-next', els).addEventListener('click', () => (STEPS[i].last ? end(false) : show(i + 1)));
    // 點到框外：卡片跳一下提醒
    $$('.tour-block', els).forEach(b => b.addEventListener('click', () => { const c = $('.tour-card', els); c.classList.remove('nudge'); void c.offsetWidth; c.classList.add('nudge'); }));
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    document.addEventListener('scroll', place, true);
    document.body.classList.add('touring');
  }

  function onKey(e) {
    if (!els) return;
    if (e.key === 'Escape') end(true);
    else if (e.key === 'ArrowRight' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) STEPS[i].last ? end(false) : show(i + 1);
    else if (e.key === 'ArrowLeft' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) show(i - 1);
  }

  function start() {
    if (!els) build();
    show(0);
  }

  function show(n) {
    if (n < 0 || n >= STEPS.length) return;
    i = n;
    const s = STEPS[i];
    App.go(s.page);
    $('.tour-step', els).textContent = `${i + 1} / ${STEPS.length}`;
    $('.tour-title', els).innerHTML = s.title;
    $('.tour-text', els).innerHTML = typeof s.text === 'function' ? s.text() : s.text;
    $('.tour-act', els).innerHTML = s.act ? `👉 ${esc(s.act)}` : '';
    $('.tour-act', els).hidden = !s.act;
    $('.tour-dots', els).innerHTML = STEPS.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'past' : ''}"></i>`).join('');
    $('.tour-prev', els).style.visibility = i ? 'visible' : 'hidden';
    $('.tour-next', els).textContent = s.last ? '開始使用 🚀' : i ? '下一步' : '開始教學';
    $('.tour-skip', els).hidden = !!s.last;
    target = null;
    // 等頁面畫好再找元素、捲到畫面中
    setTimeout(() => {
      target = s.find ? (s.find() || (s.alt && s.alt())) : null;
      if (target) target.scrollIntoView({ block: s.tall || s.top || target.offsetHeight > innerHeight * 0.6 ? 'start' : 'center', behavior: 'auto' });
      place();
      $('.tour-next', els).focus({ preventScroll: true });
    }, 120);
    clearInterval(timer);
    // 頁面會因為使用者操作而重畫，定時重新找元素、重新定位
    timer = setInterval(() => { if (s.find) { const t = s.find(); if (t && t !== target) target = t; } place(); }, 300);
  }

  function place() {
    if (!els) return;
    const vw = innerWidth, vh = innerHeight, pad = 6;
    const navH = mobile() ? ($('.sidebar').offsetHeight || 0) : 0;
    const cardEl = $('.tour-card', els);
    let r = target && target.isConnected && target.offsetParent !== null ? target.getBoundingClientRect() : null;
    // 搜尋建議清單跳出來時一起框進來，才點得到
    const ex = STEPS[i].extra && STEPS[i].extra();
    if (r && ex && !ex.hidden && ex.offsetParent !== null) {
      const e = ex.getBoundingClientRect();
      r = { left: Math.min(r.left, e.left), top: Math.min(r.top, e.top), right: Math.max(r.right, e.right), bottom: Math.max(r.bottom, e.bottom) };
    }
    // 底部分頁列本身就是目標時不要裁掉
    const inNav = target && target.closest && target.closest('.sidebar');
    const hole = $('.tour-hole', els);
    let x1, y1, x2, y2;
    if (r) {
      x1 = Math.max(0, r.left - pad); y1 = Math.max(0, r.top - pad);
      x2 = Math.min(vw, r.right + pad); y2 = Math.min(inNav ? vh : vh - navH, r.bottom + pad);
      if (y2 <= y1) r = null;
    }
    if (!r) { x1 = vw / 2; x2 = vw / 2; y1 = vh / 2; y2 = vh / 2; }
    Object.assign(hole.style, { left: x1 + 'px', top: y1 + 'px', width: (x2 - x1) + 'px', height: (y2 - y1) + 'px' });
    hole.classList.toggle('none', !r);
    const set = (b, css) => Object.assign($(`[data-b="${b}"]`, els).style, css);
    set('t', { left: 0, top: 0, width: vw + 'px', height: y1 + 'px' });
    set('b', { left: 0, top: y2 + 'px', width: vw + 'px', height: Math.max(0, vh - y2) + 'px' });
    set('l', { left: 0, top: y1 + 'px', width: x1 + 'px', height: (y2 - y1) + 'px' });
    set('r', { left: x2 + 'px', top: y1 + 'px', width: Math.max(0, vw - x2) + 'px', height: (y2 - y1) + 'px' });

    // 卡片位置：框的下方 → 上方 → 都放不下就貼底（手機在分頁列上方）
    const ch = cardEl.offsetHeight, cw = cardEl.offsetWidth, gap = 12;
    let top;
    if (!r) top = (vh - ch) / 2;
    else if (!inNav && vh - navH - y2 >= ch + gap * 2) top = y2 + gap;
    else if (y1 >= ch + gap * 2) top = y1 - ch - gap;
    else top = vh - navH - ch - gap;
    let left = mobile() ? 12 : (!r ? (vw - cw) / 2 : Math.min(Math.max(12, x1), vw - cw - 12));
    Object.assign(cardEl.style, { top: Math.max(gap, top) + 'px', left: left + 'px' });
  }

  function end(skipped) {
    clearInterval(timer);
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', place);
    document.removeEventListener('scroll', place, true);
    document.body.classList.remove('touring');
    if (els) els.remove();
    els = null; target = null;
    Store.get().tourDone = true; Store.save();
    if (skipped) U.toast('已略過教學，想再看可以到「資料管理」按「新手教學」');
    App.go('home');
  }

  // 第一次開啟自動播放
  function maybeStart() { if (!Store.get().tourDone) setTimeout(start, 400); }

  return { start, maybeStart };
})();
