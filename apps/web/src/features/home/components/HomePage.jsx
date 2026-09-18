import React from "react";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle";
import useMediaQuery from "../../../shared/hooks/useMediaQuery";
import { useSite } from "../../../shared/context/SiteContext";
import styles from "../home.module.css";
import ProductsShowcase from "./ProductsShowcase";
import { FeaturesSection } from "./Features";
import { SectionHeader } from "@/shared/ui";
import {
  HomeHero,
  HomeHeroMobile,
  TrustedBySection,
  IndustriesGrid,
  HomeCtaSection,
} from "../";

export default function HomePage() {
  const { c, co } = useSite();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useDocumentTitle(
    c("meta_home_title", `${co("name", "VISHAL ENTERPRISE")} | Recycled Plastic Manufacturer India`),
    c(
      "meta_home_desc",
      "India's leading manufacturer of recycled plastic pallets, HDPE granules, plastic lumber & industrial containers. GST Registered."
    )
  );

  return (
    <div className={styles.main}>
      {isMobile ? <HomeHeroMobile /> : <HomeHero />}
      <TrustedBySection />

      {/* Product Categories Grid */}
      {c("show_categories", "1") !== "0" && (
        <section className={styles.categoriesSection}>
          <div className="container">
            <SectionHeader
              eyebrow={c("categories_eyebrow", "Product Ecosystem")}
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
