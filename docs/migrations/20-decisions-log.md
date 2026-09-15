---
domain: architecture-refactoring
scope: decisions-log
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 20. Architectural Decision Records (ADRs)

## Index of Architectural Decisions

* **ADR-001**: Adoption of Feature-Sliced Design (FSD) for Frontend Structure
* **ADR-002**: Dual-Engine Styling Architecture (Tailwind v4 + Scoped CSS Modules)
* **ADR-003**: Retention of LibSQL Multi-Mode Driver (Turso + Local SQLite)
* **ADR-004**: 6-Layer Modular Architecture for Backend Domain Services
* **ADR-005**: Four-Tier State Architecture (React Context + Domain Hooks)
* **ADR-006**: Serverless Cold-Start Resilience via `/tmp` Database Snapshotting
* **ADR-007**: Expand-and-Contract Pattern for Zero-Downtime File Relocations
* **ADR-008**: Sharp WebP Image Pipeline with Dimension Capping
* **ADR-009**: Directed Acyclic Graph (DAG) Enforcement via Public Facades
* **ADR-010**: 50-Phase Granular Execution Strategy

---

## ADR-001: Adoption of Feature-Sliced Design (FSD) for Frontend
* **Status**: **Accepted**
* **Context**: The frontend was mixing domain-specific UI (e.g. `FeaturesSection.jsx`) with primitive design system components in `shared/ui/`, causing coupling and confusion.
* **Decision**: Adopt a simplified Feature-Sliced Design hierarchy (`app/` -> `pages/` -> `features/` -> `shared/`). All domain logic lives strictly inside `features/<domain>/`.
* **Consequences**:
  - High cohesion within domain features.
  - Reusable primitives in `shared/ui/` remain 100% agnostic of product or company concepts.
  - Cross-feature dependencies must flow through public barrels.

---

## ADR-002: Dual-Engine Styling Architecture
* **Status**: **Accepted**
* **Context**: Pure Tailwind utility classes become unwieldy for multi-breakpoint animations, pseudo-element overlays, and complex flipbook layouts. Pure CSS files suffer from global namespace collisions.
* **Decision**: Standardize on Tailwind v4 for rapid responsive layout utilities, paired with CSS Modules (`*.module.css`) for encapsulated component-specific styling and keyframe animations.
* **Consequences**:
  - Zero global class naming collisions.
  - Clean JSX without 20-line class strings for intricate visual components.

---

## ADR-003: Retention of LibSQL Multi-Mode Driver
* **Status**: **Accepted**
* **Context**: The app runs both locally in Docker/containers (local SQLite file) and on cloud platforms (Turso remote database).
* **Decision**: Retain `@libsql/client` as the unified database client rather than switching to an ORM like Prisma or Drizzle, utilizing `dbShim.js` for synchronous-like `all()`, `get()`, and `run()` helper methods.
* **Consequences**:
  - Zero heavy ORM build dependencies.
  - Near-zero cold start latency on serverless deployments.
  - Full compatibility with both local files and remote Turso cloud endpoints.

---

## ADR-004: 6-Layer Modular Architecture for Backend Express Modules
* **Status**: **Accepted**
* **Context**: Backend modules in `apps/api/src/modules/` had varying separation of concerns (some routes embedded raw SQL directly, others used repositories).
* **Decision**: Enforce standard 6 layers across all 9 domain modules: `routes` -> `validator` -> `controller` -> `service` -> `repository` -> `mapper`.
* **Consequences**:
  - Database queries are strictly isolated in `*.repository.js`.
  - Input validation happens before controller execution.
  - Service methods are easily unit tested without mocking HTTP request/response objects.

---

## ADR-005: Four-Tier State Architecture
* **Status**: **Accepted**
* **Context**: The app was evaluated for external state stores like Redux Toolkit or Zustand.
* **Decision**: Reject heavy external state stores. Standardize on React Context (`SiteContext`, `ToastContext`), Custom Domain Hooks (`useProducts`, `useAdminCatalog`), and local `useState`.
* **Consequences**:
  - Keeps bundle lean (<150 kB gzipped initial chunk).
  - Eliminates Redux boilerplate.

---

## ADR-006: Serverless Cold-Start Resilience via `/tmp` Snapshotting
* **Status**: **Accepted**
* **Context**: On Vercel serverless functions, the root filesystem is read-only, causing SQLite file writes to crash unless redirected.
* **Decision**: On cold-start in `api/index.js`, detect serverless environment and replicate `data/vishal_enterprise.db` to `/tmp/vishal_enterprise.db` when Turso cloud credentials are not supplied.
* **Consequences**:
  - Full application functionality persists even in demo serverless environments.

---

## ADR-007: Expand-and-Contract Pattern for File Relocations
* **Status**: **Accepted**
* **Context**: Moving utility files and components across directories risks breaking unmapped import references.
* **Decision**: In every relocation phase, leave a temporary re-export shim at the legacy location, migrate consumers in sequence, and delete the shim only in Wave 8 (Phase 48).
* **Consequences**:
  - Zero broken imports during incremental migration phases.
  - Predictable, low-stress code reviews.

---

## ADR-008: Sharp WebP Image Pipeline with Dimension Capping
* **Status**: **Accepted**
* **Context**: Users and admins upload multi-megabyte PNG and JPEG product photos, slowing down mobile catalog performance.
* **Decision**: Implement automatic Sharp image transcoding on upload: convert all images to WebP (quality 80), strip EXIF metadata, cap max dimensions to 1920px, and generate 400px thumbnails.
* **Consequences**:
  - 60–75% reduction in asset bandwidth.
  - Fast mobile catalog loading.

---

## ADR-009: DAG Enforcement via Public Facades
* **Status**: **Accepted**
* **Context**: Components were importing internal files of other features (e.g. `../products/categories/AdminCategories.jsx`), making feature refactoring risky.
* **Decision**: Mandate that every feature and shared module exposes a public `index.js` barrel. Deep cross-feature imports are prohibited by architectural invariant.
* **Consequences**:
  - Feature internals can be freely refactored without breaking external consumers.
  - Clear, clean import statements across the entire codebase.

---

## ADR-010: 50-Phase Granular Execution Strategy
* **Status**: **Accepted**
* **Context**: Monolithic large-scale refactorings often fail due to compounding merge conflicts, lost context, or broken tests.
* **Decision**: Structure the refactoring into 50 discrete, sequentially verifiable phases across 8 waves.
* **Consequences**:
  - Every single change is independently verified with linter and compilation checks.
  - If an issue occurs, the blast radius is restricted to a single phase.
