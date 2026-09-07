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
      tag={c("products_hero_tag", "Industrial Polymer Products")}
      tagIcon="carbon:cube"
      title="Recycled Plastic Pallet & Lumber Catalog"
      description={c(
        "products_hero_subtitle",
        "Engineered industrial profiles, heavy-duty logistics pallets, municipal benches, and custom extruded sections manufactured from 100% recycled HDPE. Zero rot, termite-proof, and maintenance-free."
      )}
    />
  );
}

