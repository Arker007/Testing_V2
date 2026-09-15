/**
 * Stats Validator
 * Validates any parameters or queries for the stats module.
 */
class StatsValidator {
  validateStatsQuery(req, res, next) {
    // Stats currently has no mandatory query params, acts as a passthrough guard
    next();
  }
}

module.exports = new StatsValidator();
