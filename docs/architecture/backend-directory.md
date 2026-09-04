---
domain: backend-api
scope: apps/api/src
last_updated: 2026-08-31
---

# Backend Target Architecture (`apps/api`)

## 📂 Backend Structure Overview
```text
apps/api/
├── package.json
└── src/
    ├── app.js / server.js              # Express app & server entry
    ├── config/                         # Environment & constants
    ├── database/                       # SQLite/Turso client & migrations
    ├── middleware/                     # Auth, rate-limit, error handler
    ├── infrastructure/                 # Storage, Sharp image processor, logger
    ├── shared/                         # ApiError & response helpers
    └── modules/                        # 6-layer Domain Modules
```

## 🧱 Layered Domain Modules Pattern
Each module under `apps/api/src/modules/` adheres to a strict 6-layer separation:
1. `*.routes.js` — Express endpoints & validation binding
2. `*.controller.js` — HTTP request/response formatting & header management
3. `*.service.js` — Core business logic & TTL caching
4. `*.repository.js` — Database CRUD queries
5. `*.validator.js` — Input sanitization & schema validation
6. `*.mapper.js` — DB row entity mapping & serialization

## 📡 Registered API Modules

| Module | Route Prefix | Main Tables | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth` | `admin_users` | Admin login, password hashing (bcrypt), JWT generation |
| **Products** | `/api/products` | `products` | Catalog listing, specs, filter queries, TTL cache |
| **Categories** | `/api/categories` | `categories` | Product categories, field templates, TTL cache |
| **Inquiries** | `/api/contact`, `/api/inquiries` | `inquiries` | Form submissions, admin inquiry management |
| **Content** | `/api/content` | `site_content` | CMS dynamic text/section updates |
| **Company** | `/api/company` | `company` | Contact info, profile metadata |
| **Media** | `/api/media`, `/api/certifications` | `media_files` | Media library & certification documents |
| **Uploads** | `/api/upload` | Filesystem (`uploads/`) | Multer image uploads, Sharp WebP compression |
| **Stats** | `/api/stats` | Multi-table count | Admin dashboard metric aggregations |
