import React from "react";

/**
 * Unified StatusDot / LiveIndicator Component.
 *
 * @param {Object} props
 * @param {'pulse' | 'static' | 'ring'} [props.variant='pulse']
 * @param {'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand'} [props.status='brand']
 * @param {'xs' | 'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string | React.ReactNode} [props.label]
 * @param {string} [props.className='']
 */
export default function StatusDot({
  variant = "pulse",
  status = "brand",
  size = "md",
  label,
  className = "",
  ...props
}) {
  const sizeClasses = {
    xs: { dot: "w-1.5 h-1.5", ring: "w-2.5 h-2.5", text: "text-[10px]" },
    sm: { dot: "w-2 h-2", ring: "w-3.5 h-3.5", text: "text-xs" },
    md: { dot: "w-2.5 h-2.5", ring: "w-4 h-4", text: "text-xs md:text-sm" },
    lg: { dot: "w-3 h-3", ring: "w-5 h-5", text: "text-sm md:text-base" },
  };

  const statusColors = {
    brand: {
      bg: "bg-[var(--brand-primary)]",
      ping: "bg-[var(--brand-primary)]",
      text: "text-[var(--text-primary)]",
    },
    success: {
      bg: "bg-emerald-500",
      ping: "bg-emerald-400",
      text: "text-emerald-700 dark:text-emerald-400",
    },
    warning: {
      bg: "bg-amber-500",
      ping: "bg-amber-400",
      text: "text-amber-700 dark:text-amber-400",
    },
    danger: {
      bg: "bg-rose-500",
      ping: "bg-rose-400",
      text: "text-rose-700 dark:text-rose-400",
    },
    info: {
      bg: "bg-sky-500",
      ping: "bg-sky-400",
      text: "text-sky-700 dark:text-sky-400",
    },
    neutral: {
      bg: "bg-slate-400",
      ping: "bg-slate-300",
      text: "text-[var(--text-muted)]",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentColor = statusColors[status] || statusColors.brand;

  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`.trim()} {...props}>
      <span className="relative flex items-center justify-center shrink-0">
        {variant === "pulse" && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentColor.ping}`}
          />
        )}
        {variant === "ring" && (
          <span
            className={`absolute inline-flex rounded-full ring-2 ring-[var(--brand-primary)]/40 ${currentSize.ring}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${currentSize.dot} ${currentColor.bg}`} />
      </span>

      {label && <span className={`font-medium ${currentSize.text} text-inherit`}>{label}</span>}
    </span>
  );
}
