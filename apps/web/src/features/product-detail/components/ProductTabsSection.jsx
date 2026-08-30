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
    <section
      id="product-tabs-section"
      className="bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,12px)] overflow-hidden shadow-[var(--shadow-sm)] transition-all duration-200"
    >
      {/* Tabs Header Navigation */}
      <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)]/60 overflow-x-auto scrollbar-none px-4 sm:px-6 gap-2 pt-3">
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              className={`py-3 px-4 sm:px-5 text-xs sm:text-sm font-bold border border-b-0 rounded-t-[var(--radius-md,8px)] relative top-[1px] whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[var(--bg-surface)] border-[var(--brand-primary)] text-[var(--brand-primary)] font-extrabold z-10"
                  : "bg-transparent border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-secondary)]"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tabs Content Area */}
      <div className="p-5 sm:p-7">
        {tab === "description" && (
          <div className="space-y-6">
            {product.description ? (
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-[var(--text-secondary)] text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              />
            ) : (
              <p className="text-[var(--text-muted)] text-sm">No description available for this product.</p>
            )}

            {features.length > 0 && (
              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                  Key Features & Advantages
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0">
                  {features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-[var(--radius-md,6px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] list-none"
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

        {tab === "specs" && hasSpecs && (
          <div className="divide-y divide-[var(--border-subtle)]">
            {categoryObj && Array.isArray(categoryObj.fields) && categoryObj.fields.length > 0 ? (
              categoryObj.fields.map((fld) => {
                const val = specs[fld.name] || specs[fld.name.toLowerCase()];
                if (!val) return null;
                return (
                  <div
                    key={fld.name}
                    className="py-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-[var(--bg-surface-secondary)]/50 transition-colors rounded-[var(--radius-sm,4px)]"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] sm:w-1/3">
                      {fld.label || fld.name}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] sm:w-2/3">
                      {val}
                    </span>
                  </div>
                );
              })
            ) : (
              Object.entries(specs).map(([k, v]) => (
                <div
                  key={k}
                  className="py-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-[var(--bg-surface-secondary)]/50 transition-colors rounded-[var(--radius-sm,4px)]"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] sm:w-1/3">
                    {k}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] sm:w-2/3">
                    {v}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "shipping" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--text-secondary)]">
            <div className="p-4 rounded-[var(--radius-card,12px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                <Icon icon="solar:delivery-linear" className="w-5 h-5 text-[var(--brand-primary)]" />
                <h4>Dispatch & Shipping</h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                {product.shippingInfo ||
                  "Standard manufacturing delivery timeline is 3-7 business days across India. Bulk trailer loads and container deliveries are coordinated directly with our dispatch cell."}
              </p>
            </div>
            <div className="p-4 rounded-[var(--radius-card,12px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                <Icon icon="solar:shield-check-linear" className="w-5 h-5 text-[var(--brand-primary)]" />
                <h4>Quality & Returns</h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                {product.returnPolicy ||
                  "All batches are factory load-tested with batch certification. We offer direct replacements for transit damages or non-conformance within 7 days of delivery receipt."}
              </p>
            </div>
          </div>
        )}

        {tab === "faq" && (
          <div className="space-y-3">
            {product.faqs && product.faqs.length > 0 ? (
              product.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[var(--radius-card,12px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)]"
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
              <p className="text-[var(--text-muted)] text-sm">No frequently asked questions available for this product.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
