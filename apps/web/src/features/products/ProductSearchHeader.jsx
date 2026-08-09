/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Grid, List, SlidersHorizontal, RotateCcw } from "lucide-react";
import CustomSelect from "../../shared/components/ui/CustomSelect";
import { sortByOptions } from "./products.constants";
import styles from "../../pages/Products.module.css";

const QUICK_SEARCH_SUGGESTIONS = [
  { label: "Pallets", cat: "Pallets" },
  { label: "Lumber / Sections", cat: "Recycled Plastic Lumber" },
  { label: "Benches", cat: "Outdoor Benches & Furniture" },
  { label: "3,000+ kg Load", load: 3000 },
];

export default function ProductSearchHeader({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
  hasActiveFilters,
  resetFilters,
  selectedCategory,
  setSelectedCategory,
  minStaticLoad,
  setMinStaticLoad,
  selectedApplication,
  setSelectedApplication,
  setIsMobileFilterOpen,
}) {
  const activeTags = [];
  if (selectedCategory && selectedCategory !== "All") {
    activeTags.push({
      key: "category",
      label: `Category: ${selectedCategory}`,
      clear: () => setSelectedCategory("All"),
    });
  }
  if (minStaticLoad > 0) {
    activeTags.push({
      key: "load",
      label: `Min Load: ${minStaticLoad.toLocaleString()} kg`,
      clear: () => setMinStaticLoad(0),
    });
  }
  if (selectedApplication && selectedApplication !== "All") {
    activeTags.push({
      key: "app",
      label: `App: ${selectedApplication}`,
      clear: () => setSelectedApplication("All"),
    });
  }
  if (searchQuery.trim()) {
    activeTags.push({
      key: "search",
      label: `Search: "${searchQuery}"`,
      clear: () => setSearchQuery(""),
    });
  }

  return (
    <div className={styles.topControlCard}>
      {/* Search Input Row */}
      <div className={styles.searchRow}>
        <div className={styles.searchBoxWrapper}>
          <Search className={styles.searchIcon} size={17} />
          <input
            type="text"
            placeholder="Search products by title, SKU, dimensions, or load rating..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInputField}
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                type="button"
                className={styles.searchClearBtn}
                onClick={() => setSearchQuery("")}
                title="Clear Search"
                aria-label="Clear Search"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={15} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.controlsRightGroup}>
          {/* Mobile Filter Toggle */}
          <motion.button
            type="button"
            className={styles.mobileFilterToggleBtn}
            onClick={() => setIsMobileFilterOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {hasActiveFilters && <span className={styles.filterDotBadge} />}
          </motion.button>

          {/* Sort Select */}
          <div className={styles.sortSelectWrapper}>
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              options={sortByOptions}
              placeholder="Sort By"
            />
          </div>

          {/* View Switcher */}
          <div className={styles.viewModeSwitcher}>
            <motion.button
              type="button"
              className={`${styles.viewToggleBtn} ${viewMode === "grid" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
              aria-label="Grid View"
              whileTap={{ scale: 0.9 }}
            >
              <Grid size={16} />
            </motion.button>
            <motion.button
              type="button"
              className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setViewMode("list")}
              title="List View"
              aria-label="List View"
              whileTap={{ scale: 0.9 }}
            >
              <List size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Search Shortcut Chips (Show when no active filter tags or as quick presets) */}
      {!hasActiveFilters && (
        <div className={styles.quickSearchPillsRow}>
          <span className={styles.quickSearchLabel}>Quick Filters:</span>
          {QUICK_SEARCH_SUGGESTIONS.map((sug, i) => (
            <motion.button
              key={i}
              type="button"
              className={styles.quickSearchPillBtn}
              onClick={() => {
                if (sug.cat) setSelectedCategory(sug.cat);
                if (sug.load) setMinStaticLoad(sug.load);
              }}
              whileTap={{ scale: 0.94 }}
            >
              {sug.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* Results Count & Active Filter Tags Bar */}
      <div className={styles.resultsBar}>
        <div className={styles.resultsText}>
          Showing <strong>{filteredCount}</strong> {filteredCount === 1 ? "Product" : "Products"}
          {totalCount > 0 && totalCount !== filteredCount && (
            <span className={styles.totalText}> (filtered from {totalCount} total)</span>
          )}
        </div>

        {activeTags.length > 0 && (
          <div className={styles.activeTagContainer}>
            <AnimatePresence>
              {activeTags.map((tag) => (
                <motion.span
                  key={tag.key}
                  className={styles.filterTagPill}
                  initial={{ opacity: 0, scale: 0.85, x: -4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <span>{tag.label}</span>
                  <motion.button
                    type="button"
                    onClick={tag.clear}
                    className={styles.tagRemoveBtn}
                    title="Remove filter"
                    aria-label="Remove filter"
                    whileTap={{ scale: 0.85 }}
                  >
                    <X size={11} />
                  </motion.button>
                </motion.span>
              ))}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={resetFilters}
              className={styles.resetAllLinkBtn}
              title="Reset all filters"
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={11} />
              <span>Clear All</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
