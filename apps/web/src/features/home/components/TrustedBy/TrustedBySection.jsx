import React from "react";
import { useSite } from "../../../../shared/context/SiteContext";
import { BRAND_COMPANIES } from "./brandsData";
import styles from "./TrustedBy.module.css";

export default function TrustedBySection() {
  const { c } = useSite();

  if (c("show_trusted_by", "1") === "0") return null;

  // Duplicate 2 cycles of the authentic brand list for seamless 50% infinite translation
  const tickerItems = [
    ...BRAND_COMPANIES,
    ...BRAND_COMPANIES,
  ];

  return (
    <section
      id="trusted-by-section"
      className={styles.trustedBy}
      aria-label="Trusted Enterprise Partners"
    >
      <div className="container mx-auto px-4">
        <p className={styles.trustedHeading}>
          {c("trusted_title", "Trusted by Leading Industrial & Logistics Enterprises")}
        </p>
      </div>

      {/* Infinite Horizontal Marquee Ticker: Animated From Right to Left (pauses on hover) */}
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack} aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={styles.logoBadge}
              style={{ "--brand-hover-color": item.color }}
              title={item.name}
            >
              <svg
                viewBox={item.viewBox || "0 0 24 24"}
                className={`${styles.brandSvg} ${item.isWide ? styles.brandSvgWide : ""}`}
                aria-hidden="true"
                focusable="false"
                fill="currentColor"
              >
                <path d={item.path} />
              </svg>
              <span className={styles.brandName}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
