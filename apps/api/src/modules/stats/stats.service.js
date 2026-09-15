/**
 * Stats Service
 * Business logic layer for system statistics.
 */
const statsRepository = require("./stats.repository");
const statsMapper = require("./stats.mapper");

class StatsService {
  async getDashboardStats() {
    const [products, categories, media, inquiries] = await Promise.all([
      statsRepository.countProducts(),
      statsRepository.countCategories(),
      statsRepository.countMedia(),
      statsRepository.countInquiries(),
    ]);

    return statsMapper.toDashboardStatsDTO({
      products,
      categories,
      media,
      inquiries,
      recycledTons: 5000,
      clients: 200,
    });
  }
}

module.exports = new StatsService();
