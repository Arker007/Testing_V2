/**
 * @file routes.constants.js
 * @description Centralized route path definitions for public and admin navigation.
 */

export const PUBLIC_ROUTES = Object.freeze({
  HOME: "/",
  ABOUT: "/about",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:slug",
  CONTACT: "/contact",
  MANUFACTURING: "/manufacturing",
  SUSTAINABILITY: "/sustainability",
  NOT_FOUND: "*",
});

export const ADMIN_ROUTES = Object.freeze({
  LOGIN: "/admin/login",
  ROOT: "/admin",
  DASHBOARD: "/admin/dashboard",
  PRODUCTS: "/admin/products",
  PRODUCT_NEW: "/admin/products/new",
  PRODUCT_EDIT: "/admin/products/edit/:id",
  CATEGORIES: "/admin/categories",
  CATEGORY_NEW: "/admin/categories/new",
  CATEGORY_EDIT: "/admin/categories/edit/:id",
  INQUIRIES: "/admin/inquiries",
  INQUIRY_DETAIL: "/admin/inquiries/:id",
  MEDIA: "/admin/media",
  CATALOG: "/admin/catalog",
  CONTENT: "/admin/content",
  SETTINGS: "/admin/settings",
});

export const ROUTES = Object.freeze({
  PUBLIC: PUBLIC_ROUTES,
  ADMIN: ADMIN_ROUTES,
});

export default ROUTES;
