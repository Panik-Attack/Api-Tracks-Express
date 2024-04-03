const express = require('express')
const router = express.Router()
const { uploadMiddleware } = require('../utils/handlerStorage')
const { createItems, getItems, getItemById, deleteItems } = require('../controllers/storage')
const { validatorGetItem } = require('../validators/storage')

//Listar items 
router.get('/', getItems)

// Detalles del item
router.get('/:id', validatorGetItem, getItemById)

// Eliminar item
router.delete('/:id', validatorGetItem, deleteItems)

// Crear item
router.post('/', uploadMiddleware.single('myFile'), createItems)



module.exports = router