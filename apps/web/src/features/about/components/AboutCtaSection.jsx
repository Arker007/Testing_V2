import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { CtaCard, QuoteButton } from "@/shared/ui";

export default function AboutCtaSection() {
  const { c } = useSite();

  if (c("about_cta_enabled", "1") === "0") return null;

  return (
    <section className="container pt-8 cta-section w-full">
      <CtaCard
        badge={c("about_cta_eyebrow", "Ready to Upgrade Your Supply Chain?")}
        badgeVariant="brand"
        badgeIcon="carbon:launch"
        title={c("about_cta_title", "Get Custom Quotes & Product Specs Today")}
        subtitle={c(
          "about_cta_text",
          "Talk directly with our technical team in Ankleshwar for custom bulk orders, pallet dimensions, or granule specifications."
        )}
      >
        <QuoteButton
          to="/contact"
          text={c("about_cta_btn_text", "Get Started")}
          className="shadow-sm"
        />
      </CtaCard>
    </section>
  );
}
