import React from "react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/About.module.css";

export default function AboutHero() {
  const { c } = useSite();

  if (c("about_hero_enabled", "1") === "0") return null;

  return (
    <section className={`${styles.hero} aboutHeroMotion`}>
      <div className={styles.heroBg} />
      <div className="container relative z-10">
        <span className={styles.heroTagline}>Our Legacy</span>
        <h1 className={styles.heroTitle}>
          {c("about_hero_title", "About Vishal Enterprise")}
        </h1>
        <p className={styles.heroSub}>
          {c(
            "about_hero_sub",
            "Pioneering sustainable plastic manufacturing for over 15 years in Gujarat, India."
          )}
        </p>
      </div>
    </section>
  );
}
