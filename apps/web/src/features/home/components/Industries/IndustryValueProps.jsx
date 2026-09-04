import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Industries.module.css";

export default function IndustryValueProps() {
  return (
    <div className={styles.bentoBottomRow}>
      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:shield-check-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <span className={styles.bentoBottomTitle}>Engineered Strength</span>
          <p>Built for extreme loads and harsh environments.</p>
        </div>
      </div>

      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:leaf-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <span className={styles.bentoBottomTitle}>Eco-Conscious</span>
          <p>Made from recycled materials for a sustainable future.</p>
        </div>
      </div>

      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:wrench-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <span className={styles.bentoBottomTitle}>Zero Maintenance</span>
          <p>No rot, rust, or corrosion — ever.</p>
        </div>
      </div>

      <div className={styles.bentoBottomBadge}>
        <div className={styles.bentoBottomIcon}>
          <Icon icon="solar:clock-circle-linear" className="w-5 h-5 text-brand" />
        </div>
        <div className={styles.bentoBottomText}>
          <span className={styles.bentoBottomTitle}>Long Service Life</span>
          <p>Lasts decades with minimal maintenance.</p>
        </div>
      </div>
    </div>
  );
}
