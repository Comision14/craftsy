const { validationResult } = require("express-validator");
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const path = require("path");
const usuarios = require('../data/users.json');

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

      if(req.body.recordame){
        res.cookie("userCraftsy14", req.session.userLogin,{maxAge: 1000*60*2})
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
    res.cookie('userCraftsy14',null,{maxAge : -1})
    return res.redirect('/')
  },
  profile : (req,res) => {
    const usuarios = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));
    const usuario = usuarios.find(usuario => usuario.id === req.session.userLogin.id);
    return res.render('profile',{
      usuario
    })
  },
  updateProfile : (req,res) => {

    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const {nombre,apellido,email,fecha,domicilio} = req.body
      const {id} = usuarios.find(usuario => usuario.id === req.session.userLogin.id );

      const usuariosModificados = usuarios.map((usuario) => {
        if (usuario.id === id) {
          let usuarioModificado = {
            ...usuario,
            nombre : nombre.trim(),
            apellido : apellido.trim(),
            fecha,
            domicilio : domicilio.trim(),
            //img: req.file ? req.file.filename : product.img,
          };
      
          if (req.file) {
            if (
              fs.existsSync(
                path.resolve(__dirname, "..", "public", "images", product.img)
              ) &&
              product.img !== "noimage.jpeg"
            ) {
              fs.unlinkSync(
                path.resolve(__dirname, "..", "public", "images", product.img)
              );
            }
          }
          return usuarioModificado;
        }
        return usuario;
      });

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "users.json"),
        JSON.stringify(usuariosModificados, null, 3),
        "utf-8"
      );

      req.session.userLogin = {
        ...req.session.userLogin,
        nombre
      }

      return res.redirect("/");
    }else{
        console.log(errors);
        return res.render("profile", {
            usuario : req.body,
            errors : errors.mapped()
          });
    }

  }
};
