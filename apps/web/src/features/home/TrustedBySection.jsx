import React from "react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/Home.module.css";

export default function TrustedBySection() {
  const { c } = useSite();

  if (c("show_trusted_by", "1") === "0") return null;

  return (
    <section className={styles.trustedBy}>
      <div className="container">
        <h6 className={styles.trustedHeading}>
          {c("trusted_title", "Trusted by Leading Brands & Industries")}
        </h6>
        <div className={styles.logoRow}>
          {c("trusted_b1", "INFRA-STRUCTURE CORP") && <span className={styles.logoBadge}>{c("trusted_b1", "INFRA-STRUCTURE CORP")}</span>}
          {c("trusted_b2", "METRO-BUILD") && <span className={styles.logoBadge}>{c("trusted_b2", "METRO-BUILD")}</span>}
          {c("trusted_b3", "ECO-LOGISTICS") && <span className={styles.logoBadge}>{c("trusted_b3", "ECO-LOGISTICS")}</span>}
          {c("trusted_b4", "NATION PARKS") && <span className={styles.logoBadge}>{c("trusted_b4", "NATION PARKS")}</span>}
        </div>
      </div>
    </section>
  );
}
