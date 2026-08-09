import React from "react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/Home.module.css";

export default function SustainabilitySection() {
  const { c, co } = useSite();

  if (c("show_home_about", "1") === "0") return null;

  return (
    <section className={styles.sustainabilitySection}>
      <div className="container">
        <div className={styles.sustainabilityCard}>
          <div className={styles.susLeft}>
            <div className={styles.susVisualBox}>
              <div className={styles.susCircleGraphic}>
                <i className="fas fa-leaf animate-icon-pulse"></i>
              </div>
              <div className={styles.susLineBox}>Circular Economy</div>
            </div>
          </div>

          <div className={styles.susRight}>
            <span className="section-eyebrow">{c("home_about_eyebrow", "Our Environmental Impact")}</span>
            <h2 className={styles.susTitle}>{c("home_about_title", "Replacing Wood. Saving Forests.")}</h2>
            <p className={styles.susText}>
              {c(
                "home_about_desc",
                `At ${co("name", "VISHAL ENTERPRISE")}, we turn recycled plastic into high-durability products. This prevents plastic waste from reaching landfills and provides strong, rot-proof alternatives to traditional wood without requiring toxic chemical treatments.`
              )}
            </p>

            <div className={styles.susMiniStats}>
              <div className={styles.susStatBox}>
                <span className={styles.susStatVal}>{c("home_about_stat1_number", "20+")}</span>
                <span className={styles.susStatLbl}>{c("home_about_stat1_label", "Years Experience")}</span>
              </div>
              <div className={styles.susStatBox}>
                <span className={styles.susStatVal}>{c("home_about_stat2_number", "1000+")}</span>
                <span className={styles.susStatLbl}>{c("home_about_stat2_label", "Satisfied Clients")}</span>
              </div>
              <div className={styles.susStatBox}>
                <span className={styles.susStatVal}>{c("home_about_stat3_number", "1500+")}</span>
                <span className={styles.susStatLbl}>{c("home_about_stat3_label", "Tons Recycled")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
