import { describe, it, expect } from "vitest";
import {
  inquirySchema,
  INQUIRY_STATUS,
  INQUIRY_TYPE,
  PRODUCT_STATUS,
  PAGINATION_DEFAULTS,
} from "@vishal/contracts";

describe("@vishal/contracts package resolution in frontend", () => {
  it("exports inquirySchema which validates correct payload", () => {
    const valid = {
      name: "Test User",
      email: "user@example.com",
      message: "Need bulk quotation",
    };
    const result = inquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("exports inquirySchema which rejects invalid email", () => {
    const invalid = {
      name: "Test User",
      email: "not-an-email",
      message: "Need quote",
    };
    const result = inquirySchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("exports domain enums and API defaults", () => {
    expect(INQUIRY_STATUS.PENDING).toBe("pending");
    expect(INQUIRY_TYPE.QUOTE).toBe("quote");
    expect(PRODUCT_STATUS.ACTIVE).toBe("active");
    expect(PAGINATION_DEFAULTS.PAGE).toBe(1);
  });
});
