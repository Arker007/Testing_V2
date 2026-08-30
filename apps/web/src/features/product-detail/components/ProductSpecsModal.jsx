import React from "react";
import { Icon } from "@iconify/react";

export const ProductSpecsModal = React.memo(function ProductSpecsModal({
  product,
  specs,
  onClose,
  onRequestSheet,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,12px)] shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)]">
          <div className="flex items-center">
            <span className="text-[10px] font-bold text-[var(--brand-primary)] uppercase tracking-widest bg-[var(--brand-soft)] px-2.5 py-1 rounded-[var(--radius-badge,4px)] border border-[var(--brand-border)]">
              Technical Data Sheet
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-btn,6px)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all cursor-pointer border-0 bg-transparent"
            aria-label="Close modal"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto">
          <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
            {product.name}
          </h2>

          <div className="border border-[var(--border-subtle)] rounded-[var(--radius-md,8px)] divide-y divide-[var(--border-subtle)] overflow-hidden">
            {Object.entries(specs).length > 0 ? (
              Object.entries(specs).map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 gap-1 sm:gap-4 bg-[var(--bg-surface-secondary)]/30 hover:bg-[var(--bg-surface-secondary)] transition-colors">
                  <span className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] sm:w-1/3">{k}</span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] sm:w-2/3">{v}</span>
                </div>
              ))
            ) : (
              <p className="p-6 text-sm text-[var(--text-muted)] m-0 text-center font-medium">
                Detailed specifications are available upon request.
              </p>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 h-11 px-4 rounded-[var(--radius-btn,6px)] border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--bg-surface-secondary)] transition-all cursor-pointer shadow-[var(--shadow-xs)]"
          >
            <Icon icon="solar:printer-linear" className="w-4 h-4" /> Print Specs
          </button>
          <button
            type="button"
            onClick={onRequestSheet}
            className="flex-1 h-11 px-4 rounded-[var(--radius-btn,6px)] border-0 bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-[var(--brand-btn-text,#0f141a)] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[var(--shadow-sm)]"
          >
            Request Official Sheet
          </button>
        </div>
      </div>
    </div>
  );
});
