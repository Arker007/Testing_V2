import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import OptimizedImage from "../../shared/components/OptimizedImage";
import styles from "../../pages/Home.module.css";

// Slide-specific linear icons map from @iconify/react
const iconMap = {
  ShieldCheck: "solar:shield-check-linear",
  Link2: "solar:verified-check-linear",
  Droplets: "solar:waterdrops-linear",
  Wrench: "solar:bolt-linear",
  Leaf: "solar:leaf-linear",
  Check: "solar:check-read-linear",
  Eye: "solar:star-linear",
  Plane: "solar:delivery-linear",
  Waves: "solar:waterdrops-linear"
};

const slides = [
  {
    category: "Recycled Plastic Lumber",
    badge: "Manufacturer & Supplier",
    titleLime: "RECYCLED",
    titleWhite: "PLASTIC LUMBER",
    desc: "Premium grade recycled polymer profiles engineered to replace wood and metal. Zero rot, zero splinter, and maintenance-free durability built for fifty-plus years of structural performance.",
    image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
    features: [
      { icon: "ShieldCheck", title: "DURABLE", text: "Built for long lasting structural performance" },
      { icon: "Droplets", title: "WEATHERPROOF", text: "Zero rot, zero splinter, moisture resistant" },
      { icon: "Wrench", title: "HIGH STRENGTH", text: "High load capacity for demanding builds" },
      { icon: "Leaf", title: "ECO FRIENDLY", text: "100% recycled polymer profile material" }
    ]
  },
  {
    category: "Industrial Plastic Pallets",
    badge: "Manufacturer & Supplier",
    titleLime: "HEAVY-DUTY",
    titleWhite: "PLASTIC PALLETS",
    desc: "High-capacity, injection-molded and extruded plastic pallets designed for seamless warehousing, industrial logistics, and hassle-free international sea freight shipping.",
    image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
    features: [
      { icon: "ShieldCheck", title: "HEAVY DUTY", text: "Withstands heavy static & dynamic loads" },
      { icon: "Droplets", title: "CHEMICAL RESIST", text: "Resistant to acids, alkalis, and oils" },
      { icon: "Plane", title: "EXPORT READY", text: "Naturally phytosanitary exempt (ISPM-15)" },
      { icon: "Leaf", title: "SUSTAINABLE", text: "Fully recyclable at end of lifecycle" }
    ]
  },
  {
    category: "Outdoor Benches & Tables",
    badge: "Manufacturer & Supplier",
    titleLime: "WEATHERPROOF",
    titleWhite: "GARDEN BENCHES",
    desc: "Robust, heavy-duty outdoor seating systems perfect for garden, commercial, and public spaces. Built to withstand all weather conditions and last for years.",
    image: "/uploads/products/categories/garden-bench-1770446422580-0.webp",
    features: [
      { icon: "ShieldCheck", title: "WEATHERPROOF", text: "Engineered to perform in all weather conditions" },
      { icon: "Link2", title: "RUSTPROOF", text: "Corrosion-resistant for enhanced durability" },
      { icon: "Eye", title: "MODERN DESIGN", text: "Aesthetic and functional for all environments" },
      { icon: "Leaf", title: "ECO FRIENDLY", text: "Non-toxic, eco-friendly & safe for all use" }
    ]
  }
];

export default function HomeHero() {
  const { c, co } = useSite();
  const [current, setCurrent] = useState(2); // Default to Slide 3 (Weatherproof Garden Benches matching reference)
  
  const heroRef = useRef(null);
  const hexagonRef = useRef(null);
  const [centerY, setCenterY] = useState("50%");

  // Align navigation buttons to the exact vertical center (equator) of the hexagon frame
  useEffect(() => {
    const updateCenter = () => {
      if (heroRef.current && hexagonRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const hexRect = hexagonRef.current.getBoundingClientRect();
        // Calculate center of hexagon relative to the hero top
        const hexCenterInHero = (hexRect.top - heroRect.top) + (hexRect.height / 2);
        setCenterY(`${hexCenterInHero}px`);
      }
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);
    
    // Also run multiple times to handle dynamic loading/layout shifts
    const timer1 = setTimeout(updateCenter, 100);
    const timer2 = setTimeout(updateCenter, 500);
    const timer3 = setTimeout(updateCenter, 1500);

    return () => {
      window.removeEventListener("resize", updateCenter);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [current]);

  // Auto-advance logic (resets timer when current changes)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [current]);

  if (c("show_hero", "1") === "0") return null;

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[current];
  const companyPhone = co("phone", "+91 98986 86379");
  const cleanedPhone = companyPhone.replace(/\s+/g, "");

  return (
    <section ref={heroRef} className={styles.hero} id="home-hero-redesign">
      {/* Background Diagonal Split Elements */}
      <div className={styles.slantBgGreen} />
      <div className={styles.slantBgDark} />

      {/* Decorative Dotted Grids */}
      <div className={styles.dotsPatternLeft} />
      <div className={styles.dotsPatternRightTop} />
      <div className={styles.dotsPatternRightBottom} />

      {/* Navigation Chevron Buttons shifted to entire Hero Section */}
      <button
        onClick={handlePrev}
        className={`${styles.chevronBtn} ${styles.chevronBtnLeft}`}
        style={{ top: centerY }}
        aria-label="Previous Slide"
      >
        <Icon icon="solar:alt-arrow-left-linear" className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={handleNext}
        className={`${styles.chevronBtn} ${styles.chevronBtnRight}`}
        style={{ top: centerY }}
        aria-label="Next Slide"
      >
        <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5 text-white" />
      </button>

      <div className="container relative z-10">
        <div className={styles.heroGrid}>
          {/* Left Content Column */}
          <div className={styles.heroLeft}>
            <div className={styles.heroLeftTopGroup}>
              {/* Manufacturer Badge */}
              <div className={styles.badge}>
                <div className={styles.badgeIconWrapper}>
                  <Icon icon="solar:buildings-3-linear" className={styles.badgeIcon} />
                </div>
                <span className={styles.badgeText}>{activeSlide.badge}</span>
              </div>

              {/* Headline */}
              <h1 className={styles.headline}>
                <span className={styles.titleLime}>{activeSlide.titleLime}</span>
                <span className={styles.titleWhite}>{activeSlide.titleWhite}</span>
              </h1>

              {/* Headline Underline Accent */}
              <div className={styles.underlineAccent}>
                <span className={styles.underlineLine} />
                <span className={styles.underlineDot} />
              </div>

              {/* Description */}
              <p className={styles.description}>
                {activeSlide.desc}
              </p>
            </div>

            {/* Feature Panel */}
            <div className={styles.featurePanel}>
              {activeSlide.features.map((feat, idx) => {
                const iconName = iconMap[feat.icon] || "solar:shield-check-linear";
                return (
                  <div key={idx} className={styles.featureColumn}>
                    <div className={styles.featureIconRing}>
                      <Icon icon={iconName} className={styles.featureIcon} />
                    </div>
                    <h4 className={styles.featureTitle}>{feat.title}</h4>
                    <p className={styles.featureDesc}>{feat.text}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA Row & Decorative Slashes */}
            <div className={styles.ctaRow}>
              <Link to="/products" className="exploreBtnGlobal">
                <span>EXPLORE PRODUCTS</span>
                <Icon icon="solar:arrow-right-linear" className="exploreBtnArrowGlobal" />
              </Link>
              <div className={styles.decorativeSlashes} aria-hidden="true">
                <span>/</span><span>/</span><span>/</span><span>/</span>
                <span>/</span><span>/</span><span>/</span><span>/</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Column */}
          <div className={styles.heroRight}>
            <div className={styles.productShowcase}>
              <div ref={hexagonRef} className={styles.productFrameWrapper}>
                {/* Hexagonal Geometric SVG Frame with Full-Screen Clipped Image and 3D Pedestal Stage */}
                <svg
                  className={styles.productFrameSvg}
                  viewBox="0 0 500 520"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Radial Spotlight Gradient for Product Stage */}
                    <radialGradient id="stageSpotlight" cx="50%" cy="52%" r="50%">
                      <stop offset="0%" stopColor="#5FBF50" stopOpacity="0.14" />
                      <stop offset="50%" stopColor="#011A38" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#F2F2F2" stopOpacity="0" />
                    </radialGradient>

                    {/* Floor Perspective Pedestal Shadow */}
                    <radialGradient id="floorShadowGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#011526" stopOpacity="0.28" />
                      <stop offset="60%" stopColor="#011526" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#011526" stopOpacity="0" />
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

                  {/* Full-Screen Product Image Clipped to Hexagon */}
                  <g clipPath="url(#heroHexagonClip)">
                    <foreignObject x="0" y="0" width="500" height="520">
                      <div style={{ width: "100%", height: "100%", backgroundColor: "var(--gray-50)", position: "relative", overflow: "hidden" }}>
                        {/* 3D Pedestal Spotlight Backdrop */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(circle at 50% 50%, rgba(152, 209, 42, 0.16) 0%, rgba(11, 47, 99, 0.04) 55%, transparent 75%)",
                            pointerEvents: "none",
                          }}
                        />

                        {slides.map((slide, idx) => (
                          <div
                            key={idx}
                            style={{
                              position: "absolute",
                              inset: 0,
                              opacity: idx === current ? 1 : 0,
                              pointerEvents: idx === current ? "auto" : "none",
                              transition: "opacity 0.4s ease-in-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                              transform: idx === current ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "20px",
                              zIndex: 2,
                            }}
                          >
                            <OptimizedImage
                              src={slide.image}
                              alt={slide.titleWhite}
                              loading="eager"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                                filter: "none",
                              }}
                            />
                          </div>
                        ))}
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
                </svg>
              </div>

              {/* Bottom Controls Row: Pagination Dots + Assistance Card */}
              <div className={styles.bottomControlsRow}>
                {/* Pagination Dots */}
                <div className={styles.paginationDots}>
                  <div className={styles.paginationTrack}>
                    {slides.map((slide, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
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
                <div className={styles.assistanceCard}>
                  <div className={styles.assistanceIconCircle}>
                    <Icon icon="solar:headphones-round-linear" className="w-5 h-5 text-white" />
                  </div>
                  <div className={styles.assistanceTextGroup}>
                    <span className={styles.assistanceLabel}>NEED ASSISTANCE?</span>
                    <span className={styles.assistanceSub}>
                      Our team is ready to help you find the right solution.
                    </span>
                  </div>
                  <a
                    href={`tel:${cleanedPhone}`}
                    className={styles.assistanceBtn}
                  >
                    <Icon icon="solar:phone-calling-linear" className="w-3.5 h-3.5 text-inherit" />
                    <span>CONTACT US</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
