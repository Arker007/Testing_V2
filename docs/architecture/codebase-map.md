---
domain: codebase-map
scope: workspace-root
last_updated: 2026-08-31
---

# Codebase Map & Dependency Audit

## 📂 Monorepo Architecture Map

```text
.
├── package.json                        # Root workspace & dependency manifest
├── AGENTS.md                           # AI agent rules & execution conventions
├── apps/
│   ├── api/                            # Express backend API (Layered Architecture)
│   │   ├── index.js                    # Server bootstrap & router integration
│   │   └── src/
│   │       ├── database/               # SQLite / Turso database connection & schemas
│   │       ├── infrastructure/         # Cache, Sharp image processor, logger
│   │       ├── middleware/             # Auth, error handling, rate limiting, validation
│   │       └── modules/                # Domain modules: auth, products, categories,
│   │                                   # inquiries, content, company, media, uploads, stats
│   └── web/                            # React 19 / Vite frontend (Feature-Sliced Architecture)
│       ├── index.html / vite.config.js
│       └── src/
│           ├── app/                    # AppRouter, Layouts, Providers
│           ├── pages/                  # Page-level route containers
│           ├── features/               # Domain feature modules (about, admin, auth, catalog,
│           │                           # contact, content-management, home, inquiries, etc.)
│           └── shared/                 # Shared UI primitives, hooks, context, & styles
├── data/                               # Local SQLite database files
├── uploads/                            # Dynamic user & product media upload storage
└── docs/                               # Modular architecture documentation & indices
```

---

## 📦 Dependency Audit & Decisions

| Package | Scope | Action / Status | Reason / Justification |
| :--- | :--- | :--- | :--- |
| `lucide-react` | Root | **Removed** | Verified zero imports; all icons standardized on `@iconify/react`. |
| `concurrently` | Root | **Removed** | Verified zero imports / usage in build & dev scripts. |
| `nodemon` | Root | **Removed** | Verified zero imports / usage in dev scripts. |
| `@iconify/react` | Frontend & Root | **Aligned to ^6.0.2** | Icon library used across 90+ frontend components. |
| `framer-motion` | Frontend (`apps/web`) | **Added to `apps/web/package.json`** | Explicitly declared in frontend workspace for motion animations. |
| `motion` | Frontend (`apps/web`) | **Added to `apps/web/package.json`** | Explicitly declared in frontend workspace for lightweight motion animations. |
| `@tailwindcss/vite` | Frontend & Root Dev | **Aligned to ^4.3.3** | Vite plugin for Tailwind v4 integration. |
| `tailwindcss` | Frontend & Root Dev | **Aligned to ^4.3.3** | Core Tailwind CSS styling framework. |
| `express`, `cors`, `compression`, `express-rate-limit`, `multer`, `sharp`, `bcryptjs`, `@libsql/client` | Backend (`apps/api`) | **Retained** | Core backend HTTP API server, DB driver, image processing, auth & file upload dependencies. |

---

## 🗄️ Database Architecture (9 Tables)

| Table | Primary Columns | Purpose |
| :--- | :--- | :--- |
| `products` | `id`, `name`, `slug`, `category_id`, `price`, `specifications` (JSON), `published` | Catalog products |
| `categories` | `id`, `name`, `slug`, `description`, `image`, `fields` (JSON array) | Categories & custom spec field templates |
| `admin_users` | `id`, `username`, `password_hash`, `role` | Admin user credentials (bcrypt hashed) |
| `site_content` | `key` (UNIQUE), `value`, `type`, `section` | Flat key-value CMS content store |
| `company_info` | `id`, `data` (JSON blob) | Central corporate contact details |
| `inquiries` | `id`, `name`, `email`, `phone`, `company`, `message`, `source` | B2B quote inquiries & contact submissions |
| `media_files` | `id`, `filename`, `url`, `category` | Media library file metadata |
| `certifications` | `id`, `name`, `description` | ISO & industrial quality certifications |

---

## 🔗 Detailed Architectural Sub-Docs
- **Frontend Detail**: `docs/architecture/frontend-directory.md`
- **Backend Detail**: `docs/architecture/backend-directory.md`
- **Database Detail**: `docs/architecture/database-schema.md`
- **UI & Icon Standards**: `docs/standards/ui-tokens.md`
- **API Response Schema**: `docs/standards/api-response.md`
