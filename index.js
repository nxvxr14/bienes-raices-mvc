import express from 'express'

// Crea la app
const app = express();

// Routing
app.get('/', function(req,res) {
  res.send('Hola mundo en expres');
});

app.get('/nosotros', function(req,res) {
  res.send('Nosotros');
});

// Defnir puerto y arrancar
const port = 3000;

app.listen(port, () => {
  console.log(`Funcionando en ${port}`);
}); 