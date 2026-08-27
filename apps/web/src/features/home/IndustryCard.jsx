import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import OptimizedImage from "../../shared/components/OptimizedImage";
import styles from "./home.module.css";
import {
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
    IconComponent,
    iconVariants,
  } = item;

  // Featured Large Card Layout
  if (cardType === "featured") {
    return (
      <motion.div
        variants={industryCardVariant}
        custom={delay}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover="hover"
        className={`group ${styles.industryCard} ${styles.cardLargeDark} !p-5 sm:!p-6 flex flex-col justify-between relative overflow-hidden rounded-2xl border border-[var(--border-card)] bg-slate-950`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
          <OptimizedImage
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/15 pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#5FBF50] text-slate-950 backdrop-blur-md border border-[#5FBF50] flex items-center justify-center shrink-0 shadow-md transition-all duration-300">
            <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
          </div>
          {badgeText && (
            <span className="bg-[#5FBF50] text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-md border border-[#5FBF50]">
              {badgeText}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-auto pt-6">
          <h4 className="text-[#FFFFFF] text-lg sm:text-xl font-black mb-1.5 drop-shadow-sm">{title}</h4>
          <p className="text-[#D8DEDA] dark:text-[#D8DEDA] !text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
        </div>
      </motion.div>
    );
  }

  // Wide Card Row Layout (e.g. Residential, Commercial)
  if (cardType === "wideRow" || cardType === "wideRowHeader") {
    return (
      <motion.div
        variants={industryCardVariant}
        custom={delay}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover="hover"
        className={`group ${styles.industryCard} ${spanClass ? styles[spanClass] : ""} !p-4 sm:!p-5 flex flex-col justify-between relative overflow-hidden rounded-2xl border border-[var(--border-card)] bg-slate-950`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
          <OptimizedImage
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#5FBF50] text-slate-950 backdrop-blur-md border border-[#5FBF50] flex items-center justify-center shrink-0 shadow-md transition-all duration-300">
            <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
          </div>
          {cardType === "wideRowHeader" && badgeText && (
            <span className="bg-[#5FBF50] text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-md border border-[#5FBF50]">
              {badgeText}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-auto pt-6">
          <h4 className="text-[#FFFFFF] text-base sm:text-lg font-black mb-1 drop-shadow-sm">{title}</h4>
          <p className="text-[#D8DEDA] dark:text-[#D8DEDA] !text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
        </div>
      </motion.div>
    );
  }

  // Wide Column Layout (Education, Warehousing, Agriculture)
  if (cardType === "wide" || cardType === "wideHeader") {
    return (
      <motion.div
        variants={industryCardVariant}
        custom={delay}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover="hover"
        className={`group ${styles.industryCard} ${spanClass ? styles[spanClass] : ""} !p-4 sm:!p-5 flex flex-col justify-between relative overflow-hidden rounded-lg border border-[var(--border-card)] bg-slate-950`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
          <OptimizedImage
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#5FBF50] text-slate-950 backdrop-blur-md border border-[#5FBF50] flex items-center justify-center shrink-0 shadow-md transition-all duration-300">
            <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
          </div>
          {cardType === "wideHeader" && badgeText && (
            <span className="bg-[#5FBF50] text-slate-950 font-bold text-xs px-3 py-1 rounded-lg shadow-md border border-[#5FBF50]">
              {badgeText}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-auto pt-6">
          <h4 className="text-[#FFFFFF] text-base sm:text-lg font-black mb-1 drop-shadow-sm">{title}</h4>
          <p className="text-[#D8DEDA] dark:text-[#D8DEDA] !text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
        </div>
      </motion.div>
    );
  }

  // Standard 1x1 Card
  return (
    <motion.div
      variants={industryCardVariant}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      className={`group ${styles.industryCard} !p-4 sm:!p-5 flex flex-col justify-between relative overflow-hidden rounded-lg border border-[var(--border-card)] bg-slate-950`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#5FBF50] text-slate-950 backdrop-blur-md border border-[#5FBF50] flex items-center justify-center shrink-0 shadow-md transition-all duration-300">
          <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <h4 className="text-[#FFFFFF] text-base sm:text-lg font-black mb-1 drop-shadow-sm">{title}</h4>
        <p className="text-[#D8DEDA] dark:text-[#D8DEDA] !text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
      </div>
    </motion.div>
  );
});

export default IndustryCard;
