import React, { useState } from "react";
import { IconBox, Tabs } from "../../../shared/components/ui";

const closedLoopBenefits = [
  {
    icon: "solar:dumbbell-large-linear",
    text: "Made from recycled high-density polyethylene (HDPE) with impact, UV, and moisture resistance.",
  },
  {
    icon: "solar:check-circle-linear",
    text: "Versatility for use in both stacking and racking systems.",
  },
  {
    icon: "solar:layers-minimalistic-linear",
    text: "Compatibility with RFID and customizable labeling.",
  },
  {
    icon: "solar:shield-check-linear",
    text: "Hygienic, easy to clean, and non-absorbent.",
  },
  {
    icon: "solar:ruler-cross-linear",
    text: "Available in 100% virgin material for FDA-grade applications.",
  },
  {
    icon: "solar:hourglass-linear",
    text: "10+ years of durability.",
  },
];

const lightweightBenefits = [
  {
    icon: "solar:shield-warning-linear",
    text: "Made from recycled high-density polyethylene (HDPE) with impact, UV, and moisture resistance.",
  },
  {
    icon: "solar:document-check-linear",
    text: "Exempt from NOM 144 requirements.",
  },
  {
    icon: "solar:sort-from-top-to-bottom-linear",
    text: "Lightweight pallet design.",
  },
  {
    icon: "solar:box-minimalistic-linear",
    text: "Nestable design that maximizes space.",
  },
  {
    icon: "solar:box-bold-linear",
    text: "Available in 100% virgin material for FDA-grade applications.",
  },
  {
    icon: "solar:waterdrops-linear",
    text: "Hygienic, easy to clean, and non-absorbent.",
  },
];

export const ProductBenefitsGrid = React.memo(function ProductBenefitsGrid({ categoryName }) {
  const [activeTab, setActiveTab] = useState("closed-loop");

  const currentBenefits = activeTab === "closed-loop" ? closedLoopBenefits : lightweightBenefits;
  const displayCategory = categoryName || "plastic pallets";

  return (
    <div className="w-full bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,12px)] p-6 sm:p-8 shadow-[var(--shadow-sm)] transition-all duration-200">
      {/* Centered Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <span className="text-[10px] font-bold text-[var(--brand-primary)] uppercase tracking-widest bg-[var(--brand-soft)] px-3 py-1 rounded-[var(--radius-badge,4px)] border border-[var(--brand-border)] inline-block mb-2">
          Engineering & Lifecycle Advantages
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug">
          Key Industrial Benefits of {displayCategory}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Engineered to optimize logistics efficiency and safeguard heavy industrial cargo throughout the supply chain.
        </p>

        {/* Tab Toggle Pills */}
        <div className="mt-5 flex justify-center">
          <Tabs
            tabs={[
              { id: "closed-loop", label: "Closed-Loop Pallets" },
              { id: "lightweight", label: "Lightweight & Export" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="pills"
          />
        </div>
      </div>

      {/* Benefits 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
        {currentBenefits.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-3.5 rounded-[var(--radius-md,6px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] transition-colors hover:border-[var(--brand-primary)]/40"
          >
            <div className="p-2 rounded-[var(--radius-sm,4px)] bg-[var(--bg-surface)] text-[var(--brand-primary)] shadow-2xs shrink-0 mt-0.5">
              <IconBox icon={item.icon} variant="neutral" size="sm" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] leading-snug pt-0.5">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProductBenefitsGrid;
