/**
 * @file inquiry.types.js
 * @description Type definitions for quotation requests and customer inquiries.
 */

/**
 * Inquiry Submission Payload.
 * @typedef {Object} InquiryPayload
 * @property {string} name - Customer full name
 * @property {string} email - Work email address
 * @property {string} [phone] - Contact phone number
 * @property {string} [company] - Organization / business name
 * @property {string} [product_name] - Inquired product name
 * @property {string|number} [product_id] - Inquired product ID
 * @property {string} [estimated_quantity] - Batch volume / estimated units
 * @property {string} message - Technical requirements or inquiry body
 * @property {string} [source] - 'modal' | 'contact_page' | 'quick_rfq'
 */

/**
 * Inquiry Record in Admin Portal.
 * @typedef {Object} InquiryRecord
 * @property {number|string} id - Inquiry identifier
 * @property {string} reference_id - Formatted RFQ code (e.g., 'RFQ-VE-01234')
 * @property {string} name - Customer name
 * @property {string} email - Customer email
 * @property {string} [phone] - Customer phone
 * @property {string} [company] - Company name
 * @property {string} [product_name] - Inquired product name
 * @property {string} [estimated_quantity] - Quantity requested
 * @property {string} message - Message text
 * @property {'new'|'contacted'|'quoted'|'closed'|'archived'} status - Lead workflow status
 * @property {string} created_at - Timestamp of submission
 */

export {};
