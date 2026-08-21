/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import CustomSelect from "../../shared/components/ui/CustomSelect";
import { loadCapacityOptions } from "./products.constants";
import styles from "../../pages/Products.module.css";

export default function ProductFilterSidebar({
  selectedCategory,
  setSelectedCategory,
  categoryOptions,
  categoryCounts,
  minStaticLoad,
  setMinStaticLoad,
  selectedApplication,
  setSelectedApplication,
  applicationSelectOptions,
  hasActiveFilters,
  resetFilters,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
}) {
  // Format categories for CustomSelect dropdown
  const formattedCategorySelectOptions = (categoryOptions || []).map((catName) => ({
    value: catName,
    label: catName === "All" ? "All Categories" : catName,
    badge: categoryCounts && categoryCounts[catName] !== undefined ? categoryCounts[catName] : undefined,
  }));

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            className={styles.mobileDrawerBackdrop}
            onClick={() => setIsMobileFilterOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar / Mobile Drawer Container */}
      <aside
        className={`${styles.sidebarPanel} ${
          isMobileFilterOpen ? styles.mobileDrawerOpen : ""
        }`}
      >
        <div className={styles.sidebarInner}>
          {/* Header */}
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarHeaderTitle}>
              <Icon icon="solar:tuning-2-linear" className={styles.headerIcon} />
              <h3>Filters</h3>
            </div>

            {/* Mobile Drawer Close Button */}
            <motion.button
              type="button"
              className={styles.mobileCloseBtn}
              onClick={() => setIsMobileFilterOpen(false)}
              aria-label="Close filters"
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
            </motion.button>

            {/* Reset Button */}
            {hasActiveFilters && (
              <motion.button
                type="button"
                className={styles.sidebarResetBtn}
                onClick={resetFilters}
                title="Reset All Filters"
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="solar:restart-linear" className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </motion.button>
            )}
          </div>

          {/* Active Filter Tags Summary */}
          {hasActiveFilters && (
            <div className={styles.activeFilterSummaryBar}>
              <div className={styles.activeSummaryHeader}>
                <Icon icon="solar:filter-linear" className="w-3.5 h-3.5" />
                <span>Active Filters:</span>
              </div>
              <div className={styles.activeTagsWrapper}>
                {selectedCategory !== "All" && (
                  <span className={styles.activeTagPill}>
                    {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("All")}
                      aria-label="Remove category filter"
                    >
                      <Icon icon="solar:close-circle-linear" className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {minStaticLoad > 0 && (
                  <span className={styles.activeTagPill}>
                    ≥ {minStaticLoad.toLocaleString()} kg
                    <button
                      type="button"
                      onClick={() => setMinStaticLoad(0)}
                      aria-label="Remove load filter"
                    >
                      <Icon icon="solar:close-circle-linear" className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedApplication !== "All" && (
                  <span className={styles.activeTagPill}>
                    {selectedApplication}
                    <button
                      type="button"
                      onClick={() => setSelectedApplication("All")}
                      aria-label="Remove application filter"
                    >
                      <Icon icon="solar:close-circle-linear" className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          <div className={styles.sidebarContentBody}>
            {/* 1. Category Filter Dropdown */}
            <div className={styles.filterSection}>
              <div className={styles.filterSectionHeader}>
                <div className={styles.filterSectionTitleGroup}>
                  <span className={styles.filterSectionLabel}>Product Category</span>
                  <span className={styles.filterCountSubtext}>
                    ({categoryOptions.length - 1} categories)
                  </span>
                </div>
                {selectedCategory !== "All" && (
                  <button
                    type="button"
                    className={styles.sectionClearBtn}
                    onClick={() => setSelectedCategory("All")}
                  >
                    Clear
                  </button>
                )}
              </div>

              <CustomSelect
                value={selectedCategory}
                onChange={(val) => {
                  setSelectedCategory(val);
                  if (isMobileFilterOpen) setIsMobileFilterOpen(false);
                }}
                options={formattedCategorySelectOptions}
                placeholder="Select Category"
              />
            </div>

            {/* 2. Minimum Static Load Filter */}
            <div className={styles.filterSection}>
              <div className={styles.filterSectionHeader}>
                <span className={styles.filterSectionLabel}>Min Load Rating</span>
                {minStaticLoad > 0 && (
                  <button
                    type="button"
                    className={styles.sectionClearBtn}
                    onClick={() => setMinStaticLoad(0)}
                  >
                    Clear
                  </button>
                )}
              </div>

              <CustomSelect
                value={minStaticLoad}
                onChange={(val) => setMinStaticLoad(Number(val))}
                options={loadCapacityOptions}
                placeholder="Custom Load Rating"
              />
            </div>

            {/* 3. Industry Application Filter */}
            <div className={styles.filterSection}>
              <div className={styles.filterSectionHeader}>
                <span className={styles.filterSectionLabel}>Industry Application</span>
                {selectedApplication !== "All" && (
                  <button
                    type="button"
                    className={styles.sectionClearBtn}
                    onClick={() => setSelectedApplication("All")}
                  >
                    Clear
                  </button>
                )}
              </div>
              <CustomSelect
                value={selectedApplication}
                onChange={setSelectedApplication}
                options={applicationSelectOptions}
                placeholder="Select Application"
              />
            </div>

          </div>

          {/* Mobile Footer with Apply / Reset */}
          <div className={styles.mobileDrawerFooter}>
            {hasActiveFilters && (
              <motion.button
                type="button"
                className={styles.mobileDrawerResetBtn}
                onClick={resetFilters}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="solar:restart-linear" className="w-3.5 h-3.5" />
                <span>Reset</span>
              </motion.button>
            )}
            <motion.button
              type="button"
              className={styles.mobileDrawerApplyBtn}
              onClick={() => setIsMobileFilterOpen(false)}
              whileTap={{ scale: 0.97 }}
            >
              Apply Filters ({categoryCounts[selectedCategory] ?? "Matching"})
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  );
}

