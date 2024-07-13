import express from 'express'
import { formlarioRecuperarContraseña, formularioRegistro, formularioLogin } from '../controllers/usuarioController.js';


const router = express.Router();

// Routing
router.get('/login', formularioLogin );
router.get('/registro', formularioRegistro);
router.get('/recuperar', formlarioRecuperarContraseña);

export default router