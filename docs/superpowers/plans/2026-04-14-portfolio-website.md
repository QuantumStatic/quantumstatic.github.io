# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal portfolio for Utkarsh Jain as a static `index.html` + `style.css` deployable directly to GitHub Pages.

**Architecture:** Two files only — `index.html` holds all markup, `style.css` holds all styles. No JavaScript, no build tools, no frameworks. Google Fonts (Inter) loaded via `<link>` tag. Sections: sticky header, hero, about, experience, skills, contact.

**Tech Stack:** HTML5, CSS3, Google Fonts (Inter). Deployed via GitHub Pages.

---

## File Map

| File | Role |
|---|---|
| `index.html` | All page markup — document head, sticky header, hero, about, experience, skills, contact footer |
| `style.css` | All styles — CSS variables, reset, layout, typography, section styles, mobile responsive |

---

## Task 1: CSS foundation

**Files:**
- Create: `style.css`

- [ ] **Step 1: Create `style.css` with CSS reset, custom properties, and base body styles**

```css
/* ── Reset ─────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── Tokens ─────────────────────────────────────────── */
:root {
  --bg:         #FAFAFA;
  --text:       #1A1A1A;
  --muted:      #6B7280;
  --accent:     #2563EB;
  --border:     #E5E7EB;
  --max-width:  680px;
  --font:       'Inter', system-ui, sans-serif;
}

/* ── Base ───────────────────────────────────────────── */
html {
  scroll-behavior: smooth;
}

body {
  background:              var(--bg);
  color:                   var(--text);
  font-family:             var(--font);
  font-size:               16px;
  line-height:             1.65;
  -webkit-font-smoothing:  antialiased;
}

/* ── Site header ────────────────────────────────────── */
.site-header {
  position:    sticky;
  top:         0;
  background:  var(--bg);
  border-bottom: 1px solid var(--border);
  padding:     1rem 2rem;
  z-index:     10;
}

.site-name {
  font-size:       0.875rem;
  font-weight:     600;
  color:           var(--text);
  text-decoration: none;
  letter-spacing:  -0.01em;
}

.site-name:hover { color: var(--accent); }

/* ── Container ──────────────────────────────────────── */
.container {
  max-width: var(--max-width);
  margin:    0 auto;
  padding:   0 2rem;
}

/* ── Section label ──────────────────────────────────── */
.section-label {
  font-size:      0.7rem;
  font-weight:    600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color:          var(--muted);
  margin-bottom:  1.5rem;
}

/* ── Hero ───────────────────────────────────────────── */
.hero {
  padding: 5rem 0 3rem;
}

.hero h1 {
  font-size:     2.75rem;
  font-weight:   700;
  letter-spacing: -0.03em;
  line-height:   1.1;
  margin-bottom: 0.5rem;
}

.hero .title {
  font-size:     1.125rem;
  color:         var(--muted);
  font-weight:   400;
  margin-bottom: 1rem;
}

.hero .tagline {
  font-size:   1.125rem;
  font-weight: 500;
  color:       var(--text);
}

/* ── About ──────────────────────────────────────────── */
.about {
  padding:    3rem 0;
  border-top: 1px solid var(--border);
}

.about p {
  font-size:   1rem;
  line-height: 1.75;
}

/* ── Experience ─────────────────────────────────────── */
.experience {
  padding:    3rem 0;
  border-top: 1px solid var(--border);
}

.role { margin-bottom: 2.5rem; }
.role:last-child { margin-bottom: 0; }

.role-header {
  display:         flex;
  justify-content: space-between;
  align-items:     baseline;
  margin-bottom:   0.15rem;
}

.role-company {
  font-weight: 600;
  font-size:   1rem;
}

.role-period {
  font-size: 0.8rem;
  color:     var(--muted);
}

.role-title {
  font-size:     0.875rem;
  color:         var(--muted);
  margin-bottom: 0.75rem;
}

.role ul {
  list-style: none;
  padding:    0;
}

.role ul li {
  font-size:     0.9375rem;
  line-height:   1.65;
  padding-left:  1rem;
  position:      relative;
  margin-bottom: 0.4rem;
}

.role ul li::before {
  content:  '—';
  position: absolute;
  left:     0;
  color:    var(--muted);
  font-size: 0.8rem;
}

/* ── Skills ─────────────────────────────────────────── */
.skills {
  padding:    3rem 0;
  border-top: 1px solid var(--border);
}

.skill-row {
  display:       flex;
  gap:           1.5rem;
  padding:       0.6rem 0;
  border-bottom: 1px solid var(--border);
  font-size:     0.9375rem;
}

.skill-row:last-child { border-bottom: none; }

.skill-label {
  width:      120px;
  flex-shrink: 0;
  color:      var(--muted);
  font-size:  0.875rem;
}

/* ── Contact ────────────────────────────────────────── */
.contact {
  padding:    3rem 0 4rem;
  border-top: 1px solid var(--border);
  display:    flex;
  align-items: center;
  gap:        0.75rem;
}

.contact a {
  font-size:       0.9375rem;
  color:           var(--text);
  text-decoration: none;
  font-weight:     500;
}

.contact a:hover { color: var(--accent); }

.dot {
  color:       var(--border);
  user-select: none;
}

/* ── Mobile ─────────────────────────────────────────── */
@media (max-width: 600px) {
  .container  { padding: 0 1.25rem; }

  .hero       { padding: 3rem 0 2rem; }
  .hero h1    { font-size: 2rem; }

  .role-header {
    flex-direction: column;
    gap:            0.1rem;
  }

  .skill-row {
    flex-direction: column;
    gap:            0.25rem;
  }

  .skill-label { width: auto; }
}
```

- [ ] **Step 2: Verify file saved**

```bash
ls -lh style.css
```
Expected: file exists, non-zero size.

---

## Task 2: HTML scaffold + Hero section

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with document head, Google Fonts, sticky header, and hero section**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Utkarsh Jain — Machine Learning Engineer</title>
  <meta name="description" content="Utkarsh Jain — Machine Learning Engineer building production agentic systems in New York." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <header class="site-header">
    <a href="#" class="site-name">Utkarsh Jain</a>
  </header>

  <main class="container">

    <!-- Hero -->
    <section class="hero">
      <h1>Utkarsh Jain</h1>
      <p class="title">Machine Learning Engineer</p>
      <p class="tagline">I build production AI systems that work.</p>
    </section>

  </main>

</body>
</html>
```

- [ ] **Step 2: Open `index.html` in a browser and verify**

Open the file directly (File → Open, or `open index.html` on macOS).

Expected:
- Inter font loads (text is clean and modern, not system serif)
- Name "Utkarsh Jain" appears large and bold
- "Machine Learning Engineer" below in muted grey
- Tagline below that in dark text
- Sticky header with name at top
- Background is near-white, not pure white

- [ ] **Step 3: Commit scaffold**

```bash
git add index.html style.css
git commit -m "feat: scaffold portfolio site with hero section"
```

---

## Task 3: About section

**Files:**
- Modify: `index.html` — add about section after hero, inside `<main>`

- [ ] **Step 1: Add the About section after the closing `</section>` of hero**

Replace the closing `</main>` tag with:

```html
    <!-- About -->
    <section class="about">
      <p>I'm an MLE based in Brooklyn, NY, focused on LLMs, agentic systems, and RAG pipelines. I've shipped enterprise-grade AI in production — multimodal agents, document intelligence, and self-healing code systems — at startups moving fast. Outside of work, you'll find me on a badminton court, boxing, or on a bike.</p>
    </section>

  </main>
```

- [ ] **Step 2: Verify in browser**

Refresh `index.html`.

Expected:
- A horizontal rule (border-top) divides hero from about
- Paragraph text is readable, slightly larger line-height than body text
- No section heading — just the paragraph (by design)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add about section"
```

---

## Task 4: Experience section

**Files:**
- Modify: `index.html` — add experience section after about, inside `<main>`

- [ ] **Step 1: Add the Experience section**

Replace the closing `</main>` tag with:

```html
    <!-- Experience -->
    <section class="experience">
      <h2 class="section-label">Experience</h2>

      <div class="role">
        <div class="role-header">
          <span class="role-company">Stealth Startup</span>
          <span class="role-period">Oct 2025 – Present</span>
        </div>
        <div class="role-title">Machine Learning Engineer &middot; New York, NY</div>
        <ul>
          <li>Built multimodal deep search agent using MCPs and reciprocal rank fusion to intelligently query client databases</li>
          <li>Shipped report-writing agent generating 70+ page documents at 92% precision and recall</li>
          <li>Deployed agentic workflows on Temporal and Kubernetes in production</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-header">
          <span class="role-company">Fileread</span>
          <span class="role-period">Feb 2025 – Oct 2025</span>
        </div>
        <div class="role-title">Machine Learning Engineer &middot; New York, NY</div>
        <ul>
          <li>Built a self-healing code agent with near-zero hallucinations using LangGraph</li>
          <li>Engineered Matter Intelligence — a context engineering feature that reduced legal document review from weeks to hours</li>
          <li>Built extraction engine converting unstructured legal documents into structured data with custom schemas</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-header">
          <span class="role-company">HSBC</span>
          <span class="role-period">Jul 2021 – Mar 2022</span>
        </div>
        <div class="role-title">Industrial Placement Trainee &middot; Hong Kong</div>
        <ul>
          <li>Automated APAC portfolio management workflows in Python, saving ~200 man-hours</li>
          <li>Revamped a legacy RPG API with Node.js and performed network load testing with JMeter</li>
        </ul>
      </div>
    </section>

  </main>
```

- [ ] **Step 2: Verify in browser**

Refresh `index.html`.

Expected:
- "EXPERIENCE" label appears in small caps, muted
- Three roles, each with company name + right-aligned date range
- Role title in muted grey below the company line
- Bullet points using em-dash (`—`) prefix, not browser default bullets
- Roles are separated by whitespace, not dividers

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add experience section"
```

---

## Task 5: Skills section

**Files:**
- Modify: `index.html` — add skills section after experience, inside `<main>`

- [ ] **Step 1: Add the Skills section**

Replace the closing `</main>` tag with:

```html
    <!-- Skills -->
    <section class="skills">
      <h2 class="section-label">Skills</h2>
      <div class="skill-row">
        <span class="skill-label">Languages</span>
        <span class="skill-value">Python, C++, Java, TypeScript</span>
      </div>
      <div class="skill-row">
        <span class="skill-label">AI / ML</span>
        <span class="skill-value">LangGraph, MCP, RAG, PyTorch, TensorFlow, Multimodal Pipelines</span>
      </div>
      <div class="skill-row">
        <span class="skill-label">Cloud &amp; Infra</span>
        <span class="skill-value">AWS, Temporal, Kubernetes</span>
      </div>
    </section>

  </main>
```

- [ ] **Step 2: Verify in browser**

Refresh `index.html`.

Expected:
- "SKILLS" label in small caps, muted
- Three rows: label on the left (muted, fixed width), value on the right (dark)
- Thin border between rows, none after the last row
- Clean table-like layout without an actual `<table>`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add skills section"
```

---

## Task 6: Contact footer

**Files:**
- Modify: `index.html` — add contact footer as the last element inside `<main>`

- [ ] **Step 1: Add the Contact section**

Replace the closing `</main>` tag with:

```html
    <!-- Contact -->
    <footer class="contact">
      <a href="mailto:utkarshworkemail@gmail.com">Email</a>
      <span class="dot">&middot;</span>
      <a href="https://linkedin.com/in/quantumstatic" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span class="dot">&middot;</span>
      <a href="https://github.com/quantumstatic" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>

  </main>
```

- [ ] **Step 2: Verify in browser**

Refresh `index.html`.

Expected:
- Three links separated by muted dot separators: Email · LinkedIn · GitHub
- Links are dark text, turn accent blue on hover
- Generous padding below the footer (bottom of page doesn't feel cramped)
- Clicking Email opens mail client
- Clicking LinkedIn/GitHub opens in new tab (target="_blank")

- [ ] **Step 3: Verify mobile layout**

Open browser DevTools → toggle device toolbar → set width to 375px.

Expected:
- All sections stack cleanly in a single column
- Hero text scales down (2rem instead of 2.75rem)
- Role header (company + date) stacks vertically on narrow screens
- Skills rows stack vertically (label above value)
- Contact links remain on one line (they're short enough)
- No horizontal scrollbar

- [ ] **Step 4: Final commit**

```bash
git add index.html
git commit -m "feat: add contact footer — site complete"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Single HTML + CSS file, no build tools | Task 1 & 2 |
| Inter font via Google Fonts | Task 2, Step 1 (head tag) |
| Background `#FAFAFA`, text `#1A1A1A`, accent `#2563EB` | Task 1, Step 1 (CSS variables) |
| Max-width 680px centered | Task 1 (`.container`) |
| Sticky header with name | Task 2 |
| Hero: name, title, tagline | Task 2 |
| About: 3-sentence paragraph | Task 3 |
| Experience: 3 roles, 2-3 bullets each | Task 4 |
| ArataAI listed as "Stealth Startup" | Task 4 |
| Skills: 3 rows (Languages, AI/ML, Cloud & Infra) | Task 5 |
| Contact: Email · LinkedIn · GitHub | Task 6 |
| Mobile responsive | Task 6, Step 3 |
| GitHub Pages compatible (no server needed) | Entire plan — no JS, no build |

All spec requirements covered. No placeholders. No TBDs.
