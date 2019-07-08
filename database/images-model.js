const Sequelize = require("sequelize");
const db = require("./initdb.js.js");

const Images = db.define(
  "images",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    thread_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    is_hidden: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: true,
    createdAt: "scraped",
    updatedAt: false
  }
);

module.exports = Images;
