# UI First-Principles Design Skills

This package contains two standalone agent skills created from a page-by-page analysis of the uploaded 144-page *The UI/UX Playbook — Tips & Tricks for Exceptional Designs*.

## Skills

### 1. `desktop-ui-first-principles/`

Use for:

- desktop web apps,
- SaaS applications,
- admin panels,
- dashboards,
- productivity software,
- data-heavy tools,
- ecommerce/product detail screens,
- forms/settings,
- desktop responsive redesigns.

Main file: `desktop-ui-first-principles/SKILL.md`

### 2. `mobile-ui-first-principles/`

Use for:

- mobile applications,
- mobile web apps,
- iOS/Android-style flows,
- onboarding,
- commerce,
- forms,
- mobile navigation,
- touch-first productivity screens,
- mobile redesigns.

Main file: `mobile-ui-first-principles/SKILL.md`

## What each skill contains

Each skill folder includes:

- `SKILL.md` — executable design behavior, workflow, output contract, platform rules, anti-patterns, and QA checklist.
- `references/playbook-complete-rules.md` — complete operational translation of every design principle and bonus pattern in the source.
- `references/source-coverage.md` — page-by-page mapping for all 144 physical PDF pages.
- a platform-specific workflow template.

## First-principles approach

Both skills reason in this order:

1. user goal,
2. required information/actions,
3. interaction cost,
4. priority/hierarchy,
5. proximity/grouping,
6. layout/order,
7. alignment,
8. clarity/simplicity,
9. spacing/whitespace,
10. typography,
11. color/state semantics,
12. consistency,
13. visual cues,
14. depth/texture,
15. edge states,
16. platform ergonomics,
17. brand/polish.

This prevents “style-first” output in which cards, gradients, glass, radius, or shadows are chosen before the task is understood.

## Source vs derived rules

The source playbook is primarily a cross-platform UI-principles book. The skills therefore separate:

- **PLAYBOOK rules** — directly grounded in the uploaded source.
- **DERIVED platform rules** — desktop/mobile applications of the source principles, such as resizable desktop windows, keyboard behavior, mobile software-keyboard handling, and bottom-reach ergonomics.

This distinction avoids pretending the source says something it does not.

## Installation

Copy either skill directory into the skills directory used by your coding/design agent. The folder is self-contained and keeps the source-derived reference material inside `references/`.

## Recommended invocation

Examples:

- “Use the desktop UI first-principles skill to redesign this admin dashboard. Diagnose first, then propose the layout.”
- “Use the mobile UI first-principles skill to redesign this checkout flow for one-handed use and lower interaction cost.”
- “Audit this screen against every principle before changing its visual style.”
- “Create a design spec, component inventory, state matrix, and QA checklist before coding.”

## Completeness

`source-coverage.md` maps all physical PDF pages 1–144. Non-instructional pages such as the cover and promotional closing page are explicitly marked rather than silently skipped.

## Remediation Plan
- `remediation-plan.md` — Full 5-phase execution plan and diagnostic matrix for resolving application UI/UX friction based on these principles.

