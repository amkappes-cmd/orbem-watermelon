/* Genus Echo landing — interactions */
(function () {
  'use strict';

  /* ---- Nav: glass background + logo swap on scroll ---- */
  var nav = document.getElementById('nav');
  var sticky = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    // Show sticky CTA once past the hero, hide near the very bottom
    if (sticky && hero) {
      var pastHero = y > hero.offsetHeight * 0.85;
      var nearBottom = (window.innerHeight + y) > (document.body.offsetHeight - 640);
      sticky.classList.toggle('show', pastHero && !nearBottom);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Value bars: grow when in view ---- */
  var barWrap = document.getElementById('valueBars');
  if (barWrap) {
    var grow = function () {
      barWrap.querySelectorAll('.bar').forEach(function (b) {
        b.style.height = b.getAttribute('data-h');
      });
    };
    if ('IntersectionObserver' in window) {
      var bo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { grow(); bo.disconnect(); } });
      }, { threshold: 0.3 });
      bo.observe(barWrap);
    } else { grow(); }
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var open = item.classList.contains('open');
      // close siblings for a clean single-open accordion
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        if (o !== item) {
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
          o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      if (open) {
        item.classList.remove('open');
        ans.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Video: only fall back on a genuine playback error ---- */
  var v = document.getElementById('demoVideo');
  var fb = document.getElementById('videoFallback');
  if (v && fb) {
    var showFallback = function () { fb.style.display = 'flex'; };
    // The <video> fires 'error' only if every source fails; the <source> fires its own.
    v.addEventListener('error', showFallback);
    var src = v.querySelector('source');
    if (src) { src.addEventListener('error', showFallback); }
    // Nudge autoplay once there's enough data (some browsers need the explicit call).
    v.addEventListener('loadeddata', function () {
      var p = v.play();
      if (p && p.catch) { p.catch(function () {}); }
    });
  }

  /* ---- Smooth-scroll offset for fixed nav on hash links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id === '#top') { return; }
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
