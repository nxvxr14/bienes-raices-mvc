import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const identificarUsuario = async (req, res, next) => {
     // Identificar si hay un token en las cookies
     const {_token} = req.cookies;

     if (!_token) {
          req.usuario = null;
          return next();
     }

     // Comprobar el token

     try {
          const decoded = jwt.verify(_token, "secretPass");

          const usuario = await Usuario.scope("eliminarPassword").findByPk(
               decoded.id
          );

          // Almacenar el usuario al req
          if (usuario) {
               req.usuario = usuario;
          }

          return next();
     } catch (error) {
          console.log(error);
          return res.clearCookie("_token").redirect("/auth/login");
     }
};

export default identificarUsuario;
