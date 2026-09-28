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

  const cat = String(p.category_name || p.category || p.category_title || "").toLowerCase();
  if (cat.includes("lumber") || cat.includes("profile") || cat.includes("plank") || cat.includes("lu-")) {
    return "90 mm × 90 mm (Custom L)";
  }
  if (cat.includes("bench")) return "1,500 mm × 600 mm × 750 mm";
  if (cat.includes("table")) return "1,800 mm × 900 mm × 760 mm";
  return "1,030 mm × 1,240 mm";
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

export function simplifyFeature(text) {
  if (!text || typeof text !== "string") return text || "";
  const t = text.trim().toLowerCase();

  // 1. Export & Pallet specific features
  if (t.includes("ispm-15") || t.includes("ispm15") || t.includes("export ready") || t.includes("fumigation")) {
    return "Export Ready";
  }
  if (t.includes("warehouse rack safe") || t.includes("racking reinforcement")) {
    return "Rack Safe";
  }
  if (t.includes("anti-slip rubber grips") || t.includes("grommets") || t.includes("anti-slip surface")) {
    return "Anti-Slip";
  }
  if (t.includes("washable & chemical safe") || t.includes("washable & chemical resistant") || t.includes("easily pressure washed")) {
    return "Chemical Safe";
  }
  if (t.includes("european epal") || t.includes("conforms to standard european")) {
    return "Euro EPAL Size";
  }
  if (t.includes("nestable / stackable") || t.includes("stackable design")) {
    return "Stackable";
  }
  if (t.includes("no nails or splinters") || t.includes("zero splinters") || t.includes("safe barefoot walking")) {
    return "Splinter-Free";
  }
  if (t.includes("100% recyclable")) {
    return "100% Recyclable";
  }
  if (t.includes("square footprint") || t.includes("standard barrels") || t.includes("fits 4 standard")) {
    return "Fits 4 Drums";
  }
  if (t.includes("conveyor-friendly") || t.includes("conveyor safe")) {
    return "Conveyor Safe";
  }
  if (t.includes("acid & alkali") || t.includes("chemical proof") || t.includes("resistant to chlorine")) {
    return "Chemical Proof";
  }
  if (t.includes("uv stability") || t.includes("uv stabilized") || t.includes("high uv stability")) {
    return "UV Resistant";
  }
  if (t.includes("dual identical decking") || t.includes("reversible")) {
    return "Reversible";
  }
  if (t.includes("highest static capacity") || t.includes("extreme point loads") || t.includes("heavy weight capacity")) {
    return "Heavy Duty";
  }
  if (t.includes("forklift")) {
    return "Forklift Safe";
  }
  if (t.includes("10 years") || t.includes("10+ years")) {
    return "10+ Yr Lifespan";
  }
  if (t.includes("50+ year") || t.includes("fifty-plus")) {
    return "50+ Yr Lifespan";
  }

  // 2. Outdoor Furniture / Lumber specific
  if (t.includes("never rot") || t.includes("rot proof") || t.includes("rotting") || t.includes("zero rot")) {
    return "Rot-Proof";
  }
  if (t.includes("termite")) {
    return "Termite-Proof";
  }
  if (t.includes("zero maintenance") || t.includes("no maintenance") || t.includes("never needs painting") || t.includes("zero painting")) {
    return "Maintenance-Free";
  }
  if (t.includes("works with standard carpentry") || t.includes("standard carpentry")) {
    return "Easy to Install";
  }
  if (t.includes("paint-free color") || t.includes("color formulated solid")) {
    return "Solid Color";
  }
  if (t.includes("buried in soil") || t.includes("ground contact")) {
    return "Ground Contact Safe";
  }
  if (t.includes("sea water") || t.includes("marine") || t.includes("salt air")) {
    return "Marine Grade";
  }
  if (t.includes("no chemical leaching") || t.includes("non-toxic")) {
    return "Non-Toxic";
  }
  if (t.includes("graffiti") || t.includes("vandalism")) {
    return "Easy Clean";
  }
  if (t.includes("does not warp") || t.includes("warp-proof")) {
    return "Warp-Proof";
  }
  if (t.includes("chew-resistant") || t.includes("horses & livestock will not chew") || t.includes("crib-proof")) {
    return "Animal Safe";
  }
  if (t.includes("weatherproof") || t.includes("all-weather")) {
    return "Weatherproof";
  }
  if (t.includes("tipping") || t.includes("prevents tipping") || t.includes("anti-theft & tip proof")) {
    return "Tip-Proof";
  }
  if (t.includes("heavyweight") || t.includes("anti-theft")) {
    return "Anti-Theft";
  }
  if (t.includes("draining") || t.includes("self-draining")) {
    return "Self-Draining";
  }
  if (t.includes("rounded ergonomic") || t.includes("ergonomic edges")) {
    return "Ergonomic Edges";
  }
  if (t.includes("circular economy") || t.includes("100% recycled")) {
    return "100% Recycled";
  }
  if (t.includes("food-safe") || t.includes("wipe clean")) {
    return "Food Safe";
  }
  if (t.includes("stain proof") || t.includes("stain-resistant")) {
    return "Stain Proof";
  }
  if (t.includes("will not rust") || t.includes("rustproof") || t.includes("never rusts")) {
    return "Rustproof";
  }
  if (t.includes("leveling glides")) {
    return "Leveling Glides";
  }
  if (t.includes("hospitality grade") || t.includes("commercial grade")) {
    return "Commercial Grade";
  }
  if (t.includes("compact footprint") || t.includes("space saving")) {
    return "Space Saving";
  }
  if (t.includes("wind resistant") || t.includes("resists high wind")) {
    return "Wind Resistant";
  }
  if (t.includes("custom extrusion") || t.includes("custom molding") || t.includes("zero tooling")) {
    return "Custom Sizes";
  }
  if (t.includes("precision manufacturing") || t.includes("high precision")) {
    return "High Precision";
  }

  // Capitalize first letter of each word if not matched
  return text.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

export default {
  getImg,
  getStaticLoadKg,
  getDynamicLoadKg,
  getRackLoadKg,
  getDimensionsStr,
  getWeightStr,
  getSkuCode,
  getHeadline,
  simplifyFeature,
};
