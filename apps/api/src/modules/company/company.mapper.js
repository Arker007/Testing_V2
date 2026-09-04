/**
 * Company Mapper
 * Transforms raw database rows into domain company objects and vice versa.
 */

/**
 * Maps a raw company_info database row to a domain object.
 */
function toDomain(row) {
  if (!row || !row.data) return {};
  try {
    return typeof row.data === "string" ? JSON.parse(row.data) : row.data;
  } catch (e) {
    return {};
  }
}

/**
 * Prepares company info data for persistence.
 */
function toPersistence(data) {
  return JSON.stringify(data || {});
}

module.exports = {
  toDomain,
  toPersistence,
};
