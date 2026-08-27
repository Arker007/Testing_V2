import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import styles from "../features/home/home.module.css";
import ProductsShowcase from "../shared/components/ProductsShowcase";
import FeaturesSection from "../shared/components/ui/FeaturesSection";
import SectionHeader from "../shared/components/ui/SectionHeader";
import {
  HomeHero,
  TrustedBySection,
  IndustriesGrid,
  HomeCtaSection,
} from "../features/home";

export default function Home() {
  const { c, co } = useSite();

  useDocumentTitle(
    c("meta_home_title", `${co("name", "VISHAL ENTERPRISE")} | Recycled Plastic Manufacturer India`),
    c(
      "meta_home_desc",
      "India's leading manufacturer of recycled plastic pallets, HDPE granules, plastic lumber & industrial containers. GST Registered."
    )
  );

  return (
    <div className={styles.main}>
      <HomeHero />
      <TrustedBySection />

      {/* Product Categories Grid */}
      {c("show_categories", "1") !== "0" && (
        <section className={styles.categoriesSection}>
          <div className="container">
            <SectionHeader
              eyebrow="Product Ecosystem"
              title={c("categories_title", "High-Performance Recycled Alternatives")}
              subtitle={c(
                "categories_subtitle",
                "Replacing conventional lumber, steel, and concrete with carbon-negative structural materials that require absolutely zero maintenance."
              )}
            />
            <ProductsShowcase />
          </div>
        </section>
      )}

      <FeaturesSection />
      <IndustriesGrid />
      <HomeCtaSection />
    </div>
  );
}
