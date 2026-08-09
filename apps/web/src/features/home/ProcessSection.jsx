import React, { useState, useEffect, useRef } from "react";
import { useSite } from "../../shared/context/SiteContext";
import {
  Recycle,
  Trash2,
  Layers,
  Sparkles,
  Flame,
  Snowflake,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Leaf,
  Cpu,
  Globe,
  Check,
  Zap
} from "lucide-react";

export default function ProcessSection() {
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
        <div className="relative w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-transparent" />
          <Trash2 className="w-8 h-8 text-emerald-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-400/30 shadow-lg shadow-emerald-500/20">
          <Trash2 className="w-12 h-12 text-white" />
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
        <div className="relative w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-transparent" />
          <Layers className="w-8 h-8 text-blue-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-400 rounded-full opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-blue-500 rounded-full flex items-center justify-center border-4 border-blue-400/30 shadow-lg shadow-blue-500/20">
          <Layers className="w-12 h-12 text-white" />
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
        <div className="relative w-16 h-16 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/30 to-transparent" />
          <Sparkles className="w-8 h-8 text-sky-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-sky-400 rounded-full opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-sky-500 rounded-full flex items-center justify-center border-4 border-sky-400/30 shadow-lg shadow-sky-500/20">
          <Sparkles className="w-12 h-12 text-white" />
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
        <div className="relative w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/30 to-transparent" />
          <Flame className="w-8 h-8 text-indigo-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-400 rounded-full opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-indigo-500 rounded-full flex items-center justify-center border-4 border-indigo-400/30 shadow-lg shadow-indigo-500/20">
          <Flame className="w-12 h-12 text-white" />
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
        <div className="relative w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-100/30 to-transparent" />
          <Snowflake className="w-8 h-8 text-teal-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-400 rounded-full opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-teal-500 rounded-full flex items-center justify-center border-4 border-teal-400/30 shadow-lg shadow-teal-500/20">
          <Snowflake className="w-12 h-12 text-white" />
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
        <div className="relative w-16 h-16 bg-violet-50 rounded-xl flex items-center justify-center border border-violet-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-100/30 to-transparent" />
          <ShieldCheck className="w-8 h-8 text-violet-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-violet-400 rounded-full opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-violet-500 rounded-full flex items-center justify-center border-4 border-violet-400/30 shadow-lg shadow-violet-500/20">
          <ShieldCheck className="w-12 h-12 text-white" />
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
        <div className="relative w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-transparent" />
          <CheckCircle2 className="w-8 h-8 text-emerald-600 relative z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full opacity-20 filter blur-sm" />
        </div>
      ),
      activeIcon: (
        <div className="relative w-28 h-28 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-400/30 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-12 h-12 text-white" />
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
    setIsPlaying(false); // Pause autoplay on manual click
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
    if (!isCurrentActive) return "border-slate-100 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1";
    switch (stepIndex) {
      case 0: return "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md -translate-y-1";
      case 1: return "border-blue-500 ring-2 ring-blue-500/20 shadow-md -translate-y-1";
      case 2: return "border-sky-500 ring-2 ring-sky-500/20 shadow-md -translate-y-1";
      case 3: return "border-indigo-500 ring-2 ring-indigo-500/20 shadow-md -translate-y-1";
      case 4: return "border-teal-500 ring-2 ring-teal-500/20 shadow-md -translate-y-1";
      case 5: return "border-violet-500 ring-2 ring-violet-500/20 shadow-md -translate-y-1";
      case 6: return "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md -translate-y-1";
      default: return "border-emerald-500 shadow-md -translate-y-1";
    }
  };

  if (c("show_process", "1") === "0") return null;

  return (
    <section className="py-20 bg-[#FAFBFD] relative overflow-hidden">
      {/* Dynamic Background Mesh Grid */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-100 rounded-full filter blur-[100px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full filter blur-[100px] opacity-20" />
      </div>

      <div className="container relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200/50 rounded-full text-emerald-700 font-bold text-xs tracking-wide uppercase mb-4 shadow-sm">
            <Recycle className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Circular Supply Chain</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B2F63] tracking-tight leading-tight">
            Our Manufacturing <span className="text-emerald-600">Process</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            From responsible plastic waste to high-performance products — every step is engineered for quality, sustainability, and long-term impact.
          </p>
        </div>

        {/* 1. Main Timeline Diagram Structure */}
        <div className="relative mb-20">
          
          {/* Desktop/Tablet 3x3 Grid (Displays exactly as in the image diagram) */}
          <div className="hidden lg:grid grid-cols-3 gap-y-12 gap-x-8 items-center max-w-6xl mx-auto relative">
            
            {/* SVG Connecting Paths overlay (subtle background dotted line flow) */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1100 680" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Flow lines */}
                <path
                  d="M 170,120 Q 300,120 400,120 Q 500,120 700,120 M 740,120 Q 850,120 950,120 L 950,220"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <path
                  d="M 950,300 L 950,420 L 800,560"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <path
                  d="M 680,560 L 380,560 L 150,420 L 150,300"
                  stroke="#cbd5e1"
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
                className={`w-full bg-white p-6 rounded-2xl border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(0, activeStep === 0)}`}
              >
                {/* Step badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0B2F63] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  01
                </div>
                {steps[0].icon}
                <div>
                  <h4 className="font-extrabold text-[#0B2F63] text-base">{steps[0].title}</h4>
                  <span className="text-emerald-600 font-bold text-xs block mt-0.5">{steps[0].subtitle}</span>
                  <p className="text-slate-400 text-2xs leading-relaxed mt-1">{steps[0].brief}</p>
                </div>
              </button>
              {/* Connector to 02 */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-20 text-emerald-500 shadow-sm">
                <ChevronRight className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Step 02 Card */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(1)}
                className={`w-full bg-white p-6 rounded-2xl border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(1, activeStep === 1)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0B2F63] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  02
                </div>
                {steps[1].icon}
                <div>
                  <h4 className="font-extrabold text-[#0B2F63] text-base">{steps[1].title}</h4>
                  <span className="text-blue-600 font-bold text-xs block mt-0.5">{steps[1].subtitle}</span>
                  <p className="text-slate-400 text-2xs leading-relaxed mt-1">{steps[1].brief}</p>
                </div>
              </button>
              {/* Connector to 03 */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-20 text-emerald-500 shadow-sm">
                <ChevronRight className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Step 03 Card */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(2)}
                className={`w-full bg-white p-6 rounded-2xl border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(2, activeStep === 2)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0B2F63] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  03
                </div>
                {steps[2].icon}
                <div>
                  <h4 className="font-extrabold text-[#0B2F63] text-base">{steps[2].title}</h4>
                  <span className="text-sky-600 font-bold text-xs block mt-0.5">{steps[2].subtitle}</span>
                  <p className="text-slate-400 text-2xs leading-relaxed mt-1">{steps[2].brief}</p>
                </div>
              </button>
              {/* Downward Connector to 04 */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-20 text-emerald-500 shadow-sm">
                <ChevronRight className="w-2.5 h-2.5 rotate-90" />
              </div>
            </div>

            {/* --- ROW 2 --- */}
            {/* Step 07 Card (Ready) on Left edge */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(6)}
                className={`w-full bg-white p-6 rounded-2xl border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(6, activeStep === 6)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0B2F63] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  07
                </div>
                {steps[6].icon}
                <div>
                  <h4 className="font-extrabold text-[#0B2F63] text-base">{steps[6].title}</h4>
                  <span className="text-emerald-600 font-bold text-xs block mt-0.5">{steps[6].subtitle}</span>
                  <p className="text-slate-400 text-2xs leading-relaxed mt-1">{steps[6].brief}</p>
                </div>
              </button>
              {/* Up Connector to 01 */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-20 text-emerald-500 shadow-sm">
                <ChevronRight className="w-2.5 h-2.5 -rotate-90" />
              </div>
            </div>

            {/* Center Circular Recycle Banner */}
            <div className="flex flex-col items-center justify-center relative p-8">
              {/* Rotating outer dash circle */}
              <div className="absolute w-56 h-56 rounded-full border-2 border-dashed border-emerald-500/20 animate-spin-slow pointer-events-none" />
              <div className="absolute w-44 h-44 rounded-full bg-[#FAFBFD]/80 filter blur-md pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500/10 to-blue-500/15 flex items-center justify-center border border-white shadow-xl mb-4 p-1.5 animate-pulse-slow">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner">
                    <Recycle className="w-12 h-12 text-emerald-600" />
                  </div>
                </div>
                <h5 className="font-black text-[#0B2F63] text-sm tracking-tight">Zero Waste. Infinite Value.</h5>
                <p className="text-slate-400 text-4xs max-w-xs mt-1">We don't just recycle, we recreate value.</p>
              </div>
            </div>

            {/* Step 04 Card (Extrusion) on Right edge */}
            <div className="relative z-10">
              <button
                type="button"
                onClick={() => handleStepClick(3)}
                className={`w-full bg-white p-6 rounded-2xl border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(3, activeStep === 3)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0B2F63] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  04
                </div>
                {steps[3].icon}
                <div>
                  <h4 className="font-extrabold text-[#0B2F63] text-base">{steps[3].title}</h4>
                  <span className="text-indigo-600 font-bold text-xs block mt-0.5">{steps[3].subtitle}</span>
                  <p className="text-slate-400 text-2xs leading-relaxed mt-1">{steps[3].brief}</p>
                </div>
              </button>
              {/* Down Connector to 05 */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-20 text-emerald-500 shadow-sm">
                <ChevronRight className="w-2.5 h-2.5 rotate-90" />
              </div>
            </div>

            {/* --- ROW 3 --- */}
            {/* Step 06 Aligned towards bottom center */}
            <div className="relative z-10 col-start-1 col-end-2 justify-self-end mr-[-40px]">
              <button
                type="button"
                onClick={() => handleStepClick(5)}
                className={`w-[320px] bg-white p-6 rounded-2xl border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(5, activeStep === 5)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0B2F63] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  06
                </div>
                {steps[5].icon}
                <div>
                  <h4 className="font-extrabold text-[#0B2F63] text-base">{steps[5].title}</h4>
                  <span className="text-violet-600 font-bold text-xs block mt-0.5">{steps[5].subtitle}</span>
                  <p className="text-slate-400 text-2xs leading-relaxed mt-1">{steps[5].brief}</p>
                </div>
              </button>
              {/* Left Connector to 07 */}
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-20 text-emerald-500 shadow-sm">
                <ChevronRight className="w-2.5 h-2.5 rotate-180" />
              </div>
            </div>

            {/* Bottom Row Spacers & Alignments */}
            <div className="flex justify-center items-center pointer-events-none">
              {/* Flow connector between 05 and 06 */}
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 shadow-sm z-20">
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              </div>
            </div>

            {/* Step 05 Aligned towards bottom center */}
            <div className="relative z-10 col-start-3 col-end-4 justify-self-start ml-[-40px]">
              <button
                type="button"
                onClick={() => handleStepClick(4)}
                className={`w-[320px] bg-white p-6 rounded-2xl border text-left transition-all duration-300 relative flex items-center gap-4 ${getGlowStyles(4, activeStep === 4)}`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0B2F63] text-white flex items-center justify-center font-bold text-xs shadow-md">
                  05
                </div>
                {steps[4].icon}
                <div>
                  <h4 className="font-extrabold text-[#0B2F63] text-base">{steps[4].title}</h4>
                  <span className="text-teal-600 font-bold text-xs block mt-0.5">{steps[4].subtitle}</span>
                  <p className="text-slate-400 text-2xs leading-relaxed mt-1">{steps[4].brief}</p>
                </div>
              </button>
              {/* Left Connector to 06 */}
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center z-20 text-emerald-500 shadow-sm">
                <ChevronRight className="w-2.5 h-2.5 rotate-180" />
              </div>
            </div>

          </div>

          {/* Mobile & Tablet Horizontal Stepper Layout (Highly interactive & zero visual redundancy) */}
          <div className="lg:hidden flex flex-col gap-6 max-w-lg mx-auto">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Select Manufacturing Step</span>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 animate-pulse">
                Swipe left/right <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            {/* Horizontal Scroll Track */}
            <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x snap-mandatory -mx-4 px-4">
              {steps.map((st, i) => {
                const isActive = activeStep === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStepClick(i)}
                    className={`flex-shrink-0 snap-center py-3 px-4 rounded-2xl transition-all duration-300 flex items-center gap-3 border text-left min-w-[210px] ${
                      isActive
                        ? "bg-[#0b2247] text-white border-[#0b2247] shadow-lg shadow-blue-900/20 scale-[1.02]"
                        : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 shadow-2xs"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                      isActive ? "bg-emerald-500 text-[#0b2247]" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}>
                      {st.num}
                    </div>
                    <div>
                      <h4 className={`font-extrabold text-xs leading-none ${isActive ? "text-white" : "text-slate-800"}`}>{st.title}</h4>
                      <span className={`text-[10px] font-bold mt-1 block leading-none ${isActive ? "text-emerald-400" : "text-emerald-600"}`}>{st.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 2. Interactive Dark Panel Details Section (Beautifully Matches Image) */}
        <div className="max-w-6xl mx-auto bg-[#0b2247] text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
          {/* Subtle Background Abstract Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500 rounded-full filter blur-xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600 rounded-full filter blur-2xl" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Column A: Left side 3D Icon Container */}
            <div className="lg:col-span-3 flex justify-center items-center">
              <div className="relative p-6 bg-slate-900/30 rounded-3xl border border-white/5 shadow-inner">
                {steps[activeStep].activeIcon}
                <div className="absolute -bottom-2 right-4 bg-emerald-500 text-[#0b2247] px-3 py-1 rounded-full text-xs font-black tracking-tight shadow-md">
                  Step {steps[activeStep].num}
                </div>
              </div>
            </div>

            {/* Column B: Center step text details */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-2 block">
                {steps[activeStep].subtitle}
              </span>
              <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight mb-4 flex items-center gap-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {steps[activeStep].desc}
              </p>
            </div>

            {/* Column C: Right step checklist features */}
            <div className="lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 gap-4">
              {steps[activeStep].features.map((feature, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-white">{feature.label}</h5>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Nav buttons positioned responsively (relative/flex on mobile, absolute on desktop) */}
          <div className="mt-8 flex justify-end items-center gap-3 relative lg:absolute lg:bottom-8 lg:right-8 lg:mt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-[#0b2247] border border-white/10 flex items-center justify-center transition text-white shadow-md"
              title="Previous Step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-emerald-500 text-[#0b2247] hover:bg-white flex items-center justify-center transition font-bold shadow-md shadow-emerald-500/20"
              title="Next Step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3. Bottom Key Values Grid Panel (Exactly as shown in the image) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm mt-12">
          
          <div className="flex items-start gap-4 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Sustainable</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Turning waste into long-lasting solutions.</p>
              <div className="w-5 h-0.5 bg-emerald-500 rounded mt-2" />
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Quality Assured</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Each step is tested for performance and safety.</p>
              <div className="w-5 h-0.5 bg-emerald-500 rounded mt-2" />
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Advanced Technology</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Modern machines for precision and consistent quality.</p>
              <div className="w-5 h-0.5 bg-emerald-500 rounded mt-2" />
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Better for Planet</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Reducing landfill waste and building a circular future.</p>
              <div className="w-5 h-0.5 bg-emerald-500 rounded mt-2" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
