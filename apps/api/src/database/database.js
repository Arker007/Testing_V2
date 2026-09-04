/**
 * Database Configuration — LibSQL / Turso
 */
const path = require("path");
const fs = require("fs");
const { createClient } = require("@libsql/client");
const bcrypt = require("bcryptjs");
const { makeShim } = require("./dbShim");
const { getTableSchemas } = require("./dbSchema");
const { defaultCategories, defaultProducts, defaultCompany } = require("./dbSeeds");
const { syncCategoryFields } = require("./dbSync");

let client; // raw LibSQL client
let db; // compatibility shim (sqlite3-like API)

async function initDatabase() {
  console.log("⏳ Initializing database...");

  const tursoUrl = process.env.TURSO_URL;
  const tursoToken = process.env.TURSO_TOKEN;

  const dbPath =
    process.env.DB_PATH ||
    path.join(__dirname, "../../../../../data/vishal_enterprise.db");
  const dbDir = path.dirname(dbPath);

  if (!tursoUrl) {
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  }

  const fileUrl = `file:${dbPath}`;

  const connectClient = () => {
    if (tursoUrl) {
      console.log(`🔗 Connecting to Turso: ${tursoUrl}`);
      return createClient({ url: tursoUrl, authToken: tursoToken });
    } else {
      console.log(`💾 Using local SQLite: ${fileUrl}`);
      return createClient({ url: fileUrl });
    }
  };

  const runSetup = async (c) => {
    await c.execute("SELECT 1");
    console.log("✅ Database connection established");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await c.batch(getTableSchemas(hashedPassword), "write");

    try {
      const existingUser = await c.execute({
        sql: "SELECT password FROM users WHERE username = ?",
        args: ["admin"],
      });
      if (existingUser.rows && existingUser.rows.length > 0) {
        const dbPass = String(
          existingUser.rows[0][0] || existingUser.rows[0].password || ""
        );
        if (dbPass && !dbPass.startsWith("$2a$") && !dbPass.startsWith("$2b$")) {
          console.log("🔒 Migrating legacy admin plaintext password to secure hashed format...");
          await c.execute({
            sql: "UPDATE users SET password = ? WHERE username = ?",
            args: [hashedPassword, "admin"],
          });
        }
      }
    } catch (err) {
      console.error("⚠️ Failed to migrate legacy password:", err.message);
    }

    const migrations = [
      `ALTER TABLE products ADD COLUMN oldPrice TEXT`,
      `ALTER TABLE products ADD COLUMN discountRate TEXT`,
      `ALTER TABLE products ADD COLUMN published INTEGER DEFAULT 1`,
      `ALTER TABLE products ADD COLUMN faqs TEXT DEFAULT '[]'`,
    ];
    for (const sql of migrations) {
      try {
        await c.execute(sql);
      } catch {
        /* column already exists */
      }
    }

    // Seed default categories
    try {
      const catCheck = await c.execute("SELECT COUNT(*) as count FROM categories");
      const count = Number(catCheck.rows[0]?.[0] ?? catCheck.rows[0]?.count ?? 0);
      if (count === 0) {
        console.log("🌱 Seeding default product categories...");
        for (const cat of defaultCategories) {
          await c.execute({
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
      const prodCheck = await c.execute("SELECT COUNT(*) as count FROM products");
      const pCount = Number(prodCheck.rows[0]?.[0] ?? prodCheck.rows[0]?.count ?? 0);
      if (pCount === 0) {
        console.log("🌱 Seeding default products...");
        for (const p of defaultProducts) {
          await c.execute({
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
      const coCheck = await c.execute("SELECT COUNT(*) as count FROM company_info");
      const coCount = Number(coCheck.rows[0]?.[0] ?? coCheck.rows[0]?.count ?? 0);
      if (coCount === 0) {
        console.log("🌱 Seeding default company info...");
        await c.execute({
          sql: "INSERT INTO company_info (id, data) VALUES (1, ?)",
          args: [JSON.stringify(defaultCompany)],
        });
        console.log("✅ Seeded default company info");
      }
    } catch (coSeedErr) {
      console.error("⚠️ Company info seed error:", coSeedErr.message);
    }
  };

  client = connectClient();

  try {
    await runSetup(client);
  } catch (err) {
    const errStr = String(err?.message || "") + " " + String(err?.code || "");
    const isCorrupt =
      errStr.includes("SQLITE_CORRUPT") ||
      errStr.includes("database disk image is malformed");

    if (isCorrupt && !tursoUrl) {
      console.error(
        `⚠️ Local SQLite database file is corrupted (${err.message}). Removing corrupt file and re-initializing database...`
      );
      try {
        if (client && typeof client.close === "function") {
          client.close();
        }
      } catch (closeErr) {}

      const filesToRemove = [
        dbPath,
        `${dbPath}-journal`,
        `${dbPath}-wal`,
        `${dbPath}-shm`,
      ];
      for (const f of filesToRemove) {
        if (fs.existsSync(f)) {
          try {
            fs.unlinkSync(f);
            console.log(`🗑️ Removed corrupt database file: ${f}`);
          } catch (rmErr) {
            console.error(`Failed to remove ${f}:`, rmErr.message);
          }
        }
      }

      client = connectClient();
      await runSetup(client);
    } else {
      throw err;
    }
  }

  db = makeShim(client);

  try {
    await syncCategoryFields(db);
    console.log("📊 Category spec templates auto-synchronized with product specs.");
  } catch (syncErr) {
    console.error("⚠️ Failed to auto-sync category fields:", syncErr.message);
  }

  console.log("✅ Database initialized successfully");
}

module.exports = {
  get db() {
    return db;
  },
  initDatabase,
};
