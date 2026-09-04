import React, { forwardRef } from "react";

/**
 * Unified Radio Component with variant states and card layout.
 *
 * @param {Object} props
 * @param {'default' | 'card' | 'subtle'} [props.variant='default']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string | React.ReactNode} [props.label]
 * @param {string | React.ReactNode} [props.description]
 * @param {string} [props.className='']
 */
const Radio = forwardRef(function Radio(
  {
    checked = false,
    onChange,
    disabled = false,
    variant = "default",
    size = "md",
    label,
    description,
    className = "",
    id,
    name,
    value,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentDotSize = dotSizes[size] || dotSizes.md;
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
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={`${currentSize} rounded-full border transition-all flex items-center justify-center ${
            checked
              ? "bg-[var(--brand-primary)] border-[var(--brand-primary)]"
              : variant === "subtle"
              ? "bg-[var(--bg-surface-secondary)] border-[var(--border-subtle)]"
              : "bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--brand-primary)]"
          }`}
        >
          {checked && <div className={`${currentDotSize} rounded-full bg-slate-950`} />}
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

export default Radio;
