import React from "react";
import { useSite } from "../../../shared/context/SiteContext";
import { PageHero } from "@/shared/ui";
import contactHeroBg from "@assets/images/maps/india_supply_chain_map_1785866798806.jpg";

export default function ContactHero() {
  const { c } = useSite();

  if (c("show_contact_hero", "1") === "0") return null;

  return (
    <PageHero
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Contact Us" },
      ]}
      bgImage={contactHeroBg}
      bgOpacity="opacity-60"
      tag={c("contact_hero_badge", "Sales & Inquiries")}
      tagIcon="carbon:headset"
      title={c("contact_hero_title", "Get a Quote & Contact Our Factory")}
      description={c(
        "contact_hero_sub",
        "Request bulk pricing, custom sizes, or place direct orders with our Ankleshwar manufacturing facility."
      )}
    />
  );
}


