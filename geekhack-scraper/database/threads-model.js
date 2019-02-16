const Sequelize = require("sequelize");
const db = require("../config/database");

const Threads = db.define("threads", {
  id: {
    type: Sequelize.INTEGER
  },
  website: {
    type: Sequelize.ENUM
  },
  title: {
    type: Sequelize.STRING
  },
  threadstart: {
    type: Sequelize.DATE
  },
  threadscraped: {
    type: Sequelize.DATE
  },
  threadupdate: {
    type: Sequelize.DATE
  },
  topic: {
    type: Sequelize.ENUM
  }
});

module.exports = Threads;
