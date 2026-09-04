/**
 * Product Validators
 */
function validateProduct(data) {
  const errors = {};
  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.name = "Product name is required";
  }
  if (!data.category || typeof data.category !== 'string' || !data.category.trim()) {
    errors.category = "Category is required";
  }
  return errors;
}

module.exports = {
  validateProduct
};
