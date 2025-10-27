/**
 * Navigation Menu Handler
 * Handles mobile menu toggle, backdrop, and close button
 */

(function() {
  'use strict';

  // Prevent multiple initializations
  if (window.__navBound) return;
  window.__navBound = true;

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const toggle = document.querySelector('.header-toggle');
    const nav = document.querySelector('.app-nav');
    const backdrop = document.querySelector('.nav-backdrop');
    const closeBtn = document.querySelector('.nav-close');

    if (!toggle || !nav || !backdrop) {
      console.warn('Navigation elements not found');
      return;
    }

    // Open menu
    function openNav() {
      nav.classList.add('is-open');
      backdrop.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      // Accessibility
      toggle.setAttribute('aria-expanded', 'true');
    }

    // Close menu
    function closeNav() {
      nav.classList.remove('is-open');
      backdrop.setAttribute('hidden', '');
      document.body.style.overflow = '';

      // Accessibility
      toggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle menu
    function toggleNav() {
      if (nav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    }

    // Event listeners
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleNav();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeNav();
      });
    }

    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) {
        closeNav();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
      }
    });

    // Close on window resize (tablet/desktop)
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 991 && nav.classList.contains('is-open')) {
          closeNav();
        }
      }, 250);
    });
  }
})();
