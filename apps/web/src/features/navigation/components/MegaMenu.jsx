/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/navbar.module.css";

const CATEGORY_META = {
  "plastic-pallets": {
    icon: "solar:widget-2-outline",
    label: "PLASTIC PALLETS",
    subtext: "ISPM-15 Export & Racking",
  },
  "plastic-lumber": {
    icon: "solar:ruler-angular-outline",
    label: "PLASTIC LUMBER",
    subtext: "Structural Profiles & Posts",
  },
  "garden-bench": {
    icon: "solar:chair-2-outline",
    label: "GARDEN BENCHES",
    subtext: "Park & Society Benches",
  },
  "plastic-table": {
    icon: "solar:layers-outline",
    label: "RECYCLED TABLES",
    subtext: "Picnic Sets & Dining",
  },
  "custom-products": {
    icon: "solar:box-outline",
    label: "CUSTOM & FENCING",
    subtext: "Molded Shapes & Ranch Rail",
  },
  "outdoor-furniture": {
    icon: "solar:chair-outline",
    label: "OUTDOOR FURNITURE",
    subtext: "Eco Seating & Amenities",
  },
  "garden-fence": {
    icon: "solar:shield-outline",
    label: "GARDEN FENCE",
    subtext: "Perimeter Systems",
  },
};

// Target display order for primary 5 columns
const PRIMARY_CATEGORY_ORDER = [
  "plastic-pallets",
  "plastic-lumber",
  "garden-bench",
  "plastic-table",
  "custom-products",
];

function extractSizeBadge(product) {
  if (!product) return null;
  try {
    const specs =
      typeof product.specifications === "string"
        ? JSON.parse(product.specifications)
        : product.specifications;
    if (specs?.["Dimensions"]) {
      const match = specs["Dimensions"].match(/(\d+\s*x\s*\d+)/i);
      if (match) return match[1].replace(/\s+/g, "");
    }
    if (specs?.["Profile Size"]) {
      return specs["Profile Size"].split("(")[0].trim();
    }
    if (specs?.["Length"]) {
      return specs["Length"].split("(")[0].trim();
    }
  } catch (e) {
    // ignore
  }
  const match = product.name?.match(
    /(\d{3,4}x\d{3,4}|\d+x\d+\s*(?:in|mm)?|\d+(?:\.\d+)?m)/i
  );
  return match ? match[1] : null;
}

function getCleanItemName(fullName) {
  if (!fullName) return "";
  // Strip out redundant repeating brand name or generic phrases for cleaner display
  return fullName
    .replace(/^Structural\s+/i, "")
    .replace(/\s+\(.*?\)$/, "");
}

export default function MegaMenu({
  categories: propCategories = [],
  products: propProducts = [],
  isProductsActive,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(propCategories);
  const [products, setProducts] = useState(propProducts);
  const leaveTimeoutRef = useRef(null);

  // Synchronize when props update
  useEffect(() => {
    if (propCategories?.length > 0) setCategories(propCategories);
  }, [propCategories]);

  useEffect(() => {
    if (propProducts?.length > 0) setProducts(propProducts);
  }, [propProducts]);

  // Fallback fetch if parent passed empty arrays
  useEffect(() => {
    if (
      (!propCategories || propCategories.length === 0) ||
      (!propProducts || propProducts.length === 0)
    ) {
      Promise.all([
        fetch("/api/categories").then((r) => r.json()).catch(() => null),
        fetch("/api/products").then((r) => r.json()).catch(() => null),
      ]).then(([catData, prodData]) => {
        if (catData?.categories?.length > 0) {
          setCategories(catData.categories);
        }
        if (prodData?.products?.length > 0) {
          setProducts(prodData.products);
        }
      });
    }
  }, [propCategories, propProducts]);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Group products by category ID or slug
  const productsByCategory = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const catKey = p.category || p.category_id || p.category_slug;
      if (!catKey) return;
      if (!map[catKey]) map[catKey] = [];
      map[catKey].push(p);
    });
    return map;
  }, [products]);

  // Determine sorted columns to display
  const displayColumns = useMemo(() => {
    if (!categories || categories.length === 0) {
      // Fallback to order array
      return PRIMARY_CATEGORY_ORDER.map((slug) => ({
        id: slug,
        slug,
        name: CATEGORY_META[slug]?.label || slug,
        meta: CATEGORY_META[slug] || {
          icon: "solar:box-minimalistic-outline",
          label: slug.toUpperCase(),
        },
      }));
    }

    // Sort categories prioritizing primary 5
    const list = [...categories];
    list.sort((a, b) => {
      const slugA = a.slug || a.id;
      const slugB = b.slug || b.id;
      const indexA = PRIMARY_CATEGORY_ORDER.indexOf(slugA);
      const indexB = PRIMARY_CATEGORY_ORDER.indexOf(slugB);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return (a.name || "").localeCompare(b.name || "");
    });

    // Take top 5 for the spacious 5-column layout
    return list.slice(0, 5).map((cat) => {
      const slug = cat.slug || cat.id;
      return {
        ...cat,
        slug,
        meta: CATEGORY_META[slug] || {
          icon: "solar:box-minimalistic-outline",
          label: (cat.name || slug).toUpperCase(),
        },
      };
    });
  }, [categories]);

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to="/products"
        onClick={handleLinkClick}
        className={`${styles.dropdownBtn} ${
          isProductsActive ? styles.dropdownBtnActive : ""
        }`}
      >
        <span>Products</span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`w-3.5 h-3.5 ml-1 inline transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[var(--brand)]" : ""
          }`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ display: "flex" }}
          >
            <div
              className={`${styles.dropdownMenuPanel} p-6 sm:p-7 lg:p-8 transition-all shadow-2xl`}
            >
              {/* Main 5-Column Dynamic Category Grid */}
              <div className={styles.megaMenuGrid}>
                {displayColumns.map((cat, colIdx) => {
                  const catSlug = cat.slug || cat.id;
                  const catItems = productsByCategory[catSlug] || [];
                  const isDivided = colIdx < displayColumns.length - 1;
                  const icon =
                    cat.meta?.icon ||
                    CATEGORY_META[catSlug]?.icon ||
                    "solar:box-minimalistic-outline";
                  const label =
                    cat.meta?.label ||
                    CATEGORY_META[catSlug]?.label ||
                    (cat.name || catSlug).toUpperCase();

                  return (
                    <div
                      key={catSlug}
                      className={`${styles.megaMenuCol} ${
                        isDivided ? styles.megaMenuColDivided : ""
                      }`}
                    >
                      <div>
                        {/* Category Heading with Icon & Count */}
                        <div className={styles.megaMenuHeading}>
                          <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800/40">
                            <Icon
                              icon={icon}
                              className="w-3.5 h-3.5 text-[var(--brand)]"
                            />
                          </div>
                          <span className="font-bold tracking-wider text-[12.5px] truncate">
                            {label}
                          </span>
                          {catItems.length > 0 && (
                            <span className="ml-auto text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                              {catItems.length}
                            </span>
                          )}
                        </div>

                        {/* Product Links List */}
                        <div className="flex flex-col space-y-0.5">
                          {catItems.length > 0 ? (
                            catItems.slice(0, 5).map((item) => {
                              const sizeBadge = extractSizeBadge(item);
                              const cleanTitle = getCleanItemName(item.name);

                              return (
                                <Link
                                  key={item.id}
                                  to={`/products/${item.id}`}
                                  onClick={handleLinkClick}
                                  className={`group ${styles.megaMenuItemLink}`}
                                  title={item.name}
                                >
                                  <div className="flex flex-col min-w-0 pr-1">
                                    <span className="truncate text-[13px] font-medium transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]">
                                      {cleanTitle}
                                    </span>
                                    {sizeBadge && (
                                      <span className="text-[10.5px] text-slate-400 dark:text-slate-400 font-mono tracking-tight mt-0.5">
                                        {sizeBadge}
                                      </span>
                                    )}
                                  </div>
                                  <Icon
                                    icon="solar:alt-arrow-right-linear"
                                    className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5"
                                  />
                                </Link>
                              );
                            })
                          ) : (
                            <div className="py-3 text-xs text-slate-400 dark:text-slate-400 italic">
                              Browse {cat.name || "catalog"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* View All Category Link */}
                      <Link
                        to={`/products?cat=${encodeURIComponent(catSlug)}`}
                        onClick={handleLinkClick}
                        className={styles.megaMenuViewAll}
                      >
                        <span>View All {cat.name || label}</span>
                        <Icon
                          icon="solar:arrow-right-linear"
                          className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Quick Info Feature Banner */}
              <div
                className={`${styles.megaMenuBanner} grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)] mt-6`}
              >
                {/* 1. ISPM-15 Exempt & Export Compliant */}
                <Link
                  to="/sustainability"
                  onClick={handleLinkClick}
                  className="group p-3.5 sm:p-4 flex items-center justify-between hover:bg-[var(--mega-menu-banner-hover)] transition-all duration-200 rounded-lg md:rounded-none first:rounded-l-lg last:rounded-r-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                      <Icon
                        icon="solar:shield-check-outline"
                        className="w-5 h-5 text-[var(--brand)] group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div>
                      <span className="block text-[13px] font-bold text-[var(--heading)] group-hover:text-[var(--brand-text)] transition-colors leading-tight">
                        ISPM-15 Exempt & ISO Certified
                      </span>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-0.5 leading-tight">
                        Zero fumigation needed for global export shipments
                      </p>
                    </div>
                  </div>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="w-4 h-4 text-slate-400 group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                  />
                </Link>

                {/* 2. Custom Pallets, Skids & Lumber */}
                <Link
                  to="/contact?quote=1"
                  onClick={handleLinkClick}
                  className="group p-3.5 sm:p-4 flex items-center justify-between hover:bg-[var(--mega-menu-banner-hover)] transition-all duration-200 rounded-lg md:rounded-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                      <Icon
                        icon="solar:ruler-angular-outline"
                        className="w-5 h-5 text-[var(--brand)] group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div>
                      <span className="block text-[13px] font-bold text-[var(--heading)] group-hover:text-[var(--brand-text)] transition-colors leading-tight">
                        Custom Sizes & Moldings
                      </span>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-0.5 leading-tight">
                        Machinery skids, custom lengths & industrial CAD tooling
                      </p>
                    </div>
                  </div>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="w-4 h-4 text-slate-400 group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                  />
                </Link>

                {/* 3. Direct B2B Pricing & Support */}
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="group p-3.5 sm:p-4 flex items-center justify-between hover:bg-[var(--mega-menu-banner-hover)] transition-all duration-200 rounded-lg md:rounded-none first:rounded-l-lg last:rounded-r-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                      <Icon
                        icon="solar:headphones-round-outline"
                        className="w-5 h-5 text-[var(--brand)] group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div>
                      <span className="block text-[13px] font-bold text-[var(--heading)] group-hover:text-[var(--brand-text)] transition-colors leading-tight">
                        Factory-Direct Pricing
                      </span>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-0.5 leading-tight">
                        Bulk supply, container dispatch & technical consulting
                      </p>
                    </div>
                  </div>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="w-4 h-4 text-slate-400 group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                  />
                </Link>
              </div>

              {/* Bottom Footer Strip */}
              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Icon
                    icon="solar:leaf-linear"
                    className="w-4 h-4 text-[var(--brand)] shrink-0"
                  />
                  <span className="font-bold text-[var(--heading)] text-[12.5px]">
                    Circular Polymers. 50+ Year Durability.
                  </span>
                  <span className="text-[var(--text-secondary)] text-[12px] hidden sm:inline ml-1">
                    100% rot-proof, termite-proof & zero deforestation.
                  </span>
                </div>

                <Link
                  to="/contact?quote=1"
                  onClick={handleLinkClick}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--brand-text)] hover:text-[var(--brand-hover)] transition-colors duration-150"
                >
                  <span>Request B2B Quote</span>
                  <Icon
                    icon="solar:arrow-right-linear"
                    className="w-3.5 h-3.5"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


