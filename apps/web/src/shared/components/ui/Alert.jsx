import React from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Alert / Callout Component with intent colors, left-accent borders, and dismiss capability.
 *
 * @param {Object} props
 * @param {'subtle' | 'left-accent' | 'solid' | 'outline'} [props.variant='subtle']
 * @param {'info' | 'success' | 'warning' | 'danger' | 'brand' | 'neutral'} [props.status='info']
 * @param {string | React.ReactNode} [props.title]
 * @param {string | React.ReactNode} [props.icon]
 * @param {boolean} [props.dismissible=false]
 * @param {() => void} [props.onDismiss]
 * @param {React.ReactNode} [props.action]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Alert({
  variant = "subtle",
  status = "info",
  title,
  icon,
  dismissible = false,
  onDismiss,
  action,
  className = "",
  children,
}) {
  const statusIcons = {
    info: "solar:info-circle-bold",
    success: "solar:check-circle-bold",
    warning: "solar:danger-triangle-bold",
    danger: "solar:close-circle-bold",
    brand: "solar:leaf-bold",
    neutral: "solar:bell-bold",
  };

  const statusSubtle = {
    info: "bg-[var(--info-bg)] border-[var(--info-border)] text-[var(--info-text)]",
    success: "bg-[var(--success-bg)] border-[var(--success-border)] text-[var(--success-text)]",
    warning: "bg-[var(--warning-bg)] border-[var(--warning-border)] text-[var(--warning-text)]",
    danger: "bg-[var(--danger-bg)] border-[var(--danger-border)] text-[var(--danger-text)]",
    brand: "bg-[var(--brand-soft)] border-[var(--brand-border)] text-[#1E622A] dark:text-[#6BBF54]",
    neutral: "bg-[var(--bg-surface-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]",
  };

  const statusSolid = {
    info: "bg-[var(--info-500)] text-white border-transparent",
    success: "bg-emerald-600 text-white border-transparent",
    warning: "bg-amber-600 text-white border-transparent",
    danger: "bg-[var(--danger-500)] text-white border-transparent",
    brand: "bg-[var(--brand-primary)] text-slate-950 border-transparent",
    neutral: "bg-[var(--navy-900)] text-white border-transparent",
  };

  const statusLeftAccent = {
    info: "border-l-4 border-l-[var(--info-500)] bg-[var(--info-bg)] border-[var(--info-border)] text-[var(--info-text)]",
    success: "border-l-4 border-l-emerald-600 bg-[var(--success-bg)] border-[var(--success-border)] text-[var(--success-text)]",
    warning: "border-l-4 border-l-amber-500 bg-[var(--warning-bg)] border-[var(--warning-border)] text-[var(--warning-text)]",
    danger: "border-l-4 border-l-[var(--danger-500)] bg-[var(--danger-bg)] border-[var(--danger-border)] text-[var(--danger-text)]",
    brand: "border-l-4 border-l-[var(--brand-primary)] bg-[var(--brand-soft)] border-[var(--brand-border)] text-[#1E622A] dark:text-[#6BBF54]",
    neutral: "border-l-4 border-l-[var(--navy-900)] bg-[var(--bg-surface-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]",
  };

  const statusOutline = {
    info: "bg-transparent border border-[var(--info-border)] text-[var(--info-text)]",
    success: "bg-transparent border border-[var(--success-border)] text-[var(--success-text)]",
    warning: "bg-transparent border border-[var(--warning-border)] text-[var(--warning-text)]",
    danger: "bg-transparent border border-[var(--danger-border)] text-[var(--danger-text)]",
    brand: "bg-transparent border border-[var(--brand-border)] text-[var(--brand-primary)]",
    neutral: "bg-transparent border border-[var(--border-default)] text-[var(--text-primary)]",
  };

  const variantStyle =
    variant === "solid"
      ? statusSolid[status] || statusSolid.info
      : variant === "left-accent"
      ? statusLeftAccent[status] || statusLeftAccent.info
      : variant === "outline"
      ? statusOutline[status] || statusOutline.info
      : statusSubtle[status] || statusSubtle.info;

  const currentIcon = icon || statusIcons[status] || statusIcons.info;

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3.5 p-4 rounded-[var(--radius-card,12px)] border transition-all ${variantStyle} ${className}`.trim()}
    >
      {currentIcon && (
        <div className="shrink-0 mt-0.5">
          {typeof currentIcon === "string" ? (
            <Icon icon={currentIcon} className="w-5 h-5" />
          ) : (
            currentIcon
          )}
        </div>
      )}

      <div className="flex-1 min-w-0">
        {title && <h5 className="font-semibold text-sm leading-tight mb-1 text-inherit">{title}</h5>}
        {children && <div className="text-xs md:text-sm leading-relaxed opacity-90">{children}</div>}
        {action && <div className="mt-2.5 flex items-center gap-2">{action}</div>}
      </div>

      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 -mr-1 -mt-1 p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Dismiss alert"
        >
          <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
