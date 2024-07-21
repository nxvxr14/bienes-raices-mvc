import categorias from "./categorias.js"
import precios from "./precios.js"
import usuarios from "./usuarios.js"
import database from '../config/db.js'
import { Categoria, Precio, Propiedad, Usuario } from '../models/index.js'

const impotarDatos = async () => {
    try {
       
        // Autenticar
       await database.authenticate();
       

       // Generar columnas
        await database.sync();


       // Insertar los datos
     
       await Promise.all([
        Categoria.bulkCreate(categorias),
        Precio.bulkCreate(precios),
        Usuario.bulkCreate(usuarios),

       ]) 
       
       console.log("Datos Importados Correctamente");
        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const eliminarDatos = async () => {
    try {
        
        await database.sync({force: true});
        
        console.log("Datos eliminados correctamente");
        process.exit(0);

    } catch (error) {
        console.error("Error al eliminar datos:", error);
        process.exit(1);
    }
}


if(process.argv[2] === "-i"){
    impotarDatos();
;}


if(process.argv[2] === "-e"){
    eliminarDatos();
;}