const dbModule = require("../config/database");

async function run() {
  console.log("🚀 Starting Category Images Synchronization with Database Seeds...");
  await dbModule.initDatabase();
  
  const { db } = dbModule;
  
  const categoryImageMap = {
    "plastic-lumber": "/uploads/products/lumber/plastic-lumber-pallet-1770447286569-0_medium.webp",
    "plastic-pallets": "/uploads/products/pallets/pallets-1770374237161-67758_medium.webp",
    "garden-bench": "/uploads/products/categories/garden-bench-1770446422580-0_medium.webp",
    "plastic-table": "/uploads/products/categories/plastic-table-1770446441648-0_medium.webp",
    "garden-fence": "/uploads/products/categories/categories-1770374476904-61107_medium.webp",
    "outdoor-furniture": "/uploads/products/garden-bench/gardenbench-1770441701366-1_medium.webp",
    "custom-products": "/uploads/products/lumber/plastic-lumber-pallet-1770447286569-0_medium.webp"
  };

  db.all("SELECT * FROM categories", [], (err, categories) => {
    if (err) {
      console.error("Error fetching categories:", err);
      process.exit(1);
    }
    
    console.log(`Loaded ${categories.length} categories from SQLite database.`);
    
    let processed = 0;
    
    categories.forEach(cat => {
      const targetImage = categoryImageMap[cat.id];
      if (targetImage && cat.image !== targetImage) {
        console.log(`Updating category image for "${cat.name}" from "${cat.image}" to "${targetImage}"...`);
        db.run("UPDATE categories SET image = ? WHERE id = ?", [targetImage, cat.id], function(updateErr) {
          if (updateErr) {
            console.error(`Failed to update image for category ${cat.name}:`, updateErr);
          } else {
            console.log(`✅ Category "${cat.name}" image updated successfully.`);
          }
          
          processed++;
          if (processed === categories.length) {
            console.log("🏁 Category Images Synchronization Complete.");
            process.exit(0);
          }
        });
      } else {
        processed++;
        if (processed === categories.length) {
          console.log("🏁 Category Images Synchronization Complete.");
          process.exit(0);
        }
      }
    });
  });
}

run().catch(console.error);
