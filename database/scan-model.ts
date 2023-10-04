import { DataTypes, Model } from "sequelize";
import db from "./initdb";

interface ScanInstance extends Model {
  id: number;
  is_running: boolean;
  updated: Date;
  created: Date;
}

const ScanModel = db.define<ScanInstance>(
  "scan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // TODO: not sure if I will use this
    is_running: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    createdAt: "created",
    updatedAt: "updated",
  }
);

export default ScanModel;
