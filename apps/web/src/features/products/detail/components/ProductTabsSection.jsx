import React from "react";
import DOMPurify from "dompurify";
import { Icon } from "@iconify/react";

export default function ProductTabsSection({
  product,
  categoryObj,
  specs = {},
  hasSpecs,
  features = [],
  tab,
  setTab,
  tabs = [],
}) {
  const cat = (product.category || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const isPallet = cat.includes("pallet") || name.includes("pallet");
  const isLumber = cat.includes("lumber") || name.includes("lumber") || cat.includes("profile");
  const isBenchOrTable = cat.includes("bench") || cat.includes("table") || name.includes("bench") || name.includes("table");

  // Format parameter key for clean display
  const formatParamKey = (k) => {
    return k
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim();
  };

  return (
    <section
      id="product-tabs-section"
      className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-card,8px)] overflow-hidden shadow-xs transition-all duration-200"
    >
      {/* 1. Industrial Tab Header Navigation */}
      <div className="flex border-b border-[var(--border-default)] bg-[var(--bg-surface-secondary)] overflow-x-auto scrollbar-none px-4 sm:px-8 gap-6 sm:gap-8">
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              className={`py-3.5 sm:py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer -mb-px focus-visible:outline-none ${
                isActive
                  ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 2. Tab Panels */}
      <div className="p-6 sm:p-8 lg:p-10">
        {/* TAB 1: TECHNICAL SPECIFICATIONS (High-Density Engineering Table) */}
        {tab === "specs" && hasSpecs && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Certified Technical Data Sheet
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Dimensional tolerances: ±2mm. Tested in accordance with ASTM & ISO standards.
                </p>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] self-start sm:self-auto">
                REF: {product.sku || product.id?.slice(0, 8)}
              </span>
            </div>

            {/* Structured Engineering Table */}
            <div className="border border-[var(--border-default)] rounded-[var(--radius-card,8px)] overflow-hidden">
              <div className="grid grid-cols-12 bg-[var(--bg-surface-secondary)] py-3 px-4 border-b border-[var(--border-default)] text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                <div className="col-span-5 sm:col-span-4">Parameter</div>
                <div className="col-span-7 sm:col-span-8">Certified Specification</div>
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {categoryObj && Array.isArray(categoryObj.fields) && categoryObj.fields.length > 0 ? (
                  categoryObj.fields.map((fld, idx) => {
                    const val = specs[fld.name] || specs[fld.name.toLowerCase()];
                    if (!val) return null;
                    return (
                      <div
                        key={fld.name}
                        className={`grid grid-cols-12 items-center py-3.5 px-4 transition-colors ${
                          idx % 2 === 0 ? "bg-[var(--bg-surface)]" : "bg-[var(--bg-surface-secondary)]/50"
                        }`}
                      >
                        <span className="col-span-5 sm:col-span-4 text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
                          {fld.label || formatParamKey(fld.name)}
                        </span>
                        <span className="col-span-7 sm:col-span-8 text-xs sm:text-sm font-bold text-[var(--text-primary)] font-mono">
                          {val}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  Object.entries(specs).map(([k, v], idx) => (
                    <div
                      key={k}
                      className={`grid grid-cols-12 items-center py-3.5 px-4 transition-colors ${
                        idx % 2 === 0 ? "bg-[var(--bg-surface)]" : "bg-[var(--bg-surface-secondary)]/50"
                      }`}
                    >
                      <span className="col-span-5 sm:col-span-4 text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
                        {formatParamKey(k)}
                      </span>
                      <span className="col-span-7 sm:col-span-8 text-xs sm:text-sm font-bold text-[var(--text-primary)] font-mono">
                        {v}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Engineering Standard Notes Strip */}
            <div className="p-4 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex items-start gap-3">
              <Icon icon="solar:info-circle-linear" className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isPallet && (
                  <>Operating temperature range: <strong className="text-[var(--text-primary)]">-30°C to +60°C</strong>. Fully compliant with high-density AS/RS automated racking, cold storage blast freezers, and maritime container stuffing.</>
                )}
                {isLumber && (
                  <>Formulation rating: <strong className="text-[var(--text-primary)]">Zero water absorption (0.00%)</strong>. Resistant to ground moisture, fungal rot, marine borers, and severe outdoor UV weathering without chemical sealants.</>
                )}
                {isBenchOrTable && (
                  <>Vandalism & weather resistance: <strong className="text-[var(--text-primary)]">All-weather composite</strong>. Resists graffiti, fading, splintering, and corrosive salt air; includes pre-drilled bolt-down anchor points.</>
                )}
                {!isPallet && !isLumber && !isBenchOrTable && (
                  <>Operating temperature range: <strong className="text-[var(--text-primary)]">-30°C to +60°C</strong>. Engineered for heavy industrial usage and rigorous chemical exposure environments.</>
                )}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: MATERIAL & ENGINEERING SCIENCE */}
        {tab === "description" && (
          <div className="space-y-8">
            {product.description ? (
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-[var(--text-secondary)] text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              />
            ) : (
              <p className="text-[var(--text-muted)] text-sm">
                Industrial polymer composite engineered from high-density recycled polyethylene (HDPE). Formulated for heavy cyclic loads, structural rigidity, and zero moisture degradation.
              </p>
            )}

            {/* Material Performance Attributes Matrix */}
            <div className="pt-6 border-t border-[var(--border-subtle)]">
              <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                Polymer Formulation & Environmental Immunity
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
                    <Icon icon="solar:shield-check-linear" className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>Chemical & Rot Immunity</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Zero absorption rate (0.00%). Completely impervious to moisture, acids, alkalis, industrial solvents, and fungal growth.
                  </p>
                </div>

                <div className="p-4 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
                    <Icon icon="solar:sun-2-linear" className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>UV Stabilization</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Compounded with carbon black and hindered amine light stabilizers (HALS) to prevent embrittlement under extreme sunlight.
                  </p>
                </div>

                <div className="p-4 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
                    <Icon icon="solar:leaf-linear" className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>Circular Economy</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Diverts post-industrial and post-consumer plastics from landfills. Fully recyclable at end of service life.
                  </p>
                </div>
              </div>
            </div>

            {/* Distinctive Features List */}
            {features.length > 0 && (
              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                  Engineering Attributes
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0">
                  {features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] list-none"
                    >
                      <Icon
                        icon="solar:check-circle-linear"
                        className="w-4.5 h-4.5 text-[var(--brand-primary)] shrink-0 mt-0.5"
                      />
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LOGISTICS & FREIGHT HANDLING */}
        {tab === "shipping" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[var(--text-primary)] font-bold text-sm">
                  <div className="p-1.5 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] text-[var(--brand-primary)]">
                    <Icon icon="solar:delivery-linear" className="w-4 h-4" />
                  </div>
                  <h4>Dispatch & Truckload</h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Dispatches originate from Ankleshwar Industrial Area, Gujarat. We coordinate full truckloads (FTL: 16-ton / 24-ton trailers) and consolidated partial consignments across all Indian industrial corridors.
                </p>
              </div>

              <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[var(--text-primary)] font-bold text-sm">
                  <div className="p-1.5 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] text-[var(--brand-primary)]">
                    <Icon icon="solar:box-minimalistic-linear" className="w-4 h-4" />
                  </div>
                  <h4>Container Stuffing (Export)</h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Export packaging optimized for 20ft FCL (~450 nested units or ~180 rackable units) and 40ft High Cube containers (~1,000 nested or ~420 rackable units) with sea-worthy strapping.
                </p>
              </div>

              <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[var(--text-primary)] font-bold text-sm">
                  <div className="p-1.5 rounded-[var(--radius-card,8px)] bg-[var(--brand-soft)] text-[var(--brand-primary)]">
                    <Icon icon="solar:shield-check-linear" className="w-4 h-4" />
                  </div>
                  <h4>Zero Fumigation Protocol</h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Unlike traditional timber, 100% synthetic recycled polymer products require zero IPPC stamping, heat treatment (HT), or hazardous methyl bromide fumigation for international customs clearance.
                </p>
              </div>
            </div>

            {/* Export & Freight Assistance Strip */}
            <div className="p-4 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-[var(--text-secondary)]">
                <strong>Export Documentation Provided:</strong> Commercial Invoice, Packing List, Certificate of Origin (COO), and Factory Material Test Reports (MTR).
              </span>
              <span className="font-mono font-bold text-[var(--text-primary)] shrink-0">
                Port of Exit: Nhava Sheva / Hazira Port
              </span>
            </div>
          </div>
        )}

        {/* TAB 4: PROCUREMENT FAQS */}
        {tab === "faq" && (
          <div className="space-y-4">
            {product.faqs && product.faqs.length > 0 ? (
              product.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)]"
                >
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-[var(--brand-primary)] font-mono font-black">Q.</span> {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 pl-4 border-l-2 border-[var(--brand-primary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))
            ) : (
              <div className="space-y-3">
                <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] space-y-2">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    Can Vishal Enterprise customize dimensions or weight profiles?
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    Yes. In addition to standard standard sizes (1200x1000, 1200x800, 1100x1100), our Ankleshwar plant manufactures custom composite skids, reinforced runners, and non-standard lumber cross-sections.
                  </p>
                </div>

                <div className="p-5 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] space-y-2">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    How do recycled composite pallets compare to virgin plastic?
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    Our recycled HDPE polymer blends are fortified with impact modifiers and structural cross-ribbing. They deliver comparable flexural modulus and load ratings at significantly lower unit costs while advancing corporate ESG sustainability goals.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
