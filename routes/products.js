const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImagesProducts');
const productValidator = require('../validations/productValidator')

//const controlador = require('../controllers/productController')
const {cart,detail,getByCategory, search, add, store,edit, update,remove, list} = require('../controllers/productController');



/* /products */
router
    .get('/add',add)
    .post('/add',upload.array('image'),productValidator,store)
    .get('/edit/:id',edit)
    .put('/update/:id',upload.single('image'),productValidator,update)
    .get('/cart', cart)
    .get('/detail/:id', detail)
    .get('/category/:idCategory/:idProduct?',getByCategory)
    .get('/search',search)
    .delete('/remove/:id',remove)
    .get('/list',list)

module.exports = router;
