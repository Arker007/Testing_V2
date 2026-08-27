1. Missing Features & Controls
Media Management (AdminMedia): There is no delete functionality for uploaded images. You can upload and view them, but a handleDelete function is completely missing.
Pagination & Loading Limits: None of the lists (AdminProducts, AdminCategories, AdminInquiries) have pagination implemented. They load all records at once, which will cause performance issues as the database grows.
Bulk Actions: There are no bulk selection checkboxes for deleting multiple products, inquiries, or categories at once.
PDF Export (AdminCatalog): The "Print / Save PDF" feature relies purely on the browser's native window.print() dialog rather than generating a formatted PDF document on the backend.
Drafts / Auto-save: No draft states or auto-save mechanisms are implemented for the Product Editor or Site Content manager. If you navigate away, all unsaved changes are lost.
2. Broken / Poorly Handled Interactions
Intrusive Error Handling: Almost all error states (network errors, upload failures, validation errors) are using ugly, blocking browser alert() popups (e.g., alert("Image upload failed.")) instead of native toast notifications or inline error messages (except in AdminSettings).
Silent Failures on Lists: In components like AdminProducts and AdminInquiries, if the API fails to fetch data, it simply catches the error and silently sets the list to empty ([]). The user is not informed that the fetch actually failed, making it look like the database is empty.
Settings & Auth: Updating the password in AdminSettings works, but it does not automatically log the admin out of other sessions or force a re-login.
(Note: The system encountered a quota/rate-limit error on the AI provider while scanning the final few backend files, but the list above covers the primary frontend architectural gaps).