import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSite } from "../../shared/context/SiteContext";
import OptimizedImage from "../../shared/components/OptimizedImage";
import styles from "../../pages/Home.module.css";
import {
  ShieldCheck,
  Droplets,
  Wrench,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Headphones,
  ArrowRight,
  Check,
  Eye,
  Plane,
  Factory,
  Phone,
  Waves,
  Link2
} from "lucide-react";

// Slide-specific icons map
const iconMap = {
  ShieldCheck: ShieldCheck,
  Link2: Link2,
  Droplets: Droplets,
  Wrench: Wrench,
  Leaf: Leaf,
  Check: Check,
  Eye: Eye,
  Plane: Plane,
  Waves: Waves
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

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

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
    <section className={styles.hero} id="home-hero-redesign">
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
            {/* Manufacturer Badge */}
            <div className={styles.badge}>
              <div className={styles.badgeIconWrapper}>
                <Factory className={styles.badgeIcon} />
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

            {/* Feature Panel */}
            <div className={styles.featurePanel}>
              {activeSlide.features.map((feat, idx) => {
                const IconComp = iconMap[feat.icon] || ShieldCheck;
                return (
                  <div key={idx} className={styles.featureColumn}>
                    <div className={styles.featureIconRing}>
                      <IconComp className={styles.featureIcon} />
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
                <ArrowRight className="exploreBtnArrowGlobal" />
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
              <div className={styles.productFrameWrapper}>
                {/* Embedded Navigation Chevron Buttons */}
                <button
                  onClick={handlePrev}
                  className={`${styles.chevronBtn} ${styles.chevronBtnLeft}`}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className={`${styles.chevronBtn} ${styles.chevronBtnRight}`}
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Hexagonal Geometric SVG Frame with Full-Screen Clipped Image */}
                <svg
                  className={styles.productFrameSvg}
                  viewBox="0 0 500 520"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="heroFrameShadow" x="-15%" y="-15%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#071E40" floodOpacity="0.10" />
                    </filter>
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

                  {/* Outer White Hexagonal Card with Soft Shadow */}
                  <path
                    d="M 250 15 
                       C 275 15, 455 100, 465 115 
                       C 475 130, 475 390, 465 405 
                       C 455 420, 275 505, 250 505 
                       C 225 505, 45 420, 35 405 
                       C 25 390, 25 130, 35 115 
                       C 45 100, 225 15, 250 15 Z"
                    fill="#FFFFFF"
                    filter="url(#heroFrameShadow)"
                  />

                  {/* Full-Screen Product Image Clipped to Hexagon */}
                  <g clipPath="url(#heroHexagonClip)">
                    <foreignObject x="0" y="0" width="500" height="520">
                      <div style={{ width: "100%", height: "100%", backgroundColor: "#F4F7FA", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                        <OptimizedImage
                          key={current}
                          src={activeSlide.image}
                          alt={activeSlide.titleWhite}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      </div>
                    </foreignObject>
                  </g>

                  {/* Inset Green Outline Frame Overlaid on Image */}
                  <path
                    d="M 250 42 
                       C 270 42, 430 118, 438 131 
                       C 446 144, 446 376, 438 389 
                       C 430 402, 270 478, 250 478 
                       C 230 478, 70 402, 62 389 
                       C 54 376, 54 144, 62 131 
                       C 70 118, 230 42, 250 42 Z"
                    fill="none"
                    stroke="#8BD61A"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              {/* Bottom Controls Row: Pagination Dots + Assistance Card */}
              <div className={styles.bottomControlsRow}>
                {/* Pagination Dots */}
                <div className={styles.paginationDots}>
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`${styles.paginationDot} ${
                        idx === current ? styles.paginationDotActive : ""
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Floating Assistance Card */}
                <div className={styles.assistanceCard}>
                  <div className={styles.assistanceIconCircle}>
                    <Headphones className="w-5 h-5 text-white" />
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
                    <Phone className="w-3.5 h-3.5 text-[#3F8F18]" />
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
