import React, { forwardRef } from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Switch / Toggle Component with theme variants and custom icon indicators.
 *
 * @param {Object} props
 * @param {'brand' | 'neutral' | 'success'} [props.variant='brand']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string | React.ReactNode} [props.label]
 * @param {string | React.ReactNode} [props.description]
 * @param {string} [props.iconOn]
 * @param {string} [props.iconOff]
 * @param {string} [props.className='']
 */
const Switch = forwardRef(function Switch(
  {
    checked = false,
    onChange,
    disabled = false,
    variant = "brand",
    size = "md",
    label,
    description,
    iconOn,
    iconOff,
    className = "",
    id,
    name,
    ...props
  },
  ref
) {
  const sizeConfig = {
    sm: { track: "w-8 h-4.5 p-0.5", thumb: "w-3.5 h-3.5", translate: "translate-x-3.5", text: "text-xs", icon: "w-2.5 h-2.5" },
    md: { track: "w-11 h-6 p-0.5", thumb: "w-5 h-5", translate: "translate-x-5", text: "text-sm", icon: "w-3.5 h-3.5" },
    lg: { track: "w-14 h-7.5 p-1", thumb: "w-5.5 h-5.5", translate: "translate-x-6.5", text: "text-base", icon: "w-4 h-4" },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  const variantTracks = {
    brand: checked ? "bg-[var(--brand-primary)]" : "bg-[var(--border-default)] dark:bg-[var(--bg-surface-tertiary)]",
    neutral: checked ? "bg-[var(--text-primary)]" : "bg-[var(--border-default)] dark:bg-[var(--bg-surface-tertiary)]",
    success: checked ? "bg-emerald-600" : "bg-[var(--border-default)] dark:bg-[var(--bg-surface-tertiary)]",
  };

  const handleClick = () => {
    if (disabled) return;
    if (onChange) {
      onChange({ target: { checked: !checked, name } });
    }
  };

  return (
    <label
      className={`inline-flex items-start gap-3 select-none transition-all cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      } ${className}`.trim()}
      onClick={handleClick}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={() => {}}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div
        className={`relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out shrink-0 ${
          currentSize.track
        } ${variantTracks[variant] || variantTracks.brand}`}
      >
        <div
          className={`transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center ${
            currentSize.thumb
          } ${checked ? currentSize.translate : "translate-x-0"}`}
        >
          {checked && iconOn ? (
            <Icon icon={iconOn} className={`${currentSize.icon} text-[var(--brand-primary)]`} />
          ) : !checked && iconOff ? (
            <Icon icon={iconOff} className={`${currentSize.icon} text-[var(--text-muted)]`} />
          ) : null}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && <span className={`font-medium ${currentSize.text} text-[var(--text-primary)]`}>{label}</span>}
          {description && (
            <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{description}</span>
          )}
        </div>
      )}
    </label>
  );
});

export default Switch;
