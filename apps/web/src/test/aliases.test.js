import { describe, it, expect } from "vitest";

import { API_ENDPOINTS } from "@/config/api";
import { ProductService } from "@features/products";
import { API_ENDPOINTS as SHARED_ENDPOINTS } from "@shared/api/endpoints";
import { DashboardPage, AdminProductsPage, LoginPage } from "@pages/index";

describe("Frontend Module Aliases Resolution", () => {
  it("resolves @/ alias to src root correctly", () => {
    expect(API_ENDPOINTS).toBeDefined();
    expect(API_ENDPOINTS.CATEGORIES).toBe("/api/categories");
  });

  it("resolves @features/ alias directly to feature domains", () => {
    expect(ProductService).toBeDefined();
    expect(typeof ProductService.getProducts).toBe("function");
  });

  it("resolves @shared/ alias directly to shared modules", () => {
    expect(SHARED_ENDPOINTS).toBeDefined();
    expect(SHARED_ENDPOINTS.PRODUCTS).toBe("/products");
  });

  it("resolves @pages/ alias directly to route page containers", () => {
    expect(DashboardPage).toBeDefined();
    expect(typeof DashboardPage).toBe("function");
    expect(AdminProductsPage).toBeDefined();
    expect(typeof AdminProductsPage).toBe("function");
    expect(LoginPage).toBeDefined();
    expect(typeof LoginPage).toBe("function");
  });
});
