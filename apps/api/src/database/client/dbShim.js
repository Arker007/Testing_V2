/**
 * LibSQL to SQLite3 Compatibility Shim with Query Retry Resilience
 */
async function executeWithRetry(operation, maxRetries = 3, baseDelay = 50) {
  let attempt = 0;
  while (true) {
    try {
      return await operation();
    } catch (err) {
      attempt++;
      const isTransient =
        err?.code === "SQLITE_BUSY" ||
        err?.code === "SQLITE_LOCKED" ||
        err?.message?.includes("database is locked") ||
        err?.message?.includes("busy");
      if (attempt >= maxRetries || !isTransient) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, baseDelay * attempt));
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
