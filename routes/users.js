const express = require('express');
const router = express.Router();

const {register,login, processRegister, processLogin,logout, profile, updateProfile} = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

const userCheck = require('../middlewares/userCheck');

/* /users */
router
    .get('/register', register)
    .post('/register',registerValidator,processRegister)
    .get('/login', login)
    .post('/login',loginValidator, processLogin)
    .get('/logout',logout)
    .get('/profile',userCheck,profile)
    .put('/update-profile',updateProfile)


module.exports = router;
