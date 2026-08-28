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
  shape = "pill",
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
    xs: "px-2 py-0.5 text-[10px] gap-1 leading-tight",
    sm: "px-2.5 py-1 text-[11px] gap-1.5 leading-none",
    md: "px-3.5 py-1.5 text-xs gap-2 leading-none",
    lg: "px-4.5 py-2 text-sm gap-2.5 leading-none",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-4.5 h-4.5",
  };

  const shapeClasses = {
    pill: "rounded-pill",
    rounded: "rounded-[var(--radius-badge,6px)]",
    square: "rounded-none",
  };

  const variantClasses = {
    eyebrow:
      "bg-[var(--brand-soft)] dark:bg-[rgba(107,191,84,0.15)] border border-[rgba(107,191,84,0.4)] dark:border-[rgba(107,191,84,0.35)] text-[#1E622A] dark:text-[#6BBF54] shadow-xs font-bold",
    brand:
      "bg-[var(--brand-soft)] dark:bg-[rgba(107,191,84,0.15)] border border-[rgba(107,191,84,0.4)] dark:border-[rgba(107,191,84,0.35)] text-[#1E622A] dark:text-[#6BBF54] shadow-xs font-bold",
    hero:
      "bg-[rgba(107,191,84,0.15)] border border-[rgba(107,191,84,0.35)] text-[#6BBF54] backdrop-blur-xs shadow-xs font-bold",
    "hero-badge":
      "bg-[rgba(107,191,84,0.15)] border border-[rgba(107,191,84,0.35)] text-[#6BBF54] backdrop-blur-xs shadow-xs font-bold",
    dark:
      "bg-[rgba(107,191,84,0.15)] border border-[rgba(107,191,84,0.35)] text-[#6BBF54] backdrop-blur-xs shadow-xs font-bold",
    status:
      "bg-[var(--brand-soft)] dark:bg-[rgba(107,191,84,0.15)] border border-[rgba(107,191,84,0.4)] dark:border-[rgba(107,191,84,0.35)] text-[#1E622A] dark:text-[#6BBF54] shadow-xs font-bold",
    success:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs font-bold",
    warning:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/50 shadow-xs font-bold",
    danger:
      "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50 shadow-xs font-bold",
    error:
      "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50 shadow-xs font-bold",
    info:
      "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200/80 dark:border-sky-800/50 shadow-xs font-bold",
    sky:
      "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200/80 dark:border-sky-800/50 shadow-xs font-bold",
    neutral:
      "bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700/60 shadow-xs font-bold",
    subtle:
      "bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-bold",
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

