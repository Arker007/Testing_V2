import React from "react";
import IconBox from "../data-display/IconBox";
import Button from "../buttons/Button";

/**
 * Reusable EmptyState component for empty lists, search results, or missing data.
 *
 * @param {Object} props
 * @param {string | React.ReactNode} [props.icon='solar:inbox-line-linear'] - Icon name or element
 * @param {string} props.title - Main header title
 * @param {string} [props.description] - Supporting descriptive text
 * @param {React.ReactNode} [props.action] - Optional action button or node
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Component padding and sizing
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function EmptyState({
  icon = "solar:inbox-line-linear",
  title = "No items found",
  description,
  action,
  size = "md",
  className = "",
  ...props
}) {
  const sizeClasses = {
    sm: "p-6 min-h-[200px]",
    md: "p-8 sm:p-12 min-h-[300px]",
    lg: "p-12 sm:p-16 min-h-[400px]",
  };

  const iconBoxSizes = {
    sm: "md",
    md: "lg",
    lg: "xl",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs ${sizeClasses[size] || sizeClasses.md} ${className}`.trim()}
      {...props}
    >
      <IconBox
        icon={icon}
        variant="brand"
        size={iconBoxSizes[size] || "lg"}
        className="mb-4"
      />
      <span className="block text-base sm:text-lg font-bold text-[var(--text-primary)]">
        {title}
      </span>
      {description && (
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
