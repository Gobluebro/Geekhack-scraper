const Sequelize = require("sequelize");
const db = require("./initdb.js/index.js");

const Images = db.define("images", {
  imagename: {
    type: Sequelize.STRING
  },
  ishidden: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Images;
