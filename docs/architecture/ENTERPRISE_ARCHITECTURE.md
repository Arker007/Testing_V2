# Production-Ready Enterprise Architecture Proposal

**Project:** Vishal Enterprise Web Application  
**Target Pattern:** Feature-First Monorepo / Modular Clean Architecture  
**Target Stack:** React (TypeScript / Vite), Node.js (TypeScript / Express / Fastify / NestJS / Prisma / Drizzle), Shared Types & Utilities  

---

## 1. Architectural Blueprint & Core Principles

To elevate this application to an enterprise-grade standard, the architecture transitions from a split flat repository (`frontend` + duplicate `backend`/`server`) into a **Domain-Driven Feature-First Workspace Monorepo**.

### Key Architectural Pillars
1. **Feature-First Domain Isolation:** Business domains (Catalog, Products, Inquiries, Admin, Content Management) own their presentation, state, hooks, domain services, and API definitions.
2. **Clean Architecture Separation of Concerns:**
   - **Domain/Core Layer:** Entities, Value Objects, Domain Interfaces (framework-agnostic).
   - **Application/Use-Case Layer:** Business workflows, query/command handlers, validation schemas.
   - **Infrastructure Layer:** Database drivers, object storage adapters, auth providers, logger implementations.
   - **Presentation/API Layer:** Controllers, React Views, UI components, HTTP routers.
3. **Shared Packages:** Shared TypeScript contracts, validation schemas, and design tokens built into standalone internal packages (`@enterprise/types`, `@enterprise/config`, `@enterprise/ui-kit`).
4. **Strict Boundaries & Explicit Contracts:** Shared utilities are consumed via workspace packages rather than fragile relative path imports.

---

## 2. Proposed Directory Structure

```
vishal-enterprise/
├── .github/                         # Workflows, CI/CD pipelines, issue templates
│   ├── workflows/
│   │   ├── ci.yml                   # Lint, Typecheck, Unit & Integration Tests
│   │   ├── cd-staging.yml           # Automated deployment to Staging environment
│   │   └── cd-production.yml        # Automated production deployment
│   └── CODEOWNERS
├── apps/                            # Application executables
│   ├── web/                         # Main Public Portal & Admin Client (React + Vite)
│   │   ├── public/                  # Static web assets & favicons
│   │   ├── src/
│   │   │   ├── app/                 # App Shell, Routing, Global Providers, Layouts
│   │   │   │   ├── layouts/         # Root, Public, and Admin Shell Layouts
│   │   │   │   ├── providers/       # AuthProvider, QueryClientProvider, ThemeProvider
│   │   │   │   ├── router/          # App Router configuration & route guards
│   │   │   │   └── main.tsx         # React root entry point
│   │   │   ├── features/            # Feature Modules (Domain-Driven)
│   │   │   │   ├── auth/            # Authentication domain UI & logic
│   │   │   │   ├── catalog/         # Interactive PDF/E-Catalog viewer feature
│   │   │   │   ├── content-management/ # Dynamic CMS & content editor feature
│   │   │   │   ├── inquiries/       # B2B Lead capture & inquiry pipeline
│   │   │   │   ├── media/           # Asset manager feature
│   │   │   │   └── products/        # Product catalog, filtering, and specs
│   │   │   ├── shared/              # Application-specific shared UI & hooks
│   │   │   │   ├── components/      # Generic UI primitives (Buttons, Modals, Tables)
│   │   │   │   ├── hooks/           # Cross-feature React hooks
│   │   │   │   └── styles/          # Global theme tokens, CSS variables, Tailwind setup
│   │   │   └── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── api/                         # Node.js Server API (Express / Fastify)
│       ├── src/
│       │   ├── core/                # Clean Architecture Core
│       │   │   ├── config/          # Environment variables & runtime validation
│       │   │   ├── errors/          # Custom Domain Errors & HTTP Exception Mapping
│       │   │   └── logging/         # Structured Logger (Pino / Winston)
│       │   ├── modules/             # Domain Backend Modules
│       │   │   ├── auth/            # Auth Domain (JWT, password hashing, sessions)
│       │   │   │   ├── application/ # Use cases (LoginUseCase, RefreshTokenUseCase)
│       │   │   │   ├── domain/      # User Entity, Auth Repository Interface
│       │   │   │   ├── infra/       # Database user store, bcrypt adapter
│       │   │   │   └── presentation/# Auth Controller, HTTP Router, Middleware
│       │   │   ├── company/         # Company profile & site options domain
│       │   │   ├── content/         # Dynamic content CMS domain
│       │   │   ├── inquiries/       # Inquiry lead domain & notification triggers
│       │   │   ├── media/           # File upload domain & S3 storage adapters
│       │   │   └── products/        # Product catalog domain, categories, specs
│       │   ├── shared/              # Shared backend middleware & DB infrastructure
│       │   │   ├── database/        # ORM client, migration runner, seeders
│       │   │   ├── middleware/      # Rate limiter, CORS, Auth Guard, Error Handler
│       │   │   └── storage/         # Cloud object storage adapters (S3 / R2)
│       │   └── server.ts            # Express server entry point
│       ├── package.json
│       └── tsconfig.json
├── packages/                        # Shared Workspace Packages
│   ├── config/                      # Centralized Eslint, Prettier, Tailwind, TS Configs
│   │   ├── eslint-preset.js
│   │   ├── tailwind-preset.js
│   │   └── tsconfig.base.json
│   ├── types/                       # Shared DTOs, API Interfaces, Domain Types
│   │   ├── src/
│   │   │   ├── auth.types.ts
│   │   │   ├── inquiry.types.ts
│   │   │   ├── product.types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── validation/                  # Shared Validation Schemas (Zod / Yup)
│   │   ├── src/
│   │   │   ├── auth.schema.ts
│   │   │   ├── product.schema.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── ui-kit/                      # Shared Primitive Design System Components
│       ├── src/
│       │   ├── components/          # Button, Input, Modal, Badge, Table, Spinner
│       │   └── index.ts
│       └── package.json
├── docs/                            # Developer Documentation & API OpenAPI Specs
│   ├── api-spec.yaml                # OpenAPI / Swagger Specification
│   ├── architecture-decisions.md    # ADR records
│   └── deployment-guide.md          # Infrastructure setup documentation
├── docker/                          # Containerization configuration
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   └── docker-compose.yml           # Local dev orchestration (PostgreSQL/Redis/API/Web)
├── .env.example                     # Environment template
├── turbo.json                       # Turborepo / pnpm workspace configuration
├── package.json                     # Root monorepo workspace dependencies
└── README.md
```

---

## 3. Detailed Component Breakdown & Naming Conventions

### Feature Module Structure (`apps/web/src/features/<feature-name>/`)
Each feature directory encapsulates everything required for that specific business capability:

```
features/products/
├── api/                     # React Query queries, mutations & API client calls
│   ├── useGetProducts.ts
│   ├── useGetProductById.ts
│   └── useUpdateProduct.ts
├── components/              # Feature-scoped React components
│   ├── ProductCard/
│   │   ├── ProductCard.tsx
│   │   ├── ProductCard.test.tsx
│   │   └── index.ts
│   ├── ProductFilterSidebar/
│   └── ProductSpecTable/
├── pages/                   # Page views associated with this feature
│   ├── ProductCatalogPage.tsx
│   └── ProductDetailPage.tsx
├── hooks/                   # Business logic React hooks
│   └── useProductFilters.ts
├── utils/                   # Feature-specific helpers & formatters
│   └── productFormatters.ts
└── index.ts                 # Public export barrel file for the feature
```

### Backend Domain Module Structure (`apps/api/src/modules/<domain-name>/`)
Following Clean Architecture principles:

```
modules/products/
├── application/             # Application Services & Use Cases
│   ├── CreateProductUseCase.ts
│   ├── GetProductsQuery.ts
│   └── UpdateProductSpecsUseCase.ts
├── domain/                  # Domain Models & Interfaces
│   ├── ProductEntity.ts
│   ├── ProductCategoryValueObject.ts
│   └── IProductRepository.ts
├── infra/                   # Infrastructure Adapters (Database, Search)
│   ├── DrizzleProductRepository.ts
│   └── ProductMapper.ts
└── presentation/            # Controllers & HTTP Handlers
    ├── ProductController.ts
    ├── ProductRouter.ts
    └── dto/
        ├── CreateProductRequest.dto.ts
        └── ProductResponse.dto.ts
```

---

## 4. Enterprise Naming & Style Conventions

1. **Directories:** Lowercase kebab-case (`content-management`, `use-cases`).
2. **React Components:** PascalCase (`ProductCard.tsx`, `AdminSidebar.tsx`).
3. **React Hooks:** camelCase prefixed with `use` (`useProductFilters.ts`).
4. **Types & Interfaces:** PascalCase prefixed appropriately or cleanly named (`ProductDto`, `UserRoleEnum`).
5. **Controllers & Repositories:** PascalCase with explicit suffixes (`ProductController.ts`, `IProductRepository.ts`).
6. **Database Schema:** Snake_case for columns (`created_at`, `is_active`, `product_id`).

---

## 5. Technology Upgrade & Modernization Path

| Area | Current Implementation | Proposed Enterprise Upgrade | Benefits |
| :--- | :--- | :--- | :--- |
| **Workspace** | Flat npm repository | **pnpm Workspaces + Turborepo** | Blazing-fast parallel builds, cached tasks, isolated packages |
| **Database** | Embedded SQLite (`better-sqlite3`) | **PostgreSQL + Drizzle ORM** | True concurrency, transactional reliability, strong schema migrations |
| **Caching / Sessions** | In-memory JS Set | **Redis Cache & Session Store** | Stateful security across multi-container / serverless deployments |
| **Validation** | Express Validator | **Zod Schemas** | End-to-end type inference from backend request schema to frontend form |
| **State Management** | Context API (`SiteContext`) | **TanStack Query (React Query) + Zustand** | Automatic cache invalidation, loading states, server sync |
| **Media Storage** | Ephemeral Local Filesystem (`/uploads`) | **AWS S3 / Cloudflare R2 + CDN** | High availability, scalable media delivery, multi-region persistence |
| **Logging & Audit** | `console.log` | **Pino Structured JSON Logger + OpenTelemetry** | Searchable logs, performance monitoring, request tracing |
