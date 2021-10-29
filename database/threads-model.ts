import { DataTypes } from "sequelize";
import db from "./initdb";
//https://sequelize.org/master/manual/typescript.html#usage
const Threads = db.define(
  "threads",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    website: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    title: {
      type: DataTypes.STRING,
    },
    start: {
      type: DataTypes.DATE,
    },
    scraped: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    },
    topic: {
      type: DataTypes.INTEGER,
    },
    author: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Threads;
