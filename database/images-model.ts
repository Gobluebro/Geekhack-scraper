import { DataTypes, Model } from "sequelize";
import db from "./initdb";

interface ImagesInstance extends Model {
  id: number;
  thread_id: number;
  name: string;
  url: string;
  is_hidden: boolean;
  order_number: number;
}

const ImagesModel = db.define<ImagesInstance>(
  "images",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    thread_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
    },
    is_hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: "scraped",
    updatedAt: false,
  }
);

export default ImagesModel;
