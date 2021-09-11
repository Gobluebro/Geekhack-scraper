// import db from "../database/initdb";
import { GrabGHGroupBuyLinks } from "./grabGHGroupBuyLinks";
import threadscrape from "./threadscrape";
// import thread from "./saveThread";
// import downloadImages from "./getImagesForDatabase";
// import saveImagesToDatabase from "./saveImage";
import { GroupBuyURL } from "./utilities";

// db.authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.log(`Database Error: ${err}`));

export default async (): Promise<void> => {
  const ghGBThreadLinks = await GrabGHGroupBuyLinks(GroupBuyURL);
  // const ghICThreadLinks = await grabGHLinks(InterestCheckURL);
  const allPagesThreadInfo = [];
  const allPagesImagesInfo = [];
  for (const threadLink in ghGBThreadLinks) {
    console.log(`going to ${threadLink}`);
    const pageInfo = await threadscrape(threadLink);
    allPagesThreadInfo.push(pageInfo.thread);
    allPagesImagesInfo.push(pageInfo.images);
  }
  // const saveThread = await thread(allPagesThreadInfo);
  // const imagesToSaveInDatabase = await downloadImages(allPagesImagesInfo);
  // const saveImages = await saveImagesToDatabase(imagesToSaveInDatabase);
};
