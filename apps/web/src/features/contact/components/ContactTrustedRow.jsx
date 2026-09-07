import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/contact.module.css";

export const ContactTrustedRow = React.memo(function ContactTrustedRow() {
  return (
    <div className={styles.trustedCompanies}>
      <p className={styles.companiesTitle}>
        Trusted by Procurement Managers at Leading Industries
      </p>
      <div className={styles.companiesGrid}>
        <div className={styles.companyBadge}>
          <Icon icon="carbon:delivery-truck" className="w-4 h-4 shrink-0" />
          <span>APEX LOGISTICS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="carbon:shield-alert" className="w-4 h-4 shrink-0" />
          <span>MATRIX BUILD</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="carbon:chemistry" className="w-4 h-4 shrink-0" />
          <span>BIOPHARMA LABS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="carbon:recycle" className="w-4 h-4 shrink-0" />
          <span>ECOAGRO FARMS</span>
        </div>
        <div className={styles.companyBadge}>
          <Icon icon="carbon:industry" className="w-4 h-4 shrink-0" />
          <span>CIVIC INFRA</span>
        </div>
      </div>
    </div>
  );
});

export default ContactTrustedRow;
