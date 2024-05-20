const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
