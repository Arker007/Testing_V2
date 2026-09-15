---
domain: architecture-refactoring
scope: project-wide
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 00. Refactoring Overview & Executive Strategy

## 1. Executive Summary

This document establishes the strategic vision, governance model, safety invariants, and execution principles for a production-grade refactoring of the **Vishal Enterprise** full-stack industrial platform. 

The codebase currently operates as a full-stack monorepo consisting of:
- **Frontend (`apps/web`)**: React 19, Vite 7, Tailwind CSS v4, `@iconify/react` (`solar:*`), CSS Modules, and React Router DOM v7.
- **Backend (`apps/api`)**: Node.js / Express 4, LibSQL / Turso client with SQLite local fallback, Sharp image processing pipeline, custom authentication middleware, and modular domain routes.
- **Root & Tooling**: Vercel serverless integration (`/api/index.js`), custom build script (`scripts/build.js`), and legacy maintenance scripts.

While the platform is functional and currently passes compilation and basic linting, organic feature growth has resulted in architectural drift, component-level data fetching coupling, leaky domain abstractions, inconsistent naming conventions, orphaned patch scripts, and zero automated test coverage.

This refactoring initiative transitions the system into a hardened, highly maintainable, scalable **Feature-Sliced Design (FSD) + Clean Layered Architecture** with strict modular isolation, zero regression tolerance, and a phased 50-stage rollout plan.

---

## 2. Refactoring Objectives & Key Results (OKRs)

### Objective 1: Architectural Rigor & Separation of Concerns
* **KR 1.1**: Enforce strict directional dependencies: `Shared` -> `Features` -> `Pages` -> `App`. Prohibit cross-feature direct imports without public facades (`index.js`).
* **KR 1.2**: Standardize backend architecture on a verifiable 6-layer structure (`routes` -> `validator` -> `controller` -> `service` -> `repository` -> `mapper`).
* **KR 1.3**: Decouple UI components from raw HTTP requests by funneling all remote calls through typed feature services and a centralized `api` client.

### Objective 2: Eliminating Technical Debt & Code Smells
* **KR 2.1**: Audit and safely remove 12+ legacy root-level patch scripts (`patch_*.js`, `replace-*.js`, `check-icons*.js`) and archive active utilities into a structured `scripts/` directory.
* **KR 2.2**: Resolve directory anomalies (e.g., remove orphaned root `src/` directory containing orphaned static assets, relocate `apps/web/src/pages/section-styles/`).
* **KR 2.3**: Remove domain leakages from `shared/` (relocate `productUtils.js` into `features/products/utils/`).

### Objective 3: Resilient State & Data Pipeline
* **KR 3.1**: Eliminate duplicate and inconsistent API endpoint declarations (e.g., fix incorrect `CATEGORIES: '/products/categories'` to `/categories`).
* **KR 3.2**: Replace unhandled `fetch().then()` promises in UI components with structured async/await, centralized error boundaries, and user-facing notifications.
* **KR 3.3**: Formalize the database migration and seeder pipeline for LibSQL / Turso with idempotent schema versioning.

### Objective 4: Establishing a Quality & Testing Foundation
* **KR 4.1**: Introduce Vitest and React Testing Library for frontend component and hook testing.
* **KR 4.2**: Introduce Node.js native test runner / Supertest for backend API route and controller testing.
* **KR 4.3**: Achieve a baseline verification suite to protect critical business flows (Catalog browsing, Quote/Inquiry submission, Admin authentication, Product CRUD).

---

## 3. Scope Boundaries

### In-Scope
1. Structural reorganization of `apps/web/src/` into cleanly defined architectural layers (`app/`, `pages/`, `features/`, `shared/`, `assets/`, `styles/`).
2. Hardening and completion of the 6-layer architecture in `apps/api/src/modules/`.
3. Unification and sanitization of the styling architecture (Tailwind CSS v4 design tokens + scoped CSS Modules).
4. Centralization of API client calls, eliminating direct inline `fetch()` and hardcoded endpoints.
5. Consolidation and cleanup of root-level utility scripts, build configs, and static asset references.
6. Creation of a complete 50-phase migration plan with verified checkpoints.

### Explicitly Out-of-Scope (Non-Goals)
1. **No Unsolicited Feature Additions**: No new business features, unrequested external SDKs, or promotional sections.
2. **No Visual Design Regressions**: The user interface must preserve its exact visual hierarchy, typography, base-4 spacing, and dark/light theme behavior.
3. **No Database Engine Migration**: The persistence layer remains on LibSQL / SQLite; no migration to PostgreSQL, MySQL, or Mongo is planned.
4. **No Framework Rewrites**: React 19, Vite, Express, and Tailwind CSS v4 are preserved.

---

## 4. Architectural Safety Invariants

Every single phase in this refactoring must adhere to the **Four Golden Invariants**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   THE FOUR ARCHITECTURAL INVARIANTS                    │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Zero Behavioral Drift       │ Every endpoint, prop contract, and    │
│                                │ user interaction must behave identically│
├────────────────────────────────┼───────────────────────────────────────┤
│ 2. Independent Testability     │ Each migration step must compile,     │
│                                │ lint, and function in total isolation. │
├────────────────────────────────┼───────────────────────────────────────┤
│ 3. Atomic Backward Compatibility│ Re-export shims and facades must      │
│                                │ protect legacy consumers during shifts.│
├────────────────────────────────┼───────────────────────────────────────┤
│ 4. Single-Direction Imports    │ Lower layers may never import from    │
│                                │ higher layers (Strict DAG rule).      │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

## 5. Risk Assessment & Mitigation Matrix

| Risk Factor | Probability | Impact | Severity | Mitigation Strategy |
| :--- | :---: | :---: | :---: | :--- |
| **Broken Import Paths** | High | High | **Critical** | Implement transitional barrel re-export shims (`index.js`) at every legacy location before updating consuming files. Run `lint_applet` after every step. |
| **API Contract Mismatch** | Medium | High | **High** | Freeze backend endpoint signatures; verify response envelope `{ success, data, error }` consistency before altering client consumption. |
| **CSS Specificity Collision** | Medium | Medium | **Medium** | Ensure CSS Modules continue to scope class names; never introduce global style selectors during feature reorganization. |
| **Build & Deployment Failure** | Low | High | **High** | Preserve `scripts/build.js`, `apps/web/scripts/copy-uploads.mjs`, and `api/index.js` Vercel integration contracts. Test with `compile_applet`. |
| **Vercel Serverless Desync** | Medium | High | **High** | Keep `api/index.js` as the canonical serverless entrypoint with lazy database bootstrap intact. |

---

## 6. Execution Governance & Protocol

The refactoring will be governed by the following execution sequence:

```text
[0. Planning & Documentation] (Current Turn)
             │
             ▼
[1. Baseline & Tooling Setup] (Phases 1-5)
             │
             ▼
[2. Backend Layer Hardening]  (Phases 6-15)
             │
             ▼
[3. Shared UI & Primitives]   (Phases 16-25)
             │
             ▼
[4. Frontend Feature Domains] (Phases 26-38)
             │
             ▼
[5. App Shell & Routing]      (Phases 39-44)
             │
             ▼
[6. Verification & Cleanup]   (Phases 45-50)
```

Each phase defines:
1. **Target Artifacts & Changes**
2. **Prerequisites & Dependencies**
3. **Step-by-Step Implementation Instructions**
4. **Automated & Manual Verification Criteria**
5. **Rollback Actions**

No phase will be marked complete until verified against `lint_applet` and `compile_applet`.
