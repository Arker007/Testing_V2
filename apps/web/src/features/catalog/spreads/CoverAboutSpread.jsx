import React from "react";
import styles from "../AdminCatalog.module.css";

export function getCoverAboutSpread({
  catalogYear,
  company,
  coverImages,
  catalogTitle,
  webVal,
  aboutImages,
  emailVal,
}) {
  return {
    title: "Spread 1: Front Cover & About",
    left: (
      <div
        className={`${styles.page} ${styles.left}`}
        style={{ background: "#ffffff", padding: "65px 70px 50px" }}
      >
        <div className={styles.coverHeader}>
          <div className={styles.coverHeaderTitle}>CATALOG {catalogYear}</div>
          {company.logo ? (
            <img
              src={company.logo}
              alt="Company Logo"
              className={styles.coverHeaderLogo}
            />
          ) : (
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "var(--dark)",
              }}
            >
              <i
                className="fa-solid fa-v"
                style={{ color: "#f5b21f", marginRight: "8px" }}
              />
              {company.name || "VISHAL ENTERPRISE"}
            </div>
          )}
        </div>

        <div className={styles.coverGrid}>
          <div className={styles.gridItem}>
            <img
              src={coverImages.coverImg1}
              alt="Grid Image 1"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/uploads/products/pallets/pallets-1770374237161-67758.webp";
              }}
            />
          </div>
          <div className={styles.gridItem}>
            <img
              src={coverImages.coverImg2}
              alt="Grid Image 2"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/uploads/products/lumber/plastic-lumber-pallet-1770447286569-0.webp";
              }}
            />
          </div>
          <div className={styles.gridItemYellow} />

          <div className={styles.gridItemWatermark}>
            <i className="fa-solid fa-recycle" />
          </div>
          <div className={`${styles.gridItem} ${styles.gridItemSpan2}`}>
            <img
              src={coverImages.coverImg5}
              alt="Grid Image 5"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/uploads/products/categories/categories-1770374476904-61107.webp";
              }}
            />
          </div>

          <div className={styles.gridItemGrayText}>
            <h4>{catalogTitle}</h4>
            <span>{webVal}</span>
          </div>
          <div className={styles.gridItem}>
            <img
              src={coverImages.coverImg7}
              alt="Grid Image 7"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/uploads/products/plastic-table/plastic-table-1770447279363-0.webp";
              }}
            />
          </div>
          <div className={styles.gridItem} />
        </div>
      </div>
    ),
    right: (
      <div
        className={`${styles.page} ${styles.right}`}
        style={{ padding: "0 55px 50px" }}
      >
        <div className={styles.aboutHeaderBar}>
          About {company.name || "VISHAL ENTERPRISE"}
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutLeftCol}>
            <div>
              <div className={styles.aboutSubheading}>
                Advanced Technology
              </div>
              <p className={styles.aboutText}>
                {company.name || "VISHAL ENTERPRISE"} was established to
                produce specialty plastic packaging and storage solutions, adding
                value to material handling chains. We seek to leverage our
                knowledge of polymer engineering science to assure delivery of
                quality products, specialized in plastic pallets as well as
                custom shapes and crates.
              </p>
            </div>
            <div>
              <div className={styles.aboutSubheading}>Top Quality</div>
              <p className={styles.aboutText}>
                Our catalog covers a whole host of returnable transit packaging
                from heavy-duty pallets to crates. It is our goal to find the
                best solutions for you, backed by GST Registered standards, quality
                controls, and a global network of partners.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#1f8b4c",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-seedling" />
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1f8b4c",
                  letterSpacing: "1px",
                }}
              >
                MADE IN INDIA
              </div>
            </div>
          </div>

          <div className={styles.aboutRightCol}>
            <img
              src={aboutImages.aboutImg1}
              alt="About 1"
              className={styles.aboutRightImg}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/uploads/products/categories/plastic-lumber-1770446410430-0.webp";
              }}
            />
            <img
              src={aboutImages.aboutImg2}
              alt="About 2"
              className={styles.aboutRightImg}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/uploads/products/categories/garden-bench-1770446422580-0.webp";
              }}
            />
          </div>
        </div>

        <div className={styles.rightFooter}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.rightPageNumber}>02</div>
        </div>
      </div>
    ),
  };
}
