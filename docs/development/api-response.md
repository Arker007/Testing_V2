# API Response & Error Schemas

## 📡 Standardized Response Format
- **Success**: `{ "success": true, "data": ... }` or array/object payload
- **Error**: `{ "success": false, "error": "Clear description string" }` with HTTP status code (400, 401, 404, 500)

## 🔒 Authentication Header
- **Bearer Token**: `Authorization: Bearer <admin_token>` stored in `localStorage.getItem("admin_token")`
