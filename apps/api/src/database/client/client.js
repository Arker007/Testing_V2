/**
 * Database Client Management — LibSQL / SQLite Connection & Lifecycle
 */
const path = require("path");
const fs = require("fs");
const { createClient } = require("@libsql/client");
const bcrypt = require("bcryptjs");
const { makeShim } = require("./dbShim");
const { getTableSchemas, syncCategoryFields } = require("../schema");
const { seedDatabase } = require("../seeds");
const { runMigrations } = require("../migrations");
const { env } = require("../../config/env");

let client = null; // Raw LibSQL client
let liveShim = null; // SQLite3 compatibility shim

const db = new Proxy(
  {},
  {
    get(target, prop) {
      if (liveShim && typeof liveShim[prop] === "function") {
        return liveShim[prop].bind(liveShim);
      }
      if (liveShim && prop in liveShim) {
        return liveShim[prop];
      }
      if (prop === "then") return undefined; // Avoid treating proxy as a thenable/Promise
      return target[prop];
    },
    set(target, prop, value) {
      if (liveShim) {
        liveShim[prop] = value;
      }
      target[prop] = value;
      return true;
    },
  }
);

function resolveDbPath() {
  if (env.DB_PATH) return env.DB_PATH;
  const storagePath = path.resolve(__dirname, "../../../../../storage/database/vishal_enterprise.db");
  if (fs.existsSync(storagePath)) return storagePath;
  const legacyAppData = path.resolve(__dirname, "../../../../../../data/vishal_enterprise.db");
  if (fs.existsSync(legacyAppData)) return legacyAppData;
  const legacyRepoData = path.resolve(__dirname, "../../../../../data/vishal_enterprise.db");
  if (fs.existsSync(legacyRepoData)) return legacyRepoData;
  return storagePath;
}

function createLibSqlClient(tursoUrl, tursoToken, fileUrl) {
  if (tursoUrl) {
    console.log(`🔗 Connecting to Turso: ${tursoUrl}`);
    return createClient({ url: tursoUrl, authToken: tursoToken });
  } else {
    console.log(`💾 Using local SQLite: ${fileUrl}`);
    return createClient({ url: fileUrl });
  }
}

async function runSetup(c) {
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

  // Seed default entities
  await seedDatabase(c);

  // Run schema migrations
  await runMigrations(c);
}

async function initDatabase() {
  console.log("⏳ Initializing database...");

  const tursoUrl = env.TURSO_URL;
  const tursoToken = env.TURSO_TOKEN;
  const dbPath = resolveDbPath();
  const dbDir = path.dirname(dbPath);

  if (!tursoUrl) {
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  }

  const fileUrl = `file:${dbPath}`;
  const maxRetries = 5;
  const baseDelay = 150;
  let attempt = 0;

  while (true) {
    try {
      client = createLibSqlClient(tursoUrl, tursoToken, fileUrl);
      await runSetup(client);
      break;
    } catch (err) {
      attempt++;
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

        client = createLibSqlClient(tursoUrl, tursoToken, fileUrl);
        await runSetup(client);
        break;
      }

      if (attempt >= maxRetries) {
        console.error(`❌ Database connection failed after ${attempt} attempts:`, err.message);
        throw err;
      }

      const backoff = Math.min(baseDelay * Math.pow(2, attempt - 1), 2000);
      console.warn(`⚠️ Database connection attempt ${attempt}/${maxRetries} failed: ${err.message}. Retrying in ${backoff}ms...`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  liveShim = makeShim(client);

  try {
    await syncCategoryFields(db);
    console.log("📊 Category spec templates auto-synchronized with product specs.");
  } catch (syncErr) {
    console.error("⚠️ Failed to auto-sync category fields:", syncErr.message);
  }

  console.log("✅ Database initialized successfully");
  return client;
}

async function checkDatabaseHealth() {
  if (!client) {
    return { healthy: false, error: "Database client not initialized" };
  }
  try {
    const start = Date.now();
    await client.execute("SELECT 1");
    const latencyMs = Date.now() - start;
    return { healthy: true, latencyMs };
  } catch (err) {
    return { healthy: false, error: err.message };
  }
}

async function closeDatabase() {
  if (client && typeof client.close === "function") {
    try {
      client.close();
    } catch (e) {
      /* ignore */
    }
    client = null;
    liveShim = null;
  }
}

module.exports = {
  db,
  initDatabase,
  checkDatabaseHealth,
  closeDatabase,
  getRawClient: () => client,
};
