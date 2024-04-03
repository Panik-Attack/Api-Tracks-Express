const { handlerHttpError } = require("../utils/handlerError")

const chechRol = (roles) => (req, res, next) => {
  try{
    const { user } = req
    
    const rolesByUser = user.role
    const checkValueRol = roles.some(rol => rolesByUser.includes(rol))

    if(!checkValueRol){
      handlerHttpError(res, "USER_NOT_PERMISSION")
      return
    }

    next()

  } catch(error){
    handlerHttpError(res, "ERROR_PERMISSION")
  }


}

module.exports = { chechRol }