/**
 * EVOLV Contractor Solutions — script.js
 * Handles: scroll animations, nav state, smooth scroll, form submission
 */

'use strict';

/* ── Utility: DOM ready ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFadeInObserver();
  initSmoothScroll();
  initForm();
});

/* ── 1. Navigation: transparent → dark on scroll ────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 60;

  function updateNav() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  // Throttle scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  updateNav();
}

/* ── 2. Fade-in on scroll (IntersectionObserver) ────────────── */
function initFadeInObserver() {
  // Respect reduced-motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Make all elements visible immediately
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after animation triggers — performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Hero content: trigger immediately (already in viewport)
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    // Small delay for perceived polish
    setTimeout(() => {
      heroContent.classList.add('is-visible');
    }, 120);
  }
}

/* ── 3. Smooth scroll for anchor links ──────────────────────── */
function initSmoothScroll() {
  const NAV_HEIGHT = 72; // approximate fixed nav height in px

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });

      // Move focus to the target section for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/* ── 4. Form submission via Formspree ───────────────────────── */
function initForm() {
  const form = document.getElementById('diagnostic-form');
  const submitBtn = document.getElementById('submit-btn');
  const messageEl = document.getElementById('form-message');

  if (!form || !submitBtn || !messageEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!validateForm(form)) return;

    // Loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.classList.add('btn--loading');
    submitBtn.disabled = true;
    clearMessage(messageEl);

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        showMessage(
          messageEl,
          '✓ Request received! Cesar will be in touch within 24 hours.',
          'is-success'
        );
        form.reset();
        // Scroll message into view
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const data = await response.json().catch(() => ({}));
        const errMsg =
          data?.errors?.map(err => err.message).join(', ') ||
          'Something went wrong. Please try again or email us directly.';
        showMessage(messageEl, errMsg, 'is-error');
      }
    } catch (err) {
      showMessage(
        messageEl,
        'Network error. Please check your connection and try again.',
        'is-error'
      );
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('btn--loading');
      submitBtn.disabled = false;
    }
  });

  // Live amber border on focus (handled by CSS :focus, but we add
  // a class for any extra JS-driven behaviour if needed)
  form.querySelectorAll('.form__input').forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.form__group')?.classList.add('is-focused');
    });
    input.addEventListener('blur', () => {
      input.closest('.form__group')?.classList.remove('is-focused');
    });
  });
}

/* ── Form helpers ────────────────────────────────────────────── */
function validateForm(form) {
  let valid = true;

  // Clear previous inline errors
  form.querySelectorAll('.form__error').forEach(el => el.remove());
  form.querySelectorAll('.form__input--invalid').forEach(el => {
    el.classList.remove('form__input--invalid');
  });

  const required = form.querySelectorAll('[required]');
  required.forEach(field => {
    const value = field.value.trim();
    if (!value) {
      markInvalid(field, 'This field is required.');
      valid = false;
    } else if (field.type === 'email' && !isValidEmail(value)) {
      markInvalid(field, 'Please enter a valid email address.');
      valid = false;
    }
  });

  if (!valid) {
    // Focus first invalid field
    const firstInvalid = form.querySelector('.form__input--invalid');
    if (firstInvalid) firstInvalid.focus();
  }

  return valid;
}

function markInvalid(field, message) {
  field.classList.add('form__input--invalid');

  const error = document.createElement('span');
  error.className = 'form__error';
  error.textContent = message;
  error.style.cssText = 'font-size:13px;color:#F87171;margin-top:4px;display:block;';
  field.closest('.form__group')?.appendChild(error);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(el, text, stateClass) {
  el.textContent = text;
  el.className = 'form__message ' + stateClass;
}

function clearMessage(el) {
  el.textContent = '';
  el.className = 'form__message';
}
