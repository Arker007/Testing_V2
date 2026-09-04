import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { PageHero } from "@/shared/ui";

export default function ContactHero() {
  const { c } = useSite();

  if (c("show_contact_hero", "1") === "0") return null;

  return (
    <PageHero
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Contact Us" },
      ]}
      tag={c("contact_hero_badge", "Get in Touch with Our Specialists")}
      tagIcon="solar:bolt-linear"
      title="Let's Discuss Your"
      titleAccent="Recycled Plastic Requirements"
      description={c(
        "contact_hero_sub",
        "Request bulk pricing, custom product dimensions, or get direct support from our sales and engineering team."
      )}
    />
  );
}

