# Deployment Guide

This document outlines deployment configurations, container operations, and runtime environments for Vishal Enterprise.

---

## 1. Hosting Architecture Overview

The system supports two primary deployment topologies:
1. **Containerized Full-Stack Deployment (Cloud Run / Docker)**:
   - Node.js environment serving both backend REST API and pre-compiled frontend static bundle.
   - External port: `3000`.
   - Host binding: `0.0.0.0`.
   - Persistent storage mounted at `/storage/database` (SQLite database) and `/storage/uploads` (media assets).

2. **Serverless Deployment (Vercel)**:
   - **Frontend**: Vite SPA compiled to `apps/web/dist`, routed via `vercel.json`.
   - **Backend**: Express API served via Vercel serverless function `api/index.js`.
   - **Database**: Replicates `storage/database/vishal_enterprise.db` to `/tmp/vishal_enterprise.db` on cold-start (or connects to Turso LibSQL when `TURSO_URL` and `TURSO_TOKEN` are set).
   - **Asset Serving**: Cache-Control headers set to immutable for bundled assets and 7-day max-age for static uploads.

---

## 2. Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | HTTP port for server process | `3000` |
| `NODE_ENV` | Environment identifier | `production` \| `development` |
| `DB_PATH` | Path to SQLite database file | `storage/database/vishal_enterprise.db` |
| `UPLOADS_DIR` | Base directory for uploaded media | `storage/uploads` |
| `TURSO_URL` | Optional remote LibSQL database URL | `libsql://...` |
| `TURSO_TOKEN` | Optional remote LibSQL database authentication token | `...` |
| `ALLOWED_ORIGINS` | Comma-delimited list of permitted CORS origins | `https://vishalenterprise.in,https://www.vishalenterprise.in` |
| `JWT_SECRET` | Secret key for signing admin authentication tokens | `...` |

---

## 3. Storage Directory Lifecycle

- **`storage/database/`**: Contains SQLite database file `vishal_enterprise.db`. In containerized environments, ensure this path is persisted or backed by a persistent volume.
- **`storage/uploads/`**: Contains subdirectories `products/`, `categories/`, `company/`, `content/`, and `temp/`.
- During build, `apps/web/scripts/copy-uploads.mjs` synchronizes `storage/uploads` into `apps/web/dist/uploads` so static assets are served reliably.

---

## 4. Build & Production Verification Commands

```bash
# Clean install monorepo dependencies
npm install

# Run static analysis and linting
npm run lint

# Run automated backend unit & integration tests
npm run test:api

# Run automated frontend unit & component tests
npm run test:web

# Build production assets (Vite frontend + uploads copy)
npm run build

# Start production server
npm start
```
