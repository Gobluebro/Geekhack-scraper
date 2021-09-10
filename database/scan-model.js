const Sequelize = require("sequelize");
const db = require("./initdb");

const Scan = db.define("scan", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  is_running: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Scan;
