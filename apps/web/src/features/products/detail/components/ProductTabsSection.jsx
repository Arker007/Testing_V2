import React, { useState } from "react";
import { simplifyFeature } from "@/shared/utils/productUtils";
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { FaqAccordion } from "@/shared/ui";

const MotionDiv = motion.div;
const MotionSpan = motion.span;

export default function ProductTabsSection({
  product = {},
  categoryObj: _categoryObj,
  specs = {},
  hasSpecs: _hasSpecs = true,
  features = [],
  tab = "specs",
  setTab,
  tabs: _tabsProp = [],
}) {
  const [unit, setUnit] = useState("metric"); // 'metric' | 'imperial'

  const cat = (product.category || product.category_name || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const isPallet = cat.includes("pallet") || name.includes("pallet");
  const isLumber = cat.includes("lumber") || name.includes("lumber") || cat.includes("profile");
  const isBenchOrTable =
    cat.includes("bench") ||
    cat.includes("table") ||
    name.includes("bench") ||
    name.includes("table");

  // Standard engineering tab items matching the UI reference
  const tabItems = [
    { key: "specs", label: "Technical Specifications", icon: "carbon:document" },
    { key: "materials", label: "Materials", icon: "carbon:layers" },
    { key: "applications", label: "Applications", icon: "carbon:grid" },
    { key: "downloads", label: "Downloads", icon: "carbon:download" },
    { key: "faq", label: "FAQ", icon: "carbon:help" },
  ];

  // Map incoming tab aliases
  const activeTab =
    tab === "description"
      ? "materials"
      : tab === "shipping"
      ? "applications"
      : tab || "specs";

  const handleTabChange = (key) => {
    if (setTab) {
      setTab(key);
    }
  };

  // Convert unit values dynamically
  const convertSpec = (key, metricVal, imperialVal) => {
    return unit === "imperial" ? imperialVal : metricVal;
  };

  // Build the structured specification rows matching the reference image exactly
  const getSpecificationRows = () => {
    if (isPallet) {
      return [
        {
          param: "Dimensions (L × W × H)",
          value: convertSpec(
            "dim",
            specs["Dimensions"] || specs["Dimensions (L × W × H)"] || specs["Size"] || "1200 × 1000 × 150 mm",
            "47.2 × 39.4 × 5.9 in"
          ),
        },
        {
          param: "Static Load Capacity",
          value: convertSpec(
            "static",
            specs["Static Load"] || specs["Static Load Capacity"] || product.capacity || "5,000 kg",
            "11,023 lbs"
          ),
        },
        {
          param: "Dynamic Load Capacity",
          value: convertSpec(
            "dynamic",
            specs["Dynamic Load"] || specs["Dynamic Load Capacity"] || "1,500 kg",
            "3,307 lbs"
          ),
        },
        {
          param: "Racking Load Capacity",
          value: convertSpec(
            "racking",
            specs["Racking Load"] || specs["Racking Load Capacity"] || "1,000 kg",
            "2,205 lbs"
          ),
        },
        {
          param: "Weight",
          value: convertSpec(
            "weight",
            specs["Weight"] || "14.5 kg (approx.)",
            "32.0 lbs (approx.)"
          ),
        },
        {
          param: "Material",
          value: specs["Material"] || "100% Recycled HDPE / PP Composite",
        },
      ];
    }

    if (isLumber) {
      return [
        {
          param: "Dimensions (W × H × L)",
          value: convertSpec(
            "dim",
            specs["Dimensions"] || specs["Size"] || "100 × 50 × 2400 mm",
            "4 × 2 in × 8 ft"
          ),
        },
        {
          param: "Density",
          value: convertSpec("density", specs["Density"] || "0.95 g/cm³", "59.3 lb/ft³"),
        },
        {
          param: "Flexural Modulus",
          value: convertSpec("modulus", specs["Flexural Modulus"] || "1,200 MPa", "174,000 psi"),
        },
        {
          param: "Water Absorption",
          value: specs["Water Absorption"] || "0.00% (Completely Non-Porous)",
        },
        {
          param: "Weight per Meter",
          value: convertSpec("weight", specs["Weight"] || "4.75 kg/m", "3.19 lbs/ft"),
        },
        {
          param: "Material",
          value: specs["Material"] || "100% Recycled Solid Polymer Composite",
        },
      ];
    }

    if (isBenchOrTable) {
      return [
        {
          param: "Dimensions (L × W × H)",
          value: convertSpec(
            "dim",
            specs["Dimensions"] || specs["Size"] || "1500 × 600 × 750 mm",
            "59.1 × 23.6 × 29.5 in"
          ),
        },
        {
          param: "Seating Capacity",
          value: specs["Seating Capacity"] || "3-4 Adults (Heavy Duty)",
        },
        {
          param: "Total Unit Weight",
          value: convertSpec("weight", specs["Weight"] || "55 kg (Tip-proof)", "121.2 lbs (Tip-proof)"),
        },
        {
          param: "Ground Anchoring",
          value: "Bolt-down Base Plates (Anti-theft)",
        },
        {
          param: "Weather Rating",
          value: "100% Waterproof, UV-Stabilized Class 8",
        },
        {
          param: "Material",
          value: specs["Material"] || "Reinforced Recycled Composite Lumber",
        },
      ];
    }

    // Default Industrial specs
    const customEntries = Object.entries(specs);
    if (customEntries.length > 0) {
      return customEntries.map(([k, v]) => ({
        param: k,
        value: v,
      }));
    }

    return [
      {
        param: "Dimensions (L × W × H)",
        value: convertSpec("dim", "1200 × 1000 × 150 mm", "47.2 × 39.4 × 5.9 in"),
      },
      {
        param: "Static Load Capacity",
        value: convertSpec("static", product.capacity || "5,000 kg", "11,023 lbs"),
      },
      {
        param: "Dynamic Load Capacity",
        value: convertSpec("dynamic", "1,500 kg", "3,307 lbs"),
      },
      {
        param: "Racking Load Capacity",
        value: convertSpec("racking", "1,000 kg", "2,205 lbs"),
      },
      {
        param: "Weight",
        value: convertSpec("weight", "14.5 kg", "32.0 lbs"),
      },
      {
        param: "Material",
        value: "100% Recycled HDPE Composite",
      },
    ];
  };

  const _getRowIcon = (param = "") => {
    const p = param.toLowerCase();
    if (p.includes("dimension") || p.includes("size")) return "carbon:cube";
    if (p.includes("static")) return "carbon:align-box-bottom-center";
    if (p.includes("dynamic")) return "carbon:delivery";
    if (p.includes("racking") || p.includes("rack")) return "carbon:align-vertical-center";
    if (p.includes("weight")) return "carbon:tag";
    if (p.includes("material")) return "carbon:recycle";
    if (p.includes("water") || p.includes("moisture")) return "carbon:water";
    if (p.includes("density") || p.includes("modulus")) return "carbon:layers";
    if (p.includes("weather")) return "carbon:sun";
    if (p.includes("anchor") || p.includes("seating")) return "carbon:user";
    return "carbon:information";
  };

  const rows = getSpecificationRows();

  const handleDownloadDatasheet = () => {
    try {
      let printFrame = document.getElementById("datasheet-print-frame");
      if (!printFrame) {
        printFrame = document.createElement("iframe");
        printFrame.id = "datasheet-print-frame";
        printFrame.style.position = "fixed";
        printFrame.style.right = "0";
        printFrame.style.bottom = "0";
        printFrame.style.width = "0";
        printFrame.style.height = "0";
        printFrame.style.border = "none";
        document.body.appendChild(printFrame);
      }

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Technical Datasheet - ${product.name || "Product"}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; font-variant-numeric: tabular-nums; padding: 24px; color: #0f172a; font-size: 14px; line-height: 22px; }
              h1 { font-size: 20px; line-height: 28px; color: #16532d; margin-bottom: 4px; }
              h2 { font-size: 16px; line-height: 24px; color: #334155; margin-top: 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; font-variant-numeric: tabular-nums; }
              th { background: #16532d; color: white; padding: 10px 14px; text-align: left; }
              td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-variant-numeric: tabular-nums; }
            </style>
          </head>
          <body>
            <h1>VISHAL ENTERPRISE · TECHNICAL SPECIFICATIONS</h1>
            <h2>${product.name || "Industrial Composite Product"}</h2>
            <table>
              <thead><tr><th>Parameter</th><th>Specification (${unit.toUpperCase()})</th></tr></thead>
              <tbody>
                ${rows.map((r) => `<tr><td><strong>${r.param}</strong></td><td>${r.value}</td></tr>`).join("")}
              </tbody>
            </table>
          </body>
        </html>
      `;
      const frameDoc = printFrame.contentWindow || printFrame.contentDocument;
      const doc = frameDoc.document || frameDoc;
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        try {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
        } catch {
          // fallback silent
        }
      }, 250);
    } catch {
      // fallback
    }
  };

  const handleTabKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % tabItems.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabItems.length) % tabItems.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabItems.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextKey = tabItems[nextIndex].key;
      handleTabChange(nextKey);
      const nextBtn = document.getElementById(`tab-${nextKey}`);
      nextBtn?.focus();
    }
  };

  return (
    <section
      id="product-tabs-section"
      className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-card,8px)] p-6 sm:p-8 shadow-xs transition-all duration-200"
    >
      {/* 1. Tab Navigation Bar with Rounded-Full Unit Toggle */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-subtle)] pb-0 gap-4 mb-6 sm:mb-8">
        {/* Tab Links */}
        <div
          role="tablist"
          aria-label="Product Details and Specifications"
          className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none -mb-px"
        >
          {tabItems.map((t, idx) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${t.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(t.key)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`relative pb-3.5 text-sm sm:text-base whitespace-nowrap transition-colors cursor-pointer font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] rounded-t-sm flex items-center gap-2 sm:gap-2.5 ${
                  isActive
                    ? "text-[var(--text-brand)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon
                  icon={t.icon}
                  className={`w-4.5 h-4.5 shrink-0 ${
                    isActive ? "text-[var(--text-brand)]" : "text-[var(--text-muted)]"
                  }`}
                />
                <span>{t.label}</span>
                {isActive && (
                  <MotionSpan
                    layoutId="activeProductTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--text-brand)] rounded-[var(--radius-card,8px)]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Metric / Imperial Unit Toggle Switch */}
        {activeTab === "specs" ? (
          <div
            role="radiogroup"
            aria-label="Unit of measurement"
            className="inline-flex items-center rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] p-1 shadow-2xs my-1 shrink-0"
          >
            <button
              type="button"
              role="radio"
              aria-checked={unit === "metric"}
              onClick={() => setUnit("metric")}
              className={`px-4 py-1.5 rounded-[var(--radius-card,8px)] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                unit === "metric"
                  ? "bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs font-extrabold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold"
              }`}
            >
              Metric (mm / kg)
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={unit === "imperial"}
              onClick={() => setUnit("imperial")}
              className={`px-4 py-1.5 rounded-[var(--radius-card,8px)] text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                unit === "imperial"
                  ? "bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs font-extrabold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold"
              }`}
            >
              Imperial (in / lb)
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[var(--radius-card,8px)] border border-[var(--border-brand)] bg-[var(--brand-soft)] text-xs font-bold text-[var(--text-brand)] my-1 shrink-0 shadow-xs">
            <Icon icon="carbon:checkmark-filled" className="w-4 h-4 text-[var(--text-brand)]" />
            <span>ISPM-15 Exempt & ISO 9001 QA</span>
          </div>
        )}
      </div>

      {/* 2. Content Viewport with Motion Transitions */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={activeTab}
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* TAB 1: TECHNICAL SPECIFICATIONS (2-column layout matching image.png) */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (7 Cols): General Specifications Card & Table */}
                <div className="lg:col-span-7 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
                  {/* Card Header */}
                  <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      General Specifications
                    </h3>
                    <span className="text-xs text-[var(--text-muted)] font-normal">
                      Key dimensions and physical properties of the pallet.
                    </span>
                  </div>

                  {/* Table Body Rows */}
                  <div className="divide-y divide-[var(--border-subtle)]">
                    {rows.concat({
                      param: "Color Options",
                      value: "Teak Brown, Charcoal Grey, Jet Black, Forest Green",
                    }).map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 items-center py-3.5 px-5 sm:px-6 hover:bg-[var(--bg-surface-secondary)]/40 transition-colors"
                      >
                        {/* Left Column: Parameter */}
                        <div className="col-span-5 text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                          {row.param}
                        </div>

                        {/* Right Column: Specification Value */}
                        <div className="col-span-7 text-xs sm:text-sm font-bold text-[var(--text-primary)] text-right tabular-nums">
                          {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column (5 Cols): 3 Stacked Feature Cards */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Card 1: Operating Temperature Range */}
                  <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-start gap-4 shadow-xs">
                    <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] flex items-center justify-center shrink-0">
                      <Icon icon="carbon:temperature" className="w-5 h-5 text-[var(--text-brand)]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        Operating Temperature Range
                      </h4>
                      <div className="text-sm font-extrabold text-[var(--text-primary)]">
                        {unit === "imperial" ? "-22°F to +140°F" : "-30°C to +60°C"}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        Suitable for cold storage, outdoor use, and harsh industrial environments.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Chemical & Weather Resistance */}
                  <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-start gap-4 shadow-xs">
                    <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] flex items-center justify-center shrink-0">
                      <Icon icon="carbon:security" className="w-5 h-5 text-[var(--text-brand)]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        Chemical & Weather Resistance
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        Resistant to moisture, UV, oils, and most industrial chemicals.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Environmental */}
                  <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-start gap-4 shadow-xs">
                    <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] flex items-center justify-center shrink-0">
                      <Icon icon="carbon:eco" className="w-5 h-5 text-[var(--text-brand)]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        Environmental
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        Made from 100% recycled HDPE. Supports sustainable material usage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MATERIALS */}
            {activeTab === "materials" && (
              <div className="space-y-6">
                {/* 1. Formulation Overview Card */}
                <div className="p-5 sm:p-6 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center shrink-0">
                      <Icon icon="carbon:layers" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">
                        Polymer Formulation & Material Matrix
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        Engineered high-density circular thermoplastic compound
                      </p>
                    </div>
                  </div>

                  {product.description ? (
                    <div
                      className="prose prose-slate dark:prose-invert max-w-none text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product.description),
                      }}
                    />
                  ) : (
                    <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                      Industrial composite formulation engineered from 100% recycled high-density
                      polyethylene (HDPE) and polypropylene (PP) matrices. Designed for structural
                      rigidity, high cyclic impact resistance, and zero moisture degradation.
                    </p>
                  )}

                  {/* Material Specs Quick Pills */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs text-xs font-semibold">
                      <Icon icon="carbon:security" className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                      100% Recycled HDPE / PP
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs text-xs font-semibold">
                      <Icon icon="carbon:water" className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                      0.00% Water Absorption
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs text-xs font-semibold">
                      <Icon icon="carbon:send" className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                      ISPM-15 Exempt (No Fumigation)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs text-xs font-semibold">
                      <Icon icon="carbon:recycle" className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                      100% Circular Lifecycle
                    </span>
                  </div>
                </div>

                {/* 2. Key Resilience Properties (3 Bento Grid Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center mb-3">
                        <Icon icon="carbon:security" className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                        Chemical & Rot Immunity
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        Zero absorption rate (0.00%). Impervious to acids, alkalis, oils, industrial solvents, and fungal decay.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <span>Standard</span>
                      <span className="text-[var(--text-primary)]">ASTM D543</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center mb-3">
                        <Icon icon="carbon:sun" className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                        UV Weathering Stabilization
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        Compounded with hindered amine light stabilizers (HALS) and carbon black to prevent outdoor sun embrittlement.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <span>Rating</span>
                      <span className="text-[var(--text-primary)]">Outdoor 50+ Yrs</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center mb-3">
                        <Icon icon="carbon:recycle" className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                        Circular ESG Compliance
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        100% recycled industrial feedstocks divert plastics from landfills. Fully recyclable at end of service life.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <span>Lifecycle</span>
                      <span className="text-[var(--text-primary)]">Zero Carbon Net</span>
                    </div>
                  </div>
                </div>

                {/* 3. Engineering Attributes & Standards Grid */}
                {features.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2.5 pb-1">
                      <div className="w-7 h-7 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center shrink-0">
                        <Icon icon="carbon:list-checked" className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                        Engineering Attributes & Standards
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all flex items-start gap-3 shadow-xs"
                        >
                          <div className="w-5 h-5 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-2xs flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="carbon:checkmark-filled" className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                          </div>
                          <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)] leading-snug">
                            {simplifyFeature(feat)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: APPLICATIONS */}
            {activeTab === "applications" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center mb-3">
                        <Icon icon="carbon:box" className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                        Automated AS/RS Racking
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        High-bay storage rackable up to 1,000 kg with minimal beam deflection. Smooth runner profiles optimized for automated conveyor sensors.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <span>Racking SLA</span>
                      <span className="text-[var(--text-primary)]">1,000 kg</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center mb-3">
                        <Icon icon="carbon:snowflake" className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                        Cold Storage & Freezers
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        Maintains structural integrity and ductile toughness down to -30°C without cracking, brittle fracture, or frost absorption.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <span>Temp Range</span>
                      <span className="text-[var(--text-primary)]">-30°C to +60°C</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center mb-3">
                        <Icon icon="carbon:delivery" className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                        Global Export & Shipping
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        Zero phytosanitary fumigation required (ISPM-15 exempt). Approved for rapid customs border clearance across EU, US, and Asian ports.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <span>Customs</span>
                      <span className="text-[var(--text-primary)]">Fumigation Free</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                  <span>
                    <strong className="text-[var(--text-primary)]">Direct Dispatch:</strong> Ex-factory Ankleshwar GIDC Industrial Estate, Gujarat. Full truckload (FTL) and consolidated consignments available.
                  </span>
                  <span className="font-mono font-bold text-[var(--text-primary)] shrink-0 px-2.5 py-1 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    Port: Nhava Sheva / Hazira
                  </span>
                </div>
              </div>
            )}

            {/* TAB 4: DOWNLOADS */}
            {activeTab === "downloads" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center shrink-0">
                        <Icon icon="carbon:document" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">
                          Technical Datasheet (PDF)
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          Engineering metrics, load tables & tolerances
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadDatasheet}
                      className="px-3.5 py-1.5 rounded-[var(--radius-card,8px)] text-xs font-bold bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-[var(--brand-btn-text)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs"
                    >
                      <Icon icon="carbon:download" className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center shrink-0">
                        <Icon icon="carbon:security" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">
                          ISPM-15 Exemption Letter
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          Export customs clearance compliance
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadDatasheet}
                      className="px-3.5 py-1.5 rounded-[var(--radius-card,8px)] text-xs font-bold border border-[var(--border-default)] hover:border-[var(--border-brand)] hover:bg-[var(--brand-soft)] text-[var(--text-primary)] hover:text-[var(--text-brand)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs"
                    >
                      <Icon icon="carbon:view" className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                      <span>View</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center shrink-0">
                        <Icon icon="carbon:box" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">
                          2D / 3D CAD Drawing Package
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          STEP / DWG files for warehouse integration
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadDatasheet}
                      className="px-3.5 py-1.5 rounded-[var(--radius-card,8px)] text-xs font-bold bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-[var(--brand-btn-text)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs"
                    >
                      <Icon icon="carbon:download" className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] shadow-xs flex items-center justify-center shrink-0">
                        <Icon icon="carbon:certificate" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">
                          MSDS & Chemical Safety Sheet
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          Polymer compound safety verification
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadDatasheet}
                      className="px-3.5 py-1.5 rounded-[var(--radius-card,8px)] text-xs font-bold border border-[var(--border-default)] hover:border-[var(--border-brand)] hover:bg-[var(--brand-soft)] text-[var(--text-primary)] hover:text-[var(--text-brand)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs"
                    >
                      <Icon icon="carbon:view" className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: FAQ */}
            {activeTab === "faq" && (
              <div className="pt-0">
                <FaqAccordion
                  items={
                    product.faqs && product.faqs.length > 0
                      ? product.faqs.map((faq, i) => ({
                          id: `prod-faq-${i}`,
                          question: faq.question,
                          answer: faq.answer,
                        }))
                      : [
                          {
                            id: "faq-custom-dimensions",
                            question: "Can Vishal Enterprise customize dimensions or weight profiles?",
                            answer:
                              "Yes. In addition to standard sizes (1200x1000, 1200x800, 1100x1100), our Ankleshwar plant manufactures custom composite skids, reinforced runners, and non-standard lumber cross-sections.",
                          },
                          {
                            id: "faq-recycled-vs-virgin",
                            question: "How do recycled composite pallets compare to virgin plastic?",
                            answer:
                              "Our recycled HDPE polymer blends are fortified with impact modifiers and structural cross-ribbing. They deliver comparable flexural modulus and load ratings at significantly lower unit costs while advancing corporate ESG sustainability goals.",
                          },
                          {
                            id: "faq-export-compliance",
                            question: "Are these pallets compliant for global pharmaceutical and export shipments?",
                            answer:
                              "Yes. Synthetic recycled plastic pallets are non-porous, moisture-resistant, and 100% ISPM-15 exempt, requiring zero fumigation or heat treatment certificates at customs.",
                          },
                        ]
                  }
                  defaultOpenIndex={0}
                  allowMultiple={true}
                />
              </div>
            )}
          </MotionDiv>
        </AnimatePresence>
      </div>
    </section>
  );
}

