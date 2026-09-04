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
  ProductBenefitsGrid,
  ProductSpecsModal,
  ProductDetailSkeleton,
} from "./components";
import { useProductDetail, useProductGallery } from "./hooks";
import { formatDetailPrice, buildProductSku, buildWhatsAppInquiryUrl } from "./utils";
import { DEFAULT_SIZE_OPTIONS } from "./constants";

export default function ProductDetailView() {
  const { id } = useParams();
  const { co } = useSite();
  const [showInquiry, setShowInquiry] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSpecsSheet, setShowSpecsSheet] = useState(false);

  const {
    product,
    categoryObj,
    categoryName,
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

  const phone = co("phone", "+91 98986 86379");
  const waLink = buildWhatsAppInquiryUrl(phone, product.name);
  const currentPrice = formatDetailPrice(product.price);
  const oldPrice = formatDetailPrice(product.oldPrice);
  const discount = product.discountRate || null;
  const brand = product.brand || co("name", "VISHAL ENTERPRISE");
  const sku = buildProductSku(product);
  const displaySwatches = images.slice(0, 7);
  const sizeOptions = [specs.Size || DEFAULT_SIZE_OPTIONS[0], DEFAULT_SIZE_OPTIONS[1], DEFAULT_SIZE_OPTIONS[2]];

  return (
    <main className="pt-0 pb-16 bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)] text-[var(--text-main,#0f141a)] dark:text-[var(--text-main,#F2F2F2)] min-h-screen">
      {/* Breadcrumb Navigation Header */}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-10 sm:space-y-12">
        {/* Core Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column Stack: Gallery + Detailed Tabs + Benefits */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <ProductGallery
              images={images}
              currentImgIdx={currentImgIdx}
              setImg={setImgIdx}
              productName={product.name}
              setShowImageModal={setShowImageModal}
              handlePrevImage={handlePrevImage}
              handleNextImage={handleNextImage}
            />

            {/* Dynamic Specifications and Details Tabs Section */}
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

            {/* Benefits Matrix */}
            <ProductBenefitsGrid categoryName={categoryName} />
          </div>

          {/* Right Column Stack: Sticky Commercial & Configuration Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
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
              currentImgIdx={currentImgIdx}
              setImg={setImgIdx}
              waLink={waLink}
              setShowInquiry={setShowInquiry}
              setShowSpecsSheet={setShowSpecsSheet}
            />
          </div>
        </section>

        {/* Call to Action Band */}
        <section className="pt-2">
          <CtaCard
            badge="Custom Sizing & Solutions"
            badgeVariant="success"
            title="Need custom profiles, specific lengths, or bulk lot orders?"
            subtitle={`Call our direct technical desk at ${phone} or request an instant factory quotation.`}
          >
            <QuoteButton
              type="button"
              text="Get Quote"
              onClick={() => setShowInquiry(true)}
              className="px-5 py-3 rounded-xl font-bold text-sm shadow-md"
            />
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all shadow-xs decoration-none"
            >
              <Icon icon="solar:phone-calling-linear" className="w-4 h-4 text-[#277D38] dark:text-emerald-400" />
              <span>Call Sales Desk</span>
            </a>
          </CtaCard>
        </section>

        {/* Related Products Carousel */}
        <RelatedProductsSection relatedProducts={relatedProducts} />
      </div>

      <AnimatePresence>
        {showInquiry && <InquiryModal product={product} onClose={() => setShowInquiry(false)} />}
      </AnimatePresence>

      <AnimatePresence>
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
      </AnimatePresence>
    </main>
  );
}
