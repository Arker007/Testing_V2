# Development & Coding Standards

This document establishes engineering conventions, layer boundaries, and execution rules for the Vishal Enterprise monorepo.

---

## 1. Monorepo Architecture Overview

- **`apps/web/`**: Customer-facing catalog and admin single-page application built with React, Vite, and Tailwind CSS.
- **`apps/api/`**: Modular Node.js REST API providing catalog queries, quote inquiry submissions, image optimization, and CMS management.
- **`packages/contracts/`**: Shared Zod schemas (`inquirySchema`, `productFilterSchema`, `productPayloadSchema`), domain enums (`INQUIRY_STATUS`, `PRODUCT_STATUS`), and API constants.
- **`storage/`**: Centralized mutable runtime data (`database/`, `uploads/`, `cache/`, `temp/`).
- **`tests/`**: Cross-application workflow tests and E2E validation.
- **`docs/`**: Standardized documentation taxonomy.

---

## 2. Backend Design Patterns (`apps/api/src/modules/`)

Each domain module must strictly adhere to the layered pattern:
1. **`*.routes.js`**: Express route definitions with attached validation and auth middlewares.
2. **`*.controller.js`**: HTTP request unwrapping, calling service layer, formatting HTTP response envelopes (`{ success, data, meta }`).
3. **`*.service.js`**: Core domain logic, business invariants, and cross-repository orchestration.
4. **`*.repository.js`**: Database query execution against the LibSQL/SQLite client.
5. **`*.mapper.js`**: DTO mapping, sanitizing internal database fields into public API shapes.
6. **`*.validator.js`**: Zod schema validation delegating to `@vishal/contracts`.

---

## 3. Frontend Architecture (`apps/web/src/`)

1. **Feature-First Domain Grouping (`features/<domain>/`)**:
   - UI components, custom hooks, and domain services are colocated within their feature directory.
2. **Shared Primitives (`shared/ui/`)**:
   - Reusable design system primitives (`Button`, `Card`, `Badge`, `Modal`, `Table`, `Input`) live in `shared/ui/`.
3. **Icons Standard**:
   - Exclusively import icons from `@iconify/react` using the `solar:*` icon sets. Do not install secondary icon libraries.
4. **Shared Contracts Import**:
   - Consume contracts via the `@vishal/contracts` alias mapped in `vite.config.js` and `jsconfig.json`.

---

## 4. Error Handling & Response Protocols

- All API errors must instantiate or derive from `AppError` (`apps/api/src/errors/AppError.js`).
- Never return unhandled 500 error stack traces in production responses.
- Centralized error formatting is handled exclusively by `apps/api/src/middleware/errorHandler.js`.
