# UI First-Principles Remediation Plan

This document outlines the phased remediation plan established following an audit against `ui_first_principles_skills/` playbooks and review rubrics.

---

## 1. Audit Diagnostic Summary

| Category | Score (0-3) | Key Findings |
|---|:---:|---|
| **1. User Goal & Next Step** | `2/3` | Primary goals (quoting, searching bearings, finding technical dimensions) are clear, but secondary pages feature competing CTAs. |
| **2. Interaction Cost** | `1/3` | Redundant scrolling on mobile before viewing specs; dual search & category chip rows compete for attention; modal dialogs require unnecessary typing for catalog items. |
| **3. Visual Hierarchy** | `2/3` | Primary vs. secondary action buttons occasionally compete in contrast; some headings retain "hero eyebrow" decoration and dual-color split titles. |
| **4. Proximity & Grouping** | `2/3` | Form labels and input fields have inconsistent vertical gaps; spec tables need strict grouping between commercial metadata and physical mechanical dimensions. |
| **5. Layout & Order** | `2/3` | Product detail view order has been streamlined, but catalog filter drawers and contact sub-sections still exhibit desktop-biased stacking on small viewports. |
| **6. Alignment & Rhythm** | `2/3` | Metric numbers and table data cells lack strict tabular numeric alignment (`tabular-nums`); horizontal grid columns occasionally lack consistent baseline alignment across uneven card heights. |
| **7. Contrast & Accessibility** | `2/3` | Muted subtitle text on light surfaces needs minimum 4.5:1 WCAG AA compliance; input borders need clearer focus ring contrast. |
| **8. Simplicity & Anti-Slop** | `1/3` | Lingering decorative elements: horizontal eyebrow accent lines, decorative badge glow shadows, and repetitive generic SaaS phrases. |
| **9. Whitespace & Containers** | `2/3` | Some nested card patterns (cards inside cards) can be flattened using subtle dividing rules and negative space; outer-to-inner padding math needs systematic enforcement. |
| **10. Typography & Measure** | `2/3` | Body copy measure needs strict constraint between 45–75 characters (`ch`); ensure line heights adhere strictly to 1.5–1.7. |
| **11. Color & State Semantics** | `2/3` | Brand green and navy accents are well defined, but hover/active states across subtle links and ghost buttons need explicit, tactile multi-signal feedback. |
| **12. Platform Ergonomics** | `2/3` | Mobile bottom navigation and sticky quote triggers are now active, but touch targets on pagination, quick-filters, and accordion headers must guarantee minimum 44px tap targets. |
| **13. Inputs & Forms** | `2/3` | Form inputs need explicit 16px font sizes to prevent iOS Safari auto-zoom; inline validation messages should appear immediately adjacent to invalid inputs. |
| **14. Empty & Error States** | `1/3` | Product search with zero results needs actionable recovery paths (clear specific filters, search suggestions, or direct RFQ fallback). |

---

## 2. Phased Implementation Plan

```
Goal & Interaction Cost ──> Hierarchy & Clarity ──> Grouping & Layout ──> Inputs & Ergonomics ──> States & Polish
```

---

### Phase 1: Flow, Goal Obviousness & Interaction Cost Reduction
* **1.1 Zero-Friction RFQ / Inquiry Flow**:
  * Auto-populate product SKU, brand, and category when launching the Inquiry Modal directly from product cards or detail views.
  * Reduce required input fields to the essential minimum (Name, Email/Phone, Quantity, Delivery Location/Notes).
* **1.2 Catalog Quick-Filter Streamlining**:
  * Consolidate mobile category pills and desktop sidebar filters to prevent conflicting active states.
  * Implement instant 1-tap "Clear All" with active filter counters.
* **1.3 Mobile Thumb-Zone Actions**:
  * Ensure the mobile persistent action bar on product detail pages directly handles both WhatsApp direct inquiry and the official RFP modal without opening intermediary redirects.

---

### Phase 2: Visual Hierarchy, Typography & Anti-Slop Refinement
* **2.1 Eradicate "AI Slop" Patterns**:
  * Remove decorative eyebrow lines (`formEyebrowLine`), split-color heading words, and unnecessary decorative badges.
  * Replace marketing slogans with clear, factual engineering statements (e.g., replace *"We're Here to Help"* with *"Direct Engineering & Sales Desk"*).
* **2.2 Typography & Alignment Scale**:
  * Enforce strict typographic ratio (Major Second / Minor Third) with pairing between Display headings and clean neutral body copy.
  * Apply `font-feature-settings: 'tnum'` (`tabular-nums`) to all technical dimensions, tolerances, SKUs, and pricing displays for vertical optical alignment.
  * Constrain all descriptive paragraphs to `max-w-prose` (45–75ch) for baseline readability.

---

### Phase 3: Proximity, Whitespace & Structural Container Flattening
* **3.1 Container & Padding Math**:
  * Ensure outer container padding systematically exceeds internal child padding ($P_{\text{outer}} \ge P_{\text{inner}}$).
  * Enforce nested corner radius formula: $R_{\text{inner}} = R_{\text{outer}} - \text{Padding}$.
* **3.2 Flatten Nested Cards**:
  * Eliminate "card-in-card" nesting across technical specification tabs, replacing nested sub-cards with clean horizontal borders, subtle backgrounds, and generous whitespace.
* **3.3 Grid Height Regularization**:
  * Ensure product cards in grid views maintain uniform button baselines using flexbox `mt-auto` anchoring regardless of varying title or spec length.

---

### Phase 4: Input Mechanics, Touch Targets & Platform Ergonomics
* **4.1 Mobile Safari Viewport Stability**:
  * Ensure every `<input>`, `<select>`, and `<textarea>` has `font-size: 1rem` (16px) minimum on mobile viewports to prevent iOS viewport auto-zooming.
* **4.2 Touch Target Ergonomics**:
  * Ensure all clickable elements (accordion toggles, pagination numbers, filter checkboxes, modal close buttons) satisfy the 44×44px minimum touch target.
* **4.3 Multi-Signal Feedback & States**:
  * Add distinct `:hover`, `:active` (scale-down 0.98), and `:focus-visible` ring indicators across all buttons and interactive controls.

---

### Phase 5: Edge States, Empty Search Handling & Verification
* **5.1 Zero-Result Product Search Fallback**:
  * Replace bare "No products found" text with a helpful guided state:
    * Showing which filter combinations yielded zero results.
    * 1-click "Reset Filters" button.
    * "Can't find your exact spec? Request Custom Machining" direct CTA.
* **5.2 Form Feedback & Success States**:
  * Provide multi-signal confirmation (icon + concise message + reference ID) upon inquiry submission with automatic reset capability.
* **5.3 Automated Verification**:
  * Run `lint_applet` and `compile_applet` across all updated feature packages to guarantee zero regressions.
