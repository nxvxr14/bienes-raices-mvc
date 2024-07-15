import express from 'express'
import { formlarioRecuperarContraseña, formularioRegistro, registrar, comprobar, formularioLogin } from '../controllers/usuarioController.js';


const router = express.Router();

// Routing
router.get('/login', formularioLogin );
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/comprobar/:token', comprobar);
router.get('/recuperar', formlarioRecuperarContraseña);

export default router