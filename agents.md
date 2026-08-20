# Agent Environment & Codebase Map

Use this file as a reference to avoid running repetitive directory listing (`list_dir`) and search (`grep_search`) commands.

---

## 📂 Full Codebase Architecture

```
react-website-vishal-enterpise---glass/
│
├── package.json                # Root: Express server + bcryptjs, sharp, multer, cors, etc.
├── vercel.json                 # Vercel deployment config (rewrites, headers, functions)
├── run_project.bat             # Windows script to start dev servers concurrently
├── stop_project.bat            # Windows script to stop dev servers by active PIDs
├── .env.example                # Environment variable template
│
├── api/
│   └── index.js                # Vercel serverless entry point — wraps Express app
│
├── scripts/
│   └── build.js                # Root build orchestrator — runs frontend build
│
├── data/
│   └── vishal_enterprise.db    # SQLite database file (local/Vercel fallback)
│
├── apps/api/                   # ── Backend Express API Server ──
│   ├── index.js                # Express app bootstrap — middleware, global error handler, static files
│   │
│   ├── config/
│   │   └── database.js         # LibSQL/Turso DB dual-mode database init, schema DDL, migration & hashing triggers
│   │
│   ├── middleware/
│   │   ├── auth.js             # HMAC-SHA256 token verification, login rate limiter with periodic cleanup
│   │   ├── validate.js         # Generic express-validator checker gate
│   │   └── errorHandler.js     # Standardized JSON error response formatting middleware
│   │
│   ├── validators/             # Request parameter DTO validation definitions
│   │   ├── auth.js             # Login / password change schemas
│   │   ├── category.js         # Category CRUD validators
│   │   ├── inquiry.js          # Inquiry submission schemas
│   │   └── product.js          # Product insert / update schemas
│   │
│   ├── routes/
│   │   ├── api.js              # Central router — mounts all routes, 3 rate limiters
│   │   ├── auth.js             # POST /login, PUT /password, GET /me — secure bcryptjs verification
│   │   ├── categories.js       # CRUD with 120s TTL cache, X-Cache headers
│   │   ├── company.js          # GET/POST single-row company_info (JSON blob)
│   │   ├── content.js          # GET/POST site_content key-value CMS, batch upsert
│   │   ├── inquiries.js        # POST /contact + /inquiries, GET list, DELETE by type
│   │   ├── stats.js            # GET /stats endpoint with recycled calculations
│   │   ├── media.js            # GET /media list, POST /media record, GET /certifications
│   │   ├── products.js         # Full CRUD, cache, spec auto-seeding, published filter, category JOIN
│   │   └── upload.js           # POST /upload/images — Multer + Sharp WebP + thumb/medium variants
│   │
│   ├── utils/
│   │   ├── cache.js            # In-memory Map cache with TTL (default 60s), RegExp invalidation
│   │   └── specificationSeeder.js  # Infers product specs from name/desc/category keywords
│   │
│   ├── scripts/
│   │   ├── seed.js             # Seeds 2 products + 5 CMS entries (uses raw sqlite3)
│   │   └── backfillSpecifications.js  # Backfills inferred specs for products missing them
│   │
│   └── database.sqlite         # Legacy SQLite file (fallback)
│
├── apps/web/                   # ── Frontend React App (Vite 7 + React 19 + React Router 7) ──
│   ├── package.json            # react 19.2, react-router-dom 7.13, quill 2.0.3, dompurify
│   ├── vite.config.js          # Dev proxy (/api → :3000), manual chunks (admin isolated), ES2018
│   ├── index.html              # SPA shell with Font Awesome CDN, meta tags, theme-color
│   │
│   ├── scripts/
│   │   └── copy-uploads.mjs    # Post-build: copies uploads/ into dist/uploads/
│   │
│   ├── src/
│   │   ├── main.jsx            # Entry: StrictMode, scrollRestoration = 'manual'
│   │   ├── App.jsx             # Router, PublicLayout, ErrorBoundary & NotFound fallback routers
│   │   ├── index.css           # Global design system — variables, utilities, hardware-accelerated transitions
│   │   │
│   │   ├── context/
│   │   │   └── SiteContext.jsx # SiteProvider + useSite() hook — fetches /api/company + /api/content
│   │   │
│   │   ├── hooks/
│   │   │   └── useDocumentTitle.js  # Sets document.title + meta description dynamically
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js          # Unified central fetch client (attaches tokens, standard header parsing)
│   │   │   ├── parsers.js      # Clean html string-stripping and inquiry formatting helpers
│   │   │   ├── formatters.js   # Dynamic currency, unit, and date representations
206:        │   ├── whatsapp.js     # WhatsApp click-to-chat url composer
│   │   │   └── useApi.js       # Centralized API fetch custom hook
│   │   │
│   │   ├── data/
│   │   │   └── home.js         # Dynamic metric arrays and business stat configurations
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky pill navbar, WhatsApp FAB, mobile drawer
│   │   │   ├── Navbar.module.css
│   │   │   ├── Footer.jsx      # 4-column footer, newsletter grid
│   │   │   ├── Footer.module.css
│   │   │   ├── OptimizedImage.jsx # Auto WebP srcSet image renderer
│   │   │   ├── ErrorBoundary.jsx  # Global runtime error boundary panel
│   │   │   ├── ErrorBoundary.module.css
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── AdminLayout.jsx      # Auth guard, collapsible sidebar layout
│   │   │       ├── AdminLayout.module.css
│   │   │       ├── AdminTable.module.css # Shared table, forms, drawer & overlay rules for all admin pages
│   │   │       ├── RichTextEditor.jsx   # Quill 2.x wrapper
│   │   │       └── RichTextEditor.module.css
│   │   │
│   │   └── pages/
│   │       ├── Home.jsx             # CMS-integrated sections, hero carousel, dynamic counters
│   │       ├── Home.module.css
│   │       ├── About.jsx            # Mission, vision, timeline milestones, certs
│   │       ├── About.module.css
│   │       ├── Products.jsx         # Category filter tabs
│   │       ├── Products.module.css
│   │       ├── ProductDetail.jsx    # Specs tabs, image zoom gallery, inquiry modal
│   │       ├── ProductDetail.module.css
│   │       ├── Contact.jsx          # Form, map embed
│   │       ├── Contact.module.css
│   │       ├── NotFound.jsx         # 404 Fallback routing card
│   │       ├── NotFound.module.css
│   │       │
│   │       └── admin/
│   │           ├── Dashboard.jsx         # Stats, inquiries activity timeline
│   │           ├── Dashboard.module.css
│   │           ├── Login.jsx             # Split layout login
│   │           ├── Login.module.css
│   │           ├── AdminSettings.jsx     # Password change form
│   │           │
│   │           ├── products/
│   │           │   ├── AdminProducts.jsx      # Table, search, right preview drawer
│   │           │   └── AdminProductEditor.jsx # Tabbed form (details, specs, FAQs)
│   │           │
│   │           ├── categories/
│   │           │   ├── AdminCategories.jsx    # Categories list view
│   │           │   └── AdminCategoryEditor.jsx # Category parameters template builder
│   │           │
│   │           ├── inquiries/
│   │           │   ├── AdminInquiries.jsx     # Inquiries ledger log
│   │           │   └── AdminInquiryDetail.jsx # inquiry WhatsApp details navigator
│   │           │
│   │           ├── media/
│   │           │   └── AdminMedia.jsx         # Media categories explorer
│   │           │
│   │           └── content/
│   │               ├── SiteContent.jsx        # Tree outline router shell
│   │               ├── SiteContent.module.css # Height-bounded split scroll panels stylesheet
│   │               ├── CompanyForm.jsx        # Business profile form
│   │               ├── SectionEditor.jsx      # Generic CMS content editor
│   │               ├── TimelineEditor.jsx     # Milestone list builder
│   │               └── TeamEditor.jsx         # Executive team profiles list
│
└── uploads/                    # ── Local Media Attachments ──
    └── products/
        ├── pallets/            # Pallet product webp images
        ├── lumber/             # Plastic lumber assets
        ├── garden-bench/       # Bench product assets
        ├── plastic-table/      # Table product assets
        ├── categories/         # Category thumbnail images
        ├── company/            # Company logo/branding
        └── content/            # CMS content images
```

---

## 🔗 API Endpoints

### Public (no auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Product list (published only), filterable, cached 60s |
| `GET` | `/api/products/:id` | Single product with specs/features/faqs, cached 120s |
| `GET` | `/api/categories` | Active categories, cached 120s |
| `GET` | `/api/categories/:id` | Single category |
| `GET` | `/api/company` | Company info (phone, WhatsApp, address, map), cached 5min |
| `GET` | `/api/content` | All CMS key-value content, cached 5min |
| `GET` | `/api/stats` | Dashboard stats (counts + hardcoded marketing numbers) |
| `GET` | `/api/certifications` | Certification records |
| `POST` | `/api/contact` | Contact form submission |
| `POST` | `/api/inquiries` | Product inquiry / quote request |
| `GET` | `/health` | Health check → `200 OK` |

### Admin (requires auth token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login → returns `ve1.*` HMAC token |
| `GET` | `/api/auth/me` | Token verification |
| `PUT` | `/api/auth/password` | Change password |
| `POST` | `/api/products` | Create product (multipart) |
| `PUT` | `/api/products/:id` | Update product (multipart) |
| `DELETE` | `/api/products/:id` | Delete product |
| `POST` | `/api/categories` | Create category |
| `PUT` | `/api/categories/:id` | Update category |
| `DELETE` | `/api/categories/:id` | Delete category |
| `POST` | `/api/company` | Update company info |
| `POST` | `/api/content` | Batch upsert CMS content |
| `GET` | `/api/inquiries` | List all inquiries + contact messages |
| `DELETE` | `/api/inquiries/:type/:id` | Delete inquiry by source type |
| `GET` | `/api/media` | List media files |
| `POST` | `/api/media` | Register media record |
| `POST` | `/api/upload/images` | Upload images (up to 10, Sharp WebP conversion) |

### Rate Limits
- **General**: 200 req / 15 min for all API routes
- **Contact/Inquiries POST**: 10 req / hour
- **Auth Login**: 10 req / 15 min

---

## 🎨 Design System (`index.css`)

### Typography
- **Body**: `Plus Jakarta Sans` (300–800)
- **Display**: `Plus Jakarta Sans` / `Sora`
- **Import**: Google Fonts CDN

### Color Palette
| Variable | Value | Usage |
|----------|-------|-------|
| `--brand` | `#9EC037` | Accent lime green |
| `--brand-dark` | `#7d9e26` | Hover/active brand |
| `--brand-light` | `#f5f9e8` | Light brand background |
| `--dark` | `#05283F` | Navy — headings, hero backgrounds |
| `--dark2` | `#09334f` | Hero gradient endpoint |
| `--dark3` | `#0c3e60` | Deeper dark variant |
| `--text-primary` | `#05283F` | Body text |
| `--text-secondary` | `#334e68` | Secondary text |
| `--text-muted` | `#627d98` | Muted/caption text |
| `--bg-light` | `#F7F9F6` | Page background |

### Spacing & Layout
| Variable | Value |
|----------|-------|
| `--nav-h` | `80px` |
| `--section-py` | `6rem` (→ `3rem` on mobile) |
| `--radius-sm` | `8px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `18px` |
| `--radius-xl` | `24px` |
| `.container` | `min(1280px, 100% - 3rem)` centered |

### Shadows
- `--shadow-sm/md/lg/xl` — layered depth system

### Utility Classes
- `.container` — centered max-width
- `.section`, `.section--dark/light/brand` — page sections with padding
- `.section-eyebrow`, `.section-title`, `.section-header`, `.section-desc` — section headings
- `.grid-2/3/4`, `.grid-auto`, `.grid-auto-sm` — responsive grids
- `.btn--primary/outline/outline-light/dark/ghost/lg/sm` — button variants
- `.card` — card container
- `.badge` — label badge
- `.form-group/label/input/select/textarea` — form elements

### Scroll Reveal System
- `[data-reveal]` attributes on sections → `reveal-init` → `reveal-in` class toggle
- Direction variants: `data-reveal="left"` / `data-reveal="right"` / default (up)
- IntersectionObserver in `App.jsx` with threshold `0.01`
- Staggered grid children: 60ms delay increments (nth-child 1–6+)
- Hardware-accelerated `translate3d` transforms
- Respects `prefers-reduced-motion`
- `body.is-scrolling` disables pointer-events during scroll (hover-capable only)

### Icon System
- Font Awesome 6 (CDN in `index.html`) — solid + brands
- No SVG icon components

---

## 🗄️ Database Schema (9 tables)

| Table | Key Columns | Notes |
|-------|-------------|-------|
| `products` | id, name, slug, category_id, price, oldPrice, discountRate, description, specifications (JSON), features (JSON), faqs (JSON), image (JSON array), published | Main product catalog |
| `categories` | id, name, slug, description, image, fields (JSON array) | `fields` defines custom spec templates per category |
| `users` | id, username, password, role | Hashed securely using `bcryptjs` |
| `site_content` | key (UNIQUE), value, type, section | Flat CMS key-value store |
| `company_info` | id, data (JSON blob) | Single-row company config |
| `inquiries` | id, name, email, phone, company, message, product_id, category_id, source | Quote requests |
| `contact_messages` | id, name, email, phone, company, message, inquiryType | Contact form submissions |
| `media` | id, filename, url | Media library records |
| `certifications` | id, name, description | Certification records |

### Database Modes
- **Production (Vercel)**: Turso/LibSQL via `TURSO_URL` + `TURSO_AUTH_TOKEN`
- **Local dev**: SQLite file at `data/vishal_enterprise.db`
- **Vercel fallback**: Copies DB to `/tmp` on cold start (read-only FS workaround)

---

## 🔧 Build & Deployment

### Dev Commands
```bash
npm run dev           # Start Express server (nodemon)
npm run dev:frontend  # Start Vite dev server
npm run dev:full      # Both concurrently
npm run seed:base     # Seed database
npm run seed:specs    # Backfill specifications
```

### Build Pipeline
```bash
npm run build         # → scripts/build.js → cd frontend && npm install && npm run build
                      #   → vite build → copy-uploads.mjs (copies uploads/ to dist/uploads/)
```

### Vercel Deployment
- `vercel.json` defines rewrites: `/api/*` → serverless function, `/*` → SPA fallback
- Admin chunk is code-split (never loaded by public visitors)
- Static assets cached 1 year (immutable), uploads cached 1 week
- Functions: 30s timeout, 1024MB memory

### Environment Variables
| Variable | Purpose |
|----------|---------|
| `TURSO_DATABASE_URL` / `TURSO_URL` | Turso database URL |
| `TURSO_AUTH_TOKEN` | Turso auth token |
| `JWT_SECRET` / `AUTH_TOKEN_SECRET` | Token signing secret |
| `JWT_EXPIRY` | Token TTL (default `12h`) |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `ALLOWED_ORIGINS` | CORS whitelist (comma-separated) |
| `ENABLE_SHARP` | Enable Sharp image processing |
| `UPLOADS_DIR` | Custom uploads directory |
| `VITE_API_URL` | Dev proxy target (default `http://localhost:3000`) |

---

## 🧩 Key Architectural Patterns

1. **CMS-Driven Content**: All public page text uses `c(key, fallback)` / `co(key, fallback)` from `SiteContext`. Admin edits via `SiteContent.jsx` → flat key-value store.
2. **Section Toggleability**: Public sections can be enabled/disabled via CMS keys (e.g., `about_hero_enabled`, `show_contact_form`).
3. **Image Pipeline**: Upload → Multer → Sharp WebP conversion → `_thumb` (400px) + `_medium` (800px) variants → JSON array in DB.
4. **Caching**: In-memory TTL cache (server) + HTTP `Cache-Control` + `X-Cache` headers. Invalidated on writes.
5. **Auth**: Custom HMAC-SHA256 tokens (`ve1.*` format), stored in `localStorage("admin_token")`, 12h TTL. No refresh tokens.
6. **Code Splitting**: React.lazy for all pages. Admin pages isolated into a separate Vite chunk (never downloaded by public visitors).
7. **SEO**: JSON-LD structured data (Product, BreadcrumbList, LocalBusiness), `useDocumentTitle` hook, meta description, theme-color.
8. **B2B Lead Funnel**: Quote modals (Home + ProductDetail), contact form, WhatsApp integration (FAB + inline links).
9. **Category-Driven Specs**: Each category defines a `fields[]` array of specification templates. Product editor dynamically renders spec inputs based on selected category.
10. **Repeatable CMS Items**: Timeline milestones and team members use index-based flat keys (`tl_N_year`, `team_N_name`) with add/edit/delete via modal popup in `SiteContent.jsx`.

---

## 📐 Detailed Page Layouts & Style Blueprint

This section provides an exact visual and structural blueprint of every page in the application, outlining the layout coordinates, typography, responsive styling, and custom interactive features.

### 1. Global Components: Header (Navbar) & Footer

#### A. Sticky Pill Header (Navbar)
* **Layout Structure**: A full-width horizontal header container wrapping a centered, padded, rounded-pill navigation bar floating above the content.
* **Sticky Mechanics**:
  - Unscrolled: Transparent background, flush with top.
  - Scrolled (>40px): Translates slightly down, adds background blur (`backdrop-filter: blur(12px)`), `#ffffff` with 80% opacity, micro shadow `var(--shadow-md)`.
* **Left Section (Branding)**: Left-aligned brand logo or typography styled in `--dark` (`#05283F`), 1.25rem size, heavy weight (800) alongside a leaf icon denoting sustainable industrial products.
* **Center Section (Nav Links)**:
  - Flexbox container displaying `Home`, `Products` (dropdown trigger), `About`, `Gallery`, `Contact` links.
  - Interactive states: Hover transitions text to `--brand` (`#9EC037`) with a matching animated under-line indicator.
  - Active page states: Colored under-line indicator using CSS variables.
* **Dropdown Menu (Mega Menu Category Drawer)**:
  - Triggered via Hover/Focus on "Products" button.
  - Layout: `display: flex; flex-direction: column; gap: 1.25rem`. Absolute positioned panel, `border-radius: 16px`, white background `#ffffff`, border `1px solid rgba(5,40,63,0.08)`, shadow `var(--shadow-xl)`.
  - Content Layout (`.megaMenuGrid`): CSS Grid displaying multiple vertical columns (`grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 1.5rem`).
    - Column Head: Category Link (`--dark`, uppercase, font weight 800, small green accent border-bottom).
    - Links List: Up to 4 product links per column (`--text-secondary`, font size 0.85rem, transitions on hover).
    - "View All (+N)" item: Shown when categories have more than 4 products. Styled in `--brand` with a micro arrow-right icon.
  - Menu Footer (`.megaMenuFooter`): Flex-container at the bottom right (`display: flex; justify-content: flex-end; align-items: center`), separated by a thin `#05283F` transparent divider border (`1px solid rgba(5,40,63,0.06)`).
    - Contains the primary **View All Products** action link (`.viewAllMainLink`) in `--brand` (`#9EC037`) bold text (weight 700) with a right chevron/arrow (`fa-arrow-right`). Hovering translates the arrow right by `4px` (`transform: translateX(4px)`).
* **Right Section (Search & Contacts)**:
  - Rounded search input (`border-radius: 20px`, light background `#f1f3f5`, left magnifying glass icon).
  - Floating action buttons / Mobile navigation toggle triggers.

#### B. Comprehensive B2B Footer
* **Layout Structure**: 4-column responsive grid (`.grid-4`) wrapping a heavy background (`--dark`, `#05283F`), spacious vertical padding (`padding: 4rem 1.5rem`).
* **Column 1 (Corporate Bio)**:
  - Big bold logo in `#ffffff`, tagline explaining B2B recycled plastic leadership, and social media handles mapped as circular font-awesome icons.
* **Column 2 (Products Overview)**:
  - Quick-links directory to key categories (Pallets, Lumber, Benches, Tables).
* **Column 3 (Corporate Pages)**:
  - Navigation links (About Us, Sustainability Journey, Contact, Head Office).
* **Column 4 (B2B Newsletter & Head Office Contact)**:
  - Quick contact information (Direct Phone, Email, WhatsApp link).
  - Inline Newsletter Form: Custom dark-themed input with a right-aligned subscribe button (`--brand`, hover transforms).
* **Sub-Footer**: Center-aligned copyright banner separated by a thin line, featuring terms of service, privacy policies, and a back-to-top micro floating button.

---

### 2. Home Page Layout

#### Section 2.1: Hero Carousel Banner (`.hero`)
* **Layout Style**: Absolute full-screen bounds, flex-alignment to center. Outer frame is `#05283F` dark gradient endpoints.
* **Visual Controls**:
  - Image Slides: High-resolution industrial slides representing manufacturing processes.
  - Navigation Arrows: Left and right chevron buttons floating on screen edges, rounded outlines, semi-transparent backgrounds transforming to solid white on hover.
  - Active Dot Indicators: Centered at the bottom edge, indicating active slides, scaling up on selection.
  - Headline block: Bold, capitalized typography (`font-size: 3rem` descending, high contrast white `#ffffff`), green sub-headers, and action buttons leading to product catalogs and B2B inquiry modals.

#### Section 2.2: Industrial Client Banner (`.trustedBy`)
* **Layout Style**: Tight vertical grid, flexible row wrapper (`display: flex; justify-content: space-around; align-items: center; opacity: 0.6`).
* **Elements**: Horizontal scroll of monochrome corporate logs representing top logistics, chemical, and municipal clients.

#### Section 2.3: Products Showcase Bento Grid (`ProductsShowcase`)
* **Layout Style**: Modern bento grid layout (1 col mobile, 2 cols tablet, 3 cols desktop) displaying 6 products with a `grid-cols-3` structure and `aspect-square` cards.
* **Featured Card (Card 01)**:
  - Spans 2 columns and 2 rows on large screens (`lg:col-span-2 lg:row-span-2`).
  - Includes specific product feature pills (e.g. Waterproof, UV Resistant).
  - High-visibility action button ("Explore Collection") with solid white border and dark text (`#0f172a`) in both light and dark modes.
* **Standard Cards (02-06)**:
  - Square aspect ratio (`aspect-square`), top-right circular arrow action buttons.
  - Image: Product image positioned behind the content (`absolute inset-0 z-0 opacity-100`).
  - Overlay: Bottom-aligned pure black gradient (`from-black/90 via-black/60 to-transparent`) for extremely high text contrast.
  - Text: Drop shadows added to title and description for visibility in light and dark modes.

#### Section 2.4: Features Section (`FeaturesSection`)
* **Layout Style**: Grid highlighting key B2B value propositions (e.g., sustainability, durability, cost savings).

#### Section 2.5: Industries Served Grid (`IndustriesGrid`)
* **Layout Style**: Responsive grid detailing target sectors like Warehousing, Chemical Plants, Marine Logistics.

#### Section 2.6: CTA Bottom Banner (`HomeCtaSection`)
* **Layout Style**: Full-bleed bottom banner driving users to contact forms and quote requests.

---

### 3. About Page Layout

#### Section 3.1: Impact Hero Header (`.hero`)
* **Layout Style**: Split horizontal layout. Left: Deep description of industrial timber depletion and the transition to infinite-lifespan recycled plastics. Right: Multi-layered background showing high-quality recycled pellets.

#### Section 3.2: Mission, Vision & Corporate Core (`.impactSection`)
* **Layout Style**: 3-grid vertical alignment (`display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem`).
* **Inside Elements**: Rounded boxes styled with high contrast light-gray borders (`1px solid rgba(5,40,63,0.06)`). Each card represents Mission, Vision, and B2B Integrity with a unique green top outline accent.

#### Section 3.3: Timeline Milestones (`.timelineSection`)
* **Layout Style**: Left-aligned vertical track line (`border-left: 2px solid var(--brand)`).
* **Timeline Cards**: Alternating left-right positioning based on scroll reveal triggers. Each item represents a key growth year (e.g. 2012 Foundation, 2018 Pellets Line, 2024 Advanced Extrusion Extenders), styled with year eyebrows in `--brand` heavy text.

#### Section 3.4: B2B Certifications Registry (Standards)
* **Layout Style**: Centered, spacious grid detailing ISO 9001:2015, ASTM D6111 structural parameters, RoHS Compliance, and green manufacturing stamps. Features a micro print option for downloading industrial compliance files.

#### Section 3.5: Leadership & Executive Team (`.teamSection`)
* **Layout Style**: 4-column profile grid. Clean, high-resolution portrait cards wrapping a smooth black-to-transparent gradient cover, indicating Executive Name, Role, and LinkedIn shortcut.

#### Section 3.6: Founder's Vision Statement (`.founderSection`)
* **Layout Style**: Deep single-column rich letter styled in editorial typography, centered profile signature, and high-quality quote-marks in `--brand` accent color.

---

### 4. Product Catalog Page (`/products`)

#### Section 4.1: Catalog Banner (`.hero`)
* **Layout Style**: Compact, vertical text alignment centered over a light industrial mesh overlay. Heading displays overall product count.

#### Section 4.2: Main Explorer Catalog Workspace (`.catalogContainer`)
* **Layout Style**: Left Sidebar + Main Product Display Workspace.
* **Left Sidebar (Desktop Only, Responsive Mobile Top Sheet)**:
  - Search bar: Full width, dark placeholder, magnify icon.
  - Category Selection Checklist: Radio/Checkbox buttons mapped to specific IDs.
  - Specifications Filter Range: Sliders or checkboxes for dimensions and weight.
* **Main Product Display**:
  - Horizontal filter pills: Showing active filters (e.g. "Recycled Plastic Pallets ×").
  - 3-Column Product Grid: Grid of product cards (`grid-template-columns: repeat(3, 1fr)`).
    - Card: Raised shadow on hover, border `#05283F` (5% transparent).
    - Image: Upper 60% of card, aspect ratio 1:1, zoom scale hover.
    - Info: Bottom 40%. Includes product name, Category badge, Minimum Order Quantity (MOQ) indicator, and action button leading to Product Details.

#### Section 4.3: Procurement Flow Overview (`.procurementSection`)
* **Layout Style**: 4-stage block process showing procurement pipelines: Volume Request -> Sample Testing -> Customized Molding -> Multi-point Logistical Dispatch.

---

### 5. Product Detail Page (`/products/:id`)

#### Section 5.1: Split Gallery & Live Estimator Workspace (`.layout`)
* **Layout Structure**: 2-Column Split Pane (`grid-template-columns: 1fr 1.1fr; gap: 3rem`).
* **Left Column (Image Gallery Panel - Inspired by Live Reference)**:
  - **Main Image Container (`.mainImgContainer`)**:
    - Outer frame: High-resolution image canvas with precise `#ffffff` background and a subtle shadow (`var(--shadow-sm)`).
    - Hover-Zoom Engine (`ImageZoom`): Interactive script mapping cursor position to a magnified background image layer.
    - **Floating Fullscreen Action Button (`.fullscreenBtn`)**:
      - Absolute positioning: **Precisely positioned at bottom right** (`right: 24px; bottom: -22px`).
      - Design: Circular format (`width: 44px; height: 44px; border-radius: 50%`), white background `#ffffff`, solid border `1.5px solid rgba(158,192,55,0.15)`. Icon inside is a clean Font Awesome magnifying glass (`fa-magnifying-glass`) in `--brand` (`#9EC037`).
      - Hover state: Expands scale (`transform: scale(1.08)`), intensifies border color to `--brand`, and adds green glow shadow (`0 6px 16px rgba(158, 192, 55, 0.2)`).
  - **Thumbnail Navigation Carousel (`.thumbRow`)**:
    - Margin: Raised spacing below main image (`margin-top: 1.5rem`).
    - Carousel row layout: Horizontal flex wrapper (`display: flex; gap: 0.85rem; align-items: center; justify-content: center`).
    - **Previous/Next Floating Arrow Navigation Controls (`.thumbNav`)**:
      - Position: Absolute placement on left and right ends (`top: 50%; transform: translateY(-50%)`). Previous arrow (`.thumbNavPrev`) positioned at `left: -12px`; Next arrow (`.thumbNavNext`) positioned at `right: -12px`.
      - Design: Circular shape (`width: 38px; height: 38px; border-radius: 50%`), deep pine-forest background `#2a3c30` with solid white arrows (`#ffffff`), zero border. Drops deep overlay shadows (`box-shadow: 0 3px 8px rgba(0,0,0,0.2)`).
      - Hover state: Deeper background `#1e2b22`, scales up, and drops heavy shadow.
    - **Thumb Swatches (`.thumb`)**:
      - Size: Square aspect ratio (`width: 76px; height: 76px`), zero border-radius (`border-radius: 0px`), light grey frame (`border: 1.5px solid rgba(5,40,63,0.08)`).
      - Active State (`.thumbActive`): Solid green border (`border: 2.5px solid #9EC037 !important`), zero shadow.
* **Right Column (B2B Product Parameters & Interactive Live ESG Impact Estimator)**:
  - Header: Breadcrumbs mapping, product title in heavy `--dark` (`font-size: 2.25rem`), Category badge.
  - Metric row: Minimum Order Quantity indicator (`.qtyValue`).
  - **Interactive B2B ESG Impact Estimator Card (`.esgEstimatorCard`)**:
    - Outer frame: Soft background tint (`#fbfcfb`), dashed green border (`border: 1.5px dashed rgba(158, 192, 55, 0.35)`), rounded corners (`14px`).
    - Top Heading: Leaf icon followed by "ESG Impact Estimator" title and subtext.
    - Input Row: Displays "Quote Quantity (Units):" next to an interactive counter box. Includes decrement (`-`) and increment (`+`) buttons around a numeric field updating states dynamically.
    - Output Dashboard (`.esgGrid`): 4-cell matrix showing live mathematical results based on chosen quantity:
      1. *Plastic Waste Diverted* (Recycled weight in kg).
      2. *CO₂ Saved Equivalent* (CO2 kg offsets).
      3. *Wood Trees Saved* (Equivalent wood-lumber saved).
      4. *Bottles Diverted* (Total recycled HDPE containers calculated).
  - **Action Button Deck**:
    - Primary Button: B2B Quote inquiry popup modal trigger (`btn--primary`).
    - Secondary Button: Green WhatsApp Direct Contact (`#25d366` background, white icon/text, transforms to hover dark-green `#20ba5a`).
    - **Technical Data Sheet (TDS) Button (`.datasheetBtn`)**:
      - Styled as full-width transparent button with light grey borders (`border: 1.5px solid rgba(5,40,63,0.12)`). Contains a red PDF icon (`fa-file-pdf`) and text: "VIEW TECHNICAL SPEC SHEET (TDS)". Hover states add green outlines and match branding.

#### Section 5.2: Tabs Panel (`.tabsContainer`)
* **Layout Style**: Segmented buttons at top (Specifications, Features, FAQs), with an active green bar line.
* **Specifications Tab**: Tabular key-value lists displaying exact dimensions, load capabilities, materials, and dispatch details.
* **Features Tab**: Responsive list cards detailing UV resistance, modular designs, and industrial performance.
* **FAQs Tab**: Accordion lists with expanding FAQ dropdowns.

#### Section 5.3: Technical Data Sheet Modal (`TechnicalSpecsSheetModal`)
* **Layout Style**: Overlay with centered floating paper-styled technical card.
* **Content Details**: Official corporate headers, document ID, SKU code, Material composition specifications, UV stabilizers, Water absorption, Lifespan details, Custom specs, and a prominent print/download trigger.

---

### 6. Contact Page Layout

#### Section 6.1: Directions & Contacts Hero Header
* **Layout Style**: Full horizontal grid with overlay coordinates.

#### Section 6.2: Dual Split Information Workspace
* **Layout Style**: Grid layout split 50/50.
* **Left Panel (Inquiry Form)**: Heavy input form with standard focus borders, dropdown selectors for Inquiry Type, and a submit button with a progress circle loader.
* **Right Panel (Map Embed & Office Coordinates)**: Active Leaflet/Google Map iframe card (`border-radius: 12px`), followed by address information, operational hours, email links, and direct WhatsApp links.

---

### 7. Secure Admin Pages Layout

#### Section 7.1: Collapsible Sidebar Layout (`AdminLayout`)
* **Layout Style**: Fixed-width side menu (`width: 260px`) next to a scrollable content viewport. Displays navigation shortcuts for Dashboard, Products, Categories, Inquiries, Media, and site CMS.

#### Section 7.2: Admin Dashboard Workspace
* **Layout Style**: Top-row cards showing overview counts (Total Products, Active Inquiries, Categories, Total Web Traffic). Followed by recent inquiry chronologies and database synchronization states.

#### Section 7.3: Products Listing Ledger & Drawers (`AdminProducts`)
* **Layout Style**: Multi-column dynamic data table with a sliding right drawer for instant previews. Includes toggles for published/unpublished states.

#### Section 7.4: Content Management CMS Panel (`SiteContent`)
* **Layout Style**: Split screen layout. Left: Hierarchical menu list of sections. Right: Dynamic custom form builders with inline rich text formatting (Quill).
