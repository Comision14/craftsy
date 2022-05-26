const express = require('express');
const router = express.Router();

const {index,admin } = require('../controllers/indexController');
const adminCheck = require('../middlewares/adminCheck');

/* GET home page. */
router
    .get('/', index)
    .get('/admin',adminCheck,admin)

module.exports = router;
