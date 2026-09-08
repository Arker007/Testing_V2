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
      className={`flex items-center justify-center gap-2 ${className}`.trim()}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 active:scale-95"
        aria-label="Previous Page"
      >
        <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4 stroke-[2.2]" />
      </button>

      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-8 flex items-center justify-center text-sm font-semibold text-slate-400 dark:text-slate-500 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`min-w-[40px] h-10 px-3.5 flex items-center justify-center rounded-lg text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 active:scale-95 ${
              currentPage === p
                ? "bg-[var(--brand-primary,#16a34a)] text-white border border-[var(--brand-primary,#16a34a)] shadow-xs font-extrabold"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs"
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
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 active:scale-95"
        aria-label="Next Page"
      >
        <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 stroke-[2.2]" />
      </button>
    </nav>
  );
}
