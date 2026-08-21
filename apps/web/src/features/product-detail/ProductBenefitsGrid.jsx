import React from "react";
import { Icon } from "@iconify/react";
import styles from "../../pages/ProductDetail.module.css";

const benefits = [
  { icon: "solar:waterdrops-linear", label: "Weather Resistant" },
  { icon: "solar:shield-cross-linear", label: "Will Not Split or Splinter" },
  { icon: "solar:shield-check-linear", label: "Extremely Durable" },
  { icon: "solar:leaf-linear", label: "Made From 100% Recycled Plastic" },
  { icon: "solar:leaf-linear", label: "Ecological Alternative to Wood" },
  { icon: "solar:bug-linear", label: "Rot & Fungi Resistant" },
  { icon: "solar:wrench-linear", label: "Maintenance Free" },
  { icon: "solar:user-shield-linear", label: "Vandal Resistant" },
  { icon: "solar:waterdrops-linear", label: "Jet Washable" },
  { icon: "solar:tag-linear", label: "Cost Effective" },
  { icon: "solar:settings-minimalistic-linear", label: "Easy to Install" },
  { icon: "solar:slider-vertical-linear", label: "Can Be Screwed, Drilled and Sawn" },
];

export const ProductBenefitsGrid = React.memo(function ProductBenefitsGrid() {
  return (
    <div className={styles.bentoHighlightCard} style={{ width: "100%", margin: 0 }}>
      <div className={styles.bentoCardHeader}>
        <div className={styles.bentoIconBadge}>
          <Icon icon="solar:leaf-linear" className="w-5 h-5 text-emerald-500" />
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
              <Icon icon={item.icon} className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className={styles.benefitLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
