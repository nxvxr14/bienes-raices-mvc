import express from 'express'
import { body } from 'express-validator'
import { admin, crear, guardar, agregarImagen, almacenarImagen, editarPropiedad, guardarCambiosE} from '../controllers/propiedadController.js'
import protegerRuta from '../middleware/protectRoutes.js';
import upload from '../middleware/subirImagen.js';


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


router.get(`/propiedades/agregar-imagen/:id`,
    protegerRuta,
     agregarImagen
    );


router.post(`/propiedades/agregar-imagen/:id`, 
    
    protegerRuta,
    upload.single('imagen'),
    almacenarImagen);


router.get('/propiedades/editar/:id',
    protegerRuta,
    editarPropiedad
);


router.post('/propiedades/editar/:id',
    protegerRuta,

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
   guardarCambiosE 
    
    
);


export default router