import db from "../database/initdb";
import scan from "../database/scan-model";
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

  let currentScan;
  let lastScan = await scan.findOne({ order: [["updated", "DESC"]] });
  if (lastScan?.is_running) {
    currentScan = lastScan;
    lastScan = await scan.findByPk(lastScan.id - 1); // get the scan before this one
  } else {
    currentScan = await scan.create({ is_running: true });
  }

  const totalPages = await getTotalPages(TopicEnum.GB);
  for (let i = 0; i < totalPages; i++) {
    console.log(`Getting page ${i + 1} of GBs`);
    const {
      pages: ghGBPages,
      hitLastScanned,
    }: { pages: GroupBuyPage[]; hitLastScanned: boolean } =
      await GrabGHGroupBuyLinks(TopicEnum.GB, i, lastScan?.updated);
    // const ghICPages: GroupBuyPage[] = await GrabGHGroupBuyLinks(TopicEnum.IC);

    const ghGbPagesInfo: PageInfo[] = ghGBPages.map(page => threadscrape(page));
    createFolders(ghGbPagesInfo);

    console.log(`Saving page ${i + 1} GB info to db`);
    await SaveToDatabase(ghGbPagesInfo);
    if (ghGbPagesInfo.length === 0 || hitLastScanned) break;
  }

  currentScan.is_running = false;
  await currentScan.save();
})();
