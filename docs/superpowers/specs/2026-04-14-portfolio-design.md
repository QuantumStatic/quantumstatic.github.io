# Portfolio Website Design — quantumstatic.github.io

**Date:** 2026-04-14  
**Status:** Approved

---

## Overview

A single-page personal portfolio for Utkarsh Jain, Machine Learning Engineer. The goal is a simple, sophisticated, and confident presence — not a job-hunting page, but a professional statement site. Light and clean aesthetic, no frameworks, no build tools. Pure HTML + CSS deployable directly to GitHub Pages.

---

## Visual Design

| Property | Value |
|---|---|
| Background | `#FAFAFA` |
| Text | `#1A1A1A` |
| Accent | `#2563EB` (used sparingly — links, subtle highlights) |
| Font | `Inter` via Google Fonts |
| Max content width | `680px`, centered |
| Layout | Single scrolling column, generous whitespace |

No navigation bar. No animations. No JavaScript. A sticky minimal header with just the name acts as a home anchor.

---

## File Structure

```
index.html
style.css
```

That's it. No build step, no dependencies beyond a Google Fonts import.

---

## Page Sections (top to bottom)

### 1. Hero
- Name: **Utkarsh Jain** (large, prominent)
- Title: **Machine Learning Engineer**
- Tagline: *"I build production AI systems that work."*

### 2. About
Three sentences, tight and personal:
- Who he is and what he focuses on (LLMs, agentic systems, RAG)
- What makes his work distinctive (ships real enterprise-grade systems, not side projects)
- Life outside work (badminton, boxing, cycling)

Tone: confident, first-person, not desperate. No "open to opportunities" language.

### 3. Experience
Three roles only — curated for signal, not completeness:

**ArataAI — Machine Learning Engineer** *(Oct 2025 – Present, New York)*
- Built multimodal deep search agent using MCPs and reciprocal rank fusion
- Shipped report-writing agent generating 70+ page documents at 92% precision/recall
- Deployed agentic workflows on Temporal + Kubernetes in production

**Fileread — Machine Learning Engineer** *(Feb 2025 – Oct 2025, New York)*
- Built self-healing code agent with near-zero hallucinations using LangGraph
- Engineered Matter Intelligence: cut legal document review from weeks to hours via context engineering
- Built extraction engine converting unstructured legal documents into structured data with custom schemas

**HSBC — Industrial Placement Trainee** *(Jul 2021 – Mar 2022, Hong Kong)*
- Automated APAC portfolio management workflows in Python, saving ~200 man-hours
- Revamped legacy RPG API with Node.js; load tested with JMeter

*Note: ArataAI is described as "Stealth Startup" on the site — Utkarsh is currently employed there and the role should not draw attention to a job search.*

### 4. Skills
Three clean lines, no tag clouds or icon grids:
- **Languages** — Python, C++, Java, TypeScript
- **AI / ML** — LangGraph, MCP, RAG, PyTorch, TensorFlow, Multimodal Pipelines
- **Cloud & Infra** — AWS, Temporal, Kubernetes

### 5. Contact
Centered, minimal footer area:
- Email: utkarshworkemail@gmail.com
- LinkedIn: linkedin.com/in/quantumstatic
- GitHub: github.com/quantumstatic

---

## Content Omitted (intentionally)

- Education — implicit from experience, doesn't add signal here
- Awards & honors — not the right vibe for this audience
- Older roles (NYU grader, CityU research) — too junior for the positioning
- Projects section — no recent standalone projects to show; will add later

---

## Tone & Positioning

- Confident, employed professional — not job hunting visibly
- Lead with impact and output, not years of experience
- Copy should feel written by a person, not optimized for ATS
- No "I'm looking for my next opportunity" language anywhere

---

## Constraints

- No JavaScript
- No CSS frameworks (Tailwind, Bootstrap, etc.)
- No build tools
- Must work by opening `index.html` directly in a browser
- Must render correctly when served by GitHub Pages
- Mobile responsive (simple single-column stacks gracefully on small screens)
