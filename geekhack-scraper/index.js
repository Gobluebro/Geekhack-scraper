const puppeteer = require("puppeteer");
const config = require("./config.json");

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false});
  const threadscrape = require("./threadscrape.js");
  await threadscrape(browser, config.websiteToCrawl);
  await browser.close();
})();
