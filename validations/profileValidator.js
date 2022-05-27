const {check} = require('express-validator');

module.exports = [

    check('nombre')
        .isLength({min: 2}).withMessage('Como mínimo dos letras').bail()
        .isAlpha().withMessage('Solo letras porfa!'),

    check('apellido')
        .isLength({min: 2}).withMessage('Como mínimo dos letras').bail()
        .isAlpha().withMessage('Solo letras porfa!'),  

]