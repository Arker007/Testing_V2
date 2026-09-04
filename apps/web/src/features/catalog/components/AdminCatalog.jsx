import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../styles/AdminCatalog.module.css";
import CatalogSidebar from "./CatalogSidebar";
import { pad } from "../utils/catalog.utils";
import { useAdminCatalog } from "../hooks/useAdminCatalog";

export default function AdminCatalog() {
  const { setHeaderActions } = useOutletContext() || {};
  const {
    products,
    company,
    loading,
    selectedProductIds,
    catalogYear, setCatalogYear,
    catalogTitle, setCatalogTitle,
    splitView, setSplitView,
    activeSpreadIdx, setActiveSpreadIdx,
    spreads,
    handleProductToggle,
    handleSelectAll,
  } = useAdminCatalog();

  useEffect(() => {
    if (!setHeaderActions) return;
    setHeaderActions(
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className={splitView ? styles.toolbarBtnActive : styles.toolbarBtn}
          onClick={() => setSplitView((prev) => !prev)}
        >
          <Icon icon={splitView ? "solar:eye-closed-linear" : "solar:eye-linear"} className="w-4 h-4 inline mr-1" />
          {splitView ? "Hide Template" : "Show Template Spread"}
        </button>
        <button
          type="button"
          className={styles.toolbarBtnPrimary}
          onClick={() => window.print()}
        >
          <Icon icon="solar:printer-linear" className="w-4 h-4 inline mr-1" />
          Print / Save PDF
        </button>
      </div>
    );
    return () => setHeaderActions(null);
  }, [setHeaderActions, splitView, setSplitView]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Icon
          icon="solar:restart-linear"
          className="w-10 h-10 animate-spin text-[var(--brand)]"
        />
      </div>
    );
  }

  const currentSpread = spreads[activeSpreadIdx] || spreads[0];
  const imgName = `Repall-Catalog-2024-2025_pages-to-jpg-${pad(
    activeSpreadIdx + 1,
    4
  )}.jpg`;
  const templateImg = `/catlog-design/${imgName}`;

  return (
    <div className={styles.container}>
      <CatalogSidebar
        catalogTitle={catalogTitle}
        setCatalogTitle={setCatalogTitle}
        catalogYear={catalogYear}
        setCatalogYear={setCatalogYear}
        products={products}
        selectedProductIds={selectedProductIds}
        handleSelectAll={handleSelectAll}
        handleProductToggle={handleProductToggle}
      />

      <main className={styles.viewport}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              type="button"
              className={styles.toolbarBtn}
              disabled={activeSpreadIdx === 0}
              onClick={() => setActiveSpreadIdx((idx) => Math.max(0, idx - 1))}
            >
              <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4 inline mr-1" /> Prev
            </button>

            <span className={styles.pageIndicator}>
              Spread {activeSpreadIdx + 1} of {spreads.length}
            </span>

            <button
              type="button"
              className={styles.toolbarBtn}
              disabled={activeSpreadIdx === spreads.length - 1}
              onClick={() =>
                setActiveSpreadIdx((idx) =>
                  Math.min(spreads.length - 1, idx + 1)
                )
              }
            >
              Next <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 inline ml-1" />
            </button>
          </div>

          <div className={styles.toolbarRight}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
              }}
            >
              Total Spreads: {spreads.length} ({spreads.length * 2} Pages)
            </span>
          </div>
        </div>

        <div className={styles.canvas} id="catalog-canvas">
          <div className={styles.splitWorkspace}>
            <div className={styles.spreadContainer}>
              <span className={styles.spreadSpreadTitle}>
                Live Generated Preview ({company.name || "VISHAL ENTERPRISE"})
              </span>
              <div className={styles.catalog} id="generated-spread">
                {currentSpread?.left}
                {currentSpread?.right}
              </div>
            </div>

            {splitView && (
              <div className={styles.spreadContainer}>
                <span className={styles.spreadSpreadTitle}>
                  Original Design Template (RePall Ref)
                </span>
                <div className={styles.templateSpread}>
                  <span className={styles.templateLabel}>
                    Original Spec Reference
                  </span>
                  <img
                    src={templateImg}
                    alt="Original Template"
                    className={styles.templateImage}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
