import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { PageHero } from "@/shared/ui";
import aboutHeroBg from "@assets/images/marketing/recycled_plastic_profiles_1785866736886.jpg";

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
      bgImage={aboutHeroBg}
      bgOpacity="opacity-60"
      tag={c("about_hero_tag", "Industrial Recycled Plastics Manufacturer")}
      tagIcon="carbon:industry"
      title={rawTitle}
      titleAccent=""
      description={c(
        "about_hero_subtitle",
        "Manufacturing heavy-duty recycled plastic products for over 15 years in Gujarat, India. Supplying industrial pallets, crates, and premium recycled granules to leading enterprises."
      )}
    />
  );
}

