/**
 * Media Mapper
 * Transforms raw database rows into domain objects for media and certifications.
 */

/**
 * Maps raw media database row to domain entity.
 */
function toMediaDomain(row) {
  if (!row) return null;
  return {
    id: row.id,
    filename: row.filename,
    url: row.url,
    created_at: row.created_at,
  };
}

/**
 * Maps raw certification database row to domain entity.
 */
function toCertificationDomain(row) {
  if (!row) return null;
  return {
    ...row,
  };
}

/**
 * Prepares media parameters for persistence.
 */
function toMediaPersistence(data = {}) {
  return {
    filename: data.filename ?? null,
    url: data.url ?? null,
  };
}

module.exports = {
  toMediaDomain,
  toCertificationDomain,
  toMediaPersistence,
};
