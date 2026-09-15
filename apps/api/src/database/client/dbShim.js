/**
 * LibSQL to SQLite3 Compatibility Shim with Query Retry Resilience
 */
async function executeWithRetry(operation, maxRetries = 3, baseDelayMs = 50) {
  let attempt = 0;
  while (true) {
    try {
      return await operation();
    } catch (err) {
      attempt++;
      const msg = String(err?.message || "");
      const code = String(err?.code || "");
      const isTransient =
        msg.includes("SQLITE_BUSY") ||
        msg.includes("SQLITE_LOCKED") ||
        code === "SQLITE_BUSY" ||
        code === "SQLITE_LOCKED" ||
        code === "ECONNRESET" ||
        code === "ETIMEDOUT" ||
        code === "EPIPE" ||
        msg.includes("fetch failed");

      if (attempt >= maxRetries || !isTransient) {
        throw err;
      }
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

function makeShim(c) {
  return {
    all: (sql, params, cb) => {
      if (typeof params === "function") {
        cb = params;
        params = [];
      }
      executeWithRetry(() => c.execute({ sql, args: params || [] }))
        .then((res) => {
          const rows = res.rows.map((row) => {
            const obj = {};
            res.columns.forEach((col, i) => {
              obj[col] = row[i];
            });
            return obj;
          });
          cb(null, rows);
        })
        .catch((err) => cb(err));
    },
    get: (sql, params, cb) => {
      if (typeof params === "function") {
        cb = params;
        params = [];
      }
      executeWithRetry(() => c.execute({ sql, args: params || [] }))
        .then((res) => {
          if (!res.rows.length) return cb(null, null);
          const obj = {};
          res.columns.forEach((col, i) => {
            obj[col] = res.rows[0][i];
          });
          cb(null, obj);
        })
        .catch((err) => cb(err));
    },
    run: function (sql, params, cb) {
      if (typeof params === "function") {
        cb = params;
        params = [];
      }
      executeWithRetry(() => c.execute({ sql, args: params || [] }))
        .then((res) => {
          const ctx = {
            lastID: res.lastInsertRowid
              ? Number(res.lastInsertRowid)
              : undefined,
            changes: res.rowsAffected,
          };
          if (cb) cb.call(ctx, null);
        })
        .catch((err) => {
          if (cb) cb(err);
        });
    },
    exec: (sql, cb) => {
      executeWithRetry(() => c.execute(sql))
        .then(() => cb && cb(null))
        .catch((err) => cb && cb(err));
    },
    batch: (statements, mode) => {
      return executeWithRetry(() => c.batch(statements, mode || "write"));
    },
  };
}

module.exports = { makeShim, executeWithRetry };
