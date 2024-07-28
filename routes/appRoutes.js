import express from 'express'
import { inicio, categorias, errorFour, buscador } from '../controllers/appControllers.js'

const router = express.Router();


// Pagina de inicio
router.get('/', inicio);

// Categorias
router.get('/categorias/:id', categorias);

// Pagina 404
router.get('/404', errorFour);

// Buscador
// router.get('/buscador/', buscador);
router.post('/buscador/', buscador);

export default router;