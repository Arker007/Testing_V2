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
      tag={c("contact_hero_badge", "Direct Factory Sales Desk")}
      tagIcon="solar:headphones-round-linear"
      title="Commercial Procurement & Engineering Support"
      description={c(
        "contact_hero_sub",
        "Request volume pricing, custom extruded profiles, or schedule plant dispatches directly with our Ankleshwar manufacturing facility."
      )}
    />
  );
}


