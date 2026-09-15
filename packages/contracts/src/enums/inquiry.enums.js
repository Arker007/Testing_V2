/**
 * Inquiry domain enums and status values
 */

const INQUIRY_STATUS = Object.freeze({
  PENDING: "pending",
  REVIEWED: "reviewed",
  RESPONDED: "responded",
  ARCHIVED: "archived",
});

const INQUIRY_TYPE = Object.freeze({
  GENERAL: "general",
  QUOTE: "quote",
  CUSTOM_SPEC: "custom_spec",
  SAMPLE_REQUEST: "sample_request",
});

module.exports = {
  INQUIRY_STATUS,
  INQUIRY_TYPE,
};
