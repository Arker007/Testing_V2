import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { PageHero } from "@/shared/ui";

export default function AboutHero() {
  const { c } = useSite();

  if (c("about_hero_enabled", "1") === "0") return null;

  // Split title if it contains a space or just use it raw if we can't cleanly split for the "Accent" design.
  // The original design had "title" and "titleAccent"
  const rawTitle = c("about_hero_title", "About VISHAL ENTERPRISE");
  // A simple heuristic for PageHero: put the whole text in title for now since it's dynamic
  // Or we can use title and pass empty to titleAccent
  
  return (
    <PageHero
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "About Us" },
      ]}
      tag={c("about_hero_tag", "Pioneering Recycled Polymer Extrusion")}
      tagIcon="solar:history-linear"
      title={rawTitle}
      titleAccent=""
      description={c(
        "about_hero_subtitle",
        "Pioneering sustainable plastic manufacturing for over 15 years in Gujarat, India. Transforming polymer waste into high-density industrial lumber & profiles."
      )}
    />
  );
}

