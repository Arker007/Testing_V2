/**
 * Product Mapper
 * Transforms raw database rows to domain entities and vice versa.
 */

/**
 * Maps a raw database row into a structured Product entity.
 */
function toDomain(row) {
  if (!row) return null;
  return {
    ...row,
    specifications: typeof row.specifications === "string"
      ? JSON.parse(row.specifications || "{}")
      : (row.specifications || {}),
    features: typeof row.features === "string"
      ? JSON.parse(row.features || "[]")
      : (row.features || []),
    faqs: typeof row.faqs === "string"
      ? JSON.parse(row.faqs || "[]")
      : (row.faqs || []),
  };
}

/**
 * Prepares product parameters for database persistence.
 */
function toPersistence(data, seededSpecifications) {
  const p = data || {};
  return {
    id: p.id || "prod_" + Date.now(),
    name: p.name ?? null,
    category: p.category ?? null,
    type: p.type ?? null,
    description: p.description ?? null,
    image: p.image ?? null,
    price: p.price ?? null,
    oldPrice: p.oldPrice ?? null,
    discountRate: p.discountRate ?? null,
    moq: p.moq ?? null,
    capacity: p.capacity ?? null,
    dispatch: p.dispatch ?? null,
    customization: p.customization ?? null,
    technical_blurb: p.technical_blurb ?? null,
    applications: p.applications ?? null,
    specifications: JSON.stringify(seededSpecifications ?? p.specifications ?? {}),
    features: JSON.stringify(p.features || []),
    faqs: JSON.stringify(p.faqs || []),
    published: p.published !== undefined ? (p.published ? 1 : 0) : 1,
  };
}

module.exports = {
  toDomain,
  toPersistence,
};
