
var express = require('express');
var router = express.Router();
var db = require("../conexion/conexion");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* GET home page. */
router.get('/agregar', function(req, res, next) {
  res.render('agregar', { title: 'Express' });
});

/* GET home page. */
router.get('/editar/:ID', function(req, res, next) {
  const ID = req.params.ID;
  db.query("SELECT * FROM Juegos WHERE ID = ?",[ID],(error,resultado)=>{
    console.log(resultado);
    res.render('editar', { title: 'Express',Keys:resultado[0] });
  })
});

router.get('/productos', function(req, res, next) {
  db.query("SELECT * FROM Juegos", function(err,resultado){
    console.log(resultado);
    res.render('productos', { title: 'Catalogo', Keys:resultado });
  });
});

const crud = require('../metodos/crud');
router.post('/save', crud.save);
router.post('/edit', crud.edit);
router.post('/auth', crud.auth);

router.get('/eliminar/:ID', (req, res)=>{
  const ID = req.params.ID;
  db.query('DELETE FROM Juegos WHERE ID = ?', [ID],
  function(error, resultado){
    if(error){
      console.log(error);
    }
    else{
        res.redirect('/productos');
    }
  });
});

module.exports = router;
