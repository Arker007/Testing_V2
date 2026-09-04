import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { OptimizedImage, Badge } from "@/shared/ui";
import { generateRelatedProductMeta, parseProductImages } from "../utils";

export default function RelatedProductsSection({ relatedProducts }) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Complementary Industrial Products
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Heavy-duty polymer composites and logistics units manufactured at Ankleshwar
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1.5"
        >
          <span>View Full Catalog</span>
          <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((p) => {
          const pImages = parseProductImages(p.image);
          const meta = generateRelatedProductMeta(p);

          return (
            <Link
              to={`/products/${p.id}`}
              key={p.id}
              className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-card,8px)] overflow-hidden shadow-xs hover:shadow-md hover:border-[var(--brand-primary)] transition-all duration-300 decoration-none"
            >
              <div className="relative aspect-4/3 bg-[var(--bg-surface-secondary)] p-4 flex items-center justify-center overflow-hidden border-b border-[var(--border-subtle)]">
                {meta.verified && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="success" size="xs" icon="solar:verified-check-linear">
                      Verified Spec
                    </Badge>
                  </div>
                )}

                <div className="w-full h-full flex items-center justify-center p-2">
                  {pImages[0] ? (
                    <OptimizedImage
                      src={pImages[0]}
                      alt={p.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Icon icon="solar:gallery-linear" className="w-10 h-10 text-[var(--text-muted)]" />
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {p.category || "Industrial Polymer"}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1">
                  {p.name}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {meta.subtitle}
                </p>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--border-subtle)] mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {meta.currentPriceLabel}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {meta.hasNumericPrice ? "Ex-factory Ankleshwar" : "Tiered wholesale"}
                    </span>
                  </div>

                  <span className="p-1.5 rounded-[var(--radius-card,8px)] bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors">
                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
