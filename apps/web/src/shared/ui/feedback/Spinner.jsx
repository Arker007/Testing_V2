import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable Spinner component for loading states across buttons, cards, and pages.
 *
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Spinner size
 * @param {'brand' | 'neutral' | 'white' | 'emerald'} [props.variant='brand'] - Spinner color variant
 * @param {string} [props.label] - Optional loading message next to or below spinner
 * @param {boolean} [props.fullPage=false] - Whether to render centered in full page / screen
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function Spinner({
  size = "md",
  variant = "brand",
  label = "",
  fullPage = false,
  className = "",
  ...props
}) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const variantClasses = {
    brand: "text-[#1E622A] dark:text-[#6BBF54]",
    neutral: "text-slate-500 dark:text-slate-400",
    white: "text-white",
    emerald: "text-emerald-600 dark:text-emerald-400",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedVariant = variantClasses[variant] || variantClasses.brand;

  const spinnerIcon = (
    <Icon
      icon="solar:restart-linear"
      className={`animate-spin shrink-0 ${selectedSize} ${selectedVariant} ${className}`.trim()}
      {...props}
    />
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 gap-3 text-center">
        {spinnerIcon}
        {label && (
          <p className="text-sm font-medium text-[var(--text-secondary)] animate-pulse">
            {label}
          </p>
        )}
      </div>
    );
  }

  if (label) {
    return (
      <div className="inline-flex items-center gap-2">
        {spinnerIcon}
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </span>
      </div>
    );
  }

  return spinnerIcon;
}
