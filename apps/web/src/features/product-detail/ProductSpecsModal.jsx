import React from "react";
import styles from "../../pages/ProductDetail.module.css";

export const ProductSpecsModal = React.memo(function ProductSpecsModal({
  product,
  specs,
  onClose,
  onRequestSheet,
}) {
  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalCard} style={{ maxWidth: "600px" }}>
        <button
          type="button"
          onClick={onClose}
          className={styles.modalCloseBtn}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className={styles.catTag} style={{ position: "static" }}>
            Technical Data Sheet
          </span>
        </div>
        <h2 className={styles.gridCardTitle} style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          {product.name}
        </h2>

        <div className={styles.modalSpecsBox} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
          {Object.entries(specs).length > 0 ? (
            Object.entries(specs).map(([k, v]) => (
              <div key={k} style={{ padding: "0.25rem 0" }}>
                <span className={styles.specLabel} style={{ fontSize: "0.75rem", color: "#64748b" }}>{k}</span>
                <strong className={styles.specValue} style={{ display: "block", fontSize: "0.875rem", color: "#0f172a" }}>{v}</strong>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "span 2", fontSize: "0.875rem", color: "#64748b" }}>
              Detailed specifications are available upon request.
            </p>
          )}
        </div>

        <div className={styles.modalActions} style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
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
