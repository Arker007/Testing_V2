import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable Pagination component matching the clean bordered container design.
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
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Near start (first 4 pages)
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // Near end (last 4 pages)
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle pages
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`relative inline-flex items-center h-10 sm:h-11 bg-white dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-subtle)] rounded-lg sm:rounded-xl shadow-xs select-none ${className}`.trim()}
    >
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        style={{ borderRadius: 0 }}
        className="flex items-center gap-1.5 h-full pl-3.5 pr-2.5 sm:pl-4 sm:pr-3 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white disabled:text-slate-300 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-300 dark:disabled:hover:text-slate-600 transition-colors cursor-pointer shrink-0 focus-visible:outline-none !rounded-none"
        aria-label="Previous Page"
      >
        <Icon
          icon="solar:alt-arrow-left-linear"
          className="w-3.5 h-3.5 shrink-0"
        />
        <span>Previous</span>
      </button>

      {/* Page Numbers & Ellipsis */}
      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex items-center justify-center min-w-7 sm:min-w-8 h-full text-sm font-medium text-slate-400 dark:text-slate-500 select-none px-1"
          >
            ...
          </span>
        ) : p === currentPage ? (
          <button
            key={`page-${p}`}
            type="button"
            aria-current="page"
            aria-label={`Page ${p}`}
            style={{ borderRadius: 0 }}
            className="relative flex items-center justify-center w-10 sm:w-11 h-[calc(100%+2px)] -my-[1px] text-sm sm:text-base font-bold text-black dark:text-white bg-white dark:bg-[var(--bg-surface)] border border-black dark:border-white z-10 cursor-default !rounded-none focus-visible:outline-none"
          >
            {p}
          </button>
        ) : (
          <button
            key={`page-${p}`}
            type="button"
            onClick={() => handlePageChange(p)}
            aria-label={`Page ${p}`}
            style={{ borderRadius: 0 }}
            className="flex items-center justify-center min-w-8 sm:min-w-9 h-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer !rounded-none focus-visible:outline-none"
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        style={{ borderRadius: 0 }}
        className="flex items-center gap-1.5 h-full pl-2.5 pr-3.5 sm:pl-3 sm:pr-4 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white disabled:text-slate-300 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-300 dark:disabled:hover:text-slate-600 transition-colors cursor-pointer shrink-0 focus-visible:outline-none !rounded-none"
        aria-label="Next Page"
      >
        <span>Next</span>
        <Icon
          icon="solar:alt-arrow-right-linear"
          className="w-3.5 h-3.5 shrink-0"
        />
      </button>
    </nav>
  );
}
