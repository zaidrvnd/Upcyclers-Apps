/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

module.exports = router;