import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { CtaCard, Badge } from "@/shared/ui";

export default function ExperienceBanner() {
  const { c } = useSite();

  if (c("about_cert_enabled", "1") === "0") return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full cta-section">
      <CtaCard
        badge={c("experience_banner_badge", "Industrial Standards & Quality")}
        badgeVariant="brand"
        badgeIcon="carbon:badge"
        title={c("experience_banner_title", "Over 15 Years of Industrial Excellence")}
        subtitle={c(
          "experience_banner_desc",
          "Equipped with high-capacity extrusion lines and testing equipment at our Ankleshwar plant, ensuring zero defect tolerance on every shipment."
        )}
      >
        {c("cert_gst", "GST Registered") && (
          <Badge variant="neutral" size="md">
            {c("cert_gst", "GST Registered")}
          </Badge>
        )}
        {c("cert_gmp", "Made in India") && (
          <Badge variant="success" size="md">
            {c("cert_gmp", "Made in India")}
          </Badge>
        )}
      </CtaCard>
    </section>
  );
}
