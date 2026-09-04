import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable Pagination component for dataset navigation.
 *
 * @param {Object} props
 * @param {number} props.currentPage - Active 1-indexed page number
 * @param {number} props.totalPages - Total available pages
 * @param {(page: number) => void} props.onPageChange - Callback when a page is selected
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-1.5 mt-8 ${className}`.trim()}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-[var(--radius-btn,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-surface-elevated)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 active:scale-95"
        aria-label="Previous Page"
      >
        <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
      </button>

      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 py-1 text-xs text-[var(--text-muted)] select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-[36px] h-9 px-3 rounded-[var(--radius-btn,8px)] text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 active:scale-95 ${
              currentPage === p
                ? "bg-[var(--brand-primary)] text-[var(--brand-btn-text)] shadow-xs"
                : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-[var(--radius-btn,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-surface-elevated)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 active:scale-95"
        aria-label="Next Page"
      >
        <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
      </button>
    </nav>
  );
}
