# AGENTS.md — Persistent Project Conventions & Execution Rules

## 1. Token Economy & Scope Discipline
* **No Unsolicited Audits**: Never run full-repository audits, codebase scans, or unrequested dependency checks for localized feature edits.
* **Targeted Line Scoping**: Fetch targeted line ranges (`StartLine`/`EndLine`) when using `view_file`. Avoid reading entire files when making specific changes.
* **Documentation Lookup**: Check `docs/index.md` first before reading any doc files. Fetch only the relevant sub-document or line range.
* **Surgical Code Edits**: Use `edit_file` and `multi_edit_file` for targeted diffs. Never overwrite entire files for small or localized edits.
* **Incremental Verification**: Use `lint_applet` for quick syntax/linter checks during iterative work. Defer full builds (`compile_applet`) to feature completion.

## 2. Directory & Module Boundaries
* **Frontend Architecture (`apps/web/src/`)**:
  - `features/<domain>/components/` — Feature-specific UI components
  - `features/<domain>/hooks/` — Custom hooks
  - `features/<domain>/styles/` — Feature CSS modules
  - `shared/ui/` — Base UI primitives (`Button`, `Card`, `Badge`, `Modal`, `Table`, etc.)
  - `shared/context/` — Global contexts (`SiteContext`)
  - `shared/utils/` — Shared utility functions (`formatters.js`, `parsers.js`)
* **Backend Architecture (`apps/api/src/`)**:
  - `modules/<domain>/` — Follow standard Router -> Controller -> Service -> Repository layer pattern.
* **Icon Standard**: Standardize strictly on `@iconify/react` (`solar:*` icon sets). Do not add secondary icon packages.
* **Asset Boundaries**:
  - Static Assets: `apps/web/src/assets/images/<category>/` (`backgrounds/`, `brand/`, `manufacturing/`, `maps/`, `marketing/`).
  - Runtime Uploads: `uploads/` (`uploads/products/`, `uploads/categories/`, `uploads/company/`, `uploads/content/`).

## 3. Execution & Quality Standards
1. **Context Scoping**: Fetch targeted line ranges only; never load unreferenced files.
2. **Syntax Density**: Use ternary expressions, nullish coalescing (`??`), and optional chaining (`?.`).
3. **Comments**: Document *why*, never *what*.
4. **Error Handling**: Unified error classes; concise guard clauses early in function execution.
5. **Verification**: Verify code linting and compilation before concluding turns.
