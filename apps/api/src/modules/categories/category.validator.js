/**
 * Category Validators
 */
function validateCategory(data) {
  const errors = {};
  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.name = "Category name is required";
  }
  return errors;
}

module.exports = {
  validateCategory
};
