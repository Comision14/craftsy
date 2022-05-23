const {check} = require('express-validator');

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre del producto el obligatorio')
        .isLength({min:3,max:20}).withMessage('Mínimo 3 caracteres'),
    
    check('price')
        .notEmpty()
        .withMessage('Debes indicar un precio'),
    
    check('category')
        .notEmpty()
        .withMessage('Se requiere una categoría')
        ,
    
    check('origin')
        .notEmpty()
        .withMessage('Y el origen?'),

    check('state')
        .notEmpty()
        .withMessage('Debes indicar el estado del producto'),

]