/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../../shared/components/OptimizedImage";
import {
  getStaticLoadKg,
  getDynamicLoadKg,
  getRackLoadKg,
  getDimensionsStr,
  getWeightStr,
  getSkuCode,
} from "../productUtils";
import styles from "../products.module.css";

export default function ProductGridCard({
  product,
  img,
  staticLoad: propStaticLoad,
  dimStr: propDimStr,
  onQuickView,
}) {
  const categoryName = product.category_name || product.category || "Recycled Plastic";
  const title = product.name || product.title;
  const sku = getSkuCode(product);
  const dimStr = propDimStr || getDimensionsStr(product);
  const weightStr = getWeightStr(product);

  const staticVal = propStaticLoad !== undefined && propStaticLoad > 0 ? propStaticLoad : getStaticLoadKg(product);
  const dynamicVal = getDynamicLoadKg(product);
  const rackVal = getRackLoadKg(product);

  const staticLoadDisplay = staticVal > 0 ? `${staticVal.toLocaleString()} kg` : "8,000 kg";
  const dynamicLoadDisplay = dynamicVal > 0 ? `${dynamicVal.toLocaleString()} kg` : "1,300 kg";
  const rackLoadDisplay = rackVal > 0 ? `${rackVal.toLocaleString()} kg` : "500 kg";

  return (
    <motion.article
      className={styles.gridCard}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 350, damping: 22 },
      }}
    >
      {/* Upper White Card Section with Centered Image & Preserved Category Tag */}
      <div className={styles.gridCardThumbWrap}>
        <div className={styles.gridCardThumb}>
          <OptimizedImage
            src={img}
            alt={title}
            className={styles.gridCardImg}
          />
        </div>
        <span className={styles.catTag}>{categoryName}</span>
      </div>

      {/* Lower Gray Card Section with SKU, Specifications Table & Actions */}
      <div className={styles.gridCardDetails}>
        {/* Product SKU/Model Title */}
        <h3 className={styles.gridCardSkuTitle}>
          <Link to={`/products/${product.id}`} title={title}>
            {sku}
          </Link>
        </h3>

        {/* Vertical Key-Value Specifications List */}
        <div className={styles.specList}>
          <div className={styles.specRowItem}>
            <span className={styles.specRowLabel}>Dimensions</span>
            <span className={styles.specRowVal}>{dimStr}</span>
          </div>
          <div className={styles.specRowItem}>
            <span className={styles.specRowLabel}>Weight</span>
            <span className={styles.specRowVal}>{weightStr}</span>
          </div>
          <div className={styles.specRowItem}>
            <span className={styles.specRowLabel}>Static Load</span>
            <span className={styles.specRowVal}>{staticLoadDisplay}</span>
          </div>
          <div className={styles.specRowItem}>
            <span className={styles.specRowLabel}>Dynamic Load</span>
            <span className={styles.specRowVal}>{dynamicLoadDisplay}</span>
          </div>
          <div className={styles.specRowItem}>
            <span className={styles.specRowLabel}>Rack Load</span>
            <span className={styles.specRowVal}>{rackLoadDisplay}</span>
          </div>
        </div>

        {/* Primary CTA Button: "View product" */}
        <div className={styles.gridCardBtnWrap}>
          <Link to={`/products/${product.id}`} className={styles.viewProductBtn}>
            View product
          </Link>
        </div>

        {/* Secondary Action: "Technical Data Sheet" */}
        <div className={styles.datasheetLinkWrap}>
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className={styles.datasheetLink}
            title={`View Technical Data Sheet for ${title}`}
            aria-label={`View Technical Data Sheet for ${title}`}
          >
            <span>Technical Data Sheet</span>
            <span className={styles.datasheetIconBox}>
              <Icon icon="solar:arrow-down-linear" className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
