const test = require("node:test");
const assert = require("node:assert/strict");
require("./setup");

const {
  normalizeSpecifications,
  inferSpecifications,
  ensureSpecifications,
} = require("../src/modules/products/specification/specificationSeeder");
const { backfillSpecifications } = require("../scripts/backfillSpecifications");

test("normalizeSpecifications handles null, undefined, invalid JSON gracefully", () => {
  assert.deepEqual(normalizeSpecifications(null), {});
  assert.deepEqual(normalizeSpecifications(undefined), {});
  assert.deepEqual(normalizeSpecifications("invalid-json{"), {});
  assert.deepEqual(normalizeSpecifications([]), {});
  assert.deepEqual(normalizeSpecifications(123), {});
});

test("normalizeSpecifications parses valid JSON string and normalizes keys/values", () => {
  const jsonStr = JSON.stringify({
    " Material ": " HDPE Plastic ",
    " Dimensions ": " 1200 x 1000 mm ",
    "EmptyField": "",
    "NullField": null,
  });

  const normalized = normalizeSpecifications(jsonStr);
  assert.deepEqual(normalized, {
    Material: "HDPE Plastic",
    Dimensions: "1200 x 1000 mm",
  });
});

test("normalizeSpecifications normalizes object entries", () => {
  const obj = {
    " MOQ ": " 50 Units ",
    " Load ": " 1500 kg ",
    " ": "bad key",
    "Invalid": undefined,
  };

  const normalized = normalizeSpecifications(obj);
  assert.deepEqual(normalized, {
    MOQ: "50 Units",
    Load: "1500 kg",
  });
});

test("inferSpecifications infers appropriate fields for pallets, lumber, benches", () => {
  const palletProduct = {
    name: "Heavy-Duty Racking Plastic Pallet 1200x1000",
    type: "Racking Pallet",
    description: "High-density polyethylene pallet with steel reinforcement",
    moq: "50 Units",
  };

  const palletSpecs = inferSpecifications(palletProduct);
  assert.equal(palletSpecs["Product Type"], "Racking Pallet");
  assert.equal(palletSpecs["Material"], "HDPE");
  assert.equal(palletSpecs["Primary Use"], "Warehousing & Logistics");
  assert.equal(palletSpecs["MOQ"], "50 Units");

  const benchProduct = {
    name: "Recycled Park Garden Bench",
    description: "Outdoor park bench made of recycled plastic",
  };
  const benchSpecs = inferSpecifications(benchProduct);
  assert.equal(benchSpecs["Product Type"], "Bench");
  assert.equal(benchSpecs["Primary Use"], "Outdoor Utility & Public Spaces");
});

test("ensureSpecifications retains existing specifications when present", () => {
  const existing = {
    Material: "Cast Iron + Recycled HDPE",
    Length: "1800 mm",
  };
  const product = { name: "Garden Bench", type: "Bench" };
  const result = ensureSpecifications(product, existing);
  assert.deepEqual(result, existing);
});

test("ensureSpecifications infers specs when existing is empty", () => {
  const product = { name: "Polypropylene Pallet", description: "PP logistics pallet" };
  const result = ensureSpecifications(product, {});
  assert.equal(result.Material, "Polypropylene (PP)");
  assert.equal(result["Primary Use"], "Warehousing & Logistics");
});

test("backfillSpecifications runs idempotently without error", async () => {
  // First run - ensures backfilled data
  const firstCount = await backfillSpecifications();
  assert.ok(typeof firstCount === "number" && firstCount >= 0);

  // Second run - must result in 0 updates (idempotent)
  const secondCount = await backfillSpecifications();
  assert.equal(secondCount, 0);
});
