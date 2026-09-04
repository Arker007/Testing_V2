const path = require("path");
const sqlite3 = require("sqlite3");
const { ensureSpecifications, normalizeSpecifications } = require("../src/modules/products/specification/specificationSeeder");

const dbPath = path.join(__dirname, "../../../data/vishal_enterprise.db");
const db = new sqlite3.Database(dbPath);

function parseJSON(value, fallback) {
  try {
    return JSON.parse(value || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

db.all("SELECT * FROM products", [], (err, rows) => {
  if (err) {
    console.error("Failed to load products:", err.message);
    db.close();
    process.exit(1);
  }

  const update = db.prepare("UPDATE products SET specifications = ? WHERE id = ?");
  let updatedCount = 0;

  rows.forEach((row) => {
    const existing = normalizeSpecifications(parseJSON(row.specifications, {}));
    const seeded = ensureSpecifications(row, existing);

    if (JSON.stringify(existing) !== JSON.stringify(seeded)) {
      update.run(JSON.stringify(seeded), row.id);
      updatedCount += 1;
    }
  });

  update.finalize(() => {
    console.log(`Specifications backfill completed. Updated ${updatedCount} product(s).`);
    db.close();
  });
});
