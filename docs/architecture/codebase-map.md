# Agent Environment & Codebase Map

Use this file as a primary structural reference to avoid running repetitive directory listing (`list_dir`) and search (`grep_search`) commands.

---

## 📂 Full Codebase Architecture & Directory Map

```
react-website-vishal-enterpise---glass/
│
├── package.json                # Workspace Root: Express server + bcryptjs, sharp, multer, cors, etc.
├── vercel.json                 # Vercel deployment config (rewrites, headers, serverless functions)
├── run_project.bat             # Windows script to start dev servers concurrently
├── stop_project.bat            # Windows script to stop dev servers by active PIDs
├── .env.example                # Environment variable template
├── metadata.json               # AI Studio applet metadata & permission manifest
├── AGENTS.md                   # Agent system directives, coding rules, & token standards
│
├── docs/                       # Categorized technical & design documentation
│   ├── admin/                  # Admin portal setup & specifications
│   ├── architecture/           # System design, migrations, audits & codebase map
│   ├── content/                # Master website marketing & copy documentation
│   └── design/                 # Design system tokens & UI style guidelines
│
├── patch_scripts/              # Categorized utility & batch maintenance scripts
│   ├── branding/               # Brand name & identity update scripts
│   ├── components/             # UI component patch scripts
│   ├── layout/                 # Mobile & navigation layout adjustment scripts
│   ├── styling/                # Global CSS & typography normalization scripts
│   ├── theme/                  # Color token & dark theme replacement scripts
│   └── utils/                  # Regex patching & text replacement utilities
│
├── api/
│   └── index.js                # Vercel serverless entry point — wraps Express app
│
├── scripts/
│   └── build.js                # Root build orchestrator — builds frontend & prepares dist assets
│
├── data/
│   └── vishal_enterprise.db    # Local SQLite database file (Turso / local fallback)
│
├── apps/api/                   # ── Backend Express API Server ──
│   ├── index.js                # Express app bootstrap — middleware, global error handler, static files
│   │
│   ├── config/
│   │   └── database.js         # LibSQL/Turso DB dual-mode database init, schema DDL, migration & triggers
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
│   │   ├── api.js              # Central router — mounts all sub-routes with rate limiters
│   │   ├── auth.js             # POST /login, PUT /password, GET /me — bcryptjs authentication
│   │   ├── categories.js       # CRUD with 120s TTL cache & X-Cache response headers
│   │   ├── company.js          # GET/POST single-row company_info (JSON blob)
│   │   ├── content.js          # GET/POST site_content key-value CMS with batch upsert
│   │   ├── inquiries.js        # POST /contact + /inquiries, GET list, DELETE by source type
│   │   ├── stats.js            # GET /stats dashboard metrics & counts
│   │   ├── media.js            # GET /media list, POST /media record
│   │   ├── products.js         # Full product CRUD, spec auto-seeding, published filter
│   │   └── upload.js           # POST /upload/images — Multer + Sharp WebP + thumbnail/medium variants
│   │
│   ├── utils/
│   │   ├── cache.js            # In-memory Map cache with TTL (default 60s) & RegExp key invalidation
│   │   └── specificationSeeder.js # Infers product specifications from name/description keywords
│   │
│   └── scripts/
│       ├── seed.js             # Database seeder (products, categories, initial CMS content)
│       └── backfillSpecifications.js # Backfills inferred specs for legacy product records
│
├── apps/web/                   # ── Frontend React App (Vite 7 + React 19 + React Router 7) ──
│   ├── package.json            # Frontend dependencies (React 19, React Router 7, Iconify, Tailwind)
│   ├── vite.config.js          # Dev proxy (/api → http://localhost:3000), manual chunk splitting
│   ├── index.html              # SPA html shell with Meta tags, Font Awesome CDN & theme scripts
│   │
│   ├── scripts/
│   │   └── copy-uploads.mjs    # Post-build asset bundler (copies uploads/ to dist/uploads/)
│   │
│   ├── src/
│   │   ├── main.jsx            # Entry point: StrictMode, scrollRestoration setup
│   │   ├── app/
│   │   │   ├── App.jsx         # Top-level React context providers
│   │   │   ├── layouts/
│   │   │   │   ├── PublicLayout.jsx  # Main site layout (Header, Content, Footer)
│   │   │   │   └── AdminLayout.jsx   # Admin portal shell
│   │   │   └── router/
│   │   │       └── AppRouter.jsx     # Route definitions
│   │   ├── index.css           # Global stylesheet importing Tailwind CSS & modular core styles
│   │   │
│   │   ├── features/           # Feature-sliced modular domain modules
│   │   │   │
│   │   │   ├── about/          # About domain features & components
│   │   │   │   ├── AboutCtaSection.jsx
│   │   │   │   ├── AboutHero.jsx
│   │   │   │   ├── ExperienceBanner.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   ├── WhoWeAreSection.jsx
│   │   │   │   ├── WhyChooseUsSection.jsx
│   │   │   │   └── about.module.css
│   │   │   │
│   │   │   ├── admin/          # Admin portal dashboard & layout
│   │   │   │   ├── AdminSettings.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Dashboard.module.css
│   │   │   │   └── components/
│   │   │   │       ├── AdminCommandPalette.jsx
│   │   │   │       ├── AdminLayout.jsx
│   │   │   │       ├── AdminLayout.module.css
│   │   │   │       ├── AdminNotificationsDropdown.jsx
│   │   │   │       ├── AdminSidebar.jsx
│   │   │   │       ├── AdminTable.module.css
│   │   │   │       ├── AdminTopBar.jsx
│   │   │   │       ├── RichTextEditor.jsx
│   │   │   │       └── RichTextEditor.module.css
│   │   │   │
│   │   │   ├── auth/           # Admin Authentication views
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Login.module.css
│   │   │   │
│   │   │   ├── contact/        # Contact domain forms & cards
│   │   │   │   ├── ContactFaqSection.jsx
│   │   │   │   ├── ContactFormSection.jsx
│   │   │   │   ├── ContactHero.jsx
│   │   │   │   ├── ContactInfoColumn.jsx
│   │   │   │   ├── ContactInfoItem.jsx
│   │   │   │   ├── ContactTrustedRow.jsx
│   │   │   │   ├── ContactWorkflowSection.jsx
│   │   │   │   └── contact.module.css
│   │   │   │
│   │   │   ├── content-management/ # Admin CMS tree & key-value editors
│   │   │   │   ├── CompanyForm.jsx
│   │   │   │   ├── SectionEditor.jsx
│   │   │   │   ├── SiteContent.jsx
│   │   │   │   ├── SiteContent.module.css
│   │   │   │   ├── SiteContentSidebar.jsx
│   │   │   │   ├── TeamEditor.jsx
│   │   │   │   └── TimelineEditor.jsx
│   │   │   │
│   │   │   ├── home/           # Homepage hero, process & bento showcases
│   │   │   │   ├── HomeCtaSection.jsx
│   │   │   │   ├── HomeHero.jsx
│   │   │   │   ├── IndustriesGrid.jsx
│   │   │   │   ├── IndustryCard.jsx
│   │   │   │   ├── IndustryValueProps.jsx
│   │   │   │   ├── ProcessSection.jsx
│   │   │   │   ├── SustainabilitySection.jsx
│   │   │   │   ├── TrustedBySection.jsx
│   │   │   │   └── home.module.css
│   │   │   │
│   │   │   ├── inquiries/      # Admin inquiry management views
│   │   │   │   ├── AdminInquiries.jsx
│   │   │   │   ├── AdminInquiryDetail.jsx
│   │   │   │   └── Inquiries.module.css
│   │   │   │
│   │   │   ├── media/          # Admin media library explorer
│   │   │   │   ├── AdminMedia.jsx
│   │   │   │   └── Media.module.css
│   │   │   │
│   │   │   ├── navigation/     # Header, MegaMenu, Footer, Mobile bottom bar
│   │   │   │   ├── footer.module.css
│   │   │   │   ├── mobile-bottom-nav.module.css
│   │   │   │   ├── navbar.module.css
│   │   │   │   └── components/
│   │   │   │       ├── AnnouncementBar.jsx
│   │   │   │       ├── Footer.jsx
│   │   │   │       ├── MegaMenu.jsx
│   │   │   │       ├── MobileBottomNav.jsx
│   │   │   │       ├── MobileNavDrawer.jsx
│   │   │   │       ├── Navbar.jsx
│   │   │   │       └── NavbarSearch.jsx
│   │   │   │
│   │   │   ├── product-detail/ # Product details gallery, ESG estimator, specs modal
│   │   │   │   ├── ProductDetailView.jsx
│   │   │   │   ├── product-detail.module.css
│   │   │   │   ├── components/
│   │   │   │   │   ├── ProductBenefitsGrid.jsx
│   │   │   │   │   ├── ProductGallery.jsx
│   │   │   │   │   ├── ProductHeaderSpecs.jsx
│   │   │   │   │   ├── ProductSpecsModal.jsx
│   │   │   │   │   ├── ProductTabsSection.jsx
│   │   │   │   │   └── RelatedProductsSection.jsx
│   │   │   │   └── styles/         # Feature-scoped modular CSS imports
│   │   │   │
│   │   │   └── products/       # Catalog list, grid cards, search, filters & admin management
│   │   │       ├── ProductCatalog.jsx
│   │   │       ├── products.module.css
│   │   │       ├── components/
│   │   │       │   ├── MobileCategoryBar.jsx
│   │   │       │   ├── ProcurementAdvantage.jsx
│   │   │       │   ├── ProcurementCtaBand.jsx
│   │   │       │   ├── ProductFilterSidebar.jsx
│   │   │       │   ├── ProductGridCard.jsx
│   │   │       │   ├── ProductListItemCard.jsx
│   │   │       │   ├── ProductSearchHeader.jsx
│   │   │       │   ├── ProductsHero.jsx
│   │   │       │   └── QuickViewModal.jsx
│   │   │       ├── admin/
│   │   │       │   ├── AdminProductEditor.jsx
│   │   │       │   └── AdminProducts.jsx
│   │   │       └── categories/
│   │   │           ├── AdminCategories.jsx
│   │   │           └── AdminCategoryEditor.jsx
│   │   │
│   │   ├── pages/              # Primary Route Views
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Manufacturing.jsx
│   │   │   ├── Sustainability.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── NotFound.module.css
│   │   │
│   │   └── shared/             # Reusable core shared abstractions
│   │       ├── components/     # Shared components (Buttons, Modals, Showcase, UI primitives, `index.js`)
│   │       │   ├── PageHero/   # Reusable inner-page hero (`PageHero.jsx`, `PageHero.module.css`, `index.js`)
│   │       │   ├── AnimatedFeatureIcon.jsx
│   │       │   ├── ErrorBoundary.jsx
│   │       │   ├── InquiryModal.jsx
│   │       │   ├── OptimizedImage.jsx
│   │       │   ├── ProductsShowcase.jsx
│   │       │   ├── QuoteButton.jsx
│   │       │   ├── ScrollProgressBar.jsx
│   │       │   └── ui/         # Base UI components (Button, Card, Badge, CustomSelect, `index.js`)
│   │       │
│   │       ├── context/        # Central CMS & company provider (`SiteContext.jsx`, `index.js`)
│   │       │
│   │       ├── hooks/          # Custom hooks (`useApi`, `useDocumentTitle`, `useInquiry`, `useProducts`, `index.js`)
│   │       │
│   │       ├── styles/         # Core design system tokens & resets
│   │       │   ├── index.css
│   │       │   └── core/
│   │       │       ├── base-reset.css
│   │       │       ├── buttons-forms.css
│   │       │       ├── components-shared.css
│   │       │       ├── dark-theme.css
│   │       │       ├── layout-nav.css
│   │       │       ├── modals-overlays.css
│   │       │       ├── page-hero.css
│   │       │       ├── surfaces-cards.css
│   │       │       ├── tokens.css
│   │       │       └── utilities.css
│   │       │
│   │       └── utils/          # Formatting & API helpers (`api.js`, `formatters.js`, `parsers.js`, `productUtils.js`, `whatsapp.js`, `index.js`)
│   │
│   └── public/                 # Static assets (favicons, logos)
│
└── uploads/                    # ── Local Media Attachments ──
    └── products/               # Product image upload storage
```

---

## 🔗 Central API Endpoints Reference

### Public Routes (No Auth Required)
| Method | Endpoint | Description | Cache TTL |
|--------|----------|-------------|-----------|
| `GET` | `/api/products` | Published product catalog (filterable, searchable) | 60s |
| `GET` | `/api/products/:id` | Detailed product payload with specs, features & FAQs | 120s |
| `GET` | `/api/categories` | Active category list | 120s |
| `GET` | `/api/categories/:id` | Single category details & field template schema | 120s |
| `GET` | `/api/company` | Company info (phone, WhatsApp, email, office address, map) | 300s |
| `GET` | `/api/content` | Entire CMS key-value site content map | 300s |
| `GET` | `/api/stats` | Dashboard counters & marketing performance figures | 60s |
| `GET` | `/api/certifications` | Quality & ISO compliance certificates | 300s |
| `POST` | `/api/contact` | Contact form submission handler | Rate limited |
| `POST` | `/api/inquiries` | B2B quote request / product inquiry submission | Rate limited |
| `GET` | `/health` | Server health check endpoint (`200 OK`) | None |

### Admin Routes (Requires HMAC Token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Authenticate admin credentials → returns `ve1.*` HMAC token |
| `GET` | `/api/auth/me` | Verify active admin token session |
| `PUT` | `/api/auth/password` | Update admin password |
| `POST` | `/api/products` | Create product with multipart image attachments |
| `PUT` | `/api/products/:id` | Update product details or images |
| `DELETE` | `/api/products/:id` | Permanently remove product |
| `POST` | `/api/categories` | Create new product category |
| `PUT` | `/api/categories/:id` | Update category details & field template schema |
| `DELETE` | `/api/categories/:id` | Delete category |
| `POST` | `/api/company` | Upsert company contact details |
| `POST` | `/api/content` | Batch upsert CMS key-value content entries |
| `GET` | `/api/inquiries` | Retrieve list of all customer quote requests & contact messages |
| `DELETE` | `/api/inquiries/:type/:id` | Delete inquiry entry by source type (`inquiries` or `contact`) |
| `GET` | `/api/media` | Browse media library records |
| `POST` | `/api/media` | Register new media record |
| `POST` | `/api/upload/images` | Upload image files (Multer + Sharp WebP conversion) |

---

## 🎨 Master Design System & Styling Rules

### Master Color Tokens
- **Primary Green Accent (`--brand`, `--accent`)**: `#6BBF54`
- **Hover Green Accent (`--brand-hover`)**: `#7ACC63`
- **Active Green Accent (`--brand-active`)**: `#5DA849`
- **Dark Navy (`--dark`, `--navy`)**: `#021826`
- **Surface Dark Navy (`--bg-surface-dark`)**: `#022340`
- **Light Surface Background (`--bg-light`)**: `#F7F9F6`

### Primary CTA Button Guidelines (AAA Contrast Rules)
- **Primary Buttons (`.btn-primary`, `.swipe-btn`, `.btn-shared-brand`)**:
  - Background fill: `var(--accent)` (`#6BBF54`)
  - Text & SVG Icon color: `#021826` (Pure dark navy for AAA contrast)
  - Dark Theme alignment: Applies identical `#6BBF54` background with `#021826` text in dark theme.
- **Secondary / Outline Buttons**:
  - Background: Transparent or `#022340` in dark mode
  - Border: `1px solid var(--border)`

---

## 🗄️ Database Architecture (9 Tables)

| Table | Primary Columns | Purpose |
|-------|-----------------|---------|
| `products` | `id`, `name`, `slug`, `category_id`, `price`, `oldPrice`, `discountRate`, `description`, `specifications` (JSON), `features` (JSON), `faqs` (JSON), `image` (JSON array), `published` | Catalog products |
| `categories` | `id`, `name`, `slug`, `description`, `image`, `fields` (JSON array) | Categories & custom spec field templates |
| `users` | `id`, `username`, `password`, `role` | Admin user credentials (bcrypt hashed) |
| `site_content` | `key` (UNIQUE), `value`, `type`, `section` | Flat key-value CMS content store |
| `company_info` | `id`, `data` (JSON blob) | Central corporate contact details |
| `inquiries` | `id`, `name`, `email`, `phone`, `company`, `message`, `product_id`, `category_id`, `source` | B2B quote inquiries |
| `contact_messages` | `id`, `name`, `email`, `phone`, `company`, `message`, `inquiryType` | Contact form submissions |
| `media` | `id`, `filename`, `url` | Media library file metadata |
| `certifications` | `id`, `name`, `description` | ISO & industrial quality certifications |

---

## 📐 Detailed Page & Component Blueprint

### 1. Navigation Header & Footer
- **Sticky Pill Navbar (`components/Navbar.jsx`)**: Floating rounded pill header with blur backdrop (`backdrop-filter: blur(12px)`), product mega-menu drawer, search modal trigger, mobile drawer, and CTA quote button.
- **Mega Menu Drawer (`components/MegaMenu.jsx`)**: Outer positioning wrapper strictly transparent, containing a rounded 1000px card with category links and product shortcuts.
- **B2B Footer (`components/Footer.jsx`)**: 4-column layout with corporate bio, quick links, category catalog directory, contact information, and email newsletter subscription.

### 2. Homepage (`Home.jsx`)
- **Home Hero (`HomeHero.jsx`)**: Industrial hero section with dynamic carousel slides, headline copy, quick CTA buttons, and high-contrast Assistance Card (`NEED ASSISTANCE?`).
- **Products Showcase (`ProductsShowcase.jsx`)**: Bento grid display (featured hero item + square product cards with dark overlay gradients for high text contrast).
- **Process Section (`ProcessSection.jsx`)**: Step-by-step manufacturing workflow explaining recycled plastic extrusion.
- **Sustainability Section (`SustainabilitySection.jsx`)**: Circular economy impact counters (plastic waste diverted, carbon offsets).

### 3. Catalog Page (`Products.jsx`)
- **Filter Sidebar (`ProductFilterSidebar.jsx`)**: Category checklist, price & spec range filters, search input.
- **Grid & List Views (`ProductGridCard.jsx`, `ProductListItemCard.jsx`)**: Card grid displaying badges, specifications, MOQ indicators, and quick quote actions.

### 4. Product Detail Page (`ProductDetail.jsx`)
- **Split Gallery & ESG Estimator**: High-res image gallery with interactive hover zoom and full-screen view. Side panel with dynamic ESG Impact Estimator calculator (converts unit volume into kg of plastic diverted, trees saved, and CO2 offset).
- **Specifications & TDS Modal**: Detailed specification matrix and printable Technical Data Sheet (TDS) modal.

### 5. Admin Portal (`apps/web/src/features/admin`)
- **Dashboard (`Dashboard.jsx`)**: Inquiries ledger, catalog metrics, recent activity timeline.
- **Product Editor (`AdminProductEditor.jsx`)**: Multi-tab form for product metadata, dynamic specifications based on category schema, image uploader, and FAQ manager.
- **CMS Manager (`SiteContent.jsx`)**: Tree outline navigation with live section editors for all page content keys.
