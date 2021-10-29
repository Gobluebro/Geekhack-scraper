import { DataTypes } from "sequelize/types";
import db from "./initdb";

// TODO: still not sure if I want to go through with this.
const Scan = db.define("scan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  is_running: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Scan;
