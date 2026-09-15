---
domain: architecture-refactoring
scope: backend-refactoring
status: approved-blueprint
created_at: 2026-09-10
updated_at: 2026-09-11
version: 2.0.0
---

# 05. Backend Refactoring Plan (`apps/api`)

## 1. Objectives & Target Architecture

The backend refactoring solidifies a clean, domain-driven 6-layer architecture across all backend business modules in `apps/api/src/`, aligns cross-app contract validation with `packages/contracts`, isolates infrastructure and database lifecycle layers, and enforces consistent error handling and test harnesses.

### Target Directory Structure

```text
apps/api/src/
│
├── config/                       # Environment, CORS & system configuration
│   ├── env.js
│   └── logger.js
│
├── modules/                      # Business domains
│   ├── auth/
│   ├── products/
│   ├── categories/
│   ├── inquiries/
│   ├── content/
│   ├── company/
│   ├── stats/
│   └── media/
│
├── database/
│   ├── client/                   # Database connection, client wrappers & health
│   ├── schema/                   # DDL table schemas & sync definitions
│   ├── migrations/               # Schema evolution runners & scripts
│   └── seeds/                    # Initial/test data fixtures & seed logic
│
├── infrastructure/
│   ├── storage/                  # Upload & filesystem implementation (Multer, Sharp)
│   ├── logger/                   # Pino logging & HTTP logging middleware
│   └── security/                 # JWT/token generation & crypto security infrastructure
│
├── middleware/                   # Global Express middleware (errorHandler, rateLimiter, auth)
├── errors/                       # Domain AppError hierarchy & error codes
└── app.js                        # App factory & route mounting
```

---

## 2. The Architectural Flow

### Cross-App Dependency Boundary

```text
apps/web ──┐
           ├──> packages/contracts
apps/api ──┘
```

### Backend Request Execution Lifecycle

```text
HTTP Request
     │
     ▼
┌──────────────┐
│    Route     │  ── Express route definitions & URL pattern mapping
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Validator   │  ── Schema-based validation via @vishal/contracts & custom rules
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Controller  │  ── HTTP request context extraction, service orchestration, status codes
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Service    │  ── Business rules, cache coordination, side effects & orchestration
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Repository  │  ── Raw SQL queries, database client interface & transactions
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Mapper    │  ── Row-to-DTO data serialization, column transformations, JSON parsing
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Database   │  ── LibSQL / SQLite storage engine
└──────────────┘
```

---

## 3. Standard Feature Module Anatomy

Each backend business domain inside `apps/api/src/modules/<domain>/` must adhere to this standardized file layout:

```text
modules/<domain>/
├── <domain>.routes.js         # Endpoint definitions & middleware mounting
├── <domain>.controller.js     # HTTP request/response handling & status mapping
├── <domain>.validator.js      # Input validation using contracts & custom schemas
├── <domain>.service.js        # Business logic, caching, side-effects & transactions
├── <domain>.repository.js     # SQL queries & database client interactions
├── <domain>.mapper.js         # Entity/row-to-DTO data transformations
├── <domain>.test.js           # Module unit & integration tests
└── index.js                   # Module public facade / barrel export
```

---

## 4. Phase-by-Phase Implementation Plan

### Phase 1: Database Layer Reorganization (`database/`)
* **`database/client/`**: Extract LibSQL client creation, adapter wrappers, and health check diagnostics (`client.js`, `dbShim.js`).
* **`database/schema/`**: Relocate DDL table definitions (`dbSchema.js`), category specification synchronization (`dbSync.js`), and schema helpers into dedicated schema files.
* **`database/seeds/`**: Relocate static seed fixtures (`dbSeeds.js`) and database initialization seeding logic into `database/seeds/`.
* **`database/migrations/`**: Ensure schema migration runner and versioned migration scripts are modularized.
* **Compatibility Facade**: Maintain `database/index.js` exporting `{ db, query, get, run, all, checkDatabaseHealth, initDatabase }` to ensure zero breaking changes for existing consumers.
* **Verification**: Run `npm run test:api` to verify all database client and query tests pass.

### Phase 2: Infrastructure Layer Realignment (`infrastructure/`)
* **`infrastructure/logger/`**: Relocate Pino logging and HTTP request logger middleware into `infrastructure/logger/`, re-exporting in `config/logger.js`.
* **`infrastructure/storage/`**: Move storage utilities, directory initialization, Sharp image optimization, and file upload adapters into `infrastructure/storage/`.
* **`infrastructure/security/`**: Extract token hashing, crypto helpers, and security token verifiers into `infrastructure/security/`.
* **Verification**: Verify logging output, upload constraints, and token security tests pass.

### Phase 3: Module Anatomy Standardization (`modules/`)
Ensure every business module implements all required layers (`routes`, `validator`, `controller`, `service`, `repository`, `mapper`, `test`):
* **`modules/auth/`**: `auth.routes.js`, `auth.validator.js`, `auth.controller.js`, `auth.service.js`, `auth.repository.js`, `auth.mapper.js`, `auth.test.js`.
* **`modules/products/`**: `product.routes.js`, `product.validator.js`, `product.controller.js`, `product.service.js`, `product.repository.js`, `product.mapper.js`, `product.test.js`.
* **`modules/categories/`**: `category.routes.js`, `category.validator.js`, `category.controller.js`, `category.service.js`, `category.repository.js`, `category.mapper.js`, `category.test.js`.
* **`modules/inquiries/`**: `inquiry.routes.js`, `inquiry.validator.js`, `inquiry.controller.js`, `inquiry.service.js`, `inquiry.repository.js`, `inquiry.mapper.js`, `inquiry.test.js`.
* **`modules/content/`**: `content.routes.js`, `content.validator.js`, `content.controller.js`, `content.service.js`, `content.repository.js`, `content.mapper.js`, `content.test.js`.
* **`modules/company/`**: `company.routes.js`, `company.validator.js`, `company.controller.js`, `company.service.js`, `company.repository.js`, `company.mapper.js`, `company.test.js`.
* **`modules/stats/`**: `stats.routes.js`, `stats.validator.js`, `stats.controller.js`, `stats.service.js`, `stats.repository.js`, `stats.mapper.js`, `stats.test.js`.
* **`modules/media/`**: Merge `modules/uploads/` directly into `modules/media/` (or structured upload sub-service within `media/`), maintaining `media.routes.js`, `media.validator.js`, `media.controller.js`, `media.service.js`, `media.repository.js`, `media.mapper.js`, `media.test.js`.
* **Verification**: Run unit and integration tests across each domain module.

### Phase 4: Middleware & App Factory Consolidation (`app.js`, `middleware/`)
* Standardize global middlewares (`errorHandler.js`, `rateLimiter.js`, `auth.js`, `validate.js`).
* Refactor `app.js` to mount modules cleanly via module public barrels.
* Verify shared Express app factory works identically in both local standalone mode (`apps/api/index.js`) and serverless execution (`api/index.js`).
* Clean up legacy root shims and transitional files.

### Phase 5: Verification & Full Regression Quality Gate
* Run full test suite:
  - `npm run test:api` (Backend endpoints, services, repositories, validators)
  - `npm run test:web` (Frontend components and contracts)
  - `npm run test:e2e` (Full catalog, inquiry, and authentication journeys)
  - `npm run lint` & `npm run build`
