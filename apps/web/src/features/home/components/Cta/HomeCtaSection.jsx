import React from "react";
import { Icon } from "@iconify/react";
import { QuoteButton, CtaCard } from "@/shared/ui";
import { useSite } from "../../../../shared/context/SiteContext";
import styles from "./Cta.module.css";

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
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} icon="solar:star-linear" className="text-amber-500 w-4 h-4 inline" />
                  ))}
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
                      background: "var(--navy)",
                      color: "var(--white)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: "800",
                      fontSize: "0.875rem",
                    }}
                  >
                    {c("home_testimonial_initials", "PM")}
                  </div>
                  <div>
                    <div className={styles.authorName}>{c("home_testimonial_name", "Procurement Manager")}</div>
                    <p className={styles.authorMeta}>{c("home_testimonial_company", "National Logistics Hub")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {c("show_home_cta", "1") !== "0" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 cta-section">
          <CtaCard
            badge={c("home_cta_eyebrow", "Direct Factory Supply")}
            badgeVariant="brand"
            title={c("home_cta_title", "Looking for Durable Recycled Plastic Products?")}
            subtitle={c(
              "home_cta_subtitle",
              "Contact our team today for custom sizing, product specifications, and bulk pricing details."
            )}
          >
            <QuoteButton to="/contact" text={c("home_cta_btn", "Get Quote")} size="large" className="shadow-md" />
          </CtaCard>
        </section>
      )}
    </>
  );
}
