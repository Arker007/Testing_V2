/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import OptimizedImage from "../media/OptimizedImage";
import Badge from "./Badge";
import styles from "@/features/products/products.module.css";
import {
  getDimensionsStr,
  getSkuCode,
  getProductCardSpecs,
  getStaticLoadKg,
  getDynamicLoadKg,
} from "@/features/products/utils/product.utils";

/**
 * Format category name cleanly
 */
function formatCategory(cat) {
  if (!cat) return "Industrial Plastics";
  const cleaned = String(cat).replace(/[-_]/g, " ").trim();
  const lower = cleaned.toLowerCase();
  if (lower === "pallets" || lower === "pallet") return "Plastic Pallets";
  if (lower === "garden bench" || lower === "benches" || lower === "bench") return "Garden Benches";
  if (lower === "lumber" || lower === "plastic lumber") return "Plastic Lumber";
  return cleaned.toUpperCase();
}

/**
 * Extract image from product object or string
 */
function resolveProductImage(product, propImg) {
  if (propImg) return propImg;
  if (!product) return null;
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
  return product.img || null;
}

/**
 * ProductCard Component
 * Consolidated enterprise product card supporting 'grid' and 'compact' display variants.
 *
 * @param {Object} props
 * @param {Object} props.product - Product data object
 * @param {'grid' | 'compact'} [props.variant='grid'] - Card layout variant
 * @param {string} [props.img] - Image URL override
 * @param {string} [props.dimStr] - Dimensions override string
 * @param {string} [props.staticLoad] - Static load override
 * @param {() => void} [props.onQuickView] - Quick view action handler
 * @param {number} [props.index=0] - Column stagger index
 * @param {string} [props.className=''] - Extra custom class
 */
export default function ProductCard({
  product,
  variant = "grid",
  img: propImg,
  dimStr: propDimStr,
  staticLoad: propStaticLoad,
  onQuickView,
  index = 0,
  className = "",
}) {
  if (!product) return null;

  const imageSrc = resolveProductImage(product, propImg);
  const title = product.name || product.title || "Industrial Product";
  const rawCat = product.category_name || product.category || product.category_title || "";
  const categoryName = formatCategory(rawCat);
  const sku = getSkuCode ? getSkuCode(product) : (product.sku || `VE-${String(product.id || "").slice(0, 4).toUpperCase()}`);

  // Format dimensions
  const baseDimStr = propDimStr || (getDimensionsStr ? getDimensionsStr(product) : (product.dimensions || product.size || ""));
  let cleanDimStr = String(baseDimStr || "")
    .replace(/\s*\([Ll]\s*[x×]\s*[Ww]\s*[x×]\s*[Hh]\)/g, "")
    .replace(/\s*[xX]\s*/g, " × ")
    .trim();

  const isCustomizable =
    cleanDimStr.toLowerCase().includes("customizable") ||
    Boolean(product.is_custom || product.customizable);

  cleanDimStr = cleanDimStr.replace(/\s*\([Cc]ustomizable\)/g, "").trim();
  if (!cleanDimStr) {
    cleanDimStr = "1200 × 1000 × 160 mm";
  }

  // Compact Variant (e.g. Related Products, Mini Showcases)
  if (variant === "compact") {
    // 1. Safe price parsing without NaN errors
    const cleanPriceRaw = String(product.price || "").replace(/[^0-9.]/g, "");
    const numPrice = Number(cleanPriceRaw);
    const hasNumericPrice = !isNaN(numPrice) && numPrice > 0;
    const priceText = hasNumericPrice
      ? `₹${numPrice.toLocaleString("en-IN")}`
      : "Get Factory Quote";
    const priceSub = hasNumericPrice
      ? "Ex-factory Ankleshwar"
      : "Wholesale bulk pricing";

    // 2. Dynamic contextual badge instead of repeating "Verified Spec" on every card
    let badgeText = product.badge || "";
    let badgeVariant = "brand";
    let badgeIcon = "carbon:certificate";

    if (!badgeText) {
      const lowerTitle = (title || "").toLowerCase();
      if (lowerTitle.includes("rackable")) {
        badgeText = "Rackable";
        badgeVariant = "brand";
        badgeIcon = "carbon:layers";
      } else if (lowerTitle.includes("export") || lowerTitle.includes("euro")) {
        badgeText = "Export Grade";
        badgeVariant = "info";
        badgeIcon = "carbon:delivery-truck";
      } else if (lowerTitle.includes("reversible")) {
        badgeText = "Reversible";
        badgeVariant = "neutral";
        badgeIcon = "carbon:arrows-vertical";
      } else if (lowerTitle.includes("2-way")) {
        badgeText = "2-Way Entry";
        badgeVariant = "neutral";
        badgeIcon = "carbon:direction-fork";
      } else if (lowerTitle.includes("4-way")) {
        badgeText = "4-Way Entry";
        badgeVariant = "brand";
        badgeIcon = "carbon:arrows-horizontal";
      } else if (lowerTitle.includes("heavy-duty") || lowerTitle.includes("heavy duty")) {
        badgeText = "Heavy Duty";
        badgeVariant = "brand";
        badgeIcon = "carbon:shield-check";
      } else if (product.verified !== false) {
        badgeText = "Factory Direct";
        badgeVariant = "success";
        badgeIcon = "carbon:checkmark-outline";
      }
    }

    // 3. Compact Key Specifications
    const sLoad = getStaticLoadKg ? getStaticLoadKg(product) : 0;
    const dLoad = getDynamicLoadKg ? getDynamicLoadKg(product) : 0;
    const loadStr = sLoad > 0
      ? `Static: ${sLoad.toLocaleString()} kg`
      : dLoad > 0
      ? `Dynamic: ${dLoad.toLocaleString()} kg`
      : "Heavy-duty Grade";

    return (
      <Link
        to={`/products/${product.id}`}
        className={`group flex flex-col bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--bg-surface,#1e2530)] border border-[var(--border-default)] rounded-[12px] p-3 shadow-xs hover:shadow-md hover:border-[var(--brand-primary,#059669)] transition-all duration-300 no-underline ${className}`.trim()}
      >
        {/* Inset Inner Image Card */}
        <div className="relative aspect-4/3 w-full bg-[var(--bg-surface-secondary)] dark:bg-slate-900/60 rounded-[8px] overflow-hidden border border-[var(--border-subtle)] flex items-center justify-center">
          {badgeText && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <Badge variant={badgeVariant} size="xs" icon={badgeIcon}>
                {badgeText}
              </Badge>
            </div>
          )}

          {imageSrc ? (
            <OptimizedImage
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block"
            />
          ) : (
            <Icon icon="carbon:image" className="w-10 h-10 text-[var(--text-muted)]" />
          )}
        </div>

        <div className="pt-3 pb-1 px-1 flex flex-col flex-1 gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {categoryName}
          </span>

          {/* Expanded title (line-clamp-2) with uniform minimum height */}
          <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary,#059669)] transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] leading-snug">
            {title}
          </h3>

          {/* Quick Specifications Strip for buyers */}
          <div className="flex flex-col gap-1.5 py-1 text-xs">
            <div className="flex items-center gap-1.5 text-[var(--text-secondary)] font-medium">
              <Icon icon="carbon:box" className="w-3.5 h-3.5 text-[var(--brand-primary,#059669)] shrink-0" />
              <span className="truncate">{cleanDimStr}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
              <Icon icon="carbon:security" className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{loadStr}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--border-subtle)] mt-auto">
            <div className="flex flex-col min-w-0">
              <span className={`text-xs font-bold font-mono ${hasNumericPrice ? "text-[var(--text-primary)]" : "text-[var(--brand-primary,#059669)]"}`}>
                {priceText}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] truncate">
                {priceSub}
              </span>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[var(--radius-btn,6px)] bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] text-xs font-semibold group-hover:bg-[var(--brand-primary,#059669)] group-hover:text-white transition-all shrink-0">
              <span>Specs</span>
              <Icon icon="carbon:arrow-right" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Grid Variant (Catalog & Products Page)
  const staggerDelay = (index % 3) * 0.04;
  const specsList = getProductCardSpecs ? getProductCardSpecs(product, propStaticLoad) : [];

  return (
    <motion.article
      className={`${styles.gridCard || "flex flex-col bg-white dark:bg-surface rounded-card border border-slate-200/90 dark:border-subtle overflow-hidden shadow-xs hover:shadow-card-hover hover:border-[var(--brand-primary)]/50 transition-all duration-300"} ${className}`.trim()}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "60px 0px" }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.28,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className={styles.gridCardThumbWrap}>
        <div className={styles.gridCardThumb}>
          {imageSrc ? (
            <OptimizedImage
              src={imageSrc}
              alt={title}
              className={styles.gridCardImg}
            />
          ) : (
            <Icon icon="carbon:image" className="w-10 h-10 text-[var(--text-muted)]" />
          )}
        </div>
        {categoryName && <span className={styles.catTag}>{categoryName}</span>}
      </div>

      <div className={styles.gridCardDetails}>
        <div className={styles.skuRow}>
          <span className={styles.skuCode}>{sku}</span>
          {isCustomizable && <Badge variant="outline" size="xs">Customizable</Badge>}
        </div>

        <h3 className={styles.gridCardSkuTitle}>
          <Link to={`/products/${product.id}`} title={title} className="line-clamp-2">
            {title}
          </Link>
        </h3>

        {/* Dimensions Standalone Block */}
        <div className={styles.dimBlock}>
          <div className={styles.dimIconWrap}>
            <Icon icon="carbon:box" className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div className={styles.dimContent}>
            <span className={styles.dimLabel}>Dimensions</span>
            <span className={styles.dimValue} title={cleanDimStr}>{cleanDimStr}</span>
          </div>
        </div>

        <hr className={styles.cardDivider} />

        {/* 2x2 Specs Bento Grid */}
        {specsList.length > 0 && (
          <div className={styles.bentoGrid}>
            {specsList.map((item, i) => (
              <div key={item.label || i} className={styles.bentoItem}>
                <div className={styles.bentoIconWrap}>
                  <Icon icon={item.icon} className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                </div>
                <div className={styles.bentoContent}>
                  <span className={styles.bentoLabel} title={item.title || item.label}>{item.label}</span>
                  <span className={styles.bentoValue} title={item.value}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.gridCardActions}>
          <Link to={`/products/${product.id}`} className={styles.primaryViewBtn}>
            <span>View product</span>
            <Icon icon="carbon:arrow-right" className={`w-4 h-4 ml-1 ${styles.primaryViewArrow}`} />
          </Link>

          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className={styles.datasheetTextLink}
            title={`View Product Specs for ${title}`}
            aria-label={`View Product Specs for ${title}`}
          >
            <Icon icon="carbon:document" className="w-4 h-4 mr-1.5" />
            <span className={styles.datasheetText}>Product Specs</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
