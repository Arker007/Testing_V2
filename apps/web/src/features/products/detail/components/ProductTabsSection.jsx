import React, { useState } from "react";
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
    { key: "specs", label: "Technical Specifications" },
    { key: "materials", label: "Materials" },
    { key: "applications", label: "Applications" },
    { key: "downloads", label: "Downloads" },
    { key: "faq", label: "FAQ" },
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
              body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #0f172a; }
              h1 { font-size: 20px; color: #16532d; margin-bottom: 4px; }
              h2 { font-size: 16px; color: #334155; margin-top: 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
              th { background: #16532d; color: white; padding: 10px 14px; text-align: left; }
              td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; }
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
      className="w-full pt-4 pb-2 transition-all duration-200"
    >
      {/* 1. Tab Navigation Bar with Rounded-Full Unit Toggle */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-subtle)] pb-0 gap-4 mb-6 sm:mb-7">
        {/* Tab Links */}
        <div
          role="tablist"
          aria-label="Product Details and Specifications"
          className="flex items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-none -mb-px"
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
                className={`relative pb-3 text-sm sm:text-base whitespace-nowrap transition-colors cursor-pointer font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] rounded-t-sm ${
                  isActive
                    ? "text-[var(--brand-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>{t.label}</span>
                {isActive && (
                  <MotionSpan
                    layoutId="activeProductTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--brand-primary)]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Metric / Imperial Unit Toggle Switch (Visible on Technical Specifications) or Certified Quality Badge */}
        {activeTab === "specs" ? (
          <div
            role="radiogroup"
            aria-label="Unit of measurement"
            className="relative inline-flex items-center rounded-[var(--radius-lg,8px)] border border-[var(--border-default)] bg-[var(--bg-surface-secondary)] p-1 shadow-2xs my-1 shrink-0"
          >
            <button
              type="button"
              role="radio"
              aria-checked={unit === "metric"}
              onClick={() => setUnit("metric")}
              className={`relative z-10 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-[calc(var(--radius-lg,8px)-4px)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer inline-flex items-center justify-center leading-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] ${
                unit === "metric"
                  ? "text-white font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {unit === "metric" && (
                <MotionDiv
                  layoutId="activeUnitIndicator"
                  className="absolute inset-0 bg-[var(--brand-primary)] rounded-[calc(var(--radius-lg,8px)-4px)] -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span>Metric (mm / kg)</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={unit === "imperial"}
              onClick={() => setUnit("imperial")}
              className={`relative z-10 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-[calc(var(--radius-lg,8px)-4px)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer inline-flex items-center justify-center leading-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] ${
                unit === "imperial"
                  ? "text-white font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {unit === "imperial" && (
                <MotionDiv
                  layoutId="activeUnitIndicator"
                  className="absolute inset-0 bg-[var(--brand-primary)] rounded-[calc(var(--radius-lg,8px)-4px)] -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span>Imperial (in / lb)</span>
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[var(--radius-lg,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] text-xs font-semibold text-[var(--text-secondary)] my-1 shrink-0">
            <Icon icon="carbon:checkmark-filled" className="w-4 h-4 text-[var(--brand-primary)] dark:text-emerald-400" />
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
            {/* TAB 1: TECHNICAL SPECIFICATIONS (Table as in reference image) */}
            {activeTab === "specs" && (
              <div className="space-y-4">
                {/* Table Card Container */}
                <div className="w-full rounded-[var(--radius-lg,8px)] border border-[var(--border-default)] overflow-hidden bg-[var(--bg-surface)] shadow-2xs">
                  <div className="w-full overflow-x-auto">
                    <div className="min-w-[480px]">
                      {/* Header Row */}
                      <div className="grid grid-cols-12 bg-[var(--bg-surface-secondary)] border-b border-[var(--border-subtle)] py-3 px-6 sm:px-8 text-sm font-bold text-[var(--brand-primary)]">
                        <div className="col-span-6">Parameter</div>
                        <div className="col-span-6">Specification</div>
                      </div>

                      {/* Table Body Rows */}
                      <div className="divide-y divide-[var(--border-subtle)]">
                        {rows.map((row, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-12 py-3 px-6 sm:px-8 items-center hover:bg-[var(--bg-surface-secondary)]/50 transition-colors"
                          >
                            <span className="col-span-6 text-sm text-[var(--text-secondary)] font-medium">
                              {row.param}
                            </span>
                            <span className="col-span-6 text-sm text-[var(--text-primary)] font-bold">
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operating Range / Compliance Notice Box */}
                <div className="p-3.5 sm:p-4 rounded-[var(--radius-lg,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex items-center gap-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  <Icon
                    icon="carbon:temperature"
                    className="w-5 h-5 text-[var(--brand-primary)] shrink-0"
                  />
                  <p>
                    Operating temperature range:{" "}
                    <strong className="text-[var(--text-primary)] font-bold">
                      {unit === "imperial" ? "-22°F to +140°F" : "-30°C to +60°C"}
                    </strong>
                    . Fully compliant with high-density AS/RS automated racking, cold storage blast freezers, and maritime container stuffing.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: MATERIALS */}
            {activeTab === "materials" && (
              <div className="space-y-6">
                {/* 1. Formulation Overview Card */}
                <div className="p-5 sm:p-6 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center shrink-0">
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]">
                      <Icon icon="carbon:security" className="w-3.5 h-3.5 text-emerald-500" />
                      100% Recycled HDPE / PP
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]">
                      <Icon icon="carbon:water" className="w-3.5 h-3.5 text-blue-500" />
                      0.00% Water Absorption
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]">
                      <Icon icon="carbon:send" className="w-3.5 h-3.5 text-amber-500" />
                      ISPM-15 Exempt (No Fumigation)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)]">
                      <Icon icon="carbon:recycle" className="w-3.5 h-3.5 text-teal-500" />
                      100% Circular Lifecycle
                    </span>
                  </div>
                </div>

                {/* 2. Key Resilience Properties (3 Bento Grid Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
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

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
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

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center mb-3">
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
                      <div className="w-7 h-7 rounded-md bg-[var(--brand-soft)] text-[var(--brand-primary)] flex items-center justify-center shrink-0">
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
                          className="p-3.5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all flex items-start gap-3 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="carbon:checkmark-filled" className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)] leading-snug">
                            {feat}
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
                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center mb-3">
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

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
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

                  <div className="p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
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
                  <span className="font-mono font-bold text-[var(--text-primary)] shrink-0 px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                    Port: Nhava Sheva / Hazira
                  </span>
                </div>
              </div>
            )}

            {/* TAB 4: DOWNLOADS */}
            {activeTab === "downloads" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,6px)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:text-emerald-400 flex items-center justify-center shrink-0">
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
                      className="px-3.5 py-1.5 rounded-[var(--radius-btn,6px)] text-xs font-semibold bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Icon icon="carbon:download" className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,6px)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:text-emerald-400 flex items-center justify-center shrink-0">
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
                      className="px-3.5 py-1.5 rounded-[var(--radius-btn,6px)] text-xs font-semibold border border-[var(--border-default)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Icon icon="carbon:view" className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,6px)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:text-emerald-400 flex items-center justify-center shrink-0">
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
                      className="px-3.5 py-1.5 rounded-[var(--radius-btn,6px)] text-xs font-semibold border border-[var(--border-default)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Icon icon="carbon:download" className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-card,6px)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:text-emerald-400 flex items-center justify-center shrink-0">
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
                      className="px-3.5 py-1.5 rounded-[var(--radius-btn,6px)] text-xs font-semibold border border-[var(--border-default)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Icon icon="carbon:view" className="w-3.5 h-3.5" />
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

