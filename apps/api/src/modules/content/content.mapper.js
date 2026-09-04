/**
 * Content Mapper
 * Transforms raw CMS database rows to domain representation and prepares batch statements.
 */

/**
 * Maps raw site_content rows array to key-value content object.
 */
function toDomain(rows = []) {
  const content = {};
  rows.forEach((row) => {
    content[row.key] = {
      value: row.value,
      type: row.type,
      section: row.section,
    };
  });
  return content;
}

/**
 * Prepares batch statement objects for site_content persistence.
 */
function toPersistence(updates = {}) {
  return Object.entries(updates).map(([key, value]) => {
    const section = key.split("_")[0] || "global";
    const type = key.includes("image") ? "image" : "text";
    return {
      sql: `INSERT OR REPLACE INTO site_content (key, value, section, type) VALUES (?, ?, ?, ?)`,
      args: [key, String(value ?? ""), section, type],
    };
  });
}

module.exports = {
  toDomain,
  toPersistence,
};
