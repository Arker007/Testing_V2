/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import useDocumentTitle from "../../../../shared/hooks/useDocumentTitle";
import { useProducts } from "../../hooks/useProducts";
import ProductsHero from "./ProductsHero";
import MobileCategoryBar from "../filters/MobileCategoryBar";
import ProductSearchHeader from "../search/ProductSearchHeader";
import ProductFilterSidebar from "../filters/ProductFilterSidebar";
import ProductGridCard from "../cards/ProductGridCard";
import ProductListItemCard from "../cards/ProductListItemCard";
import ProductGridSkeletonCard from "../cards/ProductGridSkeletonCard";
import ProductListSkeletonCard from "../cards/ProductListSkeletonCard";
import QuickViewModal from "../quick-view/QuickViewModal";
import ProcurementAdvantage from "./ProcurementAdvantage";
import ProcurementCtaBand from "./ProcurementCtaBand";
import { BackToTop, InquiryModal, Pagination } from "../../../../shared/ui";
import { applicationOptions } from "../../constants";
import {
  getImg,
  getStaticLoadKg,
  getDynamicLoadKg,
  getRackLoadKg,
  getDimensionsStr,
  getHeadline,
} from "../../utils";
import styles from "../../products.module.css";

function matchesDimension(productDim, filterDim) {
  if (!productDim) return false;
  const cleanP = String(productDim).replace(/,/g, "").toLowerCase();
  const cleanF = String(filterDim).replace(/,/g, "").toLowerCase();
  if (cleanP.includes(cleanF)) return true;
  const numsP = cleanP.match(/\d+(?:\.\d+)?/g) || [];
  const numsF = cleanF.match(/\d+(?:\.\d+)?/g) || [];
  if (numsF.length >= 2 && numsP.length >= 2) {
    const f1 = Number(numsF[0]);
    const f2 = Number(numsF[1]);
    const p1 = Number(numsP[0]);
    const p2 = Number(numsP[1]);
    return (
      (Math.abs(p1 - f1) < 25 && Math.abs(p2 - f2) < 25) ||
      (Math.abs(p1 - f2) < 25 && Math.abs(p2 - f1) < 25)
    );
  }
  return false;
}

function matchesAttribute(p, attr) {
  const text = [
    p.name,
    p.type,
    p.description,
    p.applications,
    p.technical_blurb,
    Array.isArray(p.features) ? p.features.join(" ") : String(p.features || ""),
    typeof p.specifications === "object" ? JSON.stringify(p.specifications) : String(p.specifications || ""),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const lowerAttr = attr.toLowerCase();
  if (lowerAttr === "nestable") {
    return text.includes("nestable") || text.includes("nest") || text.includes("stackable");
  }
  if (lowerAttr === "stackable pallets") {
    return (text.includes("stackable") || text.includes("pallet")) && !text.includes("non-stackable");
  }
  if (lowerAttr === "stackable loads") {
    return text.includes("stackable") || text.includes("load") || getStaticLoadKg(p) >= 1000;
  }
  if (lowerAttr === "rackable") {
    return text.includes("rackable") || text.includes("racking") || text.includes("high-bay") || getRackLoadKg(p) > 0;
  }
  return text.includes(lowerAttr);
}

function matchesCategory(p, catIdentifier) {
  if (!p || !catIdentifier) return false;
  const target = String(catIdentifier).toLowerCase().trim();

  // Match by category ID, slug, or category code
  if (p.category && String(p.category).toLowerCase().trim() === target) return true;
  if (p.category_id && String(p.category_id).toLowerCase().trim() === target) return true;
  if (p.category_slug && String(p.category_slug).toLowerCase().trim() === target) return true;

  // Match by category name
  const pCatName = (p.category_name || p.category || "").toLowerCase().trim();
  if (pCatName && (pCatName === target || pCatName.includes(target) || target.includes(pCatName))) {
    return true;
  }

  const text = [
    p.category,
    p.category_name,
    p.name,
    p.type,
    p.description,
    p.applications,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (target === "closed loop") {
    return (
      text.includes("closed loop") ||
      text.includes("reusable") ||
      text.includes("circular") ||
      text.includes("heavy-duty") ||
      text.includes("pallet") ||
      text.includes("lumber")
    );
  }
  if (target === "lightweight & export-ready" || target.includes("export")) {
    return (
      text.includes("export") ||
      text.includes("ispm") ||
      text.includes("lightweight") ||
      text.includes("shipping") ||
      text.includes("logistics")
    );
  }

  return text.includes(target);
}

export default function ProductCatalog() {
  const { products, categories, loading } = useProducts();
  const [searchParams] = useSearchParams();

  const activeCatParam = searchParams.get("cat") || "All";
  const activeSearchParam = searchParams.get("search") || "";

  const ITEMS_PER_PAGE = 6;

  // Basic Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(activeSearchParam);
  const [minStaticLoad, setMinStaticLoad] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [inquiryProduct, setInquiryProduct] = useState(null);

  // New Redesigned Filter States matching image mockup
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [dynamicLoadRange, setDynamicLoadRange] = useState([1000, 9000]);
  const [staticLoadRange, setStaticLoadRange] = useState([1000, 15000]);
  const [rackLoadRange, setRackLoadRange] = useState([500, 1500]);
  const [activeDynamicFilter, setActiveDynamicFilter] = useState(null);
  const [activeStaticFilter, setActiveStaticFilter] = useState(null);
  const [activeRackFilter, setActiveRackFilter] = useState(null);
  const [isCustom, setIsCustom] = useState(false);

  // Sync category state from URL query params
  useEffect(() => {
    if (activeCatParam && activeCatParam !== "All") {
      const match = categories.find(
        (cat) =>
          String(cat.id) === String(activeCatParam) ||
          cat.name.toLowerCase() === activeCatParam.toLowerCase()
      );
      setSelectedCategory(match ? match.name : activeCatParam);
    } else {
      setSelectedCategory("All");
    }
  }, [activeCatParam, categories]);

  // Sync search state from URL query params
  useEffect(() => {
    setSearchQuery(activeSearchParam);
  }, [activeSearchParam]);

  useDocumentTitle(
    "Recycled Plastic Catalog | Pallets, Lumber & Crates",
    "Browse VISHAL ENTERPRISE's catalog of recycled plastic lumber, industrial pallets, crates, and custom polymer sections manufactured in Ankleshwar."
  );

  const categoryOptions = useMemo(() => {
    const list = ["All"];
    categories.forEach((cat) => {
      if (cat.name && !list.includes(cat.name)) list.push(cat.name);
    });
    // Also include any categories present in products
    products.forEach((p) => {
      const pCatName = p.category_name || p.category;
      if (pCatName && typeof pCatName === "string" && !list.includes(pCatName)) {
        list.push(pCatName);
      }
    });
    return list;
  }, [categories, products]);

  const sidebarCategories = useMemo(() => {
    const map = new Map();
    // 1. From DB categories
    categories.forEach((cat) => {
      if (cat && cat.name && cat.name !== "All") {
        map.set(cat.name, {
          id: cat.id || cat.slug || cat.name,
          name: cat.name,
          key: cat.id || cat.slug || cat.name,
        });
      }
    });
    // 2. From products list
    products.forEach((p) => {
      const pCatName = p.category_name || p.category;
      if (pCatName && typeof pCatName === "string" && pCatName !== "All" && !map.has(pCatName)) {
        map.set(pCatName, {
          id: p.category || pCatName,
          name: pCatName,
          key: p.category || pCatName,
        });
      }
    });

    if (map.size === 0) {
      return [
        { id: "Closed Loop", name: "Closed Loop", key: "Closed Loop" },
        { id: "Lightweight & Export-Ready", name: "Lightweight & Export-Ready", key: "Lightweight & Export-Ready" },
      ];
    }

    return Array.from(map.values());
  }, [categories, products]);

  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    categoryOptions.forEach((catName) => {
      if (catName === "All") return;
      counts[catName] = products.filter((p) => {
        if (!p) return false;
        return matchesCategory(p, catName);
      }).length;
    });
    return counts;
  }, [products, categoryOptions]);

  const applyLoadFilter = (type, range) => {
    if (type === "dynamic") setActiveDynamicFilter(range);
    if (type === "static") setActiveStaticFilter(range);
    if (type === "rack") setActiveRackFilter(range);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p) return false;

        // Top Category Bar / Dropdown
        if (selectedCategory !== "All") {
          const pCatName = p.category_name || p.category || "";
          if (!pCatName.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const name = (p.name || p.title || "").toLowerCase();
          const desc = (p.description || "").toLowerCase();
          const sku = (p.sku || "").toLowerCase();
          if (!name.includes(q) && !desc.includes(q) && !sku.includes(q)) return false;
        }

        // Legacy Min Static Load
        if (minStaticLoad > 0) {
          const load = getStaticLoadKg(p);
          if (load < minStaticLoad) return false;
        }

        // Sidebar Categories Checkboxes
        if (selectedCategories.length > 0) {
          const matchesAnyCat = selectedCategories.some((cat) => matchesCategory(p, cat));
          if (!matchesAnyCat) return false;
        }

        // Sidebar Attributes Checkboxes
        if (selectedAttributes.length > 0) {
          const matchesAllAttrs = selectedAttributes.every((attr) => matchesAttribute(p, attr));
          if (!matchesAllAttrs) return false;
        }

        // Sidebar Dimensions Checkboxes
        if (selectedDimensions.length > 0) {
          const productDim = getDimensionsStr(p);
          const matchesAnyDim = selectedDimensions.some((dim) => matchesDimension(productDim, dim));
          if (!matchesAnyDim) return false;
        }

        // Dynamic Load Filter
        if (activeDynamicFilter) {
          const dLoad = getDynamicLoadKg(p);
          if (dLoad > 0 && (dLoad < activeDynamicFilter[0] || dLoad > activeDynamicFilter[1])) {
            return false;
          }
        }

        // Static Load Filter
        if (activeStaticFilter) {
          const sLoad = getStaticLoadKg(p);
          if (sLoad > 0 && (sLoad < activeStaticFilter[0] || sLoad > activeStaticFilter[1])) {
            return false;
          }
        }

        // Rack Load Filter
        if (activeRackFilter) {
          const rLoad = getRackLoadKg(p);
          if (rLoad > 0 && (rLoad < activeRackFilter[0] || rLoad > activeRackFilter[1])) {
            return false;
          }
        }

        // Custom Only
        if (isCustom) {
          const text = [p.category, p.name, p.customization, p.description].filter(Boolean).join(" ").toLowerCase();
          if (!text.includes("custom") && !text.includes("bespoke") && !p.customization) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "load-high") return getStaticLoadKg(b) - getStaticLoadKg(a);
        if (sortBy === "load-low") return getStaticLoadKg(a) - getStaticLoadKg(b);
        if (sortBy === "name") return (a.name || a.title || "").localeCompare(b.name || b.title || "");
        return 0;
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    minStaticLoad,
    selectedCategories,
    selectedAttributes,
    selectedDimensions,
    activeDynamicFilter,
    activeStaticFilter,
    activeRackFilter,
    isCustom,
    sortBy,
  ]);

  // Reset pagination to page 1 whenever any filter or sorting criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    searchQuery,
    minStaticLoad,
    selectedApplication,
    selectedCategories,
    selectedAttributes,
    selectedDimensions,
    activeDynamicFilter,
    activeStaticFilter,
    activeRackFilter,
    isCustom,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    searchQuery !== "" ||
    minStaticLoad > 0 ||
    selectedApplication !== "All" ||
    selectedCategories.length > 0 ||
    selectedAttributes.length > 0 ||
    selectedDimensions.length > 0 ||
    activeDynamicFilter !== null ||
    activeStaticFilter !== null ||
    activeRackFilter !== null ||
    isCustom;

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setMinStaticLoad(0);
    setSelectedApplication("All");
    setSelectedCategories([]);
    setSelectedAttributes([]);
    setSelectedDimensions([]);
    setDynamicLoadRange([1000, 9000]);
    setStaticLoadRange([1000, 15000]);
    setRackLoadRange([500, 1500]);
    setActiveDynamicFilter(null);
    setActiveStaticFilter(null);
    setActiveRackFilter(null);
    setIsCustom(false);
    setSortBy("featured");
    setCurrentPage(1);
  };

  return (
    <main className={styles.main}>
      {/* Hero Header */}
      <ProductsHero activeCategory={selectedCategory} />

      <div className="container pt-6 pb-12">
        {/* Mobile Horizontal Quick Category Bar */}
        <MobileCategoryBar
          categoryOptions={categoryOptions}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedCategories={setSelectedCategories}
          categoryCounts={categoryCounts}
        />

        {/* Search & Toolbar Control Box */}
        <ProductSearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredCount={filteredProducts.length}
          totalCount={products.length}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          hasActiveFilters={hasActiveFilters}
          resetFilters={resetFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minStaticLoad={minStaticLoad}
          setMinStaticLoad={setMinStaticLoad}
          selectedApplication={selectedApplication}
          setSelectedApplication={setSelectedApplication}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
          selectedDimensions={selectedDimensions}
          setSelectedDimensions={setSelectedDimensions}
          activeDynamicFilter={activeDynamicFilter}
          setActiveDynamicFilter={setActiveDynamicFilter}
          activeStaticFilter={activeStaticFilter}
          setActiveStaticFilter={setActiveStaticFilter}
          activeRackFilter={activeRackFilter}
          setActiveRackFilter={setActiveRackFilter}
          isCustom={isCustom}
          setIsCustom={setIsCustom}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
        />

        {/* Main Catalog 2-Column Layout */}
        <div className={styles.catalogLayout}>
          <ProductFilterSidebar
            categories={sidebarCategories}
            categoryCounts={categoryCounts}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedAttributes={selectedAttributes}
            setSelectedAttributes={setSelectedAttributes}
            selectedDimensions={selectedDimensions}
            setSelectedDimensions={setSelectedDimensions}
            dynamicLoadRange={dynamicLoadRange}
            setDynamicLoadRange={setDynamicLoadRange}
            staticLoadRange={staticLoadRange}
            setStaticLoadRange={setStaticLoadRange}
            rackLoadRange={rackLoadRange}
            setRackLoadRange={setRackLoadRange}
            isCustom={isCustom}
            setIsCustom={setIsCustom}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
            applyLoadFilter={applyLoadFilter}
          />

          <section className={styles.mainCatalogArea} id="catalog-products-section">
            {loading ? (
              viewMode === "grid" ? (
                <div className={styles.prodGrid}>
                  {[...Array(6)].map((_, i) => (
                    <ProductGridSkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className={styles.prodList}>
                  {[...Array(6)].map((_, i) => (
                    <ProductListSkeletonCard key={i} />
                  ))}
                </div>
              )
            ) : filteredProducts.length === 0 ? (
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <div className={styles.emptyIconCircle}>
                  <Icon icon="carbon:search" className="w-8 h-8 text-slate-400" />
                </div>
                <h3>No Matching Products Found</h3>
                <p>
                  No items matched your current filter criteria. You can remove specific filter tags below, reset the catalog view, or request a custom manufactured specification.
                </p>

                {/* Active Filter Criteria Summary Tags */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl my-1">
                    {searchQuery.trim() && (
                      <span className={styles.emptyFilterPill}>
                        <span>Query: <strong>"{searchQuery.trim()}"</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => setSearchQuery("")}
                          aria-label="Remove search query"
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {selectedCategory && selectedCategory !== "All" && (
                      <span className={styles.emptyFilterPill}>
                        <span>Category: <strong>{selectedCategory}</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => {
                            setSelectedCategory("All");
                            setSelectedCategories([]);
                          }}
                          aria-label="Remove category filter"
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {selectedCategories.map((cat) => (
                      <span key={cat} className={styles.emptyFilterPill}>
                        <span>Category: <strong>{cat}</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => setSelectedCategories((prev) => prev.filter((c) => c !== cat))}
                          aria-label={`Remove category ${cat}`}
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    {selectedAttributes.map((attr) => (
                      <span key={attr} className={styles.emptyFilterPill}>
                        <span>Feature: <strong>{attr}</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => setSelectedAttributes((prev) => prev.filter((a) => a !== attr))}
                          aria-label={`Remove attribute ${attr}`}
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    {selectedDimensions.map((dim) => (
                      <span key={dim} className={styles.emptyFilterPill}>
                        <span>Size: <strong>{dim}</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => setSelectedDimensions((prev) => prev.filter((d) => d !== dim))}
                          aria-label={`Remove dimension ${dim}`}
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    {(minStaticLoad > 0 || activeStaticFilter) && (
                      <span className={styles.emptyFilterPill}>
                        <span>Static Load: <strong>≥ {activeStaticFilter || minStaticLoad} kg</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => {
                            setMinStaticLoad(0);
                            setActiveStaticFilter(null);
                          }}
                          aria-label="Remove static load filter"
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {activeDynamicFilter && (
                      <span className={styles.emptyFilterPill}>
                        <span>Dynamic Load: <strong>≥ {activeDynamicFilter} kg</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => setActiveDynamicFilter(null)}
                          aria-label="Remove dynamic load filter"
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {activeRackFilter && (
                      <span className={styles.emptyFilterPill}>
                        <span>Rack Load: <strong>≥ {activeRackFilter} kg</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => setActiveRackFilter(null)}
                          aria-label="Remove rack load filter"
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {isCustom && (
                      <span className={styles.emptyFilterPill}>
                        <span>Filter: <strong>Custom Only</strong></span>
                        <button
                          type="button"
                          className={styles.emptyPillRemoveBtn}
                          onClick={() => setIsCustom(false)}
                          aria-label="Remove custom filter"
                        >
                          <Icon icon="carbon:close" className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                  </div>
                )}

                {/* Primary Recovery Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
                  <motion.button
                    type="button"
                    onClick={resetFilters}
                    className={styles.emptyResetBtn}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="carbon:renew" className="w-4 h-4" />
                    <span>Reset All Filters</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setInquiryProduct({
                        name: searchQuery.trim()
                          ? `Custom Specification for "${searchQuery.trim()}"`
                          : "Custom Recycled Plastic Fabrication",
                        category: "Custom Sourcing / Tooling",
                        sku: "CUSTOM-RFP",
                      });
                    }}
                    className={styles.emptyCustomCtaBtn}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="carbon:settings-adjust" className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>Request Custom Machining / Sourcing</span>
                  </motion.button>
                </div>

                {/* Suggested Search Terms */}
                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] w-full max-w-md">
                  <span className="text-xs text-[var(--text-muted)] font-semibold block mb-2">
                    Or try popular industrial searches:
                  </span>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {[
                      { label: "Heavy Duty Pallet", query: "Heavy Duty" },
                      { label: "Nestable Pallet", query: "Nestable" },
                      { label: "Plastic Lumber", query: "Lumber" },
                      { label: "Outdoor Bench", query: "Bench" },
                    ].map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => {
                          resetFilters();
                          setSearchQuery(s.query);
                        }}
                        className={styles.emptySuggestionBtn}
                      >
                        <Icon icon="carbon:search" className="w-3 h-3 text-[var(--text-muted)]" />
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <motion.div
                    key={`grid-view-p${currentPage}`}
                    className={styles.prodGrid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {paginatedProducts.map((p, index) => (
                      <ProductGridCard
                        key={p.id}
                        index={index}
                        product={p}
                        img={getImg(p)}
                        staticLoad={getStaticLoadKg(p)}
                        dimStr={getDimensionsStr(p)}
                        onQuickView={setQuickViewProduct}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={`list-view-p${currentPage}`}
                    className={styles.prodList}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {paginatedProducts.map((p, idx) => (
                      <ProductListItemCard
                        key={p.id}
                        product={p}
                        img={getImg(p)}
                        staticLoad={getStaticLoadKg(p)}
                        dimStr={getDimensionsStr(p)}
                        onQuickView={setQuickViewProduct}
                        index={idx}
                      />
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </section>
        </div>

        {/* Pagination Controls - Centered across container */}
        {totalPages > 1 && (
          <div className="mt-8 mb-6 flex justify-center w-full" id="catalog-pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                const catalogEl = document.getElementById("catalog-products-section");
                if (catalogEl) {
                  const topOffset = catalogEl.getBoundingClientRect().top + window.pageYOffset - 110;
                  window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
                }
              }}
            />
          </div>
        )}

        {/* Procurement Advantage Section */}
        <ProcurementAdvantage />

        {/* CTA Band */}
        <ProcurementCtaBand />
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onRequestQuote={(prod) => {
          setQuickViewProduct(null);
          setInquiryProduct(prod);
        }}
        img={getImg(quickViewProduct)}
        staticLoad={getStaticLoadKg(quickViewProduct)}
        dimStr={getDimensionsStr(quickViewProduct)}
        headline={getHeadline(quickViewProduct)}
      />

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryProduct && (
          <InquiryModal
            product={inquiryProduct}
            onClose={() => setInquiryProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* Back to top floating button for long listing navigation */}
      <BackToTop />
    </main>
  );
}
