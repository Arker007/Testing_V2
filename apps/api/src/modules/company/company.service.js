/**
 * Company Service
 * Business logic for company information.
 */
const companyRepository = require("./company.repository");
const companyMapper = require("./company.mapper");
const { getCache, setCache, invalidate } = require("../../infrastructure/cache/cache");

const COMPANY_TTL = 300; // 5 minutes

class CompanyService {
  /**
   * Get company info.
   */
  async getCompanyInfo() {
    const cached = getCache("company_info");
    if (cached) {
      return cached;
    }

    const row = await companyRepository.find();
    const result = companyMapper.toDomain(row);
    setCache("company_info", result, COMPANY_TTL);
    return result;
  }

  /**
   * Update company info (merges with existing).
   */
  async updateCompanyInfo(updates) {
    const existingRow = await companyRepository.find();
    const existingData = companyMapper.toDomain(existingRow);
    const newData = { ...existingData, ...(updates || {}) };

    const dataString = companyMapper.toPersistence(newData);
    await companyRepository.upsert(dataString);
    invalidate("company_info");

    return { success: true, company: newData };
  }
}

module.exports = new CompanyService();

