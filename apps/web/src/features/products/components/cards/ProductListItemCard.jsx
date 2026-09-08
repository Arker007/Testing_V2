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
          {isCustomizable && <span className={styles.customBadge}>Customizable</span>}
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
            <Icon icon="solar:box-minimalistic-linear" className="w-4 h-4 text-slate-700 dark:text-slate-300" />
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
    </motion.article>
  );
}
