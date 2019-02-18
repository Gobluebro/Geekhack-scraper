const Sequelize = require("sequelize");
const db = require("./initdb.js/index.js");

const Images = db.define("images", {
  id: {
    type: Sequelize.INTEGER
  },
  thread_id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  is_hidden: {
    type: Sequelize.BOOLEAN
  },
  scraped: {
    type: Sequelize.DATE
  }
});

module.exports = Images;
