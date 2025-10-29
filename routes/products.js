const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validateProduct } = require('../middleware/validation');
const { NotFoundError } = require('../utils/errors');

const router = express.Router();

let products = [];

// GET all products
router.get('/', (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;
  let filtered = products;

  if (category) filtered = filtered.filter(p => p.category === category);

  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginated = filtered.slice(start, end);

  res.json({ total: filtered.length, products: paginated });
});

// GET by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST create product
router.post('/', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update
router.put('/:id', validateProduct, (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));

  Object.assign(product, req.body);
  res.json(product);
});

// DELETE
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  products.splice(index, 1);
  res.status(204).send();
});

// Search endpoint
router.get('/search/:name', (req, res) => {
  const term = req.params.name.toLowerCase();
  const results = products.filter(p => p.name.toLowerCase().includes(term));
  res.json(results);
});

// Statistics endpoint
router.get('/stats', (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

module.exports = router;
