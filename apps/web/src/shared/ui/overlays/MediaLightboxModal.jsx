/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import OptimizedImage from "../media/OptimizedImage";

/**
 * MediaLightboxModal Component
 * Standardized full-screen preview modal with backdrop blur, zoom trigger, keyboard navigation, and escape-key handling.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {() => void} props.onClose - Close handler
 * @param {string[]|string} [props.images=[]] - List of image URLs or single image URL
 * @param {string} [props.src] - Single image URL fallback
 * @param {number} [props.currentIndex=0] - Initial active image index
 * @param {(index: number) => void} [props.onIndexChange] - Callback when active image changes
 * @param {string} [props.title] - Title / Product name
 * @param {string} [props.badge='Inspection View'] - Eyebrow badge text
 * @param {boolean} [props.allowCopy=false] - Whether to show quick copy URL button
 */
export default function MediaLightboxModal({
  isOpen,
  onClose,
  images = [],
  src,
  currentIndex = 0,
  onIndexChange,
  title,
  badge = "Inspection View",
  allowCopy = false,
}) {
  const imageList = Array.isArray(images) && images.length > 0
    ? images
    : src
    ? [src]
    : [];

  const [activeIdx, setActiveIdx] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveIdx(currentIndex);
    setIsZoomed(false);
  }, [currentIndex, isOpen]);

  const handlePrev = useCallback(() => {
    if (imageList.length <= 1) return;
    const nextIdx = (activeIdx - 1 + imageList.length) % imageList.length;
    setActiveIdx(nextIdx);
    setIsZoomed(false);
    onIndexChange?.(nextIdx);
  }, [activeIdx, imageList.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (imageList.length <= 1) return;
    const nextIdx = (activeIdx + 1) % imageList.length;
    setActiveIdx(nextIdx);
    setIsZoomed(false);
    onIndexChange?.(nextIdx);
  }, [activeIdx, imageList.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  const currentUrl = imageList[activeIdx];

  const handleCopy = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[99999] flex flex-col bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 select-none"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Header Bar */}
          <div
            className="flex items-center justify-between pb-3 text-white border-b border-white/10 shrink-0 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0 pr-4">
              {badge && (
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-[var(--radius-card,8px)] bg-white/10 text-emerald-400 uppercase shrink-0">
                  {badge}
                </span>
              )}
              {title && (
                <span className="text-sm font-bold text-slate-200 truncate">
                  {title}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {imageList.length > 1 && (
                <span className="text-xs font-mono text-slate-400 mr-2">
                  {activeIdx + 1} / {imageList.length}
                </span>
              )}

              {allowCopy && currentUrl && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-[40px] px-3 rounded-[var(--radius-card,8px)] bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  title="Copy Image URL"
                >
                  <Icon icon={copied ? "carbon:checkmark" : "carbon:copy"} className="w-4 h-4" />
                  <span className="hidden sm:inline">{copied ? "Copied" : "Copy URL"}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="min-h-[40px] min-w-[40px] p-2.5 rounded-[var(--radius-card,8px)] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                title={isZoomed ? "Reset Zoom" : "Zoom Image"}
                aria-label={isZoomed ? "Reset Zoom" : "Zoom Image"}
              >
                <Icon icon={isZoomed ? "carbon:zoom-out" : "carbon:zoom-in"} className="w-4 h-4" />
              </button>

              {/* High Contrast Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] px-4 rounded-[var(--radius-card,8px)] bg-white hover:bg-red-600 text-slate-900 hover:text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none shadow-md active:scale-95"
                aria-label="Close fullscreen inspection"
                title="Close (Esc)"
              >
                <Icon icon="carbon:close" className="w-5 h-5" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Central Stage */}
          <div
            className={`relative flex-1 flex items-center justify-center py-4 overflow-hidden ${
              isZoomed ? "cursor-zoom-out overflow-auto" : "cursor-zoom-in"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed((prev) => !prev);
            }}
          >
            {currentUrl ? (
              <OptimizedImage
                src={currentUrl}
                alt={title || "Full resolution inspection preview"}
                className={`transition-transform duration-300 ${
                  isZoomed
                    ? "max-w-none scale-150 object-cover"
                    : "max-h-full max-w-full object-contain"
                }`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                <Icon icon="carbon:image-reference" className="w-16 h-16" />
                <span className="text-sm font-mono">No Image Available</span>
              </div>
            )}

            {/* Navigation Arrows */}
            {imageList.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[var(--radius-card,8px)] bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous image"
                >
                  <Icon icon="carbon:chevron-left" className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[var(--radius-card,8px)] bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                >
                  <Icon icon="carbon:chevron-right" className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip for Multi-Image views */}
          {imageList.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 pt-3 border-t border-white/10 overflow-x-auto shrink-0 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsZoomed(false);
                    onIndexChange?.(idx);
                  }}
                  className={`w-14 h-14 rounded-[var(--radius-card,8px)] overflow-hidden border-2 transition-all p-0.5 bg-black/40 cursor-pointer ${
                    activeIdx === idx
                      ? "border-emerald-400 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover rounded-[calc(var(--radius-card,8px)-2px)]"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
