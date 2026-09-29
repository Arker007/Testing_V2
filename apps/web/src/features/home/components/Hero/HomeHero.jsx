import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion as Motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useSite } from "../../../../shared/context/SiteContext";
import { OptimizedImage } from "@/shared/ui";
import styles from "./Hero.module.css";

import recycledPlasticProfiles from "../../../../assets/images/marketing/recycled_plastic_profiles_1785866736886.jpg";
import highLoadCapacity from "../../../../assets/images/backgrounds/high_load_capacity_1785866759510.jpg";
import weatherResistantBg from "../../../../assets/images/backgrounds/weather_resistant_bg_1785866780021.jpg";

// Slide-specific linear icons map from @iconify/react
const iconMap = {
  ShieldCheck: "carbon:security",
  Link2: "carbon:certificate",
  Droplets: "carbon:rain-drop",
  Wrench: "carbon:flash",
  Leaf: "carbon:recycle",
  Check: "carbon:checkmark",
  Eye: "carbon:star",
  Plane: "carbon:delivery-truck",
  Waves: "carbon:rain-drop"
};

const getOptimizedHeroImage = (imgSrc) => {
  if (!imgSrc) return "";
  if (imgSrc.includes(".webp") && !imgSrc.includes("_medium.webp") && !imgSrc.includes("_thumb.webp")) {
    return imgSrc.replace(".webp", "_medium.webp");
  }
  return imgSrc;
};

// Curated cinematic animation variants
const textContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

const badgeVariants = {
  initial: { opacity: 0, y: -10, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const titlePartVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const underlineVariants = {
  initial: { opacity: 0, scaleX: 0, transformOrigin: "left" },
  animate: {
    opacity: 1,
    scaleX: 1,
    transformOrigin: "left",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

const descVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
};

const featurePanelVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 24,
    },
  },
};

export default function HomeHero() {
  const { c, co } = useSite();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const slides = useMemo(() => [
    {
      category: c("home_slide1_category", "Recycled Plastic Lumber"),
      badge: c("home_slide1_badge", "Manufacturer & Supplier"),
      titleLime: c("home_slide1_title_accent", "RECYCLED"),
      titleWhite: c("home_slide1_title_main", "PLASTIC LUMBER"),
      desc: c(
        "home_slide1_desc",
        "Premium grade recycled polymer profiles engineered to replace wood and metal. Zero rot, zero splinter, and maintenance-free durability built for fifty-plus years of structural performance."
      ),
      image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
      fallbackSrc: recycledPlasticProfiles,
      features: [
        { icon: "ShieldCheck", title: c("home_slide1_f1_title", "Durable"), text: c("home_slide1_f1_desc", "Built for long-lasting structural performance") },
        { icon: "Droplets", title: c("home_slide1_f2_title", "Weatherproof"), text: c("home_slide1_f2_desc", "Zero rot, zero splinter, moisture resistant") },
        { icon: "Wrench", title: c("home_slide1_f3_title", "High Strength"), text: c("home_slide1_f3_desc", "High load capacity for demanding builds") },
        { icon: "Leaf", title: c("home_slide1_f4_title", "Eco Friendly"), text: c("home_slide1_f4_desc", "100% recycled polymer profile material") },
      ],
    },
    {
      category: c("home_slide2_category", "Industrial Plastic Pallets"),
      badge: c("home_slide2_badge", "Manufacturer & Supplier"),
      titleLime: c("home_slide2_title_accent", "HEAVY-DUTY"),
      titleWhite: c("home_slide2_title_main", "PLASTIC PALLETS"),
      desc: c(
        "home_slide2_desc",
        "High-capacity, injection-molded and extruded plastic pallets designed for efficient warehousing, industrial logistics, and reliable international sea freight shipping."
      ),
      image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
      fallbackSrc: highLoadCapacity,
      features: [
        { icon: "ShieldCheck", title: c("home_slide2_f1_title", "Heavy Duty"), text: c("home_slide2_f1_desc", "Withstands heavy static & dynamic loads") },
        { icon: "Droplets", title: c("home_slide2_f2_title", "Chemical Resistant"), text: c("home_slide2_f2_desc", "Resistant to acids, alkalis, and oils") },
        { icon: "Plane", title: c("home_slide2_f3_title", "Export Ready"), text: c("home_slide2_f3_desc", "Naturally phytosanitary exempt (ISPM-15)") },
        { icon: "Leaf", title: c("home_slide2_f4_title", "Sustainable"), text: c("home_slide2_f4_desc", "Fully recyclable at end of lifecycle") },
      ],
    },
    {
      category: c("home_slide3_category", "Outdoor Benches & Tables"),
      badge: c("home_slide3_badge", "Manufacturer & Supplier"),
      titleLime: c("home_slide3_title_accent", "WEATHERPROOF"),
      titleWhite: c("home_slide3_title_main", "GARDEN BENCHES"),
      desc: c(
        "home_slide3_desc",
        "Durable, heavy-duty outdoor seating systems perfect for garden, commercial, and public spaces. Built to withstand all weather conditions and last for years."
      ),
      image: "/uploads/products/categories/garden-bench-1770446422580-0.webp",
      fallbackSrc: weatherResistantBg,
      features: [
        { icon: "ShieldCheck", title: c("home_slide3_f1_title", "Weatherproof"), text: c("home_slide3_f1_desc", "Engineered to perform in all weather conditions") },
        { icon: "Link2", title: c("home_slide3_f2_title", "Rustproof"), text: c("home_slide3_f2_desc", "Corrosion-resistant for enhanced durability") },
        { icon: "Eye", title: c("home_slide3_f3_title", "Modern Design"), text: c("home_slide3_f3_desc", "Aesthetic and functional for all environments") },
        { icon: "Leaf", title: c("home_slide3_f4_title", "Eco Friendly"), text: c("home_slide3_f4_desc", "Non-toxic, eco-friendly & safe for all use") },
      ],
    },
  ], [c]);

  const [current, setCurrent] = useState(2); // Default to Slide 3 (Weatherproof Garden Benches matching reference)

  const heroRef = useRef(null);
  const hexagonCardRef = useRef(null);

  // Auto-advance logic (resets timer when current changes)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [current, slides.length]);

  if (c("show_hero", "1") === "0") return null;

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[current];
  const heroPhone = c("hero_assistance_phone", co("phone", "+91 98986 86379"));
  const cleanedPhone = heroPhone.replace(/\s+/g, "");

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="home-hero-redesign"
    >
      {/* Background Diagonal Split Elements */}
      <div className={styles.slantBgGreen} />
      <div className={styles.slantBgDark} />

      {/* Decorative Dotted Grids */}
      <div className={styles.dotsPatternLeft} />
      <div className={styles.dotsPatternRightTop} />
      <div className={styles.dotsPatternRightBottom} />

      <div className="container relative z-10">
        <div className={styles.heroGrid}>
          {/* Left Content Column */}
          <div className={styles.heroLeft}>
            <AnimatePresence mode="wait" initial={false}>
              <Motion.div
                key={current}
                variants={textContainerVariants}
                initial={isFirstRender ? false : "initial"}
                animate="animate"
                exit="exit"
                className={styles.heroLeftTopGroup}
              >
                {/* Manufacturer Badge */}
                <Motion.div variants={badgeVariants} className={styles.badge}>
                  <div className={styles.badgeIconWrapper}>
                    <Icon icon="carbon:industry" className={styles.badgeIcon} />
                  </div>
                  <span className={styles.badgeText}>{activeSlide.badge}</span>
                </Motion.div>

                {/* Headline */}
                <h1 className={styles.headline}>
                  <Motion.span variants={titlePartVariants} className={styles.titleLime}>
                    {activeSlide.titleLime}
                  </Motion.span>
                  <Motion.span variants={titlePartVariants} className={styles.titleWhite}>
                    {activeSlide.titleWhite}
                  </Motion.span>
                </h1>

                {/* Headline Underline Accent */}
                <Motion.div variants={underlineVariants} className={styles.underlineAccent}>
                  <span className={styles.underlineLine} />
                  <span className={styles.underlineDot} />
                </Motion.div>

                {/* Description */}
                <Motion.p variants={descVariants} className={styles.description}>
                  {activeSlide.desc}
                </Motion.p>
              </Motion.div>
            </AnimatePresence>

            {/* Feature Panel */}
            <AnimatePresence mode="wait" initial={false}>
              <Motion.div
                key={`features-${current}`}
                variants={featurePanelVariants}
                initial={isFirstRender ? false : "hidden"}
                animate="visible"
                exit="exit"
                className={styles.featurePanel}
              >
                {activeSlide.features.map((feat, idx) => {
                  const iconName = iconMap[feat.icon] || "carbon:security";
                  return (
                    <Motion.div
                      key={idx}
                      variants={featureItemVariants}
                      whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
                      className={styles.featureColumn}
                    >
                      <Motion.div
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className={styles.featureIconRing}
                      >
                        <Icon icon={iconName} className={styles.featureIcon} />
                      </Motion.div>
                      <span className={styles.featureTitle}>{feat.title}</span>
                      <p className={styles.featureDesc}>{feat.text}</p>
                    </Motion.div>
                  );
                })}
              </Motion.div>
            </AnimatePresence>

            {/* CTA Row & Decorative Slashes */}
            <div className={styles.ctaRow}>
              <Motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="inline-block"
              >
                <Link to="/products" className="exploreBtnGlobal">
                  <span>{c("hero_cta_primary", "Explore products")}</span>
                  <Motion.span
                    animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="inline-flex items-center"
                  >
                    <Icon icon="carbon:arrow-right" className="exploreBtnArrowGlobal" />
                  </Motion.span>
                </Link>
              </Motion.div>
              <div className={styles.decorativeSlashes} aria-hidden="true">
                <span>/</span><span>/</span><span>/</span><span>/</span>
                <span>/</span><span>/</span><span>/</span><span>/</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Column */}
          <div className={styles.heroRight}>
            <div className={styles.productShowcase}>
              <div
                ref={hexagonCardRef}
                id="hero-product-hexagon-frame"
                className={styles.productFrameWrapper}
              >
                {/* Navigation Chevron Buttons stuck directly to hexagon sides */}
                <button
                  id="hero-hexagon-chevron-prev"
                  type="button"
                  onClick={handlePrev}
                  className={`${styles.chevronBtn} ${styles.chevronBtnLeft} ${styles.hexagonSideBtn}`}
                  aria-label="Previous Slide"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M20 24l-8-8 8-8 1.4 1.4L14.8 16l6.6 6.6z" />
                  </svg>
                </button>
                <button
                  id="hero-hexagon-chevron-next"
                  type="button"
                  onClick={handleNext}
                  className={`${styles.chevronBtn} ${styles.chevronBtnRight} ${styles.hexagonSideBtn}`}
                  aria-label="Next Slide"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M12 8l8 8-8 8-1.4-1.4 6.6-6.6-6.6-6.6z" />
                  </svg>
                </button>

                {/* Hexagonal Geometric SVG Frame with Full-Screen Clipped Image and 3D Pedestal Stage */}
                <Motion.svg
                  className={styles.productFrameSvg}
                  viewBox="0 0 500 520"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <defs>
                    {/* Radial Spotlight Gradient for Product Stage */}
                    <radialGradient id="stageSpotlight" cx="50%" cy="52%" r="50%">
                      <stop offset="0%" stopColor="#78BF45" stopOpacity="0.14" />
                      <stop offset="50%" stopColor="#061A26" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#F2F2F2" stopOpacity="0" />
                    </radialGradient>

                    {/* Floor Perspective Pedestal Shadow */}
                    <radialGradient id="floorShadowGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#061A26" stopOpacity="0.28" />
                      <stop offset="60%" stopColor="#061A26" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#061A26" stopOpacity="0" />
                    </radialGradient>

                    <clipPath id="heroHexagonClip">
                      <path
                        d="M 250 42 
                           C 270 42, 430 118, 438 131 
                           C 446 144, 446 376, 438 389 
                           C 430 402, 270 478, 250 478 
                           C 230 478, 70 402, 62 389 
                           C 54 376, 54 144, 62 131 
                           C 70 118, 230 42, 250 42 Z"
                      />
                    </clipPath>
                  </defs>

                  {/* Outer White Hexagonal Card with Soft 3D Multi-Layer Shadow */}
                  <path
                    d="M 250 15 
                       C 275 15, 455 100, 465 115 
                       C 475 130, 475 390, 465 405 
                       C 455 420, 275 505, 250 505 
                       C 225 505, 45 420, 35 405 
                       C 25 390, 25 130, 35 115 
                       C 45 100, 225 15, 250 15 Z"
                    fill="var(--white)"
                  />

                  {/* Specular Inner Top Highlight Line for 3D Beveled Feel */}
                  <path
                    d="M 50 120 
                       C 60 108, 225 24, 250 24 
                       C 275 24, 440 108, 450 120"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.95)"
                    strokeWidth="3"
                  />

                  {/* Full-Screen Product Image Clipped to Hexagon with Framer Motion Transition */}
                  <g clipPath="url(#heroHexagonClip)">
                    <foreignObject x="0" y="0" width="500" height="520">
                      <div style={{ width: "100%", height: "100%", backgroundColor: "var(--white)", position: "relative", overflow: "hidden" }}>
                        {/* 3D Pedestal Spotlight Backdrop */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(circle at 50% 50%, rgba(120, 191, 69, 0.16) 0%, rgba(6, 26, 38, 0.04) 55%, transparent 75%)",
                            pointerEvents: "none",
                          }}
                        />

                        <AnimatePresence mode="wait" initial={false}>
                          <Motion.div
                            key={current}
                            initial={isFirstRender ? false : { opacity: 0, scale: 0.88, y: 12, filter: "blur(6px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.08, y: -8, filter: "blur(4px)" }}
                            transition={{
                              duration: 0.55,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "20px",
                              zIndex: 2,
                            }}
                          >
                            <OptimizedImage
                              src={getOptimizedHeroImage(activeSlide.image)}
                              fallbackSrc={activeSlide.fallbackSrc}
                              alt={activeSlide.titleWhite}
                              loading="eager"
                              fetchPriority="high"
                              width="500"
                              height="500"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                                filter: "none",
                              }}
                            />
                          </Motion.div>
                        </AnimatePresence>
                      </div>
                    </foreignObject>
                  </g>

                  {/* Inset Green Accent Stroke Frame Overlaid on Image */}
                  <path
                    d="M 250 42 
                       C 270 42, 430 118, 438 131 
                       C 446 144, 446 376, 438 389 
                       C 430 402, 270 478, 250 478 
                       C 230 478, 70 402, 62 389 
                       C 54 376, 54 144, 62 131 
                       C 70 118, 230 42, 250 42 Z"
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="2.5"
                  />
                </Motion.svg>
              </div>

              {/* Bottom Controls Row: Pagination Dots + Assistance Card */}
              <div className={styles.bottomControlsRow}>
                {/* Pagination Dots */}
                <div className={styles.paginationDots}>
                  <div className={styles.paginationTrack}>
                    {slides.map((slide, idx) => (
                      <Motion.button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.25 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        className={`${styles.paginationDot} ${
                          idx === current ? styles.paginationDotActive : ""
                        }`}
                        aria-label={`Go to slide ${idx + 1}: ${slide.titleWhite}`}
                        title={slide.titleWhite}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Assistance Card */}
                <Motion.div
                  className={styles.assistanceCard}
                  whileHover={shouldReduceMotion ? {} : { y: -3, boxShadow: "var(--shadow-lg)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  <Motion.div
                    className={styles.assistanceIconCircle}
                    whileHover={shouldReduceMotion ? {} : { rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon icon="carbon:headset" className="w-5 h-5 text-white" />
                  </Motion.div>
                  <div className={styles.assistanceTextGroup}>
                    <span className={styles.assistanceLabel}>{c("hero_assistance_title", "Need assistance?")}</span>
                    <span className={styles.assistanceSub}>
                      {c("hero_assistance_sub", "Our team is ready to help you find the right solution.")}
                    </span>
                  </div>
                  <Motion.a
                    href={`tel:${cleanedPhone}`}
                    className={styles.assistanceBtn}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  >
                    <Icon icon="carbon:phone" className="w-3.5 h-3.5 text-inherit" />
                    <span>{c("hero_assistance_btn", "Contact us")}</span>
                  </Motion.a>
                </Motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
