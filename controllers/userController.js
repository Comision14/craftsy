const { validationResult } = require("express-validator");
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const path = require("path");
const usuarios = require('../data/users.json')

module.exports = {
  register: (req, res) => {
    return res.render("register");
  },
  processRegister: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { nombre, apellido, email, password } = req.body;
      let lastID = usuarios.length !== 0 ? usuarios[usuarios.length - 1].id : 0;
      let nuevoUsuario = {
        id: +lastID + 1,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email,
        password : bcryptjs.hashSync(password, 10),
        rol : "user"
      };

      usuarios.push(nuevoUsuario);

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "users.json"),
        JSON.stringify(usuarios, null, 3),
        "utf-8"
      );

      //levantar sesión
      const {id, rol} = nuevoUsuario
      req.session.userLogin = {
        id,
        nombre : nombre.trim(),
        rol
    }

      return res.redirect("/");

    }else{
        return res.render("register",{
            old : req.body,
            errores : errors.mapped()
        });

    }
  },
  login: (req, res) => {
    return res.render("login");
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {

      const {id, nombre, rol } = usuarios.find(usuario => usuario.email === req.body.email);

      req.session.userLogin = {
          id,
          nombre,
          rol
      }
      return res.redirect("/");

    }else {
      return res.render("login",{
        errores : errors.mapped(),
        old : req.body
      });

    }
  },
  logout : (req,res) => {
    req.session.destroy();
    return res.redirect('/')
  }
};
