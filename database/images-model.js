const Sequelize = require("sequelize");
const db = require("../database/initdb.js");

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
    },
    order_number: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: true,
    createdAt: "scraped",
    updatedAt: false
  }
);

module.exports = Images;
