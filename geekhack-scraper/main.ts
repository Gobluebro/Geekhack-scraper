// import db from "../database/initdb";
import { GrabGHGroupBuyLinks, GroupBuyPage } from "./grabGHGroupBuyLinks";
import threadscrape, { PageInfo } from "./threadscrape";
import { SaveToDatabase } from "./saveToDatabase";
import { GroupBuyURL } from "./utilities";

// db.authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.log(`Database Error: ${err}`));

export default async (): Promise<void> => {
  const ghGBPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(GroupBuyURL);
  // const ghICThreadLinks = await grabGHLinks(InterestCheckURL);

  // returns object of threads and object of images in an array
  const ghGbPagesInfo: PageInfo[] = ghGBPages.map((page) => threadscrape(page));

  const saveInfo = await SaveToDatabase(ghGbPagesInfo);
};
