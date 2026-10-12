/* 谷建霏 PORTFOLIO — shared renderer + interactions for standalone
   design detail pages (<slug>.html). Reads the work from PF.works
   based on the current file name (poster.html -> poster), then
   fills #detail with title / showcase / Project Info / Process. */
(function () {
  var PF = window.PF;
  if (!PF || !PF.works) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* resolve which work this page is, from the file name (poster.html -> poster) */
  var file = (location.pathname.split('/').pop() || '');
  var m = /^(.+)\.html$/.exec(file);
  var slug = m ? m[1] : null;
  var w = PF.findWork(slug || 'poster');

  var PROCESS = ['概念构思', '制作过程', '最终成品'];
  var showcase = PF.cover(w.seed, w.pal);
  var procImgs = [
    PF.cover(w.seed + 7, w.pal),
    PF.cover(w.seed + 17, w.pal),
    PF.cover(w.seed + 27, w.pal)
  ];
  /* sequential design-category order: poster -> banner -> typography ->
     illustration -> icon -> ip -> video. Compute next from the works order so
     the last one (ip) flows into video.html instead of wrapping to poster. */
  var idx = -1;
  for (var i = 0; i < PF.works.length; i++) if (PF.works[i].slug === w.slug) { idx = i; break; }
  var isLast = (idx === PF.works.length - 1);
  var nw = isLast ? null : PF.works[idx + 1];
  var nextHref = isLast ? 'video.html' : PF.workFile(nw);
  var nextName = isLast ? '视频' : nw.title;

  var main = document.getElementById('detail');
  main.innerHTML =
    '<a class="back up" href="design.html">&larr; 返回设计</a>' +
    '<section class="phead reveal">' +
      '<div class="pno">项目 ' + w.num + ' &mdash; ' + w.cat + '</div>' +
      '<h1 class="ptitle">' + w.title + '</h1>' +
      '<div class="pcat">' + w.cn + ' &middot; ' + w.year + '</div>' +
    '</section>' +
    '<section class="showcase reveal">' +
      '<div class="show-img" style="background-image:url(\'' + showcase + '\')"></div>' +
    '</section>' +
    '<section class="info reveal">' +
      '<div class="sec-label">项目信息</div>' +
      '<dl class="info-grid">' +
        '<div><dt>分类</dt><dd>' + w.cat + '</dd></div>' +
        '<div><dt>年份</dt><dd>' + w.year + '</dd></div>' +
        '<div><dt>使用工具</dt><dd>' + w.tools + '</dd></div>' +
      '</dl>' +
      '<p class="info-desc">' + w.desc + '</p>' +
    '</section>' +
    '<section class="process reveal">' +
      '<div class="sec-label">制作流程</div>' +
      '<div class="proc">' +
        PROCESS.map(function (p, i) {
          return '<div class="pstep">' +
            '<div class="pthumb" style="background-image:url(\'' + procImgs[i] + '\')"></div>' +
            '<div class="plbl"><span class="pn">0' + (i + 1) + '</span>' + p + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</section>' +
    '<nav class="pagenav reveal">' +
      '<a class="pn-back" href="design.html">&larr; 返回设计</a>' +
      '<a class="pn-next" href="' + nextHref + '">' +
        '<span class="pn-lbl">下一个项目</span>' +
        '<span class="pn-name">' + nextName + ' &rarr;</span>' +
      '</a>' +
    '</nav>';

  /* entrance animation */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.body.classList.add('ready'); });
  });

  /* scroll reveal */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* cursor light + subtle blob parallax */
  if (!reduce) {
    var blobs = [document.querySelector('.b1'), document.querySelector('.b2'), document.querySelector('.b3')];
    var clight = document.getElementById('clight');
    var lx = window.innerWidth / 2, ly = window.innerHeight / 2, ticking = false;
    clight.style.transform = 'translate(' + lx + 'px,' + ly + 'px)';
    window._cx = lx; window._cy = ly;
    function follow() {
      lx += (window._cx - lx) * 0.09; ly += (window._cy - ly) * 0.09;
      clight.style.transform = 'translate(' + lx + 'px,' + ly + 'px)';
      ticking = false;
    }
    window.addEventListener('mousemove', function (e) {
      var mx = e.clientX / window.innerWidth - 0.5, my = e.clientY / window.innerHeight - 0.5;
      window._cx = e.clientX; window._cy = e.clientY;
      clight.style.opacity = '1';
      if (blobs[0]) blobs[0].style.transform = 'translate(' + (mx * 28) + 'px,' + (my * 24) + 'px)';
      if (blobs[1]) blobs[1].style.transform = 'translate(' + (mx * -24) + 'px,' + (my * -20) + 'px)';
      if (blobs[2]) blobs[2].style.transform = 'translate(' + (mx * 15) + 'px,' + (my * -28) + 'px)';
      if (!ticking) { ticking = true; requestAnimationFrame(follow); }
    });
    window.addEventListener('mouseleave', function () { clight.style.opacity = '0'; });
  }
})();
