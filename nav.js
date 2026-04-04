(function () {
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

  // Apply saved preference
  applyTheme(localStorage.getItem('theme') === 'dark');

  themeBtn.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme(!isDark);
  });
})();
