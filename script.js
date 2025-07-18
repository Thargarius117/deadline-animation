// Init
var $ = jQuery;

$(document).ready(function () {
  console.log("jQuery version:", $.fn.jquery);

  // Dates de départ et de fin
  const startDate = new Date("2025-07-18T00:00:00").getTime();
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

  function setAnimationState() {
    const now = new Date().getTime();
    const total = deadlineDate - startDate;
    const elapsed = now - startDate;

    const progress = Math.max(0, Math.min(1, elapsed / total));
    const fullWidth = 586; // largeur totale de la barre
    const currentX = -fullWidth + (progress * fullWidth);

    // Position immédiate actuelle
    $('#progress-time-fill').attr('x', currentX);

    // Durée restante
    const remainingTime = deadlineDate - now;
    const totalSeconds = Math.max(1, remainingTime / 1000);

    // Re-animer uniquement la portion restante
    $('#progress-time-fill, #death-group').css({
      'animation-duration': totalSeconds + 's',
      'animation-delay': '0s'
    });
  }

  function deadlineText() {
    const $el = $('.deadline-days');
    const html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
    $el.html(html);
  }

  deadlineText();
  updateCountdown();
  setAnimationState();

  const timerInterval = setInterval(() => {
    updateCountdown();
    setAnimationState();
  }, 60000); // met à jour chaque minute
});
