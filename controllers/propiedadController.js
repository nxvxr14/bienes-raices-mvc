import { validationResult } from 'express-validator'
import{ unlink } from 'node:fs/promises'
import { Precio, Categoria, Propiedad } from '../models/index.js' 

const admin = async (req, res) => {

      const {id} = req.usuario;

      const propiedades = await Propiedad.findAll({
            where: {
                  usuarioId: id
            },

            include: [
                  {model: Categoria, as: 'categoria'},
                  {model: Precio, as: 'precio'}
            ]
      });


      res.render("propiedades/admin", {
            pagina : 'Mis propiedades',
            propiedades: propiedades
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
          categorias,
          precios,
          errores: resultado.array(),
          datos: req.body
       });

    }

    
    // Crear registro

    const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio:precioId, categoria:categoriaId } = req.body

    const { id:usuarioId, nombre, email } = req.usuario;

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
            categoriaId ,
            usuarioId,
            imagen: ''
      });

      const {id} = propiedadAlmacenada;

      res.redirect(`/propiedades/agregar-imagen/${id}`);

    } catch (error) {
      console.log(error);
    }

}


const agregarImagen = async (req, res) => {

      const {id} = req.params;

      // Validar que la propiedad exista
      const propiedad = await Propiedad.findByPk(id);

      if(!propiedad) {
            return res.redirect('/propiedades');
      }

      // Validar que la propiedad no este publicada
      if(propiedad.publicado) {
            return res.redirect('/propiedades');
      }

      // Validar que la propiedad pertenece a quien visita esa pagina
      if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
            return res.redirect('/propiedades');
      }




      res.render('propiedades/agregar-imagen', {
            pagina: `Agregar Imagenes de ${propiedad.titulo}`,
            propiedad

      });


      
}


const almacenarImagen = async (req, res, next) =>{

      
      const {id} = req.params;

      // Validar que la propiedad exista
      const propiedad = await Propiedad.findByPk(id);

      if(!propiedad) {
            return res.redirect('/propiedades');
      }

      // Validar que la propiedad no este publicada
      if(propiedad.publicado) {
            return res.redirect('/propiedades');
      }

      // Validar que la propiedad pertenece a quien visita esa pagina
      if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
            return res.redirect('/propiedades');
      }


      try {

            // Almacenar la imagen y publicar propiedad
            propiedad.imagen = req.file.filename;

            propiedad.publicado = 1;

            await propiedad.save();

            next();

            
      } catch (error) {
            console.log(error)
            
      }

}


const editarPropiedad = async (req, res) => {

      
      const {id} = req.params;

      // Validar que la propiedad exista
      const propiedad = await Propiedad.findByPk(id);

      if(!propiedad){
            return res.redirect('/propiedades');
      }

      // Revisa que el id de la propiedad sea la misma del usuario
      if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
            return res.redirect('/propiedades');

      }

      // Consular modelo de precio y categoria
      const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
      ]);

      res.render("propiedades/editar", {
            pagina : 'Editar Propiedad',
            categorias,
            precios,
            datos: propiedad 
      })

}

const guardarCambiosE = async (req, res) => {
     
      // Validacion
      let resultado = validationResult(req);

      if(!resultado.isEmpty()) {
      

      // Consular modelo de precio y categoria
      const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
      ]);


      // Errores
      return res.render("propiedades/editar", {
            pagina : 'Editar Propiedad',
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
      })

    }

      // Validacon con base de datos
      const {id} = req.params;

      // Validar que la propiedad exista
      const propiedad = await Propiedad.findByPk(id);

      if(!propiedad){
            return res.redirect('/propiedades');
      }

      // Revisa que el id de la propiedad sea la misma del usuario
      if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
            return res.redirect('/propiedades');

      }

      // Reescribir el objeto y actualizarlo

      try {

            const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio:precioId, categoria:categoriaId } = req.body

            propiedad.set({
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

            await propiedad.save();

            res.redirect('/propiedades');


      } catch (error) {
            console.log(error);
            
      }

} 


const eliminar = async (req, res) => {

      // Validacon con base de datos
      const {id} = req.params;

      // Validar que la propiedad exista
      const propiedad = await Propiedad.findByPk(id);

      if(!propiedad){
            return res.redirect('/propiedades');
      }

      // Revisa que el id de la propiedad sea la misma del usuario
      if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
            return res.redirect('/propiedades');

      }

      // Check if there's an image associated with the property
      if (propiedad.imagen) {
      // Attempt to delete the associated image
      await unlink(`public/uploads/${propiedad.imagen}`);
      }

      // Eliminar la propiedad
      await propiedad.destroy();
      res.redirect("/propiedades");

}

export {
      admin, 
      crear,
      guardar,
      agregarImagen,
      almacenarImagen,
      editarPropiedad,
      guardarCambiosE,
      eliminar
}