import db from "../database/initdb";
import { GrabGHGroupBuyLinks, GroupBuyPage } from "./grabGHGroupBuyLinks";
import threadscrape from "./threadscrape";
import { SaveToDatabase } from "./saveToDatabase";
import { TopicEnum } from "../utils/constants";
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
  const ghGBPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(TopicEnum.GB);
  // const ghICPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(TopicEnum.IC);

  const ghGbPagesInfo: PageInfo[] = ghGBPages.map((page) => threadscrape(page));
  createFolders(ghGbPagesInfo);

  await SaveToDatabase(ghGbPagesInfo);
})();
