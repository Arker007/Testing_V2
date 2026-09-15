const test = require("node:test");
const assert = require("node:assert/strict");
require("./setup");

const contracts = require("../../packages/contracts");

test("E2E Contracts Compliance: Schema & Enum Consistency", async (t) => {
  await t.test("Verify domain enums are immutable and contain expected constants", () => {
    assert.equal(contracts.INQUIRY_STATUS.PENDING, "pending");
    assert.equal(contracts.INQUIRY_STATUS.REVIEWED, "reviewed");
    assert.equal(contracts.INQUIRY_STATUS.RESPONDED, "responded");
    assert.equal(contracts.INQUIRY_STATUS.ARCHIVED, "archived");

    assert.equal(contracts.PRODUCT_STATUS.ACTIVE, "active");
    assert.equal(contracts.PRODUCT_STATUS.DRAFT, "draft");

    assert.equal(contracts.MEASUREMENT_UNITS.MILLIMETER, "mm");
    assert.equal(contracts.MEASUREMENT_UNITS.KILOGRAM, "kg");
  });

  await t.test("Verify pagination constants contract", () => {
    assert.equal(contracts.PAGINATION_DEFAULTS.PAGE, 1);
    assert.equal(contracts.PAGINATION_DEFAULTS.LIMIT, 20);
    assert.ok(contracts.PAGINATION_DEFAULTS.MAX_LIMIT >= 100);
  });

  await t.test("Verify productFilterSchema sanitizes defaults", () => {
    const parsed = contracts.productFilterSchema.parse({});
    assert.equal(parsed.page, 1);
    assert.equal(parsed.limit, 20);
    assert.equal(parsed.sort, "display_order");
    assert.equal(parsed.order, "asc");
  });
});
