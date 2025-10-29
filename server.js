// server.js - Enhanced Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const logger = require('./Middleware/logger');
const auth = require('./Middleware/auth');
const productRoutes = require('./routes/products');
const { errorHandler } = require('./utils/errors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Mount the product routes (with authentication)
app.use('/api/products', auth, productRoutes);

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

module.exports = app;
