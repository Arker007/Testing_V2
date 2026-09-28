import React, { createContext, useContext } from "react";
import { Icon } from "@iconify/react";

const TableContext = createContext({
  variant: "simple",
  size: "md",
  hoverable: false,
});

/**
 * Unified Table Primitive with responsive wrapper and styling variants.
 * Inspired by Preline UI data table specifications with theme tokens.
 *
 * @param {Object} props
 * @param {'simple' | 'striped' | 'bordered' | 'card'} [props.variant='simple']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.hoverable=true]
 * @param {boolean} [props.responsive=true]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Table({
  variant = "simple",
  size = "md",
  hoverable = true,
  responsive = true,
  className = "",
  children,
  ...props
}) {
  const tableContent = (
    <TableContext.Provider value={{ variant, size, hoverable }}>
      <table
        className={`w-full text-left text-sm text-[var(--text-primary)] border-collapse ${
          variant === "bordered" ? "border border-[var(--border-default)]" : ""
        } ${className}`.trim()}
        {...props}
      >
        {children}
      </table>
    </TableContext.Provider>
  );

  if (responsive) {
    return (
      <div className="w-full overflow-x-auto rounded-[var(--radius-card,12px)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xs">
        {tableContent}
      </div>
    );
  }

  return tableContent;
}

export function Thead({ className = "", children, ...props }) {
  return (
    <thead
      className={`bg-[var(--bg-surface-secondary)] dark:bg-[var(--bg-surface-tertiary)] border-b border-[var(--border-subtle)] text-[var(--text-primary)] ${className}`.trim()}
      {...props}
    >
      {children}
    </thead>
  );
}

export function Tbody({ className = "", children, ...props }) {
  return (
    <tbody className={`divide-y divide-[var(--border-subtle)] ${className}`.trim()} {...props}>
      {children}
    </tbody>
  );
}

export function Tfoot({ className = "", children, ...props }) {
  return (
    <tfoot
      className={`bg-[var(--bg-surface-secondary)] border-t border-[var(--border-subtle)] font-semibold text-[var(--text-secondary)] ${className}`.trim()}
      {...props}
    >
      {children}
    </tfoot>
  );
}

export function Tr({ className = "", children, ...props }) {
  const { variant, hoverable } = useContext(TableContext);

  const isStriped = variant === "striped";

  return (
    <tr
      className={`transition-colors duration-150 ${
        isStriped ? "even:bg-[var(--bg-surface-secondary)]/50" : ""
      } ${
        hoverable ? "hover:bg-[var(--bg-surface-secondary)]/80 cursor-pointer" : ""
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </tr>
  );
}

export function Th({
  className = "",
  align = "left",
  sortable = false,
  sortDirection = null,
  onSort,
  children,
  ...props
}) {
  const { size } = useContext(TableContext);

  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-xs md:text-sm",
    lg: "px-6 py-4 text-sm md:text-base",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const content = sortable ? (
    <button
      type="button"
      onClick={onSort}
      className={`inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand-primary)] rounded px-1 -mx-1 ${
        align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""
      }`}
    >
      <span>{children}</span>
      <span className="shrink-0 text-[var(--text-muted)]">
        {sortDirection === "asc" ? (
          <Icon icon="solar:alt-arrow-up-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
        ) : sortDirection === "desc" ? (
          <Icon icon="solar:alt-arrow-down-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
        ) : (
          <Icon icon="solar:sort-vertical-linear" className="w-3.5 h-3.5 opacity-50 hover:opacity-100" />
        )}
      </span>
    </button>
  ) : (
    children
  );

  return (
    <th
      className={`font-semibold tracking-wider uppercase text-[var(--text-secondary)] ${
        sizeClasses[size] || sizeClasses.md
      } ${alignClasses[align] || alignClasses.left} ${className}`.trim()}
      {...props}
    >
      {content}
    </th>
  );
}

export function Td({ className = "", align = "left", isNumeric = false, children, ...props }) {
  const { size, variant } = useContext(TableContext);

  const isNumberChild =
    isNumeric ||
    typeof children === "number" ||
    (typeof children === "string" &&
      /^[₹$€£]?\s*[\d,]+(\.\d+)?\s*[%a-zA-Z]*$/i.test(children.trim()));

  const effectiveAlign = isNumberChild && align === "left" ? "right" : align;

  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3.5 text-xs md:text-sm",
    lg: "px-6 py-4 text-sm md:text-base",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <td
      className={`${sizeClasses[size] || sizeClasses.md} ${
        alignClasses[effectiveAlign] || alignClasses.left
      } ${isNumberChild ? "tabular-nums text-right font-medium" : ""} ${
        variant === "bordered" ? "border-r border-[var(--border-subtle)] last:border-r-0" : ""
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </td>
  );
}
