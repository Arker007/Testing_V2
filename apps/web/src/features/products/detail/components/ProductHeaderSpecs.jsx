import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/shared/ui";

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

  const _certBadge =
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

  const _capacityValue = isPallet
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
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; font-variant-numeric: tabular-nums; color: #0f172a; margin: 0; padding: 24px; font-size: 14px; line-height: 22px; }
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
      className="flex flex-col justify-between h-full py-1 space-y-5"
    >
      <div>
        {/* 1. Category Eyebrow */}
        <div className="text-[var(--text-brand)] font-extrabold text-xs tracking-widest uppercase mb-1.5">
          {categoryLabel}
        </div>

        {/* 2. Main Product Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-2">
          {product.name || "Heavy-Duty Rackable Plastic Pallet 1200x1000"}
        </h1>

        {/* 3. Subtitle Tagline */}
        <div className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[var(--text-muted)] uppercase mb-3.5">
          ENGINEERED FOR INDUSTRIAL PERFORMANCE
        </div>

        {/* 4. Product Description */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-2xl">
          {descriptionText}
        </p>

        {/* 5. Three Feature Highlights with Green Outline Icons */}
        <div className="grid grid-cols-3 gap-3 my-5">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-1"
            >
              <div className="w-9 h-9 rounded-[var(--radius-card,8px)] bg-transparent border border-[var(--border-brand)] text-[var(--text-brand)] flex items-center justify-center shrink-0">
                <Icon
                  icon={item.icon}
                  className="w-5 h-5 text-[var(--text-brand)] shrink-0"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs text-[var(--text-primary)] leading-snug truncate">
                  {item.line1}
                </span>
                <span className="font-semibold text-xs text-[var(--text-secondary)] leading-snug truncate">
                  {item.line2}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Size Selector if multiple options */}
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
                  className={`px-3 py-1 rounded-[var(--radius-card,8px)] text-xs font-semibold border transition-all cursor-pointer ${
                    selectedSize === option
                      ? "bg-[var(--brand-soft)] border-[var(--border-brand)] text-[var(--text-brand)] font-bold shadow-xs"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. Two Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-5">
          <Button
            type="button"
            variant="primary"
            onClick={() => setShowInquiry?.(true)}
            className="sm:col-span-7 min-h-[48px] !w-full font-bold text-sm shadow-sm"
            showArrow
          >
            Request a Quote
          </Button>

          <button
            type="button"
            onClick={handleDownloadDatasheet}
            className="sm:col-span-5 min-h-[48px] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] hover:text-[var(--text-brand)] font-bold text-xs sm:text-sm px-4 rounded-[var(--radius-btn,8px)] flex items-center justify-center gap-2 border border-[var(--border-default)] transition-all cursor-pointer shadow-2xs hover:border-[var(--border-brand)]"
          >
            <Icon
              icon="carbon:download"
              className="w-4 h-4 text-[var(--text-brand)] shrink-0"
            />
            <span>Datasheet (PDF)</span>
          </button>
        </div>
      </div>

      {/* 7. Bottom Three Spec Indicators with Vertical Dividers */}
      <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-3 divide-x divide-[var(--border-subtle)]">
        {/* Item 1: MOQ */}
        <div className="flex items-center gap-2.5 px-2 first:pl-0">
          <div className="w-8 h-8 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] text-[var(--text-muted)] flex items-center justify-center shrink-0">
            <Icon icon="carbon:view" className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] truncate">Min. Order (MOQ)</span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">{moqValue}</span>
          </div>
        </div>

        {/* Item 2: Lead Time */}
        <div className="flex items-center gap-2.5 px-3">
          <div className="w-8 h-8 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] text-[var(--text-muted)] flex items-center justify-center shrink-0">
            <Icon icon="carbon:time" className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] truncate">Lead Time</span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">{leadTimeValue}</span>
          </div>
        </div>

        {/* Item 3: Forklift Entry */}
        <div className="flex items-center gap-2.5 px-3">
          <div className="w-8 h-8 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] text-[var(--text-muted)] flex items-center justify-center shrink-0">
            <Icon icon="carbon:delivery" className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] truncate">Forklift Entry</span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">{handlingValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
