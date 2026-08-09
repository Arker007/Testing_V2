# Ecommerce Agency UI Design System & Component Guidelines

## 1. Context and Goals

### Design Intent
Deliver a unified, high-contrast, token-driven user experience optimized for fast load times, WCAG 2.2 AA accessibility compliance, and high conversion across marketing sites, while preserving core brand Blue and Green highlights.

### Product & Audience Context
- **Product/Brand:** Ecommerce Agency
- **Surface:** Products & Recycled Materials Catalog / Marketing Site
- **Audience:** B2B buyers, supply-chain teams, and senior decision-makers browsing industrial pallets, lumber, and custom sections.

---

## 2. Design Tokens & Foundations

All UI elements must derive their sizing, layout, and styling directly from the semantic design tokens below.

### Typography
- **Primary Font Family:** `DM Sans`, `DM Sans Fallback`, sans-serif
- **Base Font Size:** `16px` (`font.size.base`)
- **Base Font Weight:** `400` (`font.weight.base`)
- **Base Line Height:** `24px` (`font.lineHeight.base`)

#### Typography Scale
| Token | Pixel Value | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| `font.size.xs` | `12px` | `16px` | Micro-labels, Category badges, Specs tag labels |
| `font.size.sm` | `14px` | `20px` | Secondary text, descriptions, small inputs |
| `font.size.md` | `16px` | `24px` | Body text, standard inputs, list item text |
| `font.size.lg` | `20px` | `28px` | Small headings, Card titles, sidebar section headers |
| `font.size.xl` | `36px` | `44px` | Main subsection headings, Product titles |
| `font.size.2xl` | `48px` | `56px` | Page hero subheaders, section banners |
| `font.size.3xl` | `60px` | `72px` | Large hero display headings |

### Spacing Scale
Our layout uses a linear rhythmic spacing system. Do not use random pixel offsets.
- `space.1` = `4px`
- `space.2` = `8px`
- `space.3` = `12px`
- `space.4` = `16px` (Default container padding, inner spacing)
- `space.5` = `20px`
- `space.6` = `24px` (Standard card-to-card gap)
- `space.7` = `32px` (Section outer spacing)
- `space.8` = `36px`

### Color Palette

#### Brand Highlights (Kept Intact)
- **Primary Navy Blue:** `#0B2F63` (`--color-navy`)
- **Navy Dark Background:** `#061C3D` (`--color-navy-dark`)
- **Accent Green (Fresh Lime):** `#98d12a` (`--color-brand` / `--color-surface-muted`)
- **Accent Green Dark (Hover):** `#7db018` (`--color-brand-dark`)

#### Ecommerce Agency Foundation Colors
- **Primary Text:** `#1a1e2a` (High-contrast dark charcoal)
- **Secondary Text (On Dark backgrounds):** `oklab(0.999994 0.0000455677 0.0000200868 / 0.7)` (Translucent cool white)
- **Tertiary Text / White:** `#ffffff`
- **Inverse Text:** `oklab(0.999994 0.0000455677 0.0000200868 / 0.6)`
- **Base Surface:** `#000000` (Deep black overlay context)
- **Raised Surface:** `oklab(0.999994 0.0000455678 0.0000200868 / 0.85)`
- **Strong Neutral/Grey Offset:** `#edf1f2` (Light cool grey for card offsets, subtle container boundaries)

### Border Radius
- `radius.xs` = `8px` (Standard card corners, buttons, inputs)
- `radius.sm` = `33554400px` (Infinite pill shape for category select chips, active status tags)

### Motion & Animations
- `motion.duration.instant` = `200ms` (Simple hover/active fades, icon transitions)
- `motion.duration.fast` = `300ms` (Cubic-bezier modal entry, sidebar drawer slide-outs, cards transform)
- **Card hover easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-smooth springing ease-out)

---

## 3. Component-Level Rules

All interactive elements must respond dynamically to pointer, touch, and keyboard events, adhering strictly to state behaviors.

### Component Density Overview
- **Links:** 239 instances across site (navigation, breadcrumbs, footers)
- **Buttons:** 17 instances (primary CTA, filter controls, triggers)
- **Lists:** 4 instances (specifications, grid systems, query results)
- **Inputs:** 3 instances (search bar, filter slider, contact form fields)
- **Navigation bars:** 2 instances (top desktop nav, mobile footer bar)

---

### Component A: Product Grid Card (`.gridCard`)

#### Anatomy
- Rounded container (`radius.xs = 8px`), light cool border (`#E2E8F0`), standard spacing padding (`space.5 = 20px`).
- Image container with aspect ratio `4:3`, rounded corners, and soft grey background (`#F8FAFC`).
- Title heading (`font.size.lg = 20px`), primary color text (`#1a1e2a`).
- Specs grid (`space.2 = 8px` gap) featuring labels in muted grey and bolded primary text.
- Action Buttons (Quick Specs trigger, View details).

#### Visual States
- **Default:** Clean off-white background, soft shadow (`box-shadow: 0 4px 20px -2px rgba(11, 47, 99, 0.03), 0 2px 4px -1px rgba(11, 47, 99, 0.02)`), border `#E2E8F0`.
- **Hover:** Subtle vertical rise (`translateY(-4px)`), expanded smooth shadow (`0 20px 40px -4px rgba(11, 47, 99, 0.08)`), border accentuation (`--color-surface-muted` Green).
- **Focus-Visible:** Outlined focus state on children interactive components with 2px offset (`outline: 2px solid #98d12a`).
- **Active / Click:** Subtle scale down (`scale(0.98)`) on immediate mouse-down.
- **Loading:** Render `.skeletonCard` placeholder with continuous shimmer animation.

---

### Component B: Custom Dropdown Select (`.customSelectTrigger` & `.customSelectDropdown`)

#### Anatomy
- Clickable container trigger (`padding: 0.625rem 0.85rem`), bolded typography, trailing chevron icon.
- Absoluted list overlay (`top: calc(100% + 4px)`), z-index `100`, containing interactive select options.

#### Visual States
- **Default:** White background, thin grey border `#CBD5E1`, text `#1a1e2a`.
- **Hover:** Subtle background shift (`#F8FAFC`), border matching `#1a1e2a`.
- **Focus-Visible:** Outline offset ring in accent Green (`0 0 0 3px rgba(56, 208, 89, 0.2)`).
- **Active / Expanded:** Chevron icon rotates 180 degrees; dropdown list smoothly fades in.
- **Disabled:** 40% opacity, pointer-events none, grey background `#E2E8F0`.
- **Selected Option:** Translucent green background highlight (`rgba(56, 208, 89, 0.15)`), font-weight `700` bold.

---

### Component C: Category Select Chip (`.mobileChip`)

#### Anatomy
- Infinite rounded pill shape (`radius.sm`), horizontal scroll wrapper on smaller devices, spacing padding.

#### Visual States
- **Default:** Light gray background `#F1F5F9`, dark text `#1a1e2a`.
- **Hover:** Darkening shift to `#E2E8F0`.
- **Active / Active Category:** Bold brand navy `#0B2F63` background, accent Green text `#98d12a` for ultimate contrast.

---

## 4. Accessibility Requirements & Acceptance Criteria

We target **WCAG 2.2 AA** compatibility on all marketing and product features.

### Focus Indicators
- **Rule:** Never hide native focus outlines without introducing high-contrast custom outline rings.
- **Pass Check:** Pressing `Tab` focuses interactive elements sequentially, adding a visible, sharp 2px green outline (`#98d12a`) with at least a 3px boundary offset.
- **Fail Check:** Selecting interactive chips or buttons leaves no outline indicator, hiding the currently focused cursor from keyboard users.

### Contrast Constraints
- **Rule:** Body copy and specification lists must maintain a contrast ratio of at least **4.5:1** against backgrounds.
- **Pass Check:** `#1a1e2a` on `#FFFFFF` gives a contrast ratio of **15.2:1** (Passes AAA).
- **Fail Check:** Using grey text on a light blue or light green card backdrop that falls below the 4.5:1 minimum threshold.

### Interactive Target Sizing
- **Rule:** Touch targets must meet the minimum size requirement of **44x44px** on touchscreens to accommodate touch gestures.
- **Pass Check:** List detail buttons and quick category select chips occupy at least 44px in vertical height on viewports below 768px.

---

## 5. Content & Writing Tone Standards

### Tone Principles
- **Concise:** Say exactly what is needed without fluff.
- **Confident:** Highlight premium durability and engineering metrics.
- **Implementation-Focused:** Supply precise load specifications (e.g., "Static Load: 5,000 kg", "Ankleshwar Manufactured").

### Standards Examples
- **✅ GOOD (Concise & Clear):** "Manufactured in Ankleshwar with 100% recycled industrial polymers. Tailored for heavy warehouse logistics."
- **❌ BAD (Wordy & Ambiguous):** "Supercharge your business with our amazing, next-level sustainable crates that are incredibly green and awesome!"

---

## 6. Anti-Patterns & Prohibited Implementations

To ensure high visual quality and maintain brand guidelines, developers are forbidden from writing code that produces these patterns:

*   **No Purple-to-Blue Gradients:** Avoid adding arbitrary purple, neon, or gradient text overlays. Keep branding strictly focused on Navy Blue `#0B2F63` and Fresh Lime `#98d12a`.
*   **No Nested Cards:** Do not place border-outlined cards inside other bordered cards. Use white space, dividers, or subtle grey offsets (`#edf1f2`) to segment information instead.
*   **No Missing Target Labels:** Interactive buttons must never use bare icons (e.g., chevron/search) without an accompanying `aria-label` or hidden screen-reader descriptive text.

---

## 7. QA Checklist for Implementations

Before marking any styling or layout ticket as ready for production:

- [ ] **Typography Check:** Is the body font verified as `DM Sans` with standard line-heights?
- [ ] **Contrast Verification:** Do all labels, parameters, and specification lists pass the WCAG 2.2 AA 4.5:1 contrast checker?
- [ ] **Radius Rules:** Do standard card containers and action buttons carry exactly `8px` corner radius?
- [ ] **State Coverage:** Have all interactive elements been tested under mouse hover, active clicks, and keyboard tab focus?
- [ ] **No HMR WebSocket Errors:** Verified that standard layout displays correctly in the embedded workspace preview without flickering.
- [ ] **Build Validation:** Run `npm run build` and `npm run lint` cleanly to ensure zero terminal warnings.
