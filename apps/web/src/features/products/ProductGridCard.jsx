/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../shared/components/OptimizedImage";
import styles from "../../pages/Products.module.css";

export default function ProductGridCard({
  product,
  img,
  staticLoad,
  dimStr,
  onQuickView,
}) {
  const categoryName = product.category_name || product.category || "Recycled Plastic";
  const title = product.name || product.title;

  return (
    <motion.article
      className={styles.gridCard}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 350, damping: 22 },
      }}
    >
      <div className={styles.gridCardTop}>
        {/* Thumbnail Image Box */}
        <div className={styles.gridCardThumb}>
          <OptimizedImage
            src={img}
            alt={title}
            className={styles.gridCardImg}
          />
          <span className={styles.catTag}>{categoryName}</span>
        </div>

        {/* Content Body */}
        <div className={styles.gridCardBody}>
          <h3 className={styles.gridCardTitle}>
            <Link to={`/products/${product.id}`} title={title}>
              {title}
            </Link>
          </h3>

          {/* Key Specifications Grid */}
          <div className={styles.specsRow}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>
                <Icon icon="solar:layers-minimalistic-linear" className="w-3 h-3 inline mr-1" /> Size / Profile
              </span>
              <span className={styles.specValue}>{dimStr}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>
                <Icon icon="solar:box-minimalistic-linear" className="w-3 h-3 inline mr-1" /> Static Load
              </span>
              <span className={styles.specValue}>
                {staticLoad > 0 ? `${staticLoad.toLocaleString()} kg` : "Custom Grade"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className={styles.gridCardActions}>
        <motion.div style={{ flex: 1 }} whileTap={{ scale: 0.97 }}>
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
