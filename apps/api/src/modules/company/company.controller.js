/**
 * Company Controller
 * HTTP request/response handling for company info endpoints.
 */
const companyService = require("./company.service");

class CompanyController {
  /**
   * GET /api/company
   */
  async getCompanyInfo(req, res) {
    try {
      const company = await companyService.getCompanyInfo();
      res.setHeader(
        "Cache-Control",
        "public, max-age=300, stale-while-revalidate=3600"
      );
      res.json(company);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/company
   */
  async updateCompanyInfo(req, res) {
    try {
      const result = await companyService.updateCompanyInfo(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CompanyController();
