const Sequelize = require("sequelize");

module.exports = config => {
  const dev = config.development;
  const db = new Sequelize(dev.database, dev.username, dev.password, {
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
  return db;
};
