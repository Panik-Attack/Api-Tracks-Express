const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlerPassword")
const { usersModel } = require("../models")
const { tokenSign } = require("../utils/handlerJwt")
const { handlerHttpError }  = require("../utils/handlerError")

const registerCtrl = async (req, res) => {
  try{

    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = {...req, password} 
    const dataUser = await usersModel.create(body)
    
    dataUser.set('password', undefined, {strict: false })
    const data = {
      data: dataUser,
      token: await tokenSign(dataUser)
    }
    res.send({data})
  } catch(error){
    handlerHttpError(res, 'ERROR_REGISTER')
  }
}

const loginCtrl = async (req, res) => {
  try{

    req = matchedData(req)
    const user = await usersModel.findOne({email: req.email}).select('password name email role')
    if(!user){
      handlerHttpError(res, 'USER_NOT_EXIST', 404)
      return
    }

    const hashPassword = user.password
    const checkPassword = await compare(req.password, hashPassword)
    if(!checkPassword){
      handlerHttpError(res, 'PASSWORD_INCORRECT', 401)
      return
    }

    user.set('password', undefined, {strict: false})
    const data ={
      token: await tokenSign(user),
      user
    }
    res.send({data})

  } catch(error){
    console.log(error)

    handlerHttpError(res, 'ERROR_LOGIN')
  }
}


module.exports = { registerCtrl, loginCtrl }