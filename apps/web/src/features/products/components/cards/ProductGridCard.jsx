/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { OptimizedImage } from "@/shared/ui";
import {
  getDimensionsStr,
  getSkuCode,
  getProductCardSpecs,
} from "../../utils/product.utils";
import styles from "../../products.module.css";

export default function ProductGridCard({
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

  // Calculate subtle column-based stagger delay (up to 3 columns: 0ms, 40ms, 80ms)
  const staggerDelay = (index % 3) * 0.04;

  return (
    <motion.article
      className={styles.gridCard}
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
          <OptimizedImage
            src={img}
            alt={title}
            className={styles.gridCardImg}
          />
        </div>
        {categoryName && <span className={styles.catTag}>{categoryName}</span>}
      </div>

      <div className={styles.gridCardDetails}>
        <div className={styles.skuRow}>
          <span className={styles.skuCode}>{sku}</span>
          {isCustomizable && <span className={styles.customBadge}>Customizable</span>}
        </div>
        <h3 className={styles.gridCardSkuTitle}>
          <Link to={`/products/${product.id}`} title={title} className="line-clamp-2">
            {title}
          </Link>
        </h3>

        {/* Dimensions Standalone Block with fixed baseline */}
        <div className={styles.dimBlock}>
          <div className={styles.dimIconWrap}>
            <Icon icon="solar:box-minimalistic-linear" className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div className={styles.dimContent}>
            <span className={styles.dimLabel}>Dimensions</span>
            <span className={styles.dimValue} title={cleanDimStr}>{cleanDimStr}</span>
          </div>
        </div>

        <hr className={styles.cardDivider} />

        {/* 2x2 Specs Grid - Category Aware Metrics */}
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

        <div className={styles.gridCardActions}>
          <Link to={`/products/${product.id}`} className={styles.primaryViewBtn}>
            <span>View product</span>
            <Icon icon="solar:arrow-right-linear" className={`w-4 h-4 ml-1 ${styles.primaryViewArrow}`} />
          </Link>

          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className={styles.datasheetTextLink}
            title={`View Technical Data Sheet for ${title}`}
            aria-label={`View Technical Data Sheet for ${title}`}
          >
            <Icon icon="solar:document-text-linear" className="w-4 h-4 mr-1.5" />
            <span className={styles.datasheetText}>Technical Data Sheet</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
