/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Recycle, ShieldCheck, Truck, ChevronRight } from "lucide-react";
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
          <ChevronRight size={12} className={styles.breadcrumbSep} />
          <span>Catalog</span>
          {activeCategory && activeCategory !== "All" && (
            <>
              <ChevronRight size={12} className={styles.breadcrumbSep} />
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
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowDot} />
              <span>SUSTAINABLE POLYMER MANUFACTURING</span>
            </div>
            <h1 className={styles.heroTitle}>
              Recycled Plastic <br className="hidden sm:inline" />
              <span className={styles.heroTitleAccent}>Lumber & Pallet Catalog</span>
            </h1>
            <p className={styles.heroDescription}>
              Engineered industrial profiles, heavy-duty logistics pallets, municipal benches,
              and custom extruded profiles built from 100% post-consumer plastic. Zero rot, maintenance-free, and weather-proof.
            </p>
          </motion.div>

          <motion.div
            className={styles.heroStatsCol}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <div className={styles.statBox}>
              <div className={styles.statIconWrapper}>
                <Recycle size={20} />
              </div>
              <div>
                <span className={styles.statVal}>100%</span>
                <span className={styles.statLabel}>Recycled Plastic</span>
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statIconWrapper}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className={styles.statVal}>Zero Rot</span>
                <span className={styles.statLabel}>Weather & Termite Proof</span>
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statIconWrapper}>
                <Truck size={20} />
              </div>
              <div>
                <span className={styles.statVal}>Bulk Dispatch</span>
                <span className={styles.statLabel}>Pan-India B2B Supply</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
