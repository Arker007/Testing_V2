import React from "react";
import styles from "./AdminCatalog.module.css";

export default function CatalogSidebar({
  catalogTitle,
  setCatalogTitle,
  catalogYear,
  setCatalogYear,
  products,
  selectedProductIds,
  handleSelectAll,
  handleProductToggle,
}) {
  return (
    <aside className={styles.controlsSidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>
          <i className="fa-solid fa-book-open" />
          Catalog Setup
        </h2>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.formGroup}>
          <label>Catalog Title</label>
          <input
            type="text"
            value={catalogTitle}
            onChange={(e) => setCatalogTitle(e.target.value)}
            placeholder="e.g. Recycled Pallets Catalog"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Calendar Year / Vol</label>
          <input
            type="text"
            value={catalogYear}
            onChange={(e) => setCatalogYear(e.target.value)}
            placeholder="e.g. 2024 | 25"
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.sectionTitle}>
            <span>Included Products</span>
            <button
              type="button"
              onClick={handleSelectAll}
              style={{
                background: "none",
                border: "none",
                color: "var(--brand-dark)",
                fontSize: "0.7rem",
                fontWeight: 800,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              {selectedProductIds.length === products.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <div className={styles.checkboxList}>
            {products.map((p) => (
              <label key={p.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={selectedProductIds.includes(p.id)}
                  onChange={() => handleProductToggle(p.id)}
                />
                <span>{p.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sidebarFooter}>
        <button
          type="button"
          className={styles.toolbarBtnPrimary}
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => window.print()}
        >
          <i className="fa-solid fa-file-pdf" /> Export PDF Catalog
        </button>
      </div>
    </aside>
  );
}
