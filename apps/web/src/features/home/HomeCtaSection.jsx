import React from "react";
import QuoteButton from "../../shared/components/QuoteButton";
import Card from "../../shared/components/ui/Card";
import Badge from "../../shared/components/ui/Badge";
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 cta-section">
          <Card
            variant="elevated"
            className="p-8 sm:p-12 text-slate-900 dark:text-white shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[#171E26] border border-slate-200/90 dark:border-white/10 rounded-2xl"
          >
            {/* Ambient radial glow blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="mb-3">
                  <Badge variant="brand" size="md">
                    {c("home_cta_eyebrow", "Direct Factory Supply")}
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                  {c("home_cta_title", "Looking for Durable Recycled Plastic Products?")}
                </h2>
                <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base mt-2 max-w-xl font-medium leading-relaxed">
                  {c(
                    "home_cta_subtitle",
                    "Contact our team today for custom sizing, product specifications, and bulk pricing details."
                  )}
                </p>
              </div>
              <div className="shrink-0 self-start sm:self-auto">
                <QuoteButton to="/contact" text={c("home_cta_btn", "Get Quote")} size="large" className="shadow-md" />
              </div>
            </div>
          </Card>
        </section>
      )}
    </>
  );
}
