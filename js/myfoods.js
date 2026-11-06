// 我的食物：依包裝營養標示輸入（每份或每 100 g），可設為「我的蛋白粉」
window.MyFoods = (function () {
  'use strict';
  const { esc, num, $, $$ } = U;
  const CATS = ['補充品', '主食', '肉類', '海鮮', '蛋豆', '蔬菜', '水果', '乳品', '飲料', '湯品', '小吃', '點心', '早餐', '速食', '調味', '堅果'];
  const FIELDS = [['kcal', '熱量', '大卡'], ['p', '蛋白質', 'g'], ['f', '脂肪', 'g'], ['c', '碳水', 'g'], ['sugar', '糖', 'g'], ['sodium', '鈉', 'mg']];
  let editing = null;      // 正在編輯的 id
  let basis = 'serving';   // 標示基準：serving 每一份／per100 每 100 公克（毫升）
  let onAdd = null;

  function list() { const st = Store.get(); return st.customFoods || (st.customFoods = []); }
  function myProtein() { const id = Store.get().myProtein; return id ? list().find(f => f.id === id) || null : null; }
  // 蛋白粉判斷：內建的乳清類，或補充品中蛋白質熱量占 60% 以上
  function isPowder(it) {
    return /^whey_|^casein|^plant_protein|^protein_rtd/.test(it.fid || it.id || '') ||
      (it.cat === '補充品' && it.kcal > 0 && it.p * 4 >= it.kcal * 0.6);
  }

  const r1 = v => Math.round(v * 10) / 10;

  // 讀表單 → 每份數值
  function read(box) {
    const v = k => { const x = $(`[data-mf="${k}"]`, box).value; return x === '' ? null : +x; };
    const serving = v('serving');
    const servUnit = $('[data-mf="servUnit"]', box).value;
    const k = basis === 'per100' && serving ? serving / 100 : 1;
    const per = {};
    FIELDS.forEach(([key]) => { const x = v(key); per[key] = x == null ? null : r1(x * k); });
    return {
      name: $('[data-mf="name"]', box).value.trim(),
      cat: $('[data-mf="cat"]', box).value,
      serving, servUnit,
      servName: $('[data-mf="servName"]', box).value.trim(),
      per, isMyProtein: $('[data-mf="mine"]', box).checked,
    };
  }

  // 標示合理性檢查：4/4/9 換算與糖 ≤ 碳水
  function check(per) {
    const out = [];
    if (per.kcal != null && per.p != null && per.c != null && per.f != null) {
      const calc = per.p * 4 + per.c * 4 + per.f * 9;
      const diff = per.kcal ? Math.abs(calc - per.kcal) / per.kcal : 0;
      out.push(diff <= 0.15
        ? { ok: true, t: `換算 ${num(calc, 1)} 大卡，與標示 ${num(per.kcal, 1)} 大卡吻合 ✓` }
        : { ok: false, t: `換算 ${num(calc, 1)} 大卡，與標示 ${num(per.kcal, 1)} 大卡差 ${Math.round(diff * 100)}%，請確認有沒有打錯（含酒精、膳食纖維或糖醇的產品會有落差）` });
    }
    if (per.sugar != null && per.c != null && per.sugar > per.c + 0.05) out.push({ ok: false, t: '糖不會大於碳水化合物，請確認數字' });
    return out;
  }

  function unitText(d) {
    const g = d.serving ? `${num(d.serving, 1)} ${d.servUnit}` : '';
    return d.servName ? (g ? `${d.servName}（${g}）` : d.servName) : (g ? `1 份（${g}）` : '1 份');
  }

  function formHtml(f) {
    const d = f || { name: '', cat: '補充品', serving: '', servUnit: 'g', servName: '', kcal: '', p: '', f: '', c: '', sugar: '', sodium: '' };
    const val = x => (x == null ? '' : x);
    return `<div class="mf-form">
      <div class="grid" style="grid-template-columns: 2fr 1fr; gap:10px">
        <label class="f"><span>名稱</span><input data-mf="name" placeholder="例如：XX 乳清蛋白 巧克力" value="${esc(d.name)}"></label>
        <label class="f"><span>分類</span><select data-mf="cat">${CATS.map(c => `<option ${c === d.cat ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
      </div>
      <div class="row" style="margin-top:10px; align-items:flex-end">
        <label class="f"><span>標示基準</span><div class="seg" id="mfBasis"><button type="button" data-v="serving" class="${basis === 'serving' ? 'on' : ''}">每一份</button><button type="button" data-v="per100" class="${basis === 'per100' ? 'on' : ''}">每 100 公克／毫升</button></div></label>
        <label class="f" style="width:110px"><span>每份份量</span><input data-mf="serving" type="number" step="0.1" min="0" placeholder="30" value="${esc(val(d.serving))}"></label>
        <label class="f" style="width:72px"><span>單位</span><select data-mf="servUnit"><option ${d.servUnit === 'g' ? 'selected' : ''}>g</option><option ${d.servUnit === 'ml' ? 'selected' : ''}>ml</option></select></label>
        <label class="f" style="width:130px"><span>份量名稱（選填）</span><input data-mf="servName" placeholder="1 匙" value="${esc(d.servName || '')}"></label>
      </div>
      <div class="grid m3" style="grid-template-columns: repeat(6, minmax(0,1fr)); gap:10px; margin-top:10px">
        ${FIELDS.map(([k, l, u]) => `<label class="f"><span>${l}（${u}）${k === 'sodium' || k === 'sugar' ? '<small>選填</small>' : ''}</span><input data-mf="${k}" type="number" step="0.1" min="0" value="${esc(val(d[k]))}"></label>`).join('')}
      </div>
      <div id="mfPreview" class="small" style="margin-top:10px"></div>
      <label class="row small" style="margin-top:8px;flex-wrap:nowrap;align-items:flex-start"><input type="checkbox" data-mf="mine" style="flex:none;margin-top:3px" ${f && Store.get().myProtein === f.id ? 'checked' : ''}> ⭐ 設為「我的蛋白粉」（快速鍵、訓練頁「記錄一匙」都會用這包）</label>
      <div class="row" style="margin-top:10px">
        <button type="button" id="mfSaveAdd">${editing ? '儲存修改並加入' : '儲存並加入'}${mealLabel()}</button>
        <button type="button" class="ghost" id="mfSave">${editing ? '只儲存修改' : '只儲存'}</button>
        ${editing ? '<button type="button" class="ghost" id="mfCancel">取消編輯</button>' : ''}
      </div>
    </div>`;
  }

  function mealLabel() { const m = window.DietPage && DietPage.currentMeal ? DietPage.currentMeal() : ''; return m ? `到${m}` : ''; }

  function listHtml() {
    const L = list();
    if (!L.length) return '<p class="muted small" style="margin-top:14px">還沒有自訂食物。存起來之後，搜尋、一句話輸入都找得到。</p>';
    const mine = Store.get().myProtein;
    return `<table class="t small" style="margin-top:14px;white-space:nowrap">
      <tr><th>名稱</th><th>每份</th><th class="r">熱量</th><th class="r">蛋白質</th><th class="r">脂肪</th><th class="r">碳水</th><th class="r">糖</th><th></th></tr>
      ${L.map(f => `<tr><td>${f.id === mine ? '⭐ ' : ''}<b>${esc(f.name)}</b> <span class="chip">${esc(f.cat)}</span></td><td>${esc(f.unit)}</td>
        <td class="r">${num(f.kcal, 1)}</td><td class="r">${num(f.p, 1)}</td><td class="r">${num(f.f, 1)}</td><td class="r">${num(f.c, 1)}</td><td class="r">${f.sugar == null ? '—' : num(f.sugar, 1)}</td>
        <td class="r" style="white-space:nowrap"><button class="ghost small" data-mfadd="${f.id}">＋加入</button><button class="ghost small" data-mfedit="${f.id}">編輯</button><button class="icon" title="刪除" data-mfdel="${f.id}">✕</button></td></tr>`).join('')}
    </table><p class="muted tiny">修改只影響之後的紀錄；已記錄的餐點保留當時的數值。</p>`;
  }

  function mount(box, addCallback) {
    onAdd = addCallback;
    const f = editing ? list().find(x => x.id === editing) : null;
    box.innerHTML = formHtml(f) + listHtml();
    const preview = () => {
      const d = read(box);
      const ck = check(d.per);
      const P = d.per;
      const parts = FIELDS.filter(([k]) => P[k] != null).map(([k, l, u]) => `${l} ${num(P[k], 1)}${u === '大卡' ? ' 大卡' : ' ' + u}`);
      $('#mfPreview', box).innerHTML = parts.length
        ? `<b>每份（${esc(unitText(d))}）：</b>${parts.join('．')}${basis === 'per100' ? ' <span class="muted">（已由每 100 換算）</span>' : ''}
           ${ck.map(c => `<div class="${c.ok ? '' : 'pill warn'}" style="margin-top:4px;${c.ok ? 'color:var(--good)' : ''}">${esc(c.t)}</div>`).join('')}`
        : '<span class="muted">照包裝背面「營養標示」填入，填完會自動檢查數字是否合理。</span>';
    };
    $$('input, select', box).forEach(i => i.addEventListener('input', preview));
    $('#mfBasis', box).addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      basis = b.dataset.v; $$('#mfBasis button', box).forEach(x => x.classList.toggle('on', x === b)); preview();
    });
    const save = add => {
      const d = read(box);
      if (!d.name) { U.toast('請輸入名稱'); return; }
      if (d.per.kcal == null || d.per.p == null || d.per.f == null || d.per.c == null) { U.toast('熱量、蛋白質、脂肪、碳水都要填（沒有就填 0）'); return; }
      if (basis === 'per100' && !d.serving) { U.toast('用「每 100 公克」標示時，要填每份份量才能換算'); return; }
      const obj = {
        id: editing || 'custom_' + Date.now(), name: d.name, aliases: [d.name], cat: d.cat, unit: unitText(d),
        serving: d.serving, servUnit: d.servUnit, servName: d.servName,
        kcal: d.per.kcal, p: d.per.p, c: d.per.c, f: d.per.f, sugar: d.per.sugar, sodium: d.per.sodium,
        cook: '', tags: ['自訂'].concat(d.cat === '補充品' ? ['補充品'] : []).concat(d.per.p * 4 >= d.per.kcal * 0.4 ? ['高蛋白'] : []), custom: true,
      };
      const L = list();
      const i = L.findIndex(x => x.id === obj.id);
      if (i >= 0) L[i] = obj; else L.push(obj);
      const st = Store.get();
      if (d.isMyProtein) st.myProtein = obj.id;
      else if (st.myProtein === obj.id) st.myProtein = '';
      Store.save();
      U.toast(`${editing ? '已更新' : '已儲存'}：${obj.name}`);
      editing = null; basis = 'serving';
      if (add && onAdd) onAdd(obj);
      mount(box, onAdd);
    };
    $('#mfSaveAdd', box).addEventListener('click', () => save(true));
    $('#mfSave', box).addEventListener('click', () => save(false));
    const cc = $('#mfCancel', box); if (cc) cc.addEventListener('click', () => { editing = null; basis = 'serving'; mount(box, onAdd); });
    $$('[data-mfadd]', box).forEach(b => b.addEventListener('click', () => { const f2 = list().find(x => x.id === b.dataset.mfadd); if (f2 && onAdd) onAdd(f2); }));
    $$('[data-mfedit]', box).forEach(b => b.addEventListener('click', () => { editing = b.dataset.mfedit; basis = 'serving'; mount(box, onAdd); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));
    $$('[data-mfdel]', box).forEach(b => b.addEventListener('click', () => {
      const f2 = list().find(x => x.id === b.dataset.mfdel);
      if (!f2 || !confirm(`刪除「${f2.name}」？已記錄的餐點不受影響。`)) return;
      const st = Store.get(); st.customFoods = list().filter(x => x.id !== f2.id);
      if (st.myProtein === f2.id) st.myProtein = '';
      Store.save(); if (editing === f2.id) editing = null; mount(box, onAdd);
    }));
    preview();
  }

  return { list, myProtein, isPowder, mount };
})();
