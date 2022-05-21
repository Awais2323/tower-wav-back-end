const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
  HOST: "us-cdbr-east-05.cleardb.net",
  USER: "b79ac077dca2a5",
  PASSWORD: "de80cc52",
  DB: "heroku_14f574871f9493b",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};