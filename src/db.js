const {Sequelize} = require("sequelize");  

const sequelize = new Sequelize("tiendita", "root", "MicheladA212", {
    host : "localhost",
    dialect : "mysql"
});

module.exports = sequelize;