const db = require("../database/initdb");
const grabGHLinks = require("./grabGHGroupBuyLinks");
const threadscrape = require("./threadscrape");
const thread = require("./saveThread");
const downloadImages = require("./getImagesForDatabase");
const saveImagesToDatabase = require("./saveImage");
const utils = require("./utilies");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Database Error: " + err));

module.exports = async () => {
  let ghGBThreadLinks = await grabGHLinks(utils.GroupBuyURL);
  //let ghICThreadLinks = await grabGHLinks(utils.InterestCheckURL);
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
  const saveImages = await saveImagesToDatabase(imagesToSaveInDatabase);
};
