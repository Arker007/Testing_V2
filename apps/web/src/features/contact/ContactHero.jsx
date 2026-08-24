/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/Contact.module.css";

export default function ContactHero() {
  const { c } = useSite();

  if (c("show_contact_hero", "1") === "0") return null;

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
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#5FBF50] transition-colors">
            <Icon icon="solar:home-2-linear" className="w-3.5 h-3.5 opacity-80 shrink-0" />
            <span>Home</span>
          </Link>
          <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-white/40 shrink-0" />
          <span className="text-[#5FBF50] font-semibold">Contact Us</span>
        </motion.nav>

        <div className="flex flex-col">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5FBF50]/15 dark:bg-[#5FBF50]/10 border border-[#5FBF50]/30 dark:border-[#5FBF50]/40 rounded-full text-[#5FBF50] font-bold text-xs tracking-wider uppercase shadow-xs">
                <Icon icon="solar:bolt-linear" className="w-4 h-4" />
                <span>{c("contact_hero_badge", "Get in Touch with Our Specialists")}</span>
              </span>
            </div>

            <h1 className="font-[var(--font-display,inherit)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white tracking-tight my-3.5 leading-[1.2]">
              Let's Discuss Your <span className="text-[#4FC36D]">Recycled Plastic Requirements</span>
            </h1>
            <p className="text-white/85 text-base sm:text-lg max-w-[720px] leading-[1.7] m-0">
              {c(
                "contact_hero_sub",
                "Request bulk pricing, custom product dimensions, or get direct support from our sales and engineering team."
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
