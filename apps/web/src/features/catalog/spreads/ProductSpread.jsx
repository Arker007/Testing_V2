import React from "react";
import styles from "../AdminCatalog.module.css";
import { pad, getProductImage, getSpecs } from "../catalog.utils";

export function getProductSpread({
  prod,
  idx,
  products,
  emailVal,
  webVal,
}) {
  const pageNumStart = 11 + idx * 2;
  const spreadIndexLabel = pad(6 + idx, 2);

  const imgUrl = getProductImage(prod);
  const specs = getSpecs(prod);

  const relatedProducts = products
    .filter((p) => p.category === prod.category && p.id !== prod.id)
    .slice(0, 4);
  while (relatedProducts.length < 4) {
    relatedProducts.push({ name: "Custom Variant", image: "" });
  }

  return {
    title: `Spread ${6 + idx}: ${prod.name}`,
    left: (
      <div className={styles.pageLeft}>
        <div className={styles.headerLeft}>
          <h1>
            {prod.name.toUpperCase()} [{spreadIndexLabel}]
          </h1>
          <h2>
            {specs["Dimensions"] ||
              specs["Size"] ||
              specs["dimensions"] ||
              "CUSTOM SIZING"}
          </h2>
        </div>

        <div className={styles.iconsTopRight}>
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2s-2-.9-2-2V4c0-1.1.9-2 2-2zm0 18c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2z" />
          </svg>
        </div>

        <div className={styles.bestSellerBadge}>
          Best
          <br />
          Seller
        </div>

        <div className={styles.mainProductImage}>
          {imgUrl ? (
            <img src={imgUrl} alt={prod.name} />
          ) : (
            <div
              className={styles.variantThumbItemFallback}
              style={{ width: "380px", height: "230px" }}
            />
          )}
        </div>

        <div className={styles.leftFooterContent}>
          <div className={styles.productDescription}>
            {prod.description
              ? prod.description.replace(/<[^>]*>/g, "")
              : "High-capacity polymer structural solutions built for high moisture and heavy loads."}
          </div>

          <div className={styles.featuresContainer}>
            <div className={styles.featuresTitle}>Features</div>
            <div className={styles.featureMainCircle}>
              {imgUrl ? (
                <img src={imgUrl} alt="Feature" />
              ) : (
                <div style={{ fontSize: "1.5rem", color: "var(--gray-200)" }}>
                  <i className="fa-solid fa-cube" />
                </div>
              )}
            </div>
            <div className={styles.featureThumbnails}>
              {relatedProducts.slice(0, 3).map((rel, rIdx) => {
                const relImg = getProductImage(rel);
                return (
                  <div key={rIdx} className={styles.featureThumb}>
                    {relImg && <img src={relImg} alt="" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.footerLeftBar}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.leftPageNumber}>{pad(pageNumStart, 2)}</div>
        </div>
      </div>
    ),
    right: (
      <div className={styles.pageRight}>
        <div className={styles.topOrangeHeaderBar} />

        <div className={styles.specsSidebarPanel}>
          <div className={styles.specBoxWrapper}>
            <div className={styles.specBoxHeader}>Load Specs</div>
            <div className={styles.specGrid2Col}>
              <div className={styles.specItemCell}>
                <span>Dynamic</span>
                <strong>
                  {specs["Dynamic Load"] ||
                    specs["Dynamic"] ||
                    prod.capacity ||
                    "1,500 KG"}
                </strong>
              </div>
              <div className={styles.specItemCell}>
                <span>Static</span>
                <strong>
                  {specs["Static Load"] || specs["Static"] || "5,000 KG"}
                </strong>
              </div>
              <div className={styles.specItemCell}>
                <span>Racking</span>
                <strong>
                  {specs["Racking Load"] || specs["Racking"] || "1,000 KG"}
                </strong>
              </div>
              <div className={styles.specItemCell}>
                <span>Weight</span>
                <strong>
                  {specs["Weight"] || specs["Tare Weight"] || "18 KG ± 3%"}
                </strong>
              </div>
            </div>
          </div>

          <div className={styles.specBoxWrapper}>
            <div className={styles.specBoxHeader}>Handling & Entry</div>
            <div className={styles.specGrid2Col}>
              <div className={styles.specItemCell}>
                <span>Forklift</span>
                <strong>
                  {specs["Forklift Entry"] ||
                    specs["Forklift"] ||
                    "4-Way Entry"}
                </strong>
              </div>
              <div className={styles.specItemCell}>
                <span>Hand Jack</span>
                <strong>{specs["Hand Jack"] || "4-Way Entry"}</strong>
              </div>
              <div className={styles.specItemCell}>
                <span>Stackable</span>
                <strong>{specs["Stackable"] || "Yes / Double"}</strong>
              </div>
              <div className={styles.specItemCell}>
                <span>Material</span>
                <strong>{specs["Material"] || "100% Recycled HDPE"}</strong>
              </div>
            </div>
          </div>

          <div className={styles.bottomApplicationBox}>
            <div className={styles.specBoxHeader}>Ideal B2B Applications</div>
            <p>
              {prod.applications ||
                specs["Applications"] ||
                "Automotive, Chemical Processing, Export Logistics, Cold Storage Warehousing."}
            </p>
          </div>
        </div>

        <div className={styles.variantsRightPanel}>
          <div className={styles.variantsSectionHeader}>Product Line Options</div>

          <div className={styles.variantsGrid2x2}>
            {relatedProducts.map((rel, rIdx) => {
              const relImg = getProductImage(rel);
              const relSpecs = getSpecs(rel);
              return (
                <div key={rIdx} className={styles.variantCardItem}>
                  <div className={styles.variantThumbBox}>
                    {relImg ? (
                      <img src={relImg} alt={rel.name} />
                    ) : (
                      <div className={styles.variantThumbItemFallback}>
                        <i className="fa-solid fa-cube" />
                      </div>
                    )}
                  </div>
                  <div className={styles.variantInfoBox}>
                    <h6>{rel.name}</h6>
                    <span>
                      {relSpecs["Dimensions"] ||
                        relSpecs["Size"] ||
                        "Custom Dimension"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.notesContainerBox}>
            <div className={styles.notesHeaderTitle}>
              Standard B2B Terms & Customization
            </div>
            <ul>
              <li>
                Custom hot-stamping & serial numbering branding available on
                request.
              </li>
              <li>Racking safety lips and anti-skid rubber grommets optional.</li>
              <li>
                UV-stabilized compounds suitable for open yard weather
                exposure.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerRightBar}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.rightPageNumber}>
            {pad(pageNumStart + 1, 2)}
          </div>
        </div>
      </div>
    ),
  };
}
