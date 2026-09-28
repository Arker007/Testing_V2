/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { CustomSelect } from "@/shared/ui";
import { sortByOptions } from "../../constants";
import styles from "../../products.module.css";

const QUICK_SEARCH_SUGGESTIONS = [
  {
    id: "pallets",
    label: "Plastic Pallets",
    type: "category",
    value: "Plastic Pallets",
    matchCat: ["Plastic Pallets", "plastic-pallets", "Pallets"],
  },
  {
    id: "lumber",
    label: "Plastic Lumber",
    type: "category",
    value: "Plastic Lumber",
    matchCat: ["Plastic Lumber", "plastic-lumber", "Recycled Plastic Lumber", "Lumber"],
  },
  {
    id: "benches",
    label: "Garden Benches",
    type: "category",
    value: "Garden Benches",
    matchCat: ["Garden Benches", "garden-bench", "Benches", "Outdoor Benches & Furniture", "Outdoor Benches"],
  },
  {
    id: "rackable",
    label: "Rackable",
    type: "attribute",
    value: "Rackable",
  },
  {
    id: "load-3000",
    label: "3,000+ kg Load",
    type: "load",
    value: 3000,
  },
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
          <Icon icon="solar:magnifer-linear" className={styles.searchIcon} />
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
                <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
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
            <Icon icon="solar:settings-linear" className="w-4 h-4" />
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
              <Icon icon="solar:widget-2-linear" className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setViewMode("list")}
              title="List View"
              aria-label="List View"
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="solar:list-linear" className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Unified Zero-Layout-Shift Filter Strip (Single-tier horizontal row for Quick Filters & Applied Filters) */}
      <div className={styles.filterStripRow}>
        <span className={styles.quickSearchLabel}>QUICK FILTERS:</span>
        <div className={styles.quickSearchTrack}>
          {QUICK_SEARCH_SUGGESTIONS.map((sug) => {
            let isSelected = false;
            if (sug.type === "category") {
              const isTop = selectedCategory === sug.value || (sug.matchCat && sug.matchCat.some((c) => c.toLowerCase() === (selectedCategory || "").toLowerCase()));
              const isSidebar = selectedCategories.includes(sug.value) || (sug.matchCat && selectedCategories.some((c) => sug.matchCat.some((m) => m.toLowerCase() === c.toLowerCase())));
              isSelected = isTop || isSidebar;
            } else if (sug.type === "attribute") {
              isSelected = selectedAttributes.includes(sug.value);
            } else if (sug.type === "load") {
              isSelected = minStaticLoad === sug.value;
            }

            const handleClick = () => {
              if (sug.type === "category") {
                if (isSelected) {
                  if (setSelectedCategory && selectedCategory === sug.value) setSelectedCategory("All");
                  if (setSelectedCategories) {
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== sug.value && !sug.matchCat?.some((m) => m.toLowerCase() === c.toLowerCase()))
                    );
                  }
                } else {
                  if (setSelectedCategories) {
                    setSelectedCategories((prev) => {
                      const base = selectedCategory && selectedCategory !== "All" && !prev.includes(selectedCategory)
                        ? [...prev, selectedCategory]
                        : [...prev];
                      return base.includes(sug.value) ? base : [...base, sug.value];
                    });
                  }
                  if (setSelectedCategory) setSelectedCategory("All");
                }
              } else if (sug.type === "attribute") {
                if (setSelectedAttributes) {
                  setSelectedAttributes((prev) =>
                    isSelected ? prev.filter((a) => a !== sug.value) : [...prev, sug.value]
                  );
                }
              } else if (sug.type === "load") {
                if (setMinStaticLoad) {
                  setMinStaticLoad(isSelected ? 0 : sug.value);
                }
              }
            };

            return (
              <motion.button
                key={sug.id || sug.label}
                type="button"
                className={`${styles.quickSearchPillBtn} ${isSelected ? styles.quickSearchPillBtnActive : ""}`}
                onClick={handleClick}
                whileTap={{ scale: 0.94 }}
                title={`Filter by ${sug.label}`}
              >
                <span>{sug.label}</span>
                {isSelected && (
                  <Icon icon="solar:close-circle-linear" className="w-3.5 h-3.5 ml-1 text-current opacity-80" />
                )}
              </motion.button>
            );
          })}

          {/* Additional Applied Filters Not Represented by Quick Filter Bar (e.g. Search Query, Dimensions, Custom Sliders) */}
          {activeTags
            .filter((tag) => {
              const isCoveredByQuickFilter = QUICK_SEARCH_SUGGESTIONS.some((sug) => {
                if (sug.type === "category") {
                  return (
                    (tag.key.startsWith("cat-") || tag.key.startsWith("top-cat-")) &&
                    (tag.label === sug.value || sug.matchCat?.some((m) => m.toLowerCase() === tag.label.toLowerCase()))
                  );
                }
                if (sug.type === "attribute") {
                  return tag.key === `attr-${sug.value}` || tag.label === sug.value;
                }
                if (sug.type === "load") {
                  return tag.key === "min-load";
                }
                return false;
              });
              return !isCoveredByQuickFilter;
            })
            .map((tag) => (
              <motion.span
                key={tag.key}
                className={styles.appliedFilterChip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12 }}
              >
                <span className={styles.appliedFilterChipText}>{tag.label}</span>
                <button
                  type="button"
                  onClick={tag.clear}
                  className={styles.appliedFilterChipRemove}
                  title={`Remove ${tag.label}`}
                  aria-label={`Remove ${tag.label}`}
                >
                  <Icon icon="solar:close-circle-linear" className="w-3.5 h-3.5" />
                </button>
              </motion.span>
            ))}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className={styles.clearAllUnderlineBtn}
              title="Clear all active filters"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

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
