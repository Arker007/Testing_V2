import React, { useEffect } from "react";
import { Icon } from "@iconify/react";

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
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-[95vw] h-[90vh]",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Dialog Container */}
      <div
        className={`relative w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 my-auto animate-in zoom-in-95 duration-200 ${selectedSize} ${className}`.trim()}
      >
        {/* Modal Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50">
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
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ml-4 cursor-pointer"
              aria-label="Close dialog"
            >
              <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
            </button>
          </div>
        )}

        {!title && !description && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        )}

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/30 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
