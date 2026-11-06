// 作息頁：依上下班時間、通勤、訓練偏好，推算最佳起床／就寢／三餐／訓練時段
window.SleepPage = (function () {
  'use strict';
  const { esc, $, $$, toMin, fmtMin, fmtDur } = U;

  const SLEEP_OPTS = [[420, '7 小時'], [450, '7.5 小時（5 個睡眠週期，建議）'], [480, '8 小時'], [540, '9 小時（6 個週期）']];
  const TRAIN_OPTS = [['morning', '上班前'], ['lunch', '午休'], ['evening', '下班後'], ['none', '不訓練']];
  const LATENCY = 15;   // 平均入睡所需分鐘

  // 計算一天的作息（分鐘數，可能 <0 或 >1440，顯示時再取 24 小時餘數）
  function compute(s, profile) {
    const ws = toMin(s.workStart);
    let we = toMin(s.workEnd); if (we <= ws) we += 1440;    // 跨夜班
    const commute = +s.commute || 0, prep = +s.prep || 0;
    const trainMin = +s.trainMin || 60;
    const sleepMin = +s.sleepMin || 450;
    const night = ws >= 18 * 60 || ws < 4 * 60;              // 大夜／小夜班
    const ev = [];
    const warn = [];
    const add = (t, icon, title, desc, key) => ev.push({ t, icon, title, desc, key: !!key });

    const leave = ws - commute;
    const home = we + commute;
    let wake, bed, trainStart = null, trainEnd = null;

    if (night) {
      // 夜班：下班回家後盡快睡（固定睡眠錨點），醒來後再進食訓練
      bed = home + 45;
      wake = bed + LATENCY + sleepMin;
      // 醒來到下次出門至少要 2 小時（吃飯＋準備），不夠就提醒
      const nextLeave = leave + 1440 * Math.ceil((wake - leave + 1) / 1440);
      if (nextLeave - wake < prep + 120) warn.push({ cls: 'warn', t: `醒來（${fmtMin(wake)}）到下次出門只剩 ${fmtDur(nextLeave - wake)}，時間太趕；可以把睡眠拆成「主睡眠＋上班前小睡 60–90 分鐘」。` });
      warn.push({ cls: 'info', t: '偵測到夜班。固定「下班 → 回家就睡」的睡眠錨點，休假日也盡量維持同一段時間睡；臥室要全遮光、回家路上戴墨鏡避免陽光讓大腦醒過來。' });
    } else {
      wake = leave - prep - (s.trainPref === 'morning' ? trainMin + 20 : 0);
      bed = wake - sleepMin - LATENCY + 1440;   // 今晚的上床時間（隔天同一時間起床）
    }

    add(wake, '⏰', '起床', '起床後 30 分鐘內喝 300–500 ml 水，拉開窗簾曬太陽 10 分鐘，讓生理時鐘歸零', true);

    if (!night && s.trainPref === 'morning') {
      trainStart = wake + 15; trainEnd = trainStart + trainMin;
      add(wake + 5, '🍌', '訓練前小點心', '半根香蕉或一片吐司＋咖啡（空腹也可以，但重訓表現較差）');
      add(trainStart, '🏋️', `訓練 ${fmtDur(trainMin)}`, '早上關節較僵硬，熱身拉長到 10 分鐘', true);
      add(trainEnd + 15, '🍳', '早餐（訓練後）', '蛋白質 30 g 以上＋澱粉：蛋＋豆漿＋地瓜／燕麥');
    } else if (!night) {
      add(wake + 30, '🍳', '早餐', '起床 1 小時內吃：蛋白質＋原型澱粉，例如茶葉蛋＋無糖豆漿＋地瓜');
    }

    if (!night) {
      add(leave, '🚇', `出門通勤 ${commute} 分鐘`, commute >= 30 ? '提早一站下車走路，每天多 2,000 步' : '能走路或騎車就不要開車');
      add(ws, '💼', '上班', '每坐 50–60 分鐘起身走動 3–5 分鐘、裝水');
      const lunch = toMin(s.lunch || '12:00');
      if (s.trainPref === 'lunch') {
        const tm = Math.min(trainMin, 45);
        trainStart = lunch; trainEnd = lunch + tm;
        add(lunch - 120, '🥛', '訓練前補充', '上午 10 點左右先吃半份午餐或香蕉＋豆漿');
        add(trainStart, '🏋️', `午休訓練 ${tm} 分鐘`, '選菜單中「超級組燃脂高效型」最省時', true);
        add(trainEnd + 10, '🍱', '午餐（訓練後）', '便當：滷/烤雞腿＋飯 7 分滿＋青菜加量');
        if (trainMin > 45) warn.push({ cls: 'info', t: `午休時間有限，訓練已從 ${trainMin} 分鐘壓縮到 45 分鐘；建議改用超級組或循環菜單。` });
      } else {
        add(lunch, '🍱', '午餐', '先吃菜和肉、最後吃飯，飯 7 分滿；飯後散步 10 分鐘可降血糖');
      }
      add(Math.max(lunch + 180, Math.min(we - 60, lunch + 240)), '🍎', '下午點心（選擇性）', '水果、無糖優格或茶葉蛋，避免下班太餓暴食');
      add(we, '🏁', '下班', '');
      if (s.trainPref === 'evening') {
        trainStart = home + 15; trainEnd = trainStart + trainMin;
        add(trainStart, '🏋️', `訓練 ${fmtDur(trainMin)}`, '下班後若很疲倦，先做熱身 10 分鐘再決定強度', true);
        add(trainEnd + 30, '🍽️', '晚餐（訓練後）', '訓練後 1–2 小時內：蛋白質＋澱粉，這餐的澱粉不用怕', true);
      } else {
        add(home + 20, '🍽️', '晚餐', '晚餐份量是三餐中最少的：多菜、適量肉、澱粉減半', true);
      }
    } else {
      // 夜班：起床第一餐 → 訓練（時間夠才排）→ 上班前正餐 → 上班中少量 → 回家就睡
      const nextLeave = leave + 1440 * Math.ceil((wake - leave + 1) / 1440);
      const shift = nextLeave - leave;   // 換算到起床後的那一班
      add(wake + 20, '🍳', '起床第一餐', '當作「早餐」：蛋白質＋原型澱粉，份量小一點，訓練後還有正餐');
      if (s.trainPref !== 'none' && nextLeave - prep - wake >= trainMin + 90) {
        trainStart = wake + 60; trainEnd = trainStart + trainMin;
        add(trainStart, '🏋️', `訓練 ${fmtDur(trainMin)}`, '夜班族在起床後、上班前訓練，不要下班後才練（會睡不著）', true);
        add(Math.max(trainEnd + 20, nextLeave - prep), '🍱', '上班前正餐（訓練後）', '一天最大的一餐放這裡：蛋白質＋澱粉＋青菜', true);
      } else {
        if (s.trainPref !== 'none') warn.push({ cls: 'warn', t: '起床到上班之間不夠排完整訓練，建議把重訓放在休假日，上班日只做 20 分鐘核心或伸展。' });
        add(nextLeave - prep, '🍱', '上班前正餐', '一天最大的一餐放這裡', true);
      }
      add(nextLeave, '🚇', `出門通勤 ${commute} 分鐘`, '');
      add(ws + shift, '💼', '上班', '');
      add(ws + shift + Math.round((we - ws) / 2), '🥛', '上班中段小餐', '凌晨 2–5 點盡量不要吃大餐，選豆漿、茶葉蛋、水果');
      add(we + shift, '🏁', '下班', '回家路上戴墨鏡，避免早晨陽光讓大腦醒過來');
    }

    const caffeine = bed - 8 * 60;
    add(caffeine, '☕', '咖啡因截止', '咖啡、茶、能量飲料在這之後都不要喝（咖啡因半衰期約 5–6 小時）');
    if (night) {
      // 夜班回家就要睡，睡前流程壓縮在到家後
      add(we - 60, '🚫', '最後進食時間', '下班前 1 小時後不再吃東西，回家直接睡；餓的話喝溫豆漿', true);
      add(home + 10, '🚿', '回家洗熱水澡', '全遮光窗簾、眼罩、耳塞，臥室像晚上一樣暗');
    } else {
      add(bed - 180, '🚫', '最後進食時間', '之後只喝水或無糖茶；睡前 3 小時不進食，睡眠品質與隔天食慾都比較好', true);
      add(bed - 90, '🚿', '洗熱水澡', '洗完體溫下降的過程會讓人想睡');
      add(bed - 60, '📵', '關螢幕、放鬆', '調暗燈光、手機放客廳；可以伸展、閱讀、寫明天待辦');
    }
    add(bed, '🛏️', '上床', `目標 ${fmtMin(bed + LATENCY)} 前入睡，睡滿 ${fmtDur(sleepMin)}`, true);

    // ---- 合理性檢查（教練＋睡眠醫學）----
    const totalSleep = sleepMin;
    const ageMin = profile.age >= 65 ? 420 : profile.age < 18 ? 480 : 420;
    if (totalSleep < ageMin) warn.push({ cls: 'bad', t: `睡眠目標低於 ${ageMin / 60} 小時。研究顯示減脂期每天只睡 5.5 小時，減掉的「脂肪」比睡 8.5 小時少 55%，掉的反而多是肌肉。` });
    if (!night) {
      const dinnerEv = ev.find(e => e.title.startsWith('晚餐'));
      if (dinnerEv && bed - (dinnerEv.t + 30) < 150) warn.push({ cls: 'warn', t: `晚餐（${fmtMin(dinnerEv.t)}）離上床（${fmtMin(bed)}）不到 2.5 小時。建議下午 ${fmtMin(we - 60)} 左右在公司先吃「第一份晚餐」（便當的一半或飯糰＋豆漿），回家只吃蛋白質＋青菜。` });
      if (trainEnd != null && s.trainPref === 'evening' && bed - trainEnd < 120) warn.push({ cls: 'warn', t: `訓練結束（${fmtMin(trainEnd)}）離上床不到 2 小時，交感神經還很興奮會不好睡。改練低強度（核心、伸展、Zone 2 有氧），或把重訓移到早上／午休。` });
      if (s.trainPref === 'morning' && toMin(fmtMin(wake)) < 5 * 60) warn.push({ cls: 'warn', t: `為了早上訓練要 ${fmtMin(wake)} 起床，太早了，容易睡眠不足。建議改成下班後訓練，或晨練縮短到 30–40 分鐘。` });
      if (we - ws > 10 * 60) warn.push({ cls: 'warn', t: `工時 ${fmtDur(we - ws)}，偏長。忙的日子把訓練改成 30 分鐘超級組，或當天休息、隔天補；睡眠優先於訓練。` });
      if (commute >= 60) warn.push({ cls: 'info', t: '通勤單程超過 1 小時，可在車上補眠 15–20 分鐘（不超過 30 分鐘，避免醒來昏沉）。' });
      if (home > bed - 120) warn.push({ cls: 'bad', t: `到家時間（${fmtMin(home)}）離上床太近，作息會非常趕。建議往前調下班時間或縮短睡前流程。` });
    }
    if (s.weekendSame) warn.push({ cls: 'info', t: `週末起床時間不要晚於 ${fmtMin(wake + 60)}（平日 +1 小時內），否則週一會像時差一樣累（社會時差）。` });

    // 依起床時間排序（跨午夜也正確）
    ev.forEach(e => { e.rel = ((e.t - wake) % 1440 + 1440) % 1440; });
    ev.sort((a, b) => a.rel - b.rel);
    return { ev, warn, wake, bed, sleepMin, trainStart, trainEnd, ws, we, leave, home, commute, night };
  }

  function render() {
    const st = Store.get();
    const s = st.schedule;
    if (!s.sleepMin) s.sleepMin = 450;
    const el = $('#page-sleep');
    el.innerHTML = `
      <div class="page-head"><div><h1>🌙 作息規劃</h1><p class="muted">輸入上下班時間，自動排出最適合減脂的起床、三餐、訓練與睡眠時間。</p></div></div>
      <div class="grid" style="grid-template-columns: 360px 1fr; align-items:start">
        <div class="card">
          <h2>我的工作時間</h2>
          <div class="grid" style="gap:12px">
            <div class="grid g2 m2" style="gap:10px">
              <label class="f"><span>上班時間</span><input type="time" data-s="workStart" value="${esc(s.workStart)}"></label>
              <label class="f"><span>下班時間</span><input type="time" data-s="workEnd" value="${esc(s.workEnd)}"></label>
              <label class="f"><span>通勤單程（分鐘）</span><input type="number" min="0" max="240" data-s="commute" value="${esc(s.commute)}"></label>
              <label class="f"><span>起床到出門（分鐘）</span><input type="number" min="10" max="180" data-s="prep" value="${esc(s.prep)}"></label>
              <label class="f"><span>午餐時間</span><input type="time" data-s="lunch" value="${esc(s.lunch)}"></label>
              <label class="f"><span>訓練時長（分鐘）</span><input type="number" min="15" max="150" step="5" data-s="trainMin" value="${esc(s.trainMin)}"></label>
            </div>
            <label class="f"><span>想睡多久</span><select data-s="sleepMin">${SLEEP_OPTS.map(([v, l]) => `<option value="${v}" ${+s.sleepMin === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
            <label class="f"><span>訓練時段</span><div class="seg" id="trainSeg">${TRAIN_OPTS.map(([v, l]) => `<button data-v="${v}" class="${s.trainPref === v ? 'on' : ''}">${l}</button>`).join('')}</div></label>
            <label class="row small"><input type="checkbox" data-s="weekendSame" ${s.weekendSame ? 'checked' : ''}> 週末也維持類似作息</label>
          </div>
        </div>
        <div id="sleepResult"></div>
      </div>`;
    $$('[data-s]', el).forEach(inp => inp.addEventListener(inp.type === 'checkbox' ? 'change' : 'input', () => {
      const k = inp.dataset.s;
      s[k] = inp.type === 'checkbox' ? inp.checked : (inp.type === 'number' || k === 'sleepMin') ? +inp.value : inp.value;
      Store.save(); renderResult(); App.refresh('sleep');
    }));
    $('#trainSeg').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      s.trainPref = b.dataset.v; $$('#trainSeg button').forEach(x => x.classList.toggle('on', x === b));
      Store.save(); renderResult(); App.refresh('sleep');
    });
    renderResult();
  }

  function renderResult() {
    const st = Store.get();
    const r = compute(st.schedule, st.profile);
    $('#sleepResult').innerHTML = `
      <div class="grid g4 mb">
        <div class="stat hl"><div class="label">建議起床</div><div class="value">${fmtMin(r.wake)}</div><div class="sub">鬧鐘只設一個，不按貪睡</div></div>
        <div class="stat"><div class="label">建議上床</div><div class="value" style="color:var(--info)">${fmtMin(r.bed)}</div><div class="sub">${fmtMin(r.bed + LATENCY)} 前入睡</div></div>
        <div class="stat"><div class="label">睡眠時間</div><div class="value">${r.sleepMin / 60}<small>小時</small></div><div class="sub">${Math.round(r.sleepMin / 90 * 10) / 10} 個睡眠週期</div></div>
        <div class="stat"><div class="label">訓練時段</div><div class="value" style="font-size:22px">${r.trainStart != null ? `${fmtMin(r.trainStart)}–${fmtMin(r.trainEnd)}` : '—'}</div><div class="sub">${r.trainStart != null ? '已排進時間軸' : '今天不訓練'}</div></div>
      </div>
      <div class="grid mb" style="grid-template-columns: minmax(0,1fr) 300px; align-items:start">
        <div class="card"><h2>📅 一天時間軸</h2><div class="timeline">${r.ev.map(e => `<div class="tl ${e.key ? 'key' : ''}"><div class="t">${fmtMin(e.t)}</div><div class="dot">${e.icon}</div><div class="d"><b>${esc(e.title)}</b>${e.desc ? `<small>${esc(e.desc)}</small>` : ''}</div></div>`).join('')}</div></div>
        <div class="card"><h2>24 小時分配</h2><div class="clock-wrap">${clock(r)}</div>
          <div class="row small" style="justify-content:center; gap:12px; margin-top:6px">
            <span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#5b7fd6"></i> 睡眠</span>
            <span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#8a96a8"></i> 工作</span>
            <span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#c9b48a"></i> 通勤</span>
            <span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--brand)"></i> 訓練</span></div></div>
      </div>
      <div class="card"><h2>🧑‍⚕️ 睡眠與作息建議</h2><ul class="tips">
        ${r.warn.map(w => `<li class="${w.cls}">${w.t}</li>`).join('')}
        <li class="info">睡不夠時「飢餓素」上升、「瘦體素」下降，隔天會特別想吃高熱量食物 —— 睡眠是減脂的隱形功臣。</li>
        <li class="info">臥室保持暗、安靜、偏涼（約 20–24°C）；床只用來睡覺，躺 20 分鐘睡不著就起來做點無聊的事再回床。</li>
        <li class="info">午睡控制在 20–30 分鐘、下午 3 點前結束，才不會影響晚上入睡。</li>
      </ul></div>`;
  }

  // 24 小時圓環：00:00 在正上方
  function clock(r) {
    const S = 240, cx = S / 2, cy = S / 2, R = 92, W = 26;
    const pt = (m, rad) => { const a = (m / 1440) * 2 * Math.PI - Math.PI / 2; return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]; };
    const arc = (from, to, color) => {
      const a = ((from % 1440) + 1440) % 1440;
      let len = (((to - from) % 1440) + 1440) % 1440;
      if (len === 0) return '';
      const [x1, y1] = pt(a, R), [x2, y2] = pt(a + len, R);
      return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 ${len > 720 ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)}" stroke="${color}" stroke-width="${W}" fill="none"/>`;
    };
    const labels = [0, 6, 12, 18].map(h => { const [x, y] = pt(h * 60, R + 24); return `<text x="${x}" y="${y + 4}" text-anchor="middle">${h}</text>`; }).join('');
    return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" role="img" aria-label="24 小時分配">
      <circle cx="${cx}" cy="${cy}" r="${R}" stroke="var(--panel-2)" stroke-width="${W}" fill="none"/>
      ${arc(r.bed, r.wake, '#5b7fd6')}
      ${arc(r.ws, r.we, '#8a96a8')}
      ${r.commute ? arc(r.leave, r.ws, '#c9b48a') + arc(r.we, r.home, '#c9b48a') : ''}
      ${r.trainStart != null ? arc(r.trainStart, r.trainEnd, 'var(--brand)') : ''}
      ${labels}
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" style="font-size:22px;font-weight:800;fill:var(--text)">${r.sleepMin / 60}h</text>
      <text x="${cx}" y="${cy + 16}" text-anchor="middle">睡眠</text>
    </svg>`;
  }

  function nextEvent() {
    const st = Store.get();
    const r = compute(st.schedule, st.profile);
    const now = new Date(); const nm = now.getHours() * 60 + now.getMinutes();
    const rel = ((nm - r.wake) % 1440 + 1440) % 1440;
    return { r, next: r.ev.find(e => e.rel >= rel) || r.ev[0] };
  }

  return { render, compute, nextEvent };
})();
