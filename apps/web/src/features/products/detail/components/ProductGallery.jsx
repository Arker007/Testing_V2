import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { OptimizedImage } from "@/shared/ui";

const MotionDiv = motion.div;

function ImageZoom({ src, alt, onOpenModal }) {
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches
      );
    };
    checkTouch();
  }, []);

  const zoomFactor = 2;
  const lensSize = 160;

  const handleMouseMove = (e) => {
    if (isTouchDevice || !containerRef.current) return;
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
    if (isTouchDevice) return;
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  const handleClick = () => {
    if (isTouchDevice && onOpenModal) {
      onOpenModal();
    }
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
      onClick={handleClick}
      className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none ${
        isTouchDevice ? "cursor-pointer" : "cursor-zoom-in"
      }`}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 800px"
        className="w-full h-full object-cover block pointer-events-none"
      />

      {isTouchDevice && (
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[var(--radius-card,8px)] backdrop-blur-xs flex items-center gap-1 pointer-events-none z-20">
          <Icon icon="carbon:maximize" className="w-3.5 h-3.5" />
          <span>Tap to expand</span>
        </div>
      )}

      <AnimatePresence>
        {!isTouchDevice && showLens && dimensions.width > 0 && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute rounded-[var(--radius-card,8px)] border-2 border-[var(--brand-primary)] shadow-2xl pointer-events-none z-20 bg-[var(--bg-surface)] overflow-hidden"
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
                className="w-full h-full object-cover block"
              />
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductGallery({
  images = [],
  currentImgIdx = 0,
  setImg,
  productName,
  setShowImageModal,
  handlePrevImage,
  handleNextImage,
  onHoverChange,
}) {
  return (
    <div
      id="product-gallery-panel"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className="flex flex-col md:flex-row gap-4 items-start w-full transition-all duration-200"
    >
      {/* 1. Left Vertical Thumbnails Column (Stacked vertically on desktop, horizontal scroll on mobile) */}
      {images.length > 0 && (
        <div className="flex md:flex-col gap-2.5 shrink-0 overflow-x-auto md:overflow-y-auto scrollbar-none w-full md:w-20 lg:w-24 order-2 md:order-1 justify-start">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-[var(--radius-card,8px)] overflow-hidden border-2 transition-all bg-[var(--bg-surface)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] ${
                i === currentImgIdx
                  ? "border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)] shadow-sm"
                  : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] opacity-70 hover:opacity-100"
              }`}
              onClick={() => setImg(i)}
              aria-label={`View image ${i + 1} of ${productName}`}
            >
              <OptimizedImage
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 2. Main Large Viewport */}
      <div className="relative aspect-4/3 flex-1 w-full order-1 md:order-2 bg-[var(--bg-surface-secondary)] rounded-[var(--radius-card,8px)] overflow-hidden flex items-center justify-center border border-[var(--border-subtle)] shadow-xs">
        <div className="w-full h-full">
          {images[currentImgIdx] ? (
            <ImageZoom
              src={images[currentImgIdx]}
              alt={productName}
              onOpenModal={() => setShowImageModal?.(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)]">
              <Icon icon="carbon:image" className="w-12 h-12" />
              <span className="text-xs mt-2 font-semibold">Inspection Image Not Available</span>
            </div>
          )}
        </div>

        {/* Fullscreen Modal Trigger */}
        {images[currentImgIdx] && (
          <button
            type="button"
            className="absolute top-3.5 right-3.5 bg-[var(--bg-surface)]/80 hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] w-10 h-10 rounded-[var(--radius-card,8px)] flex items-center justify-center transition-all shadow-xs border border-[var(--border-default)] cursor-pointer z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] active:scale-95"
            onClick={() => setShowImageModal(true)}
            aria-label="View image full screen"
            title="Expand Full View"
          >
            <Icon icon="carbon:maximize" className="w-4 h-4" />
          </button>
        )}

        {/* Viewport Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)]/90 hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-default)] flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-90 z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="Previous product image"
            >
              <Icon icon="carbon:chevron-left" className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)]/90 hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-default)] flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-90 z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="Next product image"
            >
              <Icon icon="carbon:chevron-right" className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
