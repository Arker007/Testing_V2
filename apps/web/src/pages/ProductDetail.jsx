import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import QuoteButton from "../shared/components/QuoteButton";
import InquiryModal from "../shared/components/InquiryModal";
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
      <main style={{ paddingTop: "var(--nav-h)", minHeight: "80vh", background: "#fafafa" }}>
        {/* Breadcrumb Skeleton */}
        <div className={styles.breadcrumb} style={{ borderBottom: "1px solid #eee", padding: "1rem 0" }}>
          <div className={`container ${styles.breadcrumbInner}`} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ width: "40px", height: "16px", background: "#e2e8f0", borderRadius: "4px" }} />
            <div style={{ width: "10px", height: "16px", background: "#e2e8f0", borderRadius: "4px" }} />
            <div style={{ width: "60px", height: "16px", background: "#e2e8f0", borderRadius: "4px" }} />
          </div>
        </div>
        
        <div className={`container ${styles.detailContainer}`} style={{ marginTop: "2rem" }}>
          <section className={styles.bentoHeroGrid}>
            <div className={styles.leftColStack} style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2rem" }}>
               {/* Gallery Skeleton */}
               <div style={{ width: "100%", aspectRatio: "4/3", background: "#e2e8f0", borderRadius: "16px" }} className="animate-pulse" />
               <div style={{ display: "flex", gap: "1rem" }}>
                 {[1, 2, 3].map((_, i) => (
                   <div key={i} style={{ width: "80px", height: "80px", background: "#e2e8f0", borderRadius: "8px" }} className="animate-pulse" />
                 ))}
               </div>
            </div>
            <div className={styles.rightColStack} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Title & Desc Skeleton */}
            <div style={{ width: "80%", height: "40px", background: "#e2e8f0", borderRadius: "8px" }} className="animate-pulse" />
            <div style={{ width: "100%", height: "20px", background: "#e2e8f0", borderRadius: "4px" }} className="animate-pulse" />
            <div style={{ width: "90%", height: "20px", background: "#e2e8f0", borderRadius: "4px" }} className="animate-pulse" />
            
            {/* Specs Grid Skeleton */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
               {[1, 2, 3, 4].map((_, i) => (
                 <div key={i} style={{ height: "60px", background: "#e2e8f0", borderRadius: "8px" }} className="animate-pulse" />
               ))}
            </div>

            {/* Buttons Skeleton */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <div style={{ width: "50%", height: "48px", background: "#e2e8f0", borderRadius: "8px" }} className="animate-pulse" />
              <div style={{ width: "50%", height: "48px", background: "#e2e8f0", borderRadius: "8px" }} className="animate-pulse" />
            </div>
          </div>
          </section>
        </div>
      </main>
    );
  }

  if (!product || product.error) {
    return (
      <main style={{ paddingTop: "var(--nav-h)", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: "3rem", color: "#f59e0b" }} />
        <p>Product not found.</p>
        <Link to="/products" className="btn btn--outline">← Back to Products</Link>
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
    <main style={{ paddingTop: "var(--nav-h)", paddingBottom: "4rem", background: "#fafafa" }}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={`container ${styles.breadcrumbInner}`}>
          <Link to="/">Home</Link>
          <i className="fa-solid fa-chevron-right" />
          <Link to="/products">Products</Link>
          {categoryObj && (
            <>
              <i className="fa-solid fa-chevron-right" />
              <Link to={`/products?cat=${categoryObj.id}`}>{categoryObj.name}</Link>
            </>
          )}
          <i className="fa-solid fa-chevron-right" />
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

        <section className={styles.detailCtaBand}>
          <div>
            <h3>Interested in custom requirements?</h3>
            <p>Call us at {co("phone", "+91 98986 86379")} or request a quote</p>
          </div>
          <QuoteButton type="button" text="Get Quote" onClick={() => setShowInquiry(false)} />
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
