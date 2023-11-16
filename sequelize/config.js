 const config = {development:  {
    host:'localhost',
    port:5432,
    database:'inventory',
    dialect:'postgres',
    username:'postgres',
    password:'admin',
},
production:{
  host:'localhost',
  port:5432,
  database:'inventory',
  dialect:'postgres',
  username:'postgres',
  password:'admin',
}

}

module.exports = { config }
