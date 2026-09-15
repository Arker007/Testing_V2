/**
 * Stats Controller
 * Controller handling /api/stats.
 */
const statsService = require("./stats.service");

class StatsController {
  async getStats(req, res, next) {
    try {
      const stats = await statsService.getDashboardStats();
      res.status(200).json(stats);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StatsController();
