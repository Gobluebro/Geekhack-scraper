import { config } from "dotenv";
config();

export enum TopicEnum {
  IC,
  GB,
}

export enum WebsiteEnum {
  geekhack,
  // scrape others in the future
}

const basicGeekhackURL = "https://geekhack.org/index.php?board=";
export const GroupBuyURL: string = basicGeekhackURL + "70.0";
export const InterestCheckURL: string = basicGeekhackURL + "132.0";

export const Environment = {
  serverPort: process.env.SERVER_PORT || "",
  dbType: process.env.DB_TYPE || "",
  dbName: process.env.DB_NAME || "",
  dbHost: process.env.DB_HOST || "",
  dbPort: process.env.DB_PORT || "",
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASS || "",
  dbDialect: process.env.DB_DIALECT,
  imagePath: process.env.IMAGES_PATH || "",
};
