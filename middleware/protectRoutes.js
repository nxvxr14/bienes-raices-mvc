import jwt from 'jsonwebtoken'
import { Usuario } from '../models/index.js'

const protegerRuta = async(req, res, next) => {

    // Verificar si hay un token

   const {_token} = req.cookies;
   if(!_token) {
    return res.redirect('/auth/login')
   } 

    // Comprobar un token

    try {
        
        const decoded = jwt.verify(_token, "secretPass" );

        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id);

        // Almacenar el usuario al req
        if(usuario){
            req.usuario = usuario;

        } else {
            return res.redirect('/auth/login')
        }

        return next();

    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')
    }

}

export default protegerRuta 