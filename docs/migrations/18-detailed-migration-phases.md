---
domain: architecture-refactoring
scope: migration-phases
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 18. Detailed 50-Phase Migration Roadmap

## Overview

This roadmap defines **50 granular, independently testable implementation phases** organized into 8 strategic waves. Every phase contains explicit file targets, execution steps, verification criteria, and rollback instructions.

---

## 🌊 Wave 1: Foundation, Tooling, & Technical Debt Cleanup (Phases 1–8)

### Phase 1: Establish Refactoring Documentation & Verification Protocol
* **Scope**: Initialize `docs/refactor/` with architecture audit, target specifications, and ADRs.
* **Files Affected**: `docs/refactor/*.md`, `docs/index.md`.
* **Execution**: Create documentation files 00–20; index them in `docs/index.md`.
* **Verification**: `npm run lint` passes; docs are cleanly formatted.
* **Rollback**: Remove newly created documentation files.

### Phase 2: Root Directory Cleanup (Purge Ad-hoc Patch Scripts)
* **Scope**: Delete obsolete one-off root scripts and 0-byte files.
* **Files Affected**:
  - Delete: `/check-icons.js`, `/check-icons2.js`, `/find-icons.js`, `/find-icons2.js`, `/fix-missing-icons.js`
  - Delete: `/patch_navbar*.js` (4 files), `/patch_product_card*.js` (2 files), `/replace-*.js` (4 files)
  - Delete: `/directory.md`
* **Execution**: Safely delete dead files.
* **Verification**: `git status` shows clean root; `npm run build` succeeds.
* **Rollback**: Restore deleted files from git.

### Phase 3: Static Asset Relocation (Orphaned Root `/src/`)
* **Scope**: Relocate orphaned map image from `/src/assets/` to `apps/web/src/assets/`.
* **Files Affected**:
  - Source: `/src/assets/images/world_map_export_network_1786874321977.jpg`
  - Target: `apps/web/src/assets/images/maps/world-map-export-network.jpg`
  - Delete: Empty root `/src/` directory.
* **Execution**: Move asset; remove root `/src/` folder.
* **Verification**: Verify image displays correctly; `apps/web` builds cleanly.
* **Rollback**: Move file back to root `/src/`.

### Phase 4: Frontend Test Harness Setup
* **Scope**: Configure Vitest and React Testing Library for frontend component verification.
* **Files Affected**: `apps/web/package.json`, `apps/web/vite.config.js`, `apps/web/src/test/setup.js`.
* **Execution**: Add `vitest`, `@testing-library/react`, `jsdom` to devDependencies. Create setup file.
* **Verification**: Run `npx vitest run` with a basic sanity test (`1 + 1 === 2`).
* **Rollback**: Remove test packages and config.

### Phase 5: Backend Test Harness Setup
* **Scope**: Configure Node test runner and Supertest for API endpoint testing.
* **Files Affected**: `package.json`, `apps/api/test/setup.js`, `apps/api/test/health.test.js`.
* **Execution**: Add `supertest` dependency. Add `npm run test:api` script.
* **Verification**: Run `npm run test:api` and assert `GET /health` returns 200 OK.
* **Rollback**: Remove test script and setup file.

### Phase 6: Endpoint Constant Synchronization
* **Scope**: Fix `API_ENDPOINTS.CATEGORIES` pointing to incorrect `/products/categories`.
* **Files Affected**: `apps/web/src/shared/api/endpoints.js`.
* **Execution**: Update `CATEGORIES: '/categories'`.
* **Verification**: Verify constant matches backend mount path `/api/categories`.
* **Rollback**: Revert line in `endpoints.js`.

### Phase 7: Backend Route Backward-Compatibility Aliasing
* **Scope**: Add compatibility alias for `/api/products/categories` on backend router.
* **Files Affected**: `apps/api/src/routes/index.js`.
* **Execution**: Mount `categoriesRouter` at both `/categories` and `/products/categories`.
* **Verification**: Send `curl http://localhost:3000/api/products/categories` and assert 200 OK.
* **Rollback**: Remove alias from `index.js`.

### Phase 8: Centralized API Client Hardening
* **Scope**: Improve `shared/api/client.js` error extraction, token attachment, and query formatting.
* **Files Affected**: `apps/web/src/shared/api/client.js`.
* **Execution**: Add explicit status code and error message normalization.
* **Verification**: Run unit tests on API client with mock fetch responses.
* **Rollback**: Revert `client.js`.

---

## 🌊 Wave 2: Database & Backend Architecture Hardening (Phases 9–16)

### Phase 9: Database Migration Tracking Schema
* **Scope**: Establish `_migrations` table and runner script in `apps/api/src/database/`.
* **Files Affected**: `apps/api/src/database/migrations/runner.js`, `apps/api/src/database/dbSchema.js`.
* **Execution**: Add `_migrations` DDL and create initial migration record `001_initial_schema`.
* **Verification**: Inspect database table list to confirm `_migrations` exists.
* **Rollback**: Drop `_migrations` table.

### Phase 10: Express App Factory Extraction
* **Scope**: Extract shared Express configuration into reusable `apps/api/src/app.js`.
* **Files Affected**: `apps/api/src/app.js` (new), `apps/api/index.js`.
* **Execution**: Move CORS, compression, body-parser, security headers, and routes into `createApp()`.
* **Verification**: Start server via `npm run dev`; verify `/health` and API routes respond.
* **Rollback**: Restore monolithic `apps/api/index.js`.

### Phase 11: Standalone Server Entrypoint Alignment
* **Scope**: Update `apps/api/index.js` to consume `createApp()` and manage Vite dev middleware.
* **Files Affected**: `apps/api/index.js`.
* **Execution**: Simplify server bootstrap to call `initDatabase()`, `createApp()`, and `listen()`.
* **Verification**: Full page reload in browser verifies Vite HMR and API routing.
* **Rollback**: Revert `apps/api/index.js`.

### Phase 12: Vercel Serverless Entrypoint Alignment
* **Scope**: Update `api/index.js` to consume `createApp()` and maintain lazy database bootstrap.
* **Files Affected**: `api/index.js`.
* **Execution**: Replace duplicated middleware declarations with `createApp()`.
* **Verification**: Run local simulated serverless invocation test.
* **Rollback**: Revert `api/index.js`.

### Phase 13: Stats Domain Layered Extraction
* **Scope**: Refactor `modules/stats/` from a single route file into standard 6-layer architecture.
* **Files Affected**:
  - Create: `stats.controller.js`, `stats.service.js`, `stats.repository.js`
  - Update: `stats.routes.js`, `index.js`
* **Execution**: Move raw SQL queries from route handler into `stats.repository.js`.
* **Verification**: Verify `GET /api/stats` returns accurate counts for products, categories, inquiries.
* **Rollback**: Revert `modules/stats/` files.

### Phase 14: Products Specification Normalization & Seeder Verification
* **Scope**: Audit specification serialization and ensure seeder backfill is completely idempotent.
* **Files Affected**: `apps/api/src/modules/products/specification/specificationSeeder.js`, `dbSeeds.js`.
* **Execution**: Test and verify `backfillSpecifications.js` execution without duplicate key errors.
* **Verification**: Run `node apps/api/scripts/backfillSpecifications.js` twice; ensure 0 errors.
* **Rollback**: Restore seeder scripts.

### Phase 15: Backend Input Validation Standardization
* **Scope**: Ensure every mutating route (POST, PUT, DELETE) binds a dedicated schema validator.
* **Files Affected**: `apps/api/src/modules/*/validator.js`, `apps/api/src/middleware/validate.js`.
* **Execution**: Standardize validation helper returning structured 400 Bad Request envelopes.
* **Verification**: Send malformed POST payload to `/api/categories`; verify 400 error response.
* **Rollback**: Revert validators.

### Phase 16: Centralized Error Handler Middleware Hardening
* **Scope**: Verify `errorHandler.js` handles Multer errors, SQLite constraints, and hidden stack traces.
* **Files Affected**: `apps/api/src/middleware/errorHandler.js`.
* **Execution**: Add specific catch blocks for `MulterError` and `LibsqlError`.
* **Verification**: Trigger controlled error in a test route; verify output format.
* **Rollback**: Revert `errorHandler.js`.

---

## 🌊 Wave 3: Shared UI Library & Utilities Restructuring (Phases 17–25)

### Phase 17: Categorize `Accordion.jsx` & `Kbd.jsx`
* **Scope**: Move unclassified primitives into `shared/ui/data-display/`.
* **Files Affected**:
  - Move: `shared/ui/Accordion.jsx` ──► `shared/ui/data-display/Accordion.jsx`
  - Move: `shared/ui/Kbd.jsx` ──► `shared/ui/data-display/Kbd.jsx`
  - Update: `shared/ui/index.js` re-exports.
* **Execution**: Relocate files; update `shared/ui/index.js` barrel.
* **Verification**: `lint_applet` passes; components importing from `@/shared/ui` compile cleanly.
* **Rollback**: Move files back to `shared/ui/` root.

### Phase 18: Normalize `registry/magicui/` into `shared/ui/buttons/`
* **Scope**: Integrate MagicUI interactive hover button into standard shared UI library.
* **Files Affected**:
  - Move: `src/registry/magicui/interactive-hover-button.jsx` ──► `src/shared/ui/buttons/InteractiveHoverButton.jsx`
  - Move: `src/registry/magicui/interactive-hover-button.css` ──► `src/shared/ui/buttons/interactive-hover-button.module.css`
  - Update: Consumers in `AdminCategories.jsx`, `Dashboard.jsx`.
  - Delete: `src/registry/` directory.
* **Execution**: Move files; update styling import to CSS module; update consumers.
* **Verification**: Button renders and animates on `/admin/categories` and `/admin/dashboard`.
* **Rollback**: Restore `src/registry/`.

### Phase 19: Relocate Marketing Features from `shared/ui/` to `features/home/`
* **Scope**: Move homepage-specific features out of `shared/ui/`.
* **Files Affected**:
  - Move: `shared/ui/FeaturesSection.jsx` ──► `features/home/components/Features/FeaturesSection.jsx`
  - Move: `shared/ui/FeaturesCustomLifespanCards.jsx` ──► `features/home/components/Features/FeaturesCustomLifespanCards.jsx`
  - Move: `shared/ui/FeaturesTrustRow.jsx` ──► `features/home/components/Features/FeaturesTrustRow.jsx`
  - Move: `shared/ui/featureCardVariants.js` ──► `features/home/constants/featureCardVariants.js`
  - Update: `features/home/components/HomePage.jsx`.
  - Leave transitional re-export shim in `shared/ui/` during this phase.
* **Execution**: Relocate files; update imports in `features/home/`; provide transitional shims in `shared/ui/`.
* **Verification**: Verify home page displays "Industrial Lifespan" and "Trust" cards properly.
* **Rollback**: Move files back to `shared/ui/`.

### Phase 20: Relocate `productUtils.js` from `shared/utils/` to `features/products/`
* **Scope**: Relocate domain-specific product utility to its owning feature.
* **Files Affected**:
  - Move: `shared/utils/productUtils.js` ──► `features/products/utils/product.utils.js`
  - Add: Deprecation shim at `shared/utils/productUtils.js`.
  - Update: Consumers across `features/products/` to import from `./utils/product.utils`.
* **Execution**: Relocate code; create backward-compatible shim in `shared/utils/`.
* **Verification**: Products page and ProductDetail page compute specs and badges without error.
* **Rollback**: Revert `productUtils.js`.

### Phase 21: Audit and Normalize `shared/ui/forms/` Primitives
* **Scope**: Verify forwardRef, unique IDs, and ARIA labels across form inputs (`Input`, `Textarea`, `Checkbox`, `Radio`, `CustomSelect`).
* **Files Affected**: `apps/web/src/shared/ui/forms/*.jsx`.
* **Execution**: Audit prop contracts; ensure consistent focus rings using `var(--primary)`.
* **Verification**: Test keyboard tab navigation across `/contact` quote form.
* **Rollback**: Revert form primitives.

### Phase 22: Audit and Normalize `shared/ui/feedback/` Primitives
* **Scope**: Standardize `Toast`, `Alert`, `ErrorBoundary`, `Spinner`, `Skeleton`.
* **Files Affected**: `apps/web/src/shared/ui/feedback/*.jsx`.
* **Execution**: Ensure high-contrast icons and color tokens (`var(--surface)`, `var(--text-main)`).
* **Verification**: Trigger a test toast notification; verify smooth enter/exit animations.
* **Rollback**: Revert feedback primitives.

### Phase 23: Audit and Normalize `shared/ui/overlays/` Primitives
* **Scope**: Standardize `Modal`, `Drawer`, `ConfirmDialog`, `InquiryModal`.
* **Files Affected**: `apps/web/src/shared/ui/overlays/*.jsx`.
* **Execution**: Ensure ESC key dismissal, focus trap, and background scroll lock.
* **Verification**: Open inquiry modal; verify backdrop blur and Escape key closes modal.
* **Rollback**: Revert overlay primitives.

### Phase 24: Audit and Normalize `shared/ui/navigation/` Primitives
* **Scope**: Standardize `Tabs`, `Breadcrumbs`, `Pagination`, `BackToTop`.
* **Files Affected**: `apps/web/src/shared/ui/navigation/*.jsx`.
* **Execution**: Ensure active tab indicator uses design token transitions.
* **Verification**: Browse `/products` pagination and `/products/:id` technical spec tabs.
* **Rollback**: Revert navigation primitives.

### Phase 25: Master Barrel Harmonization for `shared/ui/index.js`
* **Scope**: Consolidate and clean all exports from `apps/web/src/shared/ui/index.js`.
* **Files Affected**: `apps/web/src/shared/ui/index.js`.
* **Execution**: Organize exports cleanly by category comments; remove dead references.
* **Verification**: `lint_applet` passes; `compile_applet` succeeds.
* **Rollback**: Revert `shared/ui/index.js`.

---

## 🌊 Wave 4: Design Tokens & Styling Architecture (Phases 26–30)

### Phase 26: Relocate Ad-hoc Stylesheet from `pages/`
* **Scope**: Move `home-hero-redesign.css` from `pages/section-styles/` into `features/home/styles/`.
* **Files Affected**:
  - Move: `apps/web/src/pages/section-styles/home-hero-redesign.css` ──► `apps/web/src/features/home/styles/home-hero-redesign.module.css`
  - Delete: `apps/web/src/pages/section-styles/` directory.
  - Update: Consumers in `features/home/components/Hero/`.
* **Execution**: Convert to CSS module; import in `HomeHero.jsx`.
* **Verification**: Homepage hero renders with identical layout and responsive styles.
* **Rollback**: Move stylesheet back to `pages/section-styles/`.

### Phase 27: Modularize `features/products/styles/products.css`
* **Scope**: Split monolithic `products.css` into scoped CSS modules (`product-catalog.module.css`, `product-card.module.css`).
* **Files Affected**:
  - Split: `apps/web/src/features/products/styles/products.css`
  - Create: `product-catalog.module.css`, `product-filter.module.css`
  - Update: `ProductCatalog.jsx`, `ProductFilterSidebar.jsx`.
* **Execution**: Extract scoped class names into separate module files.
* **Verification**: Verify product catalog grid, cards, and filter sidebar render identically.
* **Rollback**: Revert to monolithic `products.css`.

### Phase 28: Modularize `features/admin/styles/`
* **Scope**: Modularize admin dashboard and settings styling.
* **Files Affected**: `apps/web/src/features/admin/styles/*.module.css`.
* **Execution**: Scope admin classes to avoid leaking styles into public layout.
* **Verification**: Verify admin dashboard, tables, and buttons render cleanly.
* **Rollback**: Revert admin stylesheets.

### Phase 29: Replace Hardcoded Hex Values with Semantic Tokens
* **Scope**: Audit JSX inline styles and replace hardcoded color hex codes with CSS variables.
* **Files Affected**: Components with inline `style={{ backgroundColor: '#...' }}`.
* **Execution**: Replace with `var(--surface)`, `var(--surface-raised)`, `var(--border-subtle)`.
* **Verification**: Verify visual appearance is indistinguishable in light and dark modes.
* **Rollback**: Revert modified files.

### Phase 30: Theme System Synchronization
* **Scope**: Audit all `[data-theme="dark"]` overrides in `dark-theme.css`.
* **Files Affected**: `apps/web/src/shared/styles/core/dark-theme.css`.
* **Execution**: Ensure contrast ratio WCAG AA (>4.5:1) for all body text in dark mode.
* **Verification**: Toggle theme in UI; inspect computed contrast ratios.
* **Rollback**: Revert `dark-theme.css`.

---

## 🌊 Wave 5: Feature Service Layer & HTTP Decoupling (Phases 31–38)

### Phase 31: Implement `categoryService` & Decouple `Navbar` and `MegaMenu`
* **Scope**: Create `category.service.js` and eliminate direct `fetch("/api/categories")` in navigation.
* **Files Affected**:
  - Create: `apps/web/src/features/products/services/category.service.js`
  - Update: `apps/web/src/features/navigation/components/Navbar.jsx`
  - Update: `apps/web/src/features/navigation/components/MegaMenu.jsx`
* **Execution**: Replace `fetch()` with `categoryService.getAll()`.
* **Verification**: Verify mega menu dropdown and navbar categories populate instantly.
* **Rollback**: Revert `Navbar.jsx` and `MegaMenu.jsx`.

### Phase 32: Decouple `AdminCategories` from Direct Fetch
* **Scope**: Route category CRUD operations in admin through `categoryService`.
* **Files Affected**:
  - Update: `features/products/categories/AdminCategories.jsx`
  - Update: `features/products/categories/AdminCategoryEditor.jsx`
* **Execution**: Replace raw fetch with `categoryService.getAll()`, `getById()`, `save()`, `delete()`.
* **Verification**: Create and edit a test category in admin; verify persistence.
* **Rollback**: Revert admin category components.

### Phase 33: Decouple `Dashboard.jsx` (Introduce `statsService`)
* **Scope**: Extract admin metric fetching into `stats.service.js`.
* **Files Affected**:
  - Create: `apps/web/src/features/admin/services/stats.service.js`
  - Update: `apps/web/src/features/admin/components/Dashboard.jsx`
* **Execution**: Replace `fetch("/api/categories")` and `fetch("/api/stats")` with `statsService.getSummary()`.
* **Verification**: Verify dashboard stat cards display active counts.
* **Rollback**: Revert `Dashboard.jsx`.

### Phase 34: Decouple `useAdminCatalog.js` & Hardcoded Upload Paths
* **Scope**: Refactor `useAdminCatalog.js` to call `categoryService` and use config media fallbacks.
* **Files Affected**:
  - Update: `apps/web/src/features/catalog/hooks/useAdminCatalog.js`
  - Create: `apps/web/src/config/media.config.js`
* **Execution**: Replace raw fetch with service call; replace hardcoded paths with config references.
* **Verification**: Open Admin Catalog; verify spreads generate and render correctly.
* **Rollback**: Revert `useAdminCatalog.js`.

### Phase 35: Decouple `Login.jsx` to use `authService`
* **Scope**: Standardize login request through `auth.service.js`.
* **Files Affected**:
  - Create: `apps/web/src/features/auth/services/auth.service.js`
  - Update: `apps/web/src/features/auth/components/Login.jsx`
* **Execution**: Replace inline fetch with `authService.login(username, password)`.
* **Verification**: Test admin login with valid and invalid credentials.
* **Rollback**: Revert `Login.jsx`.

### Phase 36: Decouple `AdminInquiries` to use `inquiryService`
* **Scope**: Standardize inquiry list and status updates through `inquiry.service.js`.
* **Files Affected**:
  - Create: `apps/web/src/features/inquiries/services/inquiry.service.js`
  - Update: `apps/web/src/features/inquiries/components/AdminInquiries.jsx`
  - Update: `apps/web/src/features/inquiries/components/AdminInquiryDetail.jsx`
* **Execution**: Replace inline fetch calls with service methods.
* **Verification**: Verify inquiries table renders submitted leads and updates status.
* **Rollback**: Revert inquiry components.

### Phase 37: Decouple `SiteContent.jsx` to use `contentService`
* **Scope**: Standardize CMS content updates through `content.service.js`.
* **Files Affected**:
  - Create: `apps/web/src/features/content-management/services/content.service.js`
  - Update: `apps/web/src/features/content-management/components/SiteContent.jsx`
* **Execution**: Wrap section content fetch and save in `contentService`.
* **Verification**: Edit a CMS content block in admin; verify change reflects on public page.
* **Rollback**: Revert `SiteContent.jsx`.

### Phase 38: Decouple `AdminMedia.jsx` to use `mediaService`
* **Scope**: Standardize media library uploads and file listing through `media.service.js`.
* **Files Affected**:
  - Create: `apps/web/src/features/media/services/media.service.js`
  - Update: `apps/web/src/features/media/components/AdminMedia.jsx`
* **Execution**: Wrap multipart upload and list query in `mediaService`.
* **Verification**: Upload a test image in admin media manager; verify preview.
* **Rollback**: Revert `AdminMedia.jsx`.

---

## 🌊 Wave 6: Feature Domain Anatomy Standardization (Phases 39–44)

### Phase 39: Standardize `features/about/` Module Anatomy
* **Scope**: Review and normalize `features/about/` directory, components, and public facade `index.js`.
* **Files Affected**: `apps/web/src/features/about/*`.
* **Execution**: Ensure uniform export barrel; verify clean imports.
* **Verification**: Visit `/about`; verify all 5 sections render without error.
* **Rollback**: Revert `features/about/`.

### Phase 40: Standardize `features/contact/` Module Anatomy
* **Scope**: Review `features/contact/` components, hooks, and CSS modules.
* **Files Affected**: `apps/web/src/features/contact/*`.
* **Execution**: Verify `quote-form.module.css`, `contact-info-cards.module.css` from Phase 1.
* **Verification**: Submit a quote request on `/contact`; assert success toast appears.
* **Rollback**: Revert `features/contact/`.

### Phase 41: Standardize `features/home/` Module Anatomy
* **Scope**: Organize `features/home/components/` into `Hero/`, `Features/`, `Showcase/`, `FAQ/`, `CTA/`.
* **Files Affected**: `apps/web/src/features/home/*`.
* **Execution**: Group sub-components cleanly; update `HomePage.jsx`.
* **Verification**: Visit `/`; verify all homepage sections display in order.
* **Rollback**: Revert `features/home/`.

### Phase 42: Standardize `features/manufacturing/` & `features/sustainability/`
* **Scope**: Clean up structure and barrel exports for manufacturing and ESG pages.
* **Files Affected**: `apps/web/src/features/manufacturing/*`, `apps/web/src/features/sustainability/*`.
* **Execution**: Ensure uniform barrel exports and clean prop contracts.
* **Verification**: Visit `/manufacturing` and `/sustainability`.
* **Rollback**: Revert modified files.

### Phase 43: Refactor `features/products/` Sub-modules
* **Scope**: Establish clean boundaries for `detail/`, `admin/`, `categories/`, `catalog/` inside `products/`.
* **Files Affected**: `apps/web/src/features/products/*`.
* **Execution**: Standardize `products/index.js` to export all public domain capabilities cleanly.
* **Verification**: Browse catalog, product detail, and admin product list.
* **Rollback**: Revert `features/products/`.

### Phase 44: Enforce Public Facade DAG Rule Across All Feature Barrels
* **Scope**: Verify that no component imports deep internal feature paths (e.g., replace `../products/components/ProductCard` with `@/features/products`).
* **Files Affected**: All consuming files across `apps/web/src/`.
* **Execution**: Codemod/update cross-feature imports to use public feature barrels.
* **Verification**: Run `lint_applet` to confirm zero circular or deep imports.
* **Rollback**: Revert import updates.

---

## 🌊 Wave 7: App Shell, Routing, & Layout Hardening (Phases 45–47)

### Phase 45: Declarative `ProtectedRoute` Implementation in `AppRouter.jsx`
* **Scope**: Implement `ProtectedRoute` component to eliminate brief flashes of unauthenticated admin UI.
* **Files Affected**:
  - Create: `apps/web/src/app/router/ProtectedRoute.jsx`
  - Update: `apps/web/src/app/router/AppRouter.jsx`
* **Execution**: Wrap all `/admin` routes in `<Route element={<ProtectedRoute />}><Route element={<AdminLayout />}>...`.
* **Verification**: Navigate to `/admin` without token; verify instantaneous redirect to `/admin/login`.
* **Rollback**: Revert `AppRouter.jsx`.

### Phase 46: Public Layout & Navigation Drawer Optimization
* **Scope**: Streamline `PublicLayout.jsx`, `MobileNavDrawer.jsx`, and `AnnouncementBar.jsx`.
* **Files Affected**: `apps/web/src/app/layouts/PublicLayout.jsx`, `features/navigation/*`.
* **Execution**: Prevent unnecessary re-renders of Navbar during route transitions.
* **Verification**: Click between public routes; observe fluid transition without navbar jitter.
* **Rollback**: Revert layout files.

### Phase 47: Code-Splitting & Rollup `manualChunks` Optimization
* **Scope**: Audit Vite bundle output and refine `manualChunks` in `vite.config.js`.
* **Files Affected**: `apps/web/vite.config.js`.
* **Execution**: Verify admin chunks remain separate and vendor chunks are correctly isolated.
* **Verification**: Run `compile_applet` and inspect chunk sizes.
* **Rollback**: Revert `vite.config.js`.

---

## 🌊 Wave 8: Verification, Deprecation Removal, & Quality Gate (Phases 48–50)

### Phase 48: Contract Phase: Remove Deprecation Shims & Clean Stale Imports
* **Scope**: Remove transitional re-export shims created in Waves 3–5.
* **Files Affected**:
  - Delete: `apps/web/src/shared/utils/productUtils.js` (shim)
  - Delete: `apps/web/src/shared/ui/FeaturesSection.jsx` (shim)
  - Delete: `apps/web/src/shared/ui/FeaturesCustomLifespanCards.jsx` (shim)
  - Delete: `apps/web/src/shared/ui/FeaturesTrustRow.jsx` (shim)
  - Delete: `apps/web/src/shared/ui/featureCardVariants.js` (shim)
* **Execution**: Verify zero consumers reference legacy paths before deletion.
* **Verification**: `npm run lint` and `npm run build` succeed with zero errors.
* **Rollback**: Restore shims.

### Phase 49: Full Workspace Regression Test
* **Scope**: Execute complete end-to-end verification across frontend and backend.
* **Files Affected**: Entire repository.
* **Execution**:
  - Run `npm run lint` (ESLint on all web files).
  - Run `npm run test` (Unit and integration tests).
  - Run `npm run build` (Vite build + copy-uploads script).
* **Verification**: Zero warnings, zero errors, 100% build pass.
* **Rollback**: Address any surfaced regression immediately.

### Phase 50: Final Architecture Sign-off, Documentation Update, & Git Tagging
* **Scope**: Update `docs/architecture/Target-Architecture.md` and `docs/index.md` with final refactored status.
* **Files Affected**: `docs/index.md`, `docs/refactor/20-decisions-log.md`.
* **Execution**: Mark refactoring plan as completed; log final verification checksum.
* **Verification**: All documentation is up-to-date and consistent.
* **Rollback**: N/A.
