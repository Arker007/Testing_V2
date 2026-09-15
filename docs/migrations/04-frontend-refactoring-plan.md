---
domain: architecture-refactoring
scope: frontend-refactoring
status: approved-blueprint
created_at: 2026-09-10
updated_at: 2026-09-11
version: 2.0.0
---

# 04. Frontend Refactoring Plan (`apps/web`)

## 1. Executive Summary & Target Architecture

This blueprint establishes a strict, unidirectional 4-tier layer boundary for the frontend application at `apps/web/src/`.

### The Unidirectional Architectural Flow

```text
Frontend

    app             (Application lifecycle, routing tables, layouts, providers)
     ↓
    pages           (Route-only entry points; zero domain/business logic)
     ↓
  features          (Domain boundary ownership; state, hooks, services, feature UI)
     ↓
   shared           (Domain-agnostic primitives, API client, hooks, utils, types, constants, tokens)
```

#### Layer Dependency Invariants:
1. **`app`** may import from `pages`, `features`, and `shared`.
2. **`pages`** may import ONLY from `features` and `shared`. Pages **NEVER** import other pages or `app`.
3. **`features`** may import from `shared` and internal feature files. Features **NEVER** cross-import internal implementation details of sibling features; cross-domain communication must traverse public barrel exports (`index.js`) or shared service/contract layers.
4. **`shared`** may ONLY import from `shared` or external packages. Shared **NEVER** imports from `features`, `pages`, or `app`.

---

## 2. Target Directory Blueprint

```text
apps/web/src/
│
├── app/                          # Application-level configuration
│   ├── router/                   # Route definitions and lazy loading guards
│   ├── layouts/                  # PublicLayout, AdminLayout shell wrappers
│   └── providers/                # Theme, site, auth context providers
│
├── pages/                        # Routes only; minimal business logic
│   ├── Home.jsx                  # Public route container
│   ├── About.jsx                 # Public route container
│   ├── Products.jsx              # Public route container
│   ├── ProductDetail.jsx         # Public route container
│   ├── Contact.jsx               # Public route container
│   ├── Manufacturing.jsx         # Public route container
│   ├── Sustainability.jsx        # Public route container
│   ├── NotFound.jsx              # 404 route container
│   └── admin/                    # Admin route containers (extracted from direct router imports)
│       ├── DashboardPage.jsx
│       ├── AdminProductsPage.jsx
│       ├── AdminProductEditorPage.jsx
│       ├── AdminCategoriesPage.jsx
│       ├── AdminCategoryEditorPage.jsx
│       ├── AdminInquiriesPage.jsx
│       ├── AdminInquiryDetailPage.jsx
│       ├── AdminMediaPage.jsx
│       ├── AdminCatalogPage.jsx
│       ├── SiteContentPage.jsx
│       ├── AdminSettingsPage.jsx
│       └── LoginPage.jsx
│
├── features/                     # Main ownership boundary (13 domain features)
│   ├── home/                     # Hero, showcase, industries, features
│   ├── products/                 # Catalog, product cards, detail tabs, specs, admin product editor
│   ├── categories/               # Dedicated domain for category management & taxonomy
│   ├── inquiries/                # Lead capture forms, inquiry tracking, admin inquiry viewer
│   ├── contact/                  # Contact form, office info, FAQ, workflow
│   ├── navigation/               # Navbar, Footer, MegaMenu, MobileNavDrawer, AnnouncementBar
│   ├── content-management/       # CMS section editors, company profile, timeline/team modals
│   ├── catalog/                  # PDF/flipbook spreads, digital catalog generation
│   ├── auth/                     # Authentication hooks, login credentials UI, session storage
│   ├── admin/                    # Admin shell, command palette, metrics dashboard, notifications
│   ├── about/                    # Company story, leadership, why choose us, testimonials
│   ├── manufacturing/            # Plant facilities, extrusion capabilities, circular processing
│   └── sustainability/           # Eco metrics, circular lifecycle, carbon savings
│
├── shared/                       # Feature-independent reusable code
│   ├── ui/                       # Strictly categorized design-system primitives
│   │   ├── buttons/              # Button, InteractiveHoverButton, QuoteButton, WhatsAppButton
│   │   ├── forms/                # Input, Textarea, Checkbox, Radio, Switch, Select, FileUpload
│   │   ├── data-display/         # Card, Table, Badge, Tag, Accordion, Kbd, StatCard, Avatar
│   │   ├── feedback/             # Alert, Toast, Spinner, Skeleton, EmptyState, ErrorBoundary
│   │   ├── layout/               # Divider, PageHeader, PageHero, SectionHeader
│   │   ├── media/                # OptimizedImage
│   │   ├── navigation/           # Breadcrumbs, Pagination, Tabs, BackToTop, BackHeader
│   │   └── overlays/             # Modal, Drawer, Tooltip, ConfirmDialog, InquiryModal
│   ├── api/                      # HTTP client, base Axios/Fetch wrapper, error models, endpoints
│   ├── hooks/                    # Domain-agnostic hooks (useApi, useDocumentTitle, useDebounce)
│   ├── utils/                    # Domain-agnostic utilities (formatters, parsers, api, whatsapp)
│   ├── types/                    # Shared TypeScript / JSDoc interface types and schemas
│   ├── constants/                # Shared UI tokens, HTTP codes, navigation links, site metadata
│   └── styles/                   # Design tokens, themes, reset, and utility classes
│
└── assets/                       # Static visual assets
    ├── images/                   # backgrounds, brand, manufacturing, maps, marketing
    └── icons/                    # Static icon files
```

---

## 3. Gap Analysis (Current vs. Target)

| Area | Current State | Target State | Action Required |
| :--- | :--- | :--- | :--- |
| **`features/categories`** | Nested inside `features/products/categories/` | Top-level domain `features/categories/` | Extract `AdminCategories`, `AdminCategoryEditor`, and `category.service.js` into `features/categories/`. Provide backwards-compatible shim in `features/products/categories/`. |
| **`pages/` (Admin Routes)** | `AppRouter.jsx` directly imports from `features/*` (e.g. `Dashboard.jsx`, `AdminProducts.jsx`) | All routes resolve through `pages/` (public & admin) | Create thin route container wrappers in `pages/admin/` to satisfy `app -> pages -> features`. |
| **`shared/types`** | Missing | `shared/types/` | Establish shared contract types (product, category, inquiry, api envelope). |
| **`shared/constants`** | Dispersed or only in packages/contracts | `shared/constants/` | Consolidate common constants (routes, API endpoints, UI defaults). |
| **`shared/hooks`** | Leaks domain hooks: `useProducts.js`, `useInquiry.js` | Generic hooks only | Relocate `useProducts` to `features/products/hooks/` and `useInquiry` to `features/inquiries/hooks/`. Add re-export shims. |
| **Vite Chunks & Aliases** | Chunking targets `features/products/categories/` | Targets `features/categories/` and `pages/admin/` | Update manual chunk definitions in `vite.config.js`. |

---

## 4. Phased Implementation Roadmap

### Phase 1: Shared Infrastructure & Boundary Hygiene
* **Objective**: Fortify `shared/` with `types/` and `constants/`, while purging domain leakages.
1. Create `shared/types/` with type definition files (`api.types.js`, `product.types.js`, `inquiry.types.js`, `index.js`).
2. Create `shared/constants/` with shared constant files (`routes.constants.js`, `api.constants.js`, `index.js`).
3. Migrate `shared/hooks/useProducts.js` to `features/products/hooks/useProducts.js`.
4. Migrate `shared/hooks/useInquiry.js` to `features/inquiries/hooks/useInquiry.js`.
5. Maintain non-breaking re-export shims in `shared/hooks/index.js` with deprecation tags.
* **Verification**: `npm run lint` and `npm run test:web` pass.

### Phase 2: Category Domain Extraction (`features/categories/`)
* **Objective**: Elevate categories into a first-class feature domain alongside products.
1. Create directory structure:
   - `features/categories/components/`
   - `features/categories/services/`
   - `features/categories/hooks/`
   - `features/categories/styles/`
   - `features/categories/index.js`
2. Move `features/products/categories/AdminCategories.jsx` -> `features/categories/components/AdminCategories.jsx`.
3. Move `features/products/categories/AdminCategoryEditor.jsx` -> `features/categories/components/AdminCategoryEditor.jsx`.
4. Relocate `features/products/services/category.service.js` -> `features/categories/services/category.service.js`.
5. Create compatibility shims in `features/products/categories/index.js` and `features/products/services/category.service.js`.
6. Update category consumer references in `features/navigation/` (`Navbar.jsx`, `MegaMenu.jsx`).
* **Verification**: Verify category list and editor render properly; test suites run cleanly.

### Phase 3: Route Container Standardization (`pages/`)
* **Objective**: Enforce `app -> pages -> features` by routing all endpoints through `pages/`.
1. Create `apps/web/src/pages/admin/` directory.
2. Build thin route container wrappers:
   - `pages/admin/DashboardPage.jsx` (mounts `features/admin/components/Dashboard`)
   - `pages/admin/AdminProductsPage.jsx` (mounts `features/products/admin/AdminProducts`)
   - `pages/admin/AdminProductEditorPage.jsx` (mounts `features/products/admin/AdminProductEditor`)
   - `pages/admin/AdminCategoriesPage.jsx` (mounts `features/categories/components/AdminCategories`)
   - `pages/admin/AdminCategoryEditorPage.jsx` (mounts `features/categories/components/AdminCategoryEditor`)
   - `pages/admin/AdminInquiriesPage.jsx` (mounts `features/inquiries/components/AdminInquiries`)
   - `pages/admin/AdminInquiryDetailPage.jsx` (mounts `features/inquiries/components/AdminInquiryDetail`)
   - `pages/admin/AdminMediaPage.jsx` (mounts `features/media/components/AdminMedia`)
   - `pages/admin/AdminCatalogPage.jsx` (mounts `features/catalog/components/AdminCatalog`)
   - `pages/admin/SiteContentPage.jsx` (mounts `features/content-management/components/SiteContent`)
   - `pages/admin/AdminSettingsPage.jsx` (mounts `features/admin/components/AdminSettings`)
   - `pages/LoginPage.jsx` (mounts `features/auth/components/Login`)
3. Ensure page containers contain zero direct fetch calls or complex state logic.
* **Verification**: All public and admin pages render without lifecycle regressions.

### Phase 4: Application Wiring & Code Splitting (`app/`)
* **Objective**: Re-wire `AppRouter.jsx` to load exclusively from `pages/`, update bundling rules.
1. Update `apps/web/src/app/router/AppRouter.jsx`:
   - Replace all direct `../../features/*` imports with corresponding `../../pages/*` imports.
   - Retain `lazyRetry` resilient chunk loader.
2. Update `apps/web/vite.config.js`:
   - Add `@pages` path alias pointing to `./src/pages`.
   - Update `rollupOptions.output.manualChunks` to include `/features/categories/` and `/pages/admin/` in the `admin` bundle.
3. Update `apps/web/jsconfig.json` to register the `@pages/*` path alias for IDE auto-completion.
* **Verification**: Build with `npm run build` inside `apps/web/`; inspect manual chunk outputs.

### Phase 5: Verification, Linting, & Deprecation Plan
* **Objective**: Comprehensive test verification and safety checks.
1. Run syntax and style checks via `npm run lint`.
2. Run Vitest component tests via `npm run test:web`.
3. Run end-to-end and API tests via `npm run test`.
4. Perform smoke test on critical user journeys:
   - Homepage -> Products Catalog -> Product Detail -> Inquire Modal
   - Admin Login -> Dashboard -> Products Manager -> Categories Manager -> Inquiries
5. Schedule removal of backward compatibility shims in the subsequent release wave.

---

## 5. Rollback & Contingency Protocol

- **Atomic Git Branches**: Execute each phase in an isolated commit or branch.
- **Backward Compatibility Guarantee**: All moved files retain a one-line re-export shim in their original location until the entire suite and all consumer references are updated.
- **Instant Rollback**: If unexpected bundle chunking or routing defects occur in any phase, revert the phase's atomic commit without cascading disruption to other layers.

