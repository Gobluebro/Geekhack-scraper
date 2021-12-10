import db from "../database/initdb";
import { GrabGHGroupBuyLinks, GroupBuyPage } from "./grabGHGroupBuyLinks";
import threadscrape from "./threadscrape";
import { SaveToDatabase } from "./saveToDatabase";
import { GroupBuyURL } from "../utils/constants";
import { PageInfo } from "../utils/types";
import createFolders from "./createFolders";

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err: Error) => console.log(`Database Error: ${err}`));

(async (): Promise<void> => {
  const ghGBPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(GroupBuyURL);
  // const ghICPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(InterestCheckURL);

  const ghGbPagesInfo: PageInfo[] = ghGBPages.map((page) => threadscrape(page));
  createFolders(ghGbPagesInfo);

  const saveInfo = await SaveToDatabase(ghGbPagesInfo);
})();
