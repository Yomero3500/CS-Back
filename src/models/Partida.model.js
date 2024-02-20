const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Jugador = require('./Jugador.model');

const Partida = sequelize.define("Partida", {
    id_partida: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    palabra: {
        type: DataTypes.STRING
    },
    letras_encontradas:{
        type: DataTypes.STRING
    },
    intentos_restantes:{
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.STRING
    },
    id_participante1: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        refences: {
            model: Jugador,
            key: 'jugador1',
        }
    },
    id_participante2: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        refences: {
            model: Jugador,
            key: 'jugador2',
        }
    },
    id_participante3: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        refences: {
            model: Jugador,
            key: 'jugador3',
        }
    }
});

module.exports = Partida;