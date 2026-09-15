---
domain: architecture-refactoring
scope: architecture-audit
status: complete-audit
created_at: 2026-09-10
version: 1.0.0
---

# 02. Architecture Audit & Technical Debt Analysis

## 1. Architectural Health Assessment

A comprehensive audit of the **Vishal Enterprise** repository was conducted covering module boundaries, dependency graphs, data-flow hygiene, error handling, styling coherence, and operational scripts.

While the monorepo exhibits high visual craft and modular intent, rapid development and iterative styling patches have introduced structural coupling, leaky abstractions, and technical debt across both tiers.

---

## 2. Identified Anti-Patterns & Defect Catalog

### Defect 1: Direct Component-Level Data Fetching (Bypassing API Layer)
* **Severity**: **Critical**
* **Location**:
  - `apps/web/src/features/navigation/components/Navbar.jsx` (lines 58, 69)
  - `apps/web/src/features/navigation/components/MegaMenu.jsx` (line 115)
  - `apps/web/src/features/products/categories/AdminCategories.jsx` (lines 18, 28)
  - `apps/web/src/features/products/categories/AdminCategoryEditor.jsx` (lines 63, 88)
  - `apps/web/src/features/admin/components/Dashboard.jsx` (line 63)
  - `apps/web/src/features/catalog/hooks/useAdminCatalog.js` (line 29)
* **Symptom**: Components make raw `window.fetch("/api/categories", { headers: ... })` calls instead of calling `productService` or `api.get()`.
* **Impact**:
  - Authentication tokens must be manually fetched and attached in each component.
  - Error envelopes and status codes are handled inconsistently (some catch blocks log silently, others invoke `alert()`).
  - Request caching, deduplication, and retry logic cannot be centrally managed.
* **Remediation**: Funnel all category and catalog requests through `categoryService` and `productService` powered by `shared/api/client.js`.

---

### Defect 2: Endpoint Constant Desynchronization
* **Severity**: **High**
* **Location**: `apps/web/src/shared/api/endpoints.js` (line 6)
* **Code**: `CATEGORIES: '/products/categories'`
* **Symptom**: The backend mounts the category router at `/api/categories` (`apps/api/src/routes/index.js` line 100), but the frontend constant specifies `/products/categories`.
* **Impact**: Any component attempting to use `API_ENDPOINTS.CATEGORIES` receives a 404 Not Found error. Developers were forced to bypass the constant and write hardcoded `/api/categories` string literals.
* **Remediation**: Correct `API_ENDPOINTS.CATEGORIES` to `'/categories'` and enforce usage across all services.

---

### Defect 3: Leaky Domain Abstraction (`productUtils.js` in `shared/`)
* **Severity**: **Medium**
* **Location**: `apps/web/src/shared/utils/productUtils.js`
* **Symptom**: Contains business logic explicitly coupled to the `products` domain (e.g., parsing product specs, formatting pallet load capacities, calculating discount badges).
* **Impact**: Violates the core principle of Feature-Sliced Design. Lower `shared` tier depends on higher domain semantics.
* **Remediation**: Relocate `productUtils.js` to `apps/web/src/features/products/utils/product.utils.js`, update consuming imports, and leave a backwards-compatible re-export in `shared/utils/` during migration.

---

### Defect 4: Filesystem Anomalies & Root Pollution
* **Severity**: **Medium**
* **Locations**:
  - `/src/assets/images/world_map_export_network_1786874321977.jpg`: Orphaned root `src/` directory created by an errant tool call or asset download.
  - `/directory.md`: 0-byte empty file at the workspace root.
  - Root scripts: 15 ad-hoc node scripts (`patch_navbar*.js`, `replace-*.js`, `check-icons*.js`, `fix-missing-icons.js`) littering the project root.
  - `apps/web/src/pages/section-styles/home-hero-redesign.css`: A stylesheet stored inside the route containers folder (`pages/`).
  - `apps/web/src/registry/magicui/`: Component folder outside standard `shared/ui/`.
* **Impact**: Cognitive overhead, confusing asset imports, and cluttered repository root.
* **Remediation**: Move the world map image to `apps/web/src/assets/images/maps/`, remove orphaned root files, relocate `home-hero-redesign.css` to `features/home/styles/`, and normalize `registry/` into `shared/ui/buttons/`.

---

### Defect 5: Unstructured Shared UI Primitives
* **Severity**: **Medium**
* **Location**: `apps/web/src/shared/ui/`
* **Symptom**: While most components are neatly nested in subdirectories (`buttons/`, `forms/`, `layout/`), several components sit unclassified at the root of `shared/ui/`:
  - `Accordion.jsx`
  - `Kbd.jsx`
  - `FeaturesSection.jsx` (Actually a feature/home section, not a base primitive!)
  - `FeaturesCustomLifespanCards.jsx`
  - `FeaturesTrustRow.jsx`
  - `featureCardVariants.js`
* **Impact**: Blurs the line between generic UI atoms and composite marketing/feature components.
* **Remediation**: Relocate `Accordion.jsx` and `Kbd.jsx` to `shared/ui/data-display/`, and move `FeaturesSection` and its sub-cards to `features/home/components/`.

---

### Defect 6: Hardcoded Static Media Paths in Application Logic
* **Severity**: **Low / Medium**
* **Location**:
  - `apps/web/src/features/home/components/Hero/HomeHero.jsx`
  - `apps/web/src/features/home/components/Hero/HomeHeroMobile.jsx`
  - `apps/web/src/features/home/components/ProductsShowcase.jsx`
  - `apps/web/src/features/catalog/hooks/useAdminCatalog.js`
  - `apps/web/src/features/catalog/components/spreads/CoverAboutSpread.jsx`
* **Symptom**: Direct references to timestamped upload strings such as `"/uploads/products/categories/plastic-lumber-1770446410430-0.webp"`.
* **Impact**: If uploads are cleared or moved to external S3/CDN storage, images break without compile-time warnings.
* **Remediation**: Introduce a media fallback catalog constant in `config/media.config.js` or `constants/media.constants.js` to ensure resilient fallback image URLs.

---

### Defect 7: Total Absence of Automated Test Harness
* **Severity**: **High**
* **Location**: Entire monorepo
* **Symptom**: Zero `.test.js`, `.test.jsx`, or `.spec.js` files in `apps/web/` or `apps/api/`. No test runner declared in `package.json`.
* **Impact**: Every refactoring action relies entirely on static linting and manual verification, carrying regression risk for edge cases.
* **Remediation**: Establish Vitest + React Testing Library in `apps/web` and Supertest in `apps/api` in Phase 2 of the migration.

---

## 3. Summary Scorecard

| Architectural Dimension | Current Rating | Target Rating | Primary Remediation Action |
| :--- | :---: | :---: | :--- |
| **Layered Separation** | 3.5 / 5.0 | 5.0 / 5.0 | Enforce DAG imports; eliminate cross-feature leaks |
| **Data Fetching Hygiene** | 2.5 / 5.0 | 5.0 / 5.0 | Route all queries through feature services + `api` client |
| **Component Hierarchy** | 4.0 / 5.0 | 5.0 / 5.0 | Organize `shared/ui` by category; relocate marketing sections |
| **Asset & Styling Hygiene** | 4.0 / 5.0 | 5.0 / 5.0 | Consolidate CSS modules; eliminate ad-hoc CSS in `pages/` |
| **Repository Cleanliness** | 3.0 / 5.0 | 5.0 / 5.0 | Purge legacy root scripts and clean orphaned `/src/` |
| **Testing & Verification** | 1.0 / 5.0 | 4.5 / 5.0 | Deploy Vitest and Supertest baseline suites |
