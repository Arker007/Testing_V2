export const pad = (num, size) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

export const getProductImage = (product) => {
  if (!product?.image) return null;
  try {
    const parsed = JSON.parse(product.image);
    return Array.isArray(parsed) && parsed[0] ? parsed[0] : null;
  } catch {
    return product.image || null;
  }
};

export const getSpecs = (product) => {
  if (!product?.specifications) return {};
  try {
    return typeof product.specifications === "string"
      ? JSON.parse(product.specifications)
      : product.specifications;
  } catch {
    return {};
  }
};

export const getDynamicColors = (product) => {
  const name = (product.name || "").toLowerCase();
  const colors = [];
  if (name.includes("blue") || name.includes("euro")) colors.push("var(--navy)");
  if (name.includes("yellow") || name.includes("spill")) colors.push("var(--color-warning)");
  if (name.includes("red") || name.includes("dairy")) colors.push("var(--color-error)");
  if (name.includes("green")) colors.push("var(--color-success)");
  if (name.includes("hygienic")) {
    colors.push("var(--gray-700)");
    colors.push("var(--gray-400)");
  }
  if (name.includes("nestable")) {
    colors.push("var(--navy)");
    colors.push("var(--gray-400)");
  }
  // Fallback dots
  if (colors.length === 0) {
    if (product.categoryName?.toLowerCase().includes("pallet")) {
      colors.push("var(--gray-700)");
    } else if (product.categoryName?.toLowerCase().includes("lumber")) {
      colors.push("var(--color-warning)");
      colors.push("var(--gray-700)");
    } else {
      colors.push("var(--gray-400)");
    }
  }
  return colors;
};
