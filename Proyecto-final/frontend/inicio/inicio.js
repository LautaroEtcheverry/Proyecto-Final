document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.ver-productos-btn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('.productos-inicio');
      const offset = 140; // Más arriba, ajusta este valor a tu gusto
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      smoothScrollTo(window.pageXOffset, targetPosition, 900); // 900ms = un poco más lento
    });
  }

  // Función de scroll suave estándar
  function smoothScrollTo(startX, targetY, duration) {
    const startY = window.pageYOffset;
    const distanceY = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      // Easing estándar
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(startX, startY + distanceY * ease);
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }
});