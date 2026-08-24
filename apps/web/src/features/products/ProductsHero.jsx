/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/Products.module.css";

export default function ProductsHero({ activeCategory }) {
  const { c } = useSite();

  return (
    <header className={styles.productsHero}>
      <div className={styles.heroBgPattern} />
      <div className="container relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          className={`${styles.heroBreadcrumb} mb-5`}
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[var(--brand,#5FBF50)] transition-colors">
            <Icon icon="solar:home-2-linear" className="w-3.5 h-3.5 opacity-80 shrink-0" />
            <span>Home</span>
          </Link>
          <Icon icon="solar:alt-arrow-right-linear" className={`${styles.breadcrumbSep} w-3 h-3 shrink-0`} />
          <span className={!activeCategory || activeCategory === "All" ? styles.breadcrumbActive : "text-white/80"}>
            Products
          </span>
          {activeCategory && activeCategory !== "All" && (
            <>
              <Icon icon="solar:alt-arrow-right-linear" className={`${styles.breadcrumbSep} w-3 h-3 shrink-0`} />
              <span className={styles.breadcrumbActive}>{activeCategory}</span>
            </>
          )}
        </motion.nav>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroTextCol}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5FBF50]/15 dark:bg-[#5FBF50]/10 border border-[#5FBF50]/30 dark:border-[#5FBF50]/40 rounded-full text-[#5FBF50] font-bold text-xs tracking-wider uppercase shadow-xs">
                <Icon icon="solar:box-minimalistic-linear" className="w-4 h-4" />
                <span>{c("products_hero_tag", "Sustainable Polymer Manufacturing")}</span>
              </span>
            </div>
            <h1 className="font-[var(--font-display,inherit)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white tracking-tight my-3.5 leading-[1.2]">
              Recycled Plastic <span className={styles.heroTitleAccent}>Lumber & Pallet Catalog</span>
            </h1>
            <p className="text-white/85 text-base sm:text-lg max-w-[720px] leading-[1.7] m-0">
              {c("products_hero_subtitle", "Engineered industrial profiles, heavy-duty logistics pallets, municipal benches, and custom extruded profiles built from 100% post-consumer plastic. Zero rot, maintenance-free, and weather-proof.")}
            </p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

