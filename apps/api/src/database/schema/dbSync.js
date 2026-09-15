/**
 * Auto-synchronize Category specification fields with Product keys
 */

async function syncCategoryFields(dbInstance) {
  return new Promise((resolve) => {
    dbInstance.all("SELECT * FROM categories", [], (err, categories) => {
      if (err || !categories) return resolve();
      dbInstance.all("SELECT * FROM products", [], (pErr, products) => {
        if (pErr || !products) return resolve();
        
        let pending = categories.length;
        if (pending === 0) return resolve();

        categories.forEach((cat) => {
          const catProducts = products.filter((p) => p.category === cat.id);
          let existingFields = [];
          try {
            existingFields = cat.fields ? JSON.parse(cat.fields) : [];
          } catch (e) {
            existingFields = [];
          }

          const productKeys = new Set();
          catProducts.forEach((p) => {
            if (p.specifications) {
              try {
                const specs = typeof p.specifications === "string" ? JSON.parse(p.specifications) : p.specifications;
                if (specs && typeof specs === "object") {
                  Object.keys(specs).forEach((k) => productKeys.add(k));
                }
              } catch (e) {}
            }
          });

          let updated = false;
          productKeys.forEach((key) => {
            const exists = existingFields.some((fld) => fld.name === key || fld.label === key);
            if (!exists) {
              const cleanLabel = key.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
              existingFields.push({
                name: key,
                label: cleanLabel,
                type: "text",
                placeholder: `e.g. ${cleanLabel} details`,
              });
              updated = true;
            }
          });

          if (updated || (catProducts.length > 0 && (!cat.fields || cat.fields === "[]"))) {
            const sql = "UPDATE categories SET fields = ? WHERE id = ?";
            dbInstance.run(sql, [JSON.stringify(existingFields), cat.id], function () {
              pending--;
              if (pending === 0) resolve();
            });
          } else {
            pending--;
            if (pending === 0) resolve();
          }
        });
      });
    });
  });
}

module.exports = { syncCategoryFields };
