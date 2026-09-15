export const INQUIRY_STATUS = Object.freeze({
  PENDING: "pending",
  REVIEWED: "reviewed",
  RESPONDED: "responded",
  ARCHIVED: "archived",
});

export const INQUIRY_TYPE = Object.freeze({
  GENERAL: "general",
  QUOTE: "quote",
  CUSTOM_SPEC: "custom_spec",
  SAMPLE_REQUEST: "sample_request",
});

export const PRODUCT_STATUS = Object.freeze({
  ACTIVE: "active",
  DRAFT: "draft",
  ARCHIVED: "archived",
});

export const PRODUCT_AVAILABILITY = Object.freeze({
  IN_STOCK: "in_stock",
  MADE_TO_ORDER: "made_to_order",
  DISCONTINUED: "discontinued",
});

export const MEASUREMENT_UNITS = Object.freeze({
  MILLIMETER: "mm",
  CENTIMETER: "cm",
  METER: "m",
  INCH: "in",
  KILOGRAM: "kg",
  METRIC_TON: "ton",
  LITER: "L",
});
