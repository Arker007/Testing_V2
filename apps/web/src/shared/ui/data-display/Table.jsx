import React, { createContext, useContext } from "react";

const TableContext = createContext({
  variant: "simple",
  size: "md",
  hoverable: false,
});

/**
 * Unified Table Primitive with responsive wrapper and styling variants.
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
      <div className="w-full overflow-x-auto rounded-[var(--radius-card,12px)] border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        {tableContent}
      </div>
    );
  }

  return tableContent;
}

export function Thead({ className = "", children, ...props }) {
  return (
    <thead
      className={`bg-[var(--bg-surface-secondary)] dark:bg-[var(--bg-surface-tertiary)] border-b border-[var(--border-default)] text-[var(--text-primary)] ${className}`.trim()}
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
      className={`bg-[var(--bg-surface-secondary)] border-t border-[var(--border-default)] font-semibold ${className}`.trim()}
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
      className={`transition-colors ${
        isStriped ? "even:bg-[var(--bg-surface-secondary)]/50" : ""
      } ${
        hoverable ? "hover:bg-[var(--bg-surface-secondary)]/70 cursor-pointer" : ""
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </tr>
  );
}

export function Th({ className = "", align = "left", children, ...props }) {
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

  return (
    <th
      className={`font-semibold tracking-wider uppercase text-[var(--text-secondary)] ${
        sizeClasses[size] || sizeClasses.md
      } ${alignClasses[align] || alignClasses.left} ${className}`.trim()}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({ className = "", align = "left", children, ...props }) {
  const { size, variant } = useContext(TableContext);

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
        alignClasses[align] || alignClasses.left
      } ${variant === "bordered" ? "border-r border-[var(--border-subtle)] last:border-r-0" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </td>
  );
}
