import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../../shared/context/SiteContext";
import { COMPARISON_CATEGORIES } from "./comparisonData";
import { SectionHeader } from "@/shared/ui";
import styles from "./Comparison.module.css";

export default function PlasticVsWoodComparison() {
  const { c, openInquiryModal } = useSite();
  const [activeTab, setActiveTab] = useState(COMPARISON_CATEGORIES[0].id);

  if (c("show_spec_comparison", "1") === "0") return null;

  const currentCategory =
    COMPARISON_CATEGORIES.find((cat) => cat.id === activeTab) ||
    COMPARISON_CATEGORIES[0];

  return (
    <section
      id="technical-comparison"
      className={styles.comparisonSection}
      aria-label="Technical Specification Comparison: Recycled Polymer vs Timber"
    >
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          eyebrow={c("comparison_eyebrow", "Engineering Performance Benchmark")}
          eyebrowIcon="hugeicons:analytics-01"
          title={c("comparison_title", "Why Industrial Buyers & Contractors Replace Wood with Recycled Polymer")}
          subtitle={c(
            "comparison_subtitle",
            "A side-by-side technical evaluation across operating lifecycle, ISPM-15 export clearance, moisture absorption, and Total Cost of Ownership (TCO)."
          )}
          size="lg"
          align="center"
          className="mx-auto mb-10"
        />

        {/* Tab Switcher (Warehouse/Logistics vs Civil/Contractors) */}
        <div className={styles.tabContainer}>
          <div className={styles.tabSegmentedBar} role="tablist" aria-label="Comparison View">
            {COMPARISON_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeTab === cat.id}
                className={`${styles.tabBtn} ${
                  activeTab === cat.id ? styles.tabBtnActive : ""
                }`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.audienceNotice}>
          Tailored for: <strong>{currentCategory.targetAudience}</strong> · {currentCategory.summary}
        </p>

        {/* Matrix Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Performance Parameter</th>
                <th scope="col" className={styles.thPlastic}>
                  Vishal Recycled Polymer
                </th>
                <th scope="col">Traditional Hardwood Timber</th>
              </tr>
            </thead>
            <tbody>
              {currentCategory.rows.map((row, idx) => (
                <tr key={idx}>
                  <td className={styles.paramCell}>{row.parameter}</td>
                  <td className={styles.plasticCell}>
                    <div className={styles.plasticContent}>
                      <Icon
                        icon="hugeicons:tick-02"
                        className={styles.iconSuccess}
                        width="18"
                        height="18"
                      />
                      <div>
                        <span>{row.plastic}</span>
                        <span className={styles.advantageTag}>
                          Advantage: {row.advantage}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={styles.woodCell}>
                    <div className={styles.woodContent}>
                      <Icon
                        icon={row.isWinner ? "hugeicons:cancel-01" : "hugeicons:information-circle"}
                        className={row.isWinner ? styles.iconAlert : styles.iconNeutral}
                        width="18"
                        height="18"
                      />
                      <span>{row.wood}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Strip */}
        <div className={styles.footerStrip}>
          <div className={styles.footerNote}>
            <strong>Need custom dimensions or test load calculations?</strong> Our engineering team
            prepares project-specific finite element analysis (FEA) and sample batch test specimens.
          </div>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() =>
              openInquiryModal({
                source: "Technical Comparison Matrix",
                productName: activeTab === "pallets" ? "Industrial Recycled Pallet" : "Recycled Plastic Lumber Profiles",
                category: activeTab === "pallets" ? "Pallets" : "Lumber",
              })
            }
          >
            <Icon icon="hugeicons:document-attachment" width="18" height="18" />
            <span>Request Technical Spec Sheet</span>
          </button>
        </div>
      </div>
    </section>
  );
}
