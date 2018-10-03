const puppeteer = require("puppeteer");
const fs = require("fs");
const config = require("./config.json");

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // await page.goto('https://geekhack.org');
  page.setViewport({ width: 1920, height: 978 });

  // https://intoli.com/blog/saving-images/
  // let counter = 0;
  // page.on("response", async response => {
  //   const matches = /.*\.(jpg)$/.exec(response.url());
  //   if (matches && matches.length === 2) {
  //     const extension = matches[1];
  //     const buffer = await response.buffer();
  //     fs.writeFileSync(
  //       `./images/image-${counter}.${extension}`,
  //       buffer,
  //       "base64"
  //     );
  //     counter += 1;
  //   }
  // });
  await page.goto(config.websiteToCrawl, { waitUntil: "networkidle0" });
  console.log("went to the site");
  const allPosts = await page.$$(".post_wrapper");
  await page.evaluate(allPosts => {
    for (var i = 0; i < allPosts.length; i++) {
      var isThreadStarter =
        allPosts[i].children[0].children[1].children[1].className ==
        "threadstarter";
      if (isThreadStarter) {
        // the post of the thread starter
        let counter = 0;
        var images = element.children[1].getElementsByTagName("img");
        images.forEach(function(image) {
          const matches = /.*\.(jpg|png|gif)$/.exec(image);
          if (matches && matches.length === 2) {
            const extension = matches[1];
            fs.writeFileSync(`./images/image-${counter}.${extension}`);
            counter += 1;
          }
        });
      }
    }
  });

  // await page.waitForSelector('#jpg', {timeout: 60000});
  // console.log('waited');
  // await page.screenshot({path: 'images/example.png', fullPage: true});

  await browser.close();
})();
