# Comprehensive Design System Documentation & Blueprint (`design.md`)

> **Project Target**: VISHAL ENTERPRISE — Industrial Recycled Plastic & Sustainable Polymers Web Application
> **System Version**: 2.0.0 (High-Contrast Precision Tech & Industrial Eco-Engineering Theme)
> **Author**: Senior UI/UX Architect & Frontend Design Auditor

---

## 1. Project Overview

### Design Philosophy
The design philosophy bridges **Industrial Durability** with **Eco-Friendly Polymer Innovation**. It balances technical precision (engineering specifications, load capacities, polymer specs) with modern, clean visual hierarchy. Every visual element emphasizes reliability, zero-maintenance sustainability, and heavy-duty industrial performance.

### Brand Personality
* **Authoritative & Industrial**: Solid geometry, sharp typography, high contrast, bold metrics.
* **Eco-Engineered**: Vibrant tech-green accents (`#80cf23` / `#88e31b`) representing circular plastic recycling and forest preservation.
* **Trustworthy & B2B Focused**: Deep industrial navy (`#0B2F63`) background elements, clear spec sheets, instant RFQ action paths.
* **Precision & Quality**: High legibility, strict contrast ratios (WCAG 2.2 AAA compliant), zero fluff.

### Visual Identity
* **Primary Palette**: Deep Industrial Navy (`#0B2F63`), Pitch Dark / OLED (`#000000`, `#05070a`, `#0e1015`), Crisp White (`#FFFFFF`).
* **Accent Palette**: Tech Emerald / Acer Green Accent (`#80cf23` light / `#88e31b` dark theme).
* **Card Surface Architecture**: Elevated 8px rounded cards with 1px structural borders (`#DADADA` light / `rgba(255, 255, 255, 0.12)` dark).

### Design Style Classification
**High-Contrast Industrial Tech / Neo-Bento Industrial Design System** with dual-mode (Light / OLED Dark Mode) adaptive mechanics.

### Industry Category
Industrial Manufacturing, Heavy-Duty Logistics Equipment, Sustainable Recycled Plastic Engineering & ESG Procurement.

### User Experience Goals
1. Fast B2B Quote Conversion (under 2 clicks to RFQ).
2. Frictionless Technical Spec Verification (load capacity, pallet dimensions, material data sheets).
3. Seamless Dual-Theme Comfort (Clean crisp light mode for daylight office work, pitch-black OLED dark mode for night/industrial monitoring).
4. Instant Search & Product Filtering with zero layout shift.

---

## 2. Global Design Tokens

### Colors & Palette Definition

#### Primary Colors
| Token Name | Light Value | Dark Value | CSS Variable | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Primary (Navy)** | `#0B2F63` | `#0B2F63` | `--navy` | Core B2B Brand Identity, Headers, Primary Buttons |
| **Primary Hover** | `#071E40` | `#113a72` | `--navy-dark` | Hover states on primary elements |
| **Primary Active** | `#061C3D` | `#0e2a52` | `--navy-darker` | Click/Active states |
| **Primary Light** | `#113a72` | `#13386b` | `--navy-light` | Gradient transitions, section fills |
| **Primary Dark** | `#071E40` | `#05070a` | `--navy-dark` | Deep dark mode background |

#### Secondary / Accent Colors (Tech Green Scale)
| Token Name | Light Value | Dark Value | CSS Variable | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Accent** | `#80cf23` | `#88e31b` | `--brand` | Secondary CTA, Tech Accents, Highlights, Badges |
| **Brand Hover** | `#73be1d` | `#9be835` | `--brand-hover` | Hover states on tech green elements |
| **Brand Active** | `#68ad17` | `#78be16` | `--brand-dark` | Active states |
| **Brand Light** | `#f2fbe8` | `rgba(136,227,27,0.12)` | `--brand-light` | Tinted badge/card fills |
| **Brand Text** | `#2e6005` | `#88e31b` | `--brand-text` | High-contrast text on light backgrounds |

#### Semantic Status Colors
| Token Name | Light Value | Dark Value | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Success** | `#80cf23` | `#88e31b` | `--color-success` |
| **Success Light** | `#f2fbe8` | `rgba(136, 227, 27, 0.15)` | `--success-bg` |
| **Warning** | `#F59E0B` | `#FBBF24` | `--color-warning` |
| **Warning Light** | `#FEF3C7` | `rgba(245, 158, 11, 0.15)` | `--warning-bg` |
| **Error / Danger** | `#EF4444` | `#F87171` | `--color-danger` |
| **Error Light** | `#FEE2E2` | `rgba(239, 68, 68, 0.15)` | `--danger-bg` |
| **Info** | `#0000EE` | `#60A5FA` | `--color-info` |
| **Info Light** | `#EFF6FF` | `rgba(0, 0, 238, 0.15)` | `--info-bg` |

#### Neutral Scale
| Scale Token | Light Value | Dark Value | CSS Variable | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Neutral 50** | `#F8FAFC` | `#05070a` | `--gray-50` | Page background, alternating section fill |
| **Neutral 100** | `#F1F5F9` | `#090b10` | `--gray-100` | Subtle container background |
| **Neutral 200** | `#DADADA` | `rgba(255, 255, 255, 0.12)` | `--gray-200` | Card borders, dividers |
| **Neutral 300** | `#CBD5E1` | `rgba(255, 255, 255, 0.25)` | `--gray-300` | Muted text, strong borders |
| **Neutral 400** | `#999999` | `#64748B` | `--gray-400` | Inactive icons, subtle text |
| **Neutral 500** | `#64748B` | `#94A3B8` | `--gray-500` | Secondary body text, subtext |
| **Neutral 600** | `#474747` | `#CBD5E1` | `--gray-600` | Body text |
| **Neutral 700** | `#334155` | `#E2E8F0` | `--gray-700` | Dark body text |
| **Neutral 800** | `#1E293B` | `#F1F5F9` | `--gray-800` | High-emphasis body text |
| **Neutral 900** | `#0F172A` | `#FFFFFF` | `--gray-900` | Headings, title text |
| **Neutral 950** | `#020617` | `#FFFFFF` | `--gray-950` | Darkest accents |

#### Background Tokens
* **Page Background**: `#FFFFFF` (Light) / `#000000` or `#05070a` (Dark)
* **Surface Background**: `#FFFFFF` (Light) / `#0e1015` (Dark)
* **Elevated Surface**: `#FFFFFF` (Light) / `#11141b` (Dark)
* **Card Background**: `#FFFFFF` (Light) / `#0e1015` (Dark)
* **Modal Background**: `#FFFFFF` (Light) / `#0e1015` (Dark)

#### Text Color Tokens
* **Heading**: `#090D16` (Light) / `#FFFFFF` (Dark)
* **Body**: `#1E293B` (Light) / `#E2E8F0` (Dark)
* **Muted**: `#475569` (Light) / `#CBD5E1` (Dark)
* **Disabled**: `#64748B` (Light) / `#64748B` (Dark)
* **Inverse**: `#FFFFFF` (Light) / `#000000` (Dark)

---

## 3. Typography System

### Primary Font Family
`font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`

### Type Scale Specification

| Element | Size (px / rem) | Font Weight | Line Height | Letter Spacing | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero Title** | `52px` / `3.25rem` | 800 (ExtraBold) | `1.15` | `-0.025em` | Normal |
| **H1 Heading** | `36px` - `42px` / `2.625rem` | 800 (ExtraBold) | `1.2` | `-0.02em` | Normal |
| **H2 Heading** | `28px` - `32px` / `2.0rem` | 800 (ExtraBold) | `1.25` | `-0.015em` | Normal |
| **H3 Heading** | `22px` - `24px` / `1.5rem` | 700 (Bold) | `1.3` | `-0.01em` | Normal |
| **H4 Heading** | `18px` - `20px` / `1.25rem` | 700 (Bold) | `1.35` | `0em` | Normal |
| **H5 Heading** | `16px` / `1.0rem` | 700 (Bold) | `1.4` | `0em` | Normal |
| **H6 Heading** | `14px` / `0.875rem` | 700 (Bold) | `1.4` | `0.02em` | Uppercase |
| **Body Large** | `16px` / `1.0rem` | 400 (Regular) / 500 | `1.6` | `0em` | Normal |
| **Body Medium** | `14px` / `0.875rem` | 400 (Regular) / 500 | `1.5` | `0em` | Normal |
| **Body Small** | `12px` / `0.75rem` | 400 (Regular) / 500 | `1.5` | `0em` | Normal |
| **Eyebrow / Tag** | `12px` / `0.75rem` | 800 (ExtraBold) | `1.2` | `0.08em` | Uppercase |
| **Button Label** | `14px` / `0.875rem` | 700 (Bold) / 800 | `1.0` | `0.02em` | Normal / Uppercase |
| **Badge Label** | `11px` - `12px` / `0.75rem` | 800 (ExtraBold) | `1.0` | `0.05em` | Uppercase |
| **Input Value** | `14px` / `0.875rem` | 500 (Medium) | `1.4` | `0em` | Normal |

---

## 4. Layout System

### Containers & Max Widths
* **Max Content Container**: `1280px` (`max-w-7xl` or `.container`)
* **Narrow Content Container**: `1024px` (`max-w-5xl`)
* **Modal / Dialog Container**: `480px` - `640px` (`max-w-md` / `max-w-xl`)

### Responsive Breakpoints
* **xs**: `<640px` (Mobile portrait)
* **sm**: `640px` (Mobile landscape / small tablet)
* **md**: `768px` (Tablet / Navigation drawer toggle point)
* **lg**: `1024px` (Laptop / Desktop navigation)
* **xl**: `1280px` (Desktop max container)
* **2xl**: `1536px` (Wide screen displays)

### Section Spacing Architecture
* **Desktop Section Padding**: `padding-top: 4.5rem; padding-bottom: 4.5rem;` (`py-18` or `py-16`)
* **Compact Section Padding**: `padding-top: 2.5rem; padding-bottom: 2.5rem;` (`py-10`)
* **Mobile Section Padding**: `padding-top: 2.5rem; padding-bottom: 2.5rem;`
* **Grid Gutters**: `1.5rem` (`24px` / `gap-6`) or `2.0rem` (`32px` / `gap-8`)

---

## 5. Spacing System

The project uses a unified 8px-based harmonized spacing scale with micro-step support:

```
--space-1: 0.5px
--space-2: 2.8px
--space-3: 5px
--space-4: 6px
--space-5: 8px     (xs)
--space-6: 10px
--space-7: 12px    (sm)
--space-8: 16px    (md)
--space-9: 20px
--space-10: 24px   (lg)
--space-11: 32px   (xl)
--space-12: 48px   (2xl)
--space-13: 64px   (3xl)
```

---

## 6. Component Hierarchy Tree

```
App
├── SiteProvider (Global State & CMS Settings)
├── CartProvider (RFQ Cart State)
├── ToastProvider (Floating Notifications)
├── Navbar (Sticky Glassmorphic Header)
│   ├── TopAnnounceBar (GST / Factory Plant Badge)
│   ├── Logo ("VISHAL ENTERPRISE")
│   ├── DesktopNavLinks
│   ├── QuickSearchTrigger
│   ├── ThemeToggle (Light / OLED Dark Toggle)
│   ├── QuoteCartTrigger (Item Counter Badge)
│   └── MobileMenuDrawer
├── Main Content Router
│   ├── Home Page
│   │   ├── HeroSection
│   │   ├── StatsStrip
│   │   ├── CategoryBentoGrid
│   │   ├── ProductShowcase
│   │   ├── IndustrialApplications
│   │   ├── ManufacturingCapacity
│   │   ├── SustainabilitySection
│   │   ├── Testimonials
│   │   └── ClosingCtaBanner
│   ├── Products Page
│   │   ├── ProductHero
│   │   ├── ProductSearchFilterBar
│   │   └── ProductGridCard
│   ├── Product Detail Page
│   │   ├── ImageGallery
│   │   ├── TechSpecsTable
│   │   ├── LoadCapacityWidget
│   │   └── RFQActionCard
│   ├── Manufacturing Page
│   │   ├── PlantOverviewHero
│   │   ├── ExtrusionCapacitySection
│   │   ├── QualityTestingSpecs
│   │   └── B2BSupplyChainBanner
│   ├── Sustainability Page
│   │   ├── ESGCommitmentHero
│   │   ├── CircularEconomyGrid
│   │   └── RecycledTonMetrics
│   ├── Contact Page
│   │   ├── ContactHero
│   │   ├── InteractiveEnquiryCard (Form)
│   │   ├── ContactDetailsList
│   │   ├── ImmediateAssistanceBanner
│   │   ├── GoogleMapSection
│   │   └── ContactFaqSection
│   ├── Quote Builder Page
│   │   ├── Step1_ProductSelect
│   │   ├── Step2_CustomSpecs
│   │   └── Step3_RFQSubmit
│   └── Admin Dashboard
│       ├── ProductManager
│       └── SiteSettingsCMS
└── Footer
    ├── BrandSummary
    ├── QuickLinksGrid
    ├── ProductCategoryList
    ├── ContactInfoColumn
    └── CopyrightRow
```

---

## 7. Component Design Specifications

### Navbar
* **Height**: `72px` (`var(--nav-h)`)
* **Background**: `rgba(255, 255, 255, 0.9)` (Light) / `#000000` (Dark)
* **Backdrop Filter**: `blur(12px)`
* **Border**: `1px solid #DADADA` (Light) / `1px solid rgba(255, 255, 255, 0.15)` (Dark)
* **Shadow**: `0 2px 10px rgba(0,0,0,0.05)`
* **Navigation Links**: Font weight 700, `14px`, transition color on hover (`#80cf23` / `#88e31b`).

### Buttons
All buttons share standardized 8px rounded corners (`border-radius: 8px`).

#### Variant 1: Primary (Navy Solid)
* **Background**: `#0B2F63`
* **Text**: `#FFFFFF`
* **Padding**: `0.75rem 1.5rem` (`12px 24px`)
* **Font**: Weight 700, `14px`
* **Hover State**: Background `#071E40` (Light) / `#88e31b` text `#000` (Dark hover)

#### Variant 2: Tech Accent (Green Shimmer)
* **Background**: `#80cf23` (Light) / `#88e31b` (Dark)
* **Text**: `#090D16` (Bold black)
* **Padding**: `0.75rem 1.5rem`
* **Font**: Weight 800, `14px`, uppercase tracking `0.05em`
* **Hover State**: Background `#73be1d` / `#9be835`, `transform: translateY(-2px)`

#### Variant 3: Secondary / Outline
* **Background**: `transparent` or `rgba(255, 255, 255, 0.05)`
* **Border**: `1px solid #DADADA` (Light) / `1px solid rgba(255, 255, 255, 0.2)` (Dark)
* **Text**: `#0F172A` (Light) / `#FFFFFF` (Dark)
* **Hover State**: Border-color `#80cf23`, background `rgba(128, 207, 35, 0.08)`

---

## 8. Cards System

### Card Specifications
* **Border Radius**: Harmonized `8px` (`--radius-card`)
* **Light Card Background**: `#FFFFFF`
* **Light Card Border**: `1px solid #DADADA`
* **Light Card Shadow**: `0 4px 12px rgba(0, 0, 0, 0.06)`
* **Dark Card Background**: `#0e1015`
* **Dark Card Border**: `1px solid rgba(255, 255, 255, 0.12)`
* **Dark Card Shadow**: `0 10px 30px rgba(0, 0, 0, 0.5)`
* **Hover Effect**: `transform: translateY(-3px); border-color: #80cf23; shadow: 0 12px 28px rgba(0, 0, 0, 0.12)`

---

## 9. Form Design System

### Form Field Specifications
* **Input Height**: `44px` (`2.75rem`)
* **Input Border Radius**: `8px`
* **Input Light Background**: `#F8FAFC`
* **Input Light Border**: `1px solid #DADADA`
* **Input Dark Background**: `#141720`
* **Input Dark Border**: `1px solid rgba(255, 255, 255, 0.18)`
* **Input Text Color**: `#0F172A` (Light) / `#FFFFFF` (Dark)
* **Input Placeholder Color**: `#94A3B8` (Light) / `#64748B` (Dark)
* **Focus Ring**: `border-color: #80cf23; box-shadow: 0 0 0 3px rgba(128, 207, 35, 0.25);`

---

## 10. Navigation Architecture

### Desktop Header Layout (`>= 1024px`)
* Left: Brand Logo (`VISHAL ENTERPRISE` with green dot emblem).
* Center: Categorized Dropdown Navigation (`Products`, `Manufacturing`, `Sustainability`, `About Us`, `Downloads`, `Contact`).
* Right: Global Search Trigger, Dark/Light Mode Switcher, Quick RFQ Cart Trigger, Direct Call Button.

### Mobile Navigation Layout (`< 1024px`)
* Compact Header bar (`72px`) with Logo, Cart Trigger, Theme Toggle, and Hamburger Button.
* Slide-out Drawer (`#090b10` in dark mode) with accordion category collapse, direct WhatsApp quick contact, and direct phone link.

---

## 11. Animation System

* **Hover Transitions**: `transition: all 200ms cubic-bezier(0.25, 1, 0.5, 1)`
* **Pulsing Icon Animation**: `@keyframes iconPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }`
* **Spin Animation**: `@keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`
* **Shimmer Effect**: `@keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }`

---

## 12. Responsive System

| Breakpoint | Target Device | Navigation | Layout Changes |
| :--- | :--- | :--- | :--- |
| **`<640px`** | Mobile Portrait | Drawer | 1 Column Grids, 100% Width Buttons |
| **`640px` - `768px`** | Mobile Landscape | Drawer | 2 Column Mini-Stats, 1 Column Cards |
| **`768px` - `1024px`** | Tablet | Drawer | 2 Column Product Grids, Compressed Hero |
| **`1024px` - `1280px`** | Laptop | Top Navbar | 3 Column Cards, Full Inline Menu |
| **`>=1280px`** | Widescreen Desktop | Top Navbar | Full 4 Column Bento Grids, Expanded Spec Tables |

---

## 13. Visual Effects

* **Glassmorphic Surface**: `background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(12px);`
* **OLED Dark Surface**: `background: #0e1015; border: 1px solid rgba(255, 255, 255, 0.12);`
* **Ambient Radial Glow**: `background: radial-gradient(circle, rgba(128, 207, 35, 0.1) 0%, transparent 70%);`

---

## 14. Iconography System

* **Primary Icon Library**: Lucide React (`lucide-react`)
* **Fallback Icon Set**: FontAwesome 6 Free SVG / Webfonts
* **Standard Icon Sizes**:
  * Micro Badge: `14px` (`w-3.5 h-3.5`)
  * Normal Body/Button: `18px` - `20px` (`w-4 h-4` / `w-5 h-5`)
  * Feature Box / Card Icon: `24px` - `32px` (`w-6 h-6` / `w-8 h-8`)
* **Stroke Width**: `2px` (default) or `2.5px` (for high-emphasis badges)

---

## 15. Image System

* **Product Cards Aspect Ratio**: `4 / 3` or `1 / 1` (Square)
* **Hero Banners**: Aspect ratio `16 / 9` or fixed height `380px` - `480px`
* **Object Fit**: `object-fit: cover` with fallback placeholder backgrounds
* **Border Radius**: Harmonized `8px` rounded corners

---

## 16. Page-by-Page Hierarchy

1. **Home Page**:
   `Hero -> StatsStrip -> CategoryBento -> ProductShowcase -> SustainabilitySpotlight -> CapacityBanner -> Testimonials -> CTABanner`
2. **Products Page**:
   `PageHero -> FilterBar -> ProductGrid -> ProductCompareTable -> RFQFooterCard`
3. **Product Detail Page**:
   `Breadcrumbs -> Gallery & Summary -> TechnicalSpecsTable -> LoadCapacityCalculator -> RelatedProducts`
4. **Manufacturing Page**:
   `PlantHero -> ExtrusionCapacity -> QualityTesting -> B2BSupplyChainGrid`
5. **Sustainability Page**:
   `ESGHero -> CircularEconomyPillars -> TonsRecycledCalculator -> CertificationBadges`
6. **Contact Page**:
   `ContactHero -> InteractiveEnquiryForm -> ContactDetails -> ImmediateAssistanceBanner -> MapSection -> FAQ`

---

## 17. CSS Architecture

The application uses **Tailwind CSS v4** combined with **CSS Custom Properties** defined in `tokens.css` and dark mode theme rules in `dark-theme.css`:

* `@import "tailwindcss";` in `tokens.css`.
* Dual theme switching via `html.dark` or `[data-theme="dark"]`.
* Atomic class overrides directly on components for 100% style stability.

---

## 18. Design Patterns

* **Elevated B2B Card**: High-contrast white/dark card with 1px border and hover lift.
* **Badge Eyebrow**: Uppercase bold text tag with solid/subtle tinted background.
* **Quick RFQ Drawer**: Side-panel summary of selected B2B items with direct quotation submission.

---

## 19. Accessibility Audit (WCAG 2.2 AAA)

* **Contrast Ratio**: `#FFFFFF` text on `#0B2F63` (Contrast Ratio > 10:1 AAA compliant).
* **Dark Mode Contrast**: `#FFFFFF` text on `#0e1015` (Contrast Ratio > 15:1 AAA compliant).
* **Tech Green Accent**: `#80cf23` on `#000000` dark backgrounds provides a 10.5:1 contrast ratio.
* **Focus Visibility**: Clear focus rings (`outline: 2px solid #80cf23; outline-offset: 2px`) for keyboard navigation.

---

## 20. COMPLETE DESIGN BLUEPRINT

*(Copy-paste ready specification for AI studio / developer recreation)*

### A. Root CSS Tokens Configuration (`tokens.css`)

```css
:root {
  /* Font Family */
  --font-family-primary: 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Colors - Light Theme */
  --navy: #0B2F63;
  --navy-dark: #071E40;
  --brand: #80cf23;
  --brand-hover: #73be1d;
  --brand-light: #f2fbe8;

  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-200: #DADADA;
  --gray-300: #CBD5E1;
  --gray-500: #64748B;
  --gray-900: #0F172A;

  /* Surfaces & Borders */
  --bg-page: #FFFFFF;
  --bg-card: #FFFFFF;
  --border-card: #DADADA;

  /* Radius */
  --radius-card: 8px;
  --radius-btn: 8px;
  --radius-input: 8px;
}

/* Dark Theme Overrides */
html.dark, :root[data-theme="dark"] {
  --bg-page: #05070a;
  --bg-card: #0e1015;
  --border-card: rgba(255, 255, 255, 0.12);
  --gray-900: #FFFFFF;
  --gray-500: #CBD5E1;
  --brand: #88e31b;
}
```

### B. Standardized Card Component Template

```jsx
<div className="p-8 rounded-2xl bg-white dark:bg-[#0e1015] border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl text-slate-900 dark:text-white transition-all duration-300 relative overflow-hidden">
  {/* Ambient radial glow */}
  <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
  
  <div className="relative z-10">
    <span className="inline-block px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-[#88e31b] border border-emerald-200 dark:border-emerald-500/40 text-xs font-bold uppercase tracking-wider mb-3">
      Specification Tag
    </span>
    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
      Component Title
    </h3>
    <p className="text-slate-700 dark:text-slate-200 text-sm mt-2 leading-relaxed">
      Detailed technical description goes here with full contrast readability.
    </p>
  </div>
</div>
```

---
*End of Design System Documentation (`design.md`)*
