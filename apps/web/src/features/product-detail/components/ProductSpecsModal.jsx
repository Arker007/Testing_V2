import React from "react";
import { Icon } from "@iconify/react";
import styles from "../product-detail.module.css";

export const ProductSpecsModal = React.memo(function ProductSpecsModal({
  product,
  specs,
  onClose,
  onRequestSheet,
}) {
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.specsSheetModal}>
        <div className={styles.specsSheetHead}>
          <div className={styles.specsSheetLogo}>
            <span className={styles.catTag}>
              Technical Data Sheet
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close modal"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>

        <div className={styles.specsSheetBody}>
          <h2 className={styles.modalTitle}>
            {product.name}
          </h2>

          <div className={styles.specsTable} style={{ marginTop: "1rem" }}>
            {Object.entries(specs).length > 0 ? (
              Object.entries(specs).map(([k, v]) => (
                <div key={k} className={styles.specRow}>
                  <span className={styles.specKey}>{k}</span>
                  <span className={styles.specVal}>{v}</span>
                </div>
              ))
            ) : (
              <p style={{ padding: "1.5rem", fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
                Detailed specifications are available upon request.
              </p>
            )}
          </div>
        </div>

        <div className={styles.specsSheetFooter}>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn--outline"
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Icon icon="solar:printer-linear" className="w-4 h-4 mr-1.5 inline" /> Print Specs
          </button>
          <button
            type="button"
            onClick={onRequestSheet}
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: "center" }}
          >
            Request Official Sheet
          </button>
        </div>
      </div>
    </div>
  );
});
