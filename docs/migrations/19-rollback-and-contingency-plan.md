---
domain: architecture-refactoring
scope: rollback-and-contingency
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 19. Rollback & Contingency Response Protocol

## 1. Safety Tenets & Abort Triggers

To safeguard the production platform during execution of the 50 migration phases, the following **Immediate Abort Triggers** are established:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        CRITICAL ABORT TRIGGERS                         │
├──────────────────────┬─────────────────────────────────────────────────┤
│ Trigger 1: Build Err │ `npm run build` or `compile_applet` fails.      │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Trigger 2: Lint Err  │ `npm run lint` or `lint_applet` fails.          │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Trigger 3: 404/500   │ Core API route (/products, /categories, /contact│
│                      │ or /auth/login) returns an unhandled 404 or 500.│
├──────────────────────┼─────────────────────────────────────────────────┤
│ Trigger 4: UI Shift  │ Visual design regression or broken stylesheet.  │
└──────────────────────┴─────────────────────────────────────────────────┘
```
**Mandate**: If ANY trigger occurs during a phase, work on subsequent phases is strictly halted until resolved or rolled back.

---

## 2. Git Checkpoint & Branching Strategy

Before beginning any execution wave:
1. Ensure the workspace is clean (`git status`).
2. Tag the pre-refactor state:
   ```bash
   git tag -a pre-refactor-baseline -m "Baseline before refactoring"
   ```
3. Commit after each completed phase with standard conventional commit syntax:
   ```bash
   git commit -m "refactor(phase-18): normalize magicui button into shared/ui/buttons"
   ```
4. If a rollback is triggered, execute:
   ```bash
   git checkout HEAD~1 -- <affected-directory>
   ```

---

## 3. Database Contingency & Snapshot Protocol

Because database modifications (adding migrations, seeding) alter disk state:

1. **Pre-Migration Snapshot**:
   Before modifying database schemas or running backfills:
   ```bash
   cp data/vishal_enterprise.db data/vishal_enterprise.db.pre-refactor.bak
   ```
2. **Restoration Runbook**:
   If schema corruption or invalid constraint errors occur:
   ```bash
   cp data/vishal_enterprise.db.pre-refactor.bak data/vishal_enterprise.db
   ```
   Restart server and verify table counts with `SELECT count(*) FROM products`.

---

## 4. Phase-Specific Contingency Runbooks

### Runbook A: Restoring a Relocated Component
If a component move (e.g., `productUtils.js` or `FeaturesSection.jsx`) causes broken imports in un-tracked files:
1. Re-instate the original file immediately.
2. Search all references across the monorepo: `grep -rn "productUtils" apps/web/src/`.
3. Fix lingering references before re-attempting the move.

### Runbook B: Recovering from Broken CSS Specificity
If modularizing a stylesheet (e.g., `products.css`) breaks styling:
1. Temporarily re-import the original global stylesheet in `index.css`.
2. Inspect computed CSS in browser DevTools to identify missing selector cascades.
3. Migrate rules individually rather than wholesale.

---

## 5. Post-Phase Smoke Test Checklist

Every phase must pass this 6-point checklist before marking done:
* [ ] 1. `lint_applet` executes with 0 warnings/errors.
* [ ] 2. `compile_applet` produces complete production build.
* [ ] 3. Home page `/` renders with working navigation.
* [ ] 4. Product catalog `/products` loads live products.
* [ ] 5. Product detail `/products/:id` renders technical specs.
* [ ] 6. Admin login `/admin/login` loads form and authenticates.
