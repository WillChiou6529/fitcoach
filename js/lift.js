// 重量計算機：輸入最近一組的「重量 × 次數」→ 估 1RM → 依課表次數與 RPE 算正式組重量與熱身重量
window.Lift = (function () {
  'use strict';
  const { esc, num, $, $$ } = U;
  const BAR = 20; // 標準槓鈴 20 kg

  // 只有用器材加重的動作才需要算重量（徒手、有氧、伸展不算）
  function kind(it, phaseKey) {
    if (phaseKey !== 'main' && phaseKey !== 'accessory') return '';
    const n = it.name || '', ld = it.load || '';
    if (!/RPE|1RM/.test(ld) || /心率|坡度|體重|公斤/.test(ld)) return '';
    if (/輔助|助力|Assisted|彈力帶|Band|AMRAP|EMOM|Tabata|引體/i.test(n)) return '';
    if (/徒手|Bodyweight|原地深蹲|側向跨步/i.test(n)) return '';
    if (/EZ/.test(n)) return 'ez';
    if (/高腳杯|Goblet/i.test(n)) return 'kb';
    if (/阿諾|Arnold|保加利亞|Bulgarian/i.test(n)) return 'db';
    if (/Pallof/i.test(n)) return 'mc';
    if (/啞鈴|Dumbbell|集中彎舉/i.test(n)) return 'db';
    if (/壺鈴|Kettlebell/i.test(n)) return 'kb';
    if (/器械|機|Machine|繩索|Cable|Smith|史密斯|滑輪|Pulldown|下拉|腿推|Leg Press/i.test(n)) return 'mc';
    if (/伏地挺身|波比|登山者|棒式|水瓶|撐體|開合|跳|衝刺|超人|臀橋|捲腹|自體/.test(n)) return '';
    if (/槓鈴|Barbell|硬舉|Deadlift|深蹲|Squat|臥推|Bench|肩推|Press/i.test(n)) return 'bb';
    return '';
  }
  // 同一個動作在不同天、不同套共用紀錄：去掉【超級組】標記，用中文名當鍵
  const keyOf = it => (it.name || '').replace(/【[^】]*】/g, '').replace(/[（(].*$/, '').trim();

  function target(it) {
    const ns = (String(it.reps).match(/\d+/g) || []).map(Number);
    const reps = ns.length >= 2 && /\d\s*[–~-]\s*\d/.test(it.reps) ? Math.round((ns[0] + ns[1]) / 2) : ns[0] || 8;
    const rpe = +((String(it.load).match(/RPE\s*(\d+(?:\.\d+)?)/) || [])[1] || 8);
    return { reps, rpe, rir: Math.max(0, 10 - rpe) };
  }
  const e1rm = (w, r) => w * (1 + r / 30);                         // Epley 公式
  const step = k => (k === 'db' ? 2 : 2.5);
  function round(w, k) {
    const s = step(k); let x = Math.round(w / s) * s;
    if (k === 'bb') x = Math.max(BAR, x);
    if (k === 'ez') x = Math.max(10, x); // EZ 槓約 10 kg
    return Math.max(s, x);
  }

  function calc(it, k, rec) {
    const t = target(it);
    const one = e1rm(rec.w, rec.r);
    const work = round(one / (1 + (t.reps + t.rir) / 30), k);
    // 熱身：照說明裡的「空槓×10、50%×5、70%×3」換算成公斤
    const wu = [];
    const m = String(it.note || '').match(/正式組前[：:]([^。]*)/);
    if (m && /\d\s*%/.test(m[1])) m[1].split(/[、，,]/).forEach(s => {
      const r = (s.match(/[×x]\s*(\d+)/) || [])[1];
      if (/空槓/.test(s)) wu.push([k === 'ez' ? 10 : BAR, r]);
      else { const p = (s.match(/(\d+)\s*%/) || [])[1]; if (p) wu.push([round(work * p / 100, k), r]); }
    });
    else if (m) { wu.push([round(work * 0.4, k), 10]); wu.push([round(work * 0.65, k), 5]); } // 「輕重量×10、中重量×5」
    return { t, one: Math.round(one), work, wu };
  }

  const unit = k => (k === 'db' ? '每手 ' : '');

  function inner(it, k) {
    const rec = (Store.get().lifts || {})[keyOf(it)];
    if (!rec) return `<button class="ghost small" data-lift-edit>🏋️ 算我的正式重量</button>`;
    const c = calc(it, k, rec);
    return `<div class="lift-res"><b>🏋️ 正式組 ${unit(k)}${num(c.work, 1)} kg</b>
      <span class="muted tiny">（依你 ${num(rec.w, 1)} kg × ${rec.r} 下，估 1RM ${num(c.one)} kg；目標 ${c.t.reps} 下、RPE ${c.t.rpe}）</span>
      <button class="ghost small" data-lift-edit>改</button></div>
      ${c.wu.length ? `<div class="tiny">熱身：${c.wu.map(([w, r]) => `${num(w, 1)} kg × ${r}`).join(' → ')} → 正式</div>` : ''}`;
  }

  const reg = {}; // 畫面上的動作，依打勾用的 key 對回資料
  function html(it, phaseKey, itemKey) {
    const k = kind(it, phaseKey);
    if (!k) return '';
    reg[itemKey] = it;
    return `<div class="lift" data-lift="${esc(keyOf(it))}" data-item="${esc(itemKey)}" data-lk="${k}">${inner(it, k)}</div>`;
  }

  function form(box, it, k) {
    const rec = (Store.get().lifts || {})[keyOf(it)] || {};
    box.innerHTML = `<div class="row lift-form" style="gap:6px;align-items:flex-end;flex-wrap:wrap">
      <label class="f" style="width:96px"><span>${k === 'db' ? '單手重量' : '重量'}（kg）</span><input type="number" data-lw min="1" max="500" step="0.5" value="${rec.w || ''}" placeholder="60"></label>
      <label class="f" style="width:72px"><span>做了幾下</span><input type="number" data-lr min="1" max="20" value="${rec.r || ''}" placeholder="8"></label>
      <button type="button" data-lift-save>計算</button><button type="button" class="ghost" data-lift-cancel>取消</button></div>
      <div class="muted tiny" style="margin-top:4px">填最近做過、接近力竭的一組（例如 60 kg 做了 8 下）。1–10 下最準。</div>`;
    $('[data-lw]', box).focus();
  }

  // 用事件委派：頁面重畫也不用重新綁
  const findItem = b => reg[b.dataset.item];
  function bind(root) {
    root.addEventListener('click', e => {
      const box = e.target.closest('.lift'); if (!box) return;
      const it = findItem(box); if (!it) return;
      const k = box.dataset.lk;
      if (e.target.closest('[data-lift-edit]')) form(box, it, k);
      else if (e.target.closest('[data-lift-cancel]')) box.innerHTML = inner(it, k);
      else if (e.target.closest('[data-lift-save]')) {
        const w = +$('[data-lw]', box).value, r = Math.round(+$('[data-lr]', box).value);
        if (!(w > 0) || !(r >= 1 && r <= 20)) { U.toast('請填重量和次數（1–20 下）'); return; }
        const st = Store.get(); (st.lifts || (st.lifts = {}))[box.dataset.lift] = { w, r, d: U.today() };
        Store.save();
        // 同一個動作可能出現在畫面上好幾處，一起更新
        $$(`.lift[data-lift="${CSS.escape(box.dataset.lift)}"]`, root).forEach(b => { const x = findItem(b); if (x) b.innerHTML = inner(x, b.dataset.lk); });
        U.toast('已算出正式重量');
      }
    });
  }

  bind(document);
  return { html, calc, kind, keyOf };
})();
