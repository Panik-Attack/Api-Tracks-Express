const { matchedData } = require('express-validator');
const { storageModel } = require('../models/index');
const { handlerHttpError } = require('../utils/handlerError');
const fs = require('fs')

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

/**
 * Obtener todos los items
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.send({data})
  } catch(error) {
    handlerHttpError(res, 'ERROR_GET_ITEMS', 403)
  }
}

/**
 * Obtener un item por id
 * @param {*} req 
 * @param {*} res 
 */
const getItemById = async(req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await storageModel.findOne(id)
    res.send({data})
  } catch(error) {
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
    const { body, file } = req
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    
    const data = await storageModel.create(fileData)
    res.send({data})
  } catch (error) {
    console.log(error)
    handlerHttpError(res, 'ERROR_CREATE_ITEMS', 403)
  }
}

/**
 * eiminar items
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    const deleteResponse = await storageModel.deleteOne({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`; 

    fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data });
  } catch (error) {
    console.log(error)
    handlerHttpError(res, "ERROR_DELETED_ITEMS",403);
  }
};

module.exports = {
  getItems,
  getItemById,
  createItems,
  deleteItems
}