import React from "react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/Contact.module.css";

export default function ContactHero() {
  const { c } = useSite();

  if (c("show_contact_hero", "1") === "0") return null;

  return (
    <section className={`${styles.hero} aboutHeroMotion`}>
      <div className={styles.heroBg} />
      <div className="container relative z-10">
        <span className="section-eyebrow">
          {c("contact_hero_badge", "Fast B2B Turnaround")}
        </span>
        <h1 className={styles.heroTitle}>
          {c("contact_hero_title", "Get in Touch with Us")}
        </h1>
        <p className={styles.heroSub}>
          {c(
            "contact_hero_sub",
            "Request bulk pricing, custom product dimensions, or get support from our sales team."
          )}
        </p>
      </div>
    </section>
  );
}
