// 本機資料儲存（瀏覽器 localStorage）＋共用小工具
window.Store = (function () {
  'use strict';
  const KEY = 'fitcoach.v1';

  const DEFAULT = {
    profile: {
      sex: 'M', age: 30, height: 170, weight: 75, work: 'light', exFreq: 'low',
      waist: '', neck: '', hip: '', measuredBf: '', measuredSmm: '',
      targetWeight: '', pace: 0.5, level: '中階',
      macroMode: 'balanced', pPct: 30, cPct: 45, carbCycle: false,
    },
    weights: {},        // { '2026-11-06': 75.2 }
    foodLog: {},        // { '2026-11-06': { breakfast: [ {id,name,unit,kcal,p,c,f,qty,tags,cook,swap} ], ... } }
    week: {             // 0=週一 … 6=週日；main=部位 key、variant=1..5、addon=附加項目
      0: { main: 'chest', variant: 1, addon: 'core' },
      1: { main: 'back', variant: 1, addon: '' },
      2: { main: 'cardio', variant: 1, addon: '' },
      3: { main: 'legs', variant: 1, addon: 'core' },
      4: { main: 'shoulders', variant: 1, addon: 'arms' },
      5: { main: 'hiit', variant: 1, addon: '' },
      6: { main: '', variant: 1, addon: '' },
    },
    done: {},           // 訓練打勾 { '2026-11-06': { 'chest_1:main:0': true } }
    schedule: {
      workStart: '08:30', workEnd: '17:30', commute: 30, prep: 45,
      sleepCycles: 5, trainPref: 'evening', trainMin: 60, lunch: '12:00',
      weekendSame: true,
    },
  };

  let state;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      state = raw ? deepMerge(clone(DEFAULT), JSON.parse(raw)) : clone(DEFAULT);
    } catch (e) {
      state = clone(DEFAULT);
    }
    return state;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch (e) { return false; }
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function deepMerge(base, add) {
    for (const k in add) {
      if (add[k] && typeof add[k] === 'object' && !Array.isArray(add[k]) && base[k] && typeof base[k] === 'object') deepMerge(base[k], add[k]);
      else base[k] = add[k];
    }
    return base;
  }
  function reset() { state = clone(DEFAULT); save(); return state; }
  function replace(obj) { state = deepMerge(clone(DEFAULT), obj); save(); return state; }

  return { load, save, reset, replace, get: () => state, DEFAULT };
})();

window.U = (function () {
  'use strict';
  const pad = n => String(n).padStart(2, '0');
  function today() { return dateKey(new Date()); }
  function dateKey(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
  function addDays(key, n) { const d = new Date(key + 'T00:00:00'); d.setDate(d.getDate() + n); return dateKey(d); }
  // 週一=0
  function weekday(key) { return (new Date(key + 'T00:00:00').getDay() + 6) % 7; }
  const WEEK = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];

  // 時間：分鐘數 <-> 'HH:MM'（可跨日）
  function toMin(s) { const [h, m] = String(s).split(':').map(Number); return h * 60 + (m || 0); }
  function fmtMin(m) { m = ((Math.round(m) % 1440) + 1440) % 1440; return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`; }
  function fmtDur(min) {
    const h = Math.floor(min / 60), m = Math.round(min % 60);
    return h ? (m ? `${h} 小時 ${m} 分` : `${h} 小時`) : `${m} 分鐘`;
  }
  function fmtRest(sec) {
    if (!sec) return '不休息，直接下一個';
    const m = Math.floor(sec / 60), s = sec % 60;
    return m ? (s ? `${m} 分 ${s} 秒` : `${m} 分鐘`) : `${s} 秒`;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function num(v, d = 0) { return Calc.round(+v || 0, d).toLocaleString('zh-TW'); }
  function $(sel, root = document) { return root.querySelector(sel); }
  function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200);
  }
  // 週課表中有排訓練的天數（碳水循環用）
  function trainDays() { const w = Store.get().week || {}; return [0, 1, 2, 3, 4, 5, 6].filter(i => w[i] && w[i].main).length; }
  return { today, dateKey, addDays, weekday, WEEK, trainDays, toMin, fmtMin, fmtDur, fmtRest, esc, num, $, $$, toast };
})();
