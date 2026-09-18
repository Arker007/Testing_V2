// Domain-agnostic reusable hooks
export { default as useApi } from './useApi';
export { default as useDocumentTitle } from './useDocumentTitle';
export { default as useMediaQuery } from './useMediaQuery';

// Backwards-compatible shims for domain hooks (deprecated: prefer @features/*)
export { useInquiry } from './useInquiry';
export { useProducts } from './useProducts';
