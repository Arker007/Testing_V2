import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { transitionFast, transitionBase } from "../../../shared/constants/motion.constants";

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

  const placementStyles = {
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      classes: "top-0 right-0 h-full w-full border-l border-[var(--border-default)]",
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      classes: "top-0 left-0 h-full w-full border-r border-[var(--border-default)]",
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
      classes: "bottom-0 left-0 w-full rounded-t-[var(--radius-modal,16px)] border-t border-[var(--border-default)]",
    },
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
      classes: "top-0 left-0 w-full rounded-b-[var(--radius-modal,16px)] border-b border-[var(--border-default)]",
    },
  };

  const placementShadows = {
    right: "shadow-[var(--shadow-3-left)]",
    left: "shadow-[var(--shadow-3-right)]",
    bottom: "shadow-[var(--shadow-3-up)]",
    top: "shadow-[var(--shadow-3-down)]",
  };

  const currentPlacement = placementStyles[placement] || placementStyles.right;
  const currentSize = sizeClasses[placement]?.[size] || sizeClasses.right.md;
  const currentShadow = placementShadows[placement] || placementShadows.right;

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: transitionBase }}
            exit={{ opacity: 0, transition: transitionFast }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer Body */}
          <Motion.div
            initial={currentPlacement.initial}
            animate={{ ...currentPlacement.animate, transition: transitionBase }}
            exit={{ ...currentPlacement.exit, transition: transitionFast }}
            className={`relative z-10 flex flex-col bg-[var(--bg-surface)] ${currentShadow} ${currentPlacement.classes} ${currentSize} ${className}`.trim()}
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
                <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
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
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined" ? createPortal(drawerContent, document.body) : drawerContent;
}

