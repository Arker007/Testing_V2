const dbModule = require("../src/database/database");
const { ensureSpecifications, normalizeSpecifications } = require("../src/modules/products/specification/specificationSeeder");

function parseJSON(value, fallback) {
  try {
    return JSON.parse(value || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

async function backfillSpecifications() {
  await dbModule.initDatabase();
  const { db } = dbModule;

  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
      if (err) {
        console.error("Failed to load products:", err.message);
        return reject(err);
      }

      if (!rows || rows.length === 0) {
        console.log("No products found to backfill.");
        return resolve(0);
      }

      let updatedCount = 0;
      let completed = 0;

      const itemsToUpdate = [];
      rows.forEach((row) => {
        const existing = normalizeSpecifications(parseJSON(row.specifications, {}));
        const seeded = ensureSpecifications(row, existing);

        if (JSON.stringify(existing) !== JSON.stringify(seeded)) {
          itemsToUpdate.push({ id: row.id, specs: JSON.stringify(seeded) });
        }
      });

      if (itemsToUpdate.length === 0) {
        console.log("Specifications backfill verified. All products have valid normalized specifications (0 updates needed).");
        return resolve(0);
      }

      itemsToUpdate.forEach((item) => {
        db.run("UPDATE products SET specifications = ? WHERE id = ?", [item.specs, item.id], (updateErr) => {
          if (updateErr) {
            console.error(`Failed to update product ${item.id}:`, updateErr.message);
          } else {
            updatedCount += 1;
          }
          completed += 1;
          if (completed === itemsToUpdate.length) {
            console.log(`Specifications backfill completed. Updated ${updatedCount} product(s).`);
            resolve(updatedCount);
          }
        });
      });
    });
  });
}

if (require.main === module) {
  backfillSpecifications()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error("Backfill failed:", err);
      process.exit(1);
    });
}

module.exports = {
  backfillSpecifications,
};

