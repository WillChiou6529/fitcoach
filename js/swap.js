// 換動作：器材被占用或沒有器材時，一鍵換成目標肌群一致的動作（資料在 data/swaps.js）
window.Swap = (function () {
  'use strict';
  const { esc, $, $$ } = U;
  const DB = () => window.SWAP_DB || [];
  const PHASES = { activation: 1, main: 1, accessory: 1 };
  const EQ = ['徒手', '彈力帶', '啞鈴', '壺鈴', '槓鈴', '器械', '繩索'];
  const EQ_ICON = { 徒手: '🙌', 彈力帶: '➰', 啞鈴: '🏋️', 壺鈴: '🔔', 槓鈴: '🏋️', 器械: '⚙️', 繩索: '🔗' };
  const clean = n => String(n || '').replace(/【[^】]*】/g, '').trim();
  const baseName = n => clean(n).replace(/[（(].*$/, '').trim();

  const cache = new Map();
  function patternFor(name) {
    const n = clean(name);
    if (cache.has(n)) return cache.get(n);
    let hit = null;
    for (const p of DB()) {
      if (!p._re) { try { p._re = new RegExp(p.match, 'i'); } catch (e) { p._re = /$^/; } }
      if (p._re.test(n)) { hit = p; break; }
    }
    cache.set(n, hit);
    return hit;
  }

  const st = () => Store.get();
  function choice(date, key, it) {
    const s = st();
    const d = ((s.swaps || {})[date] || {})[key];
    if (d) return Object.assign({ scope: 'day' }, d);
    const a = (s.swapAlways || {})[baseName(it.name)];
    return a ? Object.assign({ scope: 'always' }, a) : null;
  }

  // 畫面上要顯示的動作：有換就把名稱、要點換掉，組數次數休息不變
  function resolve(it, phaseKey, date, key) {
    if (!PHASES[phaseKey]) return { it, sw: null };
    const c = choice(date, key, it);
    if (!c) return { it, sw: null };
    const tag = String(it.name).match(/^【[^】]*】/);
    return {
      // 換成單側動作時，次數改成「每側」
      it: Object.assign({}, it, { name: (tag ? tag[0] : '') + c.name, note: c.cue || '',
        reps: /單腿|單腳|單臂|單手|Single|One-Arm/i.test(c.name) && !/每側|每邊/.test(it.reps) ? '每側 ' + it.reps : it.reps }),
      sw: { orig: it.name, scope: c.scope, eq: c.eq },
    };
  }

  function button(it, phaseKey, key, sw) {
    if (!PHASES[phaseKey]) return '';
    if (sw) return `<div class="swap-on"><span class="chip">🔄 ${sw.scope === 'always' ? '固定替換' : '今天替換'}</span><span class="muted tiny">原本：${esc(clean(sw.orig))}</span>
      <button class="ghost small" data-swap="${esc(key)}">換別的</button><button class="ghost small" data-unswap="${esc(key)}" data-scope="${sw.scope}">還原</button></div>`;
    return patternFor(it.name) ? `<button class="ghost small swap-btn" data-swap="${esc(key)}" title="器材被占用、沒有這台器材時，換成練同部位的動作">🔄 器材沒空？換動作</button>` : '';
  }

  // 依 key（vid:phase:i）找回原始動作
  function original(key) {
    const [vid, ph, i] = key.split(':');
    for (const g of Object.values(window.WORKOUT_DB || {})) for (const v of g.variants) {
      if (v.id !== vid) continue;
      const p = v.phases.find(x => x.key === ph);
      return p && p.items[+i];
    }
    return null;
  }

  let sheet = null;
  function close() { if (sheet) { sheet.remove(); sheet = null; document.body.classList.remove('no-scroll'); } }
  function open(key, date) {
    const it = original(key); if (!it) return;
    const p = patternFor(it.name); if (!p) { U.toast('這個動作還沒有替代清單'); return; }
    const cur = choice(date, key, it);
    const me = baseName(it.name);
    const alts = p.alts.filter(a => baseName(a.name) !== me);
    let eqSel = '';
    close();
    sheet = document.createElement('div');
    sheet.className = 'swap-sheet';
    const draw = () => {
      const list = alts.filter(a => !eqSel || a.eq === eqSel);
      const eqs = EQ.filter(e => alts.some(a => a.eq === e));
      sheet.innerHTML = `<div class="swap-back" data-close></div>
      <div class="swap-panel" role="dialog" aria-label="換動作">
        <div class="row between"><b>🔄 換掉「${esc(clean(it.name))}」</b><button class="icon" data-close title="關閉">✕</button></div>
        <p class="small" style="margin:6px 0">練的部位：<b>${esc(p.muscles)}</b>．組數、次數、休息照原本 <span class="muted">（${it.sets} 組 × ${esc(it.reps)}）</span></p>
        <div class="row swap-eq" style="gap:6px;flex-wrap:wrap;margin-bottom:8px">
          <button class="${eqSel ? 'ghost' : ''} small" data-eq="">全部</button>
          ${eqs.map(e => `<button class="${eqSel === e ? '' : 'ghost'} small" data-eq="${e}">${EQ_ICON[e] || ''} ${e}</button>`).join('')}
        </div>
        <div class="swap-list">${list.map(a => {
          const i = alts.indexOf(a);
          const on = cur && cur.name === a.name;
          return `<div class="swap-item ${on ? 'on' : ''}">
            <div><b>${esc(a.name)}</b> <span class="pill gray">${EQ_ICON[a.eq] || ''} ${esc(a.eq)}</span> <span class="fit" title="和原動作的相似度">${'★'.repeat(a.fit || 3)}${'☆'.repeat(5 - (a.fit || 3))}</span>
              <div class="muted small">${esc(a.cue || '')}</div></div>
            <div class="swap-act"><button class="small" data-pick="${i}" data-scope="day">今天換這個</button><button class="ghost small" data-pick="${i}" data-scope="always">以後都換</button></div>
          </div>`;
        }).join('') || '<p class="muted">這種器材沒有替代動作。</p>'}</div>
        <p class="muted tiny" style="margin-top:8px">★ 越多越接近原動作。「以後都換」適合你的健身房根本沒有這台器材；之後想換回來，在動作下方按「還原」。</p>
      </div>`;
    };
    draw();
    document.body.appendChild(sheet);
    document.body.classList.add('no-scroll');
    sheet.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) { close(); return; }
      const eb = e.target.closest('[data-eq]'); if (eb) { eqSel = eb.dataset.eq; draw(); return; }
      const pb = e.target.closest('[data-pick]'); if (!pb) return;
      const a = alts[+pb.dataset.pick]; const s = st();
      const rec = { name: a.name, eq: a.eq, cue: a.cue };
      if (pb.dataset.scope === 'always') {
        (s.swapAlways || (s.swapAlways = {}))[me] = rec;
        if (s.swaps && s.swaps[date]) { delete s.swaps[date][key]; if (!Object.keys(s.swaps[date]).length) delete s.swaps[date]; }
      } else ((s.swaps || (s.swaps = {}))[date] || (s.swaps[date] = {}))[key] = rec;
      Store.save(); close();
      U.toast(`已換成：${baseName(a.name)}${pb.dataset.scope === 'always' ? '（以後都用這個）' : ''}`);
      TrainPage.redraw();
    });
  }

  function unswap(key, date, scope) {
    const s = st(); const it = original(key);
    if (scope === 'always' && it) delete (s.swapAlways || {})[baseName(it.name)];
    if (s.swaps && s.swaps[date]) { delete s.swaps[date][key]; if (!Object.keys(s.swaps[date]).length) delete s.swaps[date]; }
    Store.save(); U.toast('已還原成原本的動作'); TrainPage.redraw();
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-swap],[data-unswap]'); if (!b) return;
    const date = b.closest('[data-date]') ? b.closest('[data-date]').dataset.date : TrainPage.selected();
    if (b.dataset.swap) open(b.dataset.swap, date); else unswap(b.dataset.unswap, date, b.dataset.scope);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  return { patternFor, resolve, button, open, close };
})();
