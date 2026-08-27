/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../../shared/components/OptimizedImage";
import styles from "../products.module.css";

export default function ProductListItemCard({
  product,
  img,
  staticLoad,
  dimStr,
  onQuickView,
}) {
  const categoryName = product.category_name || product.category || "Recycled Plastic";
  const title = product.name || product.title;
  const description = product.description || "High-performance recycled plastic section engineered for high mechanical strength and weather resistance.";

  return (
    <motion.article
      className={styles.listCard}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
    >
      <div className={styles.listCardThumb}>
        <OptimizedImage
          src={img}
          alt={title}
          className={styles.listCardImg}
        />
        <span className={styles.catTagMobile}>{categoryName}</span>
      </div>

      <div className={styles.listCardBody}>
        <div className={styles.listMetaRow}>
          <span className={styles.catTagDesktop}>{categoryName}</span>
          {product.sku && <span className={styles.skuBadge}>SKU: {product.sku}</span>}
        </div>

        <h3 className={styles.listCardTitle}>
          <Link to={`/products/${product.id}`}>{title}</Link>
        </h3>

        <p className={styles.listDescription}>{description}</p>

        <div className={styles.listSpecsLine}>
          <div className={styles.listSpecBadge}>
            <span>Size:</span>
            <strong>{dimStr}</strong>
          </div>
          <div className={styles.listSpecBadge}>
            <span>Static Load:</span>
            <strong>{staticLoad > 0 ? `${staticLoad.toLocaleString()} kg` : "Custom"}</strong>
          </div>
          <div className={styles.listSpecBadge}>
            <span>Material:</span>
            <strong>100% Recycled PE/PP</strong>
          </div>
        </div>
      </div>

      <div className={styles.listActions}>
        <motion.div whileTap={{ scale: 0.97 }}>
          <Link to={`/products/${product.id}`} className={styles.detailsBtn}>
            <span>View Details</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          </Link>
        </motion.div>
        <motion.button
          type="button"
          onClick={() => onQuickView(product)}
          className={styles.quickSpecsBtn}
          title="Quick View Specs"
          aria-label={`Quick View ${title}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <Icon icon="solar:eye-linear" className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
}
