---
domain: architecture-refactoring
scope: performance-and-bundle-optimization
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 16. Performance & Bundle Optimization Plan

## 1. Core Web Vitals Targets

The platform optimizes for industrial procurement professionals, often browsing over cellular connections in warehouses or factories:

* **Largest Contentful Paint (LCP)**: `< 2.2 seconds`
* **Interaction to Next Paint (INP)**: `< 150 milliseconds`
* **Cumulative Layout Shift (CLS)**: `< 0.05`
* **First Contentful Paint (FCP)**: `< 1.2 seconds`

---

## 2. Bundle Partitioning & Rollup Chunking

Through `apps/web/vite.config.js`, the production bundle is cleanly split into cacheable, isolated chunks:

```text
dist/
├── assets/
│   ├── react-vendor-[hash].js       # React 19, ReactDOM (~45 kB gzipped) [Long-term cached]
│   ├── router-[hash].js             # React Router DOM (~12 kB gzipped) [Long-term cached]
│   ├── index-[hash].js              # Public App Shell & Shared UI (~65 kB gzipped)
│   ├── admin-[hash].js              # Lazy-loaded Admin CMS chunk (~180 kB gzipped)
│   ├── Home-[hash].js               # Lazy-loaded Homepage chunk (~25 kB gzipped)
│   ├── Products-[hash].js           # Lazy-loaded Catalog chunk (~30 kB gzipped)
│   └── ProductDetail-[hash].js      # Lazy-loaded Detail chunk (~22 kB gzipped)
```

**Key Benefit**: Public visitors accessing the home page or catalog never download the Quill editor, Admin dashboard, or media manager code.

---

## 3. Server Caching & HTTP Header Strategy

The Express server (`apps/api/index.js`) and Vercel serverless entrypoint apply optimized caching headers:

```javascript
const cacheOptions = {
  maxAge: IS_PROD ? "1y" : 0,
  etag: true,
  lastModified: true,
  immutable: IS_PROD,
};

// Static uploads (/uploads/*) are cached for 1 year immutable
app.use("/uploads", express.static(uploadsPath, cacheOptions));

// HTML pages are cached for 1 hour to ensure fresh deployment propagation
if (req.path.endsWith(".html")) {
  res.setHeader("Cache-Control", "public, max-age=3600");
}
```

---

## 4. Media & Image Optimization Guidelines

1. **Native Lazy Loading**: Every `OptimizedImage` renders `<img loading="lazy" decoding="async" />` by default, except for hero images which receive `loading="eager"` and `fetchpriority="high"`.
2. **Dimension Constraints**: Cards explicitly reserve aspect-ratio boxes (`aspect-4/3` or `aspect-video`) to prevent Cumulative Layout Shift (CLS) during image fetch.
3. **WebP Compression**: Sharp processes all uploaded media into WebP format with quality 80, achieving 60–75% file size reductions compared to original PNG/JPEG uploads.
