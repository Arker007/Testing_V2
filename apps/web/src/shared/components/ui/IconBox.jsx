import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable IconBox component for consistent icon containers across the application.
 *
 * @param {Object} props
 * @param {string | React.ReactNode} props.icon - Iconify string (e.g. 'solar:box-linear') or custom JSX icon element
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Icon container size
 * @param {'brand' | 'success' | 'sky' | 'neutral' | 'dark' | 'glass' | 'subtle' | 'outline'} [props.variant='brand'] - Style variant
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function IconBox({
  icon,
  size = "md",
  variant = "brand",
  className = "",
  ...props
}) {
  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg text-base",
    md: "w-10 h-10 rounded-xl text-lg",
    lg: "w-12 h-12 rounded-xl text-xl",
    xl: "w-16 h-16 rounded-2xl text-2xl",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const variantClasses = {
    brand:
      "bg-[var(--brand-primary,#6BBF54)] text-slate-950 font-black shadow-sm border border-[var(--brand-primary,#6BBF54)]",
    success:
      "bg-emerald-50 dark:bg-emerald-950/40 text-[#277D38] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40",
    sky:
      "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/40",
    neutral:
      "bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/15",
    dark: "bg-slate-900 text-white border border-slate-800",
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/20",
    subtle:
      "bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-slate-200 dark:border-slate-800",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedVariant = variantClasses[variant] || variantClasses.brand;
  const selectedIconSize = iconSizes[size] || iconSizes.md;

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform ${selectedSize} ${selectedVariant} ${className}`.trim()}
      {...props}
    >
      {typeof icon === "string" ? (
        <Icon icon={icon} className={selectedIconSize} />
      ) : (
        icon
      )}
    </div>
  );
}
