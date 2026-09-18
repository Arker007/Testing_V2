/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { OptimizedImage, Badge } from "@/shared/ui";
import {
  getDimensionsStr,
  getSkuCode,
  getProductCardSpecs,
  getProductCardBadge,
  getProductShortDesc,
  getMobileLoadSpec,
  getMobileDimSpec,
} from "../../utils/product.utils";
import styles from "../../products.module.css";

export default function ProductListItemCard({
  product,
  img,
  staticLoad: propStaticLoad,
  dimStr: propDimStr,
  onQuickView,
  index = 0,
}) {
  const rawCat = product.category_name || product.category || product.category_title || "";
  const formatCategory = (cat) => {
    if (!cat) return "Industrial Plastics";
    const cleaned = String(cat).replace(/[-_]/g, " ").trim();
    if (cleaned.toLowerCase() === "pallets" || cleaned.toLowerCase() === "pallet") return "Plastic Pallets";
    if (cleaned.toLowerCase() === "garden bench" || cleaned.toLowerCase() === "benches") return "Garden Benches";
    return cleaned.toUpperCase();
  };
  const categoryName = formatCategory(rawCat);
  const title = product.name || product.title;
  const sku = getSkuCode(product);
  const dimStr = propDimStr || getDimensionsStr(product);
  const specsList = getProductCardSpecs(product, propStaticLoad);
  const description = product.description || product.summary || "";

  // Mobile-specific data
  const mobileBadgeText = getProductCardBadge(product);
  const mobileShortDesc = getProductShortDesc(product);
  const mobileLoadStr = getMobileLoadSpec(product, propStaticLoad);
  const mobileDimStr = getMobileDimSpec(product, propDimStr);

  // Clean dimensions string and standardize with mathematical multiplication sign
  let cleanDimStr = (dimStr || "")
    .replace(/\s*\([Ll]\s*[x×]\s*[Ww]\s*[x×]\s*[Hh]\)/g, "")
    .replace(/\s*[xX]\s*/g, " × ")
    .trim();

  const isCustomizable = cleanDimStr.toLowerCase().includes("customizable") || 
                        Boolean(product.is_custom || product.customizable);
  
  cleanDimStr = cleanDimStr.replace(/\s*\([Cc]ustomizable\)/g, "").trim();

  if (!cleanDimStr) {
    cleanDimStr = "1800 × 650 × 820 mm";
  }

  const staggerDelay = Math.min((index % 6) * 0.04, 0.2);

  return (
    <motion.article
      className={styles.listCard}
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
      {/* Mobile Card Layout (<= 768px: matches requested compact horizontal card with badge, title, desc, specs & circular arrow) */}
      <div className={styles.mobileListCard}>
        <Link to={`/products/${product.id}`} className={styles.mobileListThumbLink} aria-label={title}>
          <div className={styles.mobileListThumb}>
            <OptimizedImage
              src={img}
              alt={title}
              className={styles.mobileListImg}
            />
          </div>
        </Link>

        <div className={styles.mobileListDetails}>
          <div className={styles.mobileListBadgeRow}>
            <span className={styles.mobileListBadge}>{mobileBadgeText}</span>
          </div>

          <h3 className={styles.mobileListTitle}>
            <Link to={`/products/${product.id}`} title={title}>
              {title}
            </Link>
          </h3>

          {mobileShortDesc && (
            <p className={styles.mobileListDesc}>{mobileShortDesc}</p>
          )}

          <div className={styles.mobileListSpecsRow}>
            <div className={styles.mobileListSpecItem}>
              <Icon icon="carbon:box" className={styles.mobileListSpecIcon} />
              <span>{mobileLoadStr}</span>
            </div>
            <span className={styles.mobileListSpecDivider}>|</span>
            <div className={styles.mobileListSpecItem}>
              <Icon icon="carbon:maximize" className={styles.mobileListSpecIcon} />
              <span>{mobileDimStr}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/products/${product.id}`}
          className={styles.mobileListActionBtn}
          title={`View details for ${title}`}
          aria-label={`View details for ${title}`}
        >
          <Icon icon="carbon:arrow-right" className={styles.mobileListActionIcon} />
        </Link>
      </div>

      {/* Desktop Card Layout (> 768px: multi-column layout with SKU, full bento specs, and dual actions) */}
      <div className={styles.desktopListCard}>
        <div className={styles.listCardThumbWrap}>
          <div className={styles.listCardThumb}>
            <OptimizedImage
              src={img}
              alt={title}
              className={styles.listCardImg}
            />
          </div>
          {categoryName && <span className={styles.catTag}>{categoryName}</span>}
        </div>

        <div className={styles.listCardDetails}>
          <div className={styles.skuRow}>
            <span className={styles.skuCode}>{sku}</span>
            {isCustomizable && <Badge variant="outline" size="xs">Customizable</Badge>}
          </div>

          <h3 className={styles.listCardSkuTitle}>
            <Link to={`/products/${product.id}`} title={title}>
              {title}
            </Link>
          </h3>

          {description && (
            <p className={styles.listCardDesc}>{description}</p>
          )}

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

          {/* Category-Aware Specs Grid */}
          <div className={styles.listBentoGrid}>
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
        </div>

        <div className={styles.listCardActions}>
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
