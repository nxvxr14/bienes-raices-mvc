import express from 'express'
import { body } from 'express-validator'
import { admin, crear, guardar } from '../controllers/propiedadController.js'
import protegerRuta from '../middleware/protectRoutes.js';


const router =  express.Router();

router.get('/propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crear)
router.post('/propiedades/crear', protegerRuta, 
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio.'),
    body('descripcion')
    .notEmpty().withMessage('La descripcion es obligatoria.')
    .isLength({max: 200 }).withMessage('La descripcion es muy larga.'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria.'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones.'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos.'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños.'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precio.'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa.'),
    guardar)

export default router