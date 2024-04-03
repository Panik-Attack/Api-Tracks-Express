const express = require('express')
const router = express.Router()
const { validatorRegister, validatorLogin } = require('../validators/auth')
const { registerCtrl, loginCtrl } = require('../controllers/auth')


router.post('/login',validatorLogin, loginCtrl )

router.post('/register', validatorRegister, registerCtrl )

module.exports = router