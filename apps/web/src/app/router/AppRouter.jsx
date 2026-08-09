import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PublicLayout from "../layouts/PublicLayout";

// Public pages — code-split, load only when the route is visited
const Home = lazy(() => import("../../pages/Home"));
const About = lazy(() => import("../../pages/About"));
const Products = lazy(() => import("../../pages/Products"));
const ProductDetail = lazy(() => import("../../pages/ProductDetail"));
const Contact = lazy(() => import("../../pages/Contact"));
const Manufacturing = lazy(() => import("../../pages/Manufacturing"));
const Sustainability = lazy(() => import("../../pages/Sustainability"));

// Admin pages — separate chunk, never loaded on public pages
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const AdminLogin = lazy(() => import("../../features/auth/Login"));
const Dashboard = lazy(() => import("../../features/admin/Dashboard"));
const AdminProducts = lazy(() => import("../../features/products/admin/AdminProducts"));
const AdminProductEditor = lazy(
  () => import("../../features/products/admin/AdminProductEditor")
);
const AdminCategories = lazy(() => import("../../features/products/categories/AdminCategories"));
const AdminCategoryEditor = lazy(
  () => import("../../features/products/categories/AdminCategoryEditor")
);
const AdminInquiries = lazy(() => import("../../features/inquiries/AdminInquiries"));
const AdminInquiryDetail = lazy(
  () => import("../../features/inquiries/AdminInquiryDetail")
);
const AdminMedia = lazy(() => import("../../features/media/AdminMedia"));
const AdminCatalog = lazy(() => import("../../features/catalog/AdminCatalog"));
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
