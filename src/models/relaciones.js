const Partida = require('./Partida.model');
const Jugador = require('./Jugador.model');

Partida.hasMany(Jugador);
Jugador.belongsToMany(Partida);