import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../../shared/context/SiteContext";
import { SECTOR_ECOSYSTEM } from "./sectorData";
import styles from "./TrustedBy.module.css";

export default function TrustedBySection() {
  const { c } = useSite();

  if (c("show_trusted_by", "1") === "0") return null;

  // Duplicate 2 cycles for smooth infinite translation
  const tickerItems = [
    ...SECTOR_ECOSYSTEM,
    ...SECTOR_ECOSYSTEM,
  ];

  return (
    <section
      id="trusted-by-section"
      className={styles.trustedBy}
      aria-label="Engineered for Demanding Industrial Sectors & Supply Chains"
    >
      <div className="container">
        <p className={styles.trustedHeading}>
          {c("trusted_title", "Engineered for Demanding Industrial Sectors & Supply Chains")}
        </p>
      </div>

      {/* Infinite Horizontal Marquee Ticker: Animated From Right to Left (pauses on hover) */}
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack} aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={styles.logoBadge}
              style={{ "--brand-hover-color": item.accentColor }}
              title={`${item.name} · ${item.compliance}`}
            >
              <span className={styles.sectorIcon}>
                <Icon icon={item.icon} width="20" height="20" />
              </span>
              <div className={styles.badgeContent}>
                <span className={styles.brandName}>{item.name}</span>
                <span className={styles.sectorCompliance}>· {item.compliance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
