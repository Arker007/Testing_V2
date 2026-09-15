---
domain: system-architecture
scope: project-target-architecture
last_updated: 2026-09-10
status: active-target-blueprint
---

# Project Target Architecture

This document defines the official, standardized target folder structure, modular boundaries, and architectural layers for the application.

---

## 🏛️ Comprehensive Target Directory Blueprint

```text
project/
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon/
│
├── src/
│   │
│   ├── app/                         # Application-level setup
│   │   ├── App.tsx
│   │   ├── router/
│   │   │   └── routes.tsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx
│   │   │   └── AdminLayout.tsx
│   │   └── providers/
│   │
│   ├── pages/                       # Simple route-level pages
│   │   ├── home/
│   │   │   ├── HomePage.tsx
│   │   │   └── components/
│   │   ├── about/
│   │   ├── contact/
│   │   └── not-found/
│   │
│   ├── features/                    # Business/domain functionality
│   │   ├── feature-name/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── index.ts
│   │   │
│   │   └── another-feature/
│   │
│   ├── shared/                      # Reusable across multiple features
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Card/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Badge/
│   │   │   │   └── Table/
│   │   │   │
│   │   │   ├── navigation/
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   └── Sidebar/
│   │   │   │
│   │   │   ├── feedback/
│   │   │   │   ├── Loader/
│   │   │   │   ├── EmptyState/
│   │   │   │   └── ErrorState/
│   │   │   │
│   │   │   └── data-display/
│   │   │
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── constants/
│   │   └── validators/
│   │
│   ├── services/                    # Global external communication
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── interceptors.ts
│   │   ├── storage/
│   │   └── external/
│   │
│   ├── store/                       # Global state only
│   │   ├── index.ts
│   │   └── slices/
│   │
│   ├── styles/
│   │   ├── index.css
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   ├── themes.css
│   │   └── utilities.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── fonts/
│   │
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── env.ts
│   │   └── routes.config.ts
│   │
│   ├── lib/                         # Framework/library wrappers
│   │   ├── http/
│   │   ├── analytics/
│   │   └── third-party/
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/
│   │
│   └── main.tsx
│
├── docs/
│   ├── architecture.md
│   ├── design-system.md
│   └── conventions.md
│
├── scripts/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── AGENTS.md
```

---

## 📦 Architectural Layer Breakdown

### 1. `public/` — Static Public Assets
- **`images/`**: Direct static assets served at root path without Vite bundling.
- **`icons/`**: App manifests, PWA icons, and SVG sprites.
- **`favicon/`**: Favicon sets, apple-touch-icons, and browser configuration icons.

### 2. `src/app/` — Application Setup & Orchestration
- **`App.tsx`**: Top-level application component mounting context providers and layout shells.
- **`router/routes.tsx`**: Declarative routing definition, lazy-loaded route declarations, and error boundaries.
- **`layouts/`**: Shell containers separating page contexts:
  - `MainLayout.tsx`: Public visitor shell with Header, Footer, and Page containers.
  - `AdminLayout.tsx`: Authenticated management portal shell with persistent Sidebar and TopBar.
- **`providers/`**: Context and client providers (Theme, Auth, Query/Cache, Toast).

### 3. `src/pages/` — Route-Level Page Containers
Lightweight orchestrators connecting feature components to router routes:
- **`home/`**: Public homepage view (`HomePage.tsx`) and page-specific layout composition.
- **`about/`**: Corporate history, factory overview, and capability summaries.
- **`contact/`**: RFQ quote calculator, direct contact cards, and facility locator.
- **`not-found/`**: Graceful 404 handler and route fallback.

### 4. `src/features/` — Domain-Driven Business Modules
Independent, domain-scoped vertical slices encapsulating all business logic:
- Standard feature anatomy:
  - `components/`: Feature-internal UI components.
  - `pages/`: Dedicated feature views (e.g. detailed editor, full-screen canvas).
  - `hooks/`: Feature-scoped React hooks (state machines, data fetching).
  - `services/`: API communication specific to this feature.
  - `store/`: Local slice or state store for feature domain.
  - `utils/`: Domain-specific formatting, calculation, or validation helpers.
  - `types/`: Domain TypeScript interfaces, types, and enums.
  - `constants/`: Configuration values, step configs, initial states.
  - `index.ts`: Public API boundary exporting only public feature symbols.

### 5. `src/shared/` — Reusable Across Multiple Features
Strictly feature-agnostic, reusable building blocks:
- **`components/ui/`**: Base atomic design primitives:
  - `Button/`, `Input/`, `Card/`, `Modal/`, `Badge/`, `Table/`.
- **`components/navigation/`**: Global navigation primitives (`Header/`, `Footer/`, `Sidebar/`).
- **`components/feedback/`**: User feedback primitives (`Loader/`, `EmptyState/`, `ErrorState/`).
- **`components/data-display/`**: Tables, key-value grids, metric pills.
- **`hooks/`**: Global reusable hooks (`useDebounce`, `useLocalStorage`, `useMediaQuery`).
- **`utils/`**: General-purpose helpers (`formatters`, `parsers`, `math`).
- **`types/`**: Common TypeScript types shared across domains.
- **`constants/`**: Global constants, regexes, and system keys.
- **`validators/`**: Input validation schemas (Zod/custom).

### 6. `src/services/` — Global External Communication
- **`api/client.ts`**: Configured Axios/Fetch HTTP client instance.
- **`api/endpoints.ts`**: Single source of truth for REST/GraphQL API paths.
- **`api/interceptors.ts`**: Request auth headers, CSRF, response error normalization.
- **`storage/`**: LocalStorage, SessionStorage, and IndexedDB wrappers.
- **`external/`**: External third-party SDK clients (Maps, Analytics, Webhooks).

### 7. `src/store/` — Global Application State
- Centralized store configuration (`index.ts`) and global slices (`slices/`).
- Reserved strictly for truly global concerns (User session, Theme mode, Global notifications).

### 8. `src/styles/` — Core Design Tokens & Stylesheets
- **`index.css`**: Master stylesheet importing all layers.
- **`tokens.css`**: CSS custom property tokens (colors, spacing, typography, radii, shadows).
- **`reset.css`**: CSS normalization and box-sizing resets.
- **`themes.css`**: Light and dark theme variable mappings.
- **`utilities.css`**: Specialized layout, scrollbar, and typography utility classes.

### 9. `src/assets/` — Bundled Static Assets
Bundled by Vite with asset hashing and optimization:
- `images/`: High-resolution product images, backgrounds, and brand imagery.
- `icons/`: Custom vector SVGs.
- `illustrations/`: Empty state and onboarding graphics.
- `fonts/`: Self-hosted web fonts.

### 10. `src/config/` — Environment & App Configuration
- **`app.config.ts`**: Application metadata, brand details, contact constants.
- **`env.ts`**: Strictly validated client environment variables.
- **`routes.config.ts`**: Route paths and permission configurations.

### 11. `src/lib/` — Library & Framework Adapters
Isolates external dependencies behind stable internal interfaces:
- `http/`: HTTP client adapter abstractions.
- `analytics/`: Telemetry & event tracking abstraction.
- `third-party/`: Headless UI and motion adapters.

### 12. `src/tests/` — Testing & Fixtures
- `unit/`: Vitest/Jest unit tests for utilities, hooks, and services.
- `integration/`: Component integration tests and user interaction flows.
- `fixtures/`: Mock data generators and sample API payloads.

---

## 🔗 Related Architecture References
- **Documentation Index**: See `docs/index.md`
- **Frontend Architecture**: See `docs/architecture/frontend-directory.md`
- **Backend Architecture**: See `docs/architecture/backend-directory.md`
- **Database Schema**: See `docs/architecture/database-schema.md`
- **Design Tokens**: See `docs/standards/ui-tokens.md`
- **Agent Execution Conventions**: See `AGENTS.md`
