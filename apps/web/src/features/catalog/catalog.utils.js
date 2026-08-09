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
  if (name.includes("blue") || name.includes("euro")) colors.push("#0066cc");
  if (name.includes("yellow") || name.includes("spill")) colors.push("#f5b21f");
  if (name.includes("red") || name.includes("dairy")) colors.push("#cc3333");
  if (name.includes("green")) colors.push("#1f8b4c");
  if (name.includes("hygienic")) {
    colors.push("#333");
    colors.push("#aaa");
  }
  if (name.includes("nestable")) {
    colors.push("#0066cc");
    colors.push("#aaa");
  }
  // Fallback dots
  if (colors.length === 0) {
    if (product.categoryName?.toLowerCase().includes("pallet")) {
      colors.push("#333");
    } else if (product.categoryName?.toLowerCase().includes("lumber")) {
      colors.push("#a88f70");
      colors.push("#333");
    } else {
      colors.push("#aaa");
    }
  }
  return colors;
};
