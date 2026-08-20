import React from "react";
import styles from "../AdminCatalog.module.css";

export function getQualityStandardsSpread({ emailVal, webVal }) {
  return {
    title: "Spread 5: Quality Standards",
    left: (
      <div className={`${styles.page} ${styles.left}`}>
        <div className={styles.orange}>QUALITY STANDARDS</div>
        <div className={styles.subtitle}>Compliances</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "60px",
            fontSize: "13px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--gray-200)",
              borderRadius: "4px",
              padding: "15px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "var(--color-warning)",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              GST Registered
            </div>
            <div style={{ color: "var(--gray-500)" }}>
              Audited B2B Management Systems
            </div>
          </div>
          <div
            style={{
              border: "1px solid var(--gray-200)",
              borderRadius: "4px",
              padding: "15px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "var(--color-warning)",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              100% Recycled
            </div>
            <div style={{ color: "var(--gray-500)" }}>
              Granules Compounded In-House
            </div>
          </div>
          <div
            style={{
              border: "1px solid var(--gray-200)",
              borderRadius: "4px",
              padding: "15px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "var(--color-warning)",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              Phytosanitary Safe
            </div>
            <div style={{ color: "var(--gray-500)" }}>
              Fumigation-Free Worldwide Export
            </div>
          </div>
          <div
            style={{
              border: "1px solid var(--gray-200)",
              borderRadius: "4px",
              padding: "15px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "var(--color-warning)",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              ASTM Tested
            </div>
            <div style={{ color: "var(--gray-500)" }}>
              Tension & Elastic Limit Approved
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.pageNumber}>09</div>
        </div>
      </div>
    ),
    right: (
      <div className={`${styles.page} ${styles.right}`}>
        <div className={styles.topbar} />
        <div className={styles.heading}>
          <h1>COMPARISON MATRIX</h1>
          <h2>Material Specs</h2>
        </div>

        <table
          className={styles.specTable}
          style={{
            marginLeft: "260px",
            width: "calc(100% - 260px)",
            marginTop: "40px",
          }}
        >
          <thead>
            <tr>
              <th>Feature</th>
              <th style={{ background: "var(--color-warning)", color: "var(--gray-700)" }}>Polymer</th>
              <th>Timber</th>
              <th>Steel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rotting & Pest Decay</td>
              <td style={{ background: "var(--color-warning)", fontWeight: 600 }}>
                No Decay
              </td>
              <td>Susceptible</td>
              <td>Rusts</td>
            </tr>
            <tr>
              <td>Lifespan</td>
              <td style={{ background: "var(--color-warning)", fontWeight: 600 }}>
                50+ Years
              </td>
              <td>5-10 Years</td>
              <td>15-20 Years</td>
            </tr>
            <tr>
              <td>Maintenance</td>
              <td style={{ background: "var(--color-warning)", fontWeight: 600 }}>Zero</td>
              <td>High Cost</td>
              <td>Annual Paint</td>
            </tr>
            <tr>
              <td>Moisture Swelling</td>
              <td style={{ background: "var(--color-warning)", fontWeight: 600 }}>
                &lt; 0.1%
              </td>
              <td>High</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.rightFooter}>
          Email: {emailVal} &nbsp;&nbsp; Website: {webVal}
          <div className={styles.rightPageNumber}>10</div>
        </div>
      </div>
    ),
  };
}
