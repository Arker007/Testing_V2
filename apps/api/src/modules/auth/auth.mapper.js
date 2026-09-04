/**
 * Auth Mapper
 * Transforms user database records to domain/safe DTO objects.
 */

/**
 * Maps a raw user DB row to a safe User domain entity (excluding password).
 */
function toDomain(userRow) {
  if (!userRow) return null;
  return {
    id: userRow.id,
    username: userRow.username,
    role: userRow.role || "admin",
  };
}

module.exports = {
  toDomain,
};
