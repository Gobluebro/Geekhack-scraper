const db = require("../database/initdb");
const gbLinksGH = require("./grabGHGroupBuyLinks");
const threadscrape = require("./threadscrape");
const thread = require("./saveThread");
const downloadImages = require("./getImagesForDatabase");
const saveImagesToDatabase = require("./saveImage");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

(async () => {
  let ghGBThreadLinks = await gbLinksGH();
  let allPagesThreadInfo = [];
  let allPagesImagesInfo = [];
  for (let i = 0; i < ghGBThreadLinks.length; i++) {
    console.log("going to " + ghGBThreadLinks[i]);
    const pageInfo = await threadscrape(ghGBThreadLinks[i]);
    allPagesThreadInfo.push(pageInfo.thread);
    allPagesImagesInfo.push(pageInfo.images);
  }
  const saveThread = await thread(allPagesThreadInfo);
  const imagesToSaveInDatabase = await downloadImages(allPagesImagesInfo);
  const blah = await saveImagesToDatabase(imagesToSaveInDatabase);
})();
