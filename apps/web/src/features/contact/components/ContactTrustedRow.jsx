import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/contact-workflow.module.css";

export const ContactTrustedRow = React.memo(function ContactTrustedRow() {
  return (
    <div className={styles.trustedCompanies}>
      <p className={styles.companiesTitle}>
        Trusted by Buyers Across Leading Industries
      </p>
      <div className={styles.companiesGrid}>
        <div className={styles.companyBadge}>
          <Icon icon="hugeicons:truck-delivery" className="w-4 h-4 shrink-0" />
          <span>APEX LOGISTICS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="hugeicons:shield-alert" className="w-4 h-4 shrink-0" />
          <span>MATRIX BUILD</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="hugeicons:flask-conical" className="w-4 h-4 shrink-0" />
          <span>BIOPHARMA LABS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="hugeicons:recycle-01" className="w-4 h-4 shrink-0" />
          <span>ECOAGRO FARMS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="hugeicons:factory" className="w-4 h-4 shrink-0" />
          <span>CIVIC INFRA</span>
        </div>
      </div>
    </div>
  );
});

export default ContactTrustedRow;
