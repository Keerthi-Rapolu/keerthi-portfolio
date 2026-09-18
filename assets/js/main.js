/* ==========================================================================
   Keerthi Rapolu — Portfolio
   No dependencies. Everything here is an enhancement: with this file missing
   or blocked, the page still reads, navigates and prints correctly.
   ========================================================================== */
(function () {
  'use strict';

  var DESKTOP = window.matchMedia('(min-width: 981px)');
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
  var CAN_REVEAL = !REDUCED.matches && 'IntersectionObserver' in window;

  // Set as soon as this file executes — before DOMContentLoaded, and normally
  // before first paint — so revealed content never flashes in and then out.
  if (CAN_REVEAL) document.documentElement.classList.add('js');

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    function showAll() {
      for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    }

    if (!CAN_REVEAL) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -48px 0px' });

    items.forEach(function (el) { observer.observe(el); });

    // Safety net — nothing stays invisible if anything goes wrong.
    window.setTimeout(showAll, 4000);
  }

  /* ------------------------------------------------------------------
     Nav: stuck border, active section, scroll progress
     ------------------------------------------------------------------ */
  function initNav() {
    var nav = document.getElementById('nav');
    var bar = document.getElementById('progress');
    if (!nav) return;

    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    var targets = links
      .map(function (link) {
        var id = (link.getAttribute('href') || '').replace('#', '');
        var el = id ? document.getElementById(id) : null;
        return el ? { id: id, el: el, link: link } : null;
      })
      .filter(Boolean);

    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;

      nav.classList.toggle('is-stuck', y > 8);

      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(y / max, 1) : 0;
        bar.style.transform = 'scaleX(' + pct + ')';
      }

      if (!targets.length) return;

      var current = null;
      var line = y + 150;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i].el.offsetTop <= line) current = targets[i].id;
      }
      // At the very bottom the last section wins, however short it is.
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) {
        current = targets[targets.length - 1].id;
      }

      targets.forEach(function (t) {
        var on = t.id === current;
        t.link.classList.toggle('is-active', on);
        if (on) t.link.setAttribute('aria-current', 'true');
        else t.link.removeAttribute('aria-current');
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
     Mobile sheet
     ------------------------------------------------------------------ */
  function initSheet() {
    var button = document.getElementById('burger');
    var sheet = document.getElementById('sheet');
    if (!button || !sheet) return;

    function setOpen(open) {
      sheet.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    button.addEventListener('click', function () { setOpen(sheet.hidden); });

    sheet.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !sheet.hidden) {
        setOpen(false);
        button.focus();
      }
    });

    // Close on the way up to desktop, where the toggle itself is hidden.
    function onBreakpoint(event) { if (event.matches) setOpen(false); }
    if (DESKTOP.addEventListener) DESKTOP.addEventListener('change', onBreakpoint);
    else if (DESKTOP.addListener) DESKTOP.addListener(onBreakpoint);
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function boot() {
    initReveal();
    initNav();
    initSheet();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
