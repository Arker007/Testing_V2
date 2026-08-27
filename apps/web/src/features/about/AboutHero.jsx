import React from "react";
import { useSite } from "../../shared/context/SiteContext";
import PageHero from "../../shared/components/PageHero";

export default function AboutHero() {
  const { c } = useSite();

  if (c("about_hero_enabled", "1") === "0") return null;

  return (
    <PageHero
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "About Us" },
      ]}
      tag={c("about_hero_tag", "Pioneering Recycled Polymer Extrusion")}
      tagIcon="solar:history-linear"
      title="Building a Greener Future with"
      titleAccent="Plastic Lumber"
      description={c(
        "about_hero_sub",
        "Pioneering sustainable plastic manufacturing for over 15 years in Gujarat, India. Transforming polymer waste into high-density industrial lumber & profiles."
      )}
    />
  );
}

