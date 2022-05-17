const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

//const controlador = require('../controllers/productController')
const {cart,detail,getByCategory, search, add, store,edit, update,remove, list} = require('../controllers/productController');

/* MULTER */
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage
})

/* /products */
router
    .get('/add',add)
    .post('/add',upload.array('image'),store)
    .get('/edit/:id',edit)
    .put('/update/:id',upload.single('image'),update)
    .get('/cart', cart)
    .get('/detail/:id', detail)
    .get('/category/:idCategory/:idProduct?',getByCategory)
    .get('/search',search)
    .delete('/remove/:id',remove)
    .get('/list',list)

module.exports = router;
