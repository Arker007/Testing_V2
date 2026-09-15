---
domain: architecture-refactoring
scope: security-and-auth-hardening
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 15. Security & Authentication Hardening Plan

## 1. Threat Model & Security Posture

As an industrial procurement and catalog portal with an administrative CMS back-office, Vishal Enterprise must protect against:
1. **Unauthorized Admin Access**: Brute force login, session hijacking, or unauthenticated route access.
2. **Form Spam & Denial of Service**: Automated bot submissions targeting inquiry and quote endpoints.
3. **Stored Cross-Site Scripting (XSS)**: Malicious HTML payloads injected through CMS rich text fields.
4. **Malicious File Uploads**: Executable scripts disguised as product image uploads.

---

## 2. Authentication & Credential Architecture

```text
Admin Login Flow:
1. POST /api/auth/login with { username, password }
2. Rate-limiter (authLimiter) checks IP attempt window
3. auth.service retrieves hashed password from `users` table
4. bcrypt.compare verifies password hash
5. Server signs JWT containing { id, username, role: "admin" } with 24h expiry
6. Client stores token in localStorage and attaches via `Authorization: Bearer <token>`
```

### Planned Hardening:
* Enforce minimum password complexity on admin password updates in `AdminSettings.jsx`.
* Rotate JWT signing secret via `JWT_SECRET` environment variable with safe fallback warning in development.

---

## 3. Rate-Limiting Strategy (`apps/api/src/routes/index.js`)

The API implements tiered IP rate limiting:

| Limiter | Scope | Threshold | Key Extraction |
| :--- | :--- | :--- | :--- |
| **General Limiter** | All `/api/*` requests | 200 req / 15 min | `getClientIp(req)` via `x-forwarded-for` / first hop |
| **Contact Limiter** | `POST /api/contact`, `POST /api/inquiries` | 10 req / 1 hour | Strict IP keying to prevent lead spam |
| **Auth Limiter** | `POST /api/auth/login` | 10 attempts / 15 min | Strict IP keying to block dictionary attacks |

---

## 4. Input Sanitization & Upload Safeguards

1. **Rich Text Content Sanitization**:
   - CMS content rendered on the public website via Quill is sanitized client-side with `DOMPurify.sanitize()` to ensure zero malicious `<script>` or event handler attributes execute.
2. **File Upload Hardening (`apps/api/src/modules/uploads/`)**:
   - Multer enforces a 10MB file size limit.
   - Sharp inspects the magic byte signature of uploaded files, rejecting any file that fails genuine image decoding (blocking disguised `.php` or `.sh` files).
   - Filenames are generated using random timestamps and UUIDs, preventing path traversal attacks (`../../`).
