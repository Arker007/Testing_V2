---
domain: architecture-refactoring
scope: asset-management-and-media
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 11. Asset Management & Media Processing Pipeline

## 1. Asset Segmentation: Static vs. Runtime

The platform strictly segregates assets into two distinct lifecycle channels:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      MEDIA ASSET SEGMENTATION                          │
├───────────────────────────────┬────────────────────────────────────────┤
│ Channel A: Static Brand Assets│ Channel B: Dynamic Runtime Uploads     │
│ (`apps/web/src/assets/`)      │ (`/uploads/`)                          │
├───────────────────────────────┼────────────────────────────────────────┤
│ • Bundled at compile-time     │ • Stored on filesystem at runtime      │
│ • Content-hashed by Vite      │ • Served via Express static middleware │
│ • Embedded brand icons, logos │ • User-uploaded product images, specs  │
│ • Immutable 1-year cache      │ • Mirrored to /tmp on Vercel           │
└───────────────────────────────┴────────────────────────────────────────┘
```

---

## 2. Resolving Static Asset Anomalies

### Current Defect:
An orphaned file exists at `/src/assets/images/world_map_export_network_1786874321977.jpg` outside the `apps/web` package.

### Target Action:
1. Relocate this image to `apps/web/src/assets/images/maps/world-map-export-network.jpg`.
2. Delete the root `/src/` directory entirely.
3. Update consuming references in `ManufacturingPage.jsx` or `AboutPage.jsx` to use the standard alias:
   ```javascript
   import worldMapImg from "@/assets/images/maps/world-map-export-network.jpg";
   ```

---

## 3. Sharp Image Optimization Pipeline (`apps/api/src/infrastructure/image/`)

The backend image processing pipeline converts incoming uploads into optimized WebP assets:

```text
Incoming Upload (Multer)
      │
      ▼
Format Sniffing & MIME Validation (Sharp)
      │
      ├── Reject if not JPEG, PNG, WEBP, or AVIF
      │
      ▼
Transcode to WebP
      │  • Quality: 80
      │  • Strip EXIF / GPS metadata
      │  • Max dimension bound: 1920px (main), 400px (thumb)
      ▼
Write to /uploads/<category>/<timestamp>-<uuid>.webp
      │
      ▼
Return Public URI: /uploads/<category>/...
```

---

## 4. Build-Time Upload Mirroring (`copy-uploads.mjs`)

During production builds on serverless or static hosting platforms, the root `/uploads/` directory must be mirrored into the frontend build output so static file servers can resolve images immediately:

* `apps/web/scripts/copy-uploads.mjs` executes immediately following `vite build`.
* Copies `/uploads/` to `apps/web/dist/uploads/`.
* Guarantees all default product images are instantly available even before the API server initializes.
