const { ValidationError } = require('../utils/errors');

exports.validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price == null || !category || inStock == null) {
    return next(new ValidationError('All fields are required'));
  }

  if (typeof price !== 'number' || typeof inStock !== 'boolean') {
    return next(new ValidationError('Invalid data type for price or inStock'));
  }

  next();
};
