---
domain: architecture-refactoring
scope: styling-and-design-system
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 09. Styling & Design System Architecture Plan

## 1. Hybrid Styling Architecture

The project employs a deliberate **Dual-Engine Styling Architecture**:
1. **Tailwind CSS v4 (`@tailwindcss/vite`)**: Used for atomic layout utility classes (`flex`, `grid`, `gap-4`, `p-6`, `text-sm`, `hidden md:flex`).
2. **CSS Modules (`*.module.css`)**: Used for scoped, complex component layouts, state transitions, pseudo-elements, and keyframe animations.

This hybrid model eliminates CSS specificity collisions while preserving rapid layout assembly and zero global class pollution.

---

## 2. Core Token Architecture (`shared/styles/core/`)

All semantic colors, surface shades, borders, and shadows are defined through CSS Custom Properties rooted in `tokens.css`:

```text
apps/web/src/shared/styles/
├── index.css                     # Master aggregator importing all core stylesheets
└── core/
    ├── tokens.css                # Color palettes, typography scales, radius, transitions
    ├── dark-theme.css            # [data-theme="dark"] token variable overrides
    ├── base-reset.css            # Box-sizing, font-smoothing, scroll-behavior
    ├── layout-nav.css            # Navbar, footer, drawer structural utilities
    ├── surfaces-cards.css        # Card backgrounds, borders, and hover elevations
    ├── buttons-forms.css         # Form input borders, button states, focus rings
    ├── modals-overlays.css       # Dialog backdrops, blur filters, drawer slides
    ├── page-hero.css             # Page hero band styling
    └── utilities.css             # Text truncation, scrollbar styling, aspect ratios
```

---

## 3. Resolving Styling Tech Debt & Anomalies

### Defect 1: Orphaned Stylesheet in `pages/`
* **File**: `apps/web/src/pages/section-styles/home-hero-redesign.css`
* **Defect**: CSS stored in the route pages directory.
* **Remediation**: Consolidate into `apps/web/src/features/home/styles/home-hero.module.css`. Delete the `section-styles/` folder.

### Defect 2: Hardcoded Hex Codes in JSX
* **Defect**: Several components retain inline `style={{ backgroundColor: "#1e293b" }}` or hex strings in className attributes.
* **Remediation**: Replace with semantic design token classes (`bg-[var(--surface-raised)]`, `text-[var(--text-muted)]`).

---

## 4. UI/UX First Principles Alignment

In compliance with `docs/design/first-principles-ui-ux.md`:
* **Mathematical Typography Scaling**: Body copy minimum 16px; headings step by 1.25+ ratio. Max line width 45–75 characters (`ch`).
* **Soft Tinted Shadows**: Shadows incorporate a minute tint of the background neutral rather than pure harsh black (`box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.08)`).
* **Multi-Signal Feedback**: Interactive states (buttons, links, cards) provide cursor, border, and elevation changes simultaneously.
* **Dark Theme Strictness**: Avoid pure black (`#000000`); use deep slate neutrals (`#090d16`, `#0f172a`) with `<12%` brightness delta between container layers.
