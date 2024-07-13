import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

// Crea la app
const app = express();

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