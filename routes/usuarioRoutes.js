import express from 'express'

const router = express.Router();

// Routing
router.get('/', function(req,res) {
  res.send('Hola mundo en express');
});

router.get('/nosotros', function(req,res) {
  res.send('Nosotros');
});

export default router