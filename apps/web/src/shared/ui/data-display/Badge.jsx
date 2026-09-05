import React from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Badge / Eyebrow Component
 *
 * @param {Object} props
 * @param {'eyebrow' | 'brand' | 'hero' | 'hero-badge' | 'dark' | 'status' | 'success' | 'warning' | 'danger' | 'error' | 'info' | 'sky' | 'neutral' | 'subtle' | 'outline' | 'solid'} [props.variant='eyebrow']
 * @param {'xs' | 'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'pill' | 'rounded' | 'square'} [props.shape='pill']
 * @param {string | React.ReactNode} [props.icon]
 * @param {string | React.ReactNode} [props.iconRight]
 * @param {string} [props.iconClassName='']
 * @param {boolean} [props.dot=false]
 * @param {string} [props.dotColor='']
 * @param {boolean} [props.pulse=false]
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style={}]
 * @param {React.ReactNode} props.children
 */
export default function Badge({
  children,
  variant = "eyebrow",
  size = "md",
  shape = "rounded",
  icon,
  iconRight,
  iconClassName = "",
  dot = false,
  dotColor = "",
  pulse = false,
  className = "",
  style = {},
  ...props
}) {
  const sizeClasses = {
    xs: "px-2 py-0.5 text-[10px] gap-1 leading-normal font-bold",
    sm: "px-2.5 py-1 text-[11px] gap-1.5 leading-normal font-bold",
    md: "px-3 py-1.5 text-xs gap-1.5 leading-normal font-bold",
    lg: "px-3.5 py-1.5 text-xs sm:text-sm gap-2 leading-normal font-bold",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  const shapeClasses = {
    pill: "rounded-[var(--radius-pill,9999px)]",
    rounded: "rounded-[var(--radius-badge,4px)]",
    square: "rounded-none",
  };

  const variantClasses = {
    eyebrow:
      "bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs font-bold",
    brand:
      "bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs font-bold",
    hero:
      "bg-[var(--hero-badge-bg)] border border-[var(--hero-badge-border)] text-[var(--hero-badge-text)] backdrop-blur-xs shadow-xs font-bold",
    "hero-badge":
      "bg-[var(--hero-badge-bg)] border border-[var(--hero-badge-border)] text-[var(--hero-badge-text)] backdrop-blur-xs shadow-xs font-bold",
    dark:
      "bg-[var(--hero-badge-bg)] border border-[var(--hero-badge-border)] text-[var(--hero-badge-text)] backdrop-blur-xs shadow-xs font-bold",
    status:
      "bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs font-bold",
    success:
      "bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)] shadow-xs font-bold",
    warning:
      "bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)] shadow-xs font-bold",
    danger:
      "bg-[var(--danger-bg)] text-[var(--danger-text)] border border-[var(--danger-border)] shadow-xs font-bold",
    error:
      "bg-[var(--danger-bg)] text-[var(--danger-text)] border border-[var(--danger-border)] shadow-xs font-bold",
    info:
      "bg-[var(--info-bg)] text-[var(--info-text)] border border-[var(--info-border)] shadow-xs font-bold",
    sky:
      "bg-[var(--info-bg)] text-[var(--info-text)] border border-[var(--info-border)] shadow-xs font-bold",
    neutral:
      "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] shadow-xs font-bold",
    subtle:
      "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-bold",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] font-bold",
    solid:
      "bg-[var(--brand-primary)] text-slate-950 border border-[var(--brand-primary)] font-extrabold shadow-sm",
  };

  const baseClasses =
    "inline-flex items-center font-bold tracking-wider uppercase transition-colors select-none";

  const selectedSizeClass = sizeClasses[size] || sizeClasses.md;
  const selectedShapeClass = shapeClasses[shape] || shapeClasses.pill;
  const selectedVariantClass = variantClasses[variant] || variantClasses.eyebrow;
  const currentIconSize = iconSizes[size] || iconSizes.md;

  const renderIcon = (ic) => {
    if (!ic) return null;
    if (typeof ic === "string") {
      return (
        <Icon
          icon={ic}
          className={`${currentIconSize} shrink-0 ${iconClassName}`.trim()}
        />
      );
    }
    return <span className="shrink-0 flex items-center">{ic}</span>;
  };

  return (
    <span
      className={`${baseClasses} ${selectedVariantClass} ${selectedShapeClass} ${selectedSizeClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColor || "bg-[var(--brand)]"
          } ${pulse ? "animate-pulse" : ""}`}
        />
      )}
      {renderIcon(icon)}
      {children && <span>{children}</span>}
      {renderIcon(iconRight)}
    </span>
  );
}

