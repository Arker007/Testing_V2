# Enterprise Architecture Migration Plan

**Project:** Vishal Enterprise Web Application  
**Target Architecture:** Feature-First Monorepo / Modular Clean Architecture  
**Strategy:** Incremental, non-breaking phased migration  

---

## Overview

This migration plan outlines the step-by-step evolution of the **Vishal Enterprise** codebase from its current single-repository state to a scalable, production-ready enterprise architecture. Each phase is self-contained, minimized in scope to avoid regressions, and includes clear risk mitigation and acceptance criteria.

---

## Migration Roadmap Summary

```
[Phase 1] Core Consolidation & Cleanup
    │
[Phase 2] Security & Secret Hardening
    │
[Phase 3] Shared Monorepo Package Setup (@enterprise/types, @enterprise/validation)
    │
[Phase 4] Database Layer Abstraction (Drizzle ORM & Postgres Support)
    │
[Phase 5] Backend Domain Modularization (Clean Architecture)
    │
[Phase 6] Frontend Feature-First Restructuring
    │
[Phase 7] Cloud Media Pipeline Integration (S3/R2)
    │
[Phase 8] Frontend State Modernization (TanStack Query & Zustand)
    │
[Phase 9] Enterprise CI/CD & Observability
```

---

## Phase Details

### Phase 1: Core Consolidation & Tree Cleanup

#### Objective
Eliminate duplicate backend codebases (`/backend` vs `/server`) and establish a single source of truth for the Express API server to prevent code divergence and deployment regressions.

#### Affected Files & Directories
- **To Remove:** `/server/` (entire directory)
- **To Update:** 
  - `package.json`
  - `vercel.json`
  - `api/index.js`
  - `scripts/build.js`
  - `Fixes.md`

#### Risks
- Minor risk of broken import paths if external entrypoints (like `api/index.js` or deployment scripts) reference `/server` instead of `/backend`.

#### Dependencies
- None.

#### Expected Outcome
- Single, canonical backend server codebase residing in `/backend`.
- Cleaner repository tree and deterministic build artifacts.

---

### Phase 2: Security & Secret Hardening

#### Objective
Enforce strict environment configuration management, eliminate hardcoded fallback secrets, implement API rate-limiting, and prepare stateful session protection.

#### Affected Files & Directories
- `backend/middleware/auth.js`
- `backend/routes/auth.js`
- `backend/routes/inquiries.js`
- `backend/index.js`
- `.env.example`

#### Risks
- Server startup will fail if required environment variables (`JWT_SECRET`) are missing in target environments (by design).

#### Dependencies
- Phase 1 completion.

#### Expected Outcome
- Mandatory JWT secret validation on server initialization.
- Rate limiting active on `/api/auth/login` and `/api/inquiries`.
- Protected admin routes against credential brute-force attacks.

---

### Phase 3: Monorepo Package Setup & Type Contracts

#### Objective
Initialize pnpm/Turborepo workspace infrastructure and extract shared TypeScript interface contracts and validation schemas into dedicated workspace packages.

#### Affected Files & Directories
- **New Files:**
  - `pnpm-workspace.yaml` / `turbo.json`
  - `packages/types/package.json` & `packages/types/src/*`
  - `packages/validation/package.json` & `packages/validation/src/*`
  - `packages/config/package.json` (ESLint/TSConfig presets)
- **To Update:**
  - `root package.json`
  - `frontend/package.json`
  - `backend/package.json`

#### Risks
- Temporary import path resolution issues during TypeScript workspace link initialization.

#### Dependencies
- Phase 2 completion.

#### Expected Outcome
- Shared domain DTOs and validation schemas consumed seamlessly across both frontend and backend without code duplication.

---

### Phase 4: Database Layer Abstraction & Modernization

#### Objective
Decouple raw SQL queries in `database.js` by introducing Drizzle ORM schemas, supporting both local development (SQLite) and enterprise production (PostgreSQL).

#### Affected Files & Directories
- **New Files:**
  - `backend/src/db/schema.ts`
  - `backend/src/db/drizzle.config.ts`
  - `backend/src/db/migrations/*`
- **To Refactor/Replace:**
  - `backend/config/database.js` (645 lines refactored into modular repository classes)

#### Risks
- Data loss risk during database schema migration if migration scripts are not tested against existing production datasets.

#### Dependencies
- Phase 3 completion (Types package).

#### Expected Outcome
- Type-safe database queries via ORM.
- Clear separation between seed data, schema definitions, and migration scripts.

---

### Phase 5: Backend Domain Modularization (Clean Architecture)

#### Objective
Refactor monolithic backend controllers and routes into modular, domain-driven folders following Clean Architecture principles (Application, Domain, Infrastructure, Presentation).

#### Affected Files & Directories
- `backend/routes/*` → Migrated to `backend/src/modules/<domain>/presentation/`
- `backend/validators/*` → Migrated to `@enterprise/validation`
- `backend/middleware/*` → Migrated to `backend/src/shared/middleware/`

#### Risks
- Breaking API endpoints if HTTP route signatures or JSON payload structures change inadvertently.

#### Dependencies
- Phase 4 completion (Database abstraction).

#### Expected Outcome
- Fully isolated, testable domain modules (`auth`, `products`, `inquiries`, `content`, `media`).
- Clear distinction between business logic, database queries, and HTTP routing.

---

### Phase 6: Frontend Feature-First Restructuring

#### Objective
Reorganize `frontend/src` into feature-first modules, isolating components, hooks, services, and page views per business domain.

#### Affected Files & Directories
- `frontend/src/pages/*` & `frontend/src/features/*` → Reorganized into:
  - `frontend/src/features/products/`
  - `frontend/src/features/inquiries/`
  - `frontend/src/features/content-management/`
  - `frontend/src/features/catalog/`
  - `frontend/src/features/auth/`
- `frontend/src/index.css` (1,519 lines) → Modularized into feature styles / Tailwind components.

#### Risks
- Broken relative import paths across React components during file relocation.

#### Dependencies
- Phase 3 completion (Shared packages).

#### Expected Outcome
- Feature-isolated frontend folder hierarchy.
- Significantly smaller CSS bundles and cleaner component responsibilities.

---

### Phase 7: Cloud Storage & Media Upload Pipeline

#### Objective
Replace local disk upload handlers (`/uploads`) with an abstracted Cloud Object Storage driver (AWS S3 / Cloudflare R2 / Google Cloud Storage).

#### Affected Files & Directories
- `backend/src/modules/media/infra/S3StorageAdapter.ts`
- `backend/src/modules/media/presentation/upload.controller.ts`
- `frontend/src/features/media/components/AdminMediaUploader.tsx`

#### Risks
- Third-party cloud service credentials needed in production environment configuration.

#### Dependencies
- Phase 5 completion (Backend domain modularization).

#### Expected Outcome
- Statless, scalable backend containers.
- Reliable media upload handling across serverless and load-balanced cloud environments.

---

### Phase 8: Frontend State & Data Fetching Modernization

#### Objective
Replace generic custom hooks and context state with TanStack Query (React Query) for server state caching and Zustand for client state management.

#### Affected Files & Directories
- `frontend/src/context/SiteContext.jsx` → Refactored to light Zustand store
- `frontend/src/hooks/useProducts.js`, `useInquiry.js` → Replaced with TanStack Query hooks

#### Risks
- Temporary UI flicker or cache invalidation bugs if Query Keys are misconfigured.

#### Dependencies
- Phase 6 completion (Frontend feature restructuring).

#### Expected Outcome
- Automated background refetching, optimistic UI updates, and intelligent API caching.

---

### Phase 9: Enterprise CI/CD & Observability

#### Objective
Establish automated continuous integration workflows, static code analysis, and structured observability logging.

#### Affected Files & Directories
- **New Files:**
  - `.github/workflows/ci.yml`
  - `.github/workflows/cd.yml`
  - `backend/src/shared/logging/logger.ts` (Pino logger)

#### Risks
- Minimal runtime risk; build/test pipeline adjustments required.

#### Dependencies
- Phases 1–8 completion.

#### Expected Outcome
- Automated linting, type-checking, and testing on every pull request.
- Structured JSON logging across all backend environments.
