import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { OptimizedImage } from "@/shared/ui";

const MotionDiv = motion.div;

export default function ProductImageFullscreenModal({
  images = [],
  currentImgIdx = 0,
  setImg,
  productName,
  isOpen,
  onClose,
  handlePrevImage,
  handleNextImage,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevImage, handleNextImage]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 select-none"
        onClick={onClose}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between pb-3 text-white border-b border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-[var(--radius-card,8px)] bg-white/10 text-slate-200 uppercase">
              Inspection View
            </span>
            <span className="text-sm font-bold text-slate-200 truncate max-w-md hidden sm:inline">
              {productName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">
              {currentImgIdx + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-[var(--radius-card,8px)] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <Icon icon="solar:close-square-linear" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center stage */}
        <div
          className="relative flex-1 flex items-center justify-center py-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {images[currentImgIdx] && (
            <OptimizedImage
              src={images[currentImgIdx]}
              alt={`${productName} full resolution view`}
              className="max-h-full max-w-full object-contain"
            />
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[var(--radius-card,8px)] bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <Icon icon="solar:alt-arrow-left-linear" className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[var(--radius-card,8px)] bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <Icon icon="solar:alt-arrow-right-linear" className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom thumbnail selector */}
        {images.length > 1 && (
          <div
            className="flex items-center justify-center gap-2 pt-3 border-t border-white/10 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setImg(idx)}
                className={`w-14 h-14 rounded-[var(--radius-card,8px)] overflow-hidden border-2 p-1 transition-all bg-white/5 cursor-pointer ${
                  idx === currentImgIdx
                    ? "border-[var(--brand-primary)] scale-105"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <OptimizedImage
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </MotionDiv>
    </AnimatePresence>
  );
}
