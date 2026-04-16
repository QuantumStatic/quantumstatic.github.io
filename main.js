/**
 * main.js — portfolio interactivity
 *
 * 1. Sticky header: fades in once the hero h1 scrolls out of view
 * 2. Project accordion: animated expand/collapse for <details> categories
 * 3. Photo grid: shuffle on each load, cap at 50 items
 * 4. Lightbox: click to enlarge on desktop, Escape / backdrop / × to close
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile      = window.matchMedia('(max-width: 600px)').matches;

/* ── Theme toggle ───────────────────────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* ── Photo grid: shuffle + cap at 50 ───────────────────────────── */
const photoGrid = document.querySelector('.photo-grid');
if (photoGrid) {
  const figures = [...photoGrid.querySelectorAll('.photo-item')];

  // Fisher-Yates shuffle
  for (let i = figures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    photoGrid.appendChild(figures[j]);
    [figures[i], figures[j]] = [figures[j], figures[i]];
  }

  // Hide everything beyond 50 — fresh random batch on every page load
  if (figures.length > 50) {
    [...photoGrid.querySelectorAll('.photo-item')].slice(50).forEach(f => {
      f.style.display = 'none';
    });
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
// CSS media query is the visual guard — JS just toggles the class.
// On desktop the collapse rules don't exist so this is a visual no-op.
document.querySelectorAll('.split-aside, .split-main').forEach(container => {
  container.querySelector('.column-title').addEventListener('click', () => {
    container.classList.toggle('collapsed');
  });
});

/* ── Active nav link ────────────────────────────────────────────── */
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = [...navLinks]
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

/* ── Lightbox (desktop only) ────────────────────────────────────── */
if (!isMobile) {
  // Build the lightbox DOM once
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('role', 'dialog');
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&#x2715;</button>
    <div class="lightbox-inner"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxInner = lightbox.querySelector('.lightbox-inner');
  const closeBtn      = lightbox.querySelector('.lightbox-close');

  function openLightbox(item) {
    lightboxInner.innerHTML = '';

    const img    = item.querySelector('img');
    const source = item.querySelector('video source');

    if (img) {
      const el = new Image();
      el.src       = img.src;
      el.className = 'lightbox-media';
      el.alt       = img.alt;
      lightboxInner.appendChild(el);
    } else if (source) {
      const el      = document.createElement('video');
      el.className  = 'lightbox-media';
      el.autoplay   = true;
      el.muted      = true;
      el.loop       = true;
      el.controls   = true;
      el.playsInline = true;
      const s    = document.createElement('source');
      s.src      = source.src;
      s.type     = 'video/mp4';
      el.appendChild(s);
      lightboxInner.appendChild(el);
    }

    // Caption: location + date if available
    const loc  = item.querySelector('.photo-location')?.textContent;
    const date = item.querySelector('.photo-date')?.textContent;
    if (loc || date) {
      const cap = document.createElement('p');
      cap.className   = 'lightbox-caption';
      cap.textContent = [loc, date].filter(Boolean).join(' · ');
      lightboxInner.appendChild(cap);
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Brief delay before clearing so fade-out plays
    setTimeout(() => { lightboxInner.innerHTML = ''; }, 200);
  }

  // Photo items: zoom cursor + click to open
  document.querySelectorAll('.photo-item').forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => openLightbox(item));
  });

  closeBtn.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

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

    isOpen ? collapsePanel(details, content) : expandPanel(details, content);
  });
});

function expandPanel(details, content) {
  details.open = true;
  const targetHeight = content.scrollHeight;
  content.style.height = '0';
  content.offsetHeight; // Force layout flush — do not remove
  content.style.height = targetHeight + 'px';
  content.addEventListener('transitionend', () => {
    content.style.height = '';
  }, { once: true });
}

function collapsePanel(details, content) {
  content.style.height = content.scrollHeight + 'px';
  content.offsetHeight; // Force layout flush — do not remove
  content.style.height = '0';
  content.addEventListener('transitionend', () => {
    details.open = false;
    content.style.height = '';
  }, { once: true });
}
