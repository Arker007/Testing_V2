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
          icon="carbon:warning-alt"
          title="Product not found"
          description="The product you are looking for does not exist or has been removed."
          action={
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[var(--radius-card,8px)] border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] font-bold text-sm transition-all shadow-2xs hover:border-[var(--brand-border)]"
            >
              <Icon icon="carbon:arrow-left" className="w-4 h-4" />
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
            <Icon icon="carbon:home" className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Icon icon="carbon:chevron-right" className="w-3 h-3 text-[var(--text-muted)]" />
          <Link to="/products" className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors">
            Catalog
          </Link>
          {categoryObj && (
            <>
              <Icon icon="carbon:chevron-right" className="w-3 h-3 text-[var(--text-muted)]" />
              <Link to={`/products?cat=${categoryObj.id}`} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors">
                {categoryObj.name}
              </Link>
            </>
          )}
          <Icon icon="carbon:chevron-right" className="w-3 h-3 text-[var(--text-muted)]" />
          <span className="text-[var(--text-primary)] font-bold truncate max-w-[220px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-12 sm:space-y-16">
        {/* Core Layout Grid: Reordered on mobile (Gallery -> Specs & CTA -> Detailed Tabs) and 7/5 cols on desktop */}
        <section className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* 1. Gallery Viewport: Order 1 on mobile, 7 cols on desktop */}
          <div className="order-1 lg:order-1 lg:col-span-7 w-full">
            <ProductGallery
              images={images}
              currentImgIdx={currentImgIdx}
              setImg={setImgIdx}
              productName={product.name}
              setShowImageModal={setShowImageModal}
              handlePrevImage={handlePrevImage}
              handleNextImage={handleNextImage}
            />
          </div>

          {/* 2. Commercial Specs & Quoting CTA Rail: Order 2 on mobile (immediately accessible), 5 cols & sticky on desktop */}
          <div className="order-2 lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-24">
            <ProductHeaderSpecs
              product={product}
              brand={brand}
              sku={sku}
              currentPrice={currentPrice}
              sizeOptions={sizeOptions}
              setShowInquiry={setShowInquiry}
            />
          </div>

          {/* 3. Deep Technical Specifications & Engineering Standards: Order 3 on mobile, 7 cols under gallery on desktop */}
          <div className="order-3 lg:order-3 lg:col-span-7 w-full">
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
              <Icon icon="carbon:phone" className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Call Technical Sales Desk</span>
            </a>
          </CtaCard>
        </section>

        {/* Related Products Section */}
        <RelatedProductsSection relatedProducts={relatedProducts} />
      </div>

      {/* Mobile Persistent Sticky Procurement Bar (Thumb-Zone Optimization) */}
      <div className="lg:hidden fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-30 bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border-default)] px-4 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block truncate">
            {sku ? `REF: ${sku}` : "FACTORY DIRECT"}
          </span>
          <span className="text-xs font-black text-[var(--text-primary)] block truncate">
            {product.name}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/919898686379?text=${encodeURIComponent(`Hello Vishal Enterprise, I am requesting quote for: ${product.name}${sku ? ` (REF: ${sku})` : ""}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 !min-h-[44px] !w-[44px] rounded-[var(--radius-btn,8px)] border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] flex items-center justify-center transition-all decoration-none active:scale-95"
            aria-label="WhatsApp Sales Desk"
            title="WhatsApp Sales Desk"
          >
            <Icon icon="carbon:chat" className="w-5 h-5 text-[#25D366]" />
          </a>
          <button
            type="button"
            onClick={() => setShowInquiry(true)}
            className="px-4 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-[var(--brand-btn-text)] rounded-[var(--radius-btn,8px)] font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer border-0 min-h-[44px]"
          >
            <Icon icon="carbon:chat" className="w-4 h-4" />
            <span>Request Quote</span>
          </button>
        </div>
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
