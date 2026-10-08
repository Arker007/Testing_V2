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
      bgOpacity="opacity-40"
      tag={c("contact_hero_badge", "Direct Factory Sales Desk")}
      tagIcon="carbon:headset"
      title={c("contact_hero_title", "Commercial Procurement & Engineering Support")}
      description={c(
        "contact_hero_sub",
        "Request volume pricing, custom extruded profiles, or schedule plant dispatches directly with our Ankleshwar manufacturing facility."
      )}
    />
  );
}


