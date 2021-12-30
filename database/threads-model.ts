import { DataTypes, Model } from "sequelize";
import db from "./initdb";
//https://sequelize.org/master/manual/typescript.html#usage

interface ThreadsInstance extends Model {
  id: number;
  website: string;
  title: string;
  start: Date;
  scraped: Date;
  updated: Date;
  topic: number;
  author: string;
}
const ThreadsModel = db.define<ThreadsInstance>(
  "threads",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    website: {
      type: DataTypes.INTEGER,
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

export default ThreadsModel;
