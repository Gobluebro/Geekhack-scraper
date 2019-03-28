const puppeteer = require("puppeteer");
const utils = require("./utilies.js");
const db = require("./database/initdb.js");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

(async () => {
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false });

  // geekhack group buy
  const gbLinksGH = require("./grabGHGroupBuyLinks.js");
  let ghGBThreadLinks = await gbLinksGH(browser);

  const threadscrape = require("./threadscrape.js");
  const topicEnum = utils.topicEnum;
  //the async/await friendly looping through every url
  for (const item of ghGBThreadLinks) {
    await threadscrape(browser, item, db, topicEnum.GB);
  }
  console.log("all links visited");
  // await threadscrape(browser, config.websiteToCrawl);
  await browser.close();
})();
