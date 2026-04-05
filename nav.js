(function () {

  // ── Smooth Scroll Helper ──────────────────────
  function smoothScrollTo(targetY, duration) {
    var start     = window.pageYOffset;
    var distance  = targetY - start;
    var startTime = null;
    function ease(t) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }
    function step(now) {
      if (!startTime) startTime = now;
      var elapsed  = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * ease(progress));
      if (elapsed < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Navbar logo → scroll to footer ───────────
  var navBrand   = document.querySelector('.nav-brand');
  var siteFooter = document.querySelector('.footer');
  if (navBrand && siteFooter) {
    navBrand.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScrollTo(siteFooter.getBoundingClientRect().top + window.pageYOffset, 550);
    });
  }

  // ── Footer logo → scroll to top ──────────────
  var footerBrand = document.querySelector('.footer-brand-link');
  if (footerBrand) {
    footerBrand.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScrollTo(0, 550);
    });
  }

  // ── Burger Menu ───────────────────────────────
  var btn = document.querySelector('.burger-btn');
  var nav = document.querySelector('.nav-links');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('nav-open');
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Theme Toggle ──────────────────────────────
  var themeBtn = document.querySelector('.theme-btn');
  if (!themeBtn) return;

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeBtn.textContent = '☀️';
      themeBtn.setAttribute('title', 'Light Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeBtn.textContent = '🌙';
      themeBtn.setAttribute('title', 'Dark Mode');
    }
  }

  applyTheme(localStorage.getItem('theme') === 'dark');

  themeBtn.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme(!isDark);
  });
})();
