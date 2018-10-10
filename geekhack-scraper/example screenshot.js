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
  // const allPosts = page.$$(".post_wrapper");

  // try this https://www.aymen-loukil.com/en/blog-en/google-puppeteer-tutorial-with-examples/
  await page.goto(config.websiteToCrawl, { waitUntil: "networkidle0" });
  console.log("went to the site");
  const allPostsWithThreadStarter = await page.evaluate(() => {
    let allPosts = document.querySelectorAll(".post_wrapper");
    let wantedPosts;
    let wantedImages;
    for (var i = 0; i < allPosts.length; i++) {
      let threadStarterCheck =
        allPosts[i].children[0].children[1].children[1].className;
      if (threadStarterCheck == "threadstarter") {
        // the post of the thread starter
        console.log("threadstarter");
        wantedPosts += allPosts[i].children[1].getElementsByTagName("img");
        for (let b = 0; b < wantedPosts.length; b++) {
          wantedImages += wantedPosts[b].src;
          console.log(wantedPosts[b].src);
        }
      }
    }
    return wantedImages;
  });
  // var images = element.children[1].getElementsByTagName("img");

  for (var a = 0; a < allPostsWithThreadStarter.length; a++) {
    let imageURL = allPostsWithThreadStarter[a];
    let matches = /.*\.(jpg|png|gif)$/.exec(imageURL);
    if (matches && matches.length === 2) {
      let extension = matches[1];
      fs.writeFileSync(`./images/image-${a}.${extension}`);
    }
    // const matches = /.*\.(jpg|png|gif)$/.exec(image);
    // if (matches && matches.length === 2) {
    //   const extension = matches[1];
    //   fs.writeFileSync(`./images/image-${counter}.${extension}`);
    //   counter += 1;
    // }
  }

  // await page.waitForSelector('#jpg', {timeout: 60000});
  // console.log('waited');
  // await page.screenshot({path: 'images/example.png', fullPage: true});
  console.log("done");
  await browser.close();
})();
