 require('dotenv').config()

 const config=  {
    host:process.env.HOSTNAME,
    port:5432,
    database:process.env.DATABASE,
    dialect:'postgres',
    username:process.env.USERNAME,
    password:process.env.PASSWORD,
}

module.exports = { config }
