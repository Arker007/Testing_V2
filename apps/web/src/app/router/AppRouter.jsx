import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Icon } from "@iconify/react";
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
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent px-4 select-none">
    <div className="relative flex items-center justify-center w-24 h-24 mb-5">
      {/* Outer spinning ring with brand styling */}
      <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800/40" />
      <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 dark:border-t-[#6BBF54] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      
      {/* Reverse-rotating dashed ring */}
      <div className="absolute inset-2 rounded-full border border-dashed border-slate-200 dark:border-[rgba(242,242,242,0.08)] animate-[spin_4s_linear_infinite_reverse]" />

      {/* Inner pulsing container with custom eco / circular-plastic loop icon */}
      <div className="absolute flex items-center justify-center bg-emerald-50/50 dark:bg-[rgba(107,191,84,0.08)] w-14 h-14 rounded-full shadow-xs animate-pulse">
        <Icon
          icon="solar:refresh-circle-bold-duotone"
          className="w-8 h-8 text-emerald-600 dark:text-[#6BBF54]"
        />
      </div>
    </div>

    {/* Elegant Brand Title and loading caption */}
    <div className="text-center animate-pulse">
      <h2 className="text-xs font-black tracking-[0.3em] text-slate-800 dark:text-white uppercase">
        Vishal Enterprise
      </h2>
      <div className="flex items-center justify-center gap-1.5 mt-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
        <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-[rgba(242,242,242,0.45)] uppercase">
          Circular Plastics
        </p>
      </div>
    </div>
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
