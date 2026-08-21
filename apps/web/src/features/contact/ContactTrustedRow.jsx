import React from "react";
import { Icon } from "@iconify/react";
import styles from "../../pages/Contact.module.css";

export const ContactTrustedRow = React.memo(function ContactTrustedRow() {
  return (
    <div className={styles.trustedCompanies}>
      <h4 className={styles.companiesTitle}>
        Trusted by Procurement Managers at Leading Industries
      </h4>
      <div className={styles.companiesGrid}>
        <div className={styles.companyBadge}>
          <Icon icon="solar:delivery-linear" className="w-4 h-4 shrink-0" />
          <span>APEX LOGISTICS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="solar:shield-warning-linear" className="w-4 h-4 shrink-0" />
          <span>MATRIX BUILD</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="solar:test-tube-minimalistic-linear" className="w-4 h-4 shrink-0" />
          <span>BIOPHARMA LABS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="solar:leaf-linear" className="w-4 h-4 shrink-0" />
          <span>ECOAGRO FARMS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="solar:buildings-3-linear" className="w-4 h-4 shrink-0" />
          <span>CIVIC INFRA</span>
        </div>
      </div>
    </div>
  );
});
