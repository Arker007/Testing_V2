/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/About.module.css";

export default function AboutHero() {
  const { c } = useSite();

  if (c("about_hero_enabled", "1") === "0") return null;

  return (
    <header className={styles.hero}>
      <div className={styles.heroBg} />
      <div className="container relative z-10">
        {/* Breadcrumb Navigation */}
        <motion.nav
          className="flex items-center gap-2 text-sm font-medium text-white/75 mb-5"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#77D986] transition-colors">
            <Icon icon="solar:home-2-linear" className="w-3.5 h-3.5 opacity-80 shrink-0" />
            <span>Home</span>
          </Link>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-white/40 shrink-0" />
          <span className="text-[#77D986] font-semibold">About Us</span>
        </motion.nav>

        <div className="flex flex-col">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#77D986]/15 dark:bg-[#77D986]/10 border border-[#77D986]/30 dark:border-[#77D986]/40 rounded-full text-[#77D986] font-bold text-xs tracking-wider uppercase shadow-xs">
                <Icon icon="solar:history-linear" className="w-4 h-4" />
                <span>{c("about_hero_tag", "Pioneering Recycled Polymer Extrusion")}</span>
              </span>
            </div>

            <h1 className="font-[var(--font-display,inherit)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white tracking-tight my-3.5 leading-[1.2]">
              Building a Greener Future with <span className="text-[#4FC36D]">Plastic Lumber</span>
            </h1>
            <p className="text-white/85 text-base sm:text-lg max-w-[720px] leading-[1.7] m-0">
              {c(
                "about_hero_sub",
                "Pioneering sustainable plastic manufacturing for over 15 years in Gujarat, India. Transforming polymer waste into high-density industrial lumber & profiles."
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
