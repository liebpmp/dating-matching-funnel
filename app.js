/**
 * Dating Matching Funnel — App Controller
 * Manages screen navigation, progress bar, form state, and submission.
 */

(function () {
  'use strict';

  // Total questionnaire steps (screens 1-7, welcome=0, thankyou=8)
  var TOTAL_STEPS = 7;

  var state = {
    currentScreen: 0,
    answers: {}
  };

  // DOM references
  var progressFill = document.getElementById('progressFill');
  var progressBar = progressFill.parentElement;
  var formContainer = document.getElementById('formContainer');
  var ctaStart = document.getElementById('ctaStart');
  var screens = formContainer.querySelectorAll('.screen');

  // ---- Progress Bar ----

  function updateProgress() {
    var percent;
    if (state.currentScreen === 0) {
      percent = 0;
    } else if (state.currentScreen > TOTAL_STEPS) {
      percent = 100;
    } else {
      percent = Math.round((state.currentScreen / TOTAL_STEPS) * 100);
    }
    progressFill.style.width = percent + '%';
    progressBar.setAttribute('aria-valuenow', percent);
  }

  // ---- Screen Navigation ----

  function goToScreen(targetIndex) {
    var currentEl = screens[state.currentScreen];
    var targetEl = screens[targetIndex];

    if (!targetEl || targetIndex === state.currentScreen) return;

    var goingForward = targetIndex > state.currentScreen;

    // Position target off-screen
    targetEl.style.transition = 'none';
    targetEl.classList.remove('screen--active', 'screen--exit-left');
    targetEl.style.transform = goingForward ? 'translateX(100%)' : 'translateX(-100%)';
    targetEl.style.opacity = '0';

    // Force reflow
    void targetEl.offsetWidth;

    // Re-enable transitions
    targetEl.style.transition = '';

    // Animate current out
    currentEl.classList.remove('screen--active');
    if (goingForward) {
      currentEl.classList.add('screen--exit-left');
    } else {
      currentEl.style.transform = 'translateX(100%)';
      currentEl.style.opacity = '0';
    }
    currentEl.style.pointerEvents = 'none';

    // Animate target in
    targetEl.classList.add('screen--active');
    targetEl.style.transform = '';
    targetEl.style.opacity = '';

    state.currentScreen = targetIndex;
    updateProgress();

    // Focus management: focus first interactive element on new screen
    requestAnimationFrame(function () {
      var focusTarget = targetEl.querySelector('.choice-card, .input-field, .upload, .btn-next, .btn-submit, .btn--primary');
      if (focusTarget) focusTarget.focus();
    });
  }

  function goForward() {
    if (state.currentScreen < screens.length - 1) {
      goToScreen(state.currentScreen + 1);
    }
  }

  function goBack() {
    if (state.currentScreen > 0) {
      goToScreen(state.currentScreen - 1);
    }
  }

  // ---- State Management ----

  function saveAnswer(field, value) {
    state.answers[field] = value;
  }

  // ---- CTA: Welcome → Screen 1 ----

  ctaStart.addEventListener('click', function () {
    goToScreen(1);
  });

  // ---- Back Buttons ----

  var backButtons = formContainer.querySelectorAll('.btn-back');
  backButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      goBack();
    });
  });

  // ---- Choice Cards (auto-advance on select) ----

  var choiceGroups = formContainer.querySelectorAll('.screen__choices');
  choiceGroups.forEach(function (group) {
    var field = group.getAttribute('data-field');
    var cards = group.querySelectorAll('.choice-card');

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        // Remove selection from siblings
        cards.forEach(function (c) {
          c.classList.remove('choice-card--selected');
        });
        // Mark selected
        card.classList.add('choice-card--selected');
        // Save answer
        saveAnswer(field, card.getAttribute('data-value'));
        // Auto-advance after brief delay for visual feedback
        setTimeout(function () {
          goForward();
        }, 300);
      });
    });
  });

  // ---- Validation ----

  function validateCurrentScreen() {
    var currentEl = screens[state.currentScreen];
    var requiredFields = currentEl.querySelectorAll('[data-field][required]');
    var valid = true;

    requiredFields.forEach(function (field) {
      var errorEl = field.parentElement.querySelector('.input-error');
      if (!field.value.trim()) {
        field.classList.add('input-field--error');
        if (errorEl) errorEl.classList.add('input-error--visible');
        valid = false;
      } else {
        field.classList.remove('input-field--error');
        if (errorEl) errorEl.classList.remove('input-error--visible');
      }
    });

    return valid;
  }

  // Clear error state on input
  formContainer.addEventListener('input', function (e) {
    if (e.target.classList.contains('input-field--error')) {
      e.target.classList.remove('input-field--error');
      // Look for error element in parent, then grandparent (for nested input-group layouts)
      var parent = e.target.parentElement;
      var errorEl = parent.querySelector('.input-error');
      if (!errorEl && parent.parentElement) {
        errorEl = parent.parentElement.querySelector('.input-error');
      }
      if (errorEl) errorEl.classList.remove('input-error--visible');
    }
  });

  // ---- Continue Buttons (freetext + upload screens) ----

  var nextButtons = formContainer.querySelectorAll('.btn-next');
  nextButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!validateCurrentScreen()) return;
      // Save any input data from current screen
      saveCurrentScreenInputs();
      goForward();
    });
  });

  function saveCurrentScreenInputs() {
    var currentEl = screens[state.currentScreen];
    var inputs = currentEl.querySelectorAll('[data-field]');
    inputs.forEach(function (input) {
      if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
        saveAnswer(input.getAttribute('data-field'), input.value);
      }
    });
  }

  // ---- Photo Upload ----

  var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  var uploadArea = document.getElementById('uploadArea');
  var photoInput = document.getElementById('photoInput');
  var uploadPreview = document.getElementById('uploadPreview');
  var previewImg = document.getElementById('previewImg');
  var removePhoto = document.getElementById('removePhoto');
  var uploadError = document.getElementById('uploadError');

  function showUploadError() {
    if (uploadError) uploadError.classList.add('upload__error--visible');
  }

  function hideUploadError() {
    if (uploadError) uploadError.classList.remove('upload__error--visible');
  }

  function handlePhotoFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    hideUploadError();

    if (file.size > MAX_FILE_SIZE) {
      showUploadError();
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      uploadArea.hidden = true;
      uploadPreview.hidden = false;
      saveAnswer('photo', file.name);
      // Store data URL for back-navigation restore
      state._photoDataUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  if (uploadArea && photoInput) {
    // Click to upload
    uploadArea.addEventListener('click', function () {
      photoInput.click();
    });

    // Keyboard activation (Enter/Space)
    uploadArea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photoInput.click();
      }
    });

    // File input change
    photoInput.addEventListener('change', function () {
      handlePhotoFile(photoInput.files[0]);
    });

    // Drag-and-drop
    uploadArea.addEventListener('dragenter', function (e) {
      e.preventDefault();
      uploadArea.classList.add('upload--dragover');
    });

    uploadArea.addEventListener('dragover', function (e) {
      e.preventDefault();
      uploadArea.classList.add('upload--dragover');
    });

    uploadArea.addEventListener('dragleave', function (e) {
      e.preventDefault();
      uploadArea.classList.remove('upload--dragover');
    });

    uploadArea.addEventListener('drop', function (e) {
      e.preventDefault();
      uploadArea.classList.remove('upload--dragover');
      var files = e.dataTransfer.files;
      if (files.length > 0) {
        handlePhotoFile(files[0]);
      }
    });

    // Remove photo
    removePhoto.addEventListener('click', function () {
      photoInput.value = '';
      previewImg.src = '';
      uploadPreview.hidden = true;
      uploadArea.hidden = false;
      hideUploadError();
      delete state.answers.photo;
      delete state._photoDataUrl;
    });
  }

  // ---- Contact Validation (Screen 7) ----

  function validateContactScreen() {
    var screen7 = document.getElementById('screen-7');
    var whatsappInput = screen7.querySelector('[data-field="whatsapp"]');
    var errorEl = screen7.querySelector('.input-error');
    var valid = true;

    if (!whatsappInput.value.trim()) {
      whatsappInput.classList.add('input-field--error');
      if (errorEl) errorEl.classList.add('input-error--visible');
      valid = false;
    } else {
      whatsappInput.classList.remove('input-field--error');
      if (errorEl) errorEl.classList.remove('input-error--visible');
    }

    return valid;
  }

  // ---- GDPR Checkbox + Submit ----

  var gdprCheckbox = document.getElementById('gdprCheckbox');
  var submitBtn = document.getElementById('submitBtn');

  if (gdprCheckbox && submitBtn) {
    gdprCheckbox.addEventListener('change', function () {
      submitBtn.disabled = !gdprCheckbox.checked;
    });

    submitBtn.addEventListener('click', function () {
      if (!gdprCheckbox.checked) return;
      if (!validateContactScreen()) return;

      // Save contact fields
      var countryCodeEl = document.getElementById('countryCode');
      var whatsappEl = document.getElementById('whatsappNumber');
      var instagramEl = document.getElementById('instagramHandle');

      var countryCode = countryCodeEl ? countryCodeEl.value : '+49';
      var phone = whatsappEl ? whatsappEl.value.trim() : '';
      var instagram = instagramEl ? instagramEl.value.trim() : '';

      saveAnswer('whatsapp', countryCode + ' ' + phone);
      saveAnswer('countryCode', countryCode);
      if (instagram) saveAnswer('instagram', instagram);
      saveAnswer('gdpr', true);

      // Log collected data
      console.log('Form submitted:', JSON.stringify(state.answers, null, 2));

      // Navigate to thank-you screen
      goToScreen(8);
    });
  }

  // ---- Keyboard Navigation ----

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      // Prevent default form submission behavior
      e.preventDefault();

      if (state.currentScreen === 0) {
        // Welcome → start
        goToScreen(1);
        return;
      }

      // On thank-you screen, do nothing
      if (state.currentScreen > TOTAL_STEPS) return;

      var currentEl = screens[state.currentScreen];

      // If current screen has a choice group and nothing selected, do nothing
      var choiceGroup = currentEl.querySelector('.screen__choices');
      if (choiceGroup) {
        var selected = choiceGroup.querySelector('.choice-card--selected');
        if (!selected) return;
        // Already selected → advance
        goForward();
        return;
      }

      // If current screen has a submit button, click it
      var submit = currentEl.querySelector('.btn-submit');
      if (submit) {
        if (!submit.disabled) submit.click();
        return;
      }

      // If current screen has a continue button, click it (validation handled in click handler)
      var next = currentEl.querySelector('.btn-next');
      if (next) {
        next.click();
        return;
      }
    }
  });

  // ---- Restore UI state when navigating back ----

  var observer = new MutationObserver(function () {
    screens.forEach(function (screen) {
      if (!screen.classList.contains('screen--active')) return;

      // Restore choice card selections
      var group = screen.querySelector('.screen__choices');
      if (group) {
        var field = group.getAttribute('data-field');
        var savedValue = state.answers[field];
        if (savedValue) {
          var cards = group.querySelectorAll('.choice-card');
          cards.forEach(function (card) {
            if (card.getAttribute('data-value') === savedValue) {
              card.classList.add('choice-card--selected');
            } else {
              card.classList.remove('choice-card--selected');
            }
          });
        }
      }

      // Restore photo upload preview on screen 6
      if (screen.getAttribute('data-screen') === '6' && state._photoDataUrl) {
        previewImg.src = state._photoDataUrl;
        uploadArea.hidden = true;
        uploadPreview.hidden = false;
      }

      // Restore contact inputs on screen 7
      if (screen.getAttribute('data-screen') === '7') {
        var countryCodeEl = screen.querySelector('[data-field="countryCode"]');
        var whatsappEl = screen.querySelector('[data-field="whatsapp"]');
        var instagramEl = screen.querySelector('[data-field="instagram"]');
        if (countryCodeEl && state.answers.countryCode) {
          countryCodeEl.value = state.answers.countryCode;
        }
        if (whatsappEl && state.answers.whatsapp) {
          // Extract just the number (remove country code prefix)
          var phone = state.answers.whatsapp;
          var code = state.answers.countryCode || '+49';
          if (phone.indexOf(code) === 0) {
            phone = phone.substring(code.length).trim();
          }
          whatsappEl.value = phone;
        }
        if (instagramEl && state.answers.instagram) {
          instagramEl.value = state.answers.instagram;
        }
      }
    });
  });

  observer.observe(formContainer, { subtree: true, attributes: true, attributeFilter: ['class'] });

  // ---- Initialize ----

  updateProgress();
})();
