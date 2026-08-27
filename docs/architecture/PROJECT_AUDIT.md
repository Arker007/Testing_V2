# Project Technical Audit & Codebase Health Report

**Date:** August 7, 2026  
**Project:** Vishal Enterprise Web Application  
**Tech Stack:** React (Vite, Tailwind CSS, Framer Motion), Node.js (Express), SQLite (`better-sqlite3`), Bun/NPM  

---

## Executive Summary

An audit of the **Vishal Enterprise** web application codebase was conducted. The application is a full-stack web platform built for industrial recycled polymer products, featuring a public marketing/catalog portal and a feature-rich admin dashboard.

While the application features strong visual polish, functional code-splitting, and active React context management, critical architectural duplications, security risks (hardcoded fallback JWT secrets, missing rate limiters), technical debt (in-memory token revocation, duplicate backend trees), and performance bottlenecks exist.

---

## 1. Architecture Overview

- **Full-Stack Architecture:** Monorepo structure featuring a React 18 / Vite single-page application (`/frontend`) backed by an Express REST API (`/backend` / `/server`).
- **Database Engine:** Embedded SQLite database (`/data/vishal_enterprise.db`) accessed via `better-sqlite3` with custom initialization scripts in `database.js`.
- **Deployment Strategy:** Vercel serverless integration via `/api/index.js` alongside standard Node.js server container runner.
- **State & Context Management:** React Context (`SiteContext.jsx`) managing dynamic text overrides, company settings, and global parameters, combined with custom domain hooks (`useProducts`, `useInquiry`, `useApi`).

---

## 2. Directory & Folder Organization

```
├── api/                   # Vercel serverless entrypoint
├── backend/               # Primary backend REST API logic
├── data/                  # SQLite database file storage
├── frontend/              # Vite + React frontend application
│   ├── src/
│   │   ├── assets/        # Static images & media assets
│   │   ├── components/    # Reusable UI & admin layout components
│   │   ├── context/       # React context providers
│   │   ├── features/      # Feature-based modular UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page routes & admin dashboard views
│   │   ├── services/      # API client services
│   │   ├── utils/         # Utility functions
│   │   └── index.css      # Global styles & Tailwind configuration
├── server/                # DUPLICATE backend tree (identical to /backend)
├── uploads/               # Product image and document upload directory
├── scripts/               # Custom build scripts
└── package.json           # Root package file
```

---

## 3. Prioritized Audit Findings

### 🔴 CRITICAL PRIORITIES

#### 1. Hardcoded JWT Secret Fallback
- **Location:** `backend/middleware/auth.js`, `backend/routes/auth.js`, `server/middleware/auth.js`
- **Issue:** The authentication layer defaults to a static fallback string (`'super-secret-jwt-key-vishal-enterprise'`) if `process.env.JWT_SECRET` is not set.
- **Impact:** Anyone with knowledge of the public repository can forge admin JWT tokens and gain unauthorized access to the admin dashboard if the environment variable is omitted in deployment.
- **Remediation:** Throw a fatal error on server startup if `JWT_SECRET` is undefined in production.

#### 2. Duplicate Backend Architecture (`/backend` vs `/server`)
- **Location:** `/backend` and `/server`
- **Issue:** The codebase maintains two practically identical backend directories containing duplicate routes, middleware, validators, and config files.
- **Impact:** High risk of divergence. Bug fixes or security patches applied to `/backend` may not be applied to `/server` (or vice versa), causing silent runtime regressions depending on which entrypoint is booted.
- **Remediation:** Consolidate backend code into a single directory (e.g., `/server` or `/backend`) and adjust build scripts (`scripts/build.js`, `vercel.json`, `/api/index.js`) to import from a single source of truth.

---

### 🟠 HIGH PRIORITIES

#### 3. Ephemeral In-Memory JWT Token Blacklist
- **Location:** `backend/middleware/auth.js` (`invalidatedTokens = new Set()`)
- **Issue:** Invalidated/logged-out JWT tokens are kept in a standard JavaScript `Set` in server memory.
- **Impact:** On serverless environments (Vercel) or multi-instance deployments (Cloud Run / load-balanced containers), token revocation is completely lost across cold starts, redeployments, or separate worker instances.
- **Remediation:** Persist revoked tokens in SQLite database table or Redis cache until token expiry.

#### 4. Missing Rate Limiting on Sensitive API Endpoints
- **Location:** `backend/routes/auth.js` (`/api/auth/login`), `backend/routes/inquiries.js`
- **Issue:** Public login and contact inquiry endpoints lack request rate limiting (`express-rate-limit`).
- **Impact:** Exposes admin auth to brute-force credential attacks and contact forms to automated spam injection.
- **Remediation:** Implement `express-rate-limit` middleware on `/api/auth/login` and `/api/inquiries`.

#### 5. Local File System Uploads on Ephemeral Containers
- **Location:** `backend/routes/upload.js`, `/uploads`
- **Issue:** Uploaded product images are written directly to the local file system (`/uploads/products`).
- **Impact:** In serverless or containerized environments, disk storage is ephemeral. File uploads will disappear whenever containers restart or scale down.
- **Remediation:** Integrate cloud object storage (e.g., AWS S3, Cloudflare R2, Google Cloud Storage) for user media uploads.

---

### 🟡 MEDIUM PRIORITIES

#### 6. Monolithic Styling File (`frontend/src/index.css`)
- **Location:** `frontend/src/index.css` (1,519 lines)
- **Issue:** Contains global CSS directives, keyframe animations, utility overrides, custom button classes, and page-specific styles mixed together.
- **Impact:** Increases CSS bundle size for all pages and makes style maintenance error-prone.
- **Remediation:** Refactor page-specific and component styles into CSS Modules or utility Tailwind classes, leaving `index.css` strictly for global reset/theme variables.

#### 7. Large Data Layer Script (`backend/config/database.js`)
- **Location:** `backend/config/database.js` (645 lines)
- **Issue:** Combines database initialization, table creation, initial seed records, specification migration logic, and CRUD helper methods in a single file.
- **Impact:** High complexity and potential side-effects on module load.
- **Remediation:** Split seed data into dedicated files inside `/backend/seeds` and schema definitions into `/backend/db/schema.js`.

#### 8. Direct DOM Manipulation in React Context
- **Location:** `frontend/src/App.jsx`
- **Issue:** Scroll event handler dynamically manipulates `document.body.classList` (`is-scrolling`) directly outside React's declarative state loop.
- **Impact:** Bypasses React rendering pipeline and can interfere with third-party visual components or SSR.
- **Remediation:** Manage scroll states using React state or dedicated custom hooks (`useScroll`).

---

### 🟢 LOW PRIORITIES & CODE SMELLS

#### 9. Unbounded API Data Fetching
- **Location:** `backend/routes/products.js`, `backend/routes/inquiries.js`
- **Issue:** API endpoints return all matching records without enforcing default pagination caps if limit parameters are omitted.
- **Impact:** Potential performance slowdown as dataset size grows.
- **Remediation:** Enforce a maximum default limit (e.g. 50 items) on list endpoints.

#### 10. ESLint Fast Refresh Warnings
- **Location:** `frontend/src/components/admin/AdminSidebar.jsx`
- **Issue:** Non-component exports inside React component files cause Vite Fast Refresh warnings.
- **Remediation:** Extract shared constants to separate helper/constant modules.

---

## 4. Production Readiness Checklist

| Feature | Status | Notes |
| :--- | :---: | :--- |
| **Authentication & Authorization** | ⚠️ Partial | Role checks active; needs fallback secret removal & persistent revocation |
| **Input Validation** | ✅ Configured | Express-validator schemas in `/validators` |
| **Rate Limiting** | ❌ Missing | Requires `express-rate-limit` on public POST routes |
| **File Storage** | ⚠️ Local Disk | Needs migration to cloud object storage for production |
| **Automated Testing** | ❌ Missing | No unit, integration, or E2E test suites present |
| **CI/CD Pipeline** | ❌ Missing | No GitHub Actions / deployment pipeline configured |
| **Error Handling & Logging** | ⚠️ Partial | Basic error handler; needs structured logging (Pino/Winston) |

---

## 5. Summary Recommendation Roadmap

1. **Phase 1 (Immediate - Critical):**
   - Remove hardcoded default JWT secrets and require explicit environment variables.
   - Delete duplicate `/server` or `/backend` tree and standardize build entrypoints.

2. **Phase 2 (High Impact):**
   - Implement rate limiting on login & inquiry APIs.
   - Transition token blacklist to persistent DB storage.
   - Configure cloud storage (S3/R2/GCS) for file uploads.

3. **Phase 3 (Refactoring & Debt Reduction):**
   - Modularize `index.css` (1519 lines) and `database.js` (645 lines).
   - Add automated testing (Vitest for frontend/backend).
