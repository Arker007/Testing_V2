# UI Design Tokens, Architecture & 7-Step Design Standards

This document establishes the official Design System specifications and UI/UX standards for Vishal Enterprise.

---

## 🏛️ 7-Step Design System Specification

### Step 1: Establish Visual Hierarchy & Hierarchy Control
1. **Rank Information Before Designing**: Prioritize elements into primary, secondary, and tertiary tiers. Key specifications, certifications, and product identifiers take top rank over decorative elements.
2. **Emphasize Key Actions & Values**:
   - **Primary Action**: Vibrant eco-green filled shape (`--brand-primary`: `#6BBF54`, hover `#7ACC63`).
   - **Secondary Action**: Solid navy (`--navy`: `#161C24`) or crisp outline button.
   - **Tertiary / Low-Priority**: Subtle text link or ghost button with underline (`.datasheetLink`, `hover:underline`).
3. **Scale Data Over Labels**: Numeric values in stat cards and dashboards are larger (`text-3xl font-extrabold`) and visually distinct from their category labels (`text-xs font-semibold uppercase`).
4. **Direct Attention with Weight and Tone**: Headings command immediate focus via heavier font weights (`font-bold` / `font-black`) and dark charcoal (`#1A1A1A`), keeping body copy in balanced dark grey (`#4E4E4E`).

### Step 2: Spatial Layout, Grouping, and Formatting
1. **Gestalt's Law of Proximity**: Group related controls (e.g. input label + field) closely (8px–12px gap) while maintaining larger separation (24px–32px) from unrelated adjacent groups.
2. **Strict Base-4 / Base-8 Spacing Scale**:
   - `--space-1`: 4px | `--space-2`: 8px | `--space-3`: 12px | `--space-4`: 16px
   - `--space-5`: 24px | `--space-6`: 32px | `--space-7`: 40px | `--space-8`: 48px | `--space-9`: 64px
3. **Deliberate Text Alignment**:
   - **Left Alignment**: Default for all body text, lists, and technical descriptions.
   - **Right Alignment**: Numerical values in spec comparisons, load capacities, and tables.
   - **Center Alignment**: Standalone hero headers, section titles, and centered callout blocks.
4. **Elevated Interactive Form Layouts**: Standard vertical inputs are enhanced with visual selectable cards and quick-fill chips (e.g., product categories in Contact Form, batch quantity presets in Inquiry Modal).

### Step 3: Visual Elements, Contrast, and Accessibility
1. **WCAG AA 4.5:1 Standards**: Minimum contrast ratio of 4.5:1 for all interface body copy against backgrounds (`#4E4E4E` on `#FFFFFF` yields ~9.5:1).
2. **Text Over Images**: Hero images and media overlays use dark translucent overlays (`rgba(15, 20, 26, 0.72)`) and backdrop blur to guarantee readability.
3. **Multi-Signal System States**: Alerts and status badges never rely on color alone. Every state pairs color with a descriptive heading/label and an icon (e.g. `solar:check-circle-bold` for success, `solar:danger-triangle-bold` for warnings, `solar:close-circle-bold` for errors).
4. **Universal Status Color Standards**:
   - Success: Forest Green (`#16A34A` / `--success-500`)
   - Danger/Error: Red (`#DC2626` / `--danger-500`)
   - Warning: Amber (`#D97706` / `--warning-500`)
   - Info: Deep Blue (`#1D4ED8` / `--info-500`)

### Step 4: UI Aesthetics, Depth, and Texture
1. **Soft Multi-Layered Shadows**: Dual-stop ambient occlusion shadows without harsh black opacity:
   - `--shadow-xs`: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`
   - `--shadow-sm`: `0 2px 4px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04)`
   - `--shadow-md`: `0 6px 16px -2px rgba(15, 23, 42, 0.08), 0 3px 6px -2px rgba(15, 23, 42, 0.04)`
   - `--shadow-lg`: `0 12px 28px -4px rgba(15, 23, 42, 0.09), 0 6px 12px -2px rgba(15, 23, 42, 0.04)`
   - `--shadow-xl`: `0 20px 36px -6px rgba(15, 23, 42, 0.11), 0 10px 18px -4px rgba(15, 23, 42, 0.05)`
2. **Subtle 1px Borders**: Hairline borders (`var(--border-subtle)` / `var(--border-default)`) replace heavy outlines.
3. **Controlled Glassmorphism**: Frosted glass effects (`backdrop-filter: blur(8px)`) applied only to floating navigation headers and modal overlays to maintain readability.

### Step 5: Typography Principles & Systematic Type Architecture

#### 1. Systematic Type Scales
- **Modular Scaling**: Base typographic hierarchy on a mathematical ratio (**1.25x Major Third**) with a solid **16px (1.0rem)** base to ensure size differences between H1, H2, subheadings, and body copy feel harmonious and mathematically intentional:
  - `Display / Hero`: `3.75rem` (60px) – `16 * 1.25^6`
  - `Heading Large (H1)`: `3.0rem` (48px) – `16 * 1.25^5`
  - `Heading Medium (H2)`: `1.875rem` (30px) – `16 * 1.25^3`
  - `Heading Small (H3)`: `1.25rem` (20px) – `16 * 1.25^1`
  - `Body Primary (Base)`: `1.0rem` (16px) – `Base Unit`
  - `Body Secondary`: `0.8125rem` (13px)
  - `Caption / Muted`: `0.75rem` (12px)
  - `Microcopy`: `0.6875rem` (11px)
- **Semantic Token Mapping**: Functional naming conventions over descriptive CSS styles:
  - `--type-display`, `.type-display`
  - `--type-heading-large`, `.type-heading-large`
  - `--type-heading-medium`, `.type-heading-medium`
  - `--type-heading-small`, `.type-heading-small`
  - `--type-body-primary`, `.type-body-primary`
  - `--type-body-secondary`, `.type-body-secondary`
  - `--type-caption-muted`, `.type-caption-muted`
  - `--type-microcopy`, `.type-microcopy`

#### 2. Ergonomics and Spacing
- **Proportional Leading (Line Height)**:
  - Large headings use tight line heights (`1.1 – 1.2`) to visually group multi-line headings as a unified cohesive block.
  - Subheadings use snug line heights (`1.2 – 1.3`) for clean section labeling.
  - Body copy uses looser line heights (`1.4 – 1.6`, default `1.55`) giving the reader's eye comfortable tracking back to the next line.
  - Captions and microcopy use snug-medium leading (`1.3 – 1.4`).
- **Measure Control**: Strict line length containers. Keep desktop body copy between **45 and 75 characters** per line (`--measure-desktop-ideal: 65ch`, `.measure-reading`). Lines exceeding 75ch increase eye travel and fatigue; lines under 45ch break rhythm too frequently.

#### 3. Contrast Through Weight and Tint
- **Skip-Weight Pairing**: Within any given component, skip a font weight to guarantee unambiguous visual contrast.
  - Pair **Regular (400)** with **Bold (700)** (`.skip-weight-secondary` with `.skip-weight-primary`).
  - Pair **Light (300)** with **Semi-Bold (600)** (`.skip-weight-light-pair` with `.skip-weight-semibold-pair`).
  - **Rule**: Avoid placing Regular (400) and Medium (500) directly adjacent—it reduces hierarchy clarity and looks unintentional.
- **Color Tinting**: Use dark off-black charcoal (`#1A1A1A` / `--charcoal-900`) for primary text and medium-gray (`#64748B` / `--text-muted` / `.text-tint-muted`) for secondary metadata, sub-labels, and timestamps, de-prioritizing data without shrinking the font to an illegible size.

#### 4. Functional Font Selection
- **Legibility Auditing**: Workhorse typefaces (`DM Sans` for public catalog, `Plus Jakarta Sans` for admin analytics) are verified for distinct character shapes, clearly distinguishing between a capital **'I'**, lowercase **'l'**, and numeral **'1'**.
- **X-Height Evaluation**: Selected fonts feature a generous x-height (height of lowercase letters relative to uppercase), ensuring exceptional legibility even at compact micro-sizes (11px–12px).

#### 5. Systematic Text Element Reference Table

| Text Element | Optimal Line Height | Weight Strategy | Primary Function |
|---|---|---|---|
| **Display / H1** | `1.1 – 1.2` (Tight) | Bold / Black (`700` / `900`) | Grabbing instant attention |
| **Subheadings** | `1.2 – 1.3` (Snug) | Semi-Bold / Bold (`600` / `700`) | Categorizing content sections |
| **Body Copy** | `1.4 – 1.6` (Loose) | Regular (`400`) | Long-form reading comprehension |
| **Microcopy / Captions** | `1.3 – 1.4` (Balanced) | Medium / Regular (`500` / `400`) | Supporting context, timestamps |

### Step 6: Design Consistency and Polish
1. **Uniform Geometry**: Standard corner radius tokens across components:
   - `--radius-btn`: `8px` | `--radius-input`: `8px` | `--radius-card`: `12px` | `--radius-modal`: `16px` | `--radius-badge`: `4px`
2. **Standardized UI Controls**: Primary button green (`--brand-primary`), secondary navy, and outline styles remain consistent across every screen.
3. **Harmonized Media & Card Row Heights**: Product cards enforce `height: 210px` thumbnail wraps, `object-fit: contain`, and bottom-aligned CTA buttons (`mt-auto` / `justify-content: space-between`).
4. **Single Cohesive Icon Family**: Exclusively `@iconify/react` using the `solar:*` icon family.

### Step 7: Interaction Cost Reduction
1. **Cognitive Load**: Clear contextual grouping, distinct category tags, and zero screen clutter.
2. **Physical Load**: Preset selectable batch cards, instant inquiry triggers, and reduced clicks.
3. **Fitts's Law**: Minimum `44px` touch targets on mobile (`min-h-[44px]`), prominent primary buttons, and sticky navigation actions.

---

## 📐 Grid Mathematics & Structural Alignment Standards

### 1. The 8-Point Grid System
All margins, padding, and layout dimensions are standardized to multiples of 8 (with 4px half-steps for micro elements) to guarantee mathematically consistent spacing and eliminate structural guesswork:
- `4px` (`--space-1`, `--space-micro-sm`): Checkbox/radio inline gaps, micro indicators.
- `8px` (`--space-2`, `--space-micro-md`): Control gaps, icon-to-label spacing, input-to-label separation.
- `12px` (`--space-3`, `--space-comp-sm`): Compact buttons, nested list items.
- `16px` (`--space-4`, `--space-comp-md`): Standard button/input padding, component margins.
- `24px` (`--space-5`, `--space-comp-lg`): Standard card inner padding, 12-column grid gutters.
- `32px` (`--space-6`): Large container padding, block separation.
- `48px` (`--space-8`, `--space-macro-sm`): Section dividing negative space, hero margins.
- `64px` (`--space-9`, `--space-macro-md`): Section vertical rhythm padding (`--space-section-py`).
- `96px` (`--space-10`, `--space-macro-lg`): Major section breathing room, footer separation.

### 2. Column & Baseline Management
- **12-Column Responsive Layouts**: Utilize `.grid-12` with responsive column spans (`.col-span-12`, `.col-span-8`, `.col-span-6`, `.col-span-4`, etc.) and 24px/16px gutters to enforce horizontal rhythm across desktop and tablet viewports.
- **Baseline Grid Rhythm**: Anchor typography to an 8px vertical baseline rhythm (`.baseline-grid`, `--line-height-heading: 1.25`, `--line-height-body: 1.55`) so multi-line text across adjacent columns aligns seamlessly.

### 3. Alignment Anchoring
- **Strong Left-Alignment**: Avoid center alignment for complex or text-heavy components, specs, and dashboards. Rely on strong left-alignment (`.align-anchor-left`, `.vertical-axis-left`) to create a predictable vertical axis for the user's eye, significantly reducing reading friction.
- **Center Alignment Exception**: Center alignment is reserved solely for standalone hero display titles and short section headers.

---

## 🌿 Whitespace Engineering (Negative Space)

### 1. Micro vs. Macro Whitespace
- **Micro-Whitespace (4px – 8px)**: Tightly binds directly related elements (e.g. form label to input field, badge dot to badge text, icon to callout title).
- **Macro-Whitespace (48px – 96px+)**: Separates distinct conceptual page sections, providing cognitive breathing room and preventing visual fatigue.

### 2. Proximity over Borders
- **Engineered Grouping**: Remove harsh structural borders, heavy bounding boxes, and arbitrary horizontal dividing lines wherever possible.
- **Soft Clustered Grouping**: Rely on background surface transitions (`--bg-surface-secondary`), soft radius curves (`--radius-card`), and calibrated negative space (`.proximity-group`, `.proximity-card`) to group related content chunks cleanly.

---

## 👁️ Scale, Proportion, and Eye Routing

### 1. Non-Linear Scaling
Key interactive elements use geometric progressions rather than small linear increments:
- **Primary Actions (`.action-primary-dominant`)**: Disproportionately dominant in size (14px/32px padding), weight (800 bold), color (`--brand-primary`), and shadow (`--shadow-md`) to instantly seize visual priority.
- **Secondary Actions (`.action-secondary-muted`)**: Understated contrast, outline or transparent fill, smaller footprint.

### 2. Scanning Patterns
- **F-Pattern**: Applied to dashboards, technical specification tabs, and product catalogs to match natural horizontal-left-top reading flow.
- **Z-Pattern**: Applied to marketing heroes and landing sections to guide the user's eye from brand badge -> headline -> visual asset -> dominant CTA.

---

## 🌌 Elevation and Simulated Depth Mechanics

### 1. Strict Z-Index Priority Mapping
| Tier | Token | Value | Applied Component |
|---|---|---|---|
| Depressed | `--z-deep` | `-1` | Canvas patterns, deep background effects |
| Base | `--z-base` | `0` | Default document flow & standard content |
| Raised | `--z-raised` | `10` | Hovered cards, active tabs, floating chips |
| Sticky | `--z-sticky` | `100` | Sticky navigation bar, sticky filter bar |
| Drawer | `--z-drawer` | `900` | Mobile navigation drawers, off-canvas sheets |
| Dropdown | `--z-dropdown` | `1000` | Dropdown menus, autocomplete search lists |
| Popover | `--z-popover` | `1100` | Tooltips, contextual popovers |
| Scrim | `--z-scrim` | `1200` | Modal backdrop overlay, dimming scrim |
| Modal | `--z-modal` | `1300` | Dialog boxes, B2B inquiry modals |
| Toast | `--z-toast` | `1400` | System alerts, floating toast notifications |

### 2. Mathematically Consistent Depth
- Multi-layered soft ambient occlusion shadows (`--shadow-xs` through `--shadow-2xl`).
- Modals, dropdowns, and floating controls cast mathematically consistent elevation shadows to prove physical elevation above base layers.
- Scrim layers utilize backdrop blur (`blur(8px)`) paired with semi-transparent dark slate (`rgba(15, 23, 42, 0.65)`).

---

## 📊 Spatial Metric Table

| Spatial Metric | Recommended Value (8pt Grid) | Application Focus |
|---|---|---|
| **Micro-spacing** | `4px – 8px` (`--space-1` to `--space-2`) | Checkboxes, icons next to text, labels to form inputs |
| **Component padding** | `12px – 24px` (`--space-3` to `--space-5`) | Buttons in a row, list items, internal card padding |
| **Macro-spacing** | `48px – 96px+` (`--space-8` to `--space-10`) | Dividing distinct page sections, footer separation |

---

## 🎨 Core Theme Variables (`apps/web/src/shared/styles/core/tokens.css`)
- **Brand Eco-Green**: `--brand-500: #6BBF54`, `--brand-400: #7ACC63`, `--brand-600: #5DA849`
- **Dark Charcoal / Grey**: `--charcoal-900: #1A1A1A`, `--charcoal-body: #4E4E4E`
- **Surfaces**: `--bg-canvas: #FFFFFF`, `--bg-surface: #FFFFFF`, `--bg-surface-secondary: #F8FAFC`
- **Borders**: `--border-subtle: #E2E8F0`, `--border-default: #CBD5E1`, `--border-brand: rgba(107,191,84,0.55)`

## 🌟 Icon Standard
- **Package**: `@iconify/react`
- **Icon Family**: `solar:*` (e.g. `solar:box-minimalistic-linear`, `solar:check-circle-bold`, `solar:letter-linear`)
- **Constraint**: Do not import secondary icon packages.
