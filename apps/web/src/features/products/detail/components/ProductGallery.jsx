import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { OptimizedImage } from "@/shared/ui";
import { DEFAULT_STANDARDS_BAR } from "../constants";

const MotionDiv = motion.div;

function ImageZoom({ src, alt }) {
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  const zoomFactor = 2;
  const lensSize = 160;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    if (dimensions.width !== width || dimensions.height !== height) {
      setDimensions({ width, height });
    }

    const x = e.clientX - left;
    const y = e.clientY - top;

    const lensX = x - lensSize / 2;
    const lensY = y - lensSize / 2;

    setLensPos({ x: lensX, y: lensY });
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  const mouseX = lensPos.x + lensSize / 2;
  const mouseY = lensPos.y + lensSize / 2;

  const innerImgTransform = `translate3d(${-mouseX * zoomFactor + lensSize / 2}px, ${-mouseY * zoomFactor + lensSize / 2}px, 0) scale(${zoomFactor})`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden cursor-zoom-in flex items-center justify-center select-none"
    >
      <OptimizedImage
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 800px"
        className="w-full h-full object-contain block pointer-events-none"
      />

      <AnimatePresence>
        {showLens && dimensions.width > 0 && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute rounded-full border-2 border-[#277D38] shadow-lg pointer-events-none z-10 bg-white"
            style={{
              left: `${lensPos.x}px`,
              top: `${lensPos.y}px`,
              width: `${lensSize}px`,
              height: `${lensSize}px`,
            }}
          >
            <div
              className="absolute transform-gpu"
              style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                transformOrigin: "top left",
                transform: innerImgTransform,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain block"
              />
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductGallery({
  images,
  currentImgIdx,
  setImg,
  productName,
  setShowImageModal,
  handlePrevImage,
  handleNextImage,
}) {
  return (
    <div
      id="product-gallery-panel"
      className="bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,12px)] p-4 sm:p-6 shadow-[var(--shadow-sm)] flex flex-col gap-5 transition-all duration-200"
    >
      {/* Main Image Viewport */}
      <div className="relative aspect-4/3 w-full bg-[var(--bg-surface-secondary)] rounded-[var(--radius-lg,12px)] overflow-hidden flex items-center justify-center border border-[var(--border-subtle)]">
        <div className="w-full h-full">
          {images[currentImgIdx] ? (
            <ImageZoom src={images[currentImgIdx]} alt={productName} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)]">
              <Icon icon="solar:gallery-linear" className="w-12 h-12" />
              <span className="text-xs mt-2 font-semibold">Image Not Available</span>
            </div>
          )}
        </div>

        {/* Longevity badge */}
        <div className="absolute top-3.5 left-3.5 bg-slate-900/90 dark:bg-slate-950/95 text-white px-3 py-1.5 rounded-[var(--radius-badge,4px)] text-[10px] sm:text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs shadow-xs border border-white/10">
          <Icon icon="solar:shield-check-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />
          <span>50+ Year Lifespan</span>
        </div>

        {/* Fullscreen Trigger */}
        {images[currentImgIdx] && (
          <button
            type="button"
            className="absolute top-3.5 right-3.5 bg-[var(--bg-surface)]/90 hover:bg-[var(--bg-surface)] text-[var(--text-primary)] p-2 rounded-[var(--radius-btn,8px)] transition-all shadow-xs border border-[var(--border-subtle)] cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] active:scale-95"
            onClick={() => setShowImageModal(true)}
            aria-label="View image full screen"
            title="Expand View"
          >
            <Icon icon="solar:full-screen-square-linear" className="w-4 h-4" />
          </button>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--bg-surface)]/80 text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:bg-[var(--bg-surface)] hover:scale-110 active:scale-95 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              aria-label="Previous image"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--bg-surface)]/80 text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:bg-[var(--bg-surface)] hover:scale-110 active:scale-95 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              aria-label="Next image"
            >
              <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-[var(--radius-btn,8px)] border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-all shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] active:scale-95"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
          </button>

          <div className="flex-1 flex gap-2 overflow-x-auto py-1 scrollbar-none justify-center">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                className={`w-13 h-13 sm:w-16 sm:h-16 shrink-0 rounded-[var(--radius-md,8px)] overflow-hidden border-2 p-1 transition-all bg-[var(--bg-surface)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] ${
                  i === currentImgIdx
                    ? "border-[var(--brand-primary)] shadow-[var(--shadow-sm)]"
                    : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                }`}
                onClick={() => setImg(i)}
                aria-label={`View image ${i + 1} of ${productName}`}
              >
                <OptimizedImage src={src} alt={`${productName} image ${i + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-[var(--radius-btn,8px)] border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-all shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] active:scale-95"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Certification & Standards Row */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--border-subtle)]">
        {DEFAULT_STANDARDS_BAR.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2 rounded-[var(--radius-md,6px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] text-center"
          >
            <Icon icon={item.icon} className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
            <span className="text-[11px] font-bold text-[var(--text-primary)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
