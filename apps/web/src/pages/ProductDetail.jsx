import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import QuoteButton from "../shared/components/QuoteButton";
import InquiryModal from "../shared/components/InquiryModal";
import Card from "../shared/components/ui/Card";
import Badge from "../shared/components/ui/Badge";
import { useSite } from "../shared/context/SiteContext";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import ProductGallery from "../features/product-detail/ProductGallery";
import ProductHeaderSpecs from "../features/product-detail/ProductHeaderSpecs";
import ProductTabsSection from "../features/product-detail/ProductTabsSection";
import RelatedProductsSection from "../features/product-detail/RelatedProductsSection";
import { ProductBenefitsGrid } from "../features/product-detail/ProductBenefitsGrid";
import { ProductSpecsModal } from "../features/product-detail/ProductSpecsModal";
import styles from "./ProductDetail.module.css";

const _cache = {};
function getProduct(id) {
  if (!_cache[id]) _cache[id] = fetch(`/api/products/${id}`).then((r) => r.json());
  return _cache[id];
}

export default function ProductDetail() {
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
      <main className="pt-[var(--nav-h)] min-h-[80vh] bg-slate-50 dark:bg-slate-950">
        {/* Breadcrumb Skeleton */}
        <div className={`${styles.breadcrumb} border-b border-[var(--border-card)] py-4`}>
          <div className={`container ${styles.breadcrumbInner} flex gap-2.5 items-center`}>
            <div className="w-10 h-4 bg-slate-200 dark:bg-white/10 rounded-sm" />
            <div className="w-2.5 h-4 bg-slate-200 dark:bg-white/10 rounded-sm" />
            <div className="w-16 h-4 bg-slate-200 dark:bg-white/10 rounded-sm" />
          </div>
        </div>
        
        <div className={`container ${styles.detailContainer} mt-8`}>
          <section className={styles.bentoHeroGrid}>
            <div className={`${styles.leftColStack} flex flex-col gap-8 mb-8`}>
               {/* Gallery Skeleton */}
               <div className="w-full aspect-4/3 bg-slate-200 dark:bg-white/10 rounded-2xl animate-pulse" />
               <div className="flex gap-4">
                 {[1, 2, 3].map((_, i) => (
                   <div key={i} className="w-20 h-20 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
                 ))}
               </div>
            </div>
            <div className={`${styles.rightColStack} flex flex-col gap-6`}>
              {/* Title & Desc Skeleton */}
              <div className="w-4/5 h-10 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
              <div className="w-full h-5 bg-slate-200 dark:bg-white/10 rounded-sm animate-pulse" />
              <div className="w-[90%] h-5 bg-slate-200 dark:bg-white/10 rounded-sm animate-pulse" />
              
              {/* Specs Grid Skeleton */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                 {[1, 2, 3, 4].map((_, i) => (
                   <div key={i} className="h-16 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
                 ))}
              </div>

              {/* Buttons Skeleton */}
              <div className="flex gap-4 mt-8">
                <div className="w-1/2 h-12 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
                <div className="w-1/2 h-12 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!product || product.error) {
    return (
      <main className="pt-[var(--nav-h)] min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <Icon icon="solar:danger-triangle-linear" className="text-5xl text-amber-500 w-14 h-14" />
        <p className="text-slate-700 dark:text-slate-300 font-medium">Product not found.</p>
        <Link to="/products" className="btn btn--outline flex items-center gap-1.5">
          <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
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
    <main className="pt-[var(--nav-h)] pb-16 bg-slate-50 dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={`container ${styles.breadcrumbInner}`}>
          <Link to="/">Home</Link>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-slate-400" />
          <Link to="/products">Products</Link>
          {categoryObj && (
            <>
              <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-slate-400" />
              <Link to={`/products?cat=${categoryObj.id}`}>{categoryObj.name}</Link>
            </>
          )}
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-slate-400" />
          <span>{product.name}</span>
        </div>
      </div>

      <div className={`container ${styles.detailContainer}`}>
        <section className={styles.bentoHeroGrid}>
          <div className={styles.leftColStack}>
            <ProductGallery
              images={images}
              currentImgIdx={img}
              setImg={setImg}
              productName={product.name}
              setShowImageModal={setShowImageModal}
              handlePrevImage={handlePrevImage}
              handleNextImage={handleNextImage}
            />
            <ProductBenefitsGrid />
          </div>
          <div className={styles.rightColStack}>
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

        <section className="my-8 cta-section">
          <Card
            variant="elevated"
            className="p-8 sm:p-12 text-slate-900 dark:text-white shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[#171E26] border border-slate-200/90 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* Ambient radial glow blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-3">
                <Badge variant="brand" size="md">
                  Custom Extrusion & Sizing
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Interested in custom requirements or bulk lot orders?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-xl font-medium leading-relaxed">
                Call our sales desk at {co("phone", "+91 98986 86379")} or request a direct factory quote.
              </p>
            </div>
            <div className="relative z-10 shrink-0 self-start sm:self-auto">
              <QuoteButton type="button" text="Get Quote" onClick={() => setShowInquiry(true)} className="shadow-md" />
            </div>
          </Card>
        </section>

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
