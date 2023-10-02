import { Sequelize } from "sequelize";
import { Environment } from "../utils/constants";
import mysql2 from "mysql2"; // Needed to fix sequelize issues with WebPack

const init = new Sequelize(
  Environment.dbName,
  Environment.dbUser,
  Environment.dbPassword,
  {
    dialect: "mysql",
    dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
    host: Environment.dbHost,
    port: Environment.dbPort as number,
  }
);

export default init;
