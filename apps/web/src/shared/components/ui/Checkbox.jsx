import React, { forwardRef } from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Checkbox Component with variant states and card layout.
 *
 * @param {Object} props
 * @param {'default' | 'card' | 'subtle'} [props.variant='default']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string | React.ReactNode} [props.label]
 * @param {string | React.ReactNode} [props.description]
 * @param {boolean} [props.indeterminate=false]
 * @param {boolean} [props.isInvalid=false]
 * @param {string} [props.className='']
 */
const Checkbox = forwardRef(function Checkbox(
  {
    checked = false,
    onChange,
    disabled = false,
    variant = "default",
    size = "md",
    label,
    description,
    indeterminate = false,
    isInvalid = false,
    className = "",
    id,
    name,
    value,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: "w-4 h-4 text-xs",
    md: "w-5 h-5 text-sm",
    lg: "w-6 h-6 text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4.5 h-4.5",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentIconSize = iconSizes[size] || iconSizes.md;

  const isCard = variant === "card";

  return (
    <label
      className={`inline-flex items-start gap-2.5 select-none transition-all cursor-pointer ${
        isCard
          ? `p-3.5 rounded-[var(--radius-card,12px)] border transition-all ${
              checked
                ? "bg-[var(--brand-soft)] border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]"
                : "bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--border-strong)]"
            }`
          : ""
      } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`.trim()}
    >
      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={`${currentSize} rounded-[var(--radius-control,4px)] border transition-all flex items-center justify-center ${
            checked || indeterminate
              ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-slate-950"
              : isInvalid
              ? "bg-[var(--danger-bg)] border-[var(--color-danger)]"
              : variant === "subtle"
              ? "bg-[var(--bg-surface-secondary)] border-[var(--border-subtle)]"
              : "bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--brand-primary)]"
          }`}
        >
          {indeterminate ? (
            <Icon icon="solar:minus-bold" className={`${currentIconSize} text-slate-950 font-bold`} />
          ) : checked ? (
            <Icon icon="solar:check-read-bold" className={`${currentIconSize} text-slate-950 font-bold`} />
          ) : null}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span
              className={`font-medium ${
                size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
              } text-[var(--text-primary)]`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{description}</span>
          )}
        </div>
      )}
    </label>
  );
});

export default Checkbox;
