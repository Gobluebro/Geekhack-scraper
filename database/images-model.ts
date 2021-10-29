import { DataTypes } from "sequelize/types";
import db from "./initdb";

const Images = db.define(
  "images",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    thread_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    is_hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    order_number: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: "scraped",
    updatedAt: false,
  }
);

export default Images;
