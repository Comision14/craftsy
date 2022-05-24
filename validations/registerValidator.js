const {check, body} = require('express-validator');


module.exports = [

    check('nombre')
        .isLength({min: 2}).withMessage('Como mínimo dos letras').bail()
        .isAlpha().withMessage('Solo letras porfa!'),

    check('apellido')
        .isLength({min: 2}).withMessage('Como mínimo dos letras').bail()
        .isAlpha().withMessage('Solo letras porfa!'),
    
    check('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no válido'),

    check('password')
        .isLength({min: 6, max:12}).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    
    body('password2')
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden!!')

]