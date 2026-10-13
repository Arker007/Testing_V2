import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { CtaCard, Badge, GstIcon } from "@/shared/ui";

export default function ExperienceBanner() {
  const { c } = useSite();

  if (c("about_cert_enabled", "1") === "0") return null;

  return (
    <section className="container py-10 w-full cta-section">
      <CtaCard
        badge={c("experience_banner_badge", "Factory Direct & Certified")}
        badgeVariant="brand"
        badgeIcon="hugeicons:badge"
        title={c("experience_banner_title", "Over 15 Years of Industrial Excellence")}
        subtitle={c(
          "experience_banner_desc",
          "Operating modern recycling, compounding, and molding lines in Ankleshwar, Gujarat. Standard and custom configurations delivered across India."
        )}
      >
        {c("cert_gst", "GST Registered") && (
          <Badge variant="neutral" size="md" icon={<GstIcon className="w-4 h-4" />}>
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
