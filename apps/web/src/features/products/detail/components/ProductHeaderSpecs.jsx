import React from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/shared/ui";
import { WhatsAppButton } from "@/shared/ui";
import { DEFAULT_TRUST_INDICATORS } from "../constants";

export default function ProductHeaderSpecs({
  product,
  brand,
  sku,
  currentPrice,
  sizeOptions = [],
  setShowInquiry,
}) {
  const [selectedSize, setSelectedSize] = React.useState(sizeOptions[0] || "");

  // Detect industrial category profile
  const cat = (product.category || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const isPallet = cat.includes("pallet") || name.includes("pallet");
  const isLumber = cat.includes("lumber") || name.includes("lumber") || cat.includes("profile");
  const isBenchOrTable = cat.includes("bench") || cat.includes("table") || name.includes("bench") || name.includes("table");

  // Dynamic engineering metrics matrix (2x2)
  const getMetrics = () => {
    if (isPallet) {
      return [
        {
          icon: "solar:box-minimalistic-linear",
          label: "Min. Order (MOQ)",
          value: product.moq || "50 Units",
        },
        {
          icon: "solar:delivery-linear",
          label: "Lead Time",
          value: product.dispatch || "Ex-stock Ankleshwar",
        },
        {
          icon: "solar:scale-linear",
          label: "Static Load",
          value: product.specs?.["Static Load"] || product.capacity || "5,000 kg",
        },
        {
          icon: "solar:routing-2-linear",
          label: "Forklift Handling",
          value: product.specs?.["Entry"] || "4-Way Entry",
        },
      ];
    }

    if (isLumber) {
      return [
        {
          icon: "solar:box-minimalistic-linear",
          label: "Min. Order (MOQ)",
          value: product.moq || "20 Profiles",
        },
        {
          icon: "solar:delivery-linear",
          label: "Lead Time",
          value: product.dispatch || "3-5 Days",
        },
        {
          icon: "solar:atom-linear",
          label: "Density",
          value: product.specs?.["Density"] || "0.95 g/cm³",
        },
        {
          icon: "solar:wrench-linear",
          label: "Carpentry",
          value: "Saws & Screws like Wood",
        },
      ];
    }

    if (isBenchOrTable) {
      return [
        {
          icon: "solar:box-minimalistic-linear",
          label: "Min. Order (MOQ)",
          value: product.moq || "5 Units",
        },
        {
          icon: "solar:delivery-linear",
          label: "Lead Time",
          value: product.dispatch || "5-7 Days",
        },
        {
          icon: "solar:scale-linear",
          label: "Unit Weight",
          value: product.specs?.["Weight"] || product.capacity || "55 kg (Tip-proof)",
        },
        {
          icon: "solar:shield-check-linear",
          label: "Surface Security",
          value: "Bolt-down Anchored",
        },
      ];
    }

    // Default Industrial Equipment
    return [
      {
        icon: "solar:box-minimalistic-linear",
        label: "Min. Order (MOQ)",
        value: product.moq || "10 Units",
      },
      {
        icon: "solar:delivery-linear",
        label: "Dispatch",
        value: product.dispatch || "Ready Stock",
      },
      {
        icon: "solar:scale-linear",
        label: "Load Rating",
        value: product.capacity || "Heavy Industrial",
      },
      {
        icon: "solar:wrench-linear",
        label: "Custom Cuts",
        value: "Available on Request",
      },
    ];
  };

  const metrics = getMetrics();

  return (
    <div
      id="product-detail-panel"
      className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-card,8px)] p-6 sm:p-8 shadow-xs flex flex-col gap-6"
    >
      {/* 1. Industrial Reference & Regulatory Badges */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral" size="sm" className="font-mono text-[11px] uppercase tracking-wider">
            REF: {sku}
          </Badge>
          {isPallet && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-card,8px)] text-xs font-semibold bg-[var(--success-bg)] text-[var(--color-success)] border border-[var(--success-border)]">
              <Icon icon="solar:shield-check-linear" className="w-3.5 h-3.5 shrink-0" />
              <span>ISPM-15 Exempt</span>
            </span>
          )}
          {isLumber && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-card,8px)] text-xs font-semibold bg-[var(--success-bg)] text-[var(--color-success)] border border-[var(--success-border)]">
              <Icon icon="solar:leaf-linear" className="w-3.5 h-3.5 shrink-0" />
              <span>100% Recycled HDPE</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-card,8px)] text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]">
            <Icon icon="solar:verified-check-linear" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
            <span>ISO 9001:2015</span>
          </span>
        </div>

        <div>
          <span className="text-[11px] font-bold tracking-widest text-[var(--text-muted)] uppercase block">
            {brand}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1 leading-snug">
            {product.name}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {product.technical_blurb ||
            "Heavy-duty industrial polymer composite formulation. Resistant to chemical degradation, moisture absorption, termites, and intense weather variations."}
        </p>
      </div>

      {/* 2. B2B Commercial Rates Card */}
      <div className="p-4 sm:p-5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex flex-col gap-1.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
            Commercial Terms
          </span>
          <span className="text-xs font-bold text-[var(--brand-primary)] flex items-center gap-1">
            <Icon icon="solar:verified-check-linear" className="w-3.5 h-3.5" />
            Direct Factory Pricing
          </span>
        </div>

        {currentPrice && currentPrice !== "0" ? (
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              ₹{currentPrice}
            </span>
            <span className="text-xs font-semibold text-[var(--text-muted)]">
              / unit (Ex-factory Ankleshwar)
            </span>
          </div>
        ) : (
          <div className="flex flex-col pt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Volume Quotation on Request
            </span>
            <span className="text-xs font-medium text-[var(--text-muted)] mt-0.5">
              Wholesale tiered brackets for container, truckload & scheduled plant orders
            </span>
          </div>
        )}
      </div>

      {/* 3. Core Engineering Metric Matrix (2x2 Flat Grid) */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex items-start gap-3"
          >
            <div className="p-2 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] text-[var(--brand-primary)] shadow-2xs shrink-0 border border-[var(--border-subtle)]">
              <Icon icon={item.icon} className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] truncate block mt-0.5">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Footprint Selector (Only rendered if legitimate options exist) */}
      {sizeOptions.length > 0 && (
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Standard Footprint / Sizing
          </span>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((option) => {
              const isSelected = selectedSize === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedSize(option)}
                  className={`px-4 py-2.5 rounded-[var(--radius-card,8px)] text-xs font-bold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] active:scale-95 ${
                    isSelected
                      ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-xs"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--bg-surface-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Procurement Call to Action Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex-1 min-h-[48px] px-6 bg-[var(--brand-primary)] hover:bg-[var(--brand-hover,#226e32)] active:bg-[var(--brand-active,#1d5c2a)] text-white rounded-[var(--radius-card,8px)] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm border-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 active:scale-[0.98]"
            onClick={() => setShowInquiry(true)}
          >
            <span>Request B2B Quotation</span>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
          </button>

          <WhatsAppButton
            label="WhatsApp Desk"
            variant="solid"
            size="lg"
            text={`Hello, I am requesting technical specifications and commercial volume rates for: ${product?.name}`}
            className="flex-1 min-h-[48px] rounded-[var(--radius-card,8px)] text-sm font-bold shadow-xs"
          />
        </div>
      </div>

      {/* Micro Trust Indicators */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
        {DEFAULT_TRUST_INDICATORS.map((indicator, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            <Icon icon={indicator.icon} className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />
            <span className="truncate">{indicator.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
