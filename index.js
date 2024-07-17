import express from 'express'

import usuarioRoutes from './routes/usuarioRoutes.js'
import database from './config/db.js'
import cookieParser from 'cookie-parser';

// Crea la app
const app = express();

// Habilita las cookie
app.use(cookieParser());

// Habilitar la lectura de datos de formularios
app.use( express.urlencoded({ extended:true }) );

// Conexion a la base de datos
try {
  await database.authenticate();  
  database.sync();
  console.log('Conexion correcta a la base de datos');
} catch (error) {
    console.log(error);
}

// Habilitar PUG
app.set('view engine', 'pug');
app.set('views', './views')

// Carpeta Publica
app.use( express.static('public') );

// Routing
app.use('/auth', usuarioRoutes);

// Defnir puerto y arrancar
const port = 3000;

app.listen(port, () => {
  console.log(`Funcionando en ${port}`);
}); 