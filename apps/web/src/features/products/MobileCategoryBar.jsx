import React from "react";
import styles from "../../pages/Products.module.css";

export default function MobileCategoryBar({
  categoryOptions,
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
}) {
  return (
    <div className={styles.mobileCategoryBar}>
      <div className={styles.mobileChipsTrack}>
        {categoryOptions.map((catName) => {
          const isSelected = selectedCategory === catName;
          const count = categoryCounts[catName];
          return (
            <button
              key={catName}
              type="button"
              onClick={() => setSelectedCategory(catName)}
              className={`${styles.mobileChip} ${isSelected ? styles.mobileChipActive : ""}`}
            >
              <span>{catName === "All" ? "All Products" : catName}</span>
              {count !== undefined && count > 0 && (
                <span className={styles.mobileChipCount}>{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
