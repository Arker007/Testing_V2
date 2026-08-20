import React from "react";
import styles from "../AdminCatalog.module.css";

export function getBackCoverSpread({
  catalogProducts,
  emailVal,
  webVal,
  company,
}) {
  const backCoverPageStart = 11 + catalogProducts.length * 2;
  return {
    title: "Spread Final: Inside Back & Rear Cover",
    left: (
      <div
        className={`${styles.page} ${styles.left}`}
        style={{ padding: "65px 70px 50px" }}
      >
        <div className={styles.orange}>CERTIFICATIONS & NETWORK</div>
        <div className={styles.subtitle}>Global Footprint</div>

        <div
          style={{
            marginTop: "40px",
            fontSize: "15px",
            lineHeight: "30px",
            color: "var(--gray-600)",
          }}
        >
          <p style={{ marginBottom: "15px" }}>
            <strong>Pan-India Supply Network:</strong> Strategic manufacturing
            plants in Gujarat and Maharashtra with dispatch capability across all
            industrial hubs.
          </p>
          <p style={{ marginBottom: "15px" }}>
            <strong>Export Compliance:</strong> Phytosanitary exempt material
            design enables seamless hassle-free international sea freight.
          </p>
        </div>

        <div className={styles.footer}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.pageNumber}>{backCoverPageStart}</div>
        </div>
      </div>
    ),
    right: (
      <div
        className={`${styles.page} ${styles.right}`}
        style={{
          background: "var(--gray-700)",
          color: "var(--white)",
          padding: "65px 70px 50px",
        }}
      >
        <div className={styles.coverHeader}>
          <div className={styles.coverHeaderTitle} style={{ color: "var(--color-warning)" }}>
            CONNECT WITH US
          </div>
        </div>

        <div style={{ marginTop: "80px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 800,
              margin: "0 0 20px 0",
              color: "var(--white)",
            }}
          >
            {company.name || "VISHAL ENTERPRISE"}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-inverse-secondary)",
              lineHeight: "28px",
              marginBottom: "30px",
            }}
          >
            {company.address ||
              "123 Industrial Estate, Ankleshwar GIDC, Gujarat, India"}
            <br />
            Phone: {company.phone || "+91 98765 43210"}
            <br />
            Email: {emailVal}
          </p>

          <div
            style={{
              padding: "20px",
              background: "var(--border-dark)",
              borderRadius: "8px",
              borderLeft: "4px solid var(--color-warning)",
            }}
          >
            <div
              style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-warning)" }}
            >
              B2B CUSTOM ORDERS
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--text-inverse-secondary)",
                marginTop: "5px",
              }}
            >
              Reach out directly for specialized molds, custom colors, and
              volume tier pricing.
            </div>
          </div>
        </div>

        <div
          className={styles.rightFooter}
          style={{ color: "var(--text-inverse-muted)" }}
        >
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div
            className={styles.rightPageNumber}
            style={{ background: "var(--color-warning)", color: "var(--gray-700)" }}
          >
            {backCoverPageStart + 1}
          </div>
        </div>
      </div>
    ),
  };
}
