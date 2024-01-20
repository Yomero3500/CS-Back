const {Sequelize} = require("sequelize");  

const sequelize = new Sequelize("Sys", "root", "MicheladA212", {
    host : "localhost",
    dialect : "mysql"
});

module.exports = sequelize;