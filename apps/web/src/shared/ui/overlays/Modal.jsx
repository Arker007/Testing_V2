import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { modalScaleVariants, transitionFast, transitionBase } from "../../../shared/constants/motion.constants";

/**
 * Reusable Modal / Dialog component for overlays and popups.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controlled visibility state
 * @param {() => void} props.onClose - Close handler callback
 * @param {string | React.ReactNode} [props.title] - Modal title heading
 * @param {string | React.ReactNode} [props.description] - Subheading or description
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} [props.size='md'] - Container max-width size
 * @param {React.ReactNode} [props.children] - Modal content body
 * @param {React.ReactNode} [props.footer] - Optional modal footer action row
 * @param {string} [props.className=''] - Additional custom CSS classes for modal body
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
  className = "",
  preventClose = false,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !preventClose) {
        onClose?.();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, preventClose]);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-[95vw] h-[90vh]",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal,1300)] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: transitionBase }}
            exit={{ opacity: 0, transition: transitionFast }}
            className="fixed inset-0 bg-[var(--scrim-overlay,rgba(15,23,42,0.65))] backdrop-blur-xs"
            onClick={preventClose ? undefined : onClose}
          />

          {/* Dialog Container */}
          <Motion.div
            variants={modalScaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-modal,16px)] shadow-[var(--shadow-modal)] overflow-hidden flex flex-col z-10 m-auto max-h-[min(92vh,90dvh,820px)] ${selectedSize} ${className}`.trim()}
          >
            {/* Modal Header */}
            {(title || description) && (
              <div className="flex items-start justify-between p-4 sm:p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 shrink-0">
                <div>
                  {title && (
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {!preventClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-surface-secondary)] transition-colors ml-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:outline-none shrink-0"
                    aria-label="Close dialog"
                  >
                    <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {!title && !description && !preventClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 z-10 min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:outline-none"
                aria-label="Close dialog"
              >
                <Icon icon="carbon:close" className="w-5 h-5" />
              </button>
            )}

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 custom-modal-scrollbar">{children}</div>

            {/* Modal Footer */}
            {footer && (
              <div className="p-3 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/30 flex items-center justify-end gap-3 shrink-0">
                {footer}
              </div>
            )}
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
}
