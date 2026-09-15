---
domain: architecture-refactoring
scope: codebase-inventory
status: complete-audit
created_at: 2026-09-10
version: 1.0.0
---

# 01. Complete Codebase Inventory & Asset Catalog

## 1. Project Topology & Workspace Definition

The repository is structured as an npm workspaces monorepo with an Express API backend and a Vite + React frontend:

```text
. (Root)
├── package.json                   # Root package manifest & workspace coordinator
├── AGENTS.md                      # Persistent agent operational guidelines
├── api/
│   └── index.js                   # Vercel serverless function entrypoint
├── apps/
│   ├── api/                       # Express 4 backend server
│   │   ├── index.js               # Local development and standalone server entrypoint
│   │   ├── scripts/               # DB seeders & maintenance scripts
│   │   └── src/                   # Backend application source
│   └── web/                       # React 19 + Vite 7 frontend application
│       ├── package.json           # Frontend package manifest
│       ├── vite.config.js         # Vite configuration with proxy and Rollup chunks
│       ├── eslint.config.js       # ESLint 9 configuration
│       ├── index.html             # HTML entrypoint
│       ├── scripts/               # Frontend build-time helper scripts
│       └── src/                   # Frontend application source
├── data/                          # SQLite persistent database storage (.db files)
├── docs/                          # Architecture, design, and standards documentation
├── public/                        # Static public assets (favicons, etc.)
├── scripts/                       # Root-level build and maintenance scripts
├── src/                           # ⚠️ Orphaned root directory containing single JPG asset
├── tools/                         # Maintenance tools (.gitkeep stubs)
├── patch_scripts/                 # Legacy python patch scripts
└── uploads/                       # Dynamic media upload directory (served at /uploads)
```

---

## 2. Tech Stack & Dependency Matrix

| Category | Technology | Version | Scope | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.2.0` | `apps/web` | UI component library |
| **Frontend Runtime** | React DOM | `^19.2.0` | `apps/web` | DOM rendering engine |
| **Build Tooling** | Vite | `^7.3.1` | `apps/web` | Dev server and production bundler |
| **Routing** | React Router DOM | `^7.13.0` | `apps/web` | Client-side routing and history |
| **CSS Utility Engine** | Tailwind CSS | `^4.3.3` | `apps/web` | Utility classes and theme engine |
| **Vite Plugin** | `@tailwindcss/vite`| `^4.3.3` | `apps/web` | Vite compile-time Tailwind integration |
| **Icons** | `@iconify/react` | `^6.0.2` | `apps/web` | Standardized icon library (`solar:*`) |
| **Motion/Animation** | `motion` / `framer-motion` | `^13.0.0` / `^12.43.0` | `apps/web` | Physics-based UI animations |
| **Rich Text Editor** | Quill | `^2.0.3` | `apps/web` | Admin content editing |
| **HTML Sanitizer** | DOMPurify | `^3.3.3` | `apps/web` | Client-side XSS prevention for rich text |
| **Backend Framework** | Express | `^4.18.2` | `apps/api` | REST API HTTP server |
| **Database Driver** | `@libsql/client` | `^0.17.0` | `apps/api` | LibSQL / Turso and local SQLite driver |
| **Password Hashing** | bcryptjs | `^3.0.3` | `apps/api` | Admin authentication password hashing |
| **Image Processing** | Sharp | `0.32.6` | `apps/api` | WebP image conversion and thumbnailing |
| **Multipart Uploads** | Multer | `^1.4.5-lts.1`| `apps/api` | Form-data file upload parsing |
| **Compression** | Compression | `^1.7.4` | `apps/api` | Gzip response compression |
| **Rate Limiting** | Express Rate Limit| `^8.2.1` | `apps/api` | API abuse prevention |
| **Cross-Origin** | CORS | `^2.8.5` | `apps/api` | Cross-origin request headers |

---

## 3. Frontend Inventory (`apps/web/src/`)

### 3.1 Application Shell (`apps/web/src/app/`)
- `App.jsx`: Root provider tree wrapping `ErrorBoundary`, `SiteProvider`, `ToastProvider`, and `AppRouter`.
- `router/AppRouter.jsx`: Browser router with dynamic `lazyRetry` code splitting for public and admin routes.
- `layouts/PublicLayout.jsx`: Public frame containing AnnouncementBar, Navbar, Page Content Outlet, MobileBottomNav, and Footer.
- `layouts/AdminLayout.jsx`: Protected admin frame with AdminSidebar, TopBar, and dynamic child routing.
- `providers/SiteProvider.jsx` & `providers/index.js`: Context provider managing global site settings, contact info, and navigation cache.

### 3.2 Route Pages (`apps/web/src/pages/`)
- `Home.jsx`: Route container for Home page.
- `About.jsx`: Route container for About Us page.
- `Products.jsx`: Route container for Product Catalog page.
- `ProductDetail.jsx`: Route container for individual Product Detail page.
- `Contact.jsx`: Route container for Contact & Quote page.
- `Manufacturing.jsx`: Route container for Factory & Infrastructure page.
- `Sustainability.jsx`: Route container for ESG & Circular Economy page.
- `NotFound.jsx`: 404 Catch-all route container.
- `section-styles/home-hero-redesign.css`: ⚠️ **Architectural Smell**: Ad-hoc CSS placed inside the route pages directory.

### 3.3 Domain Features (`apps/web/src/features/`)

| Feature Domain | Path | Sub-components & Artifacts | Status & Health |
| :--- | :--- | :--- | :--- |
| **`about/`** | `src/features/about/` | `AboutPage.jsx`, `components/` (AboutHero, WhoWeAre, WhyChooseUs, CertificationsShowcase, etc.), `constants/` | Clean |
| **`admin/`** | `src/features/admin/` | `Dashboard.jsx`, `AdminSettings.jsx`, `components/` (StatCard, etc.), `constants/` (adminNav.constants.js), `styles/` | Functional, direct `fetch` in Dashboard |
| **`auth/`** | `src/features/auth/` | `Login.jsx`, `components/`, `styles/` | Clean, uses local storage token |
| **`catalog/`** | `src/features/catalog/` | `AdminCatalog.jsx`, `components/` (spreads, toolbar), `hooks/` (`useAdminCatalog.js`), `styles/`, `utils/` | Direct `fetch` in hook, hardcoded category image paths |
| **`contact/`** | `src/features/contact/` | `ContactPage.jsx`, `components/` (QuoteForm, InfoColumn, Workflow, Map), `hooks/`, `styles/` (scoped CSS modules) | Refactored in Phase 1, high quality |
| **`content-management/`** | `src/features/content-management/` | `SiteContent.jsx`, `components/` (editors, Quill wrapper), `hooks/`, `constants/`, `styles/` | Heavy editor logic |
| **`home/`** | `src/features/home/` | `HomePage.jsx`, `components/` (Hero, ProductsShowcase, Features, FAQ, CTA), `constants/`, `data/`, `home.module.css` | Hardcoded upload paths in constants |
| **`inquiries/`** | `src/features/inquiries/` | `AdminInquiries.jsx`, `AdminInquiryDetail.jsx`, `components/`, `styles/` | Clean admin table |
| **`manufacturing/`** | `src/features/manufacturing/` | `ManufacturingPage.jsx`, `components/` (Process, Quality, Machinery) | High visual fidelity |
| **`media/`** | `src/features/media/` | `AdminMedia.jsx`, `components/` (MediaLibraryModal, UploadDropzone), `styles/` | Admin asset manager |
| **`navigation/`** | `src/features/navigation/` | `Navbar.jsx`, `Footer.jsx`, `MegaMenu.jsx`, `MobileBottomNav.jsx`, `AnnouncementBar.jsx`, `styles/` | Direct `fetch` in Navbar & MegaMenu |
| **`not-found/`** | `src/features/not-found/` | `NotFoundPage.jsx`, `components/`, `styles/NotFound.module.css` | Clean |
| **`products/`** | `src/features/products/` | `ProductsPage.jsx`, `components/` (catalog, filters, cards, search, quick-view), `detail/` (gallery, tabs, specs), `admin/` (editor, tabs), `categories/` (AdminCategories, Editor), `hooks/`, `services/`, `utils/`, `constants/` | Complex domain; needs sub-module boundary enforcement |
| **`sustainability/`** | `src/features/sustainability/`| `SustainabilityPage.jsx`, `components/` (Pillars, Metrics, Lifecycle) | Clean |

### 3.4 Shared Subsystems (`apps/web/src/shared/`)
- **`shared/api/`**:
  - `client.js`: Base fetch client with Authorization header handling.
  - `endpoints.js`: Endpoint mapping (contains incorrect `CATEGORIES` endpoint).
  - `errors.js`: Client error wrapper classes.
  - `index.js`: Barrel export.
- **`shared/context/`**:
  - `SiteContext.jsx`: Site-wide settings, company data, and navigation sync.
- **`shared/hooks/`**:
  - `useApi.js`: Generic fetch wrapper with loading/error state.
  - `useDocumentTitle.js`: Dynamic browser document title updater.
  - `useInquiry.js`: Lead submission hook.
  - `useProducts.js`: Product listing hook.
- **`shared/utils/`**:
  - `api.js`: URL resolution and query string helpers.
  - `formatters.js`: Currency, date, and dimension formatting.
  - `parsers.js`: JSON parsing, specification parsing, image list normalization.
  - `whatsapp.js`: Direct WhatsApp click-to-chat URL generator.
  - `productUtils.js`: ⚠️ **Domain Leak**: Product-specific badge, price, and spec calculators placed in shared utilities.
- **`shared/ui/`**:
  - `buttons/`: `Button.jsx`, `QuoteButton.jsx`, `WhatsAppButton.jsx`.
  - `data-display/`: `Avatar.jsx`, `Badge.jsx`, `Card.jsx`, `CtaCard.jsx`, `IconBox.jsx`, `Progress.jsx`, `SpecRow.jsx`, `StatCard.jsx`, `StatusDot.jsx`, `Table.jsx`, `Tag.jsx`.
  - `feedback/`: `Alert.jsx`, `EmptyState.jsx`, `ErrorBoundary.jsx`, `ScrollProgressBar.jsx`, `Skeleton.jsx`, `Spinner.jsx`, `Toast.jsx`, `useToast.js`.
  - `forms/`: `Checkbox.jsx`, `CustomSelect.jsx`, `FileUpload.jsx`, `FormField.jsx`, `Input.jsx`, `Radio.jsx`, `SearchInput.jsx`, `Switch.jsx`, `Textarea.jsx`.
  - `layout/`: `Divider.jsx`, `PageHeader.jsx`, `PageHero/`, `SectionHeader.jsx`.
  - `media/`: `OptimizedImage.jsx`.
  - `navigation/`: `BackHeader.jsx`, `BackToTop.jsx`, `Breadcrumbs.jsx`, `Pagination.jsx`, `Tabs.jsx`.
  - `overlays/`: `ConfirmDialog.jsx`, `Drawer.jsx`, `InquiryModal.jsx`, `Modal.jsx`, `TimedInquiryModal.jsx`, `Tooltip.jsx`.
  - Root primitives: `Accordion.jsx`, `Kbd.jsx`, `FeaturesSection.jsx`, `FeaturesCustomLifespanCards.jsx`, `FeaturesTrustRow.jsx`, `featureCardVariants.js`.

### 3.5 Third-Party / Registry (`apps/web/src/registry/`)
- `registry/magicui/interactive-hover-button.jsx` & `.css`: MagicUI button primitive placed outside standard `shared/ui/`.

---

## 4. Backend Inventory (`apps/api/src/`)

### 4.1 Core Infrastructure & Database
- `database/database.js`: Primary LibSQL client initialization with SQLite file fallback (`vishal_enterprise.db`).
- `database/dbShim.js`: SQLite3-compatible interface wrapper around `@libsql/client`.
- `database/dbSchema.js`: Table schema DDL definitions for 9 core tables.
- `database/dbSeeds.js`: Seed records for categories, products, company metadata, and admin user.
- `database/dbSync.js`: Field synchronization utility for dynamic category attributes.
- `infrastructure/image/`: Sharp image processing pipeline (WebP transcoding, resizing, aspect ratio preservation).
- `infrastructure/storage/`: Filesystem storage adapter for `uploads/`.

### 4.2 Middleware Pipeline
- `middleware/auth.js`: JWT token verification and user context injection.
- `middleware/errorHandler.js`: Global Express error handling middleware producing standardized error JSON.
- `middleware/validate.js`: Generic schema validation middleware wrapper.

### 4.3 Domain Modules (`apps/api/src/modules/`)

Each module implements the 6-layer separation:
1. **`auth/`**: Login authentication, token generation, credential verification.
2. **`categories/`**: CRUD operations for product categories and dynamic attribute fields.
3. **`company/`**: Site-wide company profile, contact details, address, and social links.
4. **`content/`**: Dynamic CMS block and section content storage.
5. **`inquiries/`**: Customer inquiries, quote requests, and admin status tracking.
6. **`media/`**: Media library tracking and certification document management.
7. **`products/`**: Full product catalog, specification JSON attributes, search, filtering, and pagination.
8. **`stats/`**: Aggregated dashboard statistics (product count, categories, inquiries, conversion metrics).
9. **`uploads/`**: Multer file upload handler with Sharp image optimization.

---

## 5. Root Scripts & Technical Debt Inventory

| File / Folder | Current Location | Description / Purpose | Health Assessment |
| :--- | :--- | :--- | :--- |
| `check-icons.js` | `/check-icons.js` | One-off script checking icon validity | Technical Debt - Candidate for deletion |
| `check-icons2.js` | `/check-icons2.js` | Secondary icon audit script | Technical Debt - Candidate for deletion |
| `find-icons.js` | `/find-icons.js` | Search icon occurrences | Technical Debt - Candidate for deletion |
| `find-icons2.js` | `/find-icons2.js` | Search icon occurrences (variant 2) | Technical Debt - Candidate for deletion |
| `fix-missing-icons.js`| `/fix-missing-icons.js` | Automate icon repairs | Technical Debt - Candidate for deletion |
| `patch_navbar*.js` | Root (4 files) | Ad-hoc navbar string replacements | Obsolete - Candidate for deletion |
| `patch_product_card*.js`| Root (2 files) | Ad-hoc product card string replacements | Obsolete - Candidate for deletion |
| `replace-*.js` | Root (4 files) | One-off solar icon replacement codemods | Obsolete - Candidate for deletion |
| `src/assets/images/...` | `/src/` | ⚠️ Orphaned root directory containing 1 file | Relocate asset to `apps/web/src/assets/` |
| `directory.md` | `/directory.md` | 0-byte empty file | Obsolete - Candidate for deletion |
| `patch_scripts/` | `/patch_scripts/` | 24 legacy Python patch scripts | Archive or migrate valid scripts to `scripts/maintenance/` |
