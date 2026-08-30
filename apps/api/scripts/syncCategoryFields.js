const dbModule = require("../src/shared/database/database");

function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function run() {
  console.log("🚀 Starting Category Specifications Synchronization...");
  await dbModule.initDatabase();
  
  const { db } = dbModule;
  
  db.all("SELECT * FROM categories", [], (err, categories) => {
    if (err) {
      console.error("Error fetching categories:", err);
      process.exit(1);
    }
    
    db.all("SELECT * FROM products", [], (pErr, products) => {
      if (pErr) {
        console.error("Error fetching products:", pErr);
        process.exit(1);
      }
      
      console.log(`Loaded ${categories.length} categories and ${products.length} products.`);
      
      let processed = 0;
      
      categories.forEach(cat => {
        // Find products in this category
        const catProducts = products.filter(p => p.category === cat.id);
        
        let existingFields = [];
        try {
          existingFields = cat.fields ? JSON.parse(cat.fields) : [];
        } catch (e) {
          existingFields = [];
        }
        
        // Find all unique keys from products in this category
        const productKeys = new Set();
        catProducts.forEach(p => {
          if (p.specifications) {
            try {
              const specs = typeof p.specifications === "string" ? JSON.parse(p.specifications) : p.specifications;
              if (specs && typeof specs === "object") {
                Object.keys(specs).forEach(k => productKeys.add(k));
              }
            } catch (e) {
              console.error(`Error parsing specifications for product ${p.id}:`, e);
            }
          }
        });
        
        // Merge keys into existingFields
        let updated = false;
        productKeys.forEach(key => {
          // Check if key already exists in category fields
          const exists = existingFields.some(fld => fld.name === key || fld.label === key);
          if (!exists) {
            existingFields.push({
              name: key,
              label: capitalize(key.replace(/[-_]/g, " ")),
              type: "text",
              placeholder: `e.g. ${capitalize(key.replace(/[-_]/g, " "))} details`
            });
            updated = true;
          }
        });
        
        // If we updated the fields, save back to DB
        if (updated || catProducts.length > 0 && (!cat.fields || cat.fields === "[]")) {
          const sql = "UPDATE categories SET fields = ? WHERE id = ?";
          const fieldsJson = JSON.stringify(existingFields);
          
          db.run(sql, [fieldsJson, cat.id], function(updateErr) {
            if (updateErr) {
              console.error(`Failed to update fields for category ${cat.name}:`, updateErr);
            } else {
              console.log(`✅ Category "${cat.name}" updated with fields: ${fieldsJson}`);
            }
            
            processed++;
            if (processed === categories.length) {
              console.log("🏁 Category Synchronization Complete.");
              process.exit(0);
            }
          });
        } else {
          processed++;
          if (processed === categories.length) {
            console.log("🏁 Category Synchronization Complete.");
            process.exit(0);
          }
        }
      });
    });
  });
}

run().catch(console.error);
