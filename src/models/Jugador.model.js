const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const Jugador = sequelize.define('Jugador', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
});

module.exports = Jugador;