---
domain: architecture-refactoring
scope: error-handling-and-resilience
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 12. Error Handling & Resilience Architecture

## 1. End-to-End Resilience Philosophy

A production-grade system must guarantee graceful degradation across all layers: an API failure must not produce an unhandled promise rejection; a server error must not crash the client; a client component error must not unmount the entire page.

```text
Backend Error Origin
      │
      ▼
ApiError Subclasses (400, 401, 403, 404, 429, 500)
      │
      ▼
Express Central errorHandler.js  ──► Normalizes to { success: false, error, code }
      │
      ▼ (Network Response)
Frontend API Client (client.js)   ──► Throws typed ApiError with status & code
      │
      ▼
Feature Service / Custom Hook     ──► Catches error & extracts user-friendly message
      │
      ▼
UI Layer (Toast / FormField / ErrorBoundary)
```

---

## 2. Backend Error Class Hierarchy (`apps/api/src/shared/errors/`)

```javascript
// Base ApiError
class ApiError extends Error {
  constructor(status, message, code = "INTERNAL_ERROR") {
    super(message);
    this.status = status;
    this.code = code;
  }

  static badRequest(msg, code = "BAD_REQUEST") {
    return new ApiError(400, msg, code);
  }

  static unauthorized(msg = "Authentication required", code = "UNAUTHORIZED") {
    return new ApiError(401, msg, code);
  }

  static forbidden(msg = "Access denied", code = "FORBIDDEN") {
    return new ApiError(403, msg, code);
  }

  static notFound(msg = "Resource not found", code = "NOT_FOUND") {
    return new ApiError(404, msg, code);
  }

  static rateLimited(msg = "Too many requests", code = "RATE_LIMITED") {
    return new ApiError(429, msg, code);
  }
}
```

---

## 3. Global Express Error Handler Middleware

Located at `apps/api/src/middleware/errorHandler.js`:
* **JSON Syntax Errors**: Catches invalid client JSON bodies (status 400).
* **Multer File Errors**: Translates `LIMIT_FILE_SIZE` into friendly 400 messages.
* **SQLite / LibSQL Constraints**: Catches `SQLITE_CONSTRAINT_UNIQUE` and formats readable 409 Conflict messages.
* **Production Privacy**: Strips internal stack traces when `NODE_ENV === 'production'`.

---

## 4. Frontend Component Resilience & Error Boundary

1. **Root `ErrorBoundary` (`shared/ui/feedback/ErrorBoundary.jsx`)**:
   - Wraps the entire application in `App.jsx`.
   - Catches unhandled React render crashes and presents a brand-styled "Something went wrong" screen with a "Reload Application" button.
2. **Context-Level Toasting (`useToast`)**:
   - Asynchronous action failures (e.g., failed form submission, network timeout) invoke `showToast({ type: "error", message })` without interrupting the active form draft.
