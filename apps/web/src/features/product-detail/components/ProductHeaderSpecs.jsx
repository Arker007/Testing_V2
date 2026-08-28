import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Badge from "../../../shared/components/ui/Badge";
import WhatsAppButton from "../../../shared/components/ui/WhatsAppButton";

export default function ProductHeaderSpecs({
  product,
  categoryName,
  brand,
  sku,
  currentPrice,
  oldPrice,
  discount,
  sizeOptions,
  displaySwatches,
  currentImgIdx,
  setImg,
  waLink,
  setShowInquiry,
  setShowSpecsSheet,
}) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");

  return (
    <div id="product-detail-panel" className="bg-white dark:bg-[#161c24] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
      
      {/* 1. Header Metadata Row */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" size="sm" icon="solar:leaf-linear">
            {categoryName}
          </Badge>
          <Badge variant="sky" size="sm" icon="solar:verified-check-linear">
            Production Ready
          </Badge>
          <Badge variant="neutral" size="sm" className="font-mono">
            SKU: {sku}
          </Badge>
        </div>

        <div>
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">{brand}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 leading-snug">
            {product.name}
          </h1>
        </div>

        {product.technical_blurb ? (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.technical_blurb}
          </p>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            High-durability recycled composite material. Engineered for maximum load-bearing efficiency, environmental sustainability, and rot resistance.
          </p>
        )}
      </div>

      <hr className="border-slate-100 dark:border-slate-800/60" />

      {/* 2. Pricing Section */}
      <div className="flex flex-col gap-1">
        {currentPrice && currentPrice !== "0" ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                ₹{currentPrice}
              </span>
              {oldPrice && (
                <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
                  ₹{oldPrice}
                </span>
              )}
              {discount && (
                <Badge variant="danger" size="xs">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            <span className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">Excl. GST & Delivery</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Enquire for Volume Quote
            </span>
            <span className="text-xs font-semibold text-[#277D38] dark:text-emerald-400">Best wholesale rates guaranteed</span>
          </div>
        )}
      </div>

      <hr className="border-slate-100 dark:border-slate-800/60" />

      {/* 3. Core Specifications Matrix (Clean grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[#277D38] dark:text-emerald-400 border border-slate-100 dark:border-slate-800">
            <Icon icon="solar:box-minimalistic-linear" className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Minimum Order</span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block">{product.moq || "100 Units"}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[#277D38] dark:text-emerald-400 border border-slate-100 dark:border-slate-800">
            <Icon icon="solar:delivery-linear" className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dispatch</span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block">{product.dispatch || "Immediate Available"}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[#277D38] dark:text-emerald-400 border border-slate-100 dark:border-slate-800">
            <Icon icon="solar:wrench-linear" className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customization</span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block">{product.customization || "RFID slots available"}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[#277D38] dark:text-emerald-400 border border-slate-100 dark:border-slate-800">
            <Icon icon="solar:scale-linear" className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Load Capacity</span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 block">{product.capacity || "Static 5T / Dynamic 1.5T"}</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-100 dark:border-slate-800/60" />

      {/* 4. Configuration Option Selectors */}
      <div className="flex flex-col gap-5">
        {/* Sizes */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configuration / Size</span>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedSize(option)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  selectedSize === option
                    ? "bg-[#277D38] border-[#277D38] text-white shadow-2xs"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Swatches */}
        {displaySwatches.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Color Options</span>
            <div className="flex flex-wrap gap-2">
              {displaySwatches.map((swatch, i) => (
                <button
                  key={`${swatch}-${i}`}
                  type="button"
                  onClick={() => setImg(i)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    i === currentImgIdx
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-2xs"
                      : "bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Option {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr className="border-slate-100 dark:border-slate-800/60" />

      {/* 5. Actions Row */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex-1 h-12 bg-[#277D38] hover:bg-[#1E622A] text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-2xs border-0 cursor-pointer"
            onClick={() => setShowInquiry(true)}
          >
            <span>Request Quote</span>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
          </button>

          <WhatsAppButton
            label="WhatsApp Us"
            variant="solid"
            size="lg"
            text={`Hi, I'm interested in ${product?.name || 'this product'}`}
            className="flex-1 h-12 rounded-xl text-sm sm:text-base font-bold shadow-2xs"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowSpecsSheet(true)}
          className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Icon icon="solar:document-text-linear" className="w-4 h-4 text-[#277D38] dark:text-emerald-400" />
          <span>View Technical Sheet</span>
        </button>
      </div>
    </div>
  );
}
