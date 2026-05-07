(function () {
  'use strict';

  const hamburger = document.getElementById('navbar-hamburger');
  const navMenu   = document.getElementById('navbar-menu');

  function openMenu() {
    if (!hamburger || !navMenu) return;
    navMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburger || !navMenu) return;
    navMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = navMenu && navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  document.addEventListener('click', function (e) {
    if (
      navMenu &&
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(e.target) &&
      hamburger &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  if (navMenu) {
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  const header = document.getElementById('site-header');
  const SCROLL_THRESHOLD = 80;

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  let scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        handleScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  handleScroll();

  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
