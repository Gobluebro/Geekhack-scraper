const Sequelize = require("sequelize");
const config = require("../config.json");
const dev = config.development;

module.exports = new Sequelize(dev.database, dev.username, dev.password, {
  host: dev.host,
  dialect: dev.dialect,
  operatorsAliases: false,

  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
