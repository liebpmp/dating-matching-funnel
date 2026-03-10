/**
 * Dating Matching Funnel — App Controller
 * Manages screen navigation, progress bar, and form state.
 */

(function () {
  'use strict';

  // Total number of questionnaire steps (excluding welcome screen 0)
  var TOTAL_STEPS = 8;

  var state = {
    currentScreen: 0,
    answers: {}
  };

  // DOM references
  var progressFill = document.getElementById('progressFill');
  var progressBar = progressFill.parentElement;
  var formContainer = document.getElementById('formContainer');
  var ctaStart = document.getElementById('ctaStart');

  /**
   * Update the progress bar based on current screen.
   * Welcome (screen 0) = 0%, then linear across TOTAL_STEPS.
   */
  function updateProgress() {
    var percent = state.currentScreen === 0
      ? 0
      : Math.round((state.currentScreen / TOTAL_STEPS) * 100);
    progressFill.style.width = percent + '%';
    progressBar.setAttribute('aria-valuenow', percent);
  }

  /**
   * Navigate to a target screen index.
   */
  function goToScreen(targetIndex) {
    var screens = formContainer.querySelectorAll('.screen');
    var currentEl = screens[state.currentScreen];
    var targetEl = screens[targetIndex];

    if (!targetEl || targetIndex === state.currentScreen) return;

    var goingForward = targetIndex > state.currentScreen;

    // Set up initial position of target screen
    targetEl.style.transition = 'none';
    targetEl.classList.remove('screen--active', 'screen--exit-left');
    targetEl.style.transform = goingForward ? 'translateX(100%)' : 'translateX(-100%)';
    targetEl.style.opacity = '0';

    // Force reflow
    void targetEl.offsetWidth;

    // Re-enable transitions
    targetEl.style.transition = '';

    // Animate current screen out
    currentEl.classList.remove('screen--active');
    if (goingForward) {
      currentEl.classList.add('screen--exit-left');
    } else {
      currentEl.style.transform = 'translateX(100%)';
      currentEl.style.opacity = '0';
    }
    currentEl.style.pointerEvents = 'none';

    // Animate target screen in
    targetEl.classList.add('screen--active');
    targetEl.style.transform = '';
    targetEl.style.opacity = '';

    state.currentScreen = targetIndex;
    updateProgress();
  }

  // CTA: navigate from welcome to first question
  ctaStart.addEventListener('click', function () {
    goToScreen(1);
  });

  // Keyboard: Enter on welcome screen advances
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && state.currentScreen === 0) {
      goToScreen(1);
    }
  });

  // Initialize progress bar
  updateProgress();
})();
