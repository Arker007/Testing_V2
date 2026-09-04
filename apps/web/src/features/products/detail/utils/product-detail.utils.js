export function parseProductImages(imageRaw) {
  if (!imageRaw) return [];
  try {
    const parsed = typeof imageRaw === "string" ? JSON.parse(imageRaw) : imageRaw;
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    return arr
      .map((item) => (typeof item === "object" && item !== null ? item.local || item.url : item))
      .filter(Boolean);
  } catch {
    return typeof imageRaw === "string" ? [imageRaw] : [];
  }
}

export function formatDetailPrice(p) {
  if (!p) return null;
  const num = Number(String(p).replace(/[^0-9.-]+/g, ""));
  return isNaN(num) || num === 0 ? p : num.toLocaleString("en-IN");
}

export function stripHtml(html) {
  return html
    ? String(html)
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

export function hashFromString(value) {
  return String(value || "")
    .split("")
    .reduce((acc, ch, index) => (acc + ch.charCodeAt(0) * (index + 1)) % 997, 0);
}

export function generateRelatedProductMeta(item) {
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
        : `₹${formatDetailPrice(computedOldPrice)}`
      : null,
    currentPriceLabel: hasNumericPrice ? `₹${formatDetailPrice(item.price)}` : "Enquire for Quote",
    colorCount,
    verified: Boolean(item.verified || item.isVerified || item.featured),
  };
}

export function buildWhatsAppInquiryUrl(phone = "+919898686379", productName = "Product") {
  const cleanPhone = String(phone).replace(/[^0-9]+/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi, I'm interested in ${productName}`
  )}`;
}

export function buildProductSku(product) {
  if (!product) return "VE-PROD01";
  if (product.sku) return product.sku;
  const safeIdPrefix = String(product.id ?? "").substring(0, 6).toUpperCase() || "PROD01";
  return `VE-${safeIdPrefix}`;
}
