const Sequelize = require("sequelize");
const db = require("../config/database");

const Threads = db.define("threads", {
  id: {
    type: Sequelize.INTEGER
  },
  website: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  start: {
    type: Sequelize.DATE
  },
  scraped: {
    type: Sequelize.DATE
  },
  update: {
    type: Sequelize.DATE
  },
  topic: {
    type: Sequelize.INTEGER
  },
  author: {
    type: Sequelize.STRING
  }
});

module.exports = Threads;
