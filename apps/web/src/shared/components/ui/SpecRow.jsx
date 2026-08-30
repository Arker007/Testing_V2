import React from "react";
import { Icon } from "@iconify/react";

/**
 * Unified SpecRow / Key-Value Spec Pair Component for technical specifications.
 *
 * @param {Object} props
 * @param {string | React.ReactNode} props.label
 * @param {string | React.ReactNode} props.value
 * @param {string} [props.unit]
 * @param {string | React.ReactNode} [props.icon]
 * @param {'striped' | 'card' | 'compact' | 'divider' | 'badge-value'} [props.variant='striped']
 * @param {boolean} [props.copyable=false]
 * @param {string} [props.className='']
 */
export default function SpecRow({
  label,
  value,
  unit,
  icon,
  variant = "striped",
  copyable = false,
  className = "",
  ...props
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const textToCopy = `${value}${unit ? ` ${unit}` : ""}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variantStyles = {
    striped:
      "p-3 rounded-lg odd:bg-[var(--bg-surface-secondary)]/60 even:bg-transparent border border-transparent hover:border-[var(--border-subtle)]",
    card:
      "p-3.5 rounded-[var(--radius-card,12px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs",
    compact:
      "py-1.5 px-0 border-b border-[var(--border-subtle)] last:border-b-0",
    divider:
      "py-2.5 px-0 border-b border-[var(--border-subtle)] last:border-b-0",
    "badge-value":
      "p-3 rounded-lg bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]",
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 text-xs md:text-sm transition-all ${
        variantStyles[variant] || variantStyles.striped
      } ${className}`.trim()}
      {...props}
    >
      <div className="flex items-center gap-2 min-w-0">
        {icon && (
          <span className="shrink-0 text-[var(--text-muted)]">
            {typeof icon === "string" ? <Icon icon={icon} className="w-4 h-4" /> : icon}
          </span>
        )}
        <span className="font-medium text-[var(--text-secondary)] truncate">{label}</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {variant === "badge-value" ? (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--brand-soft)] text-[#1E622A] dark:text-[#6BBF54] border border-[var(--brand-border)]">
            {value} {unit}
          </span>
        ) : (
          <span className="font-semibold text-[var(--text-primary)]">
            {value}
            {unit && <span className="font-normal text-[var(--text-muted)] ml-1">{unit}</span>}
          </span>
        )}

        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title={copied ? "Copied!" : "Copy specification"}
            aria-label="Copy specification"
          >
            <Icon
              icon={copied ? "solar:check-read-bold" : "solar:copy-linear"}
              className={`w-3.5 h-3.5 ${copied ? "text-[var(--brand-primary)]" : ""}`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
