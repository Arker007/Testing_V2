import React from "react";
import styles from "../../pages/ProductDetail.module.css";

const benefits = [
  { icon: "fa-cloud-rain", label: "Weather Resistant" },
  { icon: "fa-grip-lines", label: "Will Not Split or Splinter" },
  { icon: "fa-shield-halved", label: "Extremely Durable" },
  { icon: "fa-recycle", label: "Made From 100% Recycled Plastic" },
  { icon: "fa-leaf", label: "Ecological Alternative to Wood" },
  { icon: "fa-bug", label: "Rot & Fungi Resistant" },
  { icon: "fa-screwdriver-wrench", label: "Maintenance Free" },
  { icon: "fa-user-shield", label: "Vandal Resistant" },
  { icon: "fa-spray-can-sparkles", label: "Jet Washable" },
  { icon: "fa-sack-dollar", label: "Cost Effective" },
  { icon: "fa-gear", label: "Easy to Install" },
  { icon: "fa-drill", label: "Can Be Screwed, Drilled and Sawn" },
];

export const ProductBenefitsGrid = React.memo(function ProductBenefitsGrid() {
  return (
    <div className={styles.bentoHighlightCard} style={{ width: "100%", margin: 0 }}>
      <div className={styles.bentoCardHeader}>
        <div className={styles.bentoIconBadge}>
          <i className="fa-solid fa-leaf" />
        </div>
        <div>
          <h3 className={styles.bentoCardTitle}>Material Advantages</h3>
          <p className={styles.bentoCardSub}>Key performance benefits of recycled plastic lumber</p>
        </div>
      </div>
      <div className={styles.benefitsGrid}>
        {benefits.slice(0, 6).map((item) => (
          <div key={item.label} className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <i className={`fa-solid ${item.icon}`} />
            </div>
            <span className={styles.benefitLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
