const { check } = require("express-validator");
const { validateResults } = require("../utils/handlerValidator");

const validatorRegister = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('age').exists().notEmpty().isNumeric(),
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('email').exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorLogin = [
  check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
  check('email').exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorRegister, validatorLogin }