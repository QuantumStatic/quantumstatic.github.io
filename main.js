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

const headerObserver = new IntersectionObserver(
  ([entry]) => header.classList.toggle('visible', !entry.isIntersecting),
  { threshold: 0 }
);

headerObserver.observe(heroName);

/* ── Project accordion ──────────────────────────────────────────── */
document.querySelectorAll('.project-category').forEach(details => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.category-projects');

  // Sync aria-expanded with the details open state on init
  summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');

  summary.addEventListener('click', e => {
    e.preventDefault();

    const isOpen = details.open;

    // Update ARIA before the visual change
    summary.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

    if (reducedMotion) {
      // Respect user preference — skip animation entirely
      details.toggleAttribute('open');
      return;
    }

    if (isOpen) {
      collapse(details, content);
    } else {
      expand(details, content);
    }
  });
});

/**
 * Animates the content panel open.
 * Sets open immediately so scrollHeight is measurable, then
 * transitions from 0 to the measured height.
 *
 * The double rAF is required: the first frame commits height:'0',
 * the second frame starts the transition to the target height.
 * Without it, the browser batches both writes and skips the transition.
 */
function expand(details, content) {
  details.setAttribute('open', '');
  const targetHeight = content.scrollHeight;

  content.style.height = '0';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      content.style.height = targetHeight + 'px';
    });
  });

  content.addEventListener('transitionend', () => {
    content.style.height = ''; // Let CSS take over (auto)
  }, { once: true });
}

/**
 * Animates the content panel closed.
 * Fixes the current height explicitly so the transition has a
 * defined start point, then transitions to 0 before removing open.
 */
function collapse(details, content) {
  content.style.height = content.scrollHeight + 'px';

  requestAnimationFrame(() => {
    content.style.height = '0';
  });

  content.addEventListener('transitionend', () => {
    details.removeAttribute('open');
    content.style.height = ''; // Clean up inline style
  }, { once: true });
}
