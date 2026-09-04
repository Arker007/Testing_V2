export function getImg(p) {
  if (!p) return "/uploads/products/pallets/pallets-1770374237161-67758.webp";
  
  if (p.image) {
    try {
      const parsed = JSON.parse(p.image);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const found = arr
        .map((item) => (typeof item === "object" && item !== null ? item.local || item.url : item))
        .filter(Boolean)[0];
      if (found) return found;
    } catch {
      return p.image;
    }
  }

  if (p.image_url) return p.image_url;
  if (Array.isArray(p.images) && p.images.length > 0) return p.images[0];
  return "/uploads/products/pallets/pallets-1770374237161-67758.webp";
}

function parseLoadFromText(text, label) {
  if (!text) return 0;
  const regex = new RegExp(`${label}[^0-9]*([0-9,]+)\\s*(?:kg|tons|ton|t)?`, "i");
  const match = String(text).match(regex);
  if (match && match[1]) {
    const num = Number(match[1].replace(/,/g, ""));
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

export function getStaticLoadKg(p) {
  if (!p) return 0;
  if (p.static_load_kg) return Number(p.static_load_kg);
  
  let specs = p.specifications || p.specs;
  if (typeof specs === "string") {
    try { specs = JSON.parse(specs); } catch { specs = {}; }
  }
  if (specs) {
    if (specs.static_load_kg) return Number(specs.static_load_kg);
    if (specs["Static Load"]) {
      const val = parseLoadFromText(specs["Static Load"], "");
      if (val > 0) return val;
    }
    if (specs["Static Load Capacity"]) {
      const val = parseLoadFromText(specs["Static Load Capacity"], "");
      if (val > 0) return val;
    }
  }
  if (p.capacity) {
    const val = parseLoadFromText(p.capacity, "Static");
    if (val > 0) return val;
  }
  return 0;
}

export function getDynamicLoadKg(p) {
  if (!p) return 0;
  if (p.dynamic_load_kg) return Number(p.dynamic_load_kg);
  
  let specs = p.specifications || p.specs;
  if (typeof specs === "string") {
    try { specs = JSON.parse(specs); } catch { specs = {}; }
  }
  if (specs) {
    if (specs.dynamic_load_kg) return Number(specs.dynamic_load_kg);
    if (specs["Dynamic Load"]) {
      const val = parseLoadFromText(specs["Dynamic Load"], "");
      if (val > 0) return val;
    }
    if (specs["Dynamic Load Capacity"]) {
      const val = parseLoadFromText(specs["Dynamic Load Capacity"], "");
      if (val > 0) return val;
    }
  }
  if (p.capacity) {
    const val = parseLoadFromText(p.capacity, "Dynamic");
    if (val > 0) return val;
  }
  return 0;
}

export function getRackLoadKg(p) {
  if (!p) return 0;
  if (p.racking_load_kg) return Number(p.racking_load_kg);
  
  let specs = p.specifications || p.specs;
  if (typeof specs === "string") {
    try { specs = JSON.parse(specs); } catch { specs = {}; }
  }
  if (specs) {
    if (specs.racking_load_kg) return Number(specs.racking_load_kg);
    if (specs["Racking Load"]) {
      const val = parseLoadFromText(specs["Racking Load"], "");
      if (val > 0) return val;
    }
    if (specs["Rack Load"]) {
      const val = parseLoadFromText(specs["Rack Load"], "");
      if (val > 0) return val;
    }
  }
  if (p.capacity) {
    const val = parseLoadFromText(p.capacity, "Racking|Rack");
    if (val > 0) return val;
  }
  return 0;
}

export function getDimensionsStr(p) {
  if (!p) return "Standard Size";
  if (p.dimensions) return p.dimensions;
  let specs = p.specifications || p.specs;
  if (typeof specs === "string") {
    try { specs = JSON.parse(specs); } catch { specs = {}; }
  }
  if (specs && specs.Dimensions) return specs.Dimensions;
  if (specs && specs.dimensions) return specs.dimensions;
  if (specs && specs.Size) return specs.Size;
  return "1,030 mm x 1,240 mm";
}

export function getWeightStr(p) {
  if (!p) return "16.8 kg";
  if (p.weight) return String(p.weight).includes("kg") ? String(p.weight) : `${p.weight} kg`;
  let specs = p.specifications || p.specs;
  if (typeof specs === "string") {
    try { specs = JSON.parse(specs); } catch { specs = {}; }
  }
  if (specs) {
    if (specs.Weight) return String(specs.Weight).includes("kg") ? String(specs.Weight) : `${specs.Weight} kg`;
    if (specs.weight) return String(specs.weight).includes("kg") ? String(specs.weight) : `${specs.weight} kg`;
  }
  const sLoad = getStaticLoadKg(p);
  if (sLoad >= 6000) return "18.5 kg";
  if (sLoad >= 4000) return "16.8 kg";
  if (sLoad >= 2000) return "14.2 kg";
  if (sLoad > 0) return "12.5 kg";
  return "16.8 kg";
}

export function getSkuCode(p) {
  if (!p) return "TA-01";
  if (p.sku) return p.sku;
  if (p.model) return p.model;
  if (p.code) return p.code;
  if (p.id) {
    const cleanId = String(p.id).replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleanId.length <= 6) return cleanId;
    return `TA-${cleanId.slice(0, 2)}`;
  }
  return "TA-01";
}

export function getHeadline(p) {
  if (!p) return "";
  if (p.headline) return p.headline;
  if (p.description) return p.description.slice(0, 130) + "...";
  return "High-performance recycled plastic product engineered for industrial durability.";
}
