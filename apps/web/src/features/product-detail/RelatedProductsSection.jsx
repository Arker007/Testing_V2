import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../shared/components/OptimizedImage";
import styles from "../../pages/ProductDetail.module.css";

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
    currentPriceLabel: hasNumericPrice ? `₹${formatPrice(item.price)}` : "Contact for price",
    colorCount,
    verified: Boolean(item.verified || item.isVerified || item.featured),
  };
}

export default function RelatedProductsSection({ relatedProducts }) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className={styles.relatedSection}>
      <div className={styles.relatedHead}>
        <div>
          <h2 className={styles.relatedTitle}>Similar Products</h2>
          <p className={styles.relatedSub}>Essential picks for your next purchase</p>
        </div>
        <Link to="/products" className={styles.relatedViewAll}>
          View all
        </Link>
      </div>

      <div className={styles.productGrid}>
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
            <Link to={`/products/${p.id}`} key={p.id} className={styles.productCard}>
              <div className={styles.cardFrame}>
                <span className={styles.wishBtn} aria-hidden="true">
                  <Icon icon="solar:heart-linear" className="w-4 h-4 text-slate-500" />
                </span>

                {meta.verified && (
                  <span className={styles.verifiedTag}>
                    Verified <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5 inline ml-0.5" />
                  </span>
                )}

                <div className={styles.cardImg}>
                  {pImages[0] ? (
                    <OptimizedImage src={pImages[0]} alt={p.name} className={styles.cardImage} />
                  ) : (
                    <Icon icon="solar:gallery-linear" className="w-10 h-10 text-slate-400" />
                  )}
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.name}</h3>
                <p className={styles.cardSub}>{meta.subtitle}</p>

                <div className={styles.cardRating}>
                  <div className={styles.ratingStars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon="solar:star-linear"
                        className="w-3.5 h-3.5 inline text-amber-500 mr-0.5"
                      />
                    ))}
                  </div>
                  <span className={styles.ratingCount}>({meta.ratingCount})</span>
                </div>

                <div className={styles.priceBlock}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                    <span className={styles.cardPrice}>{meta.currentPriceLabel}</span>
                    {meta.hasOldPrice && <span className={styles.relatedOldPrice}>{meta.oldPriceLabel}</span>}
                  </div>
                  {meta.hasNumericPrice && <span className={styles.cardTax}>EX GST</span>}
                </div>

                <div className={styles.cardMeta}>{meta.colorCount} colors</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
