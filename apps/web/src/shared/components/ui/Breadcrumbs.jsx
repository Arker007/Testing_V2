import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

/**
 * Unified Breadcrumbs Component.
 *
 * @param {Object} props
 * @param {Array<{ label: string, href?: string, icon?: string, current?: boolean }>} props.items
 * @param {'slash' | 'chevron' | 'arrow' | 'pill'} [props.variant='chevron']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className='']
 */
export default function Breadcrumbs({
  items = [],
  variant = "chevron",
  size = "md",
  className = "",
  ...props
}) {
  if (!items || items.length === 0) return null;

  const sizeClasses = {
    sm: "text-xs gap-1.5",
    md: "text-xs md:text-sm gap-2",
    lg: "text-sm md:text-base gap-2.5",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const renderSeparator = () => {
    switch (variant) {
      case "slash":
        return <span className="text-[var(--text-disabled)] font-light select-none">/</span>;
      case "arrow":
        return <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 text-[var(--text-disabled)] shrink-0" />;
      case "pill":
        return <span className="w-1 h-1 rounded-full bg-[var(--text-disabled)] select-none shrink-0" />;
      case "chevron":
      default:
        return <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-[var(--text-disabled)] shrink-0" />;
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap ${currentSize} ${className}`.trim()} {...props}>
      <ol className="flex items-center flex-wrap gap-1.5 md:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current || isLast;

          return (
            <li key={index} className="flex items-center gap-1.5 md:gap-2">
              {item.href && !isCurrent ? (
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-1.5 font-medium text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                >
                  {item.icon && <Icon icon={item.icon} className="w-4 h-4 shrink-0" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-primary)]"
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.icon && <Icon icon={item.icon} className="w-4 h-4 shrink-0" />}
                  <span>{item.label}</span>
                </span>
              )}

              {!isLast && renderSeparator()}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
