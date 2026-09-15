---
domain: architecture-refactoring
scope: state-and-data-fetching
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 07. State Management & Data Fetching Architecture

## 1. Architectural Strategy: Pragmatic Layered State

The application avoids unnecessary heavyweight external state libraries (e.g., Redux, MobX) and instead standardizes on a **Four-Tier State Hierarchy**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FOUR-TIER STATE HIERARCHY                       │
├───────────────────┬─────────────────────────┬──────────────────────────┤
│ Tier              │ Technology              │ Data Scope               │
├───────────────────┼─────────────────────────┼──────────────────────────┤
│ 1. Global Context │ React Context API       │ Site info, company phone,│
│                   │ (`SiteContext`)         │ global settings, token   │
├───────────────────┼─────────────────────────┼──────────────────────────┤
│ 2. Server Cache   │ Custom Domain Hooks     │ Products, categories,    │
│                   │ (`useProducts`, etc.)   │ inquiry lists, analytics │
├───────────────────┼─────────────────────────┼──────────────────────────┤
│ 3. Transient UI   │ Custom UI Hooks         │ Modal open/close, tabs,  │
│                   │ (`useToast`, `useDrawer`)│ notifications, filters   │
├───────────────────┼─────────────────────────┼──────────────────────────┤
│ 4. Local Form     │ React `useState`/reducer│ Form inputs, drafts,     │
│                   │                         │ rich text content        │
└───────────────────┴─────────────────────────┴──────────────────────────┘
```

---

## 2. Eliminating Direct `fetch()` Component Calls

### Current State (Defect):
Components like `Navbar.jsx`, `MegaMenu.jsx`, `AdminCategories.jsx`, and `AdminCategoryEditor.jsx` perform inline HTTP calls:
```javascript
// ❌ ANTI-PATTERN: Direct fetch in presentation component
useEffect(() => {
  fetch("/api/categories", { headers: { Authorization: `Bearer ${token}` } })
    .then((r) => r.json())
    .then((data) => setCategories(data.categories || data))
    .catch((err) => console.error(err));
}, []);
```

### Target Pattern: Feature Service Encapsulation
Every remote call is mediated by a domain service:
```javascript
// ✅ TARGET: Feature Service Call
import { categoryService } from "@/features/products/services/category.service";

useEffect(() => {
  async function load() {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      showToast({ type: "error", message: err.message });
    }
  }
  load();
}, []);
```

---

## 3. Centralized API Client Hardening (`shared/api/client.js`)

The centralized `api` client provides automatic authorization header injection, JSON serialization, and normalized error throwing:

```javascript
// apps/web/src/shared/api/client.js
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

function getAuthHeaders() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };
  
  let body = options.body;
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, { ...options, headers, body });
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMsg = (typeof data === 'object' && data.error) || data || response.statusText;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
```

---

## 4. Endpoint Registry Fix (`shared/api/endpoints.js`)

Correct the category endpoint desynchronization:
```javascript
// apps/web/src/shared/api/endpoints.js
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/categories',       // ✅ Corrected from '/products/categories'
  INQUIRIES: '/inquiries',
  CONTACT: '/contact',
  CONTENT: '/content',
  COMPANY: '/company',
  MEDIA: '/media',
  CERTIFICATIONS: '/certifications',
  STATS: '/stats',
  UPLOADS: '/upload/images',
};
```

---

## 5. In-Memory Request Deduplication & Navigation Cache

Components rendered simultaneously (such as `Navbar` and `MegaMenu`, or `Footer` and `ContactPage`) frequently request the same static datasets (categories and company info).

### Implementation:
The `SiteProvider` maintains an in-flight promise cache:
```javascript
// In SiteProvider.jsx
let categoriesPromise = null;

export function fetchCategoriesDeduplicated() {
  if (!categoriesPromise) {
    categoriesPromise = categoryService.getAll()
      .catch((err) => {
        categoriesPromise = null; // Reset on failure so subsequent calls can retry
        throw err;
      });
  }
  return categoriesPromise;
}
```
This guarantees only one network request is fired, reducing backend load and preventing race conditions during page transitions.
