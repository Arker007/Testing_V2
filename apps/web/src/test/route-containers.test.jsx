import { describe, it, expect } from "vitest";
import * as Pages from "@pages/index";

describe("Route Container Standardization Contract", () => {
  it("exports all required public and admin route page containers", () => {
    const requiredContainers = [
      "Home",
      "About",
      "Products",
      "ProductDetail",
      "Contact",
      "Manufacturing",
      "Sustainability",
      "NotFound",
      "LoginPage",
      "DashboardPage",
      "AdminProductsPage",
      "AdminProductEditorPage",
      "AdminCategoriesPage",
      "AdminCategoryEditorPage",
      "AdminInquiriesPage",
      "AdminInquiryDetailPage",
      "AdminMediaPage",
      "AdminCatalogPage",
      "SiteContentPage",
      "AdminSettingsPage",
    ];

    requiredContainers.forEach((name) => {
      expect(Pages[name], `Missing container export: ${name}`).toBeDefined();
      expect(typeof Pages[name], `Container ${name} must be a React component function`).toBe("function");
    });
  });
});
