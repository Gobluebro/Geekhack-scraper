const puppeteer = require("puppeteer");
const fs = require("fs");
const config = require("./config.json");

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // await page.goto('https://geekhack.org');
  page.setViewport({ width: 1920, height: 978 });

  // var firstPost = await page.$(".post_wrapper");
  // var isThreadStarter =
  //   firstPost.children[0].children[1].children[1].className == "threadstarter";
  // await page.evaluate(() => {
  //   if (isThreadStarter) {
  //     // the post of the thread starter
  //     firstPost.children[1];
  //   }
  //   return {};
  // });

  // https://intoli.com/blog/saving-images/
  let counter = 0;
  page.on("response", async response => {
    const matches = /.*\.(jpg)$/.exec(response.url());
    if (matches && matches.length === 2) {
      const extension = matches[1];
      const buffer = await response.buffer();
      fs.writeFileSync(
        `images/image-${counter}.${extension}`,
        buffer,
        "base64"
      );
      counter += 1;
    }
  });
  await page.goto(config.websiteToCrawl, { waitUntil: "domcontentloaded" });
  console.log("went to the site");
  // await page.waitForSelector('#jpg', {timeout: 60000});
  // console.log('waited');
  // await page.screenshot({path: 'images/example.png', fullPage: true});

  await browser.close();
})();
