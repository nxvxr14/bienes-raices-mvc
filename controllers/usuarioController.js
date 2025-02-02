import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import { emailRegistro, emailRecuperacion } from '../helpers/email.js'
import { generarId, generarJST } from '../helpers/token.js'
import Usuario from "../models/Usuario.js"

const formularioLogin = (req,res) => {
  res.render('auth/login', {
    pagina: 'Iniciar Sesion'
  });
}

const autenticar = async (req,res) => {

  // Validacion
  await check('email').isEmail().withMessage('El correo es obligatorio.').run(req);
  await check('password').isLength({ min:6 }).withMessage('La contraseña es obligatoria.').run(req);

  let resultado = validationResult(req);

  if(!resultado.isEmpty()) {

    return res.render('auth/login', {
    pagina : 'Iniciar Sesion',
    errores : resultado.array()
    });
  
  }

  const { email, password } = req.body;

  // Comprobar si el usuario existe
    const usuario = await Usuario.findOne( { where: {email} } );


    if(!usuario){
      return res.render('auth/login', {
        pagina: 'Iniciar Sesion',
        errores: [ { msg : 'Correo no registrado'}]
      })      

    }

  // Comprobar si le usuario no esta confirmado
     
    if(!usuario.confirmado){
     return res.render('auth/login', {
        pagina: 'Iniciar Sesion',
        errores: [ { msg : 'Usuario no confirmado. Por favor revise su correo'}]
      })      

    }


  // Comprobar password
  if(!usuario.verificarPassword(password) ) {

      return res.render('auth/login', {
        pagina: 'Iniciar Sesion',
        errores: [ { msg : 'Contraseña incorrecta'}]
      })      


  }

  // Autenticar el usuario
  const token = generarJST( { 
    id : usuario.id,
    nombre : usuario.nombre
   } );  

  // Almacenar token en un cookie
  return res.cookie('_token', token, {
    httpOnly : true,
    // sameSite : true,
    // secure : true

  }).redirect('../propiedades');

}




const formularioRegistro = (req,res) => {
  res.render('auth/registro', {
    pagina: 'Crear Cuenta'
  });
}

const registrar = async (req,res) => {
    
    // Validacion
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req);
    await check('email').isEmail().withMessage('Correo invalido').run(req);
    await check('password').isLength({ min:6 }).withMessage('Contraseña debil').run(req);
//    await check('repetir_contraseña').equals('password').withMessage('Las contraseñas son diferentes').run(req);
    
    
    let resultado = validationResult(req);
   
    //return res.json(resultado.array());

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
      
      // Errores
      return res.render('auth/registro', {
          pagina: 'Crear Cuenta2',
          errores: resultado.array(),
          usuario: {
            nombre: req.body.nombre,
            email: req.body.email
          }
        });

    }
    
    // Extraer los datos del objeto
    const { nombre, email, password } = req.body;

    // Verificar que el usuario no esta duplicado
    const existeUsuario = await Usuario.findOne( { where : { email } } );

    if(existeUsuario) {
      return res.render('auth/registro', {
          pagina: 'Crear Cuenta3',
          errores: [{ msg: 'El usuario ya esta registrado' }], 
          usuario: {
            nombre: nombre,
            email: email
          }
        });


    }

    // Almacenar un usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      token : generarId() 
    });

    // Enviar correo de confirmacion
    emailRegistro({
      nombre : usuario.nombre,
      email: usuario.email,
      token : usuario.token
    }) 

    // Mostrar mensaje de confirmacion
    res.render('templates/mensaje.pug', {
      pagina: 'Registro Exitoso',
      mensaje: 'Confirme su correo' 
    })

    
}

// Funcion que comprueba una cuenta 
const comprobar = async (req, res) => {
    
    const { token } = req.params;
 
    // Verificar si el token es validor

    const usuario = await Usuario.findOne( { where: {token } } );

    if(!usuario){
      return res.render('auth/confirmar-cuenta.pug', {
        pagina: 'Error al confirmar tu cuenta',
        mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
        error: true
      })      

    }

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta.pug', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente'
      }) 

}


const formlarioRecuperarContraseña = (req,res) => {
  res.render('auth/recuperar', {
    pagina: 'Recuperar Contraseña'
  });
}

const resetPass = async (req, res) => {
     
    // Validacion
    await check('email').isEmail().withMessage('Correo invalido').run(req);
    
    let resultado = validationResult(req);
   
    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
      
      // Errores
      return res.render('auth/recuperar', {
          pagina: 'Recuperar Contraseña',
          errores: resultado.array()
        });

    }

    // Buscar el usuario en la base de datos
    
    const { email } = req.body;

    const usuario = await Usuario.findOne( { where: {email } } );

    if (!usuario){
      // Errores
      return res.render('auth/recuperar', {
          pagina: 'Recuperar Contraseña',
          errores: [{msg : "El correo no pertenece a ningun usuario."}] 
        });
    }
    
    // Generar un token y enviar email
    usuario.token = generarId();
    await usuario.save();

    // Enviar correo de confirmacion
    emailRecuperacion({
      nombre : usuario.nombre,
      email: usuario.email,
      token : usuario.token
    }) 


    // Renderizar una vista
    res.render('templates/mensaje.pug', {
      pagina: 'Restablece tu Contraseña',
      mensaje: 'Revise su correo y siga los pasos' 
    })




  }


// Comprobar token para recuperar contraseña

const comprobarToken = async (req, res) => {

  const { token } = req.params;
 
  const usuario = await Usuario.findOne( { where : {token } } );

  if(!usuario) {

      return res.render('auth/confirmar-cuenta', {
        pagina: 'Reestablece tu contraseña',
        mensaje: 'Hubo un error, intenta de nuevo.',
        error: true
      });
      

  }


 // Formulario para agregar nuevo password

    res.render('auth/reset-password', {
    pagina: 'Reestablece tu contraseña',
    mensaje: 'Hubo un error, intenta de nuevo.',
    error: true
  });
 


}



const nuevoPassword = async (req, res) => {
  
  // Validar password
  await check('password').isLength({ min:6 }).withMessage('Contraseña debil').run(req);


  let resultado = validationResult(req);
   
    //return res.json(resultado.array());

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
      
      // Errores
      return res.render('auth/reset-password', {
          pagina: 'Reestablecer Contraseña',
          errores: resultado.array(),
          usuario: {
            nombre: req.body.nombre,
            email: req.body.email
          }
        });

    }
    
  // Identificar usuario

  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne( { where: { token } } );


  // Hashear nuevo password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  usuario.token = null;

  await usuario.save();

  res.render('auth/confirmar-cuenta',{
    pagina : "Contraseña Actualizada",
    mensaje : 'La contraseña se ha actualizado corrrectamente'
  });


}

const cerrarSesion = (req, res) => {

  return res.clearCookie('_token').status(200).redirect('/auth/login');

}


export {
  formularioLogin,
  autenticar,
  formularioRegistro,
  registrar,
  comprobar, 
  formlarioRecuperarContraseña,
  resetPass,
  comprobarToken,
  nuevoPassword,
  cerrarSesion
}
