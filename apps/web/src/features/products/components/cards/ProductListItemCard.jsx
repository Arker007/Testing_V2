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

function ProductListItemCard({
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
              <Icon icon="solar:box-linear" className={styles.mobileListSpecIcon} />
              <span>{mobileLoadStr}</span>
            </div>
            <span className={styles.mobileListSpecDivider}>|</span>
            <div className={styles.mobileListSpecItem}>
              <Icon icon="solar:maximize-square-minimalistic-linear" className={styles.mobileListSpecIcon} />
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
          <Icon icon="solar:arrow-right-linear" className={styles.mobileListActionIcon} />
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

          {/* Ant Design Unified Specification Panel */}
          <div className={styles.specPanel}>
            <div className={styles.specDimRow}>
              <span className={styles.specDimLabel}>
                <Icon icon="solar:box-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />
                Dimensions
              </span>
              <span className={styles.specDimValue} title={cleanDimStr}>{cleanDimStr}</span>
            </div>

            {specsList.length > 0 && (
              <>
                <div className={styles.specDivider} />
                <div className={styles.specMetricsGrid}>
                  {specsList.map((item, i) => (
                    <div key={item.label || i} className={styles.specMetricItem}>
                      <span className={styles.specMetricHeader} title={item.title || item.label}>
                        <Icon icon={item.icon} className="w-3 h-3 text-[var(--brand-primary)]/80 shrink-0" />
                        {item.label}
                      </span>
                      <span className={styles.specMetricValue} title={item.value}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.listCardActions}>
          <Link to={`/products/${product.id}`} className={styles.primaryViewBtn}>
            <span>View Product</span>
            <Icon icon="solar:arrow-right-linear" className={`w-4 h-4 ml-1 ${styles.primaryViewArrow}`} />
          </Link>

          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className={styles.datasheetTextLink}
            title={`View Product Specs for ${title}`}
            aria-label={`View Product Specs for ${title}`}
          >
            <Icon icon="solar:document-text-linear" className="w-3.5 h-3.5 mr-1.5" />
            <span className={styles.datasheetText}>Product Specs</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default React.memo(ProductListItemCard);

