import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

// Crea la app
const app = express();

// Routing
app.get('/', usuarioRoutes);
app.get('/nosotros', usuarioRoutes);

// Defnir puerto y arrancar
const port = 3000;

app.listen(port, () => {
  console.log(`Funcionando en ${port}`);
}); 