import React, { forwardRef } from "react";

/**
 * StatusToggle Component
 * Accessible, keyboard-friendly switch primitive with smooth toggle physics,
 * optional inline status labels, and sm/md sizing.
 *
 * @param {Object} props
 * @param {boolean} [props.checked=false]
 * @param {Function} props.onChange - (checked: boolean, event: React.SyntheticEvent) => void
 * @param {boolean} [props.disabled=false]
 * @param {'sm' | 'md'} [props.size='md']
 * @param {string | React.ReactNode} [props.label]
 * @param {'left' | 'right'} [props.labelPosition='right']
 * @param {boolean} [props.showStatusLabel=false]
 * @param {string} [props.onLabel='ON']
 * @param {string} [props.offLabel='OFF']
 * @param {'brand' | 'success' | 'neutral'} [props.variant='brand']
 * @param {string} [props.className='']
 * @param {string} [props.id]
 * @param {string} [props.name]
 */
const StatusToggle = forwardRef(function StatusToggle(
  {
    checked = false,
    onChange,
    disabled = false,
    size = "md",
    label,
    labelPosition = "right",
    showStatusLabel = false,
    onLabel = "ON",
    offLabel = "OFF",
    variant = "brand",
    className = "",
    id,
    name,
    "aria-label": ariaLabel,
    ...props
  },
  ref
) {
  const isChecked = Boolean(checked);

  const sizeConfig = {
    sm: {
      track: "w-8 h-4.5 p-0.5",
      thumb: "w-3.5 h-3.5",
      translate: "translate-x-3.5",
      text: "text-xs",
      statusText: "text-[11px]",
    },
    md: {
      track: "w-11 h-6 p-0.5",
      thumb: "w-5 h-5",
      translate: "translate-x-5",
      text: "text-sm",
      statusText: "text-xs",
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  const getTrackBackground = () => {
    if (!isChecked) {
      return "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600";
    }
    if (variant === "success") return "bg-emerald-600 hover:bg-emerald-700";
    if (variant === "neutral") return "bg-slate-800 dark:bg-slate-200";
    return "bg-[var(--brand-primary,#059669)] hover:bg-[var(--brand-dark,#047857)]";
  };

  const handleToggle = (e) => {
    if (disabled) return;
    if (onChange) {
      // Support both functional boolean callbacks and synthetic event listeners
      onChange(!isChecked, e);
      if (typeof onChange === "function" && e?.target) {
        // If the consumer expected an event object with target.checked
        e.target = { ...e.target, checked: !isChecked, name, id, value: !isChecked };
      }
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle(e);
    }
  };

  const renderStatusLabel = () => {
    if (!showStatusLabel) return null;
    return (
      <span
        className={`${currentSize.statusText} font-bold transition-colors select-none ${
          isChecked
            ? "text-[var(--brand-primary,#059669)] dark:text-emerald-400"
            : "text-slate-400 dark:text-slate-500"
        }`}
      >
        {isChecked ? onLabel : offLabel}
      </span>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-2 select-none ${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"
      } ${className}`.trim()}
      onClick={handleToggle}
    >
      {label && labelPosition === "left" && (
        <span className={`${currentSize.text} font-medium text-[var(--text-primary,#0f172a)]`}>
          {label}
        </span>
      )}

      {showStatusLabel && labelPosition === "left" && renderStatusLabel()}

      <div
        ref={ref}
        role="switch"
        aria-checked={isChecked}
        aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        id={id}
        className={`relative inline-flex items-center shrink-0 rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#059669)]/40 focus-visible:ring-offset-2 ${
          currentSize.track
        } ${getTrackBackground()}`}
        {...props}
      >
        <span
          className={`pointer-events-none inline-block transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            currentSize.thumb
          } ${isChecked ? currentSize.translate : "translate-x-0"}`}
        />
      </div>

      {showStatusLabel && labelPosition === "right" && renderStatusLabel()}

      {label && labelPosition === "right" && (
        <span className={`${currentSize.text} font-medium text-[var(--text-primary,#0f172a)]`}>
          {label}
        </span>
      )}
    </div>
  );
});

export default StatusToggle;
