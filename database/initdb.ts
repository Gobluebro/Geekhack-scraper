import { Sequelize } from "sequelize";
import { Environment } from "../utils/constants";

const init = new Sequelize(`${Environment.dbDialect}://${Environment.dbUser}:${Environment.dbPassword}@${Environment.dbHost}:${Environment.dbPort}/${Environment.dbName}`);

export default init;