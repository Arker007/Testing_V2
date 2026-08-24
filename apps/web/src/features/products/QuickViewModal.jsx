/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../shared/components/OptimizedImage";
import QuoteButton from "../../shared/components/QuoteButton";
import styles from "../../pages/Products.module.css";

export default function QuickViewModal({
  product,
  onClose,
  img,
  staticLoad,
  dimStr,
  headline,
}) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const categoryName = product?.category_name || product?.category || "Recycled Plastic";
  const title = product?.name || product?.title || "";
  const skuId = product?.id ? String(product.id).slice(-6) : "PROD";

  const modalContent = (
    <AnimatePresence>
      {product && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className={styles.modalCard}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
          >
            {/* Close button */}
            <motion.button
              type="button"
              onClick={onClose}
              className={styles.modalCloseBtn}
              aria-label="Close modal"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
            </motion.button>

            {/* Header category and SKU row */}
            <div className={styles.modalHeaderRow}>
              <span className={styles.modalCategoryBadge}>{categoryName}</span>
              <span className={styles.modalSkuBadge}>
                ID: #{skuId}
              </span>
            </div>

            {/* Modal Title */}
            <h2 id="quick-view-title" className={styles.modalTitle}>{title}</h2>

            {/* Product Image */}
            <div className={styles.modalImageContainer}>
              <OptimizedImage
                src={img}
                alt={title}
                className={styles.modalImg}
              />
            </div>

            {/* Headline / Summary */}
            {headline && <p className={styles.modalDescription}>{headline}</p>}

            {/* Specs Table Grid */}
            <div className={styles.modalSpecsGrid}>
              <div className={styles.modalSpecCell}>
                <span className={styles.modalSpecLabel}>Dimensions</span>
                <strong className={styles.modalSpecValue}>{dimStr}</strong>
              </div>
              <div className={styles.modalSpecCell}>
                <span className={styles.modalSpecLabel}>Static Load</span>
                <strong className={styles.modalSpecValue}>
                  {staticLoad > 0 ? `${staticLoad.toLocaleString()} kg` : "Heavy Industrial"}
                </strong>
              </div>
              <div className={styles.modalSpecCell}>
                <span className={styles.modalSpecLabel}>Composition</span>
                <strong className={styles.modalSpecValue}>100% Recycled Plastic</strong>
              </div>
              <div className={styles.modalSpecCell}>
                <span className={styles.modalSpecLabel}>Maintenance</span>
                <strong className={styles.modalSpecValue}>Zero Maintenance</strong>
              </div>
            </div>

            {/* Highlights List */}
            <div className={styles.modalHighlights}>
              <div className={styles.highlightItem}>
                <Icon icon="solar:check-circle-linear" className={`${styles.checkIcon} w-4 h-4`} />
                <span>Water, termite & rot proof section</span>
              </div>
              <div className={styles.highlightItem}>
                <Icon icon="solar:check-circle-linear" className={`${styles.checkIcon} w-4 h-4`} />
                <span>Can be sawn, drilled & screwed like wood</span>
              </div>
            </div>

            {/* Actions Row */}
            <div className={styles.modalActionsRow}>
              <QuoteButton
                to={`/contact?product=${product.id}`}
                onClick={onClose}
                text="Request B2B Quote"
                style={{ flex: 1, padding: "0.75rem 1rem", fontSize: "0.875rem", justifyContent: "center" }}
              />
              <Link
                to={`/products/${product.id}`}
                onClick={onClose}
                className={styles.modalDetailsBtn}
              >
                <span>Full Specs Page</span>
                <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

