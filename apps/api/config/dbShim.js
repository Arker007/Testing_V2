/**
 * SQLite Compatibility Shim for LibSQL
 */

function makeShim(libsqlClient) {
  return {
    // --- db.all(sql, [params], callback) ---
    all(sql, params, cb) {
      if (typeof params === "function") {
        cb = params;
        params = [];
      }
      libsqlClient
        .execute({ sql, args: params || [] })
        .then((result) => {
          const coerce = (v) => (typeof v === "bigint" ? Number(v) : v);
          const rows = result.rows.map((r) =>
            Object.fromEntries(
              Object.entries(r).map(([k, v]) => [k, coerce(v)])
            )
          );
          cb(null, rows);
        })
        .catch((err) => cb(err));
    },

    // --- db.get(sql, [params], callback) ---
    get(sql, params, cb) {
      if (typeof params === "function") {
        cb = params;
        params = [];
      }
      libsqlClient
        .execute({ sql, args: params || [] })
        .then((result) => {
          const coerce = (v) => (typeof v === "bigint" ? Number(v) : v);
          const row = result.rows[0]
            ? Object.fromEntries(
                Object.entries(result.rows[0]).map(([k, v]) => [k, coerce(v)])
              )
            : undefined;
          cb(null, row);
        })
        .catch((err) => cb(err));
    },

    // --- db.run(sql, [params], callback) ---
    run(sql, params, cb) {
      if (typeof params === "function") {
        cb = params;
        params = [];
      }
      if (!cb) cb = () => {};
      const args = Array.isArray(params)
        ? params
        : params != null
          ? [params]
          : [];
      libsqlClient
        .execute({ sql, args })
        .then((result) => {
          const ctx = {
            lastID: Number(result.lastInsertRowid ?? 0),
            changes: result.rowsAffected ?? 0,
          };
          cb.call(ctx, null);
        })
        .catch((err) => cb.call({}, err));
    },

    serialize(cb) {
      if (cb) cb();
    },

    batch(stmts) {
      return libsqlClient.batch(stmts, "write");
    },

    _client: libsqlClient,
  };
}

module.exports = { makeShim };
