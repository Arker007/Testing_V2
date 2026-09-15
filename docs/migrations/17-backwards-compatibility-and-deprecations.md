---
domain: architecture-refactoring
scope: backwards-compatibility-and-deprecations
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 17. Backwards Compatibility & Deprecation Strategy

## 1. Zero-Regression Philosophy

In a live production system, structural reorganizations must not break existing consumers. To prevent regressions during the 50-phase migration, all structural refactorings follow the **Expand and Contract Pattern**:

```text
Step 1: EXPAND
Create the new canonical module at the target location.

Step 2: BRIDGE (Shim / Façade)
Leave a thin re-export shim at the legacy location forwarding calls to the new location.

Step 3: MIGRATE
Update consuming files incrementally to import directly from the new location.

Step 4: CONTRACT
Once all imports are updated and verified, safely delete the legacy shim.
```

---

## 2. Re-Export Shim Implementation Standards

When a utility or component is relocated (e.g., `productUtils.js` moving from `shared/utils/` to `features/products/utils/`):

```javascript
// apps/web/src/shared/utils/productUtils.js (Transitional Shim)
/**
 * @deprecated Relocated to @/features/products/utils/product.utils.js.
 * This re-export shim ensures zero breakage during Phase 22 migration.
 */
export * from "@/features/products/utils/product.utils";
export { default } from "@/features/products/utils/product.utils";
```

---

## 3. Backend Route Compatibility Aliasing

If legacy frontend components or third-party integrations call `/api/products/categories`, provide a temporary route alias in Express:

```javascript
// apps/api/src/routes/index.js
// Canonical Route:
router.use("/categories", categoriesRouter);

// Backwards-Compatibility Alias:
router.use("/products/categories", categoriesRouter);
```
This ensures zero downtime or 404 errors during rollout phases.

---

## 4. Database Schema Migration Invariants

1. **Additive Only**: Migrations may add new columns (`ALTER TABLE ... ADD COLUMN ...`) or create new tables. Migrations must NEVER drop columns or rename existing tables without a multi-release phase.
2. **Nullable / Default Values**: All newly added columns must have a default value or be nullable to prevent constraint violations on existing rows.
3. **Idempotent Execution**: Every migration script must be safe to execute multiple times (`IF NOT EXISTS`, `INSERT OR IGNORE`).
