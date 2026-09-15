---
domain: architecture-refactoring
scope: routing-and-navigation
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 08. Routing & Navigation Architecture Plan

## 1. Route Tree & Layout Hierarchy

The application routing operates under React Router DOM v7 with a strict separation between public presentation routes and protected admin management routes:

```text
BrowserRouter
  │
  ├── Suspense (Fallback: PageFallback Spinner)
  │     │
  │     ├── Public Layout (<PublicLayout />)
  │     │     ├── /                      ──► Home (<Home />)
  │     │     ├── /about                 ──► About (<About />)
  │     │     ├── /products              ──► Products Catalog (<Products />)
  │     │     ├── /products/:id          ──► Product Detail (<ProductDetail />)
  │     │     ├── /contact               ──► Contact & Quotes (<Contact />)
  │     │     ├── /manufacturing         ──► Factory Infrastructure (<Manufacturing />)
  │     │     ├── /sustainability        ──► Circular Economy (<Sustainability />)
  │     │     └── *                      ──► 404 Not Found (<NotFound />)
  │     │
  │     ├── /admin/login                 ──► Admin Login (<AdminLogin />)
  │     │
  │     └── Protected Admin Layout (<AdminLayout />) [Protected by AuthGuard]
  │           ├── /admin / /admin/dashboard ──► Dashboard (<Dashboard />)
  │           ├── /admin/products        ──► Admin Products List (<AdminProducts />)
  │           ├── /admin/products/new    ──► Product Creator (<AdminProductEditor />)
  │           ├── /admin/products/:id    ──► Product Editor (<AdminProductEditor />)
  │           ├── /admin/categories      ──► Categories List (<AdminCategories />)
  │           ├── /admin/categories/new  ──► Category Creator (<AdminCategoryEditor />)
  │           ├── /admin/categories/:id  ──► Category Editor (<AdminCategoryEditor />)
  │           ├── /admin/inquiries       ──► Inquiries List (<AdminInquiries />)
  │           ├── /admin/inquiries/:source/:id ──► Inquiry Detail (<AdminInquiryDetail />)
  │           ├── /admin/media           ──► Media Library (<AdminMedia />)
  │           ├── /admin/catalog         ──► Flipbook Catalog Manager (<AdminCatalog />)
  │           ├── /admin/content         ──► Site CMS Content (<SiteContent />)
  │           ├── /admin/settings        ──► Admin Profile & Password (<AdminSettings />)
  │           └── /admin/*               ──► Admin 404 (<NotFound />)
```

---

## 2. Dynamic Code Splitting & `lazyRetry` Resilience

Every route container and admin view is dynamically imported via `lazyRetry()`:

```javascript
// apps/web/src/app/router/lazyRetry.js
export const lazyRetry = (componentImport) =>
  lazy(async () => {
    const pageHasBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem("page-has-been-force-refreshed") || "false"
    );

    try {
      return await componentImport();
    } catch (error) {
      // If a deploy occurred and the chunk filename changed, refresh once automatically
      if (!pageHasBeenForceRefreshed) {
        window.sessionStorage.setItem("page-has-been-force-refreshed", "true");
        window.location.reload();
        return { default: () => null };
      }
      throw error;
    }
  });
```

---

## 3. Explicit Admin Authentication Guard (`ProtectedRoute`)

### Current State:
`AdminLayout` performs an imperative redirect inside a `useEffect` if `!token`. This can cause a brief flash of admin UI.

### Target State:
Wrap protected admin routes in a declarative `ProtectedRoute` component:

```jsx
// apps/web/src/app/router/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("admin_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
```

---

## 4. Scroll Restoration & Page Transition Protocol

To provide native-grade navigation feel across client-side transitions:
1. **Scroll Restoration Hook (`useScrollToTop`)**: Automatically scrolls `window.scrollTo(0, 0)` when the route pathname changes (excluding internal tab switching).
2. **Page Header Meta Sync (`useDocumentTitle`)**: Each page component updates `document.title` and OpenGraph meta properties to reflect the active route.
