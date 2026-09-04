---
domain: frontend-web
scope: apps/web/src
last_updated: 2026-08-31
---

# Frontend Architecture (`apps/web`)

## 📂 Frontend Structure Overview
```text
apps/web/
├── package.json / vite.config.js
├── index.html / public/
└── src/
    ├── main.jsx                        # React entry point
    ├── app/                            # AppRouter, Layouts (Public/Admin), SiteProvider
    ├── pages/                          # Route container pages (HomePage, ProductsPage, etc.)
    ├── features/                       # Modular feature domains
    └── shared/                         # Reusable UI primitives, hooks, & core styles
```

## 🧩 Frontend Feature Modules (`apps/web/src/features/`)

| Feature Domain | Key Components | Purpose |
| :--- | :--- | :--- |
| **`about/`** | `AboutHero`, `WhoWeAreSection`, `WhyChooseUsSection`, `TestimonialsSection` | Company overview & experience |
| **`admin/`** | `Dashboard`, `AdminSidebar`, `AdminTopBar`, `RichTextEditor` | Admin management portal |
| **`auth/`** | `Login` | Admin login form & authentication |
| **`catalog/`** | `AdminCatalog`, `CatalogSidebar`, `catalogSpreads/` | Dynamic catalog PDF/flipbook view |
| **`contact/`** | `ContactSection`, `MapSection`, `InquiryForm` | Customer contact & lead generation |
| **`content-management/`** | `ContentManagementDashboard`, `SectionEditors` | CMS site content manager |
| **`home/`** | `HomeHero`, `FeaturesSection`, `ProductsShowcase`, `HomeCtaSection` | Homepage presentation |
| **`inquiries/`** | `AdminInquiriesTable`, `AdminInquiryDetail` | Admin inquiry lead viewer |
| **`manufacturing/`** | `ManufacturingPage`, `ProcessSection`, `QualitySection` | Factory capabilities & facility showcase |
| **`navigation/`** | `Navbar`, `Footer`, `MobileNav` | Top bar navigation & footer links |
| **`product-detail/`** | `ProductDetailView`, `ProductHeaderSpecs`, `ProductGallery` | Product detail page & specification tables |
| **`products/`** | `ProductCatalog`, `ProductGrid`, `ProductCard`, `QuickViewModal` | Products catalog & filtering grid |
| **`sustainability/`** | `SustainabilityPage`, `EcoPillars` | ESG & sustainability initiatives |

## 🎨 Shared UI Library (`apps/web/src/shared/`)
- **`shared/ui/`**: Reusable base primitives (`Button`, `Card`, `Badge`, `Modal`, `Table`, `Toast`, `Kbd`, `Accordion`).
- **`shared/context/`**: `SiteContext` for global website state.
- **`shared/styles/core/`**: Design tokens (`tokens.css`), themes (`themes.css`), and base reset.
