import React from "react";
import QuoteButton from "../../shared/components/QuoteButton";
import { useSite } from "../../shared/context/SiteContext";
import CtaCard from "../../shared/components/ui/CtaCard";

export default function AboutCtaSection() {
  const { c } = useSite();

  if (c("about_cta_enabled", "1") === "0") return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 cta-section">
      <CtaCard
        badge={c("about_cta_eyebrow", "Ready to Upgrade Your Supply Chain?")}
        badgeVariant="eyebrow"
        badgeIcon="solar:arrow-right-up-linear"
        title={c("about_cta_title", "Get Custom Quotes & Product Specs Today")}
        subtitle={c(
          "about_cta_text",
          "Talk directly with our technical team in Ankleshwar for custom bulk orders, pallet dimensions, or granule specifications."
        )}
      >
        <QuoteButton
          to="/contact"
          text={c("about_cta_btn_text", "Get Started")}
          className="shadow-md"
        />
      </CtaCard>
    </section>
  );
}
