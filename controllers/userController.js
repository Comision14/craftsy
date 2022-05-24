const { validationResult } = require("express-validator");
const fs = require("fs");
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
        name: nombre.trim(),
        apellido: apellido.trim(),
        email,
        password,
      };

      usuarios.push(nuevoUsuario);

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "users.json"),
        JSON.stringify(usuarios, null, 3),
        "utf-8"
      );

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
};
