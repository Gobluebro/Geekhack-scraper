import { DataTypes, Model } from "sequelize";
import db from "./initdb";

interface ImagesInstance extends Model {
  id: number;
  thread_id: number;
  name: string;
  url: string;
  is_hidden: boolean;
  sort_order: number;
}

const ImagesModel = db.define<ImagesInstance>(
  "images",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    thread_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    is_hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
    },
    blob: {
      type: DataTypes.BLOB,
    },
  },
  {
    timestamps: true,
    createdAt: "scraped",
    updatedAt: false,
  }
);

export default ImagesModel;
