import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { OptimizedImage } from "@/shared/ui";
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
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 via-45% to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div
            style={{
              backgroundColor: "var(--brand-primary)",
              borderColor: "var(--brand-primary)",
              color: "var(--brand-btn-text)",
            }}
            className="w-11 h-11 rounded-[var(--radius-btn,8px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] flex items-center justify-center border !border-[var(--brand-primary)] shrink-0 shadow-md transition-all duration-200 group-hover:scale-105"
          >
            <IconComponent className="w-5 h-5 !text-[var(--brand-btn-text)] text-current" variants={iconVariants} />
          </div>
          {badgeText && (
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-white/75 shrink-0 drop-shadow-xs">
              {badgeText}
            </span>
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
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/35 via-35% to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div
            style={{
              backgroundColor: "var(--brand-primary)",
              borderColor: "var(--brand-primary)",
              color: "var(--brand-btn-text)",
            }}
            className="w-11 h-11 rounded-[var(--radius-btn,8px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] flex items-center justify-center border !border-[var(--brand-primary)] shrink-0 shadow-md transition-all duration-200 group-hover:scale-105"
          >
            <IconComponent className="w-5 h-5 !text-[var(--brand-btn-text)] text-current" variants={iconVariants} />
          </div>
          {cardType === "wideRowHeader" && badgeText && (
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-white/75 shrink-0 drop-shadow-xs">
              {badgeText}
            </span>
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
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/35 via-35% to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div
            style={{
              backgroundColor: "var(--brand-primary)",
              borderColor: "var(--brand-primary)",
              color: "var(--brand-btn-text)",
            }}
            className="w-11 h-11 rounded-[var(--radius-btn,8px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] flex items-center justify-center border !border-[var(--brand-primary)] shrink-0 shadow-md transition-all duration-200 group-hover:scale-105"
          >
            <IconComponent className="w-5 h-5 !text-[var(--brand-btn-text)] text-current" variants={iconVariants} />
          </div>
          {cardType === "wideHeader" && badgeText && (
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-white/75 shrink-0 drop-shadow-xs">
              {badgeText}
            </span>
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
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/35 via-35% to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div
          style={{
            backgroundColor: "var(--brand-primary)",
            borderColor: "var(--brand-primary)",
            color: "var(--brand-btn-text)",
          }}
          className="w-9 h-9 rounded-[var(--radius-btn,8px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] flex items-center justify-center border !border-[var(--brand-primary)] shrink-0 shadow-md transition-colors duration-200 group-hover:scale-105"
        >
          <IconComponent className="w-4 h-4 !text-[var(--brand-btn-text)] text-current" variants={iconVariants} />
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
