import React from "react";
import DOMPurify from "dompurify";
import { Icon } from "@iconify/react";

export default function ProductTabsSection({
  product,
  categoryObj,
  specs,
  hasSpecs,
  features,
  tab,
  setTab,
  tabs,
}) {
  return (
    <section id="product-tabs-section" className="my-12 bg-white dark:bg-surface border border-slate-200 dark:border-subtle rounded-card overflow-hidden shadow-xs">
      {/* Tabs Header Navigation */}
      <div className="flex border-b border-slate-100 dark:border-subtle bg-slate-50 dark:bg-slate-900/40 overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`px-6 py-4.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              tab === t.key
                ? "border-[var(--brand-primary)] text-[var(--brand-primary)] dark:text-emerald-400 bg-white dark:bg-surface"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tabs Content Area */}
      <div className="p-6 sm:p-8">
        {tab === "description" && (
          <div className="space-y-6 animate-fadeIn">
            {product.description ? (
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              />
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm">No description available for this product.</p>
            )}

            {features.length > 0 && (
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-wider mb-4">
                  Key Features & Advantages
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 list-none">
                      <Icon icon="solar:check-circle-linear" className="w-5 h-5 text-[#277D38] dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === "specs" && hasSpecs && (
          <div className="animate-fadeIn">
            <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden">
              {categoryObj && Array.isArray(categoryObj.fields) && categoryObj.fields.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {categoryObj.fields.map((fld) => {
                    const val = specs[fld.name] || specs[fld.name.toLowerCase()];
                    if (!val) return null;
                    return (
                      <div key={fld.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 hover:bg-slate-50/30 dark:hover:bg-slate-900/10">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider sm:w-1/3">{fld.label || fld.name}</span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 sm:w-2/3">{val}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 hover:bg-slate-50/30 dark:hover:bg-slate-900/10">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider sm:w-1/3">{k}</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 sm:w-2/3">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "shipping" && (
          <div className="space-y-6 animate-fadeIn text-slate-600 dark:text-slate-300">
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-wider mb-2">Shipping Information</h3>
              <p className="text-sm leading-relaxed">
                {product.shippingInfo ||
                  "Standard delivery times are between 3-7 business days across Pan-India. Expedited shipping options are available at checkout."}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-wider mb-2">Returns Policy</h3>
              <p className="text-sm leading-relaxed">
                {product.returnPolicy ||
                  "We offer a 7-day hassle-free return window for defective or incorrectly shipped items. Please ensure products are in original packaging and unused condition to qualify for processing."}
              </p>
            </div>
          </div>
        )}

        {tab === "faq" && (
          <div className="space-y-4 animate-fadeIn">
            {product.faqs && product.faqs.length > 0 ? (
              product.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-[#277D38] dark:text-emerald-400 font-mono">Q.</span> {faq.question}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 pl-4 border-l-2 border-slate-200 dark:border-slate-800 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm">No frequently asked questions available for this product.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
