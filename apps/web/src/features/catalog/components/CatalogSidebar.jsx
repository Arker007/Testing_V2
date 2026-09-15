import React from "react";
import { Icon } from "@iconify/react";
import { Input, Button } from "@/shared/ui";
import styles from "../styles/AdminCatalog.module.css";

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
          <Icon icon="carbon:book" className="w-5 h-5 text-[var(--brand)]" />
          Catalog Setup
        </h2>
      </div>

      <div className={styles.sidebarSection}>
        <div className="space-y-4">
          <Input
            label="Catalog Title"
            value={catalogTitle}
            onChange={(e) => setCatalogTitle(e.target.value)}
            placeholder="e.g. Recycled Pallets Catalog"
          />

          <Input
            label="Calendar Year / Vol"
            value={catalogYear}
            onChange={(e) => setCatalogYear(e.target.value)}
            placeholder="e.g. 2024 | 25"
          />
        </div>

        <div className={`${styles.formGroup} mt-4`}>
          <div className={styles.sectionTitle}>
            <span>Included Products</span>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={handleSelectAll}
              className="text-xs uppercase font-bold"
            >
              {selectedProductIds.length === products.length
                ? "Deselect All"
                : "Select All"}
            </Button>
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
        <Button
          type="button"
          variant="primary"
          fullWidth
          size="md"
          onClick={() => window.print()}
          icon={<Icon icon="carbon:printer" className="w-4 h-4 mr-1.5" />}
        >
          Export PDF Catalog
        </Button>
      </div>
    </aside>
  );
}
