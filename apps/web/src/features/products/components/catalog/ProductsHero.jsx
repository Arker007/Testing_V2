import React from "react";
import { useSite } from "../../../../shared/context/SiteContext";
import { PageHero } from "@/shared/ui";

export default function ProductsHero({ activeCategory }) {
  const { c } = useSite();

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Products", to: activeCategory && activeCategory !== "All" ? "/products" : undefined },
    ...(activeCategory && activeCategory !== "All" ? [{ label: activeCategory }] : []),
  ];

  return (
    <PageHero
      breadcrumbs={breadcrumbs}
      tag={c("products_hero_tag", "Sustainable Polymer Manufacturing")}
      tagIcon="solar:box-minimalistic-linear"
      title="Recycled Plastic"
      titleAccent="Lumber & Pallet Catalog"
      description={c(
        "products_hero_subtitle",
        "Engineered industrial profiles, heavy-duty logistics pallets, municipal benches, and custom extruded profiles built from 100% post-consumer plastic. Zero rot, maintenance-free, and weather-proof."
      )}
    />
  );
}
