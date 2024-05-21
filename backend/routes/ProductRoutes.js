const express = require('express');
const router = express.Router();
const productController = require('../controllers');

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
