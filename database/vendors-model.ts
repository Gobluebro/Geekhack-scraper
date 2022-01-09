import { DataTypes, Model } from "sequelize";
import db from "./initdb";

interface VendorsInstance extends Model {
  id: number;
  thread_id: number;
  location: string;
  url: string;
}

const VendorsModel = db.define<VendorsInstance>(
  "vendors",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    thread_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // technically an enum but we will save these as integers
    location: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
  },
  {
    createdAt: true,
    // maybe I want to update them later? I am not sure.
    updatedAt: false,
  }
);

export default VendorsModel;
