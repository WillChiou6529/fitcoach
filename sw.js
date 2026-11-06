// 離線快取（網頁版用；App 版內建檔案不需要）。改了任何檔案就把版本號 +1
const CACHE = 'fitcoach-v1';
const FILES = [
  './',
  'css/style.css',
  'data/foods.js',
  'data/stretch.js',
  'data/supplements.js',
  'data/workouts_a.js',
  'data/workouts_b.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'index.html',
  'js/app.js',
  'js/body.js',
  'js/calc.js',
  'js/diet.js',
  'js/myfoods.js',
  'js/sleep.js',
  'js/store.js',
  'js/train.js',
  'manifest.webmanifest',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// 先拿網路的新版，離線時用快取
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
