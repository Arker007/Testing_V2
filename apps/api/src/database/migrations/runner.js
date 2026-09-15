/**
 * Database Migration Runner
 * Executes and logs schema migrations idempotently.
 */
const { logger } = require("../../config/logger");

async function runMigrations(client) {
  try {
    await client.execute(`CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const result = await client.execute("SELECT name FROM _migrations");
    const applied = new Set(result.rows.map((r) => r[0] || r.name));

    const migrations = [
      {
        name: "001_initial_schema",
        up: async () => {
          // Schema base initialized by getTableSchemas
        },
      },
    ];

    for (const m of migrations) {
      if (!applied.has(m.name)) {
        logger.info(`Applying database migration: ${m.name}`);
        await m.up();
        await client.execute({
          sql: "INSERT OR IGNORE INTO _migrations (name) VALUES (?)",
          args: [m.name],
        });
      }
    }
  } catch (err) {
    logger.warn({ err }, "Database migration runner notice");
  }
}

module.exports = { runMigrations };
