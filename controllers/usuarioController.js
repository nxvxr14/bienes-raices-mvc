const formularioLogin = (req,res) => {
  res.render('auth/login', {
    pagina: 'Iniciar Sesion'
  });
}

const formularioRegistro = (req,res) => {
  res.render('auth/registro', {
    pagina: 'Crear Cuenta'
  });
}

const formlarioRecuperarContraseña = (req,res) => {
  res.render('auth/recuperar', {
    pagina: 'Recuperar Contraseña'
  });
}

export {
  formularioLogin,
  formularioRegistro,
  formlarioRecuperarContraseña 
}
