import React from "react";

/**
 * Unified Badge / Eyebrow Component
 *
 * @param {Object} props
 * @param {'eyebrow' | 'brand' | 'status' | 'outline' | 'subtle'} [props.variant='eyebrow']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {React.ReactNode} [props.icon]
 * @param {boolean} [props.dot=true]
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style={}]
 * @param {React.ReactNode} props.children
 */
export default function Badge({
  children,
  variant = "eyebrow",
  size = "md",
  icon,
  dot = false,
  className = "",
  style = {},
  ...props
}) {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[10px] gap-1.5",
    md: "px-3.5 py-1 text-xs gap-2",
    lg: "px-4 py-1.5 text-sm gap-2.5",
  };

  const baseClasses =
    "inline-flex items-center font-bold tracking-wider uppercase rounded-[var(--radius-badge)] transition-colors select-none";

  const variantClasses = {
    eyebrow:
      "section-eyebrow",
    brand:
      "bg-[var(--brand-soft)] text-[var(--text-brand)] border border-[var(--border-brand)] font-bold",
    status:
      "bg-[var(--brand-soft)] text-[var(--text-brand)] border border-[var(--border-brand)] font-bold",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] font-bold",
    subtle:
      "bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-bold",
  };

  const selectedSizeClass = variant === "eyebrow" ? "" : (sizeClasses[size] || sizeClasses.md);
  const selectedVariantClass = variantClasses[variant] || variantClasses.brand;

  return (
    <span
      className={`${baseClasses} ${selectedVariantClass} ${selectedSizeClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] shrink-0 animate-pulse" />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
