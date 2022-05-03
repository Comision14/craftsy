const express = require('express');
const router = express.Router();

//const controlador = require('../controllers/productController')
const {cart,detail,getByCategory, search, add, store} = require('../controllers/productController');

/* /products */
router
    .get('/add',add)
    .post('/add',store)
    .get('/cart', cart)
    .get('/detail/:idProduct', detail)
    .get('/category/:idCategory/:idProduct?',getByCategory)
    .get('/search',search)

module.exports = router;
