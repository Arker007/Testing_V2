import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Badge from "../data-display/Badge";
import Button from "../buttons/Button";
import SearchInput from "../forms/SearchInput";

/**
 * AdminPageHeader Component
 * Standardized header for admin dashboards and data views containing
 * optional back navigation, title with badge count, integrated SearchInput,
 * filter slots, and primary action triggers.
 *
 * @param {Object} props
 * @param {string | React.ReactNode} props.title - Primary headline of the admin view
 * @param {number | string} [props.count] - Numeric count of items
 * @param {string} [props.countLabel] - Label for the count (e.g., 'products', 'categories')
 * @param {string | React.ReactNode} [props.description] - Subtitle or explanatory text
 * @param {string} [props.eyebrow] - Small badge or category marker above title
 * @param {string} [props.backTo] - Link URL for back button navigation
 * @param {Function} [props.onBack] - Click handler for back button
 * @param {string} [props.backLabel='Back'] - Label for the back button
 * @param {string} [props.search] - Current search query value
 * @param {Function} [props.onSearchChange] - Change handler for search input
 * @param {Function} [props.onSearchClear] - Clear handler for search input
 * @param {string} [props.searchPlaceholder='Search records...']
 * @param {React.ReactNode} [props.filter] - Custom filter select or dropdown elements
 * @param {React.ReactNode} [props.actions] - Primary CTA buttons (e.g., Add Product)
 * @param {React.ReactNode} [props.children] - Additional toolbar elements or secondary tabs
 * @param {string} [props.className='']
 */
export default function AdminPageHeader({
  title,
  count,
  countLabel = "items",
  description,
  eyebrow,
  backTo,
  onBack,
  backLabel = "Back",
  search,
  onSearchChange,
  onSearchClear,
  searchPlaceholder = "Search records...",
  filter,
  actions,
  children,
  className = "",
}) {
  const hasSearch = typeof search !== "undefined" && typeof onSearchChange === "function";
  const hasCount = count !== undefined && count !== null;

  return (
    <div className={`mb-6 flex flex-col gap-4 ${className}`.trim()}>
      {/* Top Title & Primary Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Optional Back Navigation */}
          {backTo && (
            <Link to={backTo}>
              <Button
                variant="outline"
                size="sm"
                className="!h-9 !px-3 font-semibold text-slate-700 dark:text-slate-200"
              >
                <Icon icon="carbon:arrow-left" className="w-4 h-4 mr-1.5 inline" />
                {backLabel}
              </Button>
            </Link>
          )}

          {onBack && !backTo && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="!h-9 !px-3 font-semibold text-slate-700 dark:text-slate-200"
            >
              <Icon icon="carbon:arrow-left" className="w-4 h-4 mr-1.5 inline" />
              {backLabel}
            </Button>
          )}

          <div className="min-w-0">
            {eyebrow && (
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary,#059669)] mb-0.5">
                {eyebrow}
              </div>
            )}
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                {title}
              </h1>
              {hasCount && (
                <Badge variant="neutral" size="sm" className="font-bold tracking-normal">
                  {count} {countLabel ? (count === 1 ? countLabel.replace(/s$/, "") : countLabel) : ""}
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Top-Right Primary Action CTAs */}
        {actions && (
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto flex-wrap">
            {actions}
          </div>
        )}
      </div>

      {/* Integrated Search & Filters Toolbar Row */}
      {(hasSearch || filter || children) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3 rounded-xl shadow-xs">
          <div className="flex items-center gap-3 flex-1 flex-wrap">
            {hasSearch && (
              <div className="min-w-[240px] flex-1 max-w-md">
                <SearchInput
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={onSearchChange}
                  onClear={onSearchClear}
                  size="md"
                />
              </div>
            )}
            {filter && <div className="flex items-center gap-2">{filter}</div>}
          </div>

          {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
        </div>
      )}
    </div>
  );
}
