const { Sequelize } = require('sequelize');
const {config} = require('./config')
const sequelize = new Sequelize(config.development)
const connection= async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
}

module.exports = { sq: sequelize, connection };