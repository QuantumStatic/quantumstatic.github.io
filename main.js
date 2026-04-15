/**
 * main.js — portfolio interactivity
 *
 * 1. Sticky header: fades in once the hero h1 scrolls out of view
 * 2. Project accordion: animated expand/collapse for <details> categories
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Sticky header ──────────────────────────────────────────────── */
const header   = document.querySelector('.site-header');
const heroName = document.querySelector('.hero h1');

new IntersectionObserver(
  ([entry]) => header.classList.toggle('visible', !entry.isIntersecting),
  { threshold: 0 }
).observe(heroName);

/* ── Project accordion ──────────────────────────────────────────── */
document.querySelectorAll('.project-category').forEach(details => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.category-projects');

  summary.setAttribute('aria-expanded', 'false');

  summary.addEventListener('click', e => {
    e.preventDefault();

    const isOpen = details.open;
    summary.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

    if (reducedMotion) {
      details.open = !isOpen;
      return;
    }

    isOpen ? collapse(details, content) : expand(details, content);
  });
});

/**
 * Animates the content panel open.
 *
 * Reading `content.offsetHeight` after setting height:'0' forces the
 * browser to flush pending style changes before we set the target height.
 * Without this flush, the browser batches both writes and skips the transition.
 */
function expand(details, content) {
  details.open = true;

  const targetHeight = content.scrollHeight;
  content.style.height = '0';
  content.offsetHeight; // Force layout flush — do not remove

  content.style.height = targetHeight + 'px';

  content.addEventListener('transitionend', () => {
    content.style.height = ''; // Return to natural height
  }, { once: true });
}

/**
 * Animates the content panel closed.
 *
 * Same flush trick: pin the current height explicitly, force a layout,
 * then transition to 0. Without the flush the two writes are batched
 * and the transition never starts — so transitionend never fires and
 * the panel stays open.
 */
function collapse(details, content) {
  content.style.height = content.scrollHeight + 'px';
  content.offsetHeight; // Force layout flush — do not remove

  content.style.height = '0';

  content.addEventListener('transitionend', () => {
    details.open = false;
    content.style.height = ''; // Clean up inline style
  }, { once: true });
}
