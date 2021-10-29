import { Sequelize } from "sequelize";
import { Environment } from "../utils/constants";

const init = new Sequelize(
  Environment.dbType,
  Environment.dbUser,
  Environment.dbPassword,
  {
    host: Environment.dbHost,
    dialect: Environment.dbDialect,

    pool: {
      max: 1,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default init;