import React from "react";
import styles from "../AdminCatalog.module.css";
import { getQualityStandardsSpread } from "./SpreadQualityStandards";

export function getOverviewSpreads({ cms, emailVal, webVal }) {
  return [
    // Spread 3: Corporate Overview
    {
      title: "Spread 3: Corporate Overview",
      left: (
        <div className={`${styles.page} ${styles.left}`}>
          <div className={styles.orange}>Corporate Profile</div>
          <div className={styles.subtitle}>VISHAL ENTERPRISE</div>
          <div
            style={{
              marginTop: "50px",
              fontSize: "16px",
              lineHeight: "34px",
              color: "#666",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              {cms.about_mission ||
                "Transforming industrial plastic waste into premium recycled lumber, pallets, and custom outdoor structures since 2008."}
            </p>
            <p style={{ marginBottom: "20px" }}>
              {cms.about_vision ||
                "Engineered capabilities to meet demanding heavy-industrial specifications consistently."}
            </p>
            <p>
              {cms.about_history ||
                "Headquartered in Ankleshwar GIDC, Gujarat, our facility compounds high-density polymers to create weather-proof, chemical-resistant alternatives."}
            </p>
          </div>
          <div className={styles.footer}>
            Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
            <div className={styles.pageNumber}>05</div>
          </div>
        </div>
      ),
      right: (
        <div className={`${styles.page} ${styles.right}`}>
          <div className={styles.topbar} />
          <div className={styles.heading}>
            <h1>KEY STATISTICS</h1>
            <h2>Production Scale</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
              marginTop: "60px",
              marginLeft: "260px",
            }}
          >
            <div
              style={{
                border: "2px solid #efefef",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{ fontSize: "36px", fontWeight: 800, color: "#f5b21f" }}
              >
                {cms.yearsExperience || "20"}+
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#888",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginTop: "5px",
                }}
              >
                Years Experience
              </div>
            </div>
            <div
              style={{
                border: "2px solid #efefef",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{ fontSize: "36px", fontWeight: 800, color: "#f5b21f" }}
              >
                {cms.clients || "200"}+
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#888",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginTop: "5px",
                }}
              >
                Happy Clients
              </div>
            </div>
            <div
              style={{
                border: "2px solid #efefef",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{ fontSize: "36px", fontWeight: 800, color: "#f5b21f" }}
              >
                {Number(cms.recycledTons || 5000).toLocaleString()} MT
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#888",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginTop: "5px",
                }}
              >
                Recycled / Year
              </div>
            </div>
            <div
              style={{
                border: "2px solid #efefef",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{ fontSize: "36px", fontWeight: 800, color: "#f5b21f" }}
              >
                {cms.products || "50"}+
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#888",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginTop: "5px",
                }}
              >
                Product Profiles
              </div>
            </div>
          </div>

          <div className={styles.rightFooter}>
            Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
            <div className={styles.rightPageNumber}>06</div>
          </div>
        </div>
      ),
    },
    // Spread 4: Materials Advantages
    {
      title: "Spread 4: Materials Advantages",
      left: (
        <div className={`${styles.page} ${styles.left}`}>
          <div className={styles.orange}>WHY RECYCLED PLASTIC</div>
          <div className={styles.subtitle}>Eco-Friendly Loop</div>

          <div
            style={{
              marginTop: "50px",
              fontSize: "16px",
              lineHeight: "34px",
              color: "#666",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              <strong>Deforestation Prevention:</strong> Replacing wood structures
              with polymer profiles directly reduces timber logging.
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>Zero Toxicity:</strong> No heavy metal preservatives or
              chemical additives commonly found in treated wood profiles.
            </p>
            <p>
              <strong>100% Recyclable:</strong> Material loop remains closed,
              allowing granulated components to return to extrusion cycles.
            </p>
          </div>
          <div className={styles.footer}>
            Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
            <div className={styles.pageNumber}>07</div>
          </div>
        </div>
      ),
      right: (
        <div className={`${styles.page} ${styles.right}`}>
          <div className={styles.topbar} />
          <div className={styles.heading}>
            <h1>DURABILITY & ROI</h1>
            <h2>Material Benefits</h2>
          </div>

          <div
            style={{
              marginTop: "50px",
              marginLeft: "260px",
              fontSize: "16px",
              lineHeight: "34px",
              color: "#666",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              <strong>Zero Maintenance:</strong> Completely eliminates
              structural maintenance painting, chemical stains, or sealants.
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>Splinter Proof:</strong> Smooth and uniform surfaces that
              are safe for warehousing, public spaces, and parks.
            </p>
            <p>
              <strong>Corrosion Resistant:</strong> Highly resilient against
              extreme weather conditions, moisture absorption, and acid sprays.
            </p>
          </div>

          <div className={styles.rightFooter}>
            Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
            <div className={styles.rightPageNumber}>08</div>
          </div>
        </div>
      ),
    },
    getQualityStandardsSpread({ emailVal, webVal }),
  ];
}
