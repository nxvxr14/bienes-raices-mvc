import express from 'express'
import { formlarioRecuperarContraseña, formularioRegistro, autenticar, registrar, comprobar, formularioLogin, resetPass, comprobarToken, nuevoPassword } from '../controllers/usuarioController.js';


const router = express.Router();

// Routing
router.get('/login', formularioLogin );
router.post('/login', autenticar);


router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.post('/recuperar', resetPass );

router.get('/comprobar/:token', comprobar);

router.get('/recuperar', formlarioRecuperarContraseña);

// Almacena un nuevo password
router.get('/recuperar/:token', comprobarToken);
router.post('/recuperar/:token', nuevoPassword);

export default router