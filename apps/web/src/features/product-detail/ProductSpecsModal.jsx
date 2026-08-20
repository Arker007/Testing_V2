import React from "react";
import styles from "../../pages/ProductDetail.module.css";

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
            <i className="fa-solid fa-xmark" />
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
            <i className="fa-solid fa-print" /> Print Specs
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
