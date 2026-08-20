import React from "react";
import styles from "../AdminCatalog.module.css";
import { pad, getProductImage, getSpecs, getDynamicColors } from "../catalog.utils";

export const renderIndexRow = (item, pageNum, idx) => {
  const imgUrl = getProductImage(item);
  const specs = getSpecs(item);
  const size = specs["Dimensions"] || specs["Size"] || "1200 X 1000 mm";
  const colors = getDynamicColors(item);
  const isEven = idx % 2 === 0;

  return (
    <div
      key={item.id || idx}
      className={isEven ? styles.indexRowEven : styles.indexRowOdd}
    >
      <div className={styles.indexCellName}>{item.name}</div>
      <div className={styles.indexCellColors}>
        {colors.map((color, cIdx) => (
          <span
            key={cIdx}
            className={styles.colorDot}
            style={{ background: color }}
          />
        ))}
      </div>
      <div className={styles.indexCellSize}>{size}</div>
      <div className={styles.indexCellThumbs}>
        {imgUrl ? (
          <>
            <img src={imgUrl} alt={item.name} />
            <img
              src={imgUrl}
              alt={item.name}
              style={{ transform: "scaleX(-1)" }}
            />
          </>
        ) : (
          <div className={styles.indexCellThumbsFallback}>
            <i className="fa-solid fa-cube" />
          </div>
        )}
      </div>
      <div className={styles.indexCellPage}>{pad(pageNum, 2)}</div>
    </div>
  );
};

export function getContentsSpread({
  leftCats,
  rightCats,
  productsByCategory,
  catalogProducts,
  emailVal,
  webVal,
}) {
  return {
    title: "Spread 2: Contents Index",
    left: (
      <div
        className={`${styles.page} ${styles.left}`}
        style={{ padding: "65px 70px 50px" }}
      >
        <div className={styles.contentsHeader}>Contents</div>

        {leftCats.length > 0 ? (
          leftCats.map((cat, catIdx) => (
            <div key={catIdx} style={{ marginBottom: "20px" }}>
              <div className={styles.contentsSectionTitle}>{cat}</div>
              <div className={styles.indexTable}>
                {productsByCategory[cat].map((item, idx) => {
                  const prodIdx = catalogProducts.indexOf(item);
                  const pageNum = 11 + prodIdx * 2;
                  return renderIndexRow(item, pageNum, idx);
                })}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{ marginTop: "50px", color: "var(--gray-500)", fontStyle: "italic" }}
          >
            No products selected. Please check products in the sidebar.
          </div>
        )}

        <div className={styles.footer}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.pageNumber}>03</div>
        </div>
      </div>
    ),
    right: (
      <div
        className={`${styles.page} ${styles.right}`}
        style={{ padding: "0 55px 50px" }}
      >
        <div className={styles.contentsRightHeader} />

        {rightCats.map((cat, catIdx) => (
          <div key={catIdx} style={{ marginBottom: "20px" }}>
            <div className={styles.contentsSectionTitle}>{cat}</div>
            <div className={styles.indexTable}>
              {productsByCategory[cat].map((item, idx) => {
                const prodIdx = catalogProducts.indexOf(item);
                const pageNum = 11 + prodIdx * 2;
                return renderIndexRow(item, pageNum, idx);
              })}
            </div>
          </div>
        ))}

        <div className={styles.userGuideRow}>
          <div className={styles.userGuideLabel}>User Guide</div>
          <div className={styles.userGuideIcons}>
            <i
              className="fa-solid fa-triangle-exclamation"
              style={{ color: "var(--color-warning)" }}
            />
            <i className="fa-solid fa-ban" style={{ color: "var(--color-error)" }} />
            <i className="fa-solid fa-info" style={{ color: "var(--navy)" }} />
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--gray-600)" }}>
            {pad(11 + catalogProducts.length * 2, 2)}
          </div>
        </div>

        <div className={styles.rightFooter}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.rightPageNumber}>04</div>
        </div>
      </div>
    ),
  };
}
