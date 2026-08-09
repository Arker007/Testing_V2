import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import styles from "./Home.module.css";
import ProductsShowcase from "../shared/components/ProductsShowcase";
import FeaturesSection from "../shared/components/ui/FeaturesSection";
import HomeHero from "../features/home/HomeHero";
import TrustedBySection from "../features/home/TrustedBySection";
import IndustriesGrid from "../features/home/IndustriesGrid";
import HomeCtaSection from "../features/home/HomeCtaSection";

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
            <div className={styles.sectionHeader}>
              <span className="section-eyebrow mx-auto">Product Ecosystem</span>
              <h2 className="section-title">{c("categories_title", "High-Performance Recycled Alternatives")}</h2>
              <p className="section-subtitle">
                {c("categories_subtitle", "Replacing conventional lumber, steel, and concrete with carbon-negative structural materials that require absolutely zero maintenance.")}
              </p>
            </div>
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
