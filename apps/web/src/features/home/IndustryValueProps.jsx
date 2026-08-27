import React from "react";
import { Icon } from "@iconify/react";
import styles from "./home.module.css";

export default function IndustryValueProps() {
  return (
    <div className={styles.bentoBottomRow}>
      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:shield-check-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <h6>Engineered Strength</h6>
          <p>Built for extreme loads and harsh environments.</p>
        </div>
      </div>

      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:leaf-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <h6>Eco-Conscious</h6>
          <p>Made from recycled materials for a sustainable future.</p>
        </div>
      </div>

      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:wrench-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <h6>Zero Maintenance</h6>
          <p>No rot, rust, or corrosion — ever.</p>
        </div>
      </div>

      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:clock-circle-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <h6>Long Service Life</h6>
          <p>Lasts decades with minimal maintenance.</p>
        </div>
      </div>
    </div>
  );
}
