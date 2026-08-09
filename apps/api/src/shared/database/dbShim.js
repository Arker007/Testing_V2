/**
 * LibSQL to SQLite3 Compatibility Shim
 */
function makeShim(c) {
  return {
    all: (sql, params, cb) => {
      if (typeof params === "function") {
        cb = params;
        params = [];
      }
      c.execute({ sql, args: params || [] })
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
      c.execute({ sql, args: params || [] })
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
      c.execute({ sql, args: params || [] })
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
      c.execute(sql)
        .then(() => cb && cb(null))
        .catch((err) => cb && cb(err));
    },
  };
}

module.exports = { makeShim };
