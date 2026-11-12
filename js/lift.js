// 重量計算與紀錄：輸入最近一組的「重量 × 次數」→ 估 1RM → 依課表次數與 RPE 算正式組重量與熱身重量；
// 每組實際重量可記錄，用雙重漸進法算下次建議重量，並顯示每個動作的進步曲線與個人最佳
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

  // fixed：已有「下次建議重量」時直接用它當正式重量
  function calc(it, k, rec, fixed) {
    const t = target(it);
    const one = e1rm(rec.w, rec.r);
    const work = fixed || round(one / (1 + (t.reps + t.rir) / 30), k);
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
  const STEP_UP = { bb: 2.5, ez: 2.5, db: 2, kb: 4, mc: 2.5 };

  // ---- 每組實際重量紀錄：Store.setLog[日期][動作] = [{ w, r }] ----
  const logs = () => { const st = Store.get(); return st.setLog || (st.setLog = {}); };
  const dayLog = (date, lk) => ((Store.get().setLog || {})[date] || {})[lk];
  const best = sets => sets.reduce((b, x) => (e1rm(x.w, x.r) > e1rm(b.w, b.r) ? x : b), sets[0]);
  const bestOne = sets => { const b = best(sets); return e1rm(b.w, b.r); };
  function history(lk) { // [{ date, sets }] 由舊到新
    const L = Store.get().setLog || {};
    return Object.keys(L).sort().filter(d => L[d][lk] && L[d][lk].length).map(d => ({ date: d, sets: L[d][lk] }));
  }
  function range(it) {
    const ns = (String(it.reps).match(/\d+/g) || []).map(Number);
    const isR = ns.length >= 2 && /\d\s*[–~-]\s*\d/.test(it.reps);
    return { lo: ns[0] || 8, hi: isR ? ns[1] : ns[0] || 8 };
  }
  // 雙重漸進：最重的那幾組都做到次數上限 → 加重；差很多 → 減 5%；其餘維持重量、多做幾下
  function advise(it, k, sets) {
    const { lo, hi } = range(it);
    const top = Math.max(...sets.map(x => x.w));
    const atTop = sets.filter(x => x.w >= top);
    if (atTop.every(x => x.r >= hi)) return { nx: round(top + STEP_UP[k], k), why: `每組都做滿 ${hi} 下，下次加 ${STEP_UP[k]} kg` };
    if (atTop.some(x => x.r < lo - 1)) return { nx: round(top * 0.95, k), why: `有組數比 ${lo} 下少太多，下次先減 5%` };
    return { nx: top, why: `維持 ${num(top, 1)} kg，每組都做到 ${hi} 下再加重` };
  }
  const setsTxt = sets => {
    const ws = [...new Set(sets.map(x => x.w))];
    return ws.length === 1 ? `${num(ws[0], 1)} kg × ${sets.map(x => x.r).join('、')} 下` : sets.map(x => `${num(x.w, 1)}×${x.r}`).join('、');
  };
  const md = d => `${+d.slice(5, 7)}/${+d.slice(8)}`;

  function inner(x) {
    const { it, k, date } = x;
    const lk = keyOf(it);
    const rec = (Store.get().lifts || {})[lk];
    const lg = dayLog(date, lk);
    let top = '';
    if (rec) {
      const c = calc(it, k, rec, rec.nx);
      const nextLbl = lg && rec.nx && rec.d === date ? '下次正式組' : '正式組';
      top = `<div class="lift-res"><b>🏋️ ${nextLbl} ${unit(k)}${num(c.work, 1)} kg</b>
        <span class="muted tiny">${rec.nx ? `（${esc(rec.why || '')}；${md(rec.d)} 最好的一組 ${num(rec.w, 1)} kg × ${rec.r} 下）` : `（依你 ${num(rec.w, 1)} kg × ${rec.r} 下，估 1RM ${num(c.one)} kg；目標 ${c.t.reps} 下、RPE ${c.t.rpe}）`}</span>
        <button class="ghost small" data-lift-edit>改</button></div>
        ${c.wu.length ? `<div class="tiny">熱身：${c.wu.map(([w, r]) => `${num(w, 1)} kg × ${r}`).join(' → ')} → 正式</div>` : ''}`;
    }
    const prev = history(lk).filter(s => s.date < date);
    const last = prev[prev.length - 1];
    const logLine = lg
      ? `<div class="lift-log done"><span>📝 這天做了：<b>${setsTxt(lg)}</b></span><button class="ghost small" data-log-edit>改</button></div>`
      : `<div class="lift-log"><button class="ghost small" data-log-edit>📝 記錄這次的重量</button>${rec ? '' : '<button class="ghost small" data-lift-edit>🏋️ 算我的正式重量</button>'}${last ? `<span class="muted tiny">上次 ${md(last.date)}：${setsTxt(last.sets)}</span>` : ''}</div>`;
    return top + logLine;
  }

  const rowHtml = (s, i) => `<div class="log-row"><span class="muted small">第 ${i + 1} 組</span>
      <input type="number" data-sw min="0" max="500" step="0.5" value="${s.w}" placeholder="kg" aria-label="第 ${i + 1} 組重量"><span class="muted small">kg ×</span>
      <input type="number" data-sr min="0" max="50" value="${s.r}" placeholder="下" aria-label="第 ${i + 1} 組次數"><span class="muted small">下</span></div>`;

  function logForm(box, x) {
    const { it, k, date, sets } = x;
    const lk = keyOf(it);
    const rec = (Store.get().lifts || {})[lk];
    const { hi } = range(it);
    const w0 = rec ? calc(it, k, rec, rec.nx).work : '';
    const cur = dayLog(date, lk) || Array.from({ length: sets || 3 }, () => ({ w: w0, r: hi }));
    box.innerHTML = `<div class="log-form"><div class="small" style="margin-bottom:4px">📝 ${md(date)} 實際做的${k === 'db' ? '（啞鈴填單手重量）' : ''}</div>
      <div data-rows>${cur.map(rowHtml).join('')}</div>
      <div class="row" style="gap:6px;margin-top:6px;flex-wrap:wrap"><button type="button" class="ghost small" data-row-add>＋一組</button><button type="button" class="ghost small" data-row-del>－一組</button>
        <span style="flex:1"></span>${dayLog(date, lk) ? '<button type="button" class="ghost small" data-log-clear>清除</button>' : ''}<button type="button" class="ghost small" data-lift-cancel>取消</button><button type="button" class="small" data-log-save>存檔</button></div>
      <div class="muted tiny" style="margin-top:4px">只填正式組，熱身組不用填。存檔後會自動打勾，並算出下次的建議重量。</div></div>`;
  }

  // 用某天的紀錄更新「下次建議」；只採用最新一天
  function applyAdvice(x, lk) {
    const st = Store.get(); const lifts = st.lifts || (st.lifts = {});
    const h = history(lk); const last = h[h.length - 1];
    if (!last) { if (lifts[lk] && lifts[lk].nx) delete lifts[lk]; return; }
    const b = best(last.sets);
    lifts[lk] = Object.assign({ w: b.w, r: b.r, d: last.date }, advise(x.it, x.k, last.sets));
  }

  function saveLog(box, x) {
    const lk = keyOf(x.it);
    const sets = $$('.log-row', box).map(r => ({ w: +$('[data-sw]', r).value, r: Math.round(+$('[data-sr]', r).value) })).filter(s => s.w > 0 && s.r > 0);
    if (!sets.length) { U.toast('至少填一組重量和次數'); return false; }
    const others = history(lk).filter(s => s.date !== x.date);
    const prevBest = others.length ? Math.max(...others.map(s => bestOne(s.sets))) : 0;
    const L = logs(); (L[x.date] || (L[x.date] = {}))[lk] = sets;
    applyAdvice(x, lk);
    Store.save();
    const nb = bestOne(sets);
    const rec = Store.get().lifts[lk];
    if (prevBest && nb > prevBest + 0.01) U.toast(`🏆 新紀錄！估 1RM ${num(nb, 1)} kg（+${num(nb - prevBest, 1)}）`);
    else U.toast(rec.d === x.date ? `已記錄。${rec.why}` : '已記錄');
    // 記完自動打勾
    const ex = box.closest('.ex'); const cb = ex && $('[data-done]', ex);
    if (cb && !cb.checked) { cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); }
    return true;
  }

  function clearLog(x) {
    const lk = keyOf(x.it); const L = Store.get().setLog || {};
    if (L[x.date]) { delete L[x.date][lk]; if (!Object.keys(L[x.date]).length) delete L[x.date]; }
    applyAdvice(x, lk);
    Store.save(); U.toast('已清除這天的紀錄');
  }

  const reg = {}; // 畫面上的動作，依打勾用的 key 對回資料
  function html(it, phaseKey, itemKey, date, sets) {
    const k = kind(it, phaseKey);
    if (!k) return '';
    reg[itemKey] = { it, k, date: date || U.today(), sets };
    return `<div class="lift" data-lift="${esc(keyOf(it))}" data-item="${esc(itemKey)}">${inner(reg[itemKey])}</div>`;
  }

  function form(box, x) {
    const { it, k } = x;
    const rec = (Store.get().lifts || {})[keyOf(it)] || {};
    box.innerHTML = `<div class="row lift-form" style="gap:6px;align-items:flex-end;flex-wrap:wrap">
      <label class="f" style="width:96px"><span>${k === 'db' ? '單手重量' : '重量'}（kg）</span><input type="number" data-lw min="1" max="500" step="0.5" value="${rec.w || ''}" placeholder="60"></label>
      <label class="f" style="width:72px"><span>做了幾下</span><input type="number" data-lr min="1" max="20" value="${rec.r || ''}" placeholder="8"></label>
      <button type="button" data-lift-save>計算</button><button type="button" class="ghost" data-lift-cancel>取消</button></div>
      <div class="muted tiny" style="margin-top:4px">填最近做過、接近力竭的一組（例如 60 kg 做了 8 下）。1–10 下最準。</div>`;
    $('[data-lw]', box).focus();
  }

  // 同一個動作可能出現在畫面上好幾處，一起更新；再更新進步卡片
  function refresh(lk) {
    $$(`.lift[data-lift="${CSS.escape(lk)}"]`).forEach(b => { const x = reg[b.dataset.item]; if (x) b.innerHTML = inner(x); });
    const pg = document.getElementById('liftProgress'); if (pg) pg.innerHTML = progress();
  }

  // 用事件委派：頁面重畫也不用重新綁
  function bind(root) {
    root.addEventListener('click', e => {
      const box = e.target.closest('.lift'); if (!box) return;
      const x = reg[box.dataset.item]; if (!x) return;
      const lk = box.dataset.lift;
      if (e.target.closest('[data-lift-edit]')) form(box, x);
      else if (e.target.closest('[data-log-edit]')) logForm(box, x);
      else if (e.target.closest('[data-lift-cancel]')) box.innerHTML = inner(x);
      else if (e.target.closest('[data-row-add]')) {
        const rows = $('[data-rows]', box); const n = rows.children.length; if (n >= 10) return;
        const lr = rows.lastElementChild;
        rows.insertAdjacentHTML('beforeend', rowHtml({ w: lr ? $('[data-sw]', lr).value : '', r: lr ? $('[data-sr]', lr).value : '' }, n));
      } else if (e.target.closest('[data-row-del]')) {
        const rows = $('[data-rows]', box); if (rows.children.length > 1) rows.lastElementChild.remove();
      } else if (e.target.closest('[data-log-save]')) { if (saveLog(box, x)) refresh(lk); }
      else if (e.target.closest('[data-log-clear]')) { clearLog(x); refresh(lk); }
      else if (e.target.closest('[data-lift-save]')) {
        const w = +$('[data-lw]', box).value, r = Math.round(+$('[data-lr]', box).value);
        if (!(w > 0) || !(r >= 1 && r <= 20)) { U.toast('請填重量和次數（1–20 下）'); return; }
        const st = Store.get(); (st.lifts || (st.lifts = {}))[lk] = { w, r, d: U.today() };
        Store.save(); refresh(lk);
        U.toast('已算出正式重量');
      }
    });
    // 改第一組的重量，後面還沒手動改過的組一起帶入
    root.addEventListener('input', e => {
      const inp = e.target.closest('.log-row [data-sw]'); if (!inp) return;
      const rows = $$('.log-row', inp.closest('[data-rows]'));
      if (rows[0] && $('[data-sw]', rows[0]) === inp) rows.slice(1).forEach(r => { const w = $('[data-sw]', r); if (!w.dataset.touched) w.value = inp.value; });
      else inp.dataset.touched = '1';
    });
  }

  // ---- 進步曲線 ----
  function spark(vals) {
    if (vals.length < 2) return '';
    const W = 120, H = 34, lo = Math.min(...vals), hi = Math.max(...vals), sp = hi - lo || 1;
    const pts = vals.map((v, i) => `${(i / (vals.length - 1) * (W - 6) + 3).toFixed(1)},${(H - 4 - (v - lo) / sp * (H - 8)).toFixed(1)}`);
    const [lx, ly] = pts[pts.length - 1].split(',');
    return `<svg class="spark" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><polyline points="${pts.join(' ')}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${lx}" cy="${ly}" r="3" fill="var(--brand)"/></svg>`;
  }
  function progress() {
    const L = Store.get().setLog || {};
    const keys = [...new Set(Object.values(L).flatMap(o => Object.keys(o)))];
    if (!keys.length) return `<h2 style="margin:0 0 4px">📈 重量進步</h2><p class="muted small" style="margin:0">在器材動作下方按「📝 記錄這次的重量」，這裡就會出現每個動作的進步曲線和個人最佳紀錄。</p>`;
    const rows = keys.map(lk => {
      const h = history(lk);
      const ones = h.map(s => bestOne(s.sets));
      const pr = Math.max(...ones), prI = ones.lastIndexOf(pr);
      return { lk, h, ones, pr, prI, last: h[h.length - 1], d: ones[ones.length - 1] - ones[0], rec: (Store.get().lifts || {})[lk] };
    }).sort((a, b) => (a.last.date < b.last.date ? 1 : a.last.date > b.last.date ? -1 : 0));
    return `<div class="row between"><h2 style="margin:0">📈 重量進步</h2><span class="muted tiny">1RM＝依紀錄推算的最大重量</span></div>
      <div class="prog-list">${rows.map(r => `<details class="prog">
        <summary><div class="prog-main"><b>${esc(r.lk)}</b>
          <span class="small">最近 ${md(r.last.date)}：${setsTxt(r.last.sets)}</span>
          <span class="tiny muted">估 1RM ${num(r.ones[r.ones.length - 1], 1)} kg．🏆 最佳 ${num(r.pr, 1)} kg（${md(r.h[r.prI].date)}）${r.h.length > 1 ? `．共 ${r.h.length} 次 <b style="color:${r.d >= 0 ? 'var(--good)' : 'var(--bad)'}">${r.d >= 0 ? '+' : ''}${num(r.d, 1)} kg</b>` : ''}</span>
          ${r.rec && r.rec.nx ? `<span class="tiny">下次 <b>${num(r.rec.nx, 1)} kg</b>：${esc(r.rec.why || '')}</span>` : ''}</div>${spark(r.ones)}</summary>
        <table class="t small"><tr class="muted tiny"><td>日期</td><td>每組</td><td class="r">估 1RM</td><td class="r">總量</td></tr>
          ${r.h.slice().reverse().map(s => `<tr><td>${md(s.date)}</td><td>${setsTxt(s.sets)}</td><td class="r">${num(bestOne(s.sets), 1)}</td><td class="r muted">${num(s.sets.reduce((a, y) => a + y.w * y.r, 0))} kg</td></tr>`).join('')}</table>
      </details>`).join('')}</div>`;
  }

  bind(document);
  return { html, calc, kind, keyOf, progress };
})();
