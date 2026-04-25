/* ==========================================================
   Resume Download
   ========================================================== */
function downloadResume() {
  const win = window.open('Keerthi_Resume.pdf', '_blank', 'noopener');
  if (!win) {
    const a = document.createElement('a');
    a.href = 'Keerthi_Resume.pdf';
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

/* ==========================================================
   Navigation — scroll shadow + active-link highlighting
   ========================================================== */
function initNav() {
  const nav      = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function onScroll() {
    // Shadow
    nav.classList.toggle('scrolled', window.scrollY > 10);

    // Active link — whichever section has its top closest above the fold
    let current = sections[0]?.id ?? '';
    for (const sec of sections) {
      if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
    }

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ==========================================================
   Mobile Menu Toggle
   ========================================================== */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const opening = mobileMenu.hidden;
    mobileMenu.hidden = !opening;
    hamburger.setAttribute('aria-expanded', String(opening));
  });

  // Close when any link inside the menu is tapped
  mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.hidden = true;
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================
   Fade-in on Scroll (IntersectionObserver)
   ========================================================== */
function initFadeIn() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: just make everything visible
    document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

/* ==========================================================
   Boot
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initFadeIn();
});

// Expose for inline onclick attributes
window.downloadResume = downloadResume;
