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
  let w = "";
  if (p.weight) w = String(p.weight);
  let specs = p.specifications || p.specs;
  if (typeof specs === "string") {
    try { specs = JSON.parse(specs); } catch { specs = {}; }
  }
  if (specs) {
    if (specs.Weight) w = String(specs.Weight);
    else if (specs.weight) w = String(specs.weight);
  }

  if (w) {
    let clean = w
      .replace(/kg\/meter/gi, "kg/m")
      .replace(/kg\/metre/gi, "kg/m")
      .replace(/kilograms/gi, "kg")
      .trim();
    return clean.includes("kg") ? clean : `${clean} kg`;
  }

  const cat = String(p.category_name || p.category || "").toLowerCase();
  if (cat.includes("lumber") || cat.includes("profile")) return "4.2 kg/m";
  if (cat.includes("bench")) return "38.5 kg";
  if (cat.includes("table")) return "65.0 kg";

  const sLoad = getStaticLoadKg(p);
  if (sLoad >= 6000) return "18.5 kg";
  if (sLoad >= 4000) return "16.8 kg";
  if (sLoad >= 2000) return "14.2 kg";
  if (sLoad > 0) return "12.5 kg";
  return "16.8 kg";
}

export function getProductCardSpecs(product, propStaticLoad) {
  if (!product) return [];

  let specs = product.specifications || product.specs;
  if (typeof specs === "string") {
    try { specs = JSON.parse(specs); } catch { specs = {}; }
  }
  specs = specs || {};

  const rawCat = String(product.category_name || product.category || product.category_title || "").toLowerCase();
  const isPallet = rawCat.includes("pallet") || rawCat.includes("pl-");
  const isLumber = rawCat.includes("lumber") || rawCat.includes("profile") || rawCat.includes("plank") || rawCat.includes("lu-");
  const isBench = rawCat.includes("bench");
  const isTable = rawCat.includes("table");

  if (isPallet || (!isLumber && !isBench && !isTable && (product.static_load || product.dynamic_load))) {
    const staticVal = propStaticLoad !== undefined && propStaticLoad > 0 ? propStaticLoad : getStaticLoadKg(product);
    const dynamicVal = getDynamicLoadKg(product);
    const rackVal = getRackLoadKg(product);
    const weightVal = getWeightStr(product);

    return [
      {
        label: "Weight",
        value: weightVal,
        icon: "carbon:scale",
        title: "Tare Weight",
      },
      {
        label: "Static",
        value: staticVal > 0 ? `${staticVal.toLocaleString()} kg` : "8,000 kg",
        icon: "carbon:security",
        title: "Static Load Capacity",
      },
      {
        label: "Dynamic",
        value: dynamicVal > 0 ? `${dynamicVal.toLocaleString()} kg` : "1,300 kg",
        icon: "carbon:arrows-horizontal",
        title: "Dynamic Load Capacity",
      },
      {
        label: "Racking",
        value: rackVal > 0 ? `${rackVal.toLocaleString()} kg` : "500 kg",
        icon: "carbon:layers",
        title: "Rack Load Capacity",
      },
    ];
  }

  if (isLumber) {
    const weightVal = getWeightStr(product);
    const stdLength = specs["Standard Length"] || specs.Length || specs.length || "8 - 12 ft";
    const material = specs.Material || "100% HDPE";

    let polymerVal = material.replace(/Composite|Polymer|Recycled/gi, "").trim() || "HDPE";
    if (polymerVal.includes("Polyolefin")) polymerVal = "HDPE / PP";

    return [
      {
        label: "Weight",
        value: weightVal,
        icon: "carbon:scale",
        title: "Weight per Linear Meter",
      },
      {
        label: "Length",
        value: stdLength,
        icon: "carbon:ruler",
        title: "Standard Lengths Available",
      },
      {
        label: "Material",
        value: polymerVal,
        icon: "carbon:recycle",
        title: "Raw Material Polymer",
      },
      {
        label: "Feature",
        value: "Rot Proof",
        icon: "carbon:security",
        title: "100% Weather and Rot Resistance",
      },
    ];
  }

  if (isBench || isTable) {
    const seating = specs["Seating Capacity"] || specs.seating || (isTable ? "6-8 Persons" : "3-4 Persons");
    const weightVal = getWeightStr(product);
    const frame = specs["Frame Material"] || specs.frame || "Heavy Recycled HDPE";

    return [
      {
        label: "Capacity",
        value: seating,
        icon: "carbon:group",
        title: "Seating Capacity",
      },
      {
        label: "Weight",
        value: weightVal,
        icon: "carbon:scale",
        title: "Unit Net Weight",
      },
      {
        label: "Material",
        value: frame.replace("Composite", "").trim() || "HDPE Planks",
        icon: "carbon:recycle",
        title: "Frame & Plank Material",
      },
      {
        label: "Weather",
        value: "UV Shield",
        icon: "carbon:security",
        title: "UV-Resistant All-Weather Plastic",
      },
    ];
  }

  // Default custom/general metrics
  const weightVal = getWeightStr(product);
  return [
    {
      label: "Weight",
      value: weightVal,
      icon: "carbon:scale",
      title: "Product Weight",
    },
    {
      label: "Material",
      value: specs.Material || "Recycled HDPE",
      icon: "carbon:recycle",
      title: "Polymer Composition",
    },
    {
      label: "Profile",
      value: product.type || "Industrial",
      icon: "carbon:box",
      title: "Product Category Profile",
    },
    {
      label: "Grade",
      value: "Commercial",
      icon: "carbon:security",
      title: "Manufacturing Quality Grade",
    },
  ];
}

export function getSkuCode(p) {
  if (!p) return "VE-PL-01";
  if (p.sku) return p.sku;
  if (p.model) return p.model;
  if (p.code) return p.code;
  if (p.id) {
    const idStr = String(p.id);
    if (idStr.includes("-")) {
      const parts = idStr.split("-").filter(Boolean);
      // Determine category prefix
      let catPrefix = "PR";
      const first = parts[0].toLowerCase();
      if (first.includes("pallet")) catPrefix = "PA";
      else if (first.includes("lumber")) catPrefix = "LU";
      else if (first.includes("bench")) catPrefix = "BE";
      else if (first.includes("table")) catPrefix = "TB";
      else if (first.includes("custom") || first.includes("fence")) catPrefix = "CS";
      else catPrefix = first.slice(0, 2).toUpperCase();

      const last = parts[parts.length - 1].toUpperCase();
      return `VE-${catPrefix}-${last}`;
    }
    const cleanId = idStr.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleanId.length <= 6) return `VE-${cleanId}`;
    return `VE-${cleanId.slice(0, 4)}`;
  }
  return "VE-01";
}

export function getHeadline(p) {
  if (!p) return "";
  if (p.headline) return p.headline;
  if (p.description) return p.description.slice(0, 130) + "...";
  return "High-performance recycled plastic product engineered for industrial durability.";
}

export function getProductCardBadge(product) {
  if (product?.badge) return String(product.badge).toUpperCase();
  const title = String(product?.name || product?.title || "").toLowerCase();
  if (title.includes("heavy duty") || title.includes("heavy-duty")) return "HEAVY DUTY";
  if (title.includes("stackable")) return "STACKABLE";
  if (title.includes("hygienic") || title.includes("clean room")) return "HYGIENIC";
  if (title.includes("rackable")) return "RACKABLE";
  if (title.includes("reversible")) return "REVERSIBLE";
  if (title.includes("export") || title.includes("euro")) return "EXPORT GRADE";
  if (title.includes("medium duty") || title.includes("medium-duty")) return "MEDIUM DUTY";
  if (title.includes("light duty") || title.includes("light-duty")) return "LIGHT DUTY";
  if (title.includes("spill") || title.includes("containment")) return "SPILL SAFE";
  if (title.includes("flat") || title.includes("solid")) return "SOLID DECK";
  if (title.includes("perforated") || title.includes("mesh")) return "VENTILATED";

  const rawCat = product?.category_name || product?.category || product?.category_title || product?.type || "";
  if (rawCat) {
    const cleaned = String(rawCat).replace(/[-_]/g, " ").trim();
    if (cleaned.toLowerCase() === "pallets" || cleaned.toLowerCase() === "pallet") return "PLASTIC PALLET";
    if (cleaned.toLowerCase() === "garden bench" || cleaned.toLowerCase() === "benches") return "GARDEN BENCH";
    return cleaned.toUpperCase();
  }
  return "HEAVY DUTY";
}

export function getProductShortDesc(product) {
  if (product?.short_description) return product.short_description;
  if (product?.headline) return product.headline;
  if (product?.description) {
    const plain = product.description.replace(/[#*`_]/g, "").trim();
    const firstSentence = plain.split(/[.!?]\s/)[0];
    if (firstSentence && firstSentence.length <= 85) {
      return firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`;
    }
    return plain.slice(0, 80).trim() + "...";
  }

  const title = String(product?.name || product?.title || "").toLowerCase();
  if (title.includes("heavy duty")) return "High load capacity for demanding industrial use.";
  if (title.includes("stackable")) return "Space-saving design for efficient storage & logistics.";
  if (title.includes("hygienic")) return "Ideal for food, pharma and clean environments.";
  if (title.includes("rackable")) return "Engineered for high-bay warehouse pallet racking.";
  if (title.includes("bench")) return "Durable all-weather outdoor seating made from recycled HDPE.";
  if (title.includes("lumber")) return "Rot-proof, splinter-free structural recycled plastic timber.";
  return "High-performance recycled plastic product engineered for industrial use.";
}

export function getMobileLoadSpec(product, propStaticLoad) {
  const staticVal =
    propStaticLoad !== undefined && propStaticLoad > 0
      ? propStaticLoad
      : getStaticLoadKg(product);

  if (staticVal && staticVal > 0) {
    return `${Number(staticVal).toLocaleString()}+ kg Load`;
  }

  const specs = product?.specifications || product?.specs || {};
  const sLoad =
    specs["Static Load"] ||
    specs["static_load"] ||
    specs["Load Capacity"] ||
    specs["load_capacity"];
  if (sLoad) {
    const num = String(sLoad).replace(/[^0-9]/g, "");
    if (num && Number(num) > 0) {
      return `${Number(num).toLocaleString()}+ kg Load`;
    }
  }

  return "3,000+ kg Load";
}

export function getMobileDimSpec(product, propDimStr) {
  const rawDim =
    propDimStr ||
    getDimensionsStr(product) ||
    product?.dimensions ||
    "1200 × 1000 mm";
  const clean = String(rawDim)
    .replace(/\s*\([Ll]\s*[x×]\s*[Ww]\s*[x×]\s*[Hh]\)/g, "")
    .replace(/\s*[xX]\s*/g, " × ")
    .replace(/\s*\([Cc]ustomizable\)/g, "")
    .trim();

  const match = clean.match(/(\d+)\s*×\s*(\d+)(?:\s*×\s*\d+)?\s*(mm)?/i);
  if (match) {
    return `${match[1]} × ${match[2]} mm`;
  }

  return clean || "1200 × 1000 mm";
}

