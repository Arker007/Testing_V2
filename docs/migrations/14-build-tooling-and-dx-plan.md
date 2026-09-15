---
domain: architecture-refactoring
scope: build-tooling-and-dx
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 14. Build Tooling & Developer Experience (DX) Plan

## 1. Unified Monorepo Script Architecture

Currently, scripts are scattered with overlapping names across the root and `apps/web`. We establish a clear, predictable script lifecycle across the workspace:

```json
// Root package.json
{
  "scripts": {
    "start": "node apps/api/index.js",
    "dev": "node apps/api/index.js",
    "dev:web": "cd apps/web && npm run dev",
    "build": "node scripts/build.js",
    "lint": "cd apps/web && npm run lint",
    "seed:base": "node apps/api/scripts/seed.js",
    "seed:catalog": "node apps/api/scripts/seedProductsCatalog.js",
    "seed:specs": "node apps/api/scripts/backfillSpecifications.js",
    "clean": "node scripts/clean.js"
  }
}
```

---

## 2. Vite Build & Proxy Optimization (`apps/web/vite.config.js`)

The Vite configuration provides seamless local development and production chunking:

1. **Proxy Target Resilience**:
   ```javascript
   const backendOrigin = env.VITE_API_URL || "http://localhost:3000";
   // Proxies /api and /uploads to backend Express process
   ```
2. **Path Aliasing**:
   - Standardized on `@/` pointing directly to `apps/web/src/`.
3. **Optimized Manual Chunks**:
   - `react-vendor`: React, ReactDOM, Scheduler.
   - `router`: React Router DOM.
   - `admin`: All routes and components under `/features/admin/`, `/features/content-management/`, `/features/catalog/`, `/features/media/`, etc.
   - Ensures the public initial bundle remains lean (<150 kB gzipped).

---

## 3. Purging Legacy Patch Scripts from Project Root

Over 15 ad-hoc patching scripts currently clutter the root directory. These were created during historical migrations and are now dead code:

### Deletion / Archival Candidate List:
* `check-icons.js`, `check-icons2.js`
* `find-icons.js`, `find-icons2.js`
* `fix-missing-icons.js`
* `patch_navbar_dropdown.js`, `patch_navbar_dropdown_size.js`, `patch_navbar_hover.js`, `patch_navbar.js`
* `patch_product_card_final.js`, `patch_product_card.js`
* `replace-all-solar.js`, `replace-icons.js`, `replace-phase2.js`, `replace-phase3.js`
* `directory.md` (0 bytes)

Any scripts with ongoing utility will be consolidated into `scripts/maintenance/` with clear documentation.
