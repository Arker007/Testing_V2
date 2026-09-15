---
domain: architecture-refactoring
scope: database-and-migrations
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 06. Database Schema & Migrations Architecture

## 1. Database Topology & Multi-Mode Driver

The platform utilizes `@libsql/client` (the modern LibSQL / Turso driver) supporting seamless operation across two deployment targets:

1. **Remote Cloud Database (Turso)**:
   - Configured via `TURSO_URL` and `TURSO_TOKEN`.
   - Used in cloud and production serverless environments.
2. **Local SQLite File (`file:data/vishal_enterprise.db`)**:
   - Used in local container development, offline mode, and fallback scenarios.
   - On Vercel serverless cold-start without Turso, the file is replicated into `/tmp/vishal_enterprise.db`.

---

## 2. Core Relational Schema (9 Tables)

```text
┌──────────────┐       ┌─────────────────┐       ┌────────────────┐
│  categories  │1     *│    products     │1     *│ specifications │
│  ──────────  ├───────┤    ────────     ├───────┤ ────────────── │
│  id          │       │    id           │       │ id             │
│  name        │       │    category_id  │       │ product_id     │
│  slug        │       │    name, slug   │       │ group_name     │
│  fields JSON │       │    specs JSON   │       │ key, value     │
└──────────────┘       └─────────────────┘       └────────────────┘

┌──────────────┐       ┌─────────────────┐       ┌────────────────┐
│  inquiries   │       │  site_content   │       │    company     │
│  ─────────   │       │  ────────────   │       │    ───────     │
│  id          │       │  id             │       │ id             │
│  name, email │       │  section_key    │       │ name, email    │
│  phone, type │       │  content_json   │       │ phone, address │
│  status      │       │  updated_at     │       │ social_links   │
└──────────────┘       └─────────────────┘       └────────────────┘

┌──────────────┐       ┌─────────────────┐       ┌────────────────┐
│ media_files  │       │      users      │       │  _migrations   │
│ ───────────  │       │      ─────      │       │  ───────────   │
│ id           │       │ id              │       │ id             │
│ file_path    │       │ username        │       │ name           │
│ mime_type    │       │ password (hash) │       │ executed_at    │
│ category     │       │ role            │       │                │
└──────────────┘       └─────────────────┘       └────────────────┘
```

---

## 3. Dynamic Attribute Specification System

Industrial products require flexible, category-dependent technical attributes (e.g., Static Load, Dynamic Load, Rackable Load, Entry Points, Raw Material Grade, UV Resistance).

To support this without schema proliferation, the system utilizes a **Hybrid Relational + Document Model**:

1. **Category Field Templates (`categories.fields` JSON array)**:
   - Defines required and optional attributes for each category.
   - Example: `[{"name": "Dynamic Load", "type": "text", "unit": "kg", "required": true}]`.
2. **Product Specification Storage (`products.specifications` JSON object)**:
   - Stores key-value specifications directly with the product row for high-speed retrieval.
   - Normalized into `specifications` relational table for relational search indexing and filtering.
3. **Synchronization Utility (`dbSync.js`)**:
   - Synchronizes changes between category field templates and existing product rows when new specifications are introduced.

---

## 4. Migration Runner & Versioning Architecture

### Current Limitation:
Table schemas are created via an monolithic batch of `CREATE TABLE IF NOT EXISTS` strings in `dbSchema.js` executed at server startup. There is no automated tracking of applied schema revisions.

### Target Migration Framework:
1. **Schema Migration Table (`_migrations`)**:
   ```sql
   CREATE TABLE IF NOT EXISTS _migrations (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL UNIQUE,
     executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );
   ```
2. **Versioned Migration Scripts (`apps/api/src/database/migrations/`)**:
   - `001_initial_schema.sql`
   - `002_add_specifications_table.sql`
   - `003_index_product_category.sql`
3. **Idempotent Migration Runner**:
   - Reads unapplied `.sql` or `.js` migration files in sequence.
   - Executes each within a `client.batch(..., "write")` transaction.
   - Records the migration name in `_migrations`.
   - Fails fast on syntax or execution error, aborting server startup to prevent partial schema corruption.

---

## 5. Seed Data Management

Seed records are versioned and separated into deterministic datasets:
* **`dbSeeds.js`**: Contains essential base data (default admin account, initial 4 product categories: Plastic Pallets, Plastic Lumber, Storage Bins, Industrial Benches).
* **`seedProductsCatalog.js`**: Populates 24 realistic industrial products with full specifications, images, and feature highlights.
* **`backfillSpecifications.js`**: Idempotent script parsing product specification JSON and populating relational specification rows.
