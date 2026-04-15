/**
 * main.js — portfolio interactivity
 *
 * 1. Sticky header: fades in once the hero h1 scrolls out of view
 * 2. Project accordion: animated expand/collapse for <details> categories
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Randomise photo grid ───────────────────────────────────────── */
const photoGrid = document.querySelector('.photo-grid');
if (photoGrid) {
  const figures = [...photoGrid.querySelectorAll('.photo-item')];
  // Fisher-Yates shuffle
  for (let i = figures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    photoGrid.appendChild(figures[j]);
    [figures[i], figures[j]] = [figures[j], figures[i]];
  }
}

/* ── Sticky header ──────────────────────────────────────────────── */
const header   = document.querySelector('.site-header');
const heroName = document.querySelector('.hero h1');

new IntersectionObserver(
  ([entry]) => header.classList.toggle('visible', !entry.isIntersecting),
  { threshold: 0 }
).observe(heroName);

/* ── Mobile: collapsible "About me" and "Work" panels ──────────── */
// No matchMedia guard — CSS handles the visual effect, JS just toggles the class.
// On desktop the collapse rules don't exist in CSS so toggling is a no-op visually.
document.querySelectorAll('.split-aside, .split-main').forEach(container => {
  container.querySelector('.column-title').addEventListener('click', () => {
    container.classList.toggle('collapsed');
  });
});

/* ── Active nav link ────────────────────────────────────────────── */
const navLinks  = document.querySelectorAll('.site-nav a[href^="#"]');
const sections  = [...navLinks]
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  },
  { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
);

sections.forEach(s => sectionObserver.observe(s));

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
