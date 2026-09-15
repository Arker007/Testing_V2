import { describe, it, expect } from "vitest";
import { API_ENDPOINTS as SHARED_ENDPOINTS } from "../shared/api/endpoints";
import { API_ENDPOINTS as CONFIG_ENDPOINTS } from "../config/api";

describe("API Endpoints Configuration", () => {
  it("shared API_ENDPOINTS has synchronized CATEGORIES path", () => {
    expect(SHARED_ENDPOINTS.CATEGORIES).toBe("/categories");
    expect(SHARED_ENDPOINTS.PRODUCTS).toBe("/products");
  });

  it("config API_ENDPOINTS has prefixed CATEGORIES endpoint", () => {
    expect(CONFIG_ENDPOINTS.CATEGORIES).toBe("/api/categories");
    expect(CONFIG_ENDPOINTS.PRODUCTS).toBe("/api/products");
  });
});
