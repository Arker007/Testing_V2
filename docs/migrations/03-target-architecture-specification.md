---
domain: architecture-refactoring
scope: target-architecture
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 03. Target Architecture Specification & Boundaries

## 1. Architectural Paradigm: Feature-Sliced + Clean Layered

The target architecture for Vishal Enterprise combines **Feature-Sliced Design (FSD)** on the frontend with **Domain-Driven Layered Architecture** on the backend. This ensures high cohesion within business domains and loose coupling across system boundaries.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND HIERARCHY (DAG)                        │
│                                                                        │
│   Layer 1:  app/         (Bootstrap, Providers, Global Layouts, Router)│
│              │                                                         │
│              ▼                                                         │
│   Layer 2:  pages/       (Pure Route Containers & SEO Metadata)        │
│              │                                                         │
│              ▼                                                         │
│   Layer 3:  features/    (Business Domains: UI, Hooks, Services, Model)│
│              │                                                         │
│              ▼                                                         │
│   Layer 4:  shared/      (Atoms, Primitives, Client, Core Tokens)      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Target Workspace Blueprint

```text
vishal-enterprise/
├── package.json                         # Monorepo workspaces & dependencies
├── AGENTS.md                            # AI operational conventions
├── .env.example                         # Environment variable template
├── api/
│   └── index.js                         # Vercel serverless function bootstrap
├── apps/
│   ├── api/                             # Express REST API Tier
│   │   ├── index.js                     # Local / Docker entrypoint
│   │   ├── package.json                 # Backend scripts and metadata
│   │   ├── scripts/                     # Seeders & schema backfills
│   │   └── src/
│   │       ├── config/                  # App environment constants & flags
│   │       ├── database/                # LibSQL client, migrations, schemas, seeds
│   │       ├── infrastructure/          # Storage, image pipeline (Sharp), logging
│   │       ├── middleware/              # Auth, validation, rate-limiting, error handler
│   │       ├── shared/                  # ApiError, ApiResponse, pagination helpers
│   │       └── modules/                 # 6-Layer Business Domain Modules
│   │           ├── auth/
│   │           ├── categories/
│   │           ├── company/
│   │           ├── content/
│   │           ├── inquiries/
│   │           ├── media/
│   │           ├── products/
│   │           ├── stats/
│   │           └── uploads/
│   └── web/                             # React 19 + Vite 7 Frontend Tier
│       ├── index.html                   # HTML entrypoint with metadata
│       ├── package.json                 # Frontend dependencies & scripts
│       ├── vite.config.js               # Vite bundler, proxy, code splitting
│       ├── eslint.config.js             # Linting configuration
│       └── src/
│           ├── main.jsx                 # Client bootstrapping & root render
│           ├── index.css                # Tailwind v4 import & root variables
│           ├── app/                     # Shell: App.jsx, router/, layouts/, providers/
│           ├── pages/                   # Route-level wrapper containers
│           ├── features/                # Autonomous business domain modules
│           ├── shared/                  # Reusable UI primitives, hooks, API client
│           ├── assets/                  # Static images, vectors, brand icons
│           └── config/                  # Client environment configuration
├── data/                                # Local SQLite persistence (.db files)
├── docs/                                # Project documentation repository
├── scripts/                             # Consolidated build and maintenance automation
└── uploads/                             # Runtime user and media uploads
```

---

## 3. Frontend Layer Specifications (`apps/web/src/`)

### 3.1 `app/` (Application Shell)
* **Responsibility**: System initialization, root providers, top-level layout routing, global error boundary.
* **Contains**:
  - `App.jsx`: Root component assembling providers.
  - `router/`: `AppRouter.jsx` configuring route definitions and code-splitting chunks.
  - `layouts/`: `PublicLayout.jsx` (header, footer, drawer), `AdminLayout.jsx` (sidebar, topbar).
  - `providers/`: `SiteProvider.jsx` supplying global company metadata and navigation context.
* **Rules**: May import from `pages/`, `features/`, and `shared/`. No other layer may import from `app/`.

### 3.2 `pages/` (Route Containers)
* **Responsibility**: Lightweight route wrappers mapping URLs to features. Responsible for page-level title updates, breadcrumbs, and passing route params down to features.
* **Contains**: `Home.jsx`, `About.jsx`, `Products.jsx`, `ProductDetail.jsx`, `Contact.jsx`, `Manufacturing.jsx`, `Sustainability.jsx`, `NotFound.jsx`.
* **Rules**: 
  - Must remain thin (<50 LOC per page container).
  - Must NEVER contain raw CSS or complex business logic.
  - May import from `features/` and `shared/`.

### 3.3 `features/` (Domain Modules)
* **Responsibility**: Full implementation of business capabilities. Each feature is autonomous and self-contained.
* **Standard Internal Structure**:
  ```text
  features/<feature-name>/
  ├── components/          # Feature-specific UI components
  ├── hooks/               # Custom hooks encapsulated in this domain
  ├── services/            # API integration calls for this domain
  ├── constants/           # Enums, mock data, and constants
  ├── styles/              # Scoped CSS modules (*.module.css)
  ├── utils/               # Domain-specific utility helpers
  └── index.js             # Public API surface (facade)
  ```
* **Strict Rule**: A feature may NEVER import directly from the internal files of another feature (e.g., `import X from '../products/components/ProductCard'` is **FORBIDDEN**). It must import through the feature's public barrel: `import { ProductCard } from '../products'`.

### 3.4 `shared/` (Infrastructure & Primitives)
* **Responsibility**: Cross-cutting reusable utilities, primitives, and adapters completely agnostic of any single business domain.
* **Contains**:
  - `ui/`: Design system primitives grouped by taxonomy (`buttons/`, `forms/`, `data-display/`, `feedback/`, `layout/`, `navigation/`, `overlays/`).
  - `api/`: Central `client.js`, `endpoints.js`, `errors.js`.
  - `hooks/`: Generic utility hooks (`useDocumentTitle`, `useToast`, `useApi`).
  - `utils/`: Generic formatters, string parsers, URL utilities.
  - `styles/`: Core design tokens (`tokens.css`), dark mode overrides (`dark-theme.css`).
* **Strict Rule**: May NEVER import from `features/`, `pages/`, or `app/`.

---

## 4. Backend Layer Specifications (`apps/api/src/`)

Every domain module in `apps/api/src/modules/<domain>/` implements the 6-Layer Architecture:

```text
Client Request
      │
      ▼
1. *.routes.js        ──> Express route declarations & middleware binding
      │
      ▼
2. *.validator.js     ──> Request body/param schema sanitization & validation
      │
      ▼
3. *.controller.js    ──> HTTP status codes, header parsing, error catching
      │
      ▼
4. *.service.js       ──> Pure business logic, caching, calculations
      │
      ▼
5. *.repository.js    ──> Direct SQL execution via LibSQL / SQLite shim
      │
      ▼
6. *.mapper.js        ──> Row-to-DTO conversion, JSON spec expansion
      │
      ▼
Database / Storage
```

---

## 5. Dependency & Naming Conventions

### File Naming Rules
* **React Components**: `PascalCase.jsx` (e.g., `ProductGridCard.jsx`).
* **CSS Modules**: `kebab-case.module.css` (e.g., `product-grid-card.module.css`).
* **JavaScript Utilities / Services**: `camelCase.js` (e.g., `productService.js`, `formatters.js`).
* **Constants & Dictionaries**: `camelCase.constants.js` (e.g., `products.constants.js`).
* **Backend Module Files**: `<domain>.<layer>.js` (e.g., `product.controller.js`, `product.repository.js`).

### Public API Façade Pattern
Every directory under `features/`, `shared/ui/`, and backend `modules/` must expose an `index.js` file defining its public interface. Consumers should import from the package root:
```javascript
// ✅ PREFERRED
import { Button, Card, Badge } from "@/shared/ui";
import { useProducts, ProductCatalog } from "@/features/products";

// ❌ FORBIDDEN
import Button from "@/shared/ui/buttons/Button";
import ProductCatalog from "@/features/products/components/catalog/ProductCatalog";
```
