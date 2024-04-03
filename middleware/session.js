const { usersModel } = require("../models")
const { handlerHttpError } = require("../utils/handlerError")
const { verifyToken } = require("../utils/handlerJwt")

const authMiddleware = async (req, res, next) => {
  try{

    if(!req.headers.authorization){
      handlerHttpError(res, 'NOT_TOKEN', 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if(!dataToken._id){
      handlerHttpError(res, 'ERROR_ID_TOKEN', 401)
      return
    }

    const user = await usersModel.findOne({ _id: dataToken._id })
    req.user = user
    next()

  } catch(error){
    handlerHttpError(res, 'ERROR_SESSION', 401)
  }
}

module.exports = { authMiddleware }