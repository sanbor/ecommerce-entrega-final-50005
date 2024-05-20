const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Eliminar usuarios inactivos
router.delete('/inactive', userController.deleteInactiveUsers);

module.exports = router;
