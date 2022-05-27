const {check, body} = require('express-validator');
const usuarios = require('../data/users.json')


module.exports = [

    check('nombre')
        .isLength({min: 2}).withMessage('Como mínimo dos letras').bail()
        .isAlpha().withMessage('Solo letras porfa!'),

    check('apellido')
        .isLength({min: 2}).withMessage('Como mínimo dos letras').bail()
        .isAlpha().withMessage('Solo letras porfa!'),
    
    check('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no válido').bail()
        .custom((value) => {
            const usuario = usuarios.find(usuario => usuario.email === value);
            if(usuario){
                return false
            }else{
                return true
            }
        }).withMessage('El email ya está registrado!'),

    check('password')
        .isLength({min: 6, max:12}).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    
    body('password2')
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden!!'),
    
    check('terminos')
        .isString('on')
        .withMessage('Debes aceptar términos y condiciones')

]