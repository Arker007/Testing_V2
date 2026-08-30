import React, { forwardRef } from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Input Component with customizable theme variants, sizes, and icon adornments.
 *
 * @param {Object} props
 * @param {'outline' | 'filled' | 'subtle' | 'ghost' | 'error'} [props.variant='outline']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'none' | 'sm' | 'md' | 'lg' | 'pill'} [props.radius='md']
 * @param {string | React.ReactNode} [props.leftIcon]
 * @param {string | React.ReactNode} [props.rightIcon]
 * @param {string} [props.prefix]
 * @param {string} [props.suffix]
 * @param {boolean} [props.isInvalid=false]
 * @param {boolean} [props.isLoading=false]
 * @param {boolean} [props.clearable=false]
 * @param {() => void} [props.onClear]
 * @param {string} [props.className='']
 * @param {string} [props.inputClassName='']
 */
const Input = forwardRef(function Input(
  {
    type = "text",
    variant = "outline",
    size = "md",
    radius = "md",
    leftIcon,
    rightIcon,
    prefix,
    suffix,
    isInvalid = false,
    isLoading = false,
    clearable = false,
    onClear,
    disabled = false,
    readOnly = false,
    value,
    onChange,
    className = "",
    inputClassName = "",
    id,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: "h-8 text-xs px-2.5",
    md: "h-10 text-sm px-3.5",
    lg: "h-12 text-base px-4",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-[var(--radius-sm,4px)]",
    md: "rounded-[var(--radius-input,6px)]",
    lg: "rounded-[var(--radius-lg,12px)]",
    pill: "rounded-full",
  };

  const variantClasses = {
    outline:
      "bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/20",
    filled:
      "bg-[var(--bg-surface-secondary)] border border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus-within:bg-[var(--bg-surface)] focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/20",
    subtle:
      "bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus-within:border-[var(--brand-primary)] focus-within:bg-[var(--bg-surface)]",
    ghost:
      "bg-transparent border border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus-within:bg-[var(--bg-surface-secondary)] focus-within:border-[var(--border-default)]",
    error:
      "bg-[var(--danger-bg)] border border-[var(--danger-border)] text-[var(--danger-text)] placeholder:text-[var(--danger-text)]/50 focus-within:border-[var(--color-danger)] focus-within:ring-2 focus-within:ring-[var(--color-danger)]/20",
  };

  const currentVariant = isInvalid ? "error" : variant;
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentRadius = radiusClasses[radius] || radiusClasses.md;
  const currentIconSize = iconSizes[size] || iconSizes.md;

  const renderIcon = (ic) => {
    if (!ic) return null;
    if (typeof ic === "string") {
      return <Icon icon={ic} className={`${currentIconSize} text-[var(--text-muted)] shrink-0`} />;
    }
    return <span className="shrink-0 flex items-center text-[var(--text-muted)]">{ic}</span>;
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: "", name: props.name || "" } });
    }
  };

  return (
    <div
      className={`relative inline-flex items-center w-full transition-all ${currentVariant ? variantClasses[currentVariant] : variantClasses.outline} ${currentRadius} ${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      } ${className}`.trim()}
    >
      {prefix && (
        <span className="pl-3 pr-1 text-[var(--text-muted)] select-none text-sm font-medium border-r border-[var(--border-subtle)] mr-2">
          {prefix}
        </span>
      )}

      {leftIcon && <div className="pl-3 pr-1 flex items-center">{renderIcon(leftIcon)}</div>}

      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={isInvalid ? "true" : undefined}
        className={`w-full bg-transparent border-0 outline-none shadow-none text-inherit placeholder:inherit focus:ring-0 focus:outline-none ${currentSize} ${
          leftIcon ? "pl-2" : ""
        } ${rightIcon || clearable || isLoading ? "pr-2" : ""} ${inputClassName}`.trim()}
        {...props}
      />

      {isLoading && (
        <div className="pr-3 flex items-center">
          <Icon icon="solar:spinner-linear" className={`${currentIconSize} animate-spin text-[var(--brand-primary)]`} />
        </div>
      )}

      {!isLoading && clearable && value && (
        <button
          type="button"
          onClick={handleClear}
          tabIndex={-1}
          className="pr-2.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Clear value"
        >
          <Icon icon="solar:close-circle-bold" className={currentIconSize} />
        </button>
      )}

      {!isLoading && rightIcon && <div className="pr-3 flex items-center">{renderIcon(rightIcon)}</div>}

      {suffix && (
        <span className="pr-3 pl-1 text-[var(--text-muted)] select-none text-sm font-medium border-l border-[var(--border-subtle)] ml-2">
          {suffix}
        </span>
      )}
    </div>
  );
});

export default Input;
