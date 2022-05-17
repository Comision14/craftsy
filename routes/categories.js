const express = require('express');
const router = express.Router();

const {add,store,edit,update,remove,list} = require('../controllers/categorieController');

/* /categories */
router
    .get('/add', add)
    .post('/add', store)
    .get('/edit/:id', edit)
    .put('/update/:id',update)
    .delete('/remove/:id',remove)
    .get('/list',list)


module.exports = router;
