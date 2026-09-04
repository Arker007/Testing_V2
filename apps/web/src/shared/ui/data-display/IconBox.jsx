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
    sm: "w-8 h-8 rounded-[var(--radius-icon,8px)] text-base",
    md: "w-10 h-10 rounded-[var(--radius-icon,8px)] text-lg",
    lg: "w-12 h-12 rounded-[var(--radius-icon,8px)] text-xl",
    xl: "w-16 h-16 rounded-[var(--radius-icon,8px)] text-2xl",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const variantClasses = {
    brand:
      "bg-[var(--brand-primary)] text-[var(--navy-950)] font-black shadow-sm border border-[var(--brand-primary)]",
    success:
      "bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]",
    sky:
      "bg-[var(--info-bg)] text-[var(--info-text)] border border-[var(--info-border)]",
    neutral:
      "bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)]",
    dark: "bg-[var(--navy-900)] text-[var(--text-on-dark)] border border-[var(--border-on-dark)]",
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/20",
    subtle:
      "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)]",
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
