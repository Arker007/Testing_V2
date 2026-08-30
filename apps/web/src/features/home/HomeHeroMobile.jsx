import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useSite } from "../../shared/context/SiteContext";
import OptimizedImage from "../../shared/components/OptimizedImage";
import Card from "../../shared/components/ui/Card";

import recycledPlasticProfiles from "../../assets/images/recycled_plastic_profiles_1785866736886.jpg";
import highLoadCapacity from "../../assets/images/high_load_capacity_1785866759510.jpg";
import weatherResistantBg from "../../assets/images/weather_resistant_bg_1785866780021.jpg";

const iconMap = {
  ShieldCheck: "solar:shield-check-linear",
  Link2: "solar:verified-check-linear",
  Droplets: "solar:waterdrops-linear",
  Wrench: "solar:bolt-linear",
  Leaf: "solar:leaf-linear",
  Check: "solar:check-read-linear",
  Eye: "solar:star-linear",
  Plane: "solar:box-minimalistic-linear",
  Waves: "solar:waterdrops-linear"
};

const slides = [
  {
    category: "Recycled Plastic Lumber",
    badge: "MANUFACTURER & SUPPLIER",
    titleLime: "RECYCLED",
    titleWhite: "PLASTIC LUMBER",
    desc: "Premium grade recycled polymer profiles engineered to replace wood and metal. Zero rot, zero splinter, and maintenance-free durability built for fifty-plus years of structural performance.",
    image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
    fallbackSrc: recycledPlasticProfiles,
    features: [
      { icon: "ShieldCheck", title: "DURABLE", text: "Built for long lasting structural performance" },
      { icon: "Droplets", title: "WEATHERPROOF", text: "Zero rot, zero splinter, moisture resistant" },
      { icon: "Wrench", title: "HIGH STRENGTH", text: "High load capacity for demanding builds" },
      { icon: "Leaf", title: "ECO FRIENDLY", text: "100% recycled polymer profile material" }
    ]
  },
  {
    category: "Industrial Plastic Pallets",
    badge: "MANUFACTURER & SUPPLIER",
    titleLime: "HEAVY-DUTY",
    titleWhite: "PLASTIC PALLETS",
    desc: "High-capacity, injection-molded and extruded plastic pallets designed for seamless warehousing, industrial logistics, and hassle-free international sea freight shipping.",
    image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
    fallbackSrc: highLoadCapacity,
    features: [
      { icon: "ShieldCheck", title: "HEAVY DUTY", text: "Withstands heavy static & dynamic loads" },
      { icon: "Droplets", title: "CHEMICAL RESIST", text: "Resistant to acids, alkalis, and oils" },
      { icon: "Plane", title: "EXPORT READY", text: "Naturally phytosanitary exempt (ISPM-15)" },
      { icon: "Leaf", title: "SUSTAINABLE", text: "Fully recyclable at end of lifecycle" }
    ]
  },
  {
    category: "Outdoor Benches & Tables",
    badge: "MANUFACTURER & SUPPLIER",
    titleLime: "WEATHERPROOF",
    titleWhite: "GARDEN BENCHES",
    desc: "Robust, heavy-duty outdoor seating systems perfect for garden, commercial, and public spaces. Built to withstand all weather conditions and last for years.",
    image: "/uploads/products/categories/garden-bench-1770446422580-0.webp",
    fallbackSrc: weatherResistantBg,
    features: [
      { icon: "ShieldCheck", title: "WEATHERPROOF", text: "Engineered to perform in all weather conditions" },
      { icon: "Link2", title: "RUSTPROOF", text: "Corrosion-resistant for enhanced durability" },
      { icon: "Eye", title: "MODERN DESIGN", text: "Aesthetic and functional for all environments" },
      { icon: "Leaf", title: "ECO FRIENDLY", text: "Non-toxic, eco-friendly & safe for all use" }
    ]
  }
];

export default function HomeHeroMobile() {
  const { c, co } = useSite();
  const [current, setCurrent] = useState(1);
  
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
    <section className="relative w-full bg-[#10141b] min-h-screen flex flex-col pt-8 pb-8 font-sans" id="home-hero-mobile">
      
      {/* Top right dots pattern */}
      <div className="absolute top-4 right-4 grid grid-cols-4 gap-2 opacity-10 pointer-events-none z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
        ))}
      </div>

      <div className="w-[calc(100%-1rem)] mx-auto relative z-10 flex flex-col">
        
        {/* Main Vertical Layout to prevent overlapping */}
        <div className="flex flex-col mb-4 pt-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-[0.75rem] bg-[var(--neutral-950,#0a0a0a)] border border-white/12 py-2 pl-3 pr-5 mb-5 w-fit shadow-[0_4px_16px_var(--shadow-md,rgba(0,0,0,0.3))] backdrop-blur-md rounded-[8px]">
            <div className="flex items-center justify-center bg-transparent text-[#5ec238] pr-3 border-r border-white/12 rounded-none">
              <Icon icon="solar:buildings-3-linear" className="w-6 h-6" />
            </div>
            <span className="text-[0.8rem] font-extrabold tracking-[0.05em] text-white uppercase">{activeSlide.badge}</span>
          </div>

          <AnimatePresence mode="wait">
            <Motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col w-full"
            >
              {/* Title */}
              <h1 className="text-[32px] sm:text-4xl font-black uppercase leading-[1.05] mb-4 tracking-tight">
                <span className="text-[#5ec238] block mb-1">{activeSlide.titleLime}</span>
                <span className="text-white block">{activeSlide.titleWhite}</span>
              </h1>

              {/* Headline Underline Accent */}
              <div className="flex items-center gap-2 mt-1 mb-6">
                <span className="h-[3px] w-[90px] bg-[#5ec238] rounded-sm" />
                <span className="h-[7px] w-[7px] bg-[#5ec238] rounded-full" />
              </div>

              {/* Centered Hexagon Product Card */}
              <div className="w-full flex justify-between items-center my-6 h-[260px] relative z-10 px-1">
                {/* Left Chevron Button (Desktop Style) */}
                <Motion.button
                  type="button"
                  onClick={handlePrev}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-0 z-30 cursor-pointer border border-white/20 border-l-0 flex items-center justify-center w-[30px] h-[54px] bg-[#5ec238] rounded-r-[14px] shadow-[4px_4px_12px_rgba(0,0,0,0.15)]"
                  aria-label="Previous Slide"
                >
                  <Icon icon="solar:alt-arrow-left-linear" className="w-5 h-5 text-white" />
                </Motion.button>

                <div className="mx-auto w-[250px] h-[260px] pointer-events-none">
                  <svg
                    className="w-full h-full drop-shadow-2xl"
                    viewBox="0 0 500 520"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                    {/* Full-Screen Product Image Clipped to Hexagon */}
                    <g clipPath="url(#heroHexagonClipMobile)">
                      <foreignObject x="0" y="0" width="500" height="520">
                        <div style={{ width: "100%", height: "100%", backgroundColor: "var(--white, #ffffff)", position: "relative", overflow: "hidden" }}>
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
                                fallbackSrc={slide.fallbackSrc}
                                alt={slide.titleWhite}
                                loading="eager"
                                fetchPriority={idx === current ? "high" : "low"}
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
                      stroke="#5ec238"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                {/* Right Chevron Button (Desktop Style) */}
                <Motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-0 z-30 cursor-pointer border border-white/20 border-r-0 flex items-center justify-center w-[30px] h-[54px] bg-[#5ec238] rounded-l-[14px] shadow-[-4px_4px_12px_rgba(0,0,0,0.15)]"
                  aria-label="Next Slide"
                >
                  <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5 text-white" />
                </Motion.button>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center items-center gap-2 mb-6">
                <div className="inline-flex items-center justify-center gap-2 bg-[#0c1524]/60 backdrop-blur-md border border-white/12 rounded-[8px] py-1.5 px-4.5 shadow-[0_4px_16px_var(--shadow-md,rgba(0,0,0,0.3))]">
                  {slides.map((_, idx) => (
                    <Motion.button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                      className={`h-2 rounded-full cursor-pointer transition-all duration-300 outline-none p-0 border-none ${
                        idx === current 
                          ? "w-6 bg-gradient-to-r from-[#5ec238] to-[#449127]" 
                          : "w-2 bg-[#d1d5db]/70"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-slate-300/90 leading-relaxed mb-6 pr-2 font-medium">
                {activeSlide.desc}
              </p>

              {/* Button */}
              <div className="flex justify-center w-full mt-2">
                <Motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-fit"
                >
                  <Link to="/products" className="exploreBtnGlobal">
                    <span>EXPLORE PRODUCTS</span>
                    <Icon icon="solar:arrow-right-linear" className="exploreBtnArrowGlobal" />
                  </Link>
                </Motion.div>
              </div>
            </Motion.div>
          </AnimatePresence>
          
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mb-10 mt-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-[#1b222d] border border-white/5 flex items-center justify-center text-white hover:bg-[#252d3a] transition shadow-md"
            aria-label="Previous Slide"
          >
            <Icon icon="solar:alt-arrow-left-linear" className="w-5 h-5" />
          </button>
          
          <div className="flex gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === current ? "bg-[#5ec238]" : "bg-[#2d3748]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-[#1b222d] border border-white/5 flex items-center justify-center text-white hover:bg-[#252d3a] transition shadow-md"
            aria-label="Next Slide"
          >
            <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2"
          >
            <div className="grid grid-cols-2 gap-2.5 col-span-1 sm:col-span-2">
              {activeSlide.features.slice(0, 4).map((feat, idx) => {
                const iconName = iconMap[feat.icon] || "solar:shield-check-linear";
                return (
                  <div key={idx} className="p-2.5 sm:p-3 flex flex-row items-center gap-2.5 bg-[#1b2129] rounded-[8px]">
                    <div className="w-[30px] h-[30px] shrink-0 rounded-full bg-[#1e2a22] text-[#5ec238] flex items-center justify-center">
                      <Icon icon={iconName} className="w-[15px] h-[15px] stroke-[1.5px]" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 justify-center">
                      <span className="text-white text-[10px] uppercase font-extrabold tracking-wide leading-tight">{feat.title}</span>
                      <span className="text-[var(--text-inverse-secondary)] text-[9.5px] font-medium leading-snug mt-0.5">{feat.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Floating Assistance Card */}
        <div className="flex flex-row items-center justify-between gap-2 bg-white border border-[#E2E8F0] py-3 px-3.5 rounded-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-8 w-full max-w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-[8px] bg-[#5ec238] shrink-0">
              <Icon icon="solar:headphones-round-linear" className="w-[20px] h-[20px] text-white" />
            </div>
            
            <div className="flex flex-col gap-0.5">
              <span className="text-[#0f1319] text-[10px] font-extrabold tracking-widest uppercase">NEED ASSISTANCE?</span>
              <span className="text-slate-500 text-[9.5px] font-medium leading-snug max-w-[140px]">
                Our team is ready to help you find the right solution.
              </span>
            </div>
          </div>
          
          <a
            href={`tel:${cleanedPhone}`}
            className="flex items-center justify-center gap-1.5 bg-[#0f1319] border border-[#0f1319] text-white py-2 px-3 rounded-[8px] text-[9px] font-extrabold uppercase transition hover:bg-[#5ec238] hover:border-[#5ec238] hover:text-[#0f1319] shrink-0"
          >
            <Icon icon="solar:phone-calling-linear" className="w-3.5 h-3.5 text-inherit" />
            <span>CONTACT US</span>
          </a>
        </div>
      </div>
    </section>
  );
}

