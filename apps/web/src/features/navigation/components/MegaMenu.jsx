/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import styles from "../styles/navbar.module.css";
import { ProductService } from "../../products/services/product.service";
import { CategoryService } from "../../categories";
import { QuoteButton } from "@/shared/ui";

// IBM Carbon icon mapping for standard category slugs & naming patterns
const CATEGORY_ICONS = {
  "plastic-pallets": "carbon:box",
  "plastic-lumber": "carbon:layers",
  "garden-bench": "carbon:tree",
  "plastic-table": "carbon:table",
  "garden-fence": "carbon:security",
  "outdoor-furniture": "carbon:sun",
  "custom-products": "carbon:settings",
};

const getCategoryIcon = (slug = "", name = "") => {
  const s = slug.toLowerCase();
  if (CATEGORY_ICONS[s]) return CATEGORY_ICONS[s];
  const n = `${slug} ${name}`.toLowerCase();
  if (n.includes("pallet")) return "carbon:box";
  if (n.includes("lumber") || n.includes("profile") || n.includes("plank"))
    return "carbon:layers";
  if (n.includes("bench") || n.includes("seating"))
    return "carbon:tree";
  if (n.includes("table") || n.includes("picnic") || n.includes("dining"))
    return "carbon:table";
  if (n.includes("fence") || n.includes("fencing"))
    return "carbon:security";
  if (n.includes("furniture"))
    return "carbon:sun";
  if (n.includes("custom") || n.includes("molded") || n.includes("part"))
    return "carbon:settings";
  return "carbon:box";
};

// Safely extract product image URL from various database representations
const resolveProductImage = (product) => {
  if (!product) return null;
  if (product.image) {
    if (typeof product.image === "string") {
      try {
        const parsed = JSON.parse(product.image);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      } catch {
        if (product.image.includes(",")) return product.image.split(",")[0].trim();
        return product.image;
      }
    }
    if (Array.isArray(product.image) && product.image.length > 0) {
      return product.image[0];
    }
  }
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }
  if (product.thumbnail) return product.thumbnail;
  return null;
};

// Extract technical specification string for menu list item
const extractProductSpec = (product) => {
  if (!product) return null;
  let specsObj = null;
  if (product.specifications) {
    if (typeof product.specifications === "object") {
      specsObj = product.specifications;
    } else if (typeof product.specifications === "string") {
      try {
        specsObj = JSON.parse(product.specifications);
      } catch {
        specsObj = null;
      }
    }
  }

  if (specsObj) {
    if (specsObj["Dimensions"]) return specsObj["Dimensions"];
    if (specsObj["Profile Size"]) return specsObj["Profile Size"];
    if (specsObj["Size"]) return specsObj["Size"];
    if (specsObj["Seating Capacity"]) return specsObj["Seating Capacity"];
    if (specsObj["Static Load"]) return `Load: ${specsObj["Static Load"]}`;
  }

  if (product.dimensions) return product.dimensions;
  if (product.capacity) {
    return product.capacity.split("/")[0].trim();
  }
  if (product.type) return product.type;

  return null;
};

// Automatically classify industrial attribute micro-badges
const getItemBadge = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("racking") || n.includes("rackable")) return "RACKING";
  if (n.includes("reversible")) return "REVERSIBLE";
  if (n.includes("euro standard") || n.includes("ispm-15") || n.includes("export"))
    return "EXPORT";
  if (n.includes("2-way") || n.includes("2way")) return "2-WAY";
  if (n.includes("steel-reinforced")) return "STEEL CORE";
  if (n.includes("cleanroom") || n.includes("hygiene") || n.includes("food"))
    return "FOOD GRADE";
  if (n.includes("cold storage") || n.includes("-30°c")) return "-30°C";
  if (n.includes("chemical") || n.includes("acid")) return "CHEMICAL";
  if (n.includes("tongue") || n.includes("groove")) return "INTERLOCK";
  if (n.includes("post")) return "POST";
  if (n.includes("decking")) return "DECKING";
  if (n.includes("cast iron") || n.includes("heritage")) return "HERITAGE";
  if (n.includes("memorial")) return "MEMORIAL";
  if (n.includes("accessible") || n.includes("ada") || n.includes("wheelchair"))
    return "ADA COMPLIANT";
  if (n.includes("tree")) return "TREE SURROUND";
  if (n.includes("picnic")) return "PICNIC";
  if (n.includes("courtyard") || n.includes("plaza")) return "COURTYARD";
  if (n.includes("heavy-duty") || n.includes("4x4") || n.includes("6x6"))
    return "HEAVY DUTY";
  if (n.includes("custom") || n.includes("skid") || n.includes("bespoke"))
    return "CUSTOM";
  return "STANDARD";
};

// Helper to test if a product belongs to a category definition
const isProductMatchingCategory = (p, cat) => {
  if (!p || !p.id || !p.name) return false;
  if (p.published !== undefined && p.published !== null && Number(p.published) === 0) {
    return false;
  }
  const slug = String(cat?.slug || cat?.id || "").toLowerCase().trim();
  const id = String(cat?.id || cat?.slug || "").toLowerCase().trim();
  const name = String(cat?.name || "").toLowerCase().trim();

  const pCat = String(p.category || "").toLowerCase().trim();
  const pCatId = String(p.category_id || "").toLowerCase().trim();
  const pCatSlug = String(p.category_slug || "").toLowerCase().trim();
  const pCatName = String(p.category_name || "").toLowerCase().trim();

  return (
    pCat === slug ||
    pCat === id ||
    pCatId === slug ||
    pCatId === id ||
    pCatSlug === slug ||
    pCatSlug === id ||
    (name && pCatName === name) ||
    (name && pCat === name)
  );
};

export default function MegaMenu({
  categories: propCategories = [],
  products: propProducts = [],
  isProductsActive,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(propCategories);
  const [products, setProducts] = useState(propProducts);
  const [activeCategorySlug, setActiveCategorySlug] = useState(() => {
    if (Array.isArray(propCategories) && propCategories.length > 0) {
      return propCategories[0].slug || propCategories[0].id || null;
    }
    return null;
  });
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const triggerBtnRef = useRef(null);
  const panelRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const categoryHoverTimerRef = useRef(null);
  const categoryButtonRefs = useRef([]);

  // Synchronize when props update or fetch dynamically if missing
  useEffect(() => {
    if (Array.isArray(propCategories) && propCategories.length > 0) {
      setCategories(propCategories);
    } else {
      CategoryService.getAll()
        .then((cd) => {
          if (cd?.categories && Array.isArray(cd.categories)) {
            setCategories(cd.categories);
          } else if (Array.isArray(cd)) {
            setCategories(cd);
          }
        })
        .catch(() => {});
    }
  }, [propCategories]);

  useEffect(() => {
    if (Array.isArray(propProducts) && propProducts.length > 0) {
      setProducts(propProducts);
    } else {
      ProductService.getProducts()
        .then((pd) => {
          if (pd?.products && Array.isArray(pd.products)) {
            setProducts(pd.products);
          } else if (Array.isArray(pd)) {
            setProducts(pd);
          }
        })
        .catch(() => {});
    }
  }, [propProducts]);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  // Forgiving leave timer prevents abrupt closing when crossing boundaries
  const handleMouseLeave = () => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
      categoryHoverTimerRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 190);
  };

  // Safe Hover Intent: 85ms debounce provides instantaneous category feedback while preventing diagonal slip
  const handleCategoryMouseEnter = (slug) => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
    }
    categoryHoverTimerRef.current = setTimeout(() => {
      setActiveCategorySlug(slug);
      setHoveredProduct(null);
    }, 85);
  };

  // When cursor enters content area, cancel any pending switch timer to lock the selected category
  const handleContentMouseEnter = () => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
      categoryHoverTimerRef.current = null;
    }
  };

  // Direct Click on Category Tab: Activates and pins category in panel for product exploration
  const handleCategoryClick = (slug) => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
      categoryHoverTimerRef.current = null;
    }
    setActiveCategorySlug(slug);
    setHoveredProduct(null);
  };

  // Keyboard navigation across categories
  const handleSidebarKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % categoryList.length;
      setActiveCategorySlug(categoryList[nextIndex].slug);
      categoryButtonRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + categoryList.length) % categoryList.length;
      setActiveCategorySlug(categoryList[prevIndex].slug);
      categoryButtonRefs.current[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveCategorySlug(categoryList[0].slug);
      categoryButtonRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIdx = categoryList.length - 1;
      setActiveCategorySlug(categoryList[lastIdx].slug);
      categoryButtonRefs.current[lastIdx]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const firstInteractive = panelRef.current?.querySelector("a, button:not([disabled])");
      firstInteractive?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveCategorySlug(categoryList[index].slug);
      setHoveredProduct(null);
    }
  };

  const handlePanelKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const activeIdx = categoryList.findIndex((c) => c.slug === activeCategorySlug);
      if (activeIdx !== -1) {
        categoryButtonRefs.current[activeIdx]?.focus();
      }
    }
  };

  const handleTriggerClick = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => {
        const activeIdx = categoryList.findIndex((c) => c.slug === activeCategorySlug);
        categoryButtonRefs.current[activeIdx >= 0 ? activeIdx : 0]?.focus();
      }, 50);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      if (categoryHoverTimerRef.current) {
        clearTimeout(categoryHoverTimerRef.current);
      }
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Derive consolidated category list purely from dynamic category taxonomy
  const categoryList = useMemo(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return [];
    }

    return categories.map((cat) => {
      const slug = cat.slug || cat.id;
      const name = cat.name || slug;
      return {
        id: cat.id || slug,
        slug,
        name,
        icon: getCategoryIcon(slug, name),
        eyebrow: name.toUpperCase(),
        description:
          cat.description || "Browse industrial recycled plastic solutions.",
        image: cat.image || null,
      };
    });
  }, [categories]);

  // Keep active category slug synchronized with dynamic categories
  useEffect(() => {
    if (categoryList.length > 0) {
      if (
        !activeCategorySlug ||
        !categoryList.some((c) => c.slug === activeCategorySlug || c.id === activeCategorySlug)
      ) {
        setActiveCategorySlug(categoryList[0].slug || categoryList[0].id);
      }
    } else {
      setActiveCategorySlug(null);
    }
  }, [categoryList, activeCategorySlug]);

  // Active category metadata
  const activeCategoryData = useMemo(() => {
    if (categoryList.length === 0) return null;
    return (
      categoryList.find(
        (c) => c.slug === activeCategorySlug || c.id === activeCategorySlug
      ) || categoryList[0]
    );
  }, [activeCategorySlug, categoryList]);

  // Filter actual products for active category
  const displayProducts = useMemo(() => {
    if (!activeCategoryData) return [];
    const matched = Array.isArray(products)
      ? products.filter((p) => isProductMatchingCategory(p, activeCategoryData))
      : [];

    return matched.slice(0, 6).map((p) => ({
      id: p.id,
      name: p.name,
      badge: p.badge || p.type || getItemBadge(p.name),
      spec: extractProductSpec(p) || p.dimensions || "Industrial Specification",
      targetUrl: `/products/${p.id}`,
      image: resolveProductImage(p),
      raw: p,
    }));
  }, [products, activeCategoryData]);

  // Preview Image for Spotlight Column
  const previewImageUrl = useMemo(() => {
    if (hoveredProduct) {
      const img = resolveProductImage(hoveredProduct) || hoveredProduct.image;
      if (img) return img;
    }
    if (displayProducts.length > 0 && displayProducts[0].image) {
      return displayProducts[0].image;
    }
    return activeCategoryData?.image || null;
  }, [hoveredProduct, displayProducts, activeCategoryData]);

  const handleDownloadCatalog = (e) => {
    e.preventDefault();
    if (!activeCategoryData) return;
    try {
      const catName = activeCategoryData?.name || "Industrial Products";
      const catDesc =
        activeCategoryData?.description ||
        "High-performance recycled plastic solutions engineered for longevity.";
      const catSlug = activeCategoryData?.slug || "catalog";
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Vishal Enterprise - ${catName} Catalog</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; font-variant-numeric: tabular-nums; padding: 40px; color: #0f172a; line-height: 1.6; max-width: 800px; margin: 0 auto; }
    .header { border-bottom: 2px solid #16532d; padding-bottom: 16px; margin-bottom: 24px; }
    h1 { color: #16532d; margin: 0 0 4px 0; font-size: 24px; letter-spacing: -0.02em; }
    .subtitle { color: #475569; font-size: 14px; margin: 0; }
    .section { margin: 20px 0; }
    .spec-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 12px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="header">
    <h1>VISHAL ENTERPRISE</h1>
    <p class="subtitle">Technical Specifications & Engineering Catalog · ${catName}</p>
  </div>
  <div class="section">
    <h2>${catName} Overview</h2>
    <div class="spec-card">
      <p>${catDesc}</p>
      <p><strong>Available Catalog Items:</strong> Standard models + bespoke variations fabricated to project drawings.</p>
    </div>
  </div>
  <div class="footer">
    <p><strong>Factory Address:</strong> Plot No. 1706/06, South 9 Road, G.I.D.C., Ankleshwar, Bharuch, Gujarat - 393002</p>
    <p><strong>Export Clearance:</strong> 100% ISPM-15 Exempt · Ex-factory Nhava Sheva / Hazira Port</p>
  </div>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute(
        "download",
        `Vishal_Enterprise_${catSlug}_Catalog.html`
      );
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerBtnRef}
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={`mega-panel-${activeCategorySlug}`}
        className={`${styles.dropdownBtn} ${
          isProductsActive ? styles.dropdownBtnActive : ""
        }`}
      >
        <span>Products</span>
        <Icon
          icon="carbon:chevron-down"
          className={`w-3.5 h-3.5 ml-1 inline transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[var(--brand-primary)]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease: "easeOut" } }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 360,
              mass: 0.5,
            }}
            style={{
              display: "flex",
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
            }}
          >
            <div className={styles.dropdownMenuPanel}>
              {categoryList.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center text-sm text-[var(--text-secondary)]">
                  <Icon icon="carbon:hourglass" className="w-6 h-6 text-[var(--text-muted)] mb-2 animate-pulse" />
                  <p>Loading catalog categories...</p>
                </div>
              ) : (
                /* 3-Column Dynamic Mega Menu Layout */
                <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr_320px] gap-6 lg:gap-8 items-stretch min-h-[440px]">
                  
                  {/* 1. Left Column: Categories Sidebar & Bottom Sustainability Card */}
                  <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] pb-6 lg:pb-0 lg:pr-5">
                    {/* Category Nav List */}
                    <div
                      role="tablist"
                      aria-orientation="vertical"
                      aria-label="Product categories"
                      className="flex flex-col gap-1.5"
                    >
                      {categoryList.map((cat, idx) => {
                        const isActive = cat.slug === activeCategorySlug;
                        return (
                          <button
                            key={cat.slug}
                            ref={(el) => (categoryButtonRefs.current[idx] = el)}
                            type="button"
                            role="tab"
                            id={`mega-tab-${cat.slug}`}
                            aria-selected={isActive}
                            aria-controls={`mega-panel-${cat.slug}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => handleCategoryClick(cat.slug)}
                            onMouseEnter={() => handleCategoryMouseEnter(cat.slug)}
                            onKeyDown={(e) => handleSidebarKeyDown(e, idx)}
                            style={{ borderRadius: "8px 4px 4px 8px" }}
                            className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-[8px_4px_4px_8px] text-sm transition-all duration-150 cursor-pointer text-left border ${
                              isActive
                                ? "bg-[var(--brand-soft)] text-[var(--text-brand)] border-[var(--border-brand)] border-l-[3.5px] border-l-[var(--brand-primary)] font-bold shadow-2xs"
                                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-subtle)] font-medium"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-1">
                              <Icon
                                icon={cat.icon || "carbon:box"}
                                className={`w-4.5 h-4.5 shrink-0 ${
                                  isActive
                                    ? "text-[var(--text-brand)]"
                                    : "text-[var(--text-secondary)]"
                                }`}
                              />
                              <span className="leading-snug break-words">{cat.name}</span>
                            </div>
                            <Icon
                              icon="carbon:chevron-right"
                              className={`w-3.5 h-3.5 shrink-0 ml-1.5 transition-transform ${
                                isActive
                                  ? "text-[var(--text-brand)] translate-x-0.5"
                                  : "text-[var(--text-muted)]"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Sustainability Commitment Box (Bottom Left) */}
                    <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex flex-col items-start gap-1">
                      <Icon
                        icon="carbon:recycle"
                        className="w-5 h-5 text-[var(--text-brand)] mb-1"
                      />
                      <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                        Durable products.
                        <br />
                        A cleaner tomorrow.
                      </p>
                      <div className="w-7 h-[2px] bg-[var(--brand-primary)] rounded-full my-1.5" />
                      <p className="text-[11px] text-[var(--text-muted)] leading-normal">
                        Made from recycled plastic.
                        <br />
                        Built for a sustainable world.
                      </p>
                    </div>
                  </div>

                  {/* 2. Middle Column: Product List for Active Category */}
                  <div
                    ref={panelRef}
                    role="tabpanel"
                    id={`mega-panel-${activeCategorySlug || "default"}`}
                    aria-labelledby={`mega-tab-${activeCategorySlug || "default"}`}
                    tabIndex={-1}
                    className="flex flex-col justify-between min-w-0 outline-none"
                    onMouseEnter={handleContentMouseEnter}
                    onKeyDown={handlePanelKeyDown}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {activeCategoryData && (
                        <motion.div
                          key={activeCategorySlug}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col justify-between h-full"
                        >
                          <div>
                            {/* Header */}
                            <div className="mb-4">
                              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-brand)] mb-0.5">
                                {activeCategoryData.eyebrow}
                              </span>
                              <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                                {activeCategoryData.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 leading-relaxed max-w-xl">
                                {activeCategoryData.description}
                              </p>
                            </div>

                            {/* Products List Rows */}
                            {displayProducts.length > 0 ? (
                              <div className="divide-y divide-[var(--border-subtle)]">
                                {displayProducts.map((product) => (
                                  <div
                                    key={product.id}
                                    className="py-2.5 sm:py-3 transition-colors"
                                    onMouseEnter={() => setHoveredProduct(product.raw || product)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                  >
                                    <Link
                                      to={product.targetUrl}
                                      onClick={handleLinkClick}
                                      className="flex items-center justify-between gap-3 group"
                                    >
                                      <div className="flex flex-col min-w-0 pr-2">
                                        <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--text-brand)] transition-colors truncate">
                                          {product.name}
                                        </span>
                                        {product.spec && (
                                          <span className="text-xs text-[var(--text-muted)] mt-0.5">
                                            {product.spec}
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-3 shrink-0">
                                        {product.badge && (
                                          <span className="bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-[var(--border-subtle)]">
                                            {product.badge}
                                          </span>
                                        )}
                                        <Icon
                                          icon="carbon:chevron-right"
                                          className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-brand)] group-hover:translate-x-0.5 transition-all"
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="py-8 text-center text-sm text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-lg my-3 px-4">
                                <p className="font-medium text-[var(--text-secondary)]">
                                  No products in this category yet
                                </p>
                                <p className="text-xs mt-1 text-[var(--text-muted)]">
                                  Custom configurations & sizes available upon request.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* View All Link */}
                          <div className="pt-4 mt-2">
                            <Link
                              to={`/products?cat=${encodeURIComponent(activeCategoryData.slug)}`}
                              onClick={handleLinkClick}
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--text-brand)] hover:text-[var(--brand-hover)] hover:underline transition-all"
                            >
                              <span>View all {activeCategoryData.name}</span>
                              <Icon icon="carbon:arrow-right" className="w-4 h-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 3. Right Column: Bespoke Manufacturing Spotlight & RFQ Card */}
                  <div className="bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-xl p-5 flex flex-col justify-between gap-3.5 h-full">
                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-brand)]">
                          Bespoke & Bulk Supply
                        </span>
                        <span className="text-[11px] font-medium text-[var(--text-muted)]">
                          Factory Direct
                        </span>
                      </div>

                      {/* Image Preview Box */}
                      <div className="w-full h-36 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center relative shadow-2xs mb-3.5">
                        {previewImageUrl ? (
                          <img
                            src={previewImageUrl}
                            alt={hoveredProduct?.name || activeCategoryData?.name || "Product preview"}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-[var(--text-muted)] gap-1">
                            <Icon
                              icon={activeCategoryData?.icon || "carbon:box"}
                              className="w-8 h-8 text-[var(--text-muted)]"
                            />
                            <span className="text-[11px] font-medium">Bespoke Fabrication</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <h4 className="text-base font-bold text-[var(--text-primary)] leading-snug mb-1.5">
                        Need Custom Sizes or Heavy-Duty Specs?
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        We manufacture directly to your engineering drawings. Get custom
                        dimensions, specific color formulations, or large volume dispatch.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2.5 pt-2">
                      <QuoteButton
                        to="/contact?quote=custom"
                        onClick={handleLinkClick}
                        text="Request Custom RFQ"
                        className="w-full !justify-center !text-sm !py-2.5"
                      />

                      {activeCategoryData && (
                        <button
                          type="button"
                          onClick={handleDownloadCatalog}
                          className="w-full text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-brand)] flex items-center justify-center gap-1.5 py-1 transition-colors cursor-pointer"
                          aria-label={`Download ${activeCategoryData.name} Catalog`}
                        >
                          <Icon
                            icon="carbon:download"
                            className="w-4 h-4 text-[var(--text-brand)]"
                          />
                          <span>Download {activeCategoryData.name} Catalog</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


