# Admin Dashboard Reference & Workflows

## 🛠️ Overview
The Vishal Enterprise Admin Portal provides centralized management for products, categories, site CMS content, customer inquiries, and media uploads.

## 🔐 Authentication
- **Route**: `/admin/login`
- **Security**: JWT-based Bearer token authentication stored in `localStorage` under `admin_token`.
- **Default Superadmin**: Configured in database seeds (`admin` / default password initialized during DB sync).

## 📊 Modules & Capabilities
1. **Dashboard Overview (`/admin`)**:
   - Live KPI counters (Total Products, Active Categories, Inquiries, Pending Quotes).
   - Recent inquiries table with quick actions.
2. **Product Catalog Management (`/admin/products`)**:
   - Create, edit, delete, and toggle publish status for industrial products.
   - Dynamic specification attributes and image URL binding.
3. **Category Management (`/admin/categories`)**:
   - Organize products by category with custom specification field definitions.
4. **Inquiries & Quotes (`/admin/inquiries`)**:
   - View, filter, respond (direct WhatsApp integration), and manage incoming B2B quote inquiries.
5. **Site Content CMS (`/admin/content`)**:
   - Inline visual CMS for homepage banners, company stats, and industrial copy.
6. **Media Library (`/admin/media`)**:
   - Upload and organize product and factory media with automatic file metadata tracking.

## 🗂️ Component Structure
- `AdminLayout.jsx`: The shell with the sidebar navigation.
- `AdminDashboard.jsx`: The home page of the admin.
- `AdminProducts.jsx` / `AdminCategories.jsx`: Catalog management.
- `AdminInquiries.jsx`: Lead management and WhatsApp response.
- `AdminMedia.jsx`: Media file uploads.
- `AdminSettings.jsx`: Basic admin state/settings.
