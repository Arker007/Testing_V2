import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import OptimizedImage from "../../shared/components/OptimizedImage";
import styles from "../../pages/Home.module.css";
import {
  MotionArrowRight,
  bentoArrowVariants,
  industryCardVariant,
} from "./home.constants";

export const IndustryCard = React.memo(function IndustryCard({ item }) {
  const {
    title,
    desc,
    image,
    delay,
    cardType,
    spanClass,
    badgeText,
    badgeClass,
    IconComponent,
    iconVariants,
  } = item;

  // Featured Large Card Layout
  if (cardType === "featured") {
    return (
      <motion.div
        variants={industryCardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover="hover"
        transition={{ delay }}
        className={`${styles.industryCard} ${styles.cardLargeDark} !p-3.5 sm:!p-4 flex flex-col justify-between relative`}
      >
        <div className={styles.cardBgWrapper}>
          <OptimizedImage
            src={image}
            alt={title}
            className={styles.cardBgImage}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-white/80 dark:bg-black/50 backdrop-blur-md border border-slate-200/80 dark:border-white/20 flex items-center justify-center text-[var(--brand-text)] dark:text-[var(--brand)] shrink-0 shadow-md">
            <IconComponent className="w-6 h-6 text-current" variants={iconVariants} />
          </div>
          {badgeText && <span className={styles[badgeClass]}>{badgeText}</span>}
        </div>

        <div className="relative z-10 mt-auto bg-white/85 dark:bg-black/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-white/20 text-slate-900 dark:text-white shadow-lg dark:shadow-xl">
          <h4 className="text-slate-900 dark:text-white text-base sm:text-lg font-extrabold mb-1">{title}</h4>
          <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">{desc}</p>
        </div>
      </motion.div>
    );
  }

  // Wide Card Row Layout (e.g. Residential, Commercial)
  if (cardType === "wideRow" || cardType === "wideRowHeader") {
    return (
      <motion.div
        variants={industryCardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover="hover"
        transition={{ delay }}
        className={`${styles.industryCard} ${spanClass ? styles[spanClass] : ""} !p-3.5 sm:!p-4 flex flex-col justify-between relative`}
      >
        <div className={styles.cardBgWrapper}>
          <OptimizedImage
            src={image}
            alt={title}
            className={styles.cardBgImageRightHalf}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-white/80 dark:bg-black/50 backdrop-blur-md border border-slate-200/80 dark:border-white/20 flex items-center justify-center text-[var(--brand-text)] dark:text-[var(--brand)] shrink-0 shadow-md">
            <IconComponent className="w-6 h-6 text-current" variants={iconVariants} />
          </div>
          {cardType === "wideRowHeader" && badgeText && <span className={styles[badgeClass]}>{badgeText}</span>}
        </div>

        <div className="relative z-10 mt-auto bg-white/85 dark:bg-black/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-white/20 text-slate-900 dark:text-white shadow-lg dark:shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-slate-900 dark:text-white text-base sm:text-lg font-extrabold mb-1">{title}</h4>
              <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">{desc}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900/10 dark:bg-white/10 border border-slate-900/15 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white shrink-0 mt-0.5">
              <MotionArrowRight className="w-4 h-4" variants={bentoArrowVariants} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Wide Column Layout (Education, Warehousing, Agriculture)
  if (cardType === "wide" || cardType === "wideHeader") {
    return (
      <motion.div
        variants={industryCardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover="hover"
        transition={{ delay }}
        className={`${styles.industryCard} ${spanClass ? styles[spanClass] : ""} !p-3.5 sm:!p-4 flex flex-col justify-between relative`}
      >
        <div className={styles.cardBgWrapper}>
          <OptimizedImage
            src={image}
            alt={title}
            className={styles.cardBgImageRightHalf}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-white/80 dark:bg-black/50 backdrop-blur-md border border-slate-200/80 dark:border-white/20 flex items-center justify-center text-[var(--brand-text)] dark:text-[var(--brand)] shrink-0 shadow-md">
            <IconComponent className="w-6 h-6 text-current" variants={iconVariants} />
          </div>
          {cardType === "wideHeader" && badgeText && <span className={styles[badgeClass]}>{badgeText}</span>}
        </div>

        <div className="relative z-10 mt-auto bg-white/85 dark:bg-black/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-white/20 text-slate-900 dark:text-white shadow-lg dark:shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-slate-900 dark:text-white text-base sm:text-lg font-extrabold mb-1">{title}</h4>
              <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">{desc}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900/10 dark:bg-white/10 border border-slate-900/15 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white shrink-0 mt-0.5">
              <MotionArrowRight className="w-4 h-4" variants={bentoArrowVariants} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard 1x1 Card
  return (
    <motion.div
      variants={industryCardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      transition={{ delay }}
      className={`${styles.industryCard} !p-3.5 sm:!p-4 flex flex-col justify-between relative`}
    >
      <div className={styles.cardBgWrapper}>
        <OptimizedImage
          src={image}
          alt={title}
          className={styles.cardBgImageRight}
        />
      </div>

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-white/80 dark:bg-black/50 backdrop-blur-md border border-slate-200/80 dark:border-white/20 flex items-center justify-center text-[var(--brand-text)] dark:text-[var(--brand)] shrink-0 shadow-md">
          <IconComponent className="w-6 h-6 text-current" variants={iconVariants} />
        </div>
      </div>

      <div className="relative z-10 mt-auto bg-white/85 dark:bg-black/60 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-white/20 text-slate-900 dark:text-white shadow-lg dark:shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-slate-900 dark:text-white text-base sm:text-lg font-extrabold mb-1">{title}</h4>
            <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">{desc}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-900/10 dark:bg-white/10 border border-slate-900/15 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white shrink-0 mt-0.5">
            <MotionArrowRight className="w-4 h-4" variants={bentoArrowVariants} />
          </div>
        </div>
      </div>
    </motion.div>
  );
});
