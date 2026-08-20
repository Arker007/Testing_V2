export function getImg(p) {
  if (!p) return "/uploads/products/pallets/pallets-1770374237161-67758.webp";
  
  if (p.image) {
    try {
      const parsed = JSON.parse(p.image);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const found = arr.map((item) => (typeof item === "object" && item !== null ? item.local || item.url : item)).filter(Boolean)[0];
      if (found) return found;
    } catch {
      return p.image;
    }
  }

  if (p.image_url) return p.image_url;
  if (Array.isArray(p.images) && p.images.length > 0) return p.images[0];
  return "/uploads/products/pallets/pallets-1770374237161-67758.webp";
}

export function getStaticLoadKg(p) {
  if (!p) return 0;
  if (p.static_load_kg) return Number(p.static_load_kg);
  if (p.specs && p.specs.static_load_kg) return Number(p.specs.static_load_kg);
  return 0;
}

export function getDimensionsStr(p) {
  if (!p) return "Standard Size";
  if (p.dimensions) return p.dimensions;
  if (p.specs && p.specs.dimensions) return p.specs.dimensions;
  return "Standard Size";
}

export function getHeadline(p) {
  if (!p) return "";
  if (p.headline) return p.headline;
  if (p.description) return p.description.slice(0, 130) + "...";
  return "High-performance recycled plastic product engineered for industrial durability.";
}
