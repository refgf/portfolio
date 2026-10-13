/* 谷建霏 PORTFOLIO — shared data + procedural artwork generator.
   Loaded by design.html / category.html / project.html via <script src="data.js"></script>.
   No external assets: every image is generated on the fly from a seed + palette. */
(function () {
  var palettes = [
    ['#eae4f7', '#c9bcec', '#9d8fd6'], // lavender
    ['#e3f1f0', '#bcdcd9', '#8fc1bd'], // cyan
    ['#f4eee3', '#e3d2ba', '#cdb591'], // warm
    ['#edeff2', '#d2d6dd', '#aab0bd'], // gray
    ['#f0e7f1', '#d8c4de', '#b29bc4'], // mauve
    ['#e8edf4', '#c9d4e4', '#9aaccc']  // blue-gray
  ];

  function rng(seed) {
    var s = seed * 9301 + 49297;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  function makeCover(seed, pi) {
    var c = document.createElement('canvas');
    c.width = 900; c.height = 1100;
    var x = c.getContext('2d');
    var r = rng(seed * 13 + 7);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];

    var g = x.createLinearGradient(0, 0, 900, 1100);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, 900, 1100);

    for (var b = 0; b < 4; b++) {
      var cx = r() * 900, cy = r() * 1100, rr = 180 + r() * 320;
      var rg = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
      rg.addColorStop(0, pal[(b + 1) % 3]);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      x.globalAlpha = 0.5 + r() * 0.32;
      x.fillStyle = rg;
      x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 1;

    x.strokeStyle = 'rgba(255,255,255,0.34)'; x.lineWidth = 1.4;
    for (var l = 0; l < 5; l++) {
      var y = r() * 1100;
      x.beginPath(); x.moveTo(0, y); x.lineTo(900, y + (r() - 0.5) * 120); x.stroke();
    }

    x.globalAlpha = 0.05;
    for (var p = 0; p < 1300; p++) {
      x.fillStyle = r() > 0.5 ? '#000' : '#fff';
      x.fillRect(r() * 900, r() * 1100, 1, 1);
    }
    x.globalAlpha = 1;
    return c.toDataURL('image/jpeg', 0.9);
  }

  var cache = {};
  function cover(seed, pi) {
    var k = seed + '_' + pi;
    if (!cache[k]) cache[k] = makeCover(seed, pi);
    return cache[k];
  }

  /* landscape variant for BANNER works (16/9) — kept separate from the portrait
     poster cover so banners render as true horizontal images, not cropped portraits */
  var bannerCache = {};
  function bannerCover(seed, pi) {
    var k = 'b' + seed + '_' + pi;
    if (!bannerCache[k]) bannerCache[k] = makeBanner(seed, pi);
    return bannerCache[k];
  }
  function makeBanner(seed, pi) {
    var W = 1280, H = 720;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    var r = rng(seed * 17 + 3);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];
    var g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    for (var b = 0; b < 5; b++) {
      var cx = r() * W, cy = r() * H, rr = 150 + r() * 340;
      var rg = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
      rg.addColorStop(0, pal[(b + 1) % 3]);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      x.globalAlpha = 0.5 + r() * 0.32;
      x.fillStyle = rg;
      x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 1;
    x.strokeStyle = 'rgba(255,255,255,0.34)'; x.lineWidth = 1.4;
    for (var l = 0; l < 6; l++) {
      var y = r() * H;
      x.beginPath(); x.moveTo(0, y); x.lineTo(W, y + (r() - 0.5) * 80); x.stroke();
    }
    x.globalAlpha = 0.05;
    for (var p = 0; p < 1700; p++) {
      x.fillStyle = r() > 0.5 ? '#000' : '#fff';
      x.fillRect(r() * W, r() * H, 1, 1);
    }
    x.globalAlpha = 1;
    return c.toDataURL('image/jpeg', 0.9);
  }

  /* typography variant for TYPOGRAPHY works (4/3) — draws large sample glyphs so the
     collection reads as type specimens, not generic gradients */
  var typoCache = {};
  function typoCover(seed, pi) {
    var k = 't' + seed + '_' + pi;
    if (!typoCache[k]) typoCache[k] = makeTypo(seed, pi);
    return typoCache[k];
  }
  function makeTypo(seed, pi) {
    var W = 1200, H = 900;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    var r = rng(seed * 23 + 11);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];
    var g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    for (var b = 0; b < 4; b++) {
      var cx = r() * W, cy = r() * H, rr = 140 + r() * 300;
      var rg = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
      rg.addColorStop(0, pal[(b + 1) % 3]);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      x.globalAlpha = 0.5 + r() * 0.3;
      x.fillStyle = rg;
      x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 1;
    var samples = ['Aa', '永', '字', 'Type', 'Gg', '文', 'Ab', '设'];
    var t = samples[Math.floor(r() * samples.length)];
    x.fillStyle = 'rgba(255,255,255,0.92)';
    x.font = '800 ' + Math.floor(H * 0.46) + 'px "Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif';
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(t, W * 0.5 + (r() - 0.5) * 70, H * 0.46 + (r() - 0.5) * 50);
    x.fillStyle = 'rgba(40,44,52,0.55)';
    x.font = '600 ' + Math.floor(H * 0.06) + 'px "Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif';
    x.fillText('字样样张', W * 0.5, H * 0.82);
    return c.toDataURL('image/jpeg', 0.9);
  }

  /* illustration variant for 插画 works (4/3) — pure abstract visual art, no
     text, so the collection page can stay a clean image-only grid per the brief */
  var illoCache = {};
  function illoCover(seed, pi) {
    var k = 'i' + seed + '_' + pi;
    if (!illoCache[k]) illoCache[k] = makeIllustration(seed, pi);
    return illoCache[k];
  }
  function makeIllustration(seed, pi) {
    var W = 1200, H = 900;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    var r = rng(seed * 29 + 5);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];
    var g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    for (var b = 0; b < 6; b++) {
      var cx = r() * W, cy = r() * H, rr = 160 + r() * 360;
      var rg = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
      rg.addColorStop(0, pal[(b + 1) % 3]);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      x.globalAlpha = 0.45 + r() * 0.34;
      x.fillStyle = rg;
      x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 1;
    x.strokeStyle = 'rgba(255,255,255,0.30)'; x.lineWidth = 1.4;
    for (var l = 0; l < 7; l++) {
      var y = r() * H;
      x.beginPath(); x.moveTo(0, y); x.lineTo(W, y + (r() - 0.5) * 90); x.stroke();
    }
    x.globalAlpha = 0.05;
    for (var p = 0; p < 1800; p++) {
      x.fillStyle = r() > 0.5 ? '#000' : '#fff';
      x.fillRect(r() * W, r() * H, 1, 1);
    }
    x.globalAlpha = 1;
    return c.toDataURL('image/jpeg', 0.9);
  }

  /* icon variant for ICON works (1/1) — a soft rounded tile holding a single clean
     glyph, so the collection reads as an icon set rather than a gradient field.
     `motif` selects the drawn symbol (0 sun / 1 sparkle / 2 leaf / 3 moon / 4 heart). */
  var iconCache = {};
  function iconCover(seed, pi, motif) {
    var k = 'ic' + seed + '_' + pi + '_' + (motif || 0);
    if (!iconCache[k]) iconCache[k] = makeIcon(seed, pi, motif || 0);
    return iconCache[k];
  }
  function rr(x, px, py, w, h, r) {
    x.beginPath();
    x.moveTo(px + r, py);
    x.arcTo(px + w, py, px + w, py + h, r);
    x.arcTo(px + w, py + h, px, py + h, r);
    x.arcTo(px, py + h, px, py, r);
    x.arcTo(px, py, px + w, py, r);
    x.closePath();
  }
  function drawMotif(x, cx, cy, s, type, color) {
    x.save();
    x.translate(cx, cy);
    x.fillStyle = color; x.strokeStyle = color;
    x.lineWidth = s * 0.16; x.lineCap = 'round'; x.lineJoin = 'round';
    if (type === 0) { /* sun */
      x.beginPath(); x.arc(0, 0, s * 0.42, 0, Math.PI * 2); x.fill();
      for (var i = 0; i < 8; i++) {
        var a = i * Math.PI / 4, r1 = s * 0.62, r2 = s * 0.92;
        x.beginPath();
        x.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        x.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        x.stroke();
      }
    } else if (type === 1) { /* sparkle star */
      x.beginPath();
      x.moveTo(0, -s);
      x.quadraticCurveTo(s * 0.18, -s * 0.18, s, 0);
      x.quadraticCurveTo(s * 0.18, s * 0.18, 0, s);
      x.quadraticCurveTo(-s * 0.18, s * 0.18, -s, 0);
      x.quadraticCurveTo(-s * 0.18, -s * 0.18, 0, -s);
      x.closePath(); x.fill();
    } else if (type === 2) { /* leaf */
      x.beginPath();
      x.ellipse(0, 0, s * 0.5, s * 0.86, Math.PI / 5, 0, Math.PI * 2);
      x.fill();
    } else if (type === 3) { /* crescent moon */
      x.beginPath(); x.arc(0, 0, s * 0.82, 0, Math.PI * 2); x.fill();
      x.globalCompositeOperation = 'destination-out';
      x.beginPath(); x.arc(s * 0.4, -s * 0.12, s * 0.72, 0, Math.PI * 2); x.fill();
      x.globalCompositeOperation = 'source-over';
    } else { /* heart */
      x.beginPath();
      x.moveTo(0, s * 0.35);
      x.bezierCurveTo(-s, -s * 0.5, -s * 0.6, -s, 0, -s * 0.2);
      x.bezierCurveTo(s * 0.6, -s, s, -s * 0.5, 0, s * 0.35);
      x.closePath(); x.fill();
    }
    x.restore();
  }
  function makeIcon(seed, pi, motif) {
    var W = 1000, H = 1000;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    var r = rng(seed * 37 + 13);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];
    var g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    for (var b = 0; b < 4; b++) {
      var cx = r() * W, cy = r() * H, rr2 = 140 + r() * 260;
      var rg = x.createRadialGradient(cx, cy, 0, cx, cy, rr2);
      rg.addColorStop(0, pal[(b + 1) % 3]);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      x.globalAlpha = 0.5 + r() * 0.3;
      x.fillStyle = rg; x.beginPath(); x.arc(cx, cy, rr2, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 1;
    var tile = Math.min(W, H) * 0.52;
    var tx = (W - tile) / 2, ty = (H - tile) / 2, rad = tile * 0.2;
    rr(x, tx, ty, tile, tile, rad);
    x.fillStyle = 'rgba(255,255,255,0.9)'; x.fill();
    x.lineWidth = 2; x.strokeStyle = 'rgba(40,44,52,0.05)'; x.stroke();
    drawMotif(x, W / 2, H / 2, tile * 0.26, motif, pal[2]);
    x.globalAlpha = 0.05;
    for (var p = 0; p < 1400; p++) {
      x.fillStyle = r() > 0.5 ? '#000' : '#fff';
      x.fillRect(r() * W, r() * H, 1, 1);
    }
    x.globalAlpha = 1;
    return c.toDataURL('image/jpeg', 0.9);
  }

  /* ----- IP variant: character "sheets" (4/5) + scene extensions (16/9) -----
     IP is shown as a complete case: two character sheets (portrait) plus two scene
     extensions (landscape). A shared drawMascot renders a clean, friendly abstract
     mascot so the two IPs read as distinct characters rather than gradient fields. */
  var ipCharCache = {};
  function ipCover(seed, pi, motif) {
    var k = 'ipc' + seed + '_' + pi + '_' + (motif || 0);
    if (!ipCharCache[k]) ipCharCache[k] = makeIpChar(seed, pi, motif || 0);
    return ipCharCache[k];
  }
  var ipSceneCache = {};
  function ipSceneCover(seed, pi, motif) {
    var k = 'ips' + seed + '_' + pi + '_' + (motif || 0);
    if (!ipSceneCache[k]) ipSceneCache[k] = makeIpScene(seed, pi, motif || 0);
    return ipSceneCache[k];
  }
  function drawMascot(x, cx, cy, s, body, head, ink, motif) {
    x.save();
    x.translate(cx, cy);
    x.fillStyle = 'rgba(40,44,52,0.10)';
    x.beginPath(); x.ellipse(0, s * 0.94, s * 0.6, s * 0.15, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = body;
    x.beginPath(); x.ellipse(0, s * 0.22, s * 0.55, s * 0.66, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = head;
    x.beginPath(); x.arc(0, -s * 0.5, s * 0.42, 0, Math.PI * 2); x.fill();
    x.fillStyle = 'rgba(255,255,255,0.55)';
    x.beginPath(); x.arc(-s * 0.2, -s * 0.42, s * 0.08, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(s * 0.2, -s * 0.42, s * 0.08, 0, Math.PI * 2); x.fill();
    x.fillStyle = ink;
    x.beginPath(); x.arc(-s * 0.15, -s * 0.52, s * 0.055, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(s * 0.15, -s * 0.52, s * 0.055, 0, Math.PI * 2); x.fill();
    x.strokeStyle = ink; x.lineWidth = s * 0.03; x.lineCap = 'round';
    x.beginPath(); x.arc(0, -s * 0.46, s * 0.1, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke();
    drawMotif(x, 0, -s * 0.96, s * 0.17, motif === 1 ? 1 : 2, head);
    x.restore();
  }
  function makeIpChar(seed, pi, motif) {
    var W = 1000, H = 1250;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    var r = rng(seed * 41 + 7);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];
    var g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    for (var b = 0; b < 4; b++) {
      var cx = r() * W, cy = r() * H, rr2 = 150 + r() * 300;
      var rg = x.createRadialGradient(cx, cy, 0, cx, cy, rr2);
      rg.addColorStop(0, pal[(b + 1) % 3]);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      x.globalAlpha = 0.45 + r() * 0.3;
      x.fillStyle = rg; x.beginPath(); x.arc(cx, cy, rr2, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 1;
    rr(x, 46, 46, W - 92, H - 92, 36);
    x.fillStyle = 'rgba(255,255,255,0.30)'; x.fill();
    x.lineWidth = 2; x.strokeStyle = 'rgba(255,255,255,0.6)'; x.stroke();
    drawMascot(x, W / 2, H * 0.46, W * 0.30, pal[1], pal[2], 'rgba(40,44,52,0.78)', motif);
    var sw = 64, gap = 26, total = sw * 3 + gap * 2, sx = (W - total) / 2, sy = H - 150;
    for (var i = 0; i < 3; i++) {
      rr(x, sx + i * (sw + gap), sy, sw, sw, 18);
      x.fillStyle = pal[i % 3]; x.fill();
      x.lineWidth = 2; x.strokeStyle = 'rgba(255,255,255,0.5)'; x.stroke();
    }
    return c.toDataURL('image/jpeg', 0.9);
  }
  function makeIpScene(seed, pi, motif) {
    var W = 1280, H = 720;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    var r = rng(seed * 43 + 9);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];
    var g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, pal[0]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    var rg = x.createRadialGradient(W * 0.5, H * 0.62, 0, W * 0.5, H * 0.62, H * 0.95);
    rg.addColorStop(0, pal[1]); rg.addColorStop(1, 'rgba(255,255,255,0)');
    x.globalAlpha = 0.5; x.fillStyle = rg; x.fillRect(0, 0, W, H); x.globalAlpha = 1;
    for (var b = 0; b < 5; b++) {
      var cx = r() * W, cy = r() * H * 0.5, rr2 = 80 + r() * 150;
      var rg2 = x.createRadialGradient(cx, cy, 0, cx, cy, rr2);
      rg2.addColorStop(0, 'rgba(255,255,255,0.5)'); rg2.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = rg2; x.beginPath(); x.arc(cx, cy, rr2, 0, Math.PI * 2); x.fill();
    }
    x.fillStyle = 'rgba(255,255,255,0.35)';
    x.beginPath(); x.moveTo(0, H * 0.74);
    x.bezierCurveTo(W * 0.3, H * 0.68, W * 0.7, H * 0.8, W, H * 0.72);
    x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
    drawMascot(x, W * 0.5, H * 0.6, W * 0.12, pal[1], pal[2], 'rgba(40,44,52,0.78)', motif);
    return c.toDataURL('image/jpeg', 0.9);
  }

  /* ----- VIDEO variant: cinematic 16/9 film stills for the VIDEO portfolio -----
     Each clip gets a procedural "scene" cover (sky gradient + glowing orb + layered
     hills + a small silhouette) so the grid reads as AI film frames rather than flat
     gradients. seed/pal drive the composition, keeping it on the light, premium palette. */
  var videoCache = {};
  function videoCover(seed, pi) {
    var k = 'v' + seed + '_' + pi;
    if (!videoCache[k]) videoCache[k] = makeVideo(seed, pi);
    return videoCache[k];
  }
  function makeVideo(seed, pi) {
    var W = 1280, H = 720;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var x = c.getContext('2d');
    var r = rng(seed * 47 + 19);
    var pal = palettes[((pi % palettes.length) + palettes.length) % palettes.length];
    var g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, pal[0]); g.addColorStop(0.55, pal[1]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    var ox = r() * W, oy = H * (0.16 + r() * 0.24), oR = W * (0.09 + r() * 0.12);
    var og = x.createRadialGradient(ox, oy, 0, ox, oy, oR * 2.6);
    og.addColorStop(0, 'rgba(255,255,255,0.92)'); og.addColorStop(0.4, 'rgba(255,255,255,0.32)'); og.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = og; x.beginPath(); x.arc(ox, oy, oR * 2.6, 0, Math.PI * 2); x.fill();
    for (var b = 0; b < 4; b++) {
      var cx = r() * W, cy = r() * H * 0.5, rr = 120 + r() * 240;
      var rg = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
      rg.addColorStop(0, 'rgba(255,255,255,0.5)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = rg; x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.fill();
    }
    var horizon = H * (0.62 + r() * 0.08);
    function hill(baseY, amp, col, alpha) {
      x.fillStyle = col; x.globalAlpha = alpha;
      x.beginPath(); x.moveTo(0, H); x.lineTo(0, baseY);
      var px = 0;
      while (px <= W) { var py = baseY + Math.sin(px * 0.006 + r() * 6) * amp + (r() - 0.5) * amp * 0.4; x.lineTo(px, py); px += 40; }
      x.lineTo(W, H); x.closePath(); x.fill(); x.globalAlpha = 1;
    }
    hill(horizon + 34, 24, pal[2], 0.5);
    hill(horizon, 40, pal[2], 0.86);
    drawMascot(x, W * 0.5, horizon - 8, W * 0.055, pal[2], pal[1], 'rgba(40,44,52,0.5)', 0);
    var top = x.createLinearGradient(0, 0, 0, H * 0.18);
    top.addColorStop(0, 'rgba(40,44,52,0.10)'); top.addColorStop(1, 'rgba(40,44,52,0)');
    x.fillStyle = top; x.fillRect(0, 0, W, H * 0.18);
    var bot = x.createLinearGradient(0, H * 0.82, 0, H);
    bot.addColorStop(0, 'rgba(40,44,52,0)'); bot.addColorStop(1, 'rgba(40,44,52,0.16)');
    x.fillStyle = bot; x.fillRect(0, H * 0.82, W, H * 0.18);
    var vg = x.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.82);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(20,20,20,0.10)');
    x.fillStyle = vg; x.fillRect(0, 0, W, H);
    x.globalAlpha = 0.04;
    for (var p = 0; p < 2000; p++) { x.fillStyle = r() > 0.5 ? '#000' : '#fff'; x.fillRect(r() * W, r() * H, 1, 1); }
    x.globalAlpha = 1;
    return c.toDataURL('image/jpeg', 0.9);
  }

  /* ---------- 六大设计方向 ---------- */
  var cats = [
    { slug:'poster',      en:'海报设计', cn:'海报设计',
      desc:'海报系统设计：围绕构图、图像生成与克制排版展开，从概念草图推进到 AI 辅助成稿。' },
    { slug:'banner',      en:'横幅设计', cn:'横幅设计',
      desc:'活动横幅系统：模块化网格、渐变光感与受控色彩范围，适配各类数字投放渠道。' },
    { slug:'typography',  en:'字体设计', cn:'文字设计',
      desc:'以字体为主角的练习：平衡可变字重与充足留白，在编辑排版与展示场景中反复检验。' },
    { slug:'illustration',en:'插画设计',  cn:'插画设计',
      desc:'插画创作：先由纹理、颗粒与柔光铺出氛围，再让主体自然浮现。' },
    { slug:'ip',          en:'IP 设计',     cn:'IP 设计',
      desc:'IP 与角色开发：先确定剪影，再推进表面质感、表情与可延展的应用系统。' },
    { slug:'icon',        en:'图标设计',   cn:'图标设计',
      desc:'图标设计：提炼到必要几何，在小尺寸下检验清晰度、视觉节奏与整套一致性。' }
  ];

  var titles = [
    ['液态识别', '静默几何', '霓虹植物'],
    ['极光企划', '极简电商', '柔光渐变'],
    ['可变黑体', '社论衬线', '等宽展示'],
    ['纸梦', '静林', '内在天气'],
    ['吉祥物实验室', '角色习作', '玩具系统'],
    ['字形套装', '线性图标', '界面标记']
  ];

  var descs = [
    '海报系列：以流体形态与克制排版为线索，通过 AI 辅助构图生成并反复打磨。',
    '活动横幅系统：围绕渐变光线、模块化版式与严格控制的色彩范围搭建。',
    '字体主导的探索：在可变字重与充足留白之间取得平衡，适用于编辑类排版。',
    '插画习作：纹理、颗粒与柔光先行，氛围成形之后主体才自然出现。',
    'IP 与角色开发：先定剪影，再推进表面质感、表情与可延展的应用。',
    '图标设计：提炼到必要几何，在小尺寸下检验清晰度与整体一致性。'
  ];

  var steps = ['概念构思', '设计深化', '生成制作', '最终成品'];

  /* ---------- flat work list: design.html 3x2 grid + one standalone page per work ----------
     Each entry renders as `<slug>.html` (poster.html, banner.html, ...).
     Fields:
       num  卡片顶部署名 (01..06)         title 英文方向名 (卡片中部)
       cn   中文方向名 (卡片下方)          cat   分类 (视觉设计/字体设计/..., 卡片与详情共用)
       year 年份                          tools/seed/pal/desc 详情页与封面生成
     To swap content: edit en / cn / cat / year / tools / desc here, then run `node build-projects.js`. */
  var works = [
    { slug:'poster',       num:'01', title:'海报设计',       cn:'海报设计',  cat:'视觉设计', year:2026,
      tools:'AI Generation / Photoshop / Illustrator', seed:3,  pal:0, desc:'海报系统设计，探索构图、图像生成与克制排版，从概念草图到 AI 辅助成稿。' },
    { slug:'banner',       num:'02', title:'横幅设计',      cn:'横幅设计', cat:'视觉设计', year:2026,
      tools:'AI Generation / Photoshop / Illustrator', seed:11, pal:1, desc:'活动 Banner 系统，基于模块化网格、渐变光感与受控色彩范围，面向数字渠道。' },
    { slug:'typography',   num:'03', title:'字体设计',  cn:'文字设计',  cat:'字体设计', year:2026,
      tools:'AI Generation / Illustrator / Glyphs',    seed:21, pal:2, desc:'字体设计研究，平衡可变字重与宽松留白，在编辑与展示场景中检验。' },
    { slug:'illustration', num:'04', title:'插画设计',cn:'插画设计',  cat:'插画设计', year:2026,
      tools:'AI Generation / Photoshop',               seed:31, pal:3, desc:'插画创作，以纹理、颗粒与柔光先营造氛围，再呈现明确主体。' },
    { slug:'icon',         num:'05', title:'图标设计',        cn:'图标设计',  cat:'图形设计', year:2026,
      tools:'AI Generation / Illustrator',              seed:51, pal:5, desc:'图标设计，提炼为必要几何，在小尺寸下检验清晰度、节奏与一致性。' },
    { slug:'ip',           num:'06', title:'IP 设计',          cn:'IP 设计',    cat:'角色设计', year:2026,
      tools:'AI Generation / Illustrator / Blender',    seed:41, pal:4, desc:'IP 设计，从剪影出发，再到表面、表情与可延展的应用系统。' }
  ];

  function workFile(w) { return w.slug + '.html'; }
  function findWork(slug) {
    for (var i = 0; i < works.length; i++) if (works[i].slug === slug) return works[i];
    return works[0];
  }
  function nextWork(w) {
    for (var i = 0; i < works.length; i++) if (works[i].slug === w.slug) return works[(i + 1) % works.length];
    return works[0];
  }

  /* ---------- POSTER collection: 8 portrait vertical posters on poster.html ----------
     Each poster links to poster-detail.html?p=<id> (1..8). seeds/pal drive the
     procedural portrait cover; aspect ratio of the canvas (900x1100 = 9/11) is kept
     on screen so every poster stays truly vertical. */
  var posters = [
    { id:1, num:'01', name:'Liquid Identity', cn:'液态识别', year:2026, seed:103, pal:0, image:'assets/posters/poster-01.jpg',
      tools:'AI Generation / Photoshop / Illustrator', desc:'以流体形态与克制排版，探索海报识别系统。' },
    { id:2, num:'02', name:'Silent Geometry', cn:'静默几何', year:2026, seed:111, pal:1, image:'assets/posters/poster-02.jpg',
      tools:'AI Generation / Photoshop', desc:'用极简几何与留白，构建安静的视觉秩序。' },
    { id:3, num:'03', name:'Neon Botanica', cn:'霓虹植物', year:2026, seed:127, pal:2, image:'assets/posters/poster-03.jpg',
      tools:'AI Generation / Illustrator', desc:'霓虹色植物意象，融合生成式光感与有机曲线。' },
    { id:4, num:'04', name:'Aurora Drift', cn:'极光漂移', year:2026, seed:139, pal:3, image:'assets/posters/poster-04.jpg',
      tools:'AI Generation / Photoshop / Illustrator', desc:'极光般的渐变横移，营造轻盈的户外氛围。' },
    { id:5, num:'05', name:'Paper Weather', cn:'纸境天气', year:2026, seed:151, pal:4, image:'assets/posters/poster-05.jpg',
      tools:'AI Generation / Photoshop', desc:'纸感纹理与天气意象，柔光下先有氛围再有主体。' },
    { id:6, num:'06', name:'Type in Motion', cn:'动态字体', year:2026, seed:163, pal:5, image:'assets/posters/poster-06.jpg',
      tools:'AI Generation / Illustrator', desc:'可变字重字体在运动中检验节奏与重心。' },
    { id:7, num:'07', name:'Soft Construct', cn:'软构造', year:2026, seed:173, pal:0, image:'assets/posters/poster-07.jpg',
      tools:'AI Generation / Photoshop', desc:'柔和构造主义，几何被软化成有温度的形状。' },
    { id:8, num:'08', name:'Gradient Field', cn:'渐变场', year:2026, seed:181, pal:1, image:'assets/posters/poster-08.jpg',
      tools:'AI Generation / Illustrator', desc:'渐变场域，色彩在边界自然过渡成画面主体。' }
  ];

  function findPoster(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < posters.length; i++) if (posters[i].id === n) return posters[i];
    return posters[0];
  }

  /* ---------- BANNER collection: 8 landscape banners on banner.html ----------
     Each banner links to banner-detail.html?b=<id> (1..8). seeds/pal drive the
     procedural 16/9 cover; titles are the owner-supplied work names. */
  var banners = [
    { id:1, num:'01', title:'咖啡品牌',  year:2026, seed:203, pal:0, image:'assets/banners/banner-01.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' },
    { id:2, num:'02', title:'美食零食',  year:2026, seed:211, pal:1, image:'assets/banners/banner-02.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' },
    { id:3, num:'03', title:'美妆护肤',  year:2026, seed:223, pal:2, image:'assets/banners/banner-03.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' },
    { id:4, num:'04', title:'时尚服饰',  year:2026, seed:233, pal:3, image:'assets/banners/banner-04.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' },
    { id:5, num:'05', title:'潮流插画',  year:2026, seed:241, pal:4, image:'assets/banners/banner-05.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' },
    { id:6, num:'06', title:'春日出游',  year:2026, seed:251, pal:5, image:'assets/banners/banner-06.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' },
    { id:7, num:'07', title:'运动健身',  year:2026, seed:263, pal:0, image:'assets/banners/banner-07.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' },
    { id:8, num:'08', title:'夏日能量',  year:2026, seed:271, pal:1, image:'assets/banners/banner-08.png',
      tools:'AI Generation / Photoshop / Illustrator', desc:'（占位文案，请替换为该 Banner 项目的介绍）' }
  ];
  function findBanner(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < banners.length; i++) if (banners[i].id === n) return banners[i];
    return banners[0];
  }

  /* ---------- TYPOGRAPHY collection: 4 type specimens on typography.html ----------
     Each links to typography-detail.html?t=<id> (1..4). seeds/pal drive the 4/3
     procedural type-specimen cover; titles are placeholders for the owner to replace. */
  var typos = [
    { id:1, num:'01', title:'字体视觉 01', year:2026, seed:303, pal:0, image:'assets/typography/typography-01.png',
      tools:'AI Generation / Illustrator / Glyphs', desc:'（占位文案，请替换为该字体设计项目的介绍）' },
    { id:2, num:'02', title:'字体视觉 02', year:2026, seed:311, pal:1, image:'assets/typography/typography-02.png',
      tools:'AI Generation / Illustrator / Glyphs', desc:'（占位文案，请替换为该字体设计项目的介绍）' },
    { id:3, num:'03', title:'字体视觉 03', year:2026, seed:323, pal:2, image:'assets/typography/typography-03.png',
      tools:'AI Generation / Illustrator / Glyphs', desc:'（占位文案，请替换为该字体设计项目的介绍）' },
    { id:4, num:'04', title:'字体视觉 04', year:2026, seed:331, pal:3, image:'assets/typography/typography-04.png',
      tools:'AI Generation / Illustrator / Glyphs', desc:'（占位文案，请替换为该字体设计项目的介绍）' }
  ];
  function findTypo(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < typos.length; i++) if (typos[i].id === n) return typos[i];
    return typos[0];
  }

  /* ---------- 插画 collection: 4 illustration images on illustration.html ----------
     Pure visual showcase — cards show ONLY the image (no number, no title, no intro),
     per the owner's brief. Each links to illustration-detail.html?i=<id> (1..4).
     seeds/pal drive the procedural abstract 4/3 cover. */
  var illustrations = [
    { id:1, num:'01', seed:403, pal:0, image:'assets/illustrations/illustration-01.png' },
    { id:2, num:'02', seed:411, pal:1, image:'assets/illustrations/illustration-02.png' },
    { id:3, num:'03', seed:423, pal:2, image:'assets/illustrations/illustration-03.png' },
    { id:4, num:'04', seed:431, pal:3, image:'assets/illustrations/illustration-04.png' }
  ];
  function findIllustration(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < illustrations.length; i++) if (illustrations[i].id === n) return illustrations[i];
    return illustrations[0];
  }

  /* ---------- ICON collection: 2 icon sets on icon.html ----------
     Left-right two-column showcase: 项目 01 日常生活 / 项目 02 梦幻物语.
     Each links to icon-detail.html?ic=<id> (1..2). `motif` picks the drawn glyph
     (0 sun / 1 sparkle / 2 leaf / 3 moon / 4 heart); seeds/pal drive the soft tile. */
  var icons = [
    { id:1, num:'01', name:'日常生活', year:2026, seed:511, pal:0, motif:0, image:'assets/icons/icon-01.png',
      tools:'AI Generation / Illustrator', desc:'（占位文案，请替换为该图标设计项目的介绍）' },
    { id:2, num:'02', name:'梦幻物语', year:2026, seed:523, pal:4, motif:1, image:'assets/icons/icon-02.png',
      tools:'AI Generation / Illustrator', desc:'（占位文案，请替换为该图标设计项目的介绍）' }
  ];
  function findIcon(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < icons.length; i++) if (icons[i].id === n) return icons[i];
    return icons[0];
  }

  /* ---------- IP collection: 2 character sheets + 2 scene extensions on ip.html ----------
     Not a normal card grid — a complete case study. ips[] drive the portrait character
     sheets (4/5), ipScenes[] drive the landscape scene extensions (16/9). `motif` selects
     the mascot accent (0 leaf / 1 star) so the two IPs read as distinct characters. */
  var ips = [
    { id:1, num:'01', name:'TAIBAO', cn:'苔宝', year:2026, seed:601, pal:0, motif:0, image:'assets/ip/character-01.png',
      tools:'AI Generation / Illustrator / Blender', desc:'（占位文案，请替换为该 IP 角色设计项目的介绍）' },
    { id:2, num:'02', name:'PAIKE', cn:'派克', year:2026, seed:613, pal:4, motif:1, image:'assets/ip/character-02.png',
      tools:'AI Generation / Illustrator / Blender', desc:'（占位文案，请替换为该 IP 角色设计项目的介绍）' }
  ];
  function findIp(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < ips.length; i++) if (ips[i].id === n) return ips[i];
    return ips[0];
  }
  var ipScenes = [
    { id:1, num:'01', seed:621, pal:1, motif:0, image:'assets/ip/scene-01.png',
      tools:'AI Generation / Photoshop', desc:'（占位文案，请替换为该场景延展项目的介绍）' },
    { id:2, num:'02', seed:633, pal:2, motif:1, image:'assets/ip/scene-02.png',
      tools:'AI Generation / Photoshop', desc:'（占位文案，请替换为该场景延展项目的介绍）' }
  ];
  function findIpScene(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < ipScenes.length; i++) if (ipScenes[i].id === n) return ipScenes[i];
    return ipScenes[0];
  }

  /* ---------- VIDEO portfolio: 5 categories, 16 clips total on video.html ----------
     5 categories (TVC广告 / 短片 / 剧集 / 影视游戏 / 娱乐) with project counts 3/4/6/1/2.
     Each clip links to video-detail.html?v=<id>. seeds/pal drive the cinematic cover. */
  var videoCats = [
    { id:1, num:'01', name:'TVC 广告',  en:'商业广告片',   count:3 },
    { id:2, num:'02', name:'短片',     en:'剧情短片',     count:4 },
    { id:3, num:'03', name:'剧集',     en:'系列剧集',     count:6 },
    { id:4, num:'04', name:'影视游戏', en:'影视游戏 PV',  count:1 },
    { id:5, num:'05', name:'娱乐',     en:'趣味短片',     count:2 }
  ];
  var videos = [
    { id:1,  cat:1, title:'青橘入茶，微醺一刻', year:2026, type:'RIO 青橘乌龙 TVC', seed:701, pal:0, image:'assets/video/covers/cover-01.jpg', desc:'青橘与乌龙茶香交融，以清新果园、热带庭院与冰爽气泡呈现微醺一刻。' },
    { id:2,  cat:1, title:'ÉLORIS',        year:2026, type:'香氛品牌 TVC', seed:711, pal:1, image:'assets/video/covers/cover-02.jpg', desc:'以巴黎黄昏、雨夜街景与香氛记忆为线索，讲述一段跨越现实与回忆的情感故事。' },
    { id:3,  cat:1, title:'一豆成香',      year:2025, type:'咖啡品牌 TVC', seed:721, pal:2, image:'assets/video/covers/cover-03.jpg', desc:'从鲜果到烘焙咖啡豆，以浓郁色彩、蒸汽与光影呈现一杯咖啡的香气旅程。' },
    { id:4,  cat:2, title:'橘子',          year:2026, type:'奇幻剧情短片', seed:731, pal:3, image:'assets/video/covers/cover-04.jpg', desc:'一颗橘子连接现实、记忆与奇幻世界，在亲情与告别之间展开一段温柔的旅程。' },
    { id:5,  cat:2, title:'别再把她弄丢了', year:2026, type:'动画剧情短片', seed:741, pal:4, image:'assets/video/covers/cover-05.jpg', desc:'在成年女性与内在小女孩之间展开的自我找寻故事，以泥偶、心光与城市日常串联失落和重逢。' },
    { id:6,  cat:2, title:'遗忘算法 · Forgotten Algorithm', year:2026, type:'赛博朋克科幻短片', seed:751, pal:5, image:'assets/video/covers/cover-06.jpg', desc:'在雨夜未来城与数据核心之间，凯伦追查被算法抹除的记忆，并与神秘女子一同逼近被隐藏的真相。' },
    { id:7,  cat:2, title:'THE TRUTH · 真相', year:2026, type:'科幻动作短片', seed:761, pal:0, image:'assets/video/covers/cover-07.jpg', desc:'在霓虹雨夜的未来都市中，猎鹰队员奉命突入 AEON 企业大楼；随着远程指挥、仿生躯体计划与神秘兜帽人的线索逐步交织，一场关于身份与真相的追踪行动全面失控。' },
    { id:8,  cat:3, title:'深海联姻',       year:2026, type:'奇幻漫剧',    seed:771, pal:1, image:'assets/video/covers/cover-08.jpg', desc:'以瑰丽的海底王宫为舞台，围绕 Ava Hartwell 与 Julian Whitmore 展开一场华美而暗流涌动的深海联姻。' },
    { id:9,  cat:3, title:'雾锁无名村', year:2026, type:'系列剧集',    seed:781, pal:2, image:'assets/video/covers/cover-09.jpg', desc:'一名现代青年误入被浓雾封锁的深山无名村，在猎人首领、白发长者与抱柴男孩的指引下，逐渐揭开村中尘封的失踪谜案与自己的身世关联。' },
    { id:10, cat:3, title:'我在修仙界啥都能修', year:2026, type:'系列剧集',    seed:791, pal:3, image:'assets/video/covers/cover-10.jpg', desc:'穿越修仙界的现代青年姜小满，凭借“啥都能修”的手艺，在破旧宗门与市井摊位间修锅、修阵、修人心，走出一条另类的修仙逆袭路。' },
    { id:11, cat:3, title:'双生偿命', year:2025, type:'系列剧集', seed:801, pal:4, image:'assets/video/covers/cover-11.jpg', desc:'一对年幼双胞胎在一场庄园事故中一死一伤，活下来的女孩被送入私人医院进行“记忆重建”。多年后，她开始在手术区走廊与马场之间看见另一个自己的残影，并发现当年被偿命的，或许从来不是意外。' },
    { id:12, cat:3, title:'Five Tears to Live', year:2026, type:'系列剧集', seed:811, pal:5, image:'assets/video/covers/cover-12.jpg', desc:'濒死女孩 Lily 在灵界获得五次落泪的机会，每滴泪都能改写一段人间遗憾。她在无边灵界、湖岸与旧日豪宅之间穿行，试图用最后的眼泪唤回本该活下去的人。' },
    { id:13, cat:3, title:'债务契约', year:2026, type:'系列剧集', seed:821, pal:0, image:'assets/video/covers/cover-13.jpg', desc:'普通职员莉莉为救重病家人签下神秘债务契约，债权人却是一位西装革履的狼总裁。在都市高楼与复古书房之间，她逐渐发现这笔债务偿还不清的，或许是命运本身。' },
    { id:14, cat:4, title:'尘域枪手',      year:2026, type:'影视游戏 PV', seed:831, pal:1, image:'assets/video/covers/cover-14.jpg', desc:'荒漠工业城中的西部枪手对决，围绕左轮、掩体与重装敌人展开高速攻防，融合废土质感与工业科幻视觉。' },
    { id:15, cat:5, title:'变装',          year:2026, type:'AI 变装短片', seed:841, pal:2, image:'assets/video/covers/cover-15.jpg', desc:'以咖啡馆为舞台，通过节拍、动作与镜头遮挡完成六套造型的连续切换，在统一角色与空间中呈现轻快利落的时尚变装。' },
    { id:16, cat:5, title:'激光仓库突围',  year:2026, type:'游戏推广短片', seed:851, pal:3, image:'assets/video/covers/cover-16.jpg', desc:'黑发女特工潜入布满红色激光防线的工业仓库，在侦察无人机协同下突破蓝甲士兵封锁，与重甲指挥官展开正面对决。' }
  ];
  function findVideo(id) {
    var n = parseInt(id, 10);
    for (var i = 0; i < videos.length; i++) if (videos[i].id === n) return videos[i];
    return videos[0];
  }
  function findVideoCat(id) {
    for (var i = 0; i < videoCats.length; i++) if (videoCats[i].id === id) return videoCats[i];
    return videoCats[0];
  }

  function projects(ci) {
    var out = [];
    for (var i = 0; i < 3; i++) {
      out.push({
        id: i,
        catIndex: ci,
        cat: cats[ci].en,
        slug: cats[ci].slug,
        title: titles[ci][i],
        year: 2026 - (i % 2),
        tools: 'AI Generation / Photoshop / Illustrator',
        desc: descs[ci],
        seed: ci * 10 + i + 3,
        pal: ci
      });
    }
    return out;
  }

  function project(ci, id) {
    var list = projects(ci);
    var i = Math.max(0, Math.min(list.length - 1, parseInt(id, 10) || 0));
    return list[i];
  }

  /* resolve ?cat= by slug or index; falls back to the first category */
  function findCat(key) {
    if (key === null || key === undefined || key === '') return { index: 0, cat: cats[0] };
    var k = String(key).toLowerCase();
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].slug === k) return { index: i, cat: cats[i] };
    }
    var n = parseInt(key, 10);
    if (!isNaN(n) && n >= 0 && n < cats.length) return { index: n, cat: cats[n] };
    return { index: 0, cat: cats[0] };
  }

  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  window.PF = {
    palettes: palettes,
    cover: cover,
    cats: cats,
    steps: steps,
    projects: projects,
    project: project,
    findCat: findCat,
    param: param,
    works: works,
    workFile: workFile,
    findWork: findWork,
    nextWork: nextWork,
    posters: posters,
    findPoster: findPoster,
    banner: bannerCover,
    banners: banners,
    findBanner: findBanner,
    typo: typoCover,
    typos: typos,
    findTypo: findTypo,
    illustration: illoCover,
    illustrations: illustrations,
    findIllustration: findIllustration,
    icon: iconCover,
    icons: icons,
    findIcon: findIcon,
    ip: ipCover,
    ips: ips,
    findIp: findIp,
    ipScene: ipSceneCover,
    ipScenes: ipScenes,
    findIpScene: findIpScene,
    video: videoCover,
    videos: videos,
    videoCats: videoCats,
    findVideo: findVideo,
    findVideoCat: findVideoCat
  };
})();
