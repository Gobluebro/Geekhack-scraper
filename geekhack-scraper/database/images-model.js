const Sequelize = require("sequelize");
const db = require("./initdb.js/index.js");

const Images = db.define("images", {
  image_name: {
    type: Sequelize.STRING
  },
  is_hidden: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Images;
