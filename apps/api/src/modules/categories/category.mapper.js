/**
 * Category Mapper
 * Transforms raw database rows to domain entities and vice versa.
 */

// Default fields for categories without custom definitions
const defaultCategoryFields = [
  {
    name: "dimensions",
    label: "Dimensions",
    type: "text",
    placeholder: "e.g., 100 x 50 x 25 cm",
  },
  {
    name: "material",
    label: "Material",
    type: "text",
    placeholder: "e.g., Recycled HDPE",
  },
  { name: "weight", label: "Weight", type: "text", placeholder: "e.g., 5 kg" },
  {
    name: "color",
    label: "Color",
    type: "text",
    placeholder: "e.g., Black, Grey, Brown",
  },
];

/**
 * Maps a raw category database row to a Category domain entity.
 */
function toDomain(row) {
  if (!row) return null;

  let fields = [];
  if (row.fields) {
    try {
      fields = typeof row.fields === "string" ? JSON.parse(row.fields) : row.fields;
    } catch (e) {
      console.error("Error parsing DB fields for category " + row.id, e);
    }
  }

  if (!fields || fields.length === 0) {
    fields = defaultCategoryFields;
  }

  return {
    ...row,
    fields,
  };
}

/**
 * Prepares category parameters for database persistence.
 */
function toPersistence(data) {
  const c = data || {};
  return {
    id: c.id || "cat_" + Date.now(),
    name: c.name ?? null,
    slug: c.slug ?? null,
    description: c.description ?? null,
    image: c.image ?? null,
    fields: JSON.stringify(c.fields || []),
  };
}

module.exports = {
  defaultCategoryFields,
  toDomain,
  toPersistence,
};
