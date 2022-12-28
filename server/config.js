const dotenv = require('dotenv');
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

console.log('MODO: ' + process.env.NODE_ENV);

const config = {
  NODE_ENV : process.env.NODE_ENV || 'desarrollo',
  PORT : process.env.PORT || 8080,
  DAO: process.env.DAO || 'MONGODB',      //-> MEMORIA, ARCHIVO, SQLITE3, MARIADB, MONGODB
  MODO:process.env.MODO || 'FORK',
  MAIL:process.env.MAIL || 'gabriel.coderhouse@gmail.com',
  MAIL_PASS: process.env.PASS||'aogykttgwnphvkcz',
  TWILIO_SID:process.env.TWILIO_SID ||'AC97f9b64f90a65c0123106933d1d7c7bc',
  TWILIO_TOKEN:process.env.TWILIO_TOKEN ||'7ee9a2c85f2f3ab9f108b12850e00c38',
  SESSION_MIN: process.env.SESSION_MIN || 10,
  SESSION_SECRET:process.env.SESSION_SECRET || 'shh',
  JWT_SECRET:process.env.JWT_SECRET || 'myprivatekey'
}


/* ------------ MARIA DB ------------ */

const mariadbConfig = {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "ecommerce",
    },
}

/* ------------ SQLITE 3 ------------ */

const sqlite3Config = {
    client: "sqlite3",
    connection: {
      filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true,
}

/* ------------ MONGO DB ------------ */
let mongodbConfig = null;

  if(process.env.NODE_ENV === 'desarrollo'){
    mongodbConfig = 'mongodb://localhost:27017/ecommerce';
  }else{
    mongodbConfig = 'mongodb+srv://gabriel:gabriel@cluster0.9qtkfe7.mongodb.net/ecommerce?retryWrites=true&w=majority';
  }



/* ------------- EXPORTS ------------ */

exports.config = config;
exports.mariadbConfig = mariadbConfig;
exports.sqlite3Config = sqlite3Config;
exports.mongodbConfig = mongodbConfig;