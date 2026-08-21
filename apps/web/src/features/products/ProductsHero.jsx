/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "../../pages/Products.module.css";

export default function ProductsHero({ activeCategory }) {
  return (
    <header className={styles.productsHero}>
      <div className={styles.heroBgPattern} />
      <div className="container relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          className={styles.heroBreadcrumb}
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/">Home</Link>
          <Icon icon="solar:alt-arrow-right-linear" className={`${styles.breadcrumbSep} w-3 h-3 inline`} />
          <span>Catalog</span>
          {activeCategory && activeCategory !== "All" && (
            <>
              <Icon icon="solar:alt-arrow-right-linear" className={`${styles.breadcrumbSep} w-3 h-3 inline`} />
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
            <span className={styles.heroTagline}>SUSTAINABLE POLYMER MANUFACTURING</span>
            <h1 className={styles.heroTitle}>
              Recycled Plastic <span className={styles.heroTitleAccent}>Lumber & Pallet Catalog</span>
            </h1>
            <p className={styles.heroDescription}>
              Engineered industrial profiles, heavy-duty logistics pallets, municipal benches,
              and custom extruded profiles built from 100% post-consumer plastic. Zero rot, maintenance-free, and weather-proof.
            </p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

