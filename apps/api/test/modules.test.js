/**
 * Modules Architectural Compliance Suite
 * Verifies that all 8 backend modules adhere strictly to the 6-layer architecture:
 * Router -> Controller -> Service -> Repository -> Validator -> Mapper
 */
const { test, describe, it } = require("node:test");
const assert = require("node:assert/strict");

const modules = [
  { name: "auth", module: require("../src/modules/auth") },
  { name: "categories", module: require("../src/modules/categories") },
  { name: "company", module: require("../src/modules/company") },
  { name: "content", module: require("../src/modules/content") },
  { name: "inquiries", module: require("../src/modules/inquiries") },
  { name: "media", module: require("../src/modules/media") },
  { name: "products", module: require("../src/modules/products") },
  { name: "stats", module: require("../src/modules/stats") },
  { name: "uploads", module: require("../src/modules/uploads") },
];

describe("Module Anatomy Architectural Compliance", () => {
  for (const { name, module: mod } of modules) {
    it(`Module '${name}' exports complete standard 6-layer architecture`, () => {
      assert.ok(mod.routes, `Module '${name}' missing routes export`);
      assert.ok(mod.controller, `Module '${name}' missing controller export`);
      assert.ok(mod.service, `Module '${name}' missing service export`);
      assert.ok(mod.repository, `Module '${name}' missing repository export`);
      assert.ok(mod.validator, `Module '${name}' missing validator export`);
      assert.ok(mod.mapper, `Module '${name}' missing mapper export`);
    });
  }
});
