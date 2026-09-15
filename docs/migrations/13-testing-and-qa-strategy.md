---
domain: architecture-refactoring
scope: testing-and-qa
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 13. Testing & Quality Assurance Strategy

## 1. Quality Baseline & Testing Deficit

Currently, the repository has **0% automated test coverage**. All verification relies on static ESLint validation and compilation. This refactoring plan establishes a realistic, low-friction testing harness protecting critical paths.

```text
               ▲
              / \
             /   \      E2E / Smoke Tests (Critical Customer Paths)
            /  5% \     • Catalog Browse -> Product Detail -> Quote Submit
           /───────\
          /         \   Integration Tests (Supertest API + Routes)
         /   30%     \  • /api/products, /api/categories, /api/auth/login
        /─────────────\
       /               \ Unit Tests (Services, Parsers, Formatters, Mappers)
      /      65%        \ • formatCurrency, parseSpecs, categoryMapper, authService
     /───────────────────\
```

---

## 2. Testing Framework Architecture

### Frontend Testing (`apps/web`):
* **Runner**: `vitest` (natively understands Vite aliases `@/` and CSS modules).
* **DOM Environment**: `jsdom`.
* **Component Testing**: `@testing-library/react` and `@testing-library/user-event`.
* **Assertion Library**: `@testing-library/jest-dom`.

### Backend Testing (`apps/api`):
* **Runner**: Node.js native test runner (`node --test`) or `supertest`.
* **Database Isolation**: In-memory SQLite database (`file::memory:?cache=shared`) seeded automatically before test runs.
* **HTTP Assertions**: `supertest` sending requests to `apps/api/src/app.js` without binding network ports.

---

## 3. High-Priority Test Suites to Implement

| Suite Name | Target File | Scope |
| :--- | :--- | :--- |
| **`parsers.test.js`** | `shared/utils/parsers.js` | JSON spec parsing, image array normalization, dimension extraction. |
| **`formatters.test.js`**| `shared/utils/formatters.js`| Currency, weight load (kg/lbs), date formatting. |
| **`productService.test.js`**| `features/products/services/product.service.js`| API payload mapping, query param construction. |
| **`api.products.test.js`**| `apps/api/src/modules/products/` | GET /api/products pagination, filtering, 404 on invalid ID. |
| **`api.auth.test.js`** | `apps/api/src/modules/auth/` | POST /api/auth/login success with JWT, 401 on bad password, rate limiting. |
| **`api.inquiry.test.js`**| `apps/api/src/modules/inquiries/` | POST /api/inquiries lead capture validation and rate limiting. |
| **`QuoteForm.test.jsx`**| `features/contact/components/QuoteForm.jsx` | User typing, form field validation, success toast invocation. |

---

## 4. Verification Workflow Commands

```json
// Added to root package.json
{
  "scripts": {
    "test": "npm run test:api && npm run test:web",
    "test:api": "node --test apps/api/src/**/*.test.js",
    "test:web": "cd apps/web && npx vitest run",
    "verify": "npm run lint && npm run test && npm run build"
  }
}
```
No pull request or phase migration will merge without passing `npm run verify`.
