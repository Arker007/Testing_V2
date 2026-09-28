import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { OptimizedImage } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import styles from "./Industries.module.css";

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{
          y: -6,
          scale: 1.015,
          transition: { duration: 0.12, delay: 0, ease: [0.16, 1, 0.3, 1] }
        }}
        className={`group ${styles.industryCard} ${styles.cardLargeDark} !p-5 sm:!p-6 flex flex-col justify-between relative overflow-hidden rounded-[var(--radius-card,8px)] border border-[var(--border-card)] bg-slate-950`}
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
          <div className="w-11 h-11 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] backdrop-blur-md border border-[var(--border-brand)] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
          </div>
          {badgeText && (
            <Badge variant="dark" size="sm">
              {badgeText}
            </Badge>
          )}
        </div>

        <div className="relative z-10 mt-auto pt-6">
          <h3 className="!text-white text-lg sm:text-xl font-black mb-1.5 drop-shadow-sm">{title}</h3>
          <p className="!text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
        </div>
      </motion.div>
    );
  }

  // Wide Card Row Layout (e.g. Residential, Commercial)
  if (cardType === "wideRow" || cardType === "wideRowHeader") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{
          y: -6,
          scale: 1.015,
          transition: { duration: 0.12, delay: 0, ease: [0.16, 1, 0.3, 1] }
        }}
        className={`group ${styles.industryCard} ${spanClass ? styles[spanClass] : ""} !p-4 sm:!p-5 flex flex-col justify-between relative overflow-hidden rounded-[var(--radius-card,8px)] border border-[var(--border-card)] bg-slate-950`}
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
          <div className="w-11 h-11 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] backdrop-blur-md border border-[var(--border-brand)] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
          </div>
          {cardType === "wideRowHeader" && badgeText && (
            <Badge variant="dark" size="sm">
              {badgeText}
            </Badge>
          )}
        </div>

        <div className="relative z-10 mt-auto pt-6">
          <h3 className="!text-white text-base sm:text-lg font-black mb-1 drop-shadow-sm">{title}</h3>
          <p className="!text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
        </div>
      </motion.div>
    );
  }

  // Wide Column Layout (Education, Warehousing, Agriculture)
  if (cardType === "wide" || cardType === "wideHeader") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{
          y: -6,
          scale: 1.015,
          transition: { duration: 0.12, delay: 0, ease: [0.16, 1, 0.3, 1] }
        }}
        className={`group ${styles.industryCard} ${spanClass ? styles[spanClass] : ""} !p-4 sm:!p-5 flex flex-col justify-between relative overflow-hidden rounded-[var(--radius-card,8px)] border border-[var(--border-card)] bg-slate-950`}
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
          <div className="w-11 h-11 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] backdrop-blur-md border border-[var(--border-brand)] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
          </div>
          {cardType === "wideHeader" && badgeText && (
            <Badge variant="dark" size="sm">
              {badgeText}
            </Badge>
          )}
        </div>

        <div className="relative z-10 mt-auto pt-6">
          <h3 className="!text-white text-base sm:text-lg font-black mb-1 drop-shadow-sm">{title}</h3>
          <p className="!text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
        </div>
      </motion.div>
    );
  }

  // Standard 1x1 Card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.12, delay: 0, ease: [0.16, 1, 0.3, 1] }
      }}
      className={`group ${styles.industryCard} !p-4 sm:!p-5 flex flex-col justify-between relative overflow-hidden rounded-[var(--radius-card,8px)] border border-[var(--border-card)] bg-slate-950`}
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
        <div className="w-11 h-11 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] backdrop-blur-md border border-[var(--border-brand)] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105">
          <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <h3 className="!text-white text-base sm:text-lg font-black mb-1 drop-shadow-sm">{title}</h3>
        <p className="!text-[#D8DEDA] text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">{desc}</p>
      </div>
    </motion.div>
  );
});

export default IndustryCard;
