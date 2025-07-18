// Init
var $ = jQuery;

$(document).ready(function () {
  console.log("jQuery version:", $.fn.jquery);

  // 🔧 Configuration : date de début et date de deadline
  const startDate = new Date("2025-07-10T22:00:00").getTime();
  const deadlineDate = new Date("2025-07-18T23:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = deadlineDate - now;

    if (diff <= 0) {
      $('.deadline-days .day').text(0);
      clearInterval(timerInterval);
      return;
    }

    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    $('.deadline-days .day').text(daysLeft);
  }

  function setAnimationProgress() {
    const now = new Date().getTime();
    const totalDuration = deadlineDate - startDate;
    const elapsed = now - startDate;

    const progress = Math.max(0, Math.min(1, elapsed / totalDuration));
    const fullWidth = 586; // largeur du rect SVG
    const currentX = -fullWidth + (progress * fullWidth);

    $('#progress-time-fill').attr('x', currentX);

    // Ajuste la durée de l’animation restante
    const remainingTime = deadlineDate - now;
    const totalSeconds = Math.max(1, remainingTime / 1000);
    $('#progress-time-fill, #death-group').css({ 'animation-duration': totalSeconds + 's' });
  }

  function deadlineText() {
    var $el = $('.deadline-days');
    var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
    $el.html(html);
  }

  deadlineText();
  updateCountdown();
  setAnimationProgress();

  const timerInterval = setInterval(function () {
    updateCountdown();
    setAnimationProgress();
  }, 60000); // actualise chaque minute
});
