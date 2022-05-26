const express = require('express');
const router = express.Router();

const {register,login, processRegister, processLogin,logout} = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

/* /users */
router
    .get('/register', register)
    .post('/register',registerValidator,processRegister)
    .get('/login', login)
    .post('/login',loginValidator, processLogin)
    .get('/logout',logout)


module.exports = router;
