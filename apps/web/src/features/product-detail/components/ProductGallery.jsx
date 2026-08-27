import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../../shared/components/OptimizedImage";

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
    <div id="product-gallery-panel" className="bg-white dark:bg-[#161c24] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col gap-6">
      {/* Main Image Viewport */}
      <div className="relative aspect-4/3 w-full bg-slate-50 dark:bg-slate-900/40 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-800">
        <div className="w-full h-full">
          {images[currentImgIdx] ? (
            <ImageZoom src={images[currentImgIdx]} alt={productName} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600">
              <Icon icon="solar:gallery-linear" className="w-12 h-12" />
              <span className="text-xs mt-2 font-semibold">Image Not Available</span>
            </div>
          )}
        </div>

        {/* Longevity badge */}
        <div className="absolute top-4 left-4 bg-slate-900/85 dark:bg-slate-950/90 text-white px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs shadow-xs border border-white/5">
          <Icon icon="solar:shield-check-linear" className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>50+ Year Lifespan</span>
        </div>

        {/* Fullscreen Trigger */}
        {images[currentImgIdx] && (
          <button
            type="button"
            className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/90 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-white p-2.5 rounded-xl transition-all shadow-xs border border-slate-150 dark:border-slate-800"
            onClick={() => setShowImageModal(true)}
            aria-label="View image full screen"
            title="Expand View"
          >
            <Icon icon="solar:full-screen-square-linear" className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-10 h-10 shrink-0 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center transition-all shadow-2xs"
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
                className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 p-1 transition-all bg-white dark:bg-slate-900 ${
                  i === currentImgIdx
                    ? "border-[#277D38] shadow-2xs"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700"
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
            className="w-10 h-10 shrink-0 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center transition-all shadow-2xs"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Certification & Standards Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Icon icon="solar:verified-check-linear" className="w-4.5 h-4.5 text-[#277D38] dark:text-emerald-400 shrink-0" />
          <span>ISPM-15 Exempt</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Icon icon="solar:leaf-linear" className="w-4.5 h-4.5 text-[#277D38] dark:text-emerald-400 shrink-0" />
          <span>Zero Rot / Splinter</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Icon icon="solar:refresh-circle-linear" className="w-4.5 h-4.5 text-[#277D38] dark:text-emerald-400 shrink-0" />
          <span>100% Recycled PE</span>
        </div>
      </div>
    </div>
  );
}
