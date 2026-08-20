import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../../pages/Home";

// Helper for dynamic imports with automatic retry upon Vite module updates/network glitches
const lazyRetry = (componentImport) =>
  lazy(async () => {
    const pageHasBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem("page-has-been-force-refreshed") || "false"
    );

    try {
      return await componentImport();
    } catch (error) {
      if (!pageHasBeenForceRefreshed) {
        window.sessionStorage.setItem("page-has-been-force-refreshed", "true");
        window.location.reload();
        return { default: () => null };
      }
      throw error;
    }
  });

// Public pages — code-split, load only when the route is visited
const About = lazyRetry(() => import("../../pages/About"));
const Products = lazyRetry(() => import("../../pages/Products"));
const ProductDetail = lazyRetry(() => import("../../pages/ProductDetail"));
const Contact = lazyRetry(() => import("../../pages/Contact"));
const Manufacturing = lazyRetry(() => import("../../pages/Manufacturing"));
const Sustainability = lazyRetry(() => import("../../pages/Sustainability"));

// Admin pages — separate chunk, never loaded on public pages
const AdminLayout = lazyRetry(() => import("../layouts/AdminLayout"));
const AdminLogin = lazyRetry(() => import("../../features/auth/Login"));
const Dashboard = lazyRetry(() => import("../../features/admin/Dashboard"));
const AdminProducts = lazyRetry(() => import("../../features/products/admin/AdminProducts"));
const AdminProductEditor = lazyRetry(
  () => import("../../features/products/admin/AdminProductEditor")
);
const AdminCategories = lazyRetry(() => import("../../features/products/categories/AdminCategories"));
const AdminCategoryEditor = lazyRetry(
  () => import("../../features/products/categories/AdminCategoryEditor")
);
const AdminInquiries = lazyRetry(() => import("../../features/inquiries/AdminInquiries"));
const AdminInquiryDetail = lazyRetry(
  () => import("../../features/inquiries/AdminInquiryDetail")
);
const AdminMedia = lazyRetry(() => import("../../features/media/AdminMedia"));
const AdminCatalog = lazyRetry(() => import("../../features/catalog/AdminCatalog"));
import SiteContent from "../../features/content-management/SiteContent";
import AdminSettings from "../../features/admin/AdminSettings";
import NotFound from "../../pages/NotFound";

const PageFallback = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <i
      className="fa-solid fa-spinner fa-spin"
      style={{ fontSize: "2rem", color: "var(--primary)" }}
    />
  </div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* ── Public pages ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ── Admin panel ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductEditor />} />
            <Route path="products/:id" element={<AdminProductEditor />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="categories/new" element={<AdminCategoryEditor />} />
            <Route path="categories/:id" element={<AdminCategoryEditor />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="inquiries/:source/:id" element={<AdminInquiryDetail />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="catalog" element={<AdminCatalog />} />
            <Route path="content" element={<SiteContent />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
