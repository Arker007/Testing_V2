import React, { forwardRef } from "react";

/**
 * Unified Textarea component with variant support, character count, and theme integration.
 *
 * @param {Object} props
 * @param {'outline' | 'filled' | 'subtle' | 'ghost' | 'error'} [props.variant='outline']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.radius='md']
 * @param {boolean} [props.isInvalid=false]
 * @param {boolean} [props.showCount=false]
 * @param {number} [props.maxLength]
 * @param {string} [props.className='']
 */
const Textarea = forwardRef(function Textarea(
  {
    variant = "outline",
    size = "md",
    radius = "md",
    rows = 4,
    isInvalid = false,
    showCount = false,
    maxLength,
    disabled = false,
    readOnly = false,
    value,
    onChange,
    className = "",
    id,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: "text-xs p-2.5",
    md: "text-sm p-3",
    lg: "text-base p-4",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-[var(--radius-sm,4px)]",
    md: "rounded-[var(--radius-input,6px)]",
    lg: "rounded-[var(--radius-lg,12px)]",
  };

  const variantClasses = {
    outline:
      "bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20",
    filled:
      "bg-[var(--bg-surface-secondary)] border border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:bg-[var(--bg-surface)] focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20",
    subtle:
      "bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:border-[var(--brand-primary)] focus:bg-[var(--bg-surface)]",
    ghost:
      "bg-transparent border border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:bg-[var(--bg-surface-secondary)] focus:border-[var(--border-default)]",
    error:
      "bg-[var(--danger-bg)] border border-[var(--danger-border)] text-[var(--danger-text)] placeholder:text-[var(--danger-text)]/50 focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/20",
  };

  const currentVariant = isInvalid ? "error" : variant;
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentRadius = radiusClasses[radius] || radiusClasses.md;

  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className="relative w-full">
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        aria-invalid={isInvalid ? "true" : undefined}
        className={`w-full outline-none transition-all resize-y ${currentSize} ${currentRadius} ${
          variantClasses[currentVariant] || variantClasses.outline
        } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`.trim()}
        {...props}
      />
      {showCount && maxLength && (
        <div className="flex justify-end mt-1 text-[11px] font-medium text-[var(--text-muted)]">
          <span>
            {currentLength} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
});

export default Textarea;
