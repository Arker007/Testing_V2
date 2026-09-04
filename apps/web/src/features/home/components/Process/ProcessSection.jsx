import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../../shared/context/SiteContext";
import { Badge } from "@/shared/ui";

export default function ProcessSection({ className = "" }) {
  const { c } = useSite();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  const steps = [
    {
      num: "01",
      title: "Plastic Waste",
      subtitle: "Collection & Sourcing",
      brief: "Collected from trusted partners and sources.",
      desc: "We collect post-consumer and post-industrial plastic waste from verified partners to ensure clean, high-density, and high-quality raw materials.",
      features: [
        { label: "Verified Partners", desc: "Ensuring reliable source and transparency." },
        { label: "Responsible Sourcing", desc: "Ethical collection with minimal environmental impact." },
        { label: "Quality First", desc: "Only high-grade waste enters our process." }
      ],
      color: "emerald",
      icon: (
        <div className="relative w-16 h-16 bg-emerald-50 rounded-[var(--radius-md,8px)] flex items-center justify-center border border-emerald-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-transparent" />
          <Icon icon="solar:trash-bin-trash-linear" className="w-8 h-8 text-emerald-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-400 rounded-[var(--radius-md,8px)] opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-emerald-500 rounded-[var(--radius-lg,8px)] flex items-center justify-center border-4 border-emerald-400/30 shadow-lg shadow-emerald-500/20">
          <Icon icon="solar:trash-bin-trash-linear" className="w-12 h-12 text-white" />
        </div>
      )
    },
    {
      num: "02",
      title: "Sorting",
      subtitle: "Polymer Grade Separation",
      brief: "Sorting by type and separating impurities.",
      desc: "Waste is sorted meticulously into different polymer grades (HDPE, LDPE, PP) using high-precision optical scanners and skilled manual separation.",
      features: [
        { label: "Grade Integrity", desc: "Separation by density and chemical composition." },
        { label: "Impurity Filter", desc: "Eliminating non-plastic materials, paper, and metal." },
        { label: "Streamlined Prep", desc: "Ensuring uniform batch chemistry for optimal results." }
      ],
      color: "blue",
      icon: (
        <div className="relative w-16 h-16 bg-blue-50 rounded-[var(--radius-md,8px)] flex items-center justify-center border border-blue-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-transparent" />
          <Icon icon="solar:layers-linear" className="w-8 h-8 text-blue-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-400 rounded-[var(--radius-md,8px)] opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-blue-500 rounded-[var(--radius-lg,8px)] flex items-center justify-center border-4 border-blue-400/30 shadow-lg shadow-blue-500/20">
          <Icon icon="solar:layers-linear" className="w-12 h-12 text-white" />
        </div>
      )
    },
    {
      num: "03",
      title: "Cleaning",
      subtitle: "Washing & Decontamination",
      brief: "Deep cleaning to remove contaminants and labels.",
      desc: "Shredded plastic flakes undergo rigorous high-speed friction washes and eco-friendly hot chemical treatments to strip adhesive, dirt, and organic matter.",
      features: [
        { label: "Friction Washing", desc: "High-speed scrubbing of deep particle layers." },
        { label: "Decontamination", desc: "Elimination of heavy contaminants and micro-impurities." },
        { label: "Sanitized Feed", desc: "Resulting in pristine, food-safe grade polymer flakes." }
      ],
      color: "sky",
      icon: (
        <div className="relative w-16 h-16 bg-sky-50 rounded-[var(--radius-md,8px)] flex items-center justify-center border border-sky-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/30 to-transparent" />
          <Icon icon="solar:sparkles-linear" className="w-8 h-8 text-sky-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-sky-400 rounded-[var(--radius-md,8px)] opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-sky-500 rounded-[var(--radius-lg,8px)] flex items-center justify-center border-4 border-sky-400/30 shadow-lg shadow-sky-500/20">
          <Icon icon="solar:sparkles-linear" className="w-12 h-12 text-white" />
        </div>
      )
    },
    {
      num: "04",
      title: "Extrusion",
      subtitle: "High-Pressure Molding",
      brief: "Melted and extruded into strong, durable profiles.",
      desc: "Cleaned flakes are melted under computerized, uniform thermal profiles and forced through custom industrial dies under extreme high pressure.",
      features: [
        { label: "Zero Voids", desc: "High pressure prevents structural air bubbles or cavities." },
        { label: "Custom Profiles", desc: "Molded dynamically into solid rectangular & round sections." },
        { label: "Enhanced Density", desc: "Compacted to exceed the structural density of typical wood." }
      ],
      color: "indigo",
      icon: (
        <div className="relative w-16 h-16 bg-indigo-50 rounded-[var(--radius-md,8px)] flex items-center justify-center border border-indigo-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/30 to-transparent" />
          <Icon icon="solar:flame-linear" className="w-8 h-8 text-indigo-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-400 rounded-[var(--radius-md,8px)] opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-indigo-500 rounded-[var(--radius-lg,8px)] flex items-center justify-center border-4 border-indigo-400/30 shadow-lg shadow-indigo-500/20">
          <Icon icon="solar:flame-linear" className="w-12 h-12 text-white" />
        </div>
      )
    },
    {
      num: "05",
      title: "Cooling",
      subtitle: "Structural Solidification",
      brief: "Cooled for dimensional stability and strength.",
      desc: "The molten plastic sections enter specialized temperature-regulated water-cooling chambers to solidify evenly and lock in dimensional accuracy.",
      features: [
        { label: "Symmetric Cool Down", desc: "Eliminates warping, bending, or inner thermal stresses." },
        { label: "Precision Calibration", desc: "Maintains absolute length, thickness, and width tolerances." },
        { label: "Surface Tempering", desc: "Provides an impact-resistant, non-slip textured finish." }
      ],
      color: "teal",
      icon: (
        <div className="relative w-16 h-16 bg-teal-50 rounded-[var(--radius-md,8px)] flex items-center justify-center border border-teal-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-100/30 to-transparent" />
          <Icon icon="solar:snowflake-linear" className="w-8 h-8 text-teal-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-400 rounded-[var(--radius-md,8px)] opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-teal-500 rounded-[var(--radius-lg,8px)] flex items-center justify-center border-4 border-teal-400/30 shadow-lg shadow-teal-500/20">
          <Icon icon="solar:snowflake-linear" className="w-12 h-12 text-white" />
        </div>
      )
    },
    {
      num: "06",
      title: "Testing",
      subtitle: "Load & Quality Check",
      brief: "Rigorous testing to ensure strength and reliability.",
      desc: "Samples from each production run undergo systematic mechanical load testing, UV degradation studies, and water absorption analysis.",
      features: [
        { label: "Flexural Load Test", desc: "Ensures heavy load-bearing capacities without breakage." },
        { label: "Weather Endurance", desc: "Guarantees 50+ years of life in extreme outdoor environments." },
        { label: "ISO 9001 Protocols", desc: "Rigorous compliance checks verify structural grades." }
      ],
      color: "violet",
      icon: (
        <div className="relative w-16 h-16 bg-violet-50 rounded-[var(--radius-md,8px)] flex items-center justify-center border border-violet-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-100/30 to-transparent" />
          <Icon icon="solar:shield-check-linear" className="w-8 h-8 text-violet-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-violet-400 rounded-[var(--radius-md,8px)] opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-violet-500 rounded-[var(--radius-lg,8px)] flex items-center justify-center border-4 border-violet-400/30 shadow-lg shadow-violet-500/20">
          <Icon icon="solar:shield-check-linear" className="w-12 h-12 text-white" />
        </div>
      )
    },
    {
      num: "07",
      title: "Ready",
      subtitle: "Dispatch & Delivery",
      brief: "Final products ready for delivery to you.",
      desc: "Approved sections are cut to custom sizes, sorted on heavy duty eco-friendly pallets, and prepared for express dispatch to sites worldwide.",
      features: [
        { label: "On-Demand Sizing", desc: "Precision cutting eliminates on-site fabrication labor." },
        { label: "Eco Palleting", desc: "Secured on durable, circular-plastic structural pallets." },
        { label: "Nationwide Logistics", desc: "Efficient hub shipping directly to your project location." }
      ],
      color: "emerald",
      icon: (
        <div className="relative w-16 h-16 bg-emerald-50 rounded-[var(--radius-md,8px)] flex items-center justify-center border border-emerald-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-transparent" />
          <Icon icon="solar:check-circle-linear" className="w-8 h-8 text-emerald-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-400 rounded-[var(--radius-md,8px)] opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-emerald-500 rounded-[var(--radius-lg,8px)] flex items-center justify-center border-4 border-emerald-400/30 shadow-lg shadow-emerald-500/20">
          <Icon icon="solar:check-circle-linear" className="w-12 h-12 text-white" />
        </div>
      )
    }
  ];

  // Auto Play setup
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length]);

  const handleStepClick = (index) => {
    setIsPlaying(false);
    setActiveStep(index);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  // Border and glow mapping
  const getGlowStyles = (stepIndex, isCurrentActive) => {
    if (!isCurrentActive) return "border-slate-200/90 dark:border-white/16 bg-white dark:bg-[#161c24] hover:border-emerald-400/80 dark:hover:border-[#6BBF54]/60 hover:shadow-md hover:-translate-y-0.5 shadow-2xs";
    switch (stepIndex) {
      case 0: return "border-emerald-500 ring-2 ring-emerald-500/25 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
      case 1: return "border-blue-500 ring-2 ring-blue-500/25 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
      case 2: return "border-sky-500 ring-2 ring-sky-500/25 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
      case 3: return "border-indigo-500 ring-2 ring-indigo-500/25 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
      case 4: return "border-teal-500 ring-2 ring-teal-500/25 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
      case 5: return "border-violet-500 ring-2 ring-violet-500/25 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
      case 6: return "border-emerald-500 ring-2 ring-emerald-500/25 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
      default: return "border-emerald-500 bg-white dark:bg-[#1e2530] shadow-md -translate-y-0.5";
    }
  };

  if (c("show_process", "1") === "0") return null;

  return (
    <section className={`mt-0 pt-6 sm:pt-8 md:pt-10 pb-16 md:pb-20 bg-[var(--bg-page)] text-slate-800 dark:text-slate-200 relative overflow-hidden border-t-0 ${className}`} id="manufacturing-process">
      {/* Dynamic Background Soft Ambient Glows */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      </div>

      <div className="container relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center mb-16">
          <Badge
            variant="eyebrow"
            icon={<Icon icon="solar:restart-circle-linear" className="w-4 h-4 animate-spin-slow" />}
            className="mb-4"
          >
            Circular Supply Chain
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Our Manufacturing <span className="text-[var(--brand-dark)] dark:text-emerald-400">Process</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            From responsible plastic waste to high-performance products — every step is engineered for quality, sustainability, and long-term impact.
          </p>
        </div>

        {/* 1. Main Timeline Diagram Structure */}
        <div className="relative mb-20">
          
          {/* Desktop/Tablet 3x3 Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-y-12 gap-x-8 items-center max-w-6xl mx-auto relative">
            
            {/* SVG Connecting Paths overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1100 680" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 170,120 Q 300,120 400,120 Q 500,120 700,120 M 740,120 Q 850,120 950,120 L 950,220"
                  stroke="var(--gray-300)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <path
                  d="M 950,300 L 950,420 L 800,560"
                  stroke="var(--gray-300)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <path
                  d="M 680,560 L 380,560 L 150,420 L 150,300"
                  stroke="var(--gray-300)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>

            {/* --- ROW 1 --- */}
            {/* Step 01 Card */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(0)}
                className={`w-full p-6 rounded-[var(--radius-card,8px)] border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(0, activeStep === 0)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-sm,4px)] bg-[var(--navy)] dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                  01
                </div>
                {steps[0].icon}
                <div>
                  <span className="block font-extrabold text-slate-900 dark:text-white text-base">{steps[0].title}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs block mt-0.5">{steps[0].subtitle}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1 font-normal">{steps[0].brief}</p>
                </div>
              </button>
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-4 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Icon icon="solar:alt-arrow-right-linear" className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Step 02 Card */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(1)}
                className={`w-full p-6 rounded-[var(--radius-card,8px)] border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(1, activeStep === 1)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-sm,4px)] bg-[var(--navy)] dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                  02
                </div>
                {steps[1].icon}
                <div>
                  <span className="block font-extrabold text-slate-900 dark:text-white text-base">{steps[1].title}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs block mt-0.5">{steps[1].subtitle}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1 font-normal">{steps[1].brief}</p>
                </div>
              </button>
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-4 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Icon icon="solar:alt-arrow-right-linear" className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Step 03 Card */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(2)}
                className={`w-full p-6 rounded-[var(--radius-card,8px)] border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(2, activeStep === 2)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-sm,4px)] bg-[var(--navy)] dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                  03
                </div>
                {steps[2].icon}
                <div>
                  <span className="block font-extrabold text-slate-900 dark:text-white text-base">{steps[2].title}</span>
                  <span className="text-sky-600 dark:text-sky-400 font-bold text-xs block mt-0.5">{steps[2].subtitle}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1 font-normal">{steps[2].brief}</p>
                </div>
              </button>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Icon icon="solar:alt-arrow-down-linear" className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* --- ROW 2 --- */}
            {/* Step 07 Card (Ready) on Left edge */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(6)}
                className={`w-full p-6 rounded-[var(--radius-card,8px)] border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(6, activeStep === 6)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-sm,4px)] bg-[var(--navy)] dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                  07
                </div>
                {steps[6].icon}
                <div>
                  <span className="block font-extrabold text-slate-900 dark:text-white text-base">{steps[6].title}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs block mt-0.5">{steps[6].subtitle}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1 font-normal">{steps[6].brief}</p>
                </div>
              </button>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Icon icon="solar:alt-arrow-up-linear" className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Center Circular Recycle Banner */}
            <div className="flex flex-col items-center justify-center relative p-8">
              <div className="absolute w-56 h-56 rounded-full border-2 border-dashed border-emerald-500/30 animate-spin-slow pointer-events-none" />
              <div className="absolute w-44 h-44 rounded-full bg-[var(--gray-50)]/80 dark:bg-white/5 filter blur-md pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shadow-lg mb-4 p-1.5 animate-pulse-slow">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#161c24] flex items-center justify-center shadow-inner">
                    <Icon icon="solar:restart-circle-linear" className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <span className="block font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">Zero Waste. Infinite Value.</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-normal max-w-xs mt-1">We don't just recycle, we recreate value.</p>
              </div>
            </div>

            {/* Step 04 Card (Extrusion) on Right edge */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(3)}
                className={`w-full p-6 rounded-[var(--radius-card,8px)] border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(3, activeStep === 3)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-sm,4px)] bg-[var(--navy)] dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                  04
                </div>
                {steps[3].icon}
                <div>
                  <span className="block font-extrabold text-slate-900 dark:text-white text-base">{steps[3].title}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs block mt-0.5">{steps[3].subtitle}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1 font-normal">{steps[3].brief}</p>
                </div>
              </button>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Icon icon="solar:alt-arrow-down-linear" className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* --- ROW 3 --- */}
            {/* Step 06 Aligned towards bottom center */}
            <div className="relative z-10 col-start-1 col-end-2 justify-self-end mr-[-40px]">
              <button
                type="button"
                onClick={() => handleStepClick(5)}
                className={`w-[320px] p-6 rounded-[var(--radius-card,8px)] border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(5, activeStep === 5)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-sm,4px)] bg-[var(--navy)] dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                  06
                </div>
                {steps[5].icon}
                <div>
                  <span className="block font-extrabold text-slate-900 dark:text-white text-base">{steps[5].title}</span>
                  <span className="text-violet-600 dark:text-violet-400 font-bold text-xs block mt-0.5">{steps[5].subtitle}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1 font-normal">{steps[5].brief}</p>
                </div>
              </button>
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-4 h-4 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Icon icon="solar:alt-arrow-left-linear" className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Bottom Row Spacers & Alignments */}
            <div className="flex justify-center items-center pointer-events-none">
              <div className="w-10 h-10 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs z-20">
                <Icon icon="solar:alt-arrow-left-linear" className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 05 Aligned towards bottom center */}
            <div className="relative z-10 col-start-3 col-end-4 justify-self-start ml-[-40px]">
              <button
                type="button"
                onClick={() => handleStepClick(4)}
                className={`w-[320px] p-6 rounded-[var(--radius-card,8px)] border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(4, activeStep === 4)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-sm,4px)] bg-[var(--navy)] dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/20">
                  05
                </div>
                {steps[4].icon}
                <div>
                  <span className="block font-extrabold text-slate-900 dark:text-white text-base">{steps[4].title}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-bold text-xs block mt-0.5">{steps[4].subtitle}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1 font-normal">{steps[4].brief}</p>
                </div>
              </button>
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-4 h-4 rounded-[var(--radius-sm,4px)] bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center z-20 text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Icon icon="solar:alt-arrow-left-linear" className="w-2.5 h-2.5" />
              </div>
            </div>

          </div>

          {/* Mobile & Tablet Horizontal Stepper Layout */}
          <div className="lg:hidden flex flex-col gap-6 max-w-lg mx-auto">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Select Manufacturing Step</span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 animate-pulse">
                Swipe left/right <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3" />
              </span>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x snap-mandatory -mx-4 px-4">
              {steps.map((st, i) => {
                const isActive = activeStep === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStepClick(i)}
                    className={`flex-shrink-0 snap-center py-3 px-4 rounded-[var(--radius-card,8px)] transition-all duration-300 flex items-center gap-3 border text-left min-w-[210px] ${
                      isActive
                        ? "bg-slate-900 dark:bg-[#1e2530] text-white border-emerald-500 shadow-lg scale-[1.02]"
                        : "bg-white dark:bg-[#161c24] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1e2530] border-slate-200/90 dark:border-[rgba(242,242,242,0.1)] shadow-xs"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-[var(--radius-sm,4px)] flex items-center justify-center font-black text-xs transition-colors ${
                      isActive ? "bg-emerald-500 text-slate-950" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50"
                    }`}>
                      {st.num}
                    </div>
                    <div>
                      <span className={`block font-extrabold text-xs leading-none ${isActive ? "text-white" : "text-slate-800 dark:text-white"}`}>{st.title}</span>
                      <span className={`text-[10px] font-bold mt-1 block leading-none ${isActive ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-400"}`}>{st.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 2. Interactive Panel Details Section */}
        <div className="max-w-6xl mx-auto bg-white/95 dark:bg-surface text-slate-900 dark:text-white rounded-card p-8 lg:p-12 shadow-xl backdrop-blur-sm relative overflow-hidden transition-all duration-500 border border-slate-200/90 dark:border-subtle">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/10 dark:bg-[var(--brand-primary)]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 dark:bg-[var(--brand-primary)]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Column A: Left side 3D Icon Container */}
            <div className="lg:col-span-3 flex justify-center items-center">
              <div className="relative p-6 bg-slate-100 dark:bg-surface-secondary rounded-btn border border-slate-200 dark:border-subtle shadow-inner">
                {steps[activeStep].activeIcon}
                <div className="absolute -bottom-2 right-4 bg-[var(--brand-primary)] text-slate-950 px-3 py-1 rounded-badge text-xs font-black tracking-tight shadow-md">
                  Step {steps[activeStep].num}
                </div>
              </div>
            </div>

            {/* Column B: Center step text details */}
            <div className="lg:col-span-5 flex flex-col justify-center items-start">
              <Badge
                variant="eyebrow"
                size="sm"
                icon="solar:info-circle-linear"
                className="mb-3"
              >
                {steps[activeStep].subtitle}
              </Badge>
              <h3 className="text-2xl md:text-3.5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-600 dark:text-slate-200 text-sm md:text-base leading-relaxed font-normal">
                {steps[activeStep].desc}
              </p>
            </div>

            {/* Column C: Right step checklist features */}
            <div className="lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/15 pt-6 lg:pt-0 lg:pl-8 gap-4">
              {steps[activeStep].features.map((feature, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded-control bg-[var(--brand-soft)] text-[var(--text-brand)] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[var(--brand-border)]/30">
                    <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <span className="block font-extrabold text-sm text-slate-900 dark:text-white">{feature.label}</span>
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5 leading-relaxed font-normal">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Nav buttons */}
          <div className="mt-8 flex justify-end items-center gap-3 relative lg:absolute lg:bottom-8 lg:right-8 lg:mt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-btn bg-slate-100 dark:bg-white/10 hover:bg-[var(--brand-primary)] hover:text-slate-950 border border-slate-200 dark:border-subtle flex items-center justify-center transition text-slate-800 dark:text-white shadow-xs cursor-pointer"
              title="Previous Step"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-btn bg-[var(--brand-primary)] text-slate-950 hover:brightness-110 flex items-center justify-center transition font-bold shadow-md cursor-pointer border border-emerald-600 dark:border-emerald-400"
              title="Next Step"
            >
              <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3. Bottom Key Values Grid Panel */}
        <div className="max-w-6xl mx-auto relative overflow-hidden bg-white/95 dark:bg-surface border border-slate-200/90 dark:border-subtle p-6 sm:p-8 rounded-card shadow-xl backdrop-blur-sm mt-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand)]/10 dark:bg-[#6BBF54]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand)]/5 dark:bg-[#6BBF54]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-slate-50/90 dark:bg-[#1e2530]/70 hover:bg-white dark:hover:bg-[#1e2530] border border-slate-200/80 dark:border-[rgba(242,242,242,0.1)] hover:border-emerald-400/80 dark:hover:border-[#6BBF54]/60 rounded-[var(--radius-card,8px)] p-4 flex items-start gap-4 transition-all duration-300 shadow-2xs hover:shadow-md group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/15 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 w-10 h-10 rounded-[var(--radius-md,8px)] bg-emerald-50 dark:bg-[rgba(107,191,84,0.15)] text-emerald-600 dark:text-[#6BBF54] flex items-center justify-center flex-shrink-0 border border-emerald-200/80 dark:border-[rgba(107,191,84,0.3)] shadow-2xs">
                <Icon icon="solar:restart-circle-linear" className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <span className="block font-bold text-slate-900 dark:text-white text-sm mb-1">Sustainable</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-normal">Turning waste into long-lasting solutions.</p>
                <div className="w-6 h-0.5 bg-[var(--brand)] rounded-full mt-2 group-hover:w-10 transition-all duration-300" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden bg-slate-50/90 dark:bg-[#1e2530]/70 hover:bg-white dark:hover:bg-[#1e2530] border border-slate-200/80 dark:border-[rgba(242,242,242,0.1)] hover:border-emerald-400/80 dark:hover:border-[#6BBF54]/60 rounded-[var(--radius-card,8px)] p-4 flex items-start gap-4 transition-all duration-300 shadow-2xs hover:shadow-md group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/15 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 w-10 h-10 rounded-[var(--radius-md,8px)] bg-emerald-50 dark:bg-[rgba(107,191,84,0.15)] text-emerald-600 dark:text-[#6BBF54] flex items-center justify-center flex-shrink-0 border border-emerald-200/80 dark:border-[rgba(107,191,84,0.3)] shadow-2xs">
                <Icon icon="solar:shield-check-linear" className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <span className="block font-bold text-slate-900 dark:text-white text-sm mb-1">Quality Assured</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-normal">Each step is tested for performance and safety.</p>
                <div className="w-6 h-0.5 bg-[var(--brand)] rounded-full mt-2 group-hover:w-10 transition-all duration-300" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden bg-slate-50/90 dark:bg-[#1e2530]/70 hover:bg-white dark:hover:bg-[#1e2530] border border-slate-200/80 dark:border-[rgba(242,242,242,0.1)] hover:border-emerald-400/80 dark:hover:border-[#6BBF54]/60 rounded-[var(--radius-card,8px)] p-4 flex items-start gap-4 transition-all duration-300 shadow-2xs hover:shadow-md group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/15 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 w-10 h-10 rounded-[var(--radius-md,8px)] bg-emerald-50 dark:bg-[rgba(107,191,84,0.15)] text-emerald-600 dark:text-[#6BBF54] flex items-center justify-center flex-shrink-0 border border-emerald-200/80 dark:border-[rgba(107,191,84,0.3)] shadow-2xs">
                <Icon icon="solar:cpu-bolt-linear" className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <span className="block font-bold text-slate-900 dark:text-white text-sm mb-1">Advanced Tech</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-normal">Modern machines for precision and consistent quality.</p>
                <div className="w-6 h-0.5 bg-[var(--brand)] rounded-full mt-2 group-hover:w-10 transition-all duration-300" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative overflow-hidden bg-slate-50/90 dark:bg-[#1e2530]/70 hover:bg-white dark:hover:bg-[#1e2530] border border-slate-200/80 dark:border-[rgba(242,242,242,0.1)] hover:border-emerald-400/80 dark:hover:border-[#6BBF54]/60 rounded-[var(--radius-card,8px)] p-4 flex items-start gap-4 transition-all duration-300 shadow-2xs hover:shadow-md group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/15 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 w-10 h-10 rounded-[var(--radius-md,8px)] bg-emerald-50 dark:bg-[rgba(107,191,84,0.15)] text-emerald-600 dark:text-[#6BBF54] flex items-center justify-center flex-shrink-0 border border-emerald-200/80 dark:border-[rgba(107,191,84,0.3)] shadow-2xs">
                <Icon icon="solar:global-linear" className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <span className="block font-bold text-slate-900 dark:text-white text-sm mb-1">Better for Planet</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-normal">Reducing landfill waste and building a circular future.</p>
                <div className="w-6 h-0.5 bg-[var(--brand)] rounded-full mt-2 group-hover:w-10 transition-all duration-300" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
