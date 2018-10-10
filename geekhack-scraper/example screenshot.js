const puppeteer = require("puppeteer");
const fs = require("fs");
const config = require("./config.json");

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // await page.goto('https://geekhack.org');
  // page.setViewport({ width: 1920, height: 978 });

  await page.goto(config.websiteToCrawl, { waitUntil: "networkidle0" });
  console.log("went to the site");
  const allImagesWithThreadStarter = await page.evaluate(() => {
    let allPosts = document.querySelectorAll(".post_wrapper");
    let wantedImgLinks;
    for (var i = 0; i < allPosts.length; i++) {
      let threadStarterCheck =
        allPosts[i].children[0].children[1].children[1].className;
      if (threadStarterCheck == "threadstarter") {
        // the post of the thread starter
        console.log("threadstarter");
        // https://www.aymen-loukil.com/en/blog-en/google-puppeteer-tutorial-with-examples/
        let wantedPosts = Array.from(
          allPosts[i].children[1].querySelectorAll("img.bbc_img:not(.resized)")
        );
        let wantedImages = wantedPosts.map(img => img.src).slice(0, 10);
        if (typeof wantedImgLinks === "undefined") {
          wantedImgLinks = wantedImages;
        } else {
          wantedImgLinks = wantedImgLinks.concat(wantedImages);
        }
      }
    }
    return wantedImgLinks;
  });

  for (var a = 0; a < allImagesWithThreadStarter.length; a++) {
    let imageURL = allImagesWithThreadStarter[a];
    let matches = /.*\.(jpg|png|gif)$/.exec(imageURL);
    if (matches && matches.length === 2) {
      let extension = matches[1];
      var imageSource = await page.goto(imageURL);
      console.log("went to image");
      fs.writeFile(
        `geekhack-scraper/images/image-${a}.${extension}`,
        await imageSource.buffer(),
        function(err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    }
  }

  // await page.waitForSelector('#jpg', {timeout: 60000});
  // console.log('waited');
  // await page.screenshot({path: 'images/example.png', fullPage: true});
  console.log("done");
  await browser.close();
})();
