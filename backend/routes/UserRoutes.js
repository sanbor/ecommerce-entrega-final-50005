const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', UserController.getAllUsers);

// Ruta para eliminar usuarios inactivos
router.delete('/inactive', UserController.deleteInactiveUsers);

module.exports = router;

