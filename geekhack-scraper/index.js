const puppeteer = require("puppeteer");
const config = require("./config.json");

(async () => {
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // group buy page
  await page.goto("https://geekhack.org/index.php?board=70.0");
  const threadLinks = await page.evaluate(() => {
    let linkTable = document.querySelector("table.table_grid");
    let linkTableRows = linkTable.querySelectorAll(
      "tr:not(.windowbg2):not(.catbg)"
    );
    let hyperlinks = [];
    for (let i = 0; i < linkTableRows.length; i++) {
      if (!linkTableRows[i].children[0].className.includes("stickybg")) {
        let tempLink =
          linkTableRows[i].children[2].children[0].children[0].children[0].href;
        tempLink =
          "https://geekhack.org/index.php?" +
          tempLink.split("?")[1].split("&")[1];

        hyperlinks.push(tempLink);
      }
    }
    return hyperlinks;
  });
  await page.close();
  const threadscrape = require("./threadscrape.js");
  //the async/await friendly looping through every url
  for (const item of threadLinks) {
    await threadscrape(browser, item);
  }
  console.log("all links visited");
  // await threadscrape(browser, config.websiteToCrawl);
  await browser.close();
})();
