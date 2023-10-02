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
    created: {
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
    // technically an enum but we will save these as integers
    keycap_identifier: {
      type: DataTypes.INTEGER,
    },
    post: {
      type: DataTypes.TEXT('long')
    },
  },
  {
    timestamps: false,
  }
);

export default ThreadsModel;
