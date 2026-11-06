// 把網頁檔複製到 www/（Capacitor 打包用）與 _site/（GitHub Pages 用）
const fs = require('fs'), path = require('path');
const ITEMS = ['index.html', 'manifest.webmanifest', 'sw.js', 'css', 'js', 'data', 'icons'];
for (const out of process.argv.slice(2).length ? process.argv.slice(2) : ['www']) {
  fs.rmSync(out, { recursive: true, force: true });
  for (const it of ITEMS) fs.cpSync(it, path.join(out, it), { recursive: true });
  console.log('copied to', out);
}
