# Comprehensive Design System Documentation & Architecture (`design.md`)

> **Project Target**: VISHAL ENTERPRISE — Industrial Recycled Plastic & Sustainable Polymers Web Application
> **System Version**: 4.0.0 — Soft Industrial Tech / Precision Editorial / Responsive Product Architecture
> **Author**: Senior UI/UX Architect & Frontend Design Auditor
> **Last Updated**: August 2026

---

# 1. Project Overview

## Design Philosophy

The VISHAL ENTERPRISE design system combines **industrial engineering credibility** with a **modern, spacious, technology-oriented interface language**.

The redesign must feel less like a conventional industrial dashboard and more like a **premium technology company that manufactures industrial products**.

The interface must communicate:

* Engineering precision
* Recycled-material innovation
* Industrial reliability
* Product quality
* Sustainability
* B2B trust
* Fast quotation discovery
* Technical clarity

The visual system should use **large typography, generous whitespace, soft elevation, restrained borders, rounded surfaces, large product imagery, subtle motion, and highly controlled green/navy accents**.

The product remains industrial. The presentation becomes more modern, calm, premium, and approachable.

---

## Brand Personality

### Industrial

The interface must retain strong technical credibility through:

* Structured information
* Precise specifications
* Load-capacity metrics
* Product dimensions
* Material information
* Consistent alignment
* Reliable navigation
* Clear quotation workflows

### Eco-Engineered

The brand green remains the primary visual accent and must communicate:

* Circularity
* Recycled polymers
* Sustainability
* Material innovation
* Environmental responsibility

Green should be used strategically rather than covering large portions of the interface.

### Premium Technology

The interface should use:

* Large expressive typography
* Spacious layouts
* Soft cards
* Minimal visual noise
* Large rounded image containers
* Subtle elevation
* Smooth transitions
* Restrained animation

### B2B Trust

The interface must make product verification and RFQ conversion extremely easy.

Technical information must never be hidden behind decorative UI.

---

# 2. Design Style Classification

**Primary Style**

> Soft Industrial Technology / Modern Manufacturing Editorial UI

**Supporting Styles**

* Premium B2B product design
* Editorial technology interface
* Soft neo-bento architecture
* Minimal industrial luxury
* Product-led SaaS-style interaction patterns

The system must not become generic SaaS.

Industrial identity must remain visible through:

* Product photography
* Technical data
* Engineering terminology
* Navy brand color
* Green sustainability accent
* Specification-first layouts

---

# 3. Core Visual Principles

## Principle 01 — Typography Leads

Typography must establish hierarchy before decoration.

Large headings should communicate the primary message immediately.

Avoid filling the hero with multiple badges, metrics, borders, or small cards.

---

## Principle 02 — Space Is a Design Element

Layouts must have generous whitespace.

Content must not be packed simply because screen space is available.

Large structural spacing should separate:

* Hero
* Product sections
* Technical sections
* Sustainability sections
* RFQ sections
* Footer

---

## Principle 03 — Elevation Over Borders

Cards should primarily be differentiated through:

1. Surface color
2. Shadow
3. Spacing
4. Image treatment

Borders should be subtle and used only when necessary for structure or accessibility.

---

## Principle 04 — Large Product Surfaces

Product images are a major part of the visual identity.

Images should occupy meaningful surface area rather than appearing as small thumbnails.

---

## Principle 05 — Restrained Motion

Motion must feel smooth and premium.

Interactions must never feel game-like, excessive, or distracting.

---

## Principle 06 — Technical Information Remains Precise

The visual redesign must not weaken technical communication.

Specifications must remain:

* Easy to scan
* Numerically clear
* Consistently aligned
* Responsive
* Accessible
* Comparable across products

---

## Principle 07 — Green Is an Accent, Not the Background

The brand green should primarily identify:

* Primary CTA
* Active states
* Sustainability markers
* Verified states
* Selected filters
* Important metrics
* Product highlights

Do not turn entire sections green unless there is a deliberate marketing reason.

---

# 4. Global Design Tokens

## 4.1 Color Foundations

### Brand

| Token              | Light     | Dark                   | CSS Variable     | Purpose                            |
| ------------------ | --------- | ---------------------- | ---------------- | ---------------------------------- |
| Primary Navy       | `#0B2F63` | `#0B2F63`              | `--navy`         | Brand anchor, navigation, dark CTA |
| Navy Hover         | `#071E40` | `#113A72`              | `--navy-hover`   | Hover state                        |
| Navy Active        | `#061C3D` | `#0E2A52`              | `--navy-active`  | Active state                       |
| Navy Soft          | `#EEF4FB` | `rgba(11,47,99,.18)`   | `--navy-soft`    | Soft brand surfaces                |
| Brand Green        | `#80CF23` | `#77D986`              | `--brand`        | Primary accent                     |
| Brand Green Hover  | `#73BE1D` | `#8ef79d`              | `--brand-hover`  | Hover                              |
| Brand Green Active | `#68AD17` | `#5cb86b`              | `--brand-active` | Active                             |
| Brand Green Soft   | `#F2FBE8` | `rgba(119,217,134,.15)` | `--brand-soft`   | Background / badge                 |
| Brand Text         | `#2E6005` | `#77D986`              | `--brand-text`   | Green-on-light text                |

---

## 4.2 Surface System

The surface system must provide hierarchy without requiring heavy borders.

| Token             | Light     | Dark      | Purpose             |
| ----------------- | --------- | --------- | ------------------- |
| Page              | `#FFFFFF` | `#0f141a` | Main page           |
| Surface           | `#FFFFFF` | `#161c24` | Main content        |
| Surface Secondary | `#F7F8F6` | `#1e2530` | Section backgrounds |
| Surface Tertiary  | `#EEF1EC` | `#2a3441` | Secondary blocks    |
| Elevated          | `#FFFFFF` | `#1e2530` | Elevated cards      |
| Modal             | `#FFFFFF` | `#141414` | Dialogs             |
| Inverse           | `#0B0F14` | `#FFFFFF` | Inverse surfaces    |

---

## 4.3 Text System

| Token     | Light     | Dark      | Usage               |
| --------- | --------- | --------- | ------------------- |
| Primary   | `#0F1720` | `#FFFFFF` | Main headings/body  |
| Secondary | `#4F5965` | `#CBD5E1` | Supporting text     |
| Muted     | `#69727D` | `#94A3B8` | Metadata            |
| Disabled  | `#8A929B` | `#64748B` | Disabled UI         |
| Inverse   | `#FFFFFF` | `#000000` | Inverse surfaces    |
| Brand     | `#2E6005` | `#77D986` | Brand-specific text |

Text must always use semantic tokens.

Raw colors must not be introduced directly into component styles.

---

# 5. Semantic Status Colors

| Token           | Light     | Dark                    | Usage                       |
| --------------- | --------- | ----------------------- | --------------------------- |
| Success         | `#2F7D12` | `#77D986`               | Verified / operational      |
| Success Surface | `#F2FBE8` | `rgba(119,217,134,.15)`  | Success backgrounds         |
| Warning         | `#B56A00` | `#FBBF24`               | Pending / caution           |
| Warning Surface | `#FFF7E6` | `rgba(251,191,36,.12)`  | Warning backgrounds         |
| Danger          | `#C92A2A` | `#F87171`               | Errors / destructive action |
| Danger Surface  | `#FFF0F0` | `rgba(248,113,113,.12)` | Error backgrounds           |
| Info            | `#2563A8` | `#60A5FA`               | Information                 |
| Info Surface    | `#EFF6FF` | `rgba(96,165,250,.12)`  | Information backgrounds     |

---

# 6. Border System

Borders must be substantially quieter than the previous design system.

```css
--border-subtle: rgba(15, 23, 32, 0.08);
--border-default: rgba(15, 23, 32, 0.12);
--border-strong: rgba(15, 23, 32, 0.18);
```

Dark mode:

```css
--border-subtle: rgba(255,255,255,0.08);
--border-default: rgba(255,255,255,0.12);
--border-strong: rgba(255,255,255,0.18);
```

Borders should normally be used for:

* Form controls
* Tables
* Navigation separation
* Selected states
* Interactive boundaries
* Accessibility-sensitive component definition

Borders must not be added simply to make cards visually obvious.

---

# 7. Shadow System

The redesign must use **soft, low-opacity, multi-layer elevation**.

Do not use heavy black shadows.

```css
--shadow-none: none;

--shadow-sm:
  0 1px 2px rgba(0,0,0,.04),
  0 4px 12px rgba(0,0,0,.04);

--shadow-md:
  0 4px 8px rgba(0,0,0,.04),
  0 12px 28px rgba(0,0,0,.06);

--shadow-lg:
  0 8px 16px rgba(0,0,0,.04),
  0 24px 60px rgba(0,0,0,.08);

--shadow-xl:
  0 12px 24px rgba(0,0,0,.05),
  0 32px 80px rgba(0,0,0,.10);
```

Dark mode should use reduced-opacity white/black elevation rather than copying light shadows.

```css
--shadow-dark-sm:
  0 2px 8px rgba(0,0,0,.24);

--shadow-dark-md:
  0 8px 24px rgba(0,0,0,.32);

--shadow-dark-lg:
  0 16px 48px rgba(0,0,0,.42);
```

---

# 8. Radius System

**The radius system has been unified around 8px for consistency.**

The global radius has been updated to a consistent 8px to enforce a modern structural feel.

```css
--radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 8px;
  --radius-card: 8px;
  --radius-btn: 8px;
  --radius-pill: 8px;
  --radius-full: 8px;
```

Component guidance:

| Component         | Radius          |
| ----------------- | --------------- |
| Small icon button | `--radius-sm`   |
| Inputs            | `--radius-md`   |
| Small controls    | `--radius-md`   |
| Product card      | `--radius-card` (8px) |
| Section card      | `--radius-card` (8px) |
| Image container   | `--radius-card` (8px) |
| Modal             | `--radius-card` (8px) |
| Primary button    | `--radius-btn` (8px) |
| Secondary button  | `--radius-btn` (8px) |
| Badge             | `--radius-badge` (8px) |
| Filter chips      | `--radius-pill` (8px) |

The visual softness must come primarily from:

* Whitespace
* Shadows
* Typography
* Image scale
* Surface hierarchy
* Motion

It must **not** come from increasing border radius.

---

# 9. Typography System

## Font Stack

Primary:

```css
--font-family-primary:
  "Google Sans",
  "Noto Sans",
  Arial,
  Helvetica,
  sans-serif;
```

Production implementations must provide an approved fallback when Google Sans is unavailable.

---

## Base Typography

```css
--font-size-base: 16px;
--font-weight-base: 400;
--line-height-base: 24px;
```

---

## Typography Scale

| Token      |      Size | Weight | Line Height | Usage            |
| ---------- | --------: | -----: | ----------: | ---------------- |
| Display    | `64–84px` |    700 | `0.98–1.05` | Hero             |
| H1         | `48–64px` |    700 | `1.05–1.10` | Main headings    |
| H2         | `36–48px` |    700 | `1.10–1.15` | Section headings |
| H3         | `28–36px` |    600 | `1.15–1.25` | Subsections      |
| H4         | `22–28px` |    600 |      `1.25` | Card titles      |
| H5         | `18–20px` |    600 |       `1.3` | Small headings   |
| Body Large |    `18px` |    400 |      `28px` | Lead text        |
| Body       |    `16px` |    400 |      `24px` | Standard copy    |
| Body Small |    `14px` |    400 |      `20px` | Supporting copy  |
| Label      |    `14px` |    600 |      `20px` | UI labels        |
| Caption    |    `12px` |    500 |      `18px` | Metadata         |

---

## Responsive Display Typography

Hero typography must be fluid.

```css
font-size: clamp(48px, 7vw, 84px);
line-height: 0.98;
letter-spacing: -0.045em;
font-weight: 700;
```

Section headings:

```css
font-size: clamp(36px, 5vw, 56px);
line-height: 1.05;
letter-spacing: -0.035em;
```

Body text must remain readable at all breakpoints.

---

# 10. Letter Spacing

Large typography should use tighter tracking.

```css
--tracking-display: -0.045em;
--tracking-heading: -0.035em;
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-label: 0.01em;
```

Uppercase labels may use:

```css
letter-spacing: .06em;
```

Large headings must not use excessive letter spacing.

---

# 11. Spacing System

The spacing system must become more generous while retaining a consistent token structure.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
```

### Usage

```text
4px   → micro alignment
8px   → icon/text spacing
12px  → control internals
16px  → compact component spacing
24px  → card internals
32px  → local section gaps
48px  → component groups
64px  → section spacing
96px  → major section spacing
128px → hero / major editorial separation
```

No one-off spacing values should be introduced without a system-level reason.

---

# 12. Container Architecture

```css
--container-xl: 1280px;
--container-lg: 1120px;
--container-md: 1024px;
--container-sm: 768px;
```

Primary page container:

```css
width: min(100% - 32px, var(--container-xl));
margin-inline: auto;
```

Desktop:

```css
width: min(100% - 64px, var(--container-xl));
```

Large hero content may intentionally use a narrower maximum width for stronger typography.

---

# 13. Responsive Breakpoints

```text
xs   < 640px
sm   ≥ 640px
md   ≥ 768px
lg   ≥ 1024px
xl   ≥ 1280px
2xl  ≥ 1536px
```

Responsive behavior must prioritize:

1. Content readability
2. Product image clarity
3. CTA accessibility
4. Technical information visibility
5. Navigation usability

---

# 14. Motion System

Motion must be subtle and intentional.

```css
--motion-instant: 150ms;
--motion-fast: 200ms;
--motion-base: 300ms;
--motion-slow: 500ms;
```

Easing:

```css
--ease-standard: cubic-bezier(.2,.8,.2,1);
--ease-emphasized: cubic-bezier(.16,1,.3,1);
```

---

## Motion Rules

### Cards

```css
transition:
  transform 300ms var(--ease-standard),
  box-shadow 300ms var(--ease-standard);
```

Hover:

```css
transform: translateY(-3px);
```

No excessive scaling.

---

### Product Images

```css
transition:
  transform 500ms var(--ease-emphasized);
```

Hover:

```css
transform: scale(1.035);
```

---

### Buttons

Buttons may use:

* Icon translation
* Small elevation change
* Subtle background transition

Buttons must not:

* Expand dramatically
* Hide text
* Flash
* Rotate
* Grow beyond their layout bounds

---

## Reduced Motion

When:

```css
@media (prefers-reduced-motion: reduce)
```

the system must substantially reduce or disable non-essential animation.

---

# 15. Navigation

The global navigation should use a lightweight floating/surface-oriented architecture.

### Structure

```text
Brand
Products
Solutions
Sustainability
About
Contact

                         Request Quote
```

### Styling

```css
min-height: 56px;
background: rgba(255,255,255,.90);
backdrop-filter: blur(20px);
box-shadow: var(--shadow-sm);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-pill);
```

The navigation should remain visually quiet.

The primary CTA must provide the strongest visual emphasis.

---

# 16. Primary Button

## Anatomy

```text
[ Label                    → ]
```

### Geometry

```css
height: 48px;
padding-inline: 24px;
border-radius: var(--radius-pill);
font-size: 15px;
font-weight: 600;
```

### Default

* Background: `--brand`
* Text: `--text-primary`
* Shadow: `--shadow-sm`

### Hover

* Background: `--brand-hover`
* Transform: `translateY(-1px)`
* Shadow: `--shadow-md`

### Focus-visible

Must display a clear focus ring using the brand token.

### Active

```css
transform: translateY(0);
```

### Disabled

Opacity may be reduced, but disabled text must remain legible.

### Loading

The label must remain associated with the action while an accessible loading indicator is displayed.

### Error

Use contextual error messaging rather than turning the entire button red unless the action itself is destructive.

---

# 17. Secondary Button

```text
[ Label ]
```

Default:

```css
background: var(--surface);
border: 1px solid var(--border-default);
color: var(--text-primary);
border-radius: var(--radius-pill);
```

Hover:

```css
background: var(--surface-secondary);
box-shadow: var(--shadow-sm);
```

---

# 18. Text Action

For secondary navigation or product exploration:

```text
View Product →
```

The arrow should move subtly:

```css
transform: translateX(3px);
```

The interaction must remain readable without hover.

---

# 19. Product Card

Product cards must become larger, cleaner, and more editorial.

## Anatomy

```text
Product Image

Eco / Material badge

Product Name

Short technical description

Primary specification
Secondary specification

View Product →
```

### Image

```css
aspect-ratio: 4 / 3;
overflow: hidden;
border-radius: var(--radius-card);
```

### Card

```css
background: var(--surface);
border-radius: var(--radius-card);
box-shadow: var(--shadow-sm);
padding: 12px;
```

### Hover

```css
transform: translateY(-3px);
box-shadow: var(--shadow-lg);
```

The card must not jump in height when content changes.

---

# 20. Product Card Information Hierarchy

Order:

1. Product image
2. Product category / material
3. Product title
4. Product description
5. Primary engineering specification
6. Secondary specification
7. CTA

The most important technical metric should visually dominate secondary data.

---

# 21. Product Image Rules

Images must:

* Maintain correct aspect ratio
* Use `object-fit: cover` where appropriate
* Never overflow card bounds
* Have responsive loading
* Provide meaningful alternate text
* Maintain stable dimensions before loading

Image layout must reserve the final rendering area to prevent layout shift.

---

# 22. Technical Specification Component

Technical specifications should be presented through typography and alignment rather than dense bordered grids whenever practical.

Example:

```text
TECHNICAL PERFORMANCE

Static Load                  5000 kg
Dynamic Load                 2000 kg
Material                     Recycled HDPE
Operating Range              -20°C — 60°C
Service Life                 10+ years
```

Values:

```css
font-size: 20px;
font-weight: 600;
```

Labels:

```css
font-size: 14px;
color: var(--text-secondary);
```

---

# 23. Specification Cards

When specifications require a card:

```css
background: var(--surface-secondary);
border-radius: var(--radius-card);
padding: 24px;
box-shadow: var(--shadow-sm);
```

The card must remain visually quiet.

---

# 24. Badge System

Badges must be compact and lightweight.

Example:

```text
ECO ENGINEERED
100% RECYCLED
HDPE
HEAVY DUTY
```

```css
height: 30px;
padding-inline: 12px;
border-radius: var(--radius-pill);
font-size: 12px;
font-weight: 600;
```

Badges should not compete visually with product titles or CTAs.

---

# 25. Form Controls

## Input Geometry

Existing radius must be retained.

```css
height: 44px;
padding-inline: 14px;
border-radius: var(--radius-md);
```

Large forms may use:

```css
height: 48px;
```

### Default

```css
background: var(--surface);
border: 1px solid var(--border-default);
```

**Note:** In dark mode, inputs must force light or explicitly themed dark backgrounds to ensure high contrast and readability against dark surfaces. Raw input fields should inherit the elevated dark surface `var(--surface-secondary, #1e2530)` with `var(--border-default)` borders, rather than relying on browser defaults.

### Hover

Border may strengthen slightly.

### Focus-visible

```css
outline: 2px solid var(--brand);
outline-offset: 2px;
```

### Disabled

Input must visibly communicate its disabled state without becoming unreadable.

### Error

Error state must include:

* Color
* Text explanation
* Accessible association
* Clear recovery guidance

### Loading

Loading must preserve layout dimensions.

---

# 26. Search and Filter Controls

Search and filtering must prioritize instant comprehension.

Search field:

```text
[ Search products, materials, dimensions... ]
```

Filters should use:

```text
[ Material ]
[ Load Capacity ]
[ Application ]
[ Size ]
[ Sustainability ]
```

Filter chips should use `--radius-pill`.

Active filters must be clearly distinguishable without relying only on color.

---

# 27. Bento Layout System

Bento layouts remain part of the system, but their visual treatment must be softened.

Bento surfaces should use:

* Large whitespace
* Strong typography
* Product imagery
* Soft elevation
* Limited decoration
* Clear focal points

A bento grid must not become a collection of miniature dashboards.

---

# 28. Hero Section

The hero should emphasize a single proposition.

Recommended structure:

```text
EYEBROW

ENGINEERED FOR A
CIRCULAR FUTURE.

Recycled plastic products engineered for
demanding industrial environments.

[ Explore Products ] [ Request Quote ]

Large product/environment image
```

Hero typography:

```css
font-size: clamp(48px, 7vw, 84px);
line-height: .98;
font-weight: 700;
letter-spacing: -0.045em;
```

Hero content must not be overloaded with statistics.

---

# 29. Sustainability Section

Sustainability should be shown through real information rather than decorative green styling.

Preferred presentation:

```text
100%
RECYCLED MATERIAL

LOW
MAINTENANCE

LONG
SERVICE LIFE
```

Large numbers should use typography rather than giant graphic components.

---

# 30. RFQ / Quote CTA

RFQ must remain one of the highest-priority conversion paths.

Primary actions:

```text
Request a Quote
Add to RFQ
Get Pricing
Talk to Sales
```

The CTA must remain visible without dominating every component.

---

# 31. Admin Dashboard

The admin interface may remain more information-dense than the marketing website.

However, it must use the same:

* Typography
* Colors
* Radius system
* Buttons
* Inputs
* Shadow system
* State system

Admin cards:

```css
background: var(--surface);
border-radius: var(--radius-card);
box-shadow: var(--shadow-sm);
```

Avoid recreating a heavy enterprise dashboard aesthetic.

---

# 32. Admin Stats Cards

Stats cards should emphasize one metric.

```text
ACTIVE PRODUCTS

128

+12 this month
```

Metric:

```css
font-size: 32px;
font-weight: 700;
letter-spacing: -0.03em;
```

Label:

```css
font-size: 14px;
color: var(--text-secondary);
```

---

# 33. Activity Feed

Activity should use a calm timeline.

```text
● Product RFQ received
  5m ago

● Product updated
  2h ago

● New enquiry
  Yesterday
```

Do not overuse timeline lines, icons, and colored dots.

---

# 34. Status System

Status must communicate clearly.

```text
● Operational
● Verifying
● Offline
```

Color must not be the only indicator.

Use:

* Icon
* Text
* Color

---

# 35. Empty States

Empty states must explain:

1. What is missing
2. Why it matters
3. What action should happen next

Example:

```text
No products found

Try changing your filters or search terms.

[ Clear Filters ]
```

Empty-state components must not occupy excessive vertical space.

**Visual Styling:**
Empty states should use `var(--surface)` as the background with a dashed `var(--border-default)` border to subtly separate them from the main page background without feeling heavy. In dark mode, they must adapt to elevated surfaces rather than remaining high-contrast white.

---

# 36. Loading States

Use skeleton loading rather than blocking spinners whenever possible.

Skeletons must:

* Match final component dimensions
* Avoid layout shift
* Respect reduced-motion preferences
* Use subtle animation

---

# 37. Error States

Errors must be actionable.

Bad:

```text
Something went wrong.
```

Better:

```text
We couldn't load the product catalogue.

Please try again.

[ Retry ]
```

---

# 38. Interaction States

Every interactive component must define:

* Default
* Hover
* Focus-visible
* Active
* Disabled
* Loading
* Error

No component is production-ready without explicit state behavior.

---

# 39. Keyboard Interaction

All interactive elements must be keyboard accessible.

Requirements:

* Logical tab order
* Visible focus indicator
* Enter activation where appropriate
* Space activation for button-like controls
* Escape for dismissible overlays
* Arrow keys for components where semantically appropriate

Focus must never be removed only for visual styling.

---

# 40. Touch Interaction

Touch targets must be sufficiently large for reliable mobile interaction.

Controls must not rely on hover to expose essential functionality.

Mobile users must have access to all primary actions without desktop-only interactions.

---

# 41. Accessibility Standard

Target:

**WCAG 2.2 AA minimum**

The visual system may exceed AA where practical, but no component may ship below the defined accessibility requirements.

---

# 42. Accessibility Acceptance Criteria

## Text

PASS when:

* Body text meets required contrast
* Heading text meets required contrast
* Disabled text remains distinguishable
* Links remain distinguishable without relying only on color

---

## Focus

PASS when:

* Every interactive control has visible `:focus-visible`
* Focus remains visible against all surfaces
* Focus is not removed through `outline: none` without an equivalent replacement

---

## Motion

PASS when:

* Reduced-motion preference is respected
* No essential information depends on animation
* Motion does not cause content instability

---

## Forms

PASS when:

* Labels are programmatically associated
* Errors are accessible
* Required fields are communicated
* Keyboard interaction works without pointer input

---

## Images

PASS when:

* Informative images have meaningful alternative text
* Decorative images are hidden appropriately
* Images reserve layout space before loading

---

# 43. Content and Tone

Copy must be:

* Concise
* Technical
* Confident
* Human
* B2B-oriented
* Specific

Avoid:

* Excessive marketing language
* Generic AI-style wording
* Empty sustainability claims
* Overuse of adjectives
* Unverified environmental claims

---

# 44. Content Examples

### Product

Bad:

```text
Amazing Eco-Friendly Premium Pallet
```

Better:

```text
Recycled Plastic Heavy-Duty Pallet
```

### CTA

Bad:

```text
Click Here
```

Better:

```text
View Product
```

### RFQ

Bad:

```text
Submit
```

Better:

```text
Request a Quote
```

### Technical description

Bad:

```text
A fantastic pallet built with amazing quality.
```

Better:

```text
Heavy-duty recycled polymer pallet designed for repeated industrial handling.
```

---

# 45. Anti-Patterns

The following implementations are prohibited.

## Visual

* Heavy card outlines everywhere
* Large opaque shadows
* Excessive gradients
* Excessive green backgrounds
* Random border radii
* Decorative UI without functional purpose
* Excessive glassmorphism
* Excessive blur
* Giant animated hover effects

---

## Typography

* Random font families
* Uncontrolled font sizes
* Multiple unrelated heading scales
* Excessive uppercase text
* Extremely tight body text
* Decorative typography that reduces readability

---

## Interaction

* Disappearing button labels
* Hover-only essential functionality
* Large layout shifts
* Uncontrolled transforms
* Unnecessary animations
* Invisible focus states

---

## Layout

* One-off spacing values
* Arbitrary card widths
* Inconsistent content containers
* Dense UI without hierarchy
* Excessive bento fragmentation
* Unnecessary nested cards

---

# 46. Migration Notes From Design System 3.0

The redesign must preserve:

* Navy brand identity
* Green sustainability identity
* Dual theme support
* Product-led architecture
* B2B RFQ flows
* Technical specification visibility
* Responsive grid architecture
* Existing radius tokens

The following must change:

### Replace

Heavy border-driven cards

### With

Surface + spacing + soft elevation

---

### Replace

Dense industrial UI

### With

Spacious editorial hierarchy

---

### Replace

Aggressive hover animations

### With

Subtle elevation and movement

---

### Replace

Small typography-heavy layouts

### With

Larger heading hierarchy and readable body copy

---

### Replace

Large areas of navy/green

### With

Mostly neutral surfaces with controlled brand accents

---

# 47. Core CSS Blueprint

```css
:root {
  /* Font */
  --font-family-primary:
    "Google Sans",
    "Noto Sans",
    Arial,
    Helvetica,
    sans-serif;

  --font-size-base: 16px;
  --line-height-base: 24px;

  /* Brand */
  --navy: #0B2F63;
  --navy-hover: #071E40;
  --navy-active: #061C3D;
  --navy-soft: #EEF4FB;

  --brand: #80CF23;
  --brand-hover: #73BE1D;
  --brand-active: #68AD17;
  --brand-soft: #F2FBE8;
  --brand-text: #2E6005;

  /* Surfaces */
  --bg-page: #FFFFFF;
  --surface: #FFFFFF;
  --surface-secondary: #F7F8F6;
  --surface-tertiary: #EEF1EC;
  --surface-elevated: #FFFFFF;

  /* Text */
  --text-primary: #0F1720;
  --text-secondary: #4F5965;
  --text-muted: #69727D;
  --text-disabled: #8A929B;
  --text-inverse: #FFFFFF;

  /* Borders */
  --border-subtle: rgba(15, 23, 32, 0.08);
  --border-default: rgba(15, 23, 32, 0.12);
  --border-strong: rgba(15, 23, 32, 0.18);

  /* Unified Radius System (8px standard) */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 8px;
  --radius-card: 8px;
  --radius-btn: 8px;
  --radius-pill: 8px;
  --radius-full: 8px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* Shadows */
  --shadow-sm:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.04);

  --shadow-md:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 12px 28px rgba(0, 0, 0, 0.06);

  --shadow-lg:
    0 8px 16px rgba(0, 0, 0, 0.04),
    0 24px 60px rgba(0, 0, 0, 0.08);

  /* Motion */
  --motion-instant: 150ms;
  --motion-fast: 200ms;
  --motion-base: 300ms;
  --motion-slow: 500ms;

  --ease-standard: cubic-bezier(.2, .8, .2, 1);
  --ease-emphasized: cubic-bezier(.16, 1, .3, 1);
}

html[data-theme="dark"],
html.dark {
  --bg-page: #0f141a;
  --surface: #161c24;
  --surface-secondary: #1e2530;
  --surface-tertiary: #2a3441;
  --surface-elevated: #1e2530;

  --brand: #77D986;
  --brand-hover: #8ef79d;
  --brand-active: #5cb86b;
  --brand-soft: rgba(119, 217, 134, 0.15);
  --brand-text: #77D986;

  --text-primary: #FFFFFF;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --text-disabled: #64748B;
  --text-inverse: #000000;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.18);

  --shadow-sm:
    0 2px 8px rgba(0, 0, 0, 0.24);

  --shadow-md:
    0 8px 24px rgba(0, 0, 0, 0.32);

  --shadow-lg:
    0 16px 48px rgba(0, 0, 0, 0.42);
}
```

---

# 48. Component Consistency Rules

Every production component must use:

* Semantic color tokens
* Existing radius tokens
* Defined typography tokens
* Defined spacing tokens
* Defined shadow tokens
* Defined motion tokens
* Explicit states
* Responsive behavior
* Keyboard behavior
* Touch behavior
* Overflow handling
* Empty-state behavior where applicable

Components must not introduce local visual systems.

---

# 49. Density Guidelines

The marketing website should remain visually spacious.

Known page-component density:

```text
Links       : 282
Cards       : 81
Buttons     : 26
Lists       : 20
Navigation  : 7
Inputs      : 3
```

These counts must not result in visually dense layouts.

Repeated components should be grouped into clear visual sections.

---

# 50. QA Checklist

## Foundations

* [ ] Correct font stack is used
* [ ] Typography tokens are used
* [ ] No arbitrary spacing values exist
* [ ] Existing radius tokens remain unchanged
* [ ] Semantic colors are used instead of raw colors

## Cards

* [ ] Card surfaces use correct elevation
* [ ] Shadows remain subtle
* [ ] Card heights remain stable
* [ ] Images cannot overflow
* [ ] Hover states are restrained

## Buttons

* [ ] Primary and secondary hierarchy is clear
* [ ] Button text never disappears
* [ ] Focus-visible state is visible
* [ ] Hover state does not alter layout unexpectedly
* [ ] Touch interaction works on mobile

## Typography

* [ ] Hero typography is responsive
* [ ] Heading hierarchy is clear
* [ ] Body copy remains readable
* [ ] Letter spacing follows tokens
* [ ] No random font sizes are introduced

## Forms

* [ ] Labels are accessible
* [ ] Focus states are visible
* [ ] Error messages are clear
* [ ] Loading states preserve dimensions
* [ ] Keyboard operation works

## Responsive

* [ ] Mobile content stacks correctly
* [ ] Product imagery remains readable
* [ ] CTA buttons remain accessible
* [ ] Navigation remains usable
* [ ] No horizontal overflow occurs

## Accessibility

* [ ] WCAG 2.2 AA requirements pass
* [ ] Keyboard navigation works
* [ ] Focus indicators remain visible
* [ ] Contrast is verified
* [ ] Reduced-motion behavior works
* [ ] Images have appropriate alternative text

## Performance

* [ ] Images use responsive loading
* [ ] Layout shift is minimized
* [ ] Animations remain GPU-friendly
* [ ] Shadows do not create excessive rendering cost
* [ ] Off-screen content is not unnecessarily animated

---

# 51. Final Design Direction

VISHAL ENTERPRISE must visually communicate:

> **Industrial engineering with modern technology-company clarity.**

The interface should feel:

**Precise**
**Spacious**
**Premium**
**Technical**
**Reliable**
**Sustainable**
**Modern**
**Quietly confident**

The design system must preserve the existing VISHAL ENTERPRISE identity while adopting a softer, more editorial interface language inspired by modern technology-product design.

The key transformation is:

```text
OLD

Industrial
+ Dense
+ Border-heavy
+ Sharp
+ Dashboard-like
+ Aggressive hover effects

                    ↓

NEW

Industrial
+ Spacious
+ Typography-led
+ Soft elevation
+ Product-focused
+ Restrained borders
+ Calm motion
+ Premium technology aesthetic
```

**The border-radius system has been unified to 8px across the application for a more modern, cohesive, and structured technological aesthetic.**

---

*End of Design System Documentation (`design.md`)*
