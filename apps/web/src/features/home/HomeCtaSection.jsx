import React from "react";
import QuoteButton from "../../shared/components/QuoteButton";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/Home.module.css";

export default function HomeCtaSection() {
  const { c, co } = useSite();

  return (
    <>
      {c("show_home_testimonials", "1") !== "0" && (
        <section className={styles.testimonialsSection}>
          <div className="container">
            <div className={styles.testimonialSliderBox}>
              <div className={styles.testimonialSlide}>
                <div className={styles.starsRow}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className={styles.testimonialQuote}>
                  "{c("home_testimonial_quote", `Switching our facility handling platforms over to ${co("name", "VISHAL ENTERPRISE")}'s high-capacity recycled plastic pallets eliminated our recurring replacement budget entirely. They handle heavy racking cycles flawlessly without a single crack.`)}"
                </p>
                <div className={styles.testimonialAuthorBox}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--dark)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: "800",
                      fontSize: "0.875rem",
                    }}
                  >
                    {c("home_testimonial_initials", "PM")}
                  </div>
                  <div>
                    <h5 className={styles.authorName}>{c("home_testimonial_name", "Procurement Manager")}</h5>
                    <p className={styles.authorMeta}>{c("home_testimonial_company", "National Logistics Hub")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {c("show_home_cta", "1") !== "0" && (
        <section className={styles.ctaBannerSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaLeft}>
                <h2 className={styles.ctaTitleText}>
                  {c("home_cta_title", "Looking for Durable Recycled Plastic Products?")}
                </h2>
                <p className={styles.ctaDescText}>
                  {c(
                    "home_cta_subtitle",
                    "Contact our team today for custom sizing, product specifications, and bulk pricing details."
                  )}
                </p>
              </div>
              <div className={styles.ctaRight}>
                <QuoteButton to="/contact" text={c("home_cta_btn", "Get Quote")} size="large" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
