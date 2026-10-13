import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { CtaCard, QuoteButton } from "@/shared/ui";

export default function AboutCtaSection() {
  const { c } = useSite();

  if (c("about_cta_enabled", "1") === "0") return null;

  return (
    <section className="container pt-8 cta-section w-full">
      <CtaCard
        badge={c("about_cta_eyebrow", "Bulk Orders & Factory Direct Pricing")}
        badgeVariant="brand"
        badgeIcon="hugeicons:arrow-up-right-01"
        title={c("about_cta_title", "Get a Factory Quote for Recycled Plastics")}
        subtitle={c(
          "about_cta_text",
          "Contact our sales team in Ankleshwar for wholesale rates, custom pallet sizes, crate dimensions, or recycled granule samples."
        )}
      >
        <QuoteButton
          to="/contact"
          text={c("about_cta_btn_text", "Contact Sales")}
          className="shadow-sm"
        />
      </CtaCard>
    </section>
  );
}
