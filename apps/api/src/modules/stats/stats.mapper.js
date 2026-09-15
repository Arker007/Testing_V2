/**
 * Stats Mapper
 * Transforms raw database counts to dashboard DTOs.
 */
class StatsMapper {
  toDashboardStatsDTO(raw) {
    return {
      products: Number(raw?.products ?? 0),
      categories: Number(raw?.categories ?? 0),
      media: Number(raw?.media ?? 0),
      inquiries: Number(raw?.inquiries ?? 0),
      recycledTons: Number(raw?.recycledTons ?? 5000),
      clients: Number(raw?.clients ?? 200),
    };
  }
}

module.exports = new StatsMapper();
