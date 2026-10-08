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

const iconMap = {
  ShieldCheck: "carbon:security",
  Link2: "carbon:certificate",
  Droplets: "carbon:rain-drop",
  Wrench: "carbon:flash",
  Leaf: "carbon:recycle",
  Check: "carbon:checkmark",
  Eye: "carbon:star",
  Plane: "carbon:cube",
  Waves: "carbon:rain-drop"
};

const getOptimizedMobileHeroImage = (imgSrc) => {
  if (!imgSrc) return "";
  if (imgSrc.includes(".webp") && !imgSrc.includes("_medium.webp") && !imgSrc.includes("_thumb.webp")) {
    return imgSrc.replace(".webp", "_medium.webp");
  }
  return imgSrc;
};

// Motion variants for mobile viewport
const mobileTextContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2 },
  },
};

const mobileTitleItemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const mobileFeaturesVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function HomeHeroMobile() {
  const { c, co } = useSite();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const slides = useMemo(() => [
    {
      category: c("home_slide1_category", "Recycled Plastic Lumber"),
      badge: c("home_slide1_badge", "MANUFACTURER & SUPPLIER"),
      titleLime: c("home_slide1_title_accent", "RECYCLED"),
      titleWhite: c("home_slide1_title_main", "PLASTIC LUMBER"),
      desc: c(
        "home_slide1_desc",
        "Premium grade recycled polymer profiles engineered to replace wood and metal. Zero rot, zero splinter, and maintenance-free durability built for fifty-plus years of structural performance."
      ),
      image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
      fallbackSrc: recycledPlasticProfiles,
      features: [
        { icon: "ShieldCheck", title: c("home_slide1_f1_title", "DURABLE"), text: c("home_slide1_f1_desc", "Built for long lasting structural performance") },
        { icon: "Droplets", title: c("home_slide1_f2_title", "WEATHERPROOF"), text: c("home_slide1_f2_desc", "Zero rot, zero splinter, moisture resistant") },
        { icon: "Wrench", title: c("home_slide1_f3_title", "HIGH STRENGTH"), text: c("home_slide1_f3_desc", "High load capacity for demanding builds") },
        { icon: "Leaf", title: c("home_slide1_f4_title", "ECO FRIENDLY"), text: c("home_slide1_f4_desc", "100% recycled polymer profile material") }
      ]
    },
    {
      category: c("home_slide2_category", "Industrial Plastic Pallets"),
      badge: c("home_slide2_badge", "MANUFACTURER & SUPPLIER"),
      titleLime: c("home_slide2_title_accent", "HEAVY-DUTY"),
      titleWhite: c("home_slide2_title_main", "PLASTIC PALLETS"),
      desc: c(
        "home_slide2_desc",
        "High-capacity, injection-molded and extruded plastic pallets designed for efficient warehousing, industrial logistics, and reliable international sea freight shipping."
      ),
      image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
      fallbackSrc: highLoadCapacity,
      features: [
        { icon: "ShieldCheck", title: c("home_slide2_f1_title", "HEAVY DUTY"), text: c("home_slide2_f1_desc", "Withstands heavy static & dynamic loads") },
        { icon: "Droplets", title: c("home_slide2_f2_title", "CHEMICAL RESIST"), text: c("home_slide2_f2_desc", "Resistant to acids, alkalis, and oils") },
        { icon: "Plane", title: c("home_slide2_f3_title", "EXPORT READY"), text: c("home_slide2_f3_desc", "Naturally phytosanitary exempt (ISPM-15)") },
        { icon: "Leaf", title: c("home_slide2_f4_title", "SUSTAINABLE"), text: c("home_slide2_f4_desc", "Fully recyclable at end of lifecycle") }
      ]
    },
    {
      category: c("home_slide3_category", "Outdoor Benches & Tables"),
      badge: c("home_slide3_badge", "MANUFACTURER & SUPPLIER"),
      titleLime: c("home_slide3_title_accent", "WEATHERPROOF"),
      titleWhite: c("home_slide3_title_main", "GARDEN BENCHES"),
      desc: c(
        "home_slide3_desc",
        "Durable, heavy-duty outdoor seating systems perfect for garden, commercial, and public spaces. Built to withstand all weather conditions and last for years."
      ),
      image: "/uploads/products/categories/garden-bench-1770446422580-0.webp",
      fallbackSrc: weatherResistantBg,
      features: [
        { icon: "ShieldCheck", title: c("home_slide3_f1_title", "WEATHERPROOF"), text: c("home_slide3_f1_desc", "Engineered to perform in all weather conditions") },
        { icon: "Link2", title: c("home_slide3_f2_title", "RUSTPROOF"), text: c("home_slide3_f2_desc", "Corrosion-resistant for enhanced durability") },
        { icon: "Eye", title: c("home_slide3_f3_title", "MODERN DESIGN"), text: c("home_slide3_f3_desc", "Aesthetic and functional for all environments") },
        { icon: "Leaf", title: c("home_slide3_f4_title", "ECO FRIENDLY"), text: c("home_slide3_f4_desc", "Non-toxic, eco-friendly & safe for all use") }
      ]
    }
  ], [c]);

  const [current, setCurrent] = useState(2);
  const heroRef = useRef(null);
  const hexagonCardRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
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
      className="relative w-full dark-context min-h-screen flex flex-col pt-8 pb-8 font-sans overflow-x-hidden"
      style={{ background: "var(--hero-gradient, linear-gradient(135deg, var(--neutral-950) 0%, var(--neutral-950) 55%, var(--neutral-800) 100%))" }}
      id="home-hero-mobile"
    >
      {/* Low-Opacity Thematic Industrial Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <img
          src={recycledPlasticProfiles}
          alt=""
          className="w-full h-full object-cover object-center opacity-40 brightness-70 contrast-105 mix-blend-luminosity scale-105 pointer-events-none"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--neutral-950,#061A26)]/70 via-transparent to-[var(--neutral-950,#061A26)]/80 pointer-events-none" />
      </div>

      {/* Top right dots pattern */}
      <div className="absolute top-4 right-4 grid grid-cols-4 gap-2 opacity-10 pointer-events-none z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
        ))}
      </div>

      <div className="w-full max-w-[1280px] px-5 sm:px-6 md:px-8 mx-auto relative z-10 flex flex-col">
        
        {/* Responsive Grid Layout to maximize space usage and maintain visual structure */}
        <div className={`mb-4 pt-4 items-center ${styles.mobileGrid}`}>
          
          {/* Left Column: Badge, Title, Underline, and Description/Button (only for screens >= 615px) */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="inline-flex items-center gap-[0.75rem] bg-[var(--neutral-950,#0a0a0a)] border border-white/12 py-2 pl-3 pr-5 mb-5 w-fit shadow-[0_4px_16px_var(--shadow-md,rgba(0,0,0,0.3))] backdrop-blur-md rounded-[8px]">
              <div className="flex items-center justify-center bg-transparent text-[var(--brand)] pr-3 border-r border-white/12 rounded-none">
                <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M28 26V10a2 2 0 00-2-2h-4V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v4H4a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2zM12 4h8v4h-8zm-8 6h16v16H4zm22 16h-4V10h4z" />
                </svg>
              </div>
              <span className="text-[0.8rem] font-extrabold tracking-[0.05em] text-white uppercase">{activeSlide.badge}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <Motion.div
                key={current}
                variants={mobileTextContainerVariants}
                initial={isFirstRender ? false : "initial"}
                animate="animate"
                exit="exit"
                className="flex flex-col w-full"
              >
                {/* Title */}
                <h1 className="text-[32px] sm:text-4xl font-black uppercase leading-[1.05] mb-4 tracking-tight">
                  <Motion.span variants={mobileTitleItemVariants} className="text-[var(--brand)] block mb-1">
                    {activeSlide.titleLime}
                  </Motion.span>
                  <Motion.span variants={mobileTitleItemVariants} className="text-white block">
                    {activeSlide.titleWhite}
                  </Motion.span>
                </h1>

                {/* Headline Underline Accent */}
                <Motion.div variants={mobileTitleItemVariants} className="flex items-center gap-2 mt-1 mb-6">
                  <span className="h-[3px] w-[90px] bg-[var(--brand)] rounded-sm" />
                  <span className="h-[7px] w-[7px] bg-[var(--brand)] rounded-full" />
                </Motion.div>

                {/* Description (visible on screens >= 615px) */}
                <Motion.p
                  variants={mobileTitleItemVariants}
                  className={`text-[13px] text-slate-200 leading-relaxed mb-6 pr-2 font-medium ${styles.descDesktop}`}
                >
                  {activeSlide.desc}
                </Motion.p>

                {/* Button (visible on screens >= 615px) */}
                <div className={`justify-start w-full mt-2 ${styles.btnDesktop}`}>
                  <Motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="inline-block w-fit"
                  >
                    <Link to="/products" className="exploreBtnGlobal">
                      <span>{c("hero_cta_primary", "Explore products")}</span>
                      <Motion.span
                        animate={shouldReduceMotion ? {} : { x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="inline-flex items-center"
                      >
                        <svg className="exploreBtnArrowGlobal" viewBox="0 0 32 32" fill="currentColor">
                          <path d="M18 15.5l6.5-6.5-6.5-6.5-1.4 1.4 4.1 4.1H4v2h16.7l-4.1 4.1z" />
                        </svg>
                      </Motion.span>
                    </Link>
                  </Motion.div>
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Hexagon Card + Pagination Capsule */}
          <div className="flex flex-col items-center justify-center w-full">
            <AnimatePresence mode="wait" initial={false}>
              <Motion.div
                key={current}
                variants={mobileTextContainerVariants}
                initial={isFirstRender ? false : "initial"}
                animate="animate"
                exit="exit"
                className="flex flex-col w-full items-center justify-center"
              >
                {/* Centered Hexagon Product Card with Navigation Chevrons */}
                <div className={`flex justify-center items-center my-6 h-[260px] w-full z-10 ${styles.hexagonContainer}`}>
                  <div
                    ref={hexagonCardRef}
                    id="mobile-hero-product-hexagon-frame"
                    className="relative mx-auto w-[250px] h-[260px] flex items-center justify-center"
                  >
                    {/* Navigation Chevron Buttons stuck directly to hexagon sides */}
                    <button
                      id="mobile-hero-chevron-prev"
                      type="button"
                      onClick={handlePrev}
                      className={`${styles.chevronBtn} ${styles.chevronBtnLeft} ${styles.hexagonSideBtn}`}
                      aria-label="Previous Slide"
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="currentColor">
                        <path d="M20 24l-8-8 8-8 1.4 1.4L14.8 16l6.6 6.6z" />
                      </svg>
                    </button>
                    <button
                      id="mobile-hero-chevron-next"
                      type="button"
                      onClick={handleNext}
                      className={`${styles.chevronBtn} ${styles.chevronBtnRight} ${styles.hexagonSideBtn}`}
                      aria-label="Next Slide"
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="currentColor">
                        <path d="M12 8l8 8-8 8-1.4-1.4 6.6-6.6-6.6-6.6z" />
                      </svg>
                    </button>

                    <Motion.svg
                      className="w-full h-full drop-shadow-2xl pointer-events-none"
                      viewBox="0 0 500 520"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={shouldReduceMotion ? {} : { y: [0, -5, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <defs>
                        <radialGradient id="stageSpotlight" cx="50%" cy="52%" r="50%">
                          <stop offset="0%" stopColor="#5FBF50" stopOpacity="0.14" />
                          <stop offset="50%" stopColor="#011A38" stopOpacity="0.04" />
                          <stop offset="100%" stopColor="#F2F2F2" stopOpacity="0" />
                        </radialGradient>
                        <clipPath id="heroHexagonClipMobile">
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
                      {/* Outer White Hexagonal Card */}
                      <path
                        d="M 250 15
                            C 275 15, 455 100, 465 115
                            C 475 130, 475 390, 465 405
                            C 455 420, 275 505, 250 505
                            C 225 505, 45 420, 35 405
                            C 25 390, 25 130, 35 115
                            C 45 100, 225 15, 250 15 Z"
                        fill="var(--white, #ffffff)"
                      />
                      {/* Specular Inner Top Highlight Line */}
                      <path
                        d="M 50 120
                            C 60 108, 225 24, 250 24
                            C 275 24, 440 108, 450 120"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.95)"
                        strokeWidth="3"
                      />
                      {/* Full-Screen Product Image Clipped to Hexagon with Framer Motion */}
                      <g clipPath="url(#heroHexagonClipMobile)">
                        <foreignObject x="0" y="0" width="500" height="520">
                          <div className="w-full h-full bg-white relative overflow-hidden">
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "radial-gradient(circle at 50% 50%, rgba(152, 209, 42, 0.16) 0%, rgba(11, 47, 99, 0.04) 55%, transparent 75%)",
                                pointerEvents: "none",
                              }}
                            />
                            <AnimatePresence mode="wait" initial={false}>
                              <Motion.div
                                key={current}
                                initial={isFirstRender ? false : { opacity: 0, scale: 0.9, y: 10, filter: "blur(4px)" }}
                                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.06, y: -6, filter: "blur(3px)" }}
                                transition={{
                                  duration: 0.45,
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
                                  src={getOptimizedMobileHeroImage(activeSlide.image)}
                                  fallbackSrc={activeSlide.fallbackSrc}
                                  alt={activeSlide.titleWhite}
                                  loading="eager"
                                  fetchPriority="high"
                                  width="500"
                                  height="520"
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
                      {/* Inset Green Accent Stroke Frame */}
                      <path
                        d="M 250 42
                            C 270 42, 430 118, 438 131
                            C 446 144, 446 376, 438 389
                            C 430 402, 270 478, 250 478
                            C 230 478, 70 402, 62 389
                            C 54 376, 54 144, 62 131
                            C 70 118, 230 42, 250 42 Z"
                        fill="none"
                        stroke="var(--brand-primary, #6BBF54)"
                        strokeWidth="2.5"
                      />
                    </Motion.svg>
                  </div>
                </div>

                {/* Pagination Capsule matching desktop */}
                <div className="flex justify-center items-center mb-6 w-full">
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
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Description & Button (only visible on true portrait mobile < 615px, rendered below the hexagon to maintain stacking order) */}
        <AnimatePresence mode="wait" initial={false}>
          <Motion.div
            key={current}
            variants={mobileTextContainerVariants}
            initial={isFirstRender ? false : "initial"}
            animate="animate"
            exit="exit"
            className={`flex flex-col w-full mb-6 ${styles.descMobile}`}
          >
            {/* Description */}
            <Motion.p
              variants={mobileTitleItemVariants}
              className="text-[13px] text-slate-200 leading-relaxed mb-6 pr-2 font-medium"
            >
              {activeSlide.desc}
            </Motion.p>

            {/* Button */}
            <div className="flex justify-center w-full mt-2">
              <Motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="inline-block w-fit"
              >
                <Link to="/products" className="exploreBtnGlobal">
                  <span>{c("hero_cta_primary", "Explore products")}</span>
                  <Motion.span
                    animate={shouldReduceMotion ? {} : { x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="inline-flex items-center"
                  >
                    <svg className="exploreBtnArrowGlobal" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M18 15.5l6.5-6.5-6.5-6.5-1.4 1.4 4.1 4.1H4v2h16.7l-4.1 4.1z" />
                    </svg>
                  </Motion.span>
                </Link>
              </Motion.div>
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Features Grid */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={current}
            variants={mobileFeaturesVariants}
            initial={isFirstRender ? false : "hidden"}
            animate="visible"
            exit="exit"
            className="mb-10 w-full"
          >
            <div className="grid grid-cols-2 gap-0 border-t border-b border-white/5 py-1">
              {activeSlide.features.slice(0, 4).map((feat, idx) => {
                const iconName = iconMap[feat.icon] || "carbon:security";
                return (
                  <Motion.div
                    key={idx}
                    variants={mobileTitleItemVariants}
                    className="p-4 sm:p-5 flex flex-col items-center text-center gap-2 bg-transparent"
                    style={{
                      borderBottom: (idx === 0 || idx === 1) ? "1px solid var(--border-on-dark, rgba(255, 255, 255, 0.12))" : "none",
                      borderRight: (idx % 2 === 0) ? "1px solid var(--border-on-dark, rgba(255, 255, 255, 0.12))" : "none",
                    }}
                  >
                    <div className="w-[34px] h-[34px] shrink-0 rounded-full border-2 border-[var(--brand-primary,#6BBF54)] bg-transparent flex items-center justify-center text-[var(--brand-primary,#6BBF54)] mb-1">
                      <Icon icon={iconName} className="w-[16px] h-[16px]" style={{ color: "var(--brand-primary, #6BBF54)" }} />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                      <span className="text-white text-[11px] font-bold uppercase tracking-wider leading-tight text-center">{feat.title}</span>
                      <span className="text-slate-300 text-[10px] font-medium leading-normal mt-1.5 max-w-[140px] text-center">{feat.text}</span>
                    </div>
                  </Motion.div>
                );
              })}
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Floating Assistance Card */}
        <Motion.div
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex flex-row items-center justify-between gap-2 bg-white border border-[#E2E8F0] py-3 px-3.5 rounded-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-8 w-full max-w-full"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-[8px] bg-[var(--brand)] shrink-0">
              <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2a11 11 0 00-11 11v8h2v-8a9 9 0 0118 0v8h2v-8A11 11 0 0016 2zm13 22a1 1 0 01-1 1h-3a1 1 0 01-1-1v-4a1 1 0 011-1h3a1 1 0 011 1zm-22 0a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1h3a1 1 0 011 1z" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <span className="text-[#0f1319] text-[11px] font-bold tracking-normal">{c("hero_assistance_title", "Need assistance?")}</span>
              <span className="text-slate-500 text-[9.5px] font-medium leading-snug max-w-[140px]">
                {c("hero_assistance_sub", "Our team is ready to help you find the right solution.")}
              </span>
            </div>
          </div>
          
          <Motion.a
            href={`tel:${cleanedPhone}`}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="flex items-center justify-center gap-1.5 bg-[#0f1319] border border-[#0f1319] !text-white py-2 px-3 rounded-[8px] text-[10px] font-bold uppercase transition hover:bg-[var(--brand)] hover:border-[var(--brand)] hover:!text-[#0f1319] shrink-0"
          >
            <svg className="w-3.5 h-3.5 !text-white" viewBox="0 0 32 32" fill="currentColor">
              <path d="M26 29h-1a22.09 22.09 0 01-22-22V6a3 3 0 013-3h5a1 1 0 011 .72l1.63 6.13a1 1 0 01-.34 1l-3.32 2.5A16.07 16.07 0 0015.65 19l2.5-3.32a1 1 0 011-.34l6.13 1.63a1 1 0 01.72 1.09v5a3 3 0 01-3 3z" />
            </svg>
            <span className="!text-white">{c("hero_assistance_btn", "Contact us")}</span>
          </Motion.a>
        </Motion.div>
      </div>
    </section>
  );
}
