/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "../products.module.css";

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

function RangeSliderWidget({
  min,
  max,
  step = 100,
  value,
  onChange,
  onApply,
  unit = "Kg",
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
  };

  const handleMaxChange = (e) => {
    const nextVal = Math.max(Number(e.target.value), localRange[0] + step);
    const updated = [localRange[0], nextVal];
    setLocalRange(updated);
    if (onChange) onChange(updated);
  };

  const minPercent = Math.max(0, Math.min(100, ((localRange[0] - min) / (max - min)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((localRange[1] - min) / (max - min)) * 100));

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
          className={styles.dualRangeInput}
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
          {localRange[0].toLocaleString()} to {localRange[1].toLocaleString()} {unit}
        </span>
        <button
          type="button"
          className={styles.sliderApplyFilterBtn}
          onClick={() => {
            if (onApply) onApply(localRange);
          }}
        >
          Filter
        </button>
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
  // Normalize dynamic category items
  const dynamicCategories = useMemo(() => {
    if (Array.isArray(categories) && categories.length > 0) {
      return categories
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
    }
    return DEFAULT_CATEGORY_ITEMS.map((name) => ({ id: name, name, key: name }));
  }, [categories]);

  // Collapsible section state (default all open as in mockup)
  const [sectionsOpen, setSectionsOpen] = useState({
    category: true,
    attributes: true,
    dimensions: true,
    dynamicLoad: true,
    staticLoad: true,
    rackLoad: true,
    custom: true,
  });

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
      custom: nextState,
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
          {/* Top Title: "Filter" in bold green */}
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
                whileTap={{ scale: 0.92 }}
              >
                <Icon
                  icon={areAllCollapsed ? "solar:maximize-square-3-linear" : "solar:minimize-square-3-linear"}
                  className={styles.collapseActionIcon}
                />
                <span className={styles.collapseBtnText}>
                  {areAllCollapsed ? "Expand All" : "Collapse All"}
                </span>
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
                  icon="solar:alt-arrow-down-linear"
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
                      const count =
                        categoryCounts[cat.name] ??
                        categoryCounts[cat.id] ??
                        categoryCounts[cat.key];

                      return (
                        <label key={cat.key} className={styles.checkboxRow}>
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
                            {isChecked && (
                              <Icon icon="solar:check-read-linear" className="w-3 h-3 text-white" />
                            )}
                          </span>
                          <span className={styles.checkboxLabelText}>
                            {cat.name}
                            {typeof count === "number" && count > 0 && (
                              <span className={styles.categoryCountBadge}> ({count})</span>
                            )}
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
                  icon="solar:alt-arrow-down-linear"
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
                            {isChecked && (
                              <Icon icon="solar:check-read-linear" className="w-3 h-3 text-white" />
                            )}
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
                  icon="solar:alt-arrow-down-linear"
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
                            {isChecked && (
                              <Icon icon="solar:check-read-linear" className="w-3 h-3 text-white" />
                            )}
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
                  icon="solar:alt-arrow-down-linear"
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
                      unit="Kg"
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
                  icon="solar:alt-arrow-down-linear"
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
                      unit="Kg"
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
                  icon="solar:alt-arrow-down-linear"
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
                      unit="Kg"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 7. CUSTOM */}
            <div className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeaderBtn}
                onClick={() => toggleSection("custom")}
                aria-expanded={sectionsOpen.custom}
              >
                <span className={styles.accordionTitle}>Custom</span>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  className={`${styles.accordionChevron} ${
                    sectionsOpen.custom
                      ? styles.accordionChevronOpen
                      : styles.accordionChevronClosed
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {sectionsOpen.custom && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className={styles.checkboxRow}>
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
                        {isCustom && (
                          <Icon icon="solar:check-read-linear" className="w-3 h-3 text-white" />
                        )}
                      </span>
                      <span className={styles.checkboxLabelText}>Custom</span>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
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
              Apply Filters
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  );
}
