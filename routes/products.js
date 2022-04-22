const express = require('express');
const router = express.Router();

//const controlador = require('../controllers/productController')
const {cart,detail,getByCategory} = require('../controllers/productController');

/* /products */
router.get('/cart', cart);
//router.get('/detail/:producto', controlador.detail);
router.get('/detail/:idProduct', detail);
router.get('/category/:idCategory/:idProduct?',getByCategory)

module.exports = router;
