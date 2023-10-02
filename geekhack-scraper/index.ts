import db from "../database/initdb";
import {
  GrabGHGroupBuyLinks,
  GroupBuyPage,
  getTotalPages,
} from "./grabGHGroupBuyLinks";
import threadscrape from "./threadscrape";
import { SaveToDatabase } from "./saveToDatabase";
import { TopicEnum } from "../utils/constants";
import { PageInfo } from "../utils/types";
import createFolders from "./createFolders";

(async (): Promise<void> => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    // add { force: true } inbetween sync() when messing with new db stuff.
    await db.sync();
  } catch (error) {
    console.error("Database error:", error);
  }
  const totalPages = await getTotalPages(TopicEnum.GB);
  for (let i = 0; i < totalPages; i++) {
    console.log(`Getting page ${i + 1} of GBs`);
    const ghGBPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(
      TopicEnum.GB,
      i
    );
    // const ghICPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(TopicEnum.IC);

    const ghGbPagesInfo: PageInfo[] = ghGBPages.map(page => threadscrape(page));
    createFolders(ghGbPagesInfo);

    console.log(`Saving page ${i + 1} GB info to db`);
    await SaveToDatabase(ghGbPagesInfo);
  }
})();
