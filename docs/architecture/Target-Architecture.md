---
domain: system-architecture
scope: monorepo-root
last_updated: 2026-08-31
---

# Workspace Architecture Summary

## 🏢 Workspace Layout
```text
vishal-enterprise/
├── package.json                        # Root workspace configuration
├── AGENTS.md                           # AI coding agent conventions
├── apps/
│   ├── web/                            # React 19 / Vite frontend SPA
│   └── api/                            # Express 4.x backend HTTP API
├── data/                               # Local SQLite database storage
├── uploads/                            # Dynamic image & media uploads
└── docs/                               # Developer & architecture documentation
```

## 🔗 Architecture Index & Detailed References
- **Frontend Architecture**: See `docs/architecture/frontend-directory.md`
- **Backend Architecture**: See `docs/architecture/backend-directory.md`
- **Database Tables**: See `docs/architecture/database-schema.md`
- **Dependency Audit**: See `docs/architecture/codebase-map.md`
- **Design & UI Tokens**: See `docs/standards/ui-tokens.md`
