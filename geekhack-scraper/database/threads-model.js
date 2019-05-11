const Sequelize = require("sequelize");
const db = require("../database/initdb.js");

const Threads = db.define("thread", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
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
