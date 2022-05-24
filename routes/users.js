const express = require('express');
const router = express.Router();

const {register,login, processRegister} = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');

/* /users */
router
    .get('/register', register)
    .post('/register',registerValidator,processRegister)
    .get('/login', login);

module.exports = router;
