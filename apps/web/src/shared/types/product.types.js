/**
 * @file product.types.js
 * @description Type definitions for product, catalog, and category models.
 */

/**
 * Product Specification Key-Value item.
 * @typedef {Object} ProductSpecification
 * @property {string} label - Display label (e.g., 'Static Load Capacity')
 * @property {string} value - Formatted value (e.g., '4,500 kg')
 * @property {string} [unit] - Measurement unit
 * @property {string} [category] - Spec category grouping
 */

/**
 * Product item representation.
 * @typedef {Object} ProductItem
 * @property {number|string} id - Product identifier
 * @property {string} name - Product display name
 * @property {string} [slug] - URL friendly slug
 * @property {string} category_id - Foreign key to category
 * @property {string} [category_name] - Category title
 * @property {string} [description] - Full product description
 * @property {string} [short_description] - Brief summary for cards
 * @property {string} [sku] - SKU/item code
 * @property {string} [featured_image] - Primary image URL
 * @property {string[]} [gallery] - Secondary image URLs
 * @property {ProductSpecification[]} [specifications] - Technical specs list
 * @property {boolean} [is_active] - Publication status
 * @property {boolean} [is_featured] - Highlight on homepage
 * @property {string} [created_at] - Creation ISO timestamp
 * @property {string} [updated_at] - Update ISO timestamp
 */

/**
 * Product Category representation.
 * @typedef {Object} CategoryItem
 * @property {number|string} id - Category identifier
 * @property {string} name - Category display name
 * @property {string} slug - Unique identifier slug
 * @property {string} [description] - Category overview text
 * @property {string} [image_url] - Cover image URL
 * @property {number} [display_order] - Sort order in navigation
 * @property {number} [product_count] - Total products in category
 */

/**
 * Catalog filter query parameters.
 * @typedef {Object} ProductFilterParams
 * @property {string} [category] - Filter by category slug or id
 * @property {string} [search] - Keyword search query
 * @property {string} [sortBy] - Field to sort by ('name', 'created_at', 'order')
 * @property {string} [sortOrder] - 'asc' or 'desc'
 * @property {number} [page] - Page number
 * @property {number} [limit] - Page limit
 */

export {};
