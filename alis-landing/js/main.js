/* ============================================================
   A'LIS BEAUTY — лендинг: меню, анимации, слайдеры, cookie
   Чистый ванильный JS, без зависимостей.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Sticky-хедер: фон после скролла ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Мобильное меню ---------- */
  var burger = document.getElementById('burger');
  var mobilemenu = document.getElementById('mobilemenu');
  var mobilemenuClose = document.getElementById('mobilemenuClose');
  function closeMenu() { mobilemenu.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', function () { mobilemenu.classList.add('open'); document.body.style.overflow = 'hidden'; });
  if (mobilemenuClose) mobilemenuClose.addEventListener('click', closeMenu);
  mobilemenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* ---------- 3. Fade-in при появлении (IntersectionObserver) со stagger ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger среди соседей внутри одного контейнера
        var siblings = Array.prototype.slice.call(el.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); });
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(idx, 6) * 90 + 'ms';
        el.classList.add('visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 4. Слайдеры (популярные услуги + UGC) ---------- */
  function initSlider(name) {
    var track = document.querySelector('[data-slider-track="' + name + '"] .slider__track');
    if (!track) return;
    var viewport = track.parentElement;
    var dotsWrap = document.querySelector('[data-slider-dots="' + name + '"]');
    var prevBtn = document.querySelector('.slider-arrow[data-slider="' + name + '"][data-dir="prev"]');
    var nextBtn = document.querySelector('.slider-arrow[data-slider="' + name + '"][data-dir="next"]');
    var index = 0;

    function step() {
      // ширина одной "страницы" = ширина вьюпорта
      return viewport.clientWidth;
    }
    function maxScroll() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }
    function pages() {
      return Math.max(1, Math.ceil((track.scrollWidth) / viewport.clientWidth));
    }
    function offsetForIndex(i) {
      return Math.min(i * step(), maxScroll());
    }
    function render() {
      track.style.transform = 'translateX(' + (-offsetForIndex(index)) + 'px)';
      if (dotsWrap) {
        Array.prototype.slice.call(dotsWrap.children).forEach(function (d, i) {
          d.classList.toggle('active', i === index);
        });
      }
      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = offsetForIndex(index) >= maxScroll() - 1;
    }
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      var p = pages();
      for (var i = 0; i < p; i++) {
        (function (i) {
          var b = document.createElement('button');
          b.setAttribute('aria-label', 'Слайд ' + (i + 1));
          b.addEventListener('click', function () { index = i; render(); });
          dotsWrap.appendChild(b);
        })(i);
      }
    }
    function go(dir) {
      var p = pages();
      index = Math.max(0, Math.min(p - 1, index + dir));
      render();
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

    // Свайп на тач-устройствах
    var startX = 0, dragging = false;
    viewport.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      if (!dragging) return; dragging = false;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    });

    var resizeT;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { buildDots(); index = Math.min(index, pages() - 1); render(); }, 150);
    });

    buildDots();
    render();
  }
  initSlider('best');
  initSlider('ugc');

  /* ---------- 5. Cookie-баннер ---------- */
  var cookie = document.getElementById('cookie');
  var COOKIE_KEY = 'alis_cookie_choice';
  if (cookie && !localStorage.getItem(COOKIE_KEY)) {
    setTimeout(function () { cookie.hidden = false; }, 600);
  }
  cookie && cookie.querySelectorAll('[data-cookie]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, btn.getAttribute('data-cookie'));
      cookie.hidden = true;
    });
  });

})();
