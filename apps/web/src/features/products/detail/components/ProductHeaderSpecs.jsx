import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function ProductHeaderSpecs({
  product = {},
  sku = "",
  sizeOptions = [],
  setShowInquiry,
}) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");

  // Detect industrial category profile
  const cat = (product.category || product.category_name || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const isPallet = cat.includes("pallet") || name.includes("pallet") || (!cat && !name);
  const isLumber = cat.includes("lumber") || name.includes("lumber") || cat.includes("profile");

  // Dynamic values matching the engineering structure
  const categoryLabel = (
    product.category_name ||
    product.category ||
    (isPallet ? "Plastic Pallets" : isLumber ? "Plastic Lumber" : "Industrial Plastics")
  ).toUpperCase();

  const itemCode =
    sku ||
    product.sku ||
    product.item_code ||
    product.code ||
    (isPallet ? "VE-PALLET" : isLumber ? "VE-LUMBER" : "VE-PROD");

  const certBadge =
    product.certification ||
    product.specs?.["Certification"] ||
    product.specs?.["Phytosanitary Certification"] ||
    (isPallet ? "ISPM-15 Exempt" : isLumber ? "Zero Chemical Treatment" : "ISO Compliant");

  const descriptionText =
    product.description ||
    product.technical_blurb ||
    (isPallet
      ? "Engineered for high-bay warehouse racking and automated AS/RS systems. Built with 3 steel-reinforced runners and anti-skid rubber grommets for maximum safety."
      : isLumber
      ? "Engineered composite recycled plastic profiles for extreme outdoor, marine, and industrial structural installations. 100% waterproof and maintenance-free."
      : "Engineered high-density recycled polymer solution designed for superior durability, heavy-duty load handling, and environmental resistance.");

  const moqValue =
    product.moq || (isPallet ? "50 Units" : isLumber ? "20 Profiles" : "10 Units");
  const leadTimeValue = product.dispatch || "Ready Stock Dispatch";

  const staticLoad = product.static_load || product.specs?.["Static Load"] || product.capacity || "5,000 kg";
  const dynamicLoad = product.dynamic_load || product.specs?.["Dynamic Load"] || "1,500 kg";
  const rackLoad = product.racking_load || product.specs?.["Racking Load"] || "1,000 kg";

  const capacityValue = isPallet
    ? `Static ${staticLoad.includes("kg") ? staticLoad : `${staticLoad} kg`} | Dynamic ${dynamicLoad.includes("kg") ? dynamicLoad : `${dynamicLoad} kg`} | Racking ${rackLoad.includes("kg") ? rackLoad : `${rackLoad} kg`}`
    : product.capacity || product.specs?.["Capacity"] || "Heavy Industrial Load Rating";

  const handlingValue =
    product.handling ||
    product.specs?.["Forklift Handling"] ||
    product.specs?.["Entry"] ||
    (isPallet ? "4-way Entry" : isLumber ? "Standard Saw & Drill Tools" : "Standard Handling");

  const highlights = [
    {
      icon: "carbon:box",
      line1: isPallet ? "High Load" : isLumber ? "High Impact" : "Heavy Duty",
      line2: isPallet ? "Capacity" : isLumber ? "Strength" : "Performance",
    },
    {
      icon: "carbon:security",
      line1: "Durable &",
      line2: "Long Lasting",
    },
    {
      icon: "carbon:renew",
      line1: "Sustainable",
      line2: "& Recycled",
    },
  ];

  const handleDownloadDatasheet = () => {
    try {
      // Create or reuse a hidden iframe for seamless, popup-blocker-proof printing
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

      const specEntries = Object.entries(product.specs || {});
      const specRowsHtml =
        specEntries.length > 0
          ? specEntries
              .map(
                ([k, v]) =>
                  `<tr><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155; width: 40%;">${k}</td><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${v}</td></tr>`
              )
              .join("")
          : `
            <tr><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Static Load Rating</td><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${staticLoad}</td></tr>
            <tr><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Dynamic Load Rating</td><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${dynamicLoad}</td></tr>
            <tr><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Racking Load Rating</td><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${rackLoad}</td></tr>
            <tr><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Material Composition</td><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">100% Recycled HDPE / PP Blend</td></tr>
            <tr><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Phytosanitary Certification</td><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">ISPM-15 Exempt (No Fumigation Required)</td></tr>
          `;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>Technical Datasheet - ${product.name || "Product"}</title>
            <style>
              @page { size: A4; margin: 18mm; }
              body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 24px; }
              .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #16532d; padding-bottom: 16px; margin-bottom: 20px; }
              .brand { font-size: 20px; font-weight: 800; color: #16532d; letter-spacing: -0.5px; }
              .sub { font-size: 11px; color: #64748b; margin-top: 3px; }
              .doc-type { font-size: 13px; font-weight: 700; color: #16532d; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; }
              .product-title { font-size: 22px; font-weight: 800; margin: 0 0 8px 0; color: #0f172a; }
              .category { font-size: 12px; font-weight: 700; color: #16532d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
              .desc { font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 20px; }
              .highlights { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 20px; }
              .highlight-item strong { display: block; font-size: 13px; color: #16532d; }
              .highlight-item span { font-size: 11px; color: #64748b; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
              th { background: #f1f5f9; padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #475569; border-bottom: 2px solid #cbd5e1; }
              .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; border-top: 2px solid #e2e8f0; padding-top: 16px; margin-bottom: 28px; }
              .meta-item label { display: block; font-size: 11px; color: #64748b; text-transform: uppercase; margin-bottom: 4px; font-weight: 600; }
              .meta-item span { font-size: 14px; font-weight: 700; color: #0f172a; }
              .footer { border-top: 1px solid #e2e8f0; padding-top: 14px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="brand">VISHAL ENTERPRISE</div>
                <div class="sub">Industrial Recycled Plastic Manufacturing & Fabrication</div>
                <div class="sub">GIDC Industrial Estate, Ankleshwar, Gujarat, India</div>
              </div>
              <div class="doc-type">
                Technical Datasheet<br>
                <span style="font-size: 11px; color: #64748b; font-weight: normal;">REF: ${itemCode}</span>
              </div>
            </div>

            <div class="category">${categoryLabel}</div>
            <h1 class="product-title">${product.name || "Industrial Product"}</h1>
            <p class="desc">${descriptionText}</p>

            <div class="highlights">
              <div class="highlight-item">
                <strong>High Load Capacity</strong>
                <span>Tested for heavy industrial duty</span>
              </div>
              <div class="highlight-item">
                <strong>Durable & Long Lasting</strong>
                <span>Impact, weather & chemical resistant</span>
              </div>
              <div class="highlight-item">
                <strong>Sustainable & Recycled</strong>
                <span>100% Eco-friendly circular polymer</span>
              </div>
            </div>

            <h3 style="font-size: 14px; margin-bottom: 10px; color: #0f172a;">Engineering & Material Specifications</h3>
            <table>
              <thead>
                <tr><th>Parameter</th><th>Specification Rating</th></tr>
              </thead>
              <tbody>
                ${specRowsHtml}
              </tbody>
            </table>

            <div class="meta-grid">
              <div class="meta-item">
                <label>Min. Order (MOQ)</label>
                <span>${moqValue}</span>
              </div>
              <div class="meta-item">
                <label>Lead Time</label>
                <span>${leadTimeValue}</span>
              </div>
              <div class="meta-item">
                <label>Handling / Entry</label>
                <span>${handlingValue}</span>
              </div>
            </div>

            <div class="footer">
              <div>Vishal Enterprise · www.vishalplastic.com · sales@vishalplastic.com</div>
              <div>Official B2B Engineering Specification Sheet</div>
            </div>
          </body>
        </html>
      `;

      const frameDoc = printFrame.contentWindow || printFrame.contentDocument;
      const doc = frameDoc.document || frameDoc;
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        try {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
        } catch {
          setShowInquiry?.(true);
        }
      }, 250);
    } catch {
      setShowInquiry?.(true);
    }
  };

  return (
    <div
      id="product-detail-panel"
      className="flex flex-col h-full py-1"
    >
      {/* 1. Category Eyebrow */}
      <div className="text-[var(--brand-primary)] dark:text-emerald-400 font-bold text-xs tracking-wider uppercase mb-1">
        {categoryLabel}
      </div>

      {/* 2. Main Product Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[var(--text-primary)] leading-[1.2] tracking-tight mb-2">
        {product.name || "Heavy-Duty Rackable Plastic Pallet 1200x1000"}
      </h1>

      {/* 3. Item Code & Certification Meta Line */}
      <div className="flex items-center flex-wrap gap-2 text-xs text-[var(--text-muted)] font-medium mb-3.5">
        <span>Item: {itemCode}</span>
        <span className="text-[var(--border-default)]">|</span>
        <span className="inline-flex items-center gap-1 text-[var(--brand-primary)] dark:text-emerald-400 font-semibold">
          <Icon icon="carbon:checkmark-filled" className="w-3.5 h-3.5" />
          <span>{certBadge}</span>
        </span>
      </div>

      {/* 4. Product Description */}
      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-2xl">
        {descriptionText}
      </p>

      {/* 5. Three Feature Highlights with Card Grouping */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 my-2">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 sm:p-2.5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] transition-colors hover:border-[var(--border-default)]"
          >
            <Icon
              icon={item.icon}
              className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--brand-primary)] dark:text-emerald-400 shrink-0 stroke-[1.5]"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[11px] sm:text-xs text-[var(--text-primary)] leading-tight truncate">
                {item.line1}
              </span>
              <span className="font-semibold text-[10px] sm:text-[11px] text-[var(--text-secondary)] leading-tight truncate">
                {item.line2}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Size Selector if multiple sizes exist */}
      {sizeOptions?.length > 1 && (
        <div className="flex items-center gap-2.5 my-3 pt-1">
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Size:
          </span>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedSize(option)}
                className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  selectedSize === option
                    ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--border-strong)]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Two Action Buttons with High-Conversion Visual Hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-4">
        <button
          type="button"
          onClick={() => setShowInquiry?.(true)}
          className="sm:col-span-7 min-h-[46px] bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] active:scale-[0.99] text-white font-bold text-sm sm:text-base px-5 rounded-[var(--radius-btn,8px)] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <span>Request a Quote</span>
          <Icon icon="carbon:arrow-right" className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleDownloadDatasheet}
          className="sm:col-span-5 min-h-[46px] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] active:scale-[0.99] text-[var(--text-primary)] hover:text-[var(--brand-primary)] font-bold text-xs sm:text-sm px-4 rounded-[var(--radius-btn,8px)] flex items-center justify-center gap-1.5 border border-[var(--border-default)] transition-all cursor-pointer shadow-2xs hover:border-[var(--brand-primary)]"
        >
          <Icon
            icon="carbon:download"
            className="w-4 h-4 text-[var(--brand-primary)] dark:text-emerald-400 shrink-0"
          />
          <span>Datasheet (PDF)</span>
        </button>
      </div>

      {/* 7. Four Specifications Rows with Clean Dividers */}
      <div className="border-t border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)] mt-1">
        {/* Row 1: Min Order (MOQ) */}
        <div className="flex items-center justify-between py-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
            <Icon icon="carbon:box" className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            <span>Min. Order (MOQ)</span>
          </div>
          <span className="font-bold text-[var(--text-primary)] text-right">
            {moqValue}
          </span>
        </div>

        {/* Row 2: Lead Time */}
        <div className="flex items-center justify-between py-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
            <Icon icon="carbon:time" className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            <span>Lead Time</span>
          </div>
          <span className="font-bold text-[var(--text-primary)] text-right">
            {leadTimeValue}
          </span>
        </div>

        {/* Row 3: Load Capacity */}
        <div className="flex items-center justify-between py-2.5 text-xs sm:text-sm gap-2">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium shrink-0">
            <Icon icon="carbon:chart-line" className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            <span>Load Capacity</span>
          </div>
          <span className="font-medium text-[var(--text-primary)] text-right text-[11px] sm:text-xs md:text-sm">
            {capacityValue}
          </span>
        </div>

        {/* Row 4: Forklift Handling */}
        <div className="flex items-center justify-between py-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
            <Icon icon="carbon:delivery" className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            <span>Forklift Handling</span>
          </div>
          <span className="font-bold text-[var(--text-primary)] text-right">
            {handlingValue}
          </span>
        </div>
      </div>
    </div>
  );
}
