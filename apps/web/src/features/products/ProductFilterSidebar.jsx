/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, RotateCcw, X, ShieldCheck, Phone, Check, Search, Filter } from "lucide-react";
import CustomSelect from "../../shared/components/ui/CustomSelect";
import { loadCapacityOptions } from "./products.constants";
import styles from "../../pages/Products.module.css";

const QUICK_LOAD_PRESETS = [
  { label: "Any Load", value: 0 },
  { label: "1,000+ kg", value: 1000 },
  { label: "2,000+ kg", value: 2000 },
  { label: "3,000+ kg", value: 3000 },
  { label: "5,000+ kg", value: 5000 },
];

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
              <SlidersHorizontal size={16} className={styles.headerIcon} />
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
              <X size={18} />
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
                <RotateCcw size={12} />
                <span>Reset All</span>
              </motion.button>
            )}
          </div>

          {/* Active Filter Tags Summary */}
          {hasActiveFilters && (
            <div className={styles.activeFilterSummaryBar}>
              <div className={styles.activeSummaryHeader}>
                <Filter size={12} />
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
                      <X size={10} />
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
                      <X size={10} />
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
                      <X size={10} />
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

              {/* Quick Load Preset Chips */}
              <div className={styles.quickPresetGrid}>
                {QUICK_LOAD_PRESETS.map((preset) => {
                  const isActive = minStaticLoad === preset.value;
                  return (
                    <motion.button
                      key={preset.value}
                      type="button"
                      className={`${styles.presetChip} ${isActive ? styles.presetChipActive : ""}`}
                      onClick={() => setMinStaticLoad(preset.value)}
                      whileTap={{ scale: 0.94 }}
                    >
                      {preset.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom Load Select */}
              <div style={{ marginTop: "0.5rem" }}>
                <CustomSelect
                  value={minStaticLoad}
                  onChange={(val) => setMinStaticLoad(Number(val))}
                  options={loadCapacityOptions}
                  placeholder="Custom Load Rating"
                />
              </div>
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

            {/* 4. Compact B2B Customization Callout */}
            <div className={styles.sidebarTrustBox}>
              <div className={styles.trustBoxHeader}>
                <ShieldCheck size={16} className={styles.trustShieldIcon} />
                <h4>Custom Extrusion & OEM</h4>
              </div>
              <p>
                Need custom section profiles, unique lengths, or heavy-duty formulations?
              </p>
              <a href="tel:+919898686379" className={styles.trustPhoneBtn}>
                <Phone size={13} />
                <span>Call +91 98986 86379</span>
              </a>
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
                <RotateCcw size={14} />
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

