import React from "react";

/**
 * Unified Keyboard Shortcut Badge Component.
 *
 * @param {Object} props
 * @param {'outline' | 'subtle' | 'solid'} [props.variant='outline']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Kbd({
  variant = "outline",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[10px] min-w-4",
    md: "px-2 py-0.5 text-xs min-w-5",
    lg: "px-2.5 py-1 text-sm min-w-6",
  };

  const variantClasses = {
    outline:
      "bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] border-b-2 text-[var(--text-primary)] shadow-xs",
    subtle:
      "bg-[var(--bg-surface-tertiary)] border border-[var(--border-subtle)] text-[var(--text-secondary)]",
    solid:
      "bg-[var(--neutral-900)] dark:bg-[var(--neutral-800)] text-white border-none shadow-xs",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentVariant = variantClasses[variant] || variantClasses.outline;

  return (
    <kbd
      className={`inline-flex items-center justify-center font-mono font-semibold rounded-[var(--radius-sm,4px)] select-none text-center leading-none ${currentSize} ${currentVariant} ${className}`.trim()}
      {...props}
    >
      {children}
    </kbd>
  );
}
