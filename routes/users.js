const express = require('express');
const router = express.Router();

const {register,login, processRegister} = require('../controllers/userController');

/* /users */
router
    .get('/register', register)
    .post('/register',processRegister)
    .get('/login', login);

module.exports = router;
