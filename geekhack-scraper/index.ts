import db from "../database/initdb";
import { GrabGHGroupBuyLinks, GroupBuyPage } from "./grabGHGroupBuyLinks";
import threadscrape, { PageInfo } from "./threadscrape";
import { SaveToDatabase } from "./saveToDatabase";
import { GroupBuyURL } from "../utils/constants";

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(`Database Error: ${err}`));

(async (): Promise<void> => {
  const ghGBPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(GroupBuyURL);
  // const ghICPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(InterestCheckURL);

  // returns object of threads and object of images in an array
  const ghGbPagesInfo: PageInfo[] = ghGBPages.map((page) => threadscrape(page));
  
  const saveInfo = await SaveToDatabase(ghGbPagesInfo);
})();
