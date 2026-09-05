/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/navbar.module.css";

const CATEGORY_META = {
  "plastic-pallets": {
    icon: "solar:box-minimalistic-outline",
    label: "Plastic Pallets",
    subtext: "ISPM-15 Export & Racking",
  },
  "plastic-lumber": {
    icon: "solar:ruler-angular-outline",
    label: "Plastic Lumber",
    subtext: "Structural Profiles & Posts",
  },
  "garden-bench": {
    icon: "solar:chair-2-outline",
    label: "Garden Benches",
    subtext: "Park & Society Benches",
  },
  "plastic-table": {
    icon: "solar:layers-outline",
    label: "Recycled Tables",
    subtext: "Picnic Sets & Dining",
  },
  "custom-products": {
    icon: "solar:box-outline",
    label: "Custom & Fencing",
    subtext: "Molded Shapes & Ranch Rail",
  },
  "outdoor-furniture": {
    icon: "solar:chair-outline",
    label: "Outdoor Furniture",
    subtext: "Eco Seating & Amenities",
  },
  "garden-fence": {
    icon: "solar:shield-outline",
    label: "Garden Fence",
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
    }, 180);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, [isOpen]);

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
          label: cat.name || slug,
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
        aria-haspopup="true"
        aria-expanded={isOpen}
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
            initial={{ opacity: 0, y: -4, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.995 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex" }}
          >
            <div
              className={`${styles.dropdownMenuPanel} p-6 sm:p-7 lg:p-8 transition-all shadow-2xl backdrop-blur-md`}
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
                    (cat.name || catSlug);

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
                          <div className="w-6 h-6 rounded-md bg-[var(--brand-soft)] flex items-center justify-center shrink-0 border border-[var(--border-subtle)]">
                            <Icon
                              icon={icon}
                              className="w-3.5 h-3.5 text-[var(--brand-primary)]"
                            />
                          </div>
                          <span className="font-bold tracking-tight text-[13.5px] truncate text-[var(--text-primary)]">
                            {label}
                          </span>
                          {catItems.length > 0 && (
                            <span className="ml-auto text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full bg-[var(--bg-surface-secondary)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
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
                                    <span className="truncate text-[13px] font-medium text-[var(--text-secondary)] transition-colors group-hover:text-[var(--brand-primary)]">
                                      {cleanTitle}
                                    </span>
                                    {sizeBadge && (
                                      <span className="text-[10.5px] text-[var(--text-muted)] font-mono tracking-tight mt-0.5">
                                        {sizeBadge}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })
                          ) : (
                            <div className="py-3 text-xs text-[var(--text-muted)] italic">
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
                        <span className="text-[var(--brand-primary)] group-hover:text-[var(--brand-hover)]">View All {cat.name || label}</span>
                        <Icon
                          icon="solar:arrow-right-linear"
                          className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Consolidated Quick-Value & B2B Action Bar */}
              <div className="mt-5 pt-3.5 border-t border-[var(--border-subtle)] flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
                {/* Value Highlights */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[var(--text-secondary)]">
                  <Link
                    to="/sustainability"
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-2 group hover:text-[var(--text-primary)] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-[var(--brand-soft)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                      <Icon icon="solar:shield-check-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    </div>
                    <span className="font-semibold text-[12.5px] text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                      ISPM-15 Export Certified
                    </span>
                    <span className="hidden sm:inline text-[11.5px] text-[var(--text-muted)]">
                      • Zero fumigation needed
                    </span>
                  </Link>

                  <Link
                    to="/contact?quote=1"
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-2 group hover:text-[var(--text-primary)] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-[var(--brand-soft)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                      <Icon icon="solar:ruler-angular-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    </div>
                    <span className="font-semibold text-[12.5px] text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                      Custom Moulds & Profiles
                    </span>
                    <span className="hidden sm:inline text-[11.5px] text-[var(--text-muted)]">
                      • CAD skids & bespoke sizing
                    </span>
                  </Link>

                  <Link
                    to="/sustainability"
                    onClick={handleLinkClick}
                    className="hidden xl:inline-flex items-center gap-2 group hover:text-[var(--text-primary)] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-[var(--brand-soft)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                      <Icon icon="solar:leaf-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    </div>
                    <span className="font-semibold text-[12.5px] text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                      100% Recycled Polymers
                    </span>
                  </Link>
                </div>

                {/* Primary Action Button */}
                <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
                  <Link
                    to="/contact?quote=1"
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-card,8px)] bg-[var(--brand-primary)] text-slate-950 font-bold text-xs hover:bg-[var(--brand-hover)] transition-all shadow-2xs cursor-pointer"
                  >
                    <span>Request B2B Quote</span>
                    <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


