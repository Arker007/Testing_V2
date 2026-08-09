import React from "react";
import { IndustryCard } from "./IndustryCard";
import { INDUSTRIES_DATA } from "./industriesData";
import styles from "../../pages/Home.module.css";
import { useSite } from "../../shared/context/SiteContext";

export default function IndustriesGrid() {
  const { c } = useSite();

  if (c("show_industries", "1") === "0") return null;

  return (
    <section className={styles.industriesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="section-eyebrow mx-auto">
            {c("industries_eyebrow", "Applications")}
          </span>
          <h2 className="section-title">
            {c("industries_title", "Industries We Serve")}
          </h2>
          <p className="section-subtitle">
            {c(
              "industries_subtitle",
              "Our products are built to meet high safety, durability, and load standards across different sectors."
            )}
          </p>
        </div>

        <div className={styles.industriesGrid}>
          {INDUSTRIES_DATA.map((item) => (
            <IndustryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
