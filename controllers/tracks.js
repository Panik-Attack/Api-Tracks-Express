const { matchedData } = require('express-validator');
const { tracksModel } = require('../models/index');
const { handlerHttpError } = require('../utils/handlerError');


/**
 * Obtener todos los items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({})
    res.send({data})
  } catch (error) {
    handlerHttpError(res, 'ERROR_GET_ITEMS', 403)
  }
  
}

/**
 * Obtener un item por id
 * @param {*} req 
 * @param {*} res 
 */
const getItemById = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await tracksModel.findById(id)
    res.send({data})
  } catch (error) {
    handlerHttpError(res, 'ERROR_GET_ITEMS_BY_ID', 403)
  }
}

/**
 * crear items
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) => {
  try {
    const body = matchedData(req)
    const data = await tracksModel.create(body)
    res.send({data})
  } catch (error) {
    handlerHttpError(res, 'ERROR_CREATE_ITEMS', 403)
  }
  
}

/**
 * actualizar items
 * @param {*} req 
 * @param {*} res 
 */
const updateItems = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)

    console.log(body)
    console.log(id)

    const data = await tracksModel.findByIdAndUpdate(id, body)
    
    res.send({data})
  } catch (error) {
    handlerHttpError(res, 'ERROR_UPDATE_ITEMS', 403)
  }
}

/**
 * eiminar items
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) => {
  try {
    const { id } = matchedData(req)

    const data = await tracksModel.deleteOne(id)
    res.send({data})
  } catch (error) {
    console.log(error)
    handlerHttpError(res, 'ERROR_DELETE_ITEMS', 403)
  }
}

module.exports = {
  getItems,
  getItemById,
  createItems,
  updateItems,
  deleteItems
}