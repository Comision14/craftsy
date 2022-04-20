const express = require('express');
const router = express.Router();

const {cart,detail} = require('../controllers/productController');

/* /products */
router.get('/cart', cart);
router.get('/detail', detail);

module.exports = router;