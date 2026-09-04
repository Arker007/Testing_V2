import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Badge, WhatsAppButton } from "@/shared/ui";
import { DEFAULT_SIZE_OPTIONS, DEFAULT_TRUST_INDICATORS } from "../constants";

export default function ProductHeaderSpecs({
  product,
  categoryName: _categoryName,
  brand,
  sku,
  currentPrice,
  oldPrice,
  discount,
  sizeOptions = DEFAULT_SIZE_OPTIONS,
  displaySwatches,
  currentImgIdx,
  setImg,
  setShowInquiry,
  setShowSpecsSheet,
}) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");

  return (
    <div
      id="product-detail-panel"
      className="bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,12px)] p-6 sm:p-7 shadow-[var(--shadow-sm)] flex flex-col gap-5 transition-all duration-200"
    >
      {/* 1. Header Metadata Row */}
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral" size="sm" className="font-mono text-[11px]">
            SKU: {sku}
          </Badge>
        </div>

        <div>
          <span className="text-[11px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
            {brand}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mt-0.5 leading-snug">
            {product.name}
          </h1>
        </div>

        {product.technical_blurb ? (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {product.technical_blurb}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            High-durability recycled composite material. Engineered for maximum load-bearing efficiency, environmental sustainability, and rot resistance.
          </p>
        )}
      </div>

      <hr className="border-[var(--border-subtle)]" />

      {/* 2. Pricing Section */}
      <div className="flex flex-col gap-1">
        {currentPrice && currentPrice !== "0" ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
                ₹{currentPrice}
              </span>
              {oldPrice && (
                <span className="text-base sm:text-lg text-[var(--text-muted)] line-through font-medium">
                  ₹{oldPrice}
                </span>
              )}
              {discount && (
                <Badge variant="danger" size="xs">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            <span className="text-[11px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
              Excl. GST & Freight
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Enquire for Volume Quote
            </span>
            <span className="text-xs font-semibold text-[var(--brand-primary)]">
              Best wholesale rates guaranteed
            </span>
          </div>
        )}
      </div>

      <hr className="border-[var(--border-subtle)]" />

      {/* 3. Core Specifications Matrix (Clean 2x2 grid) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="p-3 rounded-[var(--radius-md,6px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex items-start gap-2.5">
          <div className="p-1.5 rounded-[var(--radius-sm,4px)] bg-[var(--bg-surface)] text-[var(--brand-primary)] shadow-2xs shrink-0">
            <Icon icon="solar:box-minimalistic-linear" className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Min. Order
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] truncate block mt-0.5">
              {product.moq || "100 Units"}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-[var(--radius-md,6px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex items-start gap-2.5">
          <div className="p-1.5 rounded-[var(--radius-sm,4px)] bg-[var(--bg-surface)] text-[var(--brand-primary)] shadow-2xs shrink-0">
            <Icon icon="solar:delivery-linear" className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Dispatch
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] truncate block mt-0.5">
              {product.dispatch || "In Stock"}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-[var(--radius-md,6px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex items-start gap-2.5">
          <div className="p-1.5 rounded-[var(--radius-sm,4px)] bg-[var(--bg-surface)] text-[var(--brand-primary)] shadow-2xs shrink-0">
            <Icon icon="solar:wrench-linear" className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Custom Profile
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] truncate block mt-0.5">
              {product.customization || "Available"}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-[var(--radius-md,6px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex items-start gap-2.5">
          <div className="p-1.5 rounded-[var(--radius-sm,4px)] bg-[var(--bg-surface)] text-[var(--brand-primary)] shadow-2xs shrink-0">
            <Icon icon="solar:scale-linear" className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Load Rating
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] truncate block mt-0.5">
              {product.capacity || "Heavy Duty"}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-[var(--border-subtle)]" />

      {/* 4. Configuration Option Selectors */}
      <div className="flex flex-col gap-4">
        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Configuration / Size
          </span>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((option) => {
              const isSelected = selectedSize === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedSize(option)}
                  className={`px-3.5 py-2 rounded-[var(--radius-btn,8px)] text-xs font-bold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 active:scale-95 ${
                    isSelected
                      ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-[var(--brand-btn-text)] shadow-[var(--shadow-sm)]"
                      : "bg-[var(--bg-surface)] dark:bg-white/5 text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--bg-surface-secondary)]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Swatches */}
        {displaySwatches.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Color Options
            </span>
            <div className="flex flex-wrap gap-2">
              {displaySwatches.map((swatch, i) => {
                const isSelected = i === currentImgIdx;
                return (
                  <button
                    key={`${swatch}-${i}`}
                    type="button"
                    onClick={() => setImg(i)}
                    className={`px-3 py-1.5 rounded-[var(--radius-btn,8px)] text-xs font-bold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 active:scale-95 ${
                      isSelected
                        ? "bg-[var(--navy-900)] dark:bg-white text-white dark:text-slate-950 border-[var(--navy-900)] dark:border-white shadow-2xs"
                        : "bg-[var(--bg-surface)] dark:bg-white/5 text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--bg-surface-secondary)]"
                    }`}
                  >
                    Option {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <hr className="border-[var(--border-subtle)]" />

      {/* 5. Actions Row */}
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            className="flex-1 min-h-[var(--btn-h-lg,48px)] px-[var(--btn-px-lg,1.75rem)] bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] active:bg-[var(--brand-active)] text-[var(--brand-btn-text)] rounded-[var(--radius-btn,8px)] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[var(--shadow-sm)] border-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 active:scale-[0.98]"
            onClick={() => setShowInquiry(true)}
          >
            <span>Request Quote</span>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
          </button>

          <WhatsAppButton
            label="WhatsApp Us"
            variant="solid"
            size="lg"
            text={`Hi, I'm interested in ${product?.name || "this product"}`}
            className="flex-1 min-h-[var(--btn-h-lg,48px)] rounded-[var(--radius-btn,8px)] text-sm font-bold shadow-[var(--shadow-sm)]"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowSpecsSheet(true)}
          className="w-full min-h-[var(--btn-h-md,42px)] px-[var(--btn-px-md,1.375rem)] rounded-[var(--radius-btn,8px)] border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <Icon icon="solar:document-text-linear" className="w-4 h-4 text-[var(--brand-primary)]" />
          <span>View Technical Sheet</span>
        </button>
      </div>

      {/* Micro Trust Indicators */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
        {DEFAULT_TRUST_INDICATORS.map((indicator, idx) => (
          <span key={idx} className="flex items-center gap-1">
            <Icon icon={indicator.icon} className="w-3.5 h-3.5 text-[var(--brand-primary)]" /> {indicator.label}
          </span>
        ))}
      </div>
    </div>
  );
}
