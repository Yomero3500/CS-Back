const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Jugador = require('../routers/jugador.route');
const Partida = require('../routers/partida.route');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/players', Jugador);
app.use('/match', Partida);

app.get('/', (req, res) => {
    res.json("servidor inicializado");
  });
  
  module.exports = app;