/**
 * Database Seeder Service
 * Populates initial default records and seeds.
 */
const { defaultCategories, defaultProducts, defaultCompany } = require("./dbSeeds");

async function seedDatabase(client) {
  // Apply table schema column migrations if missing
  const columnMigrations = [
    `ALTER TABLE products ADD COLUMN oldPrice TEXT`,
    `ALTER TABLE products ADD COLUMN discountRate TEXT`,
    `ALTER TABLE products ADD COLUMN published INTEGER DEFAULT 1`,
    `ALTER TABLE products ADD COLUMN faqs TEXT DEFAULT '[]'`,
  ];
  for (const sql of columnMigrations) {
    try {
      await client.execute(sql);
    } catch {
      /* column already exists */
    }
  }

  // Seed default categories
  try {
    const catCheck = await client.execute("SELECT COUNT(*) as count FROM categories");
    const count = Number(catCheck.rows[0]?.[0] ?? catCheck.rows[0]?.count ?? 0);
    if (count === 0) {
      console.log("🌱 Seeding default product categories...");
      for (const cat of defaultCategories) {
        await client.execute({
          sql: "INSERT INTO categories (id, name, slug, description, image, fields) VALUES (?, ?, ?, ?, ?, ?)",
          args: [cat.id, cat.name, cat.slug, cat.description, cat.image, cat.fields],
        });
      }
      console.log("✅ Seeded default categories");
    }
  } catch (seedErr) {
    console.error("⚠️ Category seed error:", seedErr.message);
  }

  // Seed default products
  try {
    const prodCheck = await client.execute("SELECT COUNT(*) as count FROM products");
    const pCount = Number(prodCheck.rows[0]?.[0] ?? prodCheck.rows[0]?.count ?? 0);
    if (pCount === 0) {
      console.log("🌱 Seeding default products...");
      for (const p of defaultProducts) {
        await client.execute({
          sql: `INSERT INTO products (id, name, category, type, description, image, price, moq, capacity, dispatch, customization, technical_blurb, applications, specifications, features, published)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            p.id, p.name, p.category, p.type, p.description, p.image, p.price,
            p.moq, p.capacity, p.dispatch, p.customization, p.technical_blurb,
            p.applications, p.specifications, p.features, p.published,
          ],
        });
      }
      console.log("✅ Seeded default products");
    }
  } catch (prodSeedErr) {
    console.error("⚠️ Product seed error:", prodSeedErr.message);
  }

  // Seed default company info
  try {
    const coCheck = await client.execute("SELECT COUNT(*) as count FROM company_info");
    const coCount = Number(coCheck.rows[0]?.[0] ?? coCheck.rows[0]?.count ?? 0);
    if (coCount === 0) {
      console.log("🌱 Seeding default company info...");
      await client.execute({
        sql: "INSERT INTO company_info (id, data) VALUES (1, ?)",
        args: [JSON.stringify(defaultCompany)],
      });
      console.log("✅ Seeded default company info");
    }
  } catch (coSeedErr) {
    console.error("⚠️ Company info seed error:", coSeedErr.message);
  }
}

module.exports = { seedDatabase };
