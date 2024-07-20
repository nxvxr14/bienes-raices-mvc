import { validationResult } from 'express-validator'
import { Precio, Categoria, Propiedad } from '../models/index.js' 

const admin = (req, res) => {

      res.render("propiedades/admin", {
            pagina : 'Mis propiedades',
            barra : true
      })
}

const crear = async (req, res) => {

      // Consular modelo de precio y categoria
      const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
      ]);

      res.render("propiedades/crear", {
            pagina : 'Crear Propiedad',
            barra : true,
            categorias,
            precios,
            datos: {}
      })
}

const guardar = async (req, res) => {

      // Validacion
      let resultado = validationResult(req);

      if(!resultado.isEmpty()) {
      

      // Consular modelo de precio y categoria
      const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
      ]);


      // Errores
      return res.render('propiedades/crear', {
          pagina: 'Crear Propiedad',
          barra: true,
          categorias,
          precios,
          errores: resultado.array(),
          datos: req.body
       });

    }

    
    // Crear registro

    const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio:precioId, categoria:categoriaId } = req.body

    try {
      
      const propiedadAlmacenada = await Propiedad.create({
            titulo,
            descripcion, 
            habitaciones, 
            estacionamiento, 
            wc, 
            calle, 
            lat, 
            lng,
            precioId,
            categoriaId 

      });

    } catch (error) {
      console.log(error);
    }

}



export {
      admin, 
      crear,
      guardar
}