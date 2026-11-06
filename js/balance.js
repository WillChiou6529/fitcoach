// 熱量赤字：每日消耗（基礎代謝＋日常活動＋重訓＋有氧）− 今天吃的
window.Balance = (function () {
  'use strict';
  const { esc, num, $, $$ } = U;
  // 有氧種類與 MET（2024 Compendium of Physical Activities 的一般值）；沒填機器熱量時用來估算
  const CARDIO = [
    ['treadmill_walk', '跑步機快走', 4.5], ['treadmill_incline', '跑步機爬坡走', 6.0], ['treadmill_run', '跑步機慢跑', 8.3],
    ['bike', '飛輪／腳踏車', 6.8], ['elliptical', '橢圓機', 5.0], ['rower', '划船機', 7.0], ['stair', '爬梯機', 9.0],
    ['walk', '戶外快走', 4.3], ['run', '戶外跑步', 9.0], ['swim', '游泳', 7.0], ['ball', '球類運動', 6.5], ['other', '其他', 5.0],
  ];
  const CMAP = Object.fromEntries(CARDIO.map(c => [c[0], c]));
  // 日常活動係數只看工作量（運動另外算，才不會重複）；含消化食物的熱效應
  const NEAT = { light: 1.2, moderate: 1.375, heavy: 1.55 };
  const NEAT_LABEL = { light: '輕度工作', moderate: '中度工作', heavy: '重度工作' };

  function list(date) { return (Store.get().cardio || {})[date] || []; }
  function ensure(date) { const st = Store.get(); const c = st.cardio || (st.cardio = {}); return c[date] || (c[date] = []); }
  // 機器顯示的是「總消耗」，含本來就會消耗的基礎代謝，要扣掉；沒填就依 MET 估淨消耗
  function cardioNet(e, p, bmr) {
    if (e.kcal > 0) return Math.max(0, e.kcal - bmr / 1440 * (e.min || 0));
    const met = (CMAP[e.type] || CMAP.other)[2];
    return (met - 1) * p.weight * (e.min || 0) / 60;
  }

  function compute(date) {
    const p = Store.get().profile;
    const bmr = Calc.bmrMifflin(p);
    const neat = NEAT[p.work] || 1.2;
    const base = bmr * neat;
    const tr = TrainPage.burnOf(date);
    const cardio = list(date).map(e => Object.assign({}, e, { net: Math.round(cardioNet(e, p, bmr)) }));
    const cardioKcal = cardio.reduce((s, e) => s + e.net, 0);
    const intake = DietPage.dayTotal(date).kcal;
    const out = Math.round(base + tr.done + cardioKcal);
    return { date, p, bmr: Math.round(bmr), neat, base: Math.round(base), tr, cardio, cardioKcal, out, intake: Math.round(intake), deficit: Math.round(out - intake), logged: intake > 0 };
  }

  // 近 7 天（有記錄飲食的日子）累積赤字
  function week(date) {
    let sum = 0, n = 0;
    for (let i = 6; i >= 0; i--) { const b = compute(U.addDays(date, -i)); if (b.logged) { sum += b.deficit; n++; } }
    return { sum, n };
  }

  const fatG = d => Math.round(d / 7.7); // 1 公斤脂肪約 7,700 大卡

  function deficitLine(b) {
    if (!b.logged) return '<span class="muted">還沒記錄飲食，記完就會算出赤字</span>';
    return b.deficit >= 0
      ? `<b class="num" style="color:var(--good);font-size:22px">−${num(b.deficit)}</b> 大卡 <span class="muted small">約燃燒脂肪 ${num(fatG(b.deficit))} g</span>`
      : `<b class="num" style="color:var(--bad);font-size:22px">+${num(-b.deficit)}</b> 大卡 <span class="muted small">熱量盈餘（吃的比消耗多）</span>`;
  }

  function warn(b) {
    if (!b.logged) return '';
    // 當天還沒結束（晚餐多半還沒記）就不警告赤字太大，避免嚇到人
    const final = b.date < U.today() || new Date().getHours() >= 20;
    if (!final && b.deficit > 700) return '<li class="info">今天還沒結束，晚餐記完再看赤字比較準。</li>';
    if (b.deficit > 1000) return '<li class="warn">赤字超過 1,000 大卡：容易掉肌肉、代謝下降、暴食反彈。建議赤字維持在 300–700 大卡，訓練日多吃一點碳水。</li>';
    if (b.intake < b.bmr) return `<li class="warn">吃的（${num(b.intake)}）低於基礎代謝 ${num(b.bmr)} 大卡，長期這樣身體會進入節能模式，反而瘦不下來。</li>`;
    if (b.deficit < 0) return '<li class="info">今天是熱量盈餘。偶爾一天沒關係，看「近 7 天累積」比較準；明天正常吃、正常練就好。</li>';
    return '';
  }

  // 精簡版（飲食頁、總覽頁）
  function summary(date, withLink) {
    const b = compute(date);
    const wk = week(date);
    return `<div class="bal-mini">
      <div class="row between"><b>🔥 熱量赤字</b>${withLink ? '<button class="ghost small" data-go="train">記錄有氧 →</button>' : ''}</div>
      <div class="bal-eq num"><span><small>消耗</small>${num(b.out)}</span><i>−</i><span><small>攝取</small>${num(b.intake)}</span><i>=</i><span>${b.logged ? `<small>${b.deficit >= 0 ? '赤字' : '盈餘'}</small><b style="color:${b.deficit >= 0 ? 'var(--good)' : 'var(--bad)'}">${num(Math.abs(b.deficit))}</b>` : '<small>赤字</small>—'}</span></div>
      <div class="muted tiny">消耗＝基礎代謝＋日常 ${num(b.base)}${b.tr.done ? `＋重訓 ${num(b.tr.done)}` : ''}${b.cardioKcal ? `＋有氧 ${num(b.cardioKcal)}` : ''}${wk.n >= 2 ? `．近 7 天累積${wk.sum >= 0 ? '赤字' : '盈餘'} <b>${num(Math.abs(wk.sum))}</b> 大卡（約 ${num(Math.abs(wk.sum) / 7700, 2)} kg 脂肪，${wk.n} 天）` : ''}</div>
    </div>`;
  }

  // 完整卡片（訓練頁）：消耗明細＋有氧紀錄
  function mount(box, date) {
    if (!box) return;
    const b = compute(date);
    const today = date === U.today();
    box.innerHTML = `<div class="row between"><h2 style="margin:0">🔥 ${today ? '今日' : date.slice(5).replace('-', '/') + ' '}消耗與熱量赤字</h2><span class="muted small">打勾、加有氧會即時更新</span></div>
      <table class="t" style="margin-top:8px">
        <tr><td>基礎代謝＋日常活動<br><small class="muted">BMR ${num(b.bmr)} × ${b.neat}（${NEAT_LABEL[b.p.work] || '輕度工作'}，含消化）</small></td><td class="r"><b>${num(b.base)}</b></td></tr>
        <tr><td>${b.tr.rest ? '休息日伸展' : '重訓'}（已打勾 ${b.tr.n}/${b.tr.total} 項，約 ${b.tr.doneMin} 分鐘）<br><small class="muted">全部做完約 ${num(b.tr.planned)} 大卡、${b.tr.plannedMin} 分鐘；依組數 × 次數 × 節奏＋組間休息推算</small></td><td class="r"><b>${num(b.tr.done)}</b></td></tr>
        <tr><td>有氧／其他運動（${b.cardio.length} 筆）</td><td class="r"><b>${num(b.cardioKcal)}</b></td></tr>
        <tr><td><b>總消耗</b></td><td class="r"><b>${num(b.out)}</b></td></tr>
        <tr><td>今天吃了（飲食紀錄）</td><td class="r">${num(b.intake)}</td></tr>
      </table>
      <div style="margin:10px 0 4px">熱量赤字：${deficitLine(b)}</div>
      ${warn(b) ? `<ul class="tips" style="margin-top:8px">${warn(b)}</ul>` : ''}
      <h3 style="margin-top:14px">🏃 有氧／其他運動</h3>
      ${b.cardio.length ? `<table class="t small">${b.cardio.map((e, i) => `<tr><td>${esc((CMAP[e.type] || CMAP.other)[1])}${e.note ? ` <span class="muted">${esc(e.note)}</span>` : ''}</td><td class="r">${num(e.min)} 分</td>
        <td class="r">${e.kcal > 0 ? `機器 ${num(e.kcal)}` : '<span class="muted">估算</span>'}</td><td class="r"><b>淨 ${num(e.net)}</b> 大卡</td><td class="r"><button class="icon" title="刪除" data-cdel="${i}">✕</button></td></tr>`).join('')}</table>` : '<p class="muted small">還沒有有氧紀錄。重訓後跑跑步機的話，把時間和機器顯示的熱量填進來。</p>'}
      <div class="row bal-form" style="margin-top:8px;align-items:flex-end">
        <label class="f"><span>種類</span><select data-c="type">${CARDIO.map(c => `<option value="${c[0]}">${c[1]}</option>`).join('')}</select></label>
        <label class="f" style="width:90px"><span>時間（分）</span><input data-c="min" type="number" min="1" max="600" placeholder="30"></label>
        <label class="f" style="width:130px"><span>機器顯示熱量（選填）</span><input data-c="kcal" type="number" min="0" max="3000" placeholder="例如 300"></label>
        <button type="button" data-c="add">＋新增</button>
      </div>
      <p class="muted tiny" style="margin-top:6px">機器顯示的熱量包含「本來就會消耗」的基礎代謝，程式會自動扣掉這部分避免重複計算；而且跑步機、橢圓機常高估 10–20%，可以保守看待。沒填熱量就依體重和時間估算。</p>`;
    $('[data-c="add"]', box).addEventListener('click', () => {
      const min = +$('[data-c="min"]', box).value, kcal = +$('[data-c="kcal"]', box).value || 0;
      if (!(min > 0)) { U.toast('請填運動時間（分鐘）'); return; }
      ensure(date).push({ type: $('[data-c="type"]', box).value, min, kcal: kcal > 0 ? kcal : null });
      Store.save(); U.toast('已記錄有氧'); mount(box, date);
    });
    $$('[data-cdel]', box).forEach(x => x.addEventListener('click', () => { ensure(date).splice(+x.dataset.cdel, 1); if (!list(date).length) delete Store.get().cardio[date]; Store.save(); mount(box, date); }));
  }

  return { compute, summary, mount, week, CARDIO };
})();
