/* 谷建霏 PORTFOLIO — generates the six standalone design detail pages
   (<slug>.html: poster.html, banner.html, ...) from PF.works in data.js.

   Usage:  node build-projects.js
   Re-run after editing a work's title / cn / cat / year / tools / desc in
   data.js so the generated <title> and footer stay in sync. The page body is
   rendered at runtime by project.js + project.css (single source of truth =
   data.js). */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = __dirname;
const code = fs.readFileSync(path.join(root, 'data.js'), 'utf8');

/* load data.js in a sandbox: it only assigns window.PF at load time and never
   touches document, but we provide a minimal shim just in case. */
const sandbox = {
  window: {},
  document: {
    createElement: () => ({
      getContext: () => ({
        createLinearGradient: () => ({ addColorStop() {} }),
        createRadialGradient: () => ({ addColorStop() {} }),
        fillRect() {}, beginPath() {}, arc() {}, fill() {}, moveTo() {}, lineTo() {}, stroke() {},
        save() {}, restore() {}, set fillStyle(v) {}, set strokeStyle(v) {}, set lineWidth(v) {}, set globalAlpha(v) {}
      }),
      width: 0, height: 0, toDataURL: () => ''
    })
  },
  console: console
};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const PF = sandbox.window.PF;
if (!PF || !PF.works) { console.error('Could not read PF.works from data.js'); process.exit(1); }

function template(w) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${w.title} — 谷建霏 · Design</title>
<link rel="stylesheet" href="project.css" />
</head>
<body>
  <div class="bg" aria-hidden="true">
    <div class="glow g1"><div class="blob b1"></div></div>
    <div class="glow g2"><div class="blob b2"></div></div>
    <div class="glow g3"><div class="blob b3"></div></div>
  </div>
  <div class="cursorlight" id="clight" aria-hidden="true"></div>

  <header>
    <div class="brand fade">
      <span class="cn">谷建霏</span>
      <span class="en">AIGC 视觉设计师</span>
      <span class="role">个人作品集</span>
    </div>
    <nav class="fade">
      <a href="index.html">首页</a>
      <a href="design.html" class="active">设计</a>
      <a href="video.html">视频</a>
      <a href="app.html">应用</a>
      <a href="about.html">关于</a>
    </nav>
  </header>

  <main class="wrap" id="detail"></main>

  <footer>
    <span>© 2026 谷建霏</span>
    <span><a href="mailto:19831553856@163.com">19831553856@163.com</a></span>
    <span>DESIGN · ${w.cat}</span>
  </footer>

  <script src="data.js"></script>
  <script src="project.js"></script>
  <script src="transition.js"></script>
</body>
</html>
`;
}

let count = 0;
PF.works.forEach(function (w) {
  if (w.slug === 'poster' || w.slug === 'banner' || w.slug === 'typography' || w.slug === 'illustration' || w.slug === 'icon' || w.slug === 'ip') return; // hand-built collection pages, not generated direction details
  const file = PF.workFile(w);
  fs.writeFileSync(path.join(root, file), template(w));
  console.log('wrote', file);
  count++;
});
console.log('Done. ' + count + ' design detail pages generated (poster/banner/typography/illustration are hand-built collections).');
