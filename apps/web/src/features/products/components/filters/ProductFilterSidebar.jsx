/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "../../products.module.css";

const DEFAULT_CATEGORY_ITEMS = [
  "Closed Loop",
  "Lightweight & Export-Ready",
];

const ATTRIBUTE_ITEMS = [
  "Nestable",
  "Stackable Pallets",
  "Stackable Loads",
  "Rackable",
];

const DIMENSION_ITEMS = [
  "1,030 mm x 1,240 mm",
  "1,200 mm x 1,200 mm",
  "1,000 mm x 1,200 mm",
  "939.8 mm x 939.8 mm",
  "1,010 mm x 1,215 mm",
  "1,010 mm x 1,210 mm",
  "1,016 mm x 1,219 mm",
];

function CheckboxCheck() {
  return (
    <svg
      className={styles.checkboxCheckIcon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RangeSliderWidget({
  min,
  max,
  step = 100,
  value,
  onChange,
  onApply,
  unit = "kg",
}) {
  const [localRange, setLocalRange] = useState(value || [min, max]);

  // Keep local range in sync if external value resets
  React.useEffect(() => {
    if (value) setLocalRange(value);
  }, [value]);

  const handleMinChange = (e) => {
    const nextVal = Math.min(Number(e.target.value), localRange[1] - step);
    const updated = [nextVal, localRange[1]];
    setLocalRange(updated);
    if (onChange) onChange(updated);
    if (onApply) onApply(updated);
  };

  const handleMaxChange = (e) => {
    const nextVal = Math.max(Number(e.target.value), localRange[0] + step);
    const updated = [localRange[0], nextVal];
    setLocalRange(updated);
    if (onChange) onChange(updated);
    if (onApply) onApply(updated);
  };

  const minPercent = Math.max(0, Math.min(100, ((localRange[0] - min) / (max - min)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((localRange[1] - min) / (max - min)) * 100));

  // Determine if minimum thumb is near the top to prevent stacking trap
  const minIsHigher = localRange[0] > max - (max - min) * 0.15;

  return (
    <div className={styles.sliderSectionWrapper}>
      <div className={styles.sliderTrackContainer}>
        <div className={styles.sliderTrackBackground} />
        <div
          className={styles.sliderTrackHighlight}
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localRange[0]}
          onChange={handleMinChange}
          className={`${styles.dualRangeInput} ${minIsHigher ? styles.rangeInputHigher : ""}`}
          aria-label="Minimum load"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localRange[1]}
          onChange={handleMaxChange}
          className={styles.dualRangeInput}
          aria-label="Maximum load"
        />
      </div>

      <div className={styles.sliderBottomRow}>
        <span className={styles.sliderDisplayValue}>
          <strong>{localRange[0].toLocaleString()} {unit}</strong>
          <span className={styles.sliderDisplaySeparator}>to</span>
          <strong>{localRange[1].toLocaleString()} {unit}</strong>
        </span>
      </div>
    </div>
  );
}

export default function ProductFilterSidebar({
  categories = [],
  categoryCounts = {},
  selectedCategories = [],
  setSelectedCategories,
  selectedAttributes = [],
  setSelectedAttributes,
  selectedDimensions = [],
  setSelectedDimensions,
  dynamicLoadRange = [1000, 9000],
  setDynamicLoadRange,
  staticLoadRange = [1000, 15000],
  setStaticLoadRange,
  rackLoadRange = [500, 1500],
  setRackLoadRange,
  isCustom = false,
  setIsCustom,
  hasActiveFilters,
  resetFilters,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  applyLoadFilter,
}) {
  // Normalize dynamic category items (filtering out categories with 0 items)
  const dynamicCategories = useMemo(() => {
    let list = [];
    if (Array.isArray(categories) && categories.length > 0) {
      list = categories
        .map((c) => {
          if (typeof c === "string") {
            return { id: c, name: c, key: c };
          }
          return {
            id: c.id || c.slug || c.name,
            name: c.name || c.id || "Category",
            key: c.id || c.slug || c.name,
          };
        })
        .filter((c) => c.name && c.name !== "All");
    } else {
      list = DEFAULT_CATEGORY_ITEMS.map((name) => ({ id: name, name, key: name }));
    }

    // Only include categories that contain at least 1 product (or are actively selected)
    return list.filter((cat) => {
      const rawCount =
        categoryCounts[cat.name] ??
        categoryCounts[cat.id] ??
        categoryCounts[cat.key];
      const count = typeof rawCount === "number" ? rawCount : 0;
      const isChecked =
        selectedCategories.includes(cat.id) ||
        selectedCategories.includes(cat.name) ||
        selectedCategories.includes(cat.key);
      return count > 0 || isChecked;
    });
  }, [categories, categoryCounts, selectedCategories]);

  // Collapsible section state (primary open, secondary load sliders collapsed by default for balanced height)
  const [sectionsOpen, setSectionsOpen] = useState({
    category: true,
    attributes: true,
    dimensions: true,
    dynamicLoad: false,
    staticLoad: false,
    rackLoad: false,
  });

  // Auto-expand any section that has active filter selections
  React.useEffect(() => {
    setSectionsOpen((prev) => {
      const updates = {};
      if (selectedCategories?.length > 0 && !prev.category) updates.category = true;
      if (selectedAttributes?.length > 0 && !prev.attributes) updates.attributes = true;
      if (selectedDimensions?.length > 0 && !prev.dimensions) updates.dimensions = true;
      if (Object.keys(updates).length > 0) {
        return { ...prev, ...updates };
      }
      return prev;
    });
  }, [selectedCategories, selectedAttributes, selectedDimensions]);

  const toggleSection = (sectionKey) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const areAllCollapsed = useMemo(() => {
    return Object.values(sectionsOpen).every((isOpen) => !isOpen);
  }, [sectionsOpen]);

  const toggleCollapseAll = () => {
    const nextState = areAllCollapsed;
    setSectionsOpen({
      category: nextState,
      attributes: nextState,
      dimensions: nextState,
      dynamicLoad: nextState,
      staticLoad: nextState,
      rackLoad: nextState,
    });
  };

  const toggleCategory = (catIdentifier) => {
    if (setSelectedCategories) {
      if (selectedCategories.includes(catIdentifier)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== catIdentifier));
      } else {
        setSelectedCategories([...selectedCategories, catIdentifier]);
      }
    }
  };

  const toggleAttribute = (attr) => {
    if (setSelectedAttributes) {
      if (selectedAttributes.includes(attr)) {
        setSelectedAttributes(selectedAttributes.filter((a) => a !== attr));
      } else {
        setSelectedAttributes([...selectedAttributes, attr]);
      }
    }
  };

  const toggleDimension = (dim) => {
    if (setSelectedDimensions) {
      if (selectedDimensions.includes(dim)) {
        setSelectedDimensions(selectedDimensions.filter((d) => d !== dim));
      } else {
        setSelectedDimensions([...selectedDimensions, dim]);
      }
    }
  };

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
          {/* Sidebar Top Header */}
          <div className={styles.sidebarHeader}>
            <h2 className={styles.filterMainHeading}>
              <Icon icon="solar:filter-linear" className={styles.filterHeadingIcon} />
              <span>Filter</span>
            </h2>

            <div className={styles.headerActions}>
              {/* Collapse / Expand All Button */}
              <motion.button
                type="button"
                className={styles.sidebarCollapseAllBtn}
                onClick={toggleCollapseAll}
                title={areAllCollapsed ? "Expand All Sections" : "Collapse All Sections"}
                aria-label={areAllCollapsed ? "Expand All Sections" : "Collapse All Sections"}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.collapseBtnText}>
                  {areAllCollapsed ? "Expand All" : "Collapse All"}
                </span>
                <Icon
                  icon={areAllCollapsed ? "carbon:chevron-down" : "carbon:chevron-up"}
                  className={styles.collapseActionIcon}
                />
              </motion.button>

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
            </div>
          </div>

          <div className={styles.sidebarContentBody}>
            {/* 1. CATEGORY */}
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeaderBtn}
                onClick={() => toggleSection("category")}
                aria-expanded={sectionsOpen.category}
              >
                <span className={styles.accordionTitle}>Category</span>
                <Icon
                  icon="carbon:chevron-down"
                  className={`${styles.accordionChevron} ${
                    sectionsOpen.category
                      ? styles.accordionChevronOpen
                      : styles.accordionChevronClosed
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {sectionsOpen.category && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dynamicCategories.map((cat) => {
                      const isChecked =
                        selectedCategories.includes(cat.id) ||
                        selectedCategories.includes(cat.name) ||
                        selectedCategories.includes(cat.key);
                      const rawCount =
                        categoryCounts[cat.name] ??
                        categoryCounts[cat.id] ??
                        categoryCounts[cat.key];
                      const count = typeof rawCount === "number" ? rawCount : 0;
                      const hasCount = count > 0;

                      return (
                        <label
                          key={cat.key}
                          className={`${styles.checkboxRow} ${!hasCount ? styles.checkboxRowEmpty : ""}`}
                        >
                          <input
                            type="checkbox"
                            className={styles.checkboxInputHidden}
                            checked={isChecked}
                            onChange={() => toggleCategory(cat.name)}
                          />
                          <span
                            className={`${styles.customCheckboxSquare} ${
                              isChecked ? styles.customCheckboxChecked : ""
                            }`}
                          >
                            {isChecked && <CheckboxCheck />}
                          </span>
                          <span className={styles.checkboxLabelText}>
                            {cat.name}
                          </span>
                          <span
                            className={`${styles.categoryCountBadge} ${
                              !hasCount ? styles.categoryCountBadgeZero : ""
                            }`}
                          >
                            {count}
                          </span>
                        </label>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. ATTRIBUTES */}
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeaderBtn}
                onClick={() => toggleSection("attributes")}
                aria-expanded={sectionsOpen.attributes}
              >
                <span className={styles.accordionTitle}>Attributes</span>
                <Icon
                  icon="carbon:chevron-down"
                  className={`${styles.accordionChevron} ${
                    sectionsOpen.attributes
                      ? styles.accordionChevronOpen
                      : styles.accordionChevronClosed
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {sectionsOpen.attributes && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ATTRIBUTE_ITEMS.map((attr) => {
                      const isChecked = selectedAttributes.includes(attr);
                      return (
                        <label key={attr} className={styles.checkboxRow}>
                          <input
                            type="checkbox"
                            className={styles.checkboxInputHidden}
                            checked={isChecked}
                            onChange={() => toggleAttribute(attr)}
                          />
                          <span
                            className={`${styles.customCheckboxSquare} ${
                              isChecked ? styles.customCheckboxChecked : ""
                            }`}
                          >
                            {isChecked && <CheckboxCheck />}
                          </span>
                          <span className={styles.checkboxLabelText}>{attr}</span>
                        </label>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. DIMENSIONS */}
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeaderBtn}
                onClick={() => toggleSection("dimensions")}
                aria-expanded={sectionsOpen.dimensions}
              >
                <span className={styles.accordionTitle}>Dimensions</span>
                <Icon
                  icon="carbon:chevron-down"
                  className={`${styles.accordionChevron} ${
                    sectionsOpen.dimensions
                      ? styles.accordionChevronOpen
                      : styles.accordionChevronClosed
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {sectionsOpen.dimensions && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {DIMENSION_ITEMS.map((dim) => {
                      const isChecked = selectedDimensions.includes(dim);
                      return (
                        <label key={dim} className={styles.checkboxRow}>
                          <input
                            type="checkbox"
                            className={styles.checkboxInputHidden}
                            checked={isChecked}
                            onChange={() => toggleDimension(dim)}
                          />
                          <span
                            className={`${styles.customCheckboxSquare} ${
                              isChecked ? styles.customCheckboxChecked : ""
                            }`}
                          >
                            {isChecked && <CheckboxCheck />}
                          </span>
                          <span className={styles.checkboxLabelText}>{dim}</span>
                        </label>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. MAX DYNAMIC LOAD */}
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeaderBtn}
                onClick={() => toggleSection("dynamicLoad")}
                aria-expanded={sectionsOpen.dynamicLoad}
              >
                <span className={styles.accordionTitle}>Max Dynamic Load</span>
                <Icon
                  icon="carbon:chevron-down"
                  className={`${styles.accordionChevron} ${
                    sectionsOpen.dynamicLoad
                      ? styles.accordionChevronOpen
                      : styles.accordionChevronClosed
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {sectionsOpen.dynamicLoad && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RangeSliderWidget
                      min={1000}
                      max={9000}
                      step={500}
                      value={dynamicLoadRange}
                      onChange={setDynamicLoadRange}
                      onApply={(range) => {
                        if (applyLoadFilter) applyLoadFilter("dynamic", range);
                      }}
                      unit="kg"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. MAX STATIC LOAD */}
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeaderBtn}
                onClick={() => toggleSection("staticLoad")}
                aria-expanded={sectionsOpen.staticLoad}
              >
                <span className={styles.accordionTitle}>Max Static Load</span>
                <Icon
                  icon="carbon:chevron-down"
                  className={`${styles.accordionChevron} ${
                    sectionsOpen.staticLoad
                      ? styles.accordionChevronOpen
                      : styles.accordionChevronClosed
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {sectionsOpen.staticLoad && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RangeSliderWidget
                      min={1000}
                      max={15000}
                      step={500}
                      value={staticLoadRange}
                      onChange={setStaticLoadRange}
                      onApply={(range) => {
                        if (applyLoadFilter) applyLoadFilter("static", range);
                      }}
                      unit="kg"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 6. MAX RACK LOAD */}
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeaderBtn}
                onClick={() => toggleSection("rackLoad")}
                aria-expanded={sectionsOpen.rackLoad}
              >
                <span className={styles.accordionTitle}>Max Rack Load</span>
                <Icon
                  icon="carbon:chevron-down"
                  className={`${styles.accordionChevron} ${
                    sectionsOpen.rackLoad
                      ? styles.accordionChevronOpen
                      : styles.accordionChevronClosed
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {sectionsOpen.rackLoad && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RangeSliderWidget
                      min={500}
                      max={1500}
                      step={100}
                      value={rackLoadRange}
                      onChange={setRackLoadRange}
                      onApply={(range) => {
                        if (applyLoadFilter) applyLoadFilter("rack", range);
                      }}
                      unit="kg"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 7. CUSTOM PROFILES TOGGLE */}
            <div className={styles.customToggleSection}>
              <label className={styles.customToggleLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInputHidden}
                  checked={isCustom}
                  onChange={(e) => setIsCustom && setIsCustom(e.target.checked)}
                />
                <span
                  className={`${styles.customCheckboxSquare} ${
                    isCustom ? styles.customCheckboxChecked : ""
                  }`}
                >
                  {isCustom && <CheckboxCheck />}
                </span>
                <div className={styles.customToggleTextGroup}>
                  <span className={styles.customToggleTitle}>Custom / Bespoke Profiles</span>
                  <span className={styles.customToggleSubtitle}>Show customizable OEM molds only</span>
                </div>
              </label>
            </div>
          </div>

          {/* Mobile Drawer Footer */}
          <div className={styles.mobileDrawerFooter}>
            {hasActiveFilters && (
              <motion.button
                type="button"
                className={styles.mobileDrawerResetBtn}
                onClick={resetFilters}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="carbon:renew" className="w-3.5 h-3.5" />
                <span>Reset</span>
              </motion.button>
            )}
            <motion.button
              type="button"
              className={styles.mobileDrawerApplyBtn}
              onClick={() => setIsMobileFilterOpen(false)}
              whileTap={{ scale: 0.97 }}
            >
              Apply Filters
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  );
}
