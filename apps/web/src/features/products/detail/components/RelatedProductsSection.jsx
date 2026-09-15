import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ProductCard } from "@/shared/ui";

export default function RelatedProductsSection({ relatedProducts }) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Related Products
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Heavy-duty plastic pallets and storage products made at our factory
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1.5"
        >
          <span>View Full Catalog</span>
          <Icon icon="carbon:arrow-right" className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((p, idx) => (
          <ProductCard
            key={p.id}
            product={p}
            variant="compact"
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
