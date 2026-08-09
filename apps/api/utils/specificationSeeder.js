/**
 * Infer product specifications from product content fields.
 */
function contains(text, patterns) {
  return patterns.some((p) => text.includes(p));
}

function inferMaterial(text) {
  if (contains(text, ["hdpe", "high-density polyethylene"])) return "HDPE";
  if (contains(text, ["pp", "polypropylene"])) return "Polypropylene (PP)";
  if (contains(text, ["lumber", "plastic lumber"])) return "Recycled Polymer Composite";
  if (contains(text, ["pallet"])) return "Recycled Industrial Plastic";
  return "Recycled Industrial Plastic";
}

function inferUseCase(text) {
  if (contains(text, ["pallet", "logistics", "warehouse"])) {
    return "Warehousing & Logistics";
  }
  if (contains(text, ["bench", "outdoor", "furniture"])) {
    return "Outdoor Utility & Public Spaces";
  }
  if (contains(text, ["granule", "extrusion", "molding"])) {
    return "Industrial Processing";
  }
  return "Industrial Applications";
}

function inferProductType(input) {
  const t = (input.type || "").trim();
  if (t) return t;
  const name = (input.name || "").toLowerCase();
  if (name.includes("pallet")) return "Pallet";
  if (name.includes("granule")) return "Granules";
  if (name.includes("bench")) return "Bench";
  if (name.includes("lumber")) return "Lumber";
  return "Industrial Product";
}

function normalizeSpecifications(specs) {
  if (!specs || typeof specs !== "object") return {};
  return Object.fromEntries(
    Object.entries(specs)
      .filter(([k, v]) => k && v !== null && v !== undefined && String(v).trim() !== "")
      .map(([k, v]) => [k, String(v).trim()]),
  );
}

function inferSpecifications(input = {}) {
  const text = [
    input.name,
    input.type,
    input.description,
    input.category,
    input.category_name,
    input.applications,
    input.technical_blurb,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const inferred = {
    "Product Type": inferProductType(input),
    Material: inferMaterial(text),
    "Primary Use": inferUseCase(text),
    MOQ: input.moq || "As per requirement",
    Dispatch: input.dispatch || "3-7 business days",
    Capacity: input.capacity || "Bulk supply available",
    Customization: input.customization || "Size / color / application-based",
  };

  if (input.price) inferred["Price Basis"] = `From INR ${String(input.price)}`;

  return inferred;
}

function ensureSpecifications(input = {}, existingSpecs = {}) {
  const cleanExisting = normalizeSpecifications(existingSpecs);
  if (Object.keys(cleanExisting).length > 0) return cleanExisting;
  return inferSpecifications(input);
}

module.exports = {
  inferSpecifications,
  ensureSpecifications,
  normalizeSpecifications,
};
