import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../../shared/components/OptimizedImage";
import Badge from "../../../shared/components/ui/Badge";

function stripHtml(html) {
  return html
    ? html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

function hashFromString(value) {
  return String(value || "")
    .split("")
    .reduce((acc, ch, index) => (acc + ch.charCodeAt(0) * (index + 1)) % 997, 0);
}

function formatPrice(p) {
  if (!p) return null;
  const num = Number(String(p).replace(/[^0-9.-]+/g, ""));
  return isNaN(num) || num === 0 ? p : num.toLocaleString("en-IN");
}

function relatedMeta(item) {
  const plainDescription = stripHtml(item.shortDescription || item.description || "");
  const subtitle =
    plainDescription || item.type || item.category_name || item.category || "Industrial grade product";

  const rawPrice = Number(String(item.price || "").replace(/[^0-9.-]+/g, ""));
  const hasNumericPrice = Number.isFinite(rawPrice) && rawPrice > 0;
  const computedOldPrice =
    item.oldPrice || (hasNumericPrice ? `₹${Math.round(rawPrice * 1.16).toLocaleString("en-IN")}` : null);
  const hasOldPrice = !!computedOldPrice;

  const scoreSeed = hashFromString(item.id || item.name);
  const rating =
    typeof item.rating === "number"
      ? Math.max(3.5, Math.min(5, item.rating))
      : 4 + (scoreSeed % 11) / 10;
  const ratingCount =
    typeof item.ratingCount === "number" ? item.ratingCount : 12 + (scoreSeed % 61);

  const colorCount =
    Number(item.colorCount || item.colorsCount || item.variantsCount || item.variants || 0) ||
    1 + (scoreSeed % 5);

  return {
    subtitle,
    rating,
    ratingCount,
    hasNumericPrice,
    hasOldPrice,
    oldPriceLabel: hasOldPrice
      ? String(computedOldPrice).includes("₹")
        ? String(computedOldPrice)
        : `₹${formatPrice(computedOldPrice)}`
      : null,
    currentPriceLabel: hasNumericPrice ? `₹${formatPrice(item.price)}` : "Enquire for Quote",
    colorCount,
    verified: Boolean(item.verified || item.isVerified || item.featured),
  };
}

export default function RelatedProductsSection({ relatedProducts }) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Similar Products
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Essential industrial picks for your requirements
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1"
        >
          <span>View all</span>
          <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedProducts.map((p) => {
          let pImages = [];
          try {
            const a = JSON.parse(p.image);
            pImages = Array.isArray(a) ? a : [a];
          } catch {
            pImages = p.image ? [p.image] : [];
          }
          const meta = relatedMeta(p);

          return (
            <Link
              to={`/products/${p.id}`}
              key={p.id}
              className="group flex flex-col bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,12px)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--brand-primary)]/50 transition-all duration-300 decoration-none"
            >
              <div className="relative aspect-4/3 bg-[var(--bg-surface-secondary)] p-4 flex items-center justify-center overflow-hidden border-b border-[var(--border-subtle)]">
                {meta.verified && (
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <Badge variant="success" size="xs" icon="solar:verified-check-linear">
                      Verified
                    </Badge>
                  </div>
                )}

                <div className="w-full h-full flex items-center justify-center">
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

              <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                  {meta.subtitle}
                </p>

                <div className="flex items-center gap-1.5 mt-auto pt-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon="solar:star-linear"
                        className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-0.5"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                    ({meta.ratingCount})
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-2 pt-1 border-t border-[var(--border-subtle)] mt-1">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-base sm:text-lg font-extrabold text-[var(--text-primary)]">
                      {meta.currentPriceLabel}
                    </span>
                    {meta.hasOldPrice && (
                      <span className="text-xs text-[var(--text-muted)] line-through">
                        {meta.oldPriceLabel}
                      </span>
                    )}
                  </div>
                  {meta.hasNumericPrice && (
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
                      EX GST
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
