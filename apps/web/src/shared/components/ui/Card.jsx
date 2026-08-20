import React from "react";

/**
 * Reusable Card component supporting standardized dark/light borders and surface tokens.
 *
 * @param {Object} props
 * @param {'default' | 'elevated' | 'glass' | 'interactive'} [props.variant='default']
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style={}]
 * @param {React.ReactNode} props.children
 */
export default function Card({
  children,
  className = "",
  variant = "default",
  style = {},
  ...props
}) {
  const baseClasses = "transition-all duration-200";

  const variantClassMap = {
    default:
      "bg-[var(--surface-card)] border border-[var(--border-card)] text-[var(--text-primary)] rounded-[var(--radius-card,12px)] shadow-[var(--shadow-sm)]",
    feature:
      "bg-[var(--surface-card)] border border-[var(--border-card)] text-[var(--text-primary)] rounded-[var(--radius-xl,16px)] shadow-[var(--shadow-md)]",
    elevated:
      "bg-[var(--surface-card)] border border-[var(--border-card)] text-[var(--text-primary)] rounded-[var(--radius-xl,16px)] shadow-[var(--shadow-lg)]",
    interactive:
      "bg-[var(--surface-card)] border border-[var(--border-card)] text-[var(--text-primary)] rounded-[var(--radius-card,12px)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-200",
  };

  const selectedVariantClass = variantClassMap[variant] || variantClassMap.default;

  return (
    <div
      className={`${baseClasses} ${selectedVariantClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
