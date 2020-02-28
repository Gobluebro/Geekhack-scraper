const db = require("../database/initdb");
const gbLinksGH = require("./grabGHGroupBuyLinks");
const threadscrape = require("./threadscrape");
const thread = require("./saveThread");
const images = require("./saveImage");

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
  let promises = [];
  for (let x = 0; x < allPagesImagesInfo.length; x++) {
    for (let y = 0; y < allPagesImagesInfo[x].urls.length; y++) {
      promises.push(
        images(
          allPagesImagesInfo[x].urls[y],
          allPagesImagesInfo[x].thread_id,
          y
        )
      );
    }
  }
  Promise.all(promises).then(console.log("all links visited"));
})();
