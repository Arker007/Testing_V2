import React from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Interactive Tag / Filter Chip Component.
 *
 * @param {Object} props
 * @param {'filter' | 'removable' | 'subtle' | 'outline' | 'solid'} [props.variant='filter']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.active=false]
 * @param {string | React.ReactNode} [props.icon]
 * @param {() => void} [props.onRemove]
 * @param {() => void} [props.onClick]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Tag({
  variant = "filter",
  size = "md",
  active = false,
  icon,
  onRemove,
  onClick,
  className = "",
  children,
  ...props
}) {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-xs md:text-sm gap-2",
    lg: "px-4.5 py-2 text-sm md:text-base gap-2.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4.5 h-4.5",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentIconSize = iconSizes[size] || iconSizes.md;

  const variantClasses = {
    filter: active
      ? "bg-[var(--brand-primary)] text-slate-950 border-[var(--brand-primary)] font-bold shadow-xs"
      : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-default)] hover:border-[var(--brand-primary)] hover:bg-[var(--bg-surface-secondary)]",
    removable:
      "bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]",
    subtle:
      "bg-[var(--brand-soft)] text-[#1E622A] dark:text-[#6BBF54] border-[var(--brand-border)] font-medium",
    outline:
      "bg-transparent text-[var(--text-primary)] border-[var(--border-default)] hover:border-[var(--brand-primary)]",
    solid:
      "bg-[var(--navy-900)] text-white border-transparent font-medium",
  };

  const isClickable = Boolean(onClick);

  return (
    <span
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`inline-flex items-center rounded-full border font-medium select-none transition-all duration-150 ${
        isClickable ? "cursor-pointer active:scale-95" : ""
      } ${currentSize} ${variantClasses[variant] || variantClasses.filter} ${className}`.trim()}
      {...props}
    >
      {icon && (
        <span className="shrink-0 flex items-center">
          {typeof icon === "string" ? (
            <Icon icon={icon} className={currentIconSize} />
          ) : (
            icon
          )}
        </span>
      )}

      <span>{children}</span>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-inherit transition-colors cursor-pointer"
          aria-label="Remove tag"
        >
          <Icon icon="solar:close-circle-bold" className={currentIconSize} />
        </button>
      )}
    </span>
  );
}
