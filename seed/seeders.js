import categorias from "./categorias.js"
import precios from "./precios.js"
import database from '../config/db.js'
import { Categoria, Precio } from '../models/index.js'

const impotarDatos = async () => {
    try {
       
        // Autenticar
       await database.authenticate();
       

       // Generar columnas
        await database.sync();


       // Insertar los datos
     
       await Promise.all([
        Categoria.bulkCreate(categorias),
        Precio.bulkCreate(precios)
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
        await Promise.all([

            Categoria.destroy({where: {}, truncate: true}),
            Precio.destroy({where: {}, truncate: true})

        ]);

        // Para un borrado fuerte
        // await database.sync({force: true});

        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === "-i"){
    impotarDatos();

}


if(process.argv[2] === "-e"){
    eliminarDatos();
;}