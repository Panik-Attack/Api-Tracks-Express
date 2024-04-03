const express = require('express');
const router = express.Router();
const { getItems, createItems, getItemById, updateItems, deleteItems } = require('../controllers/tracks')
const { validatorCreateItem, validatorGetItem, } = require('../validators/tracks');
const { authMiddleware } = require('../middleware/session');
const { chechRol } = require('../middleware/rol');

// Obtener los items
router.get('/',authMiddleware, chechRol(["user"]), getItems)

// Obtener item by id
router.get('/:id',authMiddleware, chechRol(["user"]), validatorGetItem, getItemById)

// Crear item
router.post('/',authMiddleware, chechRol(["user"]), validatorCreateItem ,createItems)

// Actualizar Items
router.put('/:id',authMiddleware, chechRol, validatorGetItem, validatorCreateItem, updateItems)

// Eliminar items
router.delete('/:id',authMiddleware, chechRol(["user"]), deleteItems  )

module.exports = router