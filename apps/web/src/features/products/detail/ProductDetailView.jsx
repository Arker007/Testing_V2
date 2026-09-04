import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { QuoteButton, InquiryModal, CtaCard, EmptyState } from "@/shared/ui";
import { useSite } from "@/shared/context/SiteContext";
import {
  ProductGallery,
  ProductHeaderSpecs,
  ProductTabsSection,
  RelatedProductsSection,
  ProductDetailSkeleton,
  ProductImageFullscreenModal,
} from "./components";
import { useProductDetail, useProductGallery } from "./hooks";
import { formatDetailPrice, buildProductSku } from "./utils";

export default function ProductDetailView() {
  const { id } = useParams();
  const { co } = useSite();
  const [showInquiry, setShowInquiry] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const {
    product,
    categoryObj,
    categoryName: _categoryName,
    relatedProducts,
    loading,
    activeTab,
    setActiveTab,
    availableTabs,
    images,
    specs,
    features,
    hasSpecs,
  } = useProductDetail(id);

  const {
    currentImgIdx,
    setImgIdx,
    handlePrevImage,
    handleNextImage,
  } = useProductGallery(images, {
    autoRotate: true,
    intervalMs: 4000,
    paused: showImageModal,
  });

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product || product.error) {
    return (
      <main className="pt-0 min-h-[60vh] flex flex-col items-center justify-center p-6 bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        <EmptyState
          icon="solar:danger-triangle-linear"
          title="Product not found"
          description="The product you are looking for does not exist or has been removed."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[var(--radius-card,8px)] border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] font-bold text-sm transition-all shadow-2xs hover:border-[var(--brand-border)]"
            >
              <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          }
        />
      </main>
    );
  }

  const phone = co("phone", "+91 98986 86379");
  const currentPrice = formatDetailPrice(product.price);
  const brand = product.brand || co("name", "VISHAL ENTERPRISE");
  const sku = buildProductSku(product);
  const sizeOptions = specs.Size ? [specs.Size] : [];

  return (
    <main className="pt-0 pb-20 bg-[var(--bg-canvas)] text-[var(--text-primary)] min-h-screen">
      {/* Breadcrumb Navigation Header */}
      <nav aria-label="Breadcrumb" className="border-b border-[var(--border-subtle)] py-3.5 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium">
          <Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] flex items-center gap-1 transition-colors">
            <Icon icon="solar:home-2-linear" className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-[var(--text-muted)]" />
          <Link to="/products" className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors">
            Catalog
          </Link>
          {categoryObj && (
            <>
              <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-[var(--text-muted)]" />
              <Link to={`/products?cat=${categoryObj.id}`} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors">
                {categoryObj.name}
              </Link>
            </>
          )}
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-[var(--text-muted)]" />
          <span className="text-[var(--text-primary)] font-bold truncate max-w-[220px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 space-y-16">
        {/* Core Layout Grid: Asymmetric 58% / 42% (7 cols / 5 cols) with generous 48px gap */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column Stack: Gallery Viewport */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <ProductGallery
              images={images}
              currentImgIdx={currentImgIdx}
              setImg={setImgIdx}
              productName={product.name}
              setShowImageModal={setShowImageModal}
              handlePrevImage={handlePrevImage}
              handleNextImage={handleNextImage}
            />

            {/* Dynamic Technical Specifications and Engineering Standards */}
            <ProductTabsSection
              product={product}
              categoryObj={categoryObj}
              specs={specs}
              hasSpecs={hasSpecs}
              features={features}
              tab={activeTab}
              setTab={setActiveTab}
              tabs={availableTabs}
            />
          </div>

          {/* Right Column Stack: Sticky Commercial & Procurement Configuration Rail */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
            <ProductHeaderSpecs
              product={product}
              brand={brand}
              sku={sku}
              currentPrice={currentPrice}
              sizeOptions={sizeOptions}
              setShowInquiry={setShowInquiry}
            />
          </div>
        </section>

        {/* Custom Machining & B2B Engineering Callout */}
        <section>
          <CtaCard
            badge="Direct Factory Engineering"
            badgeVariant="success"
            title="Require Custom Footprints, Machined Skids, or Stamped Branding?"
            subtitle={`We fabricate custom dimensions, heavy-duty runners, and molded profiles directly at our Ankleshwar GIDC manufacturing facility. Call technical desk ${phone} or submit drawings for review.`}
          >
            <QuoteButton
              type="button"
              text="Submit Custom Specs"
              onClick={() => setShowInquiry(true)}
              className="px-6 py-3.5 rounded-[var(--radius-card,8px)] font-bold text-sm shadow-sm"
            />
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[var(--radius-card,8px)] border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] font-bold text-sm transition-all shadow-2xs decoration-none"
            >
              <Icon icon="solar:phone-calling-linear" className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Call Technical Sales Desk</span>
            </a>
          </CtaCard>
        </section>

        {/* Related Products Section */}
        <RelatedProductsSection relatedProducts={relatedProducts} />
      </div>

      <AnimatePresence>
        {showInquiry && <InquiryModal product={product} onClose={() => setShowInquiry(false)} />}
      </AnimatePresence>

      <ProductImageFullscreenModal
        images={images}
        currentImgIdx={currentImgIdx}
        setImg={setImgIdx}
        productName={product.name}
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
      />
    </main>
  );
}
