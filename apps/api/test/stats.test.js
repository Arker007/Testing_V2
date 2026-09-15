const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
require("./setup");

const { app } = require("../index");
const { initDatabase } = require("../src/database/database");
const statsModule = require("../src/modules/stats");
const statsRepository = require("../src/modules/stats/stats.repository");
const statsService = require("../src/modules/stats/stats.service");

test("Stats module exports proper layered components", () => {
  assert.ok(statsModule.routes);
  assert.ok(statsModule.controller);
  assert.ok(statsModule.service);
  assert.ok(statsModule.repository);
});

test("StatsRepository returns non-negative count values for tables", async () => {
  await initDatabase();
  const [products, categories, media, inquiries] = await Promise.all([
    statsRepository.countProducts(),
    statsRepository.countCategories(),
    statsRepository.countMedia(),
    statsRepository.countInquiries(),
  ]);

  assert.ok(typeof products === "number" && products >= 0);
  assert.ok(typeof categories === "number" && categories >= 0);
  assert.ok(typeof media === "number" && media >= 0);
  assert.ok(typeof inquiries === "number" && inquiries >= 0);
});

test("StatsService computes composite dashboard stats object", async () => {
  await initDatabase();
  const stats = await statsService.getDashboardStats();
  assert.ok(stats);
  assert.equal(typeof stats.products, "number");
  assert.equal(typeof stats.categories, "number");
  assert.equal(typeof stats.media, "number");
  assert.equal(typeof stats.inquiries, "number");
  assert.equal(stats.recycledTons, 5000);
  assert.equal(stats.clients, 200);
});

test("GET /api/stats returns counts for products, categories, media, and inquiries", async () => {
  await initDatabase();
  const res = await request(app).get("/api/stats");
  assert.equal(res.status, 200);
  assert.equal(typeof res.body.products, "number");
  assert.equal(typeof res.body.categories, "number");
  assert.equal(typeof res.body.media, "number");
  assert.equal(typeof res.body.inquiries, "number");
  assert.equal(typeof res.body.recycledTons, "number");
  assert.equal(typeof res.body.clients, "number");
});

