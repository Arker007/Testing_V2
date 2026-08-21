/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useProducts } from "../shared/hooks/useProducts";
import ProductsHero from "../features/products/ProductsHero";
import MobileCategoryBar from "../features/products/MobileCategoryBar";
import ProductSearchHeader from "../features/products/ProductSearchHeader";
import ProductFilterSidebar from "../features/products/ProductFilterSidebar";
import ProductGridCard from "../features/products/ProductGridCard";
import ProductListItemCard from "../features/products/ProductListItemCard";
import QuickViewModal from "../features/products/QuickViewModal";
import ProcurementAdvantage from "../features/products/ProcurementAdvantage";
import ProcurementCtaBand from "../features/products/ProcurementCtaBand";
import { applicationOptions } from "../features/products/products.constants";
import { getImg, getStaticLoadKg, getDimensionsStr, getHeadline } from "../features/products/productUtils";
import styles from "./Products.module.css";

export default function Products() {
  const { products, categories, loading } = useProducts();
  const [searchParams] = useSearchParams();

  const activeCatParam = searchParams.get("cat") || "All";
  const activeSearchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(activeSearchParam);
  const [minStaticLoad, setMinStaticLoad] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync category state from URL query params
  useEffect(() => {
    if (activeCatParam && activeCatParam !== "All") {
      const match = categories.find(
        (cat) => String(cat.id) === String(activeCatParam) || cat.name.toLowerCase() === activeCatParam.toLowerCase()
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
    return list;
  }, [categories]);

  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    categoryOptions.forEach((catName) => {
      if (catName === "All") return;
      counts[catName] = products.filter((p) => {
        if (!p) return false;
        const pCatName = p.category_name || p.category || "";
        return pCatName.toLowerCase().includes(catName.toLowerCase());
      }).length;
    });
    return counts;
  }, [products, categoryOptions]);

  const applicationSelectOptions = useMemo(() => {
    return applicationOptions.map((app) => ({
      value: app,
      label: app === "All" ? "All Applications" : app,
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p) return false;
        if (selectedCategory !== "All") {
          const pCatName = p.category_name || p.category || "";
          if (!pCatName.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const name = (p.name || p.title || "").toLowerCase();
          const desc = (p.description || "").toLowerCase();
          const sku = (p.sku || "").toLowerCase();
          if (!name.includes(q) && !desc.includes(q) && !sku.includes(q)) return false;
        }
        if (minStaticLoad > 0) {
          const load = getStaticLoadKg(p);
          if (load < minStaticLoad) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "load-high") return getStaticLoadKg(b) - getStaticLoadKg(a);
        if (sortBy === "name") return (a.name || a.title || "").localeCompare(b.name || b.title || "");
        return 0;
      });
  }, [products, selectedCategory, searchQuery, minStaticLoad, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    searchQuery !== "" ||
    minStaticLoad > 0 ||
    selectedApplication !== "All";

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setMinStaticLoad(0);
    setSelectedApplication("All");
    setSortBy("featured");
  };

  return (
    <main className={styles.main}>
      {/* Hero Header */}
      <ProductsHero activeCategory={selectedCategory} />

      <div className="container py-8">
        {/* Mobile Horizontal Quick Category Bar */}
        <MobileCategoryBar
          categoryOptions={categoryOptions}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
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
          hasActiveFilters={hasActiveFilters}
          resetFilters={resetFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minStaticLoad={minStaticLoad}
          setMinStaticLoad={setMinStaticLoad}
          selectedApplication={selectedApplication}
          setSelectedApplication={setSelectedApplication}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
        />

        {/* Main Catalog 2-Column Layout */}
        <div className={styles.catalogLayout}>
          <ProductFilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryOptions={categoryOptions}
            categoryCounts={categoryCounts}
            minStaticLoad={minStaticLoad}
            setMinStaticLoad={setMinStaticLoad}
            selectedApplication={selectedApplication}
            setSelectedApplication={setSelectedApplication}
            applicationSelectOptions={applicationSelectOptions}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
          />

          <section className={styles.mainCatalogArea}>
            {loading ? (
              <div className={styles.skeleGrid}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.skeletonCard} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <div className={styles.emptyIconCircle}>
                  <Icon icon="solar:magnifer-linear" className="w-8 h-8 text-slate-400" />
                </div>
                <h3>No Matching Products</h3>
                <p>
                  No items matched your current filter criteria. Try adjusting search query, category, or minimum load rating.
                </p>
                <motion.button
                  type="button"
                  onClick={resetFilters}
                  className={styles.emptyResetBtn}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="solar:restart-linear" className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </motion.button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid-view"
                className={styles.prodGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filteredProducts.map((p) => (
                  <ProductGridCard
                    key={p.id}
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
                key="list-view"
                className={styles.prodList}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filteredProducts.map((p) => (
                  <ProductListItemCard
                    key={p.id}
                    product={p}
                    img={getImg(p)}
                    staticLoad={getStaticLoadKg(p)}
                    dimStr={getDimensionsStr(p)}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </motion.div>
            )}
          </section>
        </div>

        {/* Procurement Advantage Section */}
        <ProcurementAdvantage />

        {/* CTA Band */}
        <ProcurementCtaBand />
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        img={getImg(quickViewProduct)}
        staticLoad={getStaticLoadKg(quickViewProduct)}
        dimStr={getDimensionsStr(quickViewProduct)}
        headline={getHeadline(quickViewProduct)}
      />
    </main>
  );
}
