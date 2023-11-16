const { Sequelize } = require("sequelize");

const database =  {
    host:'localhost',
    port:5432,
    database:'inventory',
    dialect:'postgres',
    username:'postgres',
    password:'admin',
};

const sequelize = new Sequelize(database)
const connection= async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
}

module.exports = { sq: sequelize, connection };