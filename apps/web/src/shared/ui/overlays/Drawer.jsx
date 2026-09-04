import React, { useEffect } from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Drawer / Sheet Slide-over Panel Component.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {'right' | 'left' | 'bottom' | 'top'} [props.placement='right']
 * @param {'sm' | 'md' | 'lg' | 'full'} [props.size='md']
 * @param {string | React.ReactNode} [props.title]
 * @param {string | React.ReactNode} [props.description]
 * @param {React.ReactNode} [props.footer]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Drawer({
  isOpen = false,
  onClose,
  placement = "right",
  size = "md",
  title,
  description,
  footer,
  className = "",
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    right: {
      sm: "max-w-xs",
      md: "max-w-md",
      lg: "max-w-xl",
      full: "max-w-full",
    },
    left: {
      sm: "max-w-xs",
      md: "max-w-md",
      lg: "max-w-xl",
      full: "max-w-full",
    },
    bottom: {
      sm: "max-h-[30vh]",
      md: "max-h-[50vh]",
      lg: "max-h-[75vh]",
      full: "max-h-full",
    },
    top: {
      sm: "max-h-[30vh]",
      md: "max-h-[50vh]",
      lg: "max-h-[75vh]",
      full: "max-h-full",
    },
  };

  const placementClasses = {
    right: "top-0 right-0 h-full w-full border-l border-[var(--border-default)] animate-slideInRight",
    left: "top-0 left-0 h-full w-full border-r border-[var(--border-default)] animate-slideInLeft",
    bottom: "bottom-0 left-0 w-full rounded-t-[var(--radius-modal,16px)] border-t border-[var(--border-default)] animate-slideInUp",
    top: "top-0 left-0 w-full rounded-b-[var(--radius-modal,16px)] border-b border-[var(--border-default)] animate-slideInDown",
  };

  const currentPlacement = placementClasses[placement] || placementClasses.right;
  const currentSize = sizeClasses[placement]?.[size] || sizeClasses.right.md;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div
        className={`relative z-10 flex flex-col bg-[var(--bg-surface)] shadow-2xl ${currentPlacement} ${currentSize} ${className}`.trim()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] shrink-0">
          <div>
            {title && <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)]">{title}</h3>}
            {description && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-secondary)] transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)]/50 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
