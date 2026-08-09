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
    isDark,
    badgeText,
    badgeClass,
    IconComponent,
    iconVariants,
    iconBoxClass,
    statIcon: StatIcon,
    statVariants,
    statText,
    tagText,
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
        className={`${styles.industryCard} ${styles.cardLargeDark}`}
      >
        <div className={styles.cardBgWrapper}>
          <OptimizedImage
            src={image}
            alt={title}
            className={styles.cardBgImage}
          />
          <div className={styles.cardBgOverlayDark} />
        </div>

        <div className={styles.cardContent}>
          <div className={styles.indCardHeader}>
            <div className={`${styles.indIconBox} ${styles[iconBoxClass]}`}>
              <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
            </div>
            {badgeText && <span className={styles[badgeClass]}>{badgeText}</span>}
          </div>
          <div className={styles.indCardMain}>
            <h4 className={styles.indName}>{title}</h4>
            <p className={styles.indDesc}>{desc}</p>
          </div>
          <div className={styles.bentoDivider} />
          <div className={styles.bentoFooter}>
            {StatIcon && statText && (
              <span className={styles.bentoStat}>
                <StatIcon className="w-4 h-4 text-current" variants={statVariants} /> {statText}
              </span>
            )}
            {tagText && <span className={styles.bentoTag}>{tagText}</span>}
          </div>
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
        className={`${styles.industryCard} ${isDark ? styles.cardDark : styles.cardLight} ${spanClass ? styles[spanClass] : ""}`}
      >
        <div className={styles.cardBgWrapper}>
          <OptimizedImage
            src={image}
            alt={title}
            className={styles.cardBgImageRightHalf}
          />
          <div className={isDark ? styles.cardBgOverlayDarkHalf : styles.cardBgOverlayLightHalf} />
        </div>

        <div className={styles.cardContentWideRow}>
          {cardType === "wideRowHeader" && badgeText ? (
            <div className={styles.indCardHeaderWideRow}>
              <div className={`${styles.indIconBox} ${styles[iconBoxClass]}`}>
                <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
              </div>
              <span className={styles[badgeClass]}>{badgeText}</span>
            </div>
          ) : (
            <div className={`${styles.indIconBox} ${styles[iconBoxClass]}`}>
              <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
            </div>
          )}
          <div className={styles.indCardMainRow}>
            <h4 className={styles.indName}>{title}</h4>
            <p className={styles.indDesc}>{desc}</p>
          </div>
          <div className={styles.arrowButtonRow}>
            <MotionArrowRight className="w-5 h-5 text-current" variants={bentoArrowVariants} />
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
        className={`${styles.industryCard} ${styles.cardLight} ${spanClass ? styles[spanClass] : ""}`}
      >
        <div className={styles.cardBgWrapper}>
          <OptimizedImage
            src={image}
            alt={title}
            className={styles.cardBgImageRightHalf}
          />
          <div className={styles.cardBgOverlayLightHalf} />
        </div>

        <div className={styles.cardContentWide}>
          {cardType === "wideHeader" && badgeText ? (
            <div className={styles.indCardHeaderWide}>
              <div className={`${styles.indIconBox} ${styles[iconBoxClass]}`}>
                <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
              </div>
              <span className={styles[badgeClass]}>{badgeText}</span>
            </div>
          ) : (
            <div className={`${styles.indIconBox} ${styles[iconBoxClass]}`}>
              <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
            </div>
          )}
          <div className={styles.indCardMain}>
            <h4 className={styles.indName}>{title}</h4>
            <p className={styles.indDesc}>{desc}</p>
          </div>
          <div className={styles.arrowButtonWide}>
            <MotionArrowRight className="w-5 h-5 text-current" variants={bentoArrowVariants} />
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
      className={`${styles.industryCard} ${styles.cardLight}`}
    >
      <div className={styles.cardBgWrapper}>
        <OptimizedImage
          src={image}
          alt={title}
          className={styles.cardBgImageRight}
        />
        <div className={styles.cardBgOverlayLight} />
      </div>

      <div className={styles.cardContent}>
        <div className={`${styles.indIconBox} ${styles[iconBoxClass]}`}>
          <IconComponent className="w-5 h-5 text-current" variants={iconVariants} />
        </div>
        <div className={styles.indCardMain}>
          <h4 className={styles.indName}>{title}</h4>
          <p className={styles.indDesc}>{desc}</p>
        </div>
        <div className={styles.arrowButton}>
          <MotionArrowRight className="w-5 h-5 text-current" variants={bentoArrowVariants} />
        </div>
      </div>
    </motion.div>
  );
});
