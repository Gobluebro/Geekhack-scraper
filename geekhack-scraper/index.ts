import db from "../database/initdb";
import { GrabGHGroupBuyLinks, GroupBuyPage } from "./grabGHGroupBuyLinks";
import threadscrape from "./threadscrape";
import { SaveToDatabase } from "./saveToDatabase";
import { GroupBuyURL } from "../utils/constants";
import { PageInfo } from "../utils/types";
import createFolders from "./createFolders";

(async (): Promise<void> => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    await db.sync();
  } catch (error) {
    console.error("Database error:", error);
  }
  const ghGBPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(GroupBuyURL);
  // const ghICPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(InterestCheckURL);

  const ghGbPagesInfo: PageInfo[] = ghGBPages.map((page) => threadscrape(page));
  createFolders(ghGbPagesInfo);

  await SaveToDatabase(ghGbPagesInfo);
})();
