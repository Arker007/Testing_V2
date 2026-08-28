import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import QuoteButton from "../../shared/components/QuoteButton";
import InquiryModal from "../../shared/components/InquiryModal";
import Badge from "../../shared/components/ui/Badge";
import CtaCard from "../../shared/components/ui/CtaCard";
import Card from "../../shared/components/ui/Card";
import Skeleton from "../../shared/components/ui/Skeleton";
import EmptyState from "../../shared/components/ui/EmptyState";
import { useSite } from "../../shared/context/SiteContext";
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import ProductGallery from "./components/ProductGallery";
import ProductHeaderSpecs from "./components/ProductHeaderSpecs";
import ProductTabsSection from "./components/ProductTabsSection";
import RelatedProductsSection from "./components/RelatedProductsSection";
import { ProductBenefitsGrid } from "./components/ProductBenefitsGrid";
import { ProductSpecsModal } from "./components/ProductSpecsModal";

const _cache = {};
function getProduct(id) {
  if (!_cache[id]) _cache[id] = fetch(`/api/products/${id}`).then((r) => r.json());
  return _cache[id];
}

export default function ProductDetailView() {
  const { id } = useParams();
  const { co } = useSite();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState("specs");
  const [showInquiry, setShowInquiry] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSpecsSheet, setShowSpecsSheet] = useState(false);

  const categoryObj = categories.find((c) => String(c.id) === String(product?.category));
  const categoryName = categoryObj ? categoryObj.name : "Products";
  const title = product ? `${product.name} | ${categoryName}` : "Product Details";
  const desc = product ? String(product.description || "").slice(0, 150) : "Learn more about this sustainable recycled plastic product.";

  useDocumentTitle(title, desc);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getProduct(id),
      fetch("/api/categories").then((r) => r.json()).catch(() => ({}))
    ])
      .then(([d, cd]) => {
        setProduct(d);
        setCategories(cd?.categories || []);
        if (d && !d.error) {
          if (d.specifications && Object.keys(d.specifications).length > 0) setTab("specs");
          else if (d.description || (d.features && d.features.length > 0)) setTab("description");

          fetch("/api/products")
            .then((r) => r.json())
            .then((res) => {
              if (res.products) {
                const others = res.products.filter((p) => p.id !== d.id);
                const sameCat = others.filter((p) => p.category === d.category);
                setRelatedProducts((sameCat.length >= 4 ? sameCat : others).slice(0, 4));
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => setProduct({ error: true }))
      .finally(() => setLoading(false));
  }, [id]);

  const images = useMemo(() => {
    if (!product?.image) return [];
    try {
      const parsed = JSON.parse(product.image);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      return arr.map((item) => (typeof item === "object" && item !== null ? item.local || item.url : item)).filter(Boolean);
    } catch {
      return product.image ? [product.image] : [];
    }
  }, [product?.image]);

  useEffect(() => {
    if (images.length < 2 || showImageModal) return;
    const timer = setInterval(() => {
      setImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, showImageModal]);

  if (loading) {
    return (
      <main className="pt-0 min-h-[80vh] bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)] text-[var(--text-main,#0f141a)] dark:text-[var(--text-main,#F2F2F2)] pb-16">
        {/* Breadcrumb Skeleton */}
        <div className="border-b border-slate-200 dark:border-slate-800 py-4 bg-white dark:bg-[#161c24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2.5 items-center">
            <Skeleton width="40px" height="16px" />
            <Skeleton width="10px" height="16px" />
            <Skeleton width="64px" height="16px" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-8">
               <Skeleton variant="card" className="aspect-4/3 h-auto" />
               <div className="flex gap-4 justify-center">
                 {[1, 2, 3].map((_, i) => (
                   <Skeleton key={i} width="64px" height="64px" className="rounded-lg" />
                 ))}
               </div>
            </div>
            <Card variant="elevated" className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8">
              <Skeleton width="80%" height="32px" />
              <Skeleton lines={2} variant="text" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                 {[1, 2, 3, 4].map((_, i) => (
                   <Skeleton key={i} height="56px" className="rounded-lg" />
                 ))}
              </div>

              <div className="flex gap-4 mt-6">
                <Skeleton width="50%" height="48px" className="rounded-lg" />
                <Skeleton width="50%" height="48px" className="rounded-lg" />
              </div>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (!product || product.error) {
    return (
      <main className="pt-0 min-h-[60vh] flex flex-col items-center justify-center p-6 bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)]">
        <EmptyState
          icon="solar:danger-triangle-linear"
          title="Product not found"
          description="The product you are looking for does not exist or has been removed."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all shadow-2xs hover:border-[var(--brand-border)]"
            >
              <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          }
        />
      </main>
    );
  }

  const handlePrevImage = () => setImg((prev) => (prev - 1 + images.length) % images.length);
  const handleNextImage = () => setImg((prev) => (prev + 1) % images.length);

  const specs = typeof product.specifications === "object" && product.specifications !== null ? product.specifications : {};
  const features = Array.isArray(product.features) ? product.features.filter(Boolean) : [];
  const hasSpecs = Object.keys(specs).length > 0;
  const waLink = `https://wa.me/919898686379?text=Hi%2C+I%27m+interested+in+${encodeURIComponent(product.name)}`;

  const formatPrice = (p) => {
    if (!p) return null;
    const num = Number(String(p).replace(/[^0-9.-]+/g, ""));
    return isNaN(num) || num === 0 ? p : num.toLocaleString("en-IN");
  };

  const currentPrice = formatPrice(product.price);
  const oldPrice = formatPrice(product.oldPrice);
  const discount = product.discountRate ? product.discountRate : null;
  const brand = product.brand || co("name", "VISHAL ENTERPRISE");
  const safeIdPrefix = String(product.id ?? "").substring(0, 6).toUpperCase() || "PROD01";
  const sku = product.sku || `VE-${safeIdPrefix}`;
  const displaySwatches = images.slice(0, 7);
  const sizeOptions = [specs.Size || "Standard", "Large", "Custom"];

  const tabs = [
    hasSpecs && { key: "specs", label: "Specifications" },
    { key: "description", label: "Description" },
    { key: "shipping", label: "Shipping & Returns" },
    { key: "faq", label: "FAQs" },
  ].filter(Boolean);

  return (
    <main className="pt-0 pb-16 bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)] text-[var(--text-main,#0f141a)] dark:text-[var(--text-main,#F2F2F2)] min-h-screen">
      
      {/* Elegant Breadcrumb Header */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 dark:border-slate-800 py-4 bg-white dark:bg-[#161c24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold">
          <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-[#277D38] dark:hover:text-emerald-400 flex items-center gap-1">
            <Icon icon="solar:home-2-linear" className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-slate-400" />
          <Link to="/products" className="text-slate-500 dark:text-slate-400 hover:text-[#277D38] dark:hover:text-emerald-400">Products</Link>
          {categoryObj && (
            <>
              <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-slate-400" />
              <Link to={`/products?cat=${categoryObj.id}`} className="text-slate-500 dark:text-slate-400 hover:text-[#277D38] dark:hover:text-emerald-400">{categoryObj.name}</Link>
            </>
          )}
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-extrabold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Core Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Stack */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <ProductGallery
              images={images}
              currentImgIdx={img}
              setImg={setImg}
              productName={product.name}
              setShowImageModal={setShowImageModal}
              handlePrevImage={handlePrevImage}
              handleNextImage={handleNextImage}
            />
            
            <ProductBenefitsGrid categoryName={categoryName} />
          </div>

          {/* Right Column Stack */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <ProductHeaderSpecs
              product={product}
              categoryName={categoryName}
              brand={brand}
              sku={sku}
              currentPrice={currentPrice}
              oldPrice={oldPrice}
              discount={discount}
              sizeOptions={sizeOptions}
              displaySwatches={displaySwatches}
              currentImgIdx={img}
              setImg={setImg}
              waLink={waLink}
              setShowInquiry={setShowInquiry}
              setShowSpecsSheet={setShowSpecsSheet}
            />
          </div>
        </section>

        {/* Dynamic Specifications and Details Tabs Section */}
        <ProductTabsSection
          product={product}
          categoryObj={categoryObj}
          specs={specs}
          hasSpecs={hasSpecs}
          features={features}
          tab={tab}
          setTab={setTab}
          tabs={tabs}
        />

        {/* Premium Call to Action */}
        <section className="my-12">
          <CtaCard
            badge="Custom Sizing & Solutions"
            badgeVariant="success"
            title="Interested in custom requirements or bulk lot orders?"
            subtitle={`Call our sales desk at ${co("phone", "+91 98986 86379")} or request a direct factory quote.`}
          >
            <QuoteButton 
              type="button" 
              text="Get Quote" 
              onClick={() => setShowInquiry(true)} 
              className="px-5 py-3 rounded-xl bg-[#277D38] hover:bg-[#1E622A] text-white font-bold text-sm transition-all shadow-2xs" 
            />
            <a
              href={`tel:${co("phone", "+919898686379").replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all shadow-2xs decoration-none"
            >
              <Icon icon="solar:phone-calling-linear" className="w-4 h-4 text-[#277D38] dark:text-emerald-400" />
              <span>Call Sales Desk</span>
            </a>
          </CtaCard>
        </section>

        {/* Related Products Carousel */}
        <RelatedProductsSection relatedProducts={relatedProducts} />
      </div>

      {showInquiry && <InquiryModal product={product} onClose={() => setShowInquiry(false)} />}

      {showSpecsSheet && (
        <ProductSpecsModal
          product={product}
          specs={specs}
          onClose={() => setShowSpecsSheet(false)}
          onRequestSheet={() => {
            setShowSpecsSheet(false);
            setShowInquiry(true);
          }}
        />
      )}
    </main>
  );
}
