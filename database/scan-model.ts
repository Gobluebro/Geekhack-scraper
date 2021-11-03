import { DataTypes, Model } from "sequelize/types";
import db from "./initdb";

interface ScanInstance extends Model {
  id: number;
  is_running: boolean;
}

// TODO: still not sure if I want to go through with this.
const ScanModel = db.define<ScanInstance>("scan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  is_running: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default ScanModel;
