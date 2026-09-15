const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
require("./setup");

const { app } = require("../../apps/api/index");
const { initDatabase } = require("../../apps/api/src/database/database");

test("E2E Catalog Journey: Explore Categories -> Filter Products -> View Product Detail", async (t) => {
  await initDatabase();

  await t.test("1. Fetch active product categories", async () => {
    const res = await request(app).get("/api/categories");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.categories));
    assert.ok(res.body.categories.length > 0);
  });

  await t.test("2. Fetch product catalog and verify product structure", async () => {
    const res = await request(app).get("/api/products");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.products));
    assert.ok(res.body.products.length > 0);

    const firstProduct = res.body.products[0];
    assert.ok(firstProduct.id);
    assert.ok(firstProduct.name);
    assert.ok(firstProduct.category);
  });

  await t.test("3. Fetch product detail by ID and verify specifications", async () => {
    const listRes = await request(app).get("/api/products");
    const target = listRes.body.products[0];

    const detailRes = await request(app).get(`/api/products/${target.id}`);
    assert.equal(detailRes.status, 200);
    assert.equal(detailRes.body.id, target.id);
    assert.equal(detailRes.body.name, target.name);
    assert.ok(detailRes.body.specifications !== undefined);
  });
});
