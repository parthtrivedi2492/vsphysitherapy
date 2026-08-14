/* ============================================================
   VS Physiotherapy — interactions
   Libraries (all optional / defensively loaded):
   GSAP + ScrollTrigger · Lenis · Swiper · Leaflet · Lucide
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Failsafe: never leave animated content invisible --- */
  var revealAll = function () { root.classList.add('anim-ready'); };
  setTimeout(revealAll, 2600);
  window.addEventListener('load', function () { setTimeout(revealAll, 600); });

  /* ---------- Icons ---------- */
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  /* ---------- Smooth scroll (Lenis) ----------
     Driven by exactly one clock: the GSAP ticker when GSAP is present,
     otherwise our own rAF. Driving it from both stacks doubles the
     delta each frame and makes scrolling feel twice as fast. */
  var lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.6 });
    if (!window.gsap) {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  var scrollTo = function (target) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - 90;
    if (lenis) lenis.scrollTo(top, { duration: 1.1 });
    else window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    scrollTo(el);
    history.replaceState(null, '', id);
  });

  /* ---------- Header ---------- */
  var hdr = document.querySelector('.hdr');
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  var bookbar = document.querySelector('.bookbar');

  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    if (hdr) hdr.classList.toggle('is-stuck', y > 10);
    if (bookbar) bookbar.classList.toggle('on', y > 520);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (burger && menu) {
    var backdrop = document.querySelector('.nav-backdrop');

    /* The header uses backdrop-filter, which makes it the containing block for
       the fixed-position menu. That means viewport units in CSS overshoot by the
       height of the announcement bar, so measure the real gap instead. */
    var sizeMenu = function () {
      var top = menu.getBoundingClientRect().top;
      menu.style.maxHeight = Math.max(160, window.innerHeight - top - 8) + 'px';
    };

    var label = burger.querySelector('.burger__label');
    var mqMobile = window.matchMedia('(max-width: 860px)');

    /* Keep the collapsed menu out of the tab order and the accessibility tree.
       `inert` is used rather than relying on the CSS visibility transition,
       because that transition only resolves once a frame is painted. */
    var syncInert = function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      if (mqMobile.matches && !open) menu.setAttribute('inert', '');
      else menu.removeAttribute('inert');
    };

    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (label) label.textContent = open ? 'Close' : 'Menu';
      menu.classList.toggle('on', open);
      if (backdrop) backdrop.classList.toggle('on', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) sizeMenu(); else menu.scrollTop = 0;
      syncInert();

      /* Lenis calls preventDefault() on every wheel/touch event while stopped,
         which would also block scrolling inside the open menu. The menu carries
         data-lenis-prevent so Lenis ignores events originating inside it. */
      if (lenis) { open ? lenis.stop() : lenis.start(); }

      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    };

    syncInert();
    if (mqMobile.addEventListener) mqMobile.addEventListener('change', syncInert);

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

    if (backdrop) {
      backdrop.addEventListener('click', function () { setMenu(false); burger.focus(); });
      // Belt and braces on iOS, where overflow:hidden alone does not lock scroll.
      backdrop.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
    }

    document.addEventListener('keydown', function (e) {
      if (burger.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setMenu(false); burger.focus(); return; }
      if (e.key !== 'Tab') return;
      // Keep focus inside the menu while it is open.
      var items = [burger].concat(Array.prototype.slice.call(menu.querySelectorAll('a')));
      var idx = items.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = e.shiftKey ? idx - 1 : idx + 1;
      if (next < 0) next = items.length - 1;
      if (next >= items.length) next = 0;
      e.preventDefault();
      items[next].focus();
    });

    window.addEventListener('resize', function () {
      // Resizing up to the desktop nav leaves the body scroll-locked otherwise.
      if (window.innerWidth > 860) {
        if (burger.getAttribute('aria-expanded') === 'true') setMenu(false);
        menu.style.maxHeight = '';
        syncInert();
        return;
      }
      if (burger.getAttribute('aria-expanded') === 'true') sizeMenu();
      else menu.style.maxHeight = '';
      syncInert();
    });

    /* Restoring from bfcache (mobile back button) can replay a state where the
       menu was open, leaving the page scroll-locked. Always reset. */
    window.addEventListener('pageshow', function () { setMenu(false); });
  }

  /* ---------- Custom cursor ---------- */
  var ring = document.querySelector('.cursor');
  var dot = document.querySelector('.cursor-dot');
  if (ring && dot && window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 1024) {
    var mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, [data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.classList.add('is-hot');
        ring.setAttribute('data-cursor-label', el.getAttribute('data-cursor') || '');
      });
      el.addEventListener('mouseleave', function () { ring.classList.remove('is-hot'); });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22;
        var y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- GSAP scene ---------- */
  var gsap = window.gsap;
  var ST = window.ScrollTrigger;

  if (gsap && ST && !reduced) {
    gsap.registerPlugin(ST);

    if (lenis) {
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
    window.__lenis = lenis;

    root.classList.add('anim-ready');

    /* Split headline into masked lines */
    if (window.SplitType) {
      document.querySelectorAll('[data-split]').forEach(function (el) {
        var st = new window.SplitType(el, { types: 'lines', lineClass: 'split-line' });
        st.lines.forEach(function (line) {
          var mask = document.createElement('span');
          mask.className = 'line-mask';
          line.parentNode.insertBefore(mask, line);
          mask.appendChild(line);
        });
        gsap.set(el, { opacity: 1 });
        gsap.from(st.lines, {
          yPercent: 112, duration: 1.05, ease: 'power4.out', stagger: 0.075,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
    }

    /* Generic reveals */
    gsap.utils.toArray('[data-anim="up"]').forEach(function (el) {
      gsap.fromTo(el, { y: 42, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.95, ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });

    gsap.utils.toArray('[data-anim="stagger"]').forEach(function (group) {
      gsap.fromTo(group.children, { y: 46, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.075,
        scrollTrigger: { trigger: group, start: 'top 86%', once: true }
      });
      gsap.set(group, { opacity: 1 });
    });

    /* Scale reveal settles UP into place. Scaling down from >1 would push the
       element past the viewport edge on narrow screens and get it clipped. */
    gsap.utils.toArray('[data-anim="scale"]').forEach(function (el) {
      gsap.fromTo(el, { scale: 0.94, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true }
      });
    });

    /* Parallax on media */
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      gsap.to(el, {
        yPercent: parseFloat(el.dataset.parallax) || -9, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* Pinned horizontal rail (desktop only) */
    ST.matchMedia && null;
    var mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', function () {
      var pin = document.querySelector('.rail__pin');
      var track = document.querySelector('.rail__track');
      if (!pin || !track) return;
      root.classList.add('rail-pinned');
      var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 80); };
      var tw = gsap.to(track, {
        x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top top', end: function () { return '+=' + dist(); },
          pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1
        }
      });
      return function () { root.classList.remove('rail-pinned'); tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); gsap.set(track, { clearProps: 'x' }); };
    });

    /* Marquee reacts to scroll direction */
    gsap.utils.toArray('.marquee__track').forEach(function (t) {
      ST.create({
        trigger: t, start: 'top bottom', end: 'bottom top',
        onUpdate: function (self) { t.style.animationDirection = self.direction === 1 ? 'normal' : 'reverse'; }
      });
    });
  } else {
    revealAll();
  }

  /* ---------- Hand-drawn underline ----------
     Inline styles are used deliberately: the dash length depends on the real
     measured path length, and inline values beat the stylesheet cleanly. */
  document.querySelectorAll('.mark').forEach(function (m) {
    var path = m.querySelector('svg path');
    if (!path || typeof path.getTotalLength !== 'function') return;
    var len = path.getTotalLength();
    if (!len) return;

    if (reduced) { path.style.strokeDasharray = 'none'; return; }

    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    var draw = function () {
      m.classList.add('is-drawn');
      path.style.transition = 'stroke-dashoffset 1.15s cubic-bezier(.16,1,.3,1)';
      // setTimeout rather than rAF: rAF is paused in background tabs, which
      // would leave the stroke permanently hidden.
      setTimeout(function () { path.style.strokeDashoffset = '0'; }, 30);
    };

    if (gsap && ST) {
      ST.create({ trigger: m, start: 'top 92%', once: true, onEnter: function () { setTimeout(draw, 350); } });
    } else {
      setTimeout(draw, 350);
    }
  });

  /* ---------- Counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var run = function (el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var prefix = el.dataset.prefix || '';
      var t0 = performance.now(), dur = 1600;
      var step = function (now) {
        var p = Math.min((now - t0) / dur, 1);
        var v = target * (1 - Math.pow(1 - p, 4));
        el.textContent = prefix + (target % 1 ? v.toFixed(1) : Math.round(v).toLocaleString('en-CA')) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window) || reduced) {
      counters.forEach(function (el) { el.textContent = (el.dataset.prefix || '') + parseFloat(el.dataset.count).toLocaleString('en-CA') + (el.dataset.suffix || ''); });
    } else {
      var co = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* ---------- Testimonials (Swiper) ---------- */
  if (window.Swiper && document.querySelector('.tcarousel')) {
    new window.Swiper('.tcarousel', {
      slidesPerView: 1.08, spaceBetween: 18, grabCursor: true, watchOverflow: true,
      navigation: { nextEl: '.tnext', prevEl: '.tprev' },
      pagination: { el: '.tpager', clickable: true },
      breakpoints: { 700: { slidesPerView: 2, spaceBetween: 20 }, 1100: { slidesPerView: 3, spaceBetween: 22 } }
    });
  }

  /* ---------- Live open/closed status (America/Toronto) ---------- */
  var flag = document.querySelector('[data-openflag]');
  if (flag) {
    // Minutes from midnight, America/Toronto. Mon-Thu 9-20, Fri 9-18, Sat 9-15.
    var HOURS = { 1: [540, 1200], 2: [540, 1200], 3: [540, 1200], 4: [540, 1200], 5: [540, 1080], 6: [540, 900], 0: null };
    var parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Toronto', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    var get = function (t) { var p = parts.find(function (x) { return x.type === t; }); return p ? p.value : ''; };
    var dayIdx = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')];
    var mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
    var span = HOURS[dayIdx];
    var open = !!span && mins >= span[0] && mins < span[1];
    flag.classList.toggle('shut', !open);
    var txt = flag.querySelector('[data-openflag-text]');
    if (txt) txt.textContent = open ? 'Open now — walk-ins welcome' : 'Closed — book online 24/7';
    var rows = document.querySelectorAll('[data-day]');
    rows.forEach(function (r) { r.classList.toggle('now', parseInt(r.dataset.day, 10) === dayIdx); });
  }

  /* ---------- Leaflet map ---------- */
  var mapEl = document.getElementById('map');
  if (mapEl && window.L) {
    var L = window.L;
    // Approximate — verify against Google Maps before launch.
    var CLINIC = [43.6470, -79.6230]; // 5160 Explorer Dr, Mississauga
    var map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true }).setView(CLINIC, 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19
    }).addTo(map);

    var pin = L.divIcon({
      className: '', iconSize: [30, 30], iconAnchor: [15, 15],
      html: '<span style="display:block;width:30px;height:30px;border-radius:50%;background:#C0724A;border:3px solid #FAF7F0;box-shadow:0 4px 14px rgba(19,30,23,.35)"></span>'
    });
    L.marker(CLINIC, { icon: pin, title: 'VS Physiotherapy & Rehabilitation Centre' }).addTo(map)
      .bindPopup('<b>VS Physio &amp; Rehab</b><br>5160 Explorer Dr, Unit 9<br>Mississauga, ON L4W 4T7<br><small>Free on-site parking</small>');

    mapEl.addEventListener('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });
  }

  /* ---------- Year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Form validation ---------- */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    var done = form.querySelector('.done');

    var check = function (input) {
      var wrap = input.closest('.f');
      if (!wrap) return true;
      var ok = input.value.trim() !== '' && input.checkValidity();
      wrap.classList.toggle('bad', !ok);
      return ok;
    };

    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { if (input.required) check(input); });
      input.addEventListener('input', function () {
        var w = input.closest('.f');
        if (w && w.classList.contains('bad')) check(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      form.querySelectorAll('[required]').forEach(function (input) {
        if (!check(input)) { ok = false; if (!first) first = input; }
      });
      if (!ok) { if (first) { first.focus(); scrollTo(first.closest('.f')); } return; }
      if (done) {
        done.classList.add('on');
        done.setAttribute('tabindex', '-1');
        done.focus();
      }
      form.reset();
      form.querySelectorAll('.f.bad').forEach(function (w) { w.classList.remove('bad'); });
    });
  });
})();
