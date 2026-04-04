(function () {
  var wrap   = document.querySelector('.carousel-track-wrap');
  var track  = document.querySelector('.carousel-track');
  var slides = document.querySelectorAll('.carousel-slide');
  var dots   = document.querySelectorAll('.carousel-dot');
  var prev   = document.querySelector('.carousel-prev');
  var next   = document.querySelector('.carousel-next');
  if (!track || !slides.length) return;

  var current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  prev.addEventListener('click', function () { goTo(current - 1); });
  next.addEventListener('click', function () { goTo(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });

  // ── Touch swipe ──────────────────────────────────
  var touchStartX = 0;
  wrap.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  wrap.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // ── Mouse drag swipe ─────────────────────────────
  var mouseStartX = 0;
  var isDragging  = false;

  wrap.addEventListener('mousedown', function (e) {
    mouseStartX = e.clientX;
    isDragging  = true;
    wrap.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var diff = mouseStartX - e.clientX;
    track.style.transition = 'none';
    track.style.transform  =
      'translateX(calc(-' + (current * 100) + '% - ' + diff + 'px))';
  });

  window.addEventListener('mouseup', function (e) {
    if (!isDragging) return;
    isDragging = false;
    wrap.style.cursor = 'grab';
    track.style.transition = '';
    var diff = mouseStartX - e.clientX;
    if (Math.abs(diff) > 60) {
      goTo(diff > 0 ? current + 1 : current - 1);
    } else {
      goTo(current); // snap back
    }
  });

  wrap.style.cursor = 'grab';
})();
