/**
 * Table Creation Schemas for LibSQL / SQLite
 */

function getTableSchemas(hashedPassword) {
  return [
    {
      sql: `CREATE TABLE IF NOT EXISTS products (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              category TEXT,
              type TEXT,
              description TEXT,
              image TEXT,
              price TEXT,
              moq TEXT,
              capacity TEXT,
              dispatch TEXT,
              customization TEXT,
              technical_blurb TEXT,
              applications TEXT,
              specifications TEXT DEFAULT '{}',
              features TEXT DEFAULT '[]',
              published INTEGER DEFAULT 1,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS categories (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              slug TEXT UNIQUE,
              description TEXT,
              image TEXT,
              fields TEXT DEFAULT '[]',
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              role TEXT DEFAULT 'admin',
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS contact_messages (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              email TEXT,
              subject TEXT,
              message TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS inquiries (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              product_id TEXT,
              name TEXT,
              email TEXT,
              phone TEXT,
              message TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS media (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              filename TEXT,
              url TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS certifications (
              id TEXT PRIMARY KEY,
              name TEXT,
              logo TEXT,
              description TEXT
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS site_content (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              section TEXT,
              key TEXT UNIQUE,
              value TEXT,
              type TEXT DEFAULT 'text'
          )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS company_info (
              id INTEGER PRIMARY KEY,
              data TEXT DEFAULT '{}'
          )`,
      args: [],
    },
    {
      sql: `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
      args: ["admin", hashedPassword, "admin"],
    },
  ];
}

module.exports = { getTableSchemas };
