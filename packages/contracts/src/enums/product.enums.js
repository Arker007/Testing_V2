/**
 * Product domain enums and measurement units
 */

const PRODUCT_STATUS = Object.freeze({
  ACTIVE: "active",
  DRAFT: "draft",
  ARCHIVED: "archived",
});

const PRODUCT_AVAILABILITY = Object.freeze({
  IN_STOCK: "in_stock",
  MADE_TO_ORDER: "made_to_order",
  DISCONTINUED: "discontinued",
});

const MEASUREMENT_UNITS = Object.freeze({
  MILLIMETER: "mm",
  CENTIMETER: "cm",
  METER: "m",
  INCH: "in",
  KILOGRAM: "kg",
  METRIC_TON: "ton",
  LITER: "L",
});

module.exports = {
  PRODUCT_STATUS,
  PRODUCT_AVAILABILITY,
  MEASUREMENT_UNITS,
};
