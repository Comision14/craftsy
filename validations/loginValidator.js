const bcryptjs = require('bcryptjs');
const {check} = require('express-validator');
const usuarios = require('../data/users.json')


module.exports = [

    check('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no válido'),

    check('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        .custom((value, {req}) => {
            const usuario = usuarios.find(usuario => usuario.email === req.body.email);
            if(!usuario){
                return false
            }else {
                if(!bcryptjs.compareSync(value,usuario.password)){
                    return false
                }
            }
            return true
        }).withMessage('Credenciales inválidas'),

]