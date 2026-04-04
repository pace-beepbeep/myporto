/* ═══════════════════════════════
   pages.js — shared script for
   work.html, about.html, contact.html
═══════════════════════════════ */

/* ── Custom cursor ── */
const cursor = document.getElementById('cursor');
let mx = -100, my = -100;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

document.querySelectorAll('a, button, .wp-item, .ab-stack-item, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.wp-item, .ab-service-item, .ab-stack-item, .ct-success'
);
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ── Work filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const wpItems    = document.querySelectorAll('.wp-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.filter;
    wpItems.forEach(item => {
      const match = cat === 'all' || item.dataset.cat === cat;
      if (match) {
        item.classList.remove('hidden');
        // re-trigger reveal
        setTimeout(() => item.classList.add('visible'), 50);
      } else {
        item.classList.add('hidden');
        item.classList.remove('visible');
      }
    });
  });
});

/* ── Contact form mock-submit ── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('ct-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('ct-submit-btn');
    btn.disabled = true;
    btn.querySelector('.ct-submit-text').textContent = 'Sending…';

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('visible');
    }, 1200);
  });
}

/* ── Nav active highlight on scroll (index only) ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if (sections.length && navLinks.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
}
