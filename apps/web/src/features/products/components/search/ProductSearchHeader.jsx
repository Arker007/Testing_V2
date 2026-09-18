/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { CustomSelect } from "@/shared/ui";
import { sortByOptions } from "../../constants";
import styles from "../../products.module.css";

const QUICK_SEARCH_SUGGESTIONS = [
  { label: "Plastic Pallets", cat: "Plastic Pallets", matchCat: ["Plastic Pallets", "Pallets"] },
  { label: "Lumber / Sections", cat: "Recycled Plastic Lumber", matchCat: ["Recycled Plastic Lumber"] },
  { label: "Garden Benches", cat: "Outdoor Benches & Furniture", matchCat: ["Outdoor Benches & Furniture", "Garden Benches", "Benches"] },
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
  currentPage = 1,
  itemsPerPage = 6,
  hasActiveFilters,
  resetFilters,
  selectedCategory,
  setSelectedCategory,
  minStaticLoad,
  setMinStaticLoad,
  selectedApplication,
  setSelectedApplication,
  selectedCategories = [],
  setSelectedCategories,
  selectedAttributes = [],
  setSelectedAttributes,
  selectedDimensions = [],
  setSelectedDimensions,
  activeDynamicFilter,
  setActiveDynamicFilter,
  activeStaticFilter,
  setActiveStaticFilter,
  activeRackFilter,
  setActiveRackFilter,
  isCustom,
  setIsCustom,
  setIsMobileFilterOpen,
}) {
  const activeTags = [];

  // 1. Search Query
  if (searchQuery && searchQuery.trim()) {
    activeTags.push({
      key: "search",
      label: `"${searchQuery}"`,
      clear: () => setSearchQuery(""),
    });
  }

  // 2. Top Category Bar Selection
  if (selectedCategory && selectedCategory !== "All") {
    activeTags.push({
      key: `top-cat-${selectedCategory}`,
      label: selectedCategory,
      clear: () => setSelectedCategory("All"),
    });
  }

  // 3. Sidebar Multi-Selected Categories
  if (Array.isArray(selectedCategories) && selectedCategories.length > 0) {
    selectedCategories.forEach((cat) => {
      // Don't duplicate if already shown by top category
      if (cat === selectedCategory) return;
      activeTags.push({
        key: `cat-${cat}`,
        label: cat,
        clear: () => {
          if (setSelectedCategories) {
            setSelectedCategories(selectedCategories.filter((c) => c !== cat));
          }
        },
      });
    });
  }

  // 4. Multi-Selected Attributes
  if (Array.isArray(selectedAttributes) && selectedAttributes.length > 0) {
    selectedAttributes.forEach((attr) => {
      activeTags.push({
        key: `attr-${attr}`,
        label: attr,
        clear: () => {
          if (setSelectedAttributes) {
            setSelectedAttributes(selectedAttributes.filter((a) => a !== attr));
          }
        },
      });
    });
  }

  // 5. Multi-Selected Dimensions
  if (Array.isArray(selectedDimensions) && selectedDimensions.length > 0) {
    selectedDimensions.forEach((dim) => {
      activeTags.push({
        key: `dim-${dim}`,
        label: dim,
        clear: () => {
          if (setSelectedDimensions) {
            setSelectedDimensions(selectedDimensions.filter((d) => d !== dim));
          }
        },
      });
    });
  }

  // 6. Dynamic Load Range Filter
  if (activeDynamicFilter && Array.isArray(activeDynamicFilter)) {
    activeTags.push({
      key: "dyn-load",
      label: `Dynamic: ${activeDynamicFilter[0].toLocaleString()} - ${activeDynamicFilter[1].toLocaleString()} kg`,
      clear: () => {
        if (setActiveDynamicFilter) setActiveDynamicFilter(null);
      },
    });
  }

  // 7. Static Load Range Filter
  if (activeStaticFilter && Array.isArray(activeStaticFilter)) {
    activeTags.push({
      key: "stat-load",
      label: `Static: ${activeStaticFilter[0].toLocaleString()} - ${activeStaticFilter[1].toLocaleString()} kg`,
      clear: () => {
        if (setActiveStaticFilter) setActiveStaticFilter(null);
      },
    });
  }

  // 8. Rack Load Range Filter
  if (activeRackFilter && Array.isArray(activeRackFilter)) {
    activeTags.push({
      key: "rack-load",
      label: `Rack: ${activeRackFilter[0].toLocaleString()} - ${activeRackFilter[1].toLocaleString()} kg`,
      clear: () => {
        if (setActiveRackFilter) setActiveRackFilter(null);
      },
    });
  }

  // 9. Legacy Min Static Load
  if (minStaticLoad > 0) {
    activeTags.push({
      key: "min-load",
      label: `${minStaticLoad.toLocaleString()}+ kg Load`,
      clear: () => setMinStaticLoad(0),
    });
  }

  // 10. Selected Application
  if (selectedApplication && selectedApplication !== "All") {
    activeTags.push({
      key: "app",
      label: `App: ${selectedApplication}`,
      clear: () => setSelectedApplication("All"),
    });
  }

  // 11. Custom only checkbox
  if (isCustom) {
    activeTags.push({
      key: "custom",
      label: "Custom Spec",
      clear: () => {
        if (setIsCustom) setIsCustom(false);
      },
    });
  }

  return (
    <div className={styles.topControlCard}>
      {/* Search Input & Controls Row */}
      <div className={styles.searchRow}>
        <div className={styles.searchBoxWrapper}>
          <Icon icon="carbon:search" className={styles.searchIcon} />
          <input
            id="product-search-input-field"
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
                <Icon icon="carbon:close" className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.controlsRightGroup}>
          {/* Mobile Filter Toggle Button with Badge Count (Matching Image 2) */}
          <motion.button
            type="button"
            className={styles.mobileFilterToggleBtn}
            onClick={() => setIsMobileFilterOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="carbon:filter" className="w-4 h-4" />
            <span>Filters</span>
            {activeTags.length > 0 && (
              <span className={styles.filterCountBadge}>{activeTags.length}</span>
            )}
          </motion.button>

          {/* Sort Select */}
          <div className={styles.sortSelectWrapper}>
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              options={sortByOptions}
              placeholder="Sort By"
              size="compact"
            />
          </div>

          {/* View Switcher (Matching Image 2) */}
          <div className={styles.viewModeSwitcher}>
            <motion.button
              type="button"
              className={`${styles.viewToggleBtn} ${viewMode === "grid" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
              aria-label="Grid View"
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="carbon:grid" className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setViewMode("list")}
              title="List View"
              aria-label="List View"
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="carbon:list" className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Applied Filters Section (Matching Image 2) */}
      {activeTags.length > 0 && (
        <div className={styles.appliedFiltersSection}>
          <div className={styles.appliedFiltersHeader}>
            <span className={styles.appliedFiltersTitle}>Applied filters:</span>
            <button
              type="button"
              onClick={resetFilters}
              className={styles.clearAllUnderlineBtn}
              title="Clear all active filters"
            >
              Clear all
            </button>
          </div>

          <div className={styles.appliedFiltersTrack}>
            <AnimatePresence>
              {activeTags.map((tag) => (
                <motion.span
                  key={tag.key}
                  className={styles.appliedFilterChip}
                  initial={{ opacity: 0, scale: 0.88, y: -2 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -2 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className={styles.appliedFilterChipText}>{tag.label}</span>
                  <button
                    type="button"
                    onClick={tag.clear}
                    className={styles.appliedFilterChipRemove}
                    title={`Remove ${tag.label}`}
                    aria-label={`Remove ${tag.label}`}
                  >
                    <Icon icon="carbon:close" className="w-3.5 h-3.5" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Quick Search Shortcut Chips (Shown when no active filters, matching Image 1) */}
      {activeTags.length === 0 && (
        <div className={styles.quickSearchPillsRow}>
          <span className={styles.quickSearchLabel}>QUICK FILTERS:</span>
          {QUICK_SEARCH_SUGGESTIONS.map((sug, i) => {
            const isSelected = sug.cat
              ? (sug.matchCat || [sug.cat]).includes(selectedCategory)
              : sug.load
              ? minStaticLoad === sug.load
              : false;

            return (
              <motion.button
                key={i}
                type="button"
                className={`${styles.quickSearchPillBtn} ${isSelected ? styles.quickSearchPillBtnActive : ""}`}
                onClick={() => {
                  if (sug.cat) {
                    setSelectedCategory(isSelected ? "All" : sug.cat);
                  }
                  if (sug.load) {
                    setMinStaticLoad(isSelected ? 0 : sug.load);
                  }
                }}
                whileTap={{ scale: 0.94 }}
              >
                <span>{sug.label}</span>
                {isSelected && (
                  <Icon icon="carbon:close" className="w-3.5 h-3.5 ml-1 text-current opacity-75" />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Results Count Bar */}
      <div className={styles.resultsBar}>
        <div className={styles.resultsLeftGroup}>
          <div className={styles.resultsText}>
            {filteredCount > itemsPerPage ? (
              <>
                Showing <strong>{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredCount)}</strong> of <strong>{filteredCount}</strong> Products
              </>
            ) : (
              <>
                Showing <strong>{filteredCount}</strong> {filteredCount === 1 ? "Product" : "Products"}
              </>
            )}
            {totalCount > 0 && totalCount !== filteredCount && (
              <span className={styles.totalText}> (filtered from {totalCount} total)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
