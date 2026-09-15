import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/shared/ui";
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
        <Button
          type="button"
          variant={splitView ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSplitView((prev) => !prev)}
          icon={<Icon icon={splitView ? "carbon:view-off" : "carbon:view"} className="w-4 h-4 mr-1" />}
        >
          {splitView ? "Hide Template" : "Show Template Spread"}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => window.print()}
          icon={<Icon icon="carbon:printer" className="w-4 h-4 mr-1" />}
        >
          Print / Save PDF
        </Button>
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
          icon="carbon:renew"
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={activeSpreadIdx === 0}
              onClick={() => setActiveSpreadIdx((idx) => Math.max(0, idx - 1))}
              icon={<Icon icon="carbon:chevron-left" className="w-4 h-4 mr-1" />}
            >
              Prev
            </Button>

            <span className={styles.pageIndicator}>
              Spread {activeSpreadIdx + 1} of {spreads.length}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={activeSpreadIdx === spreads.length - 1}
              onClick={() =>
                setActiveSpreadIdx((idx) =>
                  Math.min(spreads.length - 1, idx + 1)
                )
              }
              icon={<Icon icon="carbon:chevron-right" className="w-4 h-4 ml-1 order-last" />}
            >
              Next
            </Button>
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
