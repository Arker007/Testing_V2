/**
 * Database Seeds Domain Module
 */
const { defaultCategories, defaultProducts, defaultCompany } = require("./dbSeeds");
const { seedDatabase } = require("./seeder");

module.exports = {
  defaultCategories,
  defaultProducts,
  defaultCompany,
  seedDatabase,
};
