module.exports = async function(browser, fs, url) {
  // (async () => {
  const page = await browser.newPage();
  // await page.goto('https://geekhack.org');
  // page.setViewport({ width: 1920, height: 978 });

  await page.goto(url, { waitUntil: "networkidle0" });
  console.log("went to the site");
  const pageStartDate = await page
    .$(
      "#quickModForm > div:nth-child(1) > div > div.postarea > div.flow_hidden > div > div.smalltext"
    )
    .innerHTML.replace("« <strong> on:</strong> ", "")
    .replace(" »", "");
  const pageTitle = await page.$("[id^='subject_']").innerText;
  const urlTopicID = url.split("=")[1];

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

  if (allImagesWithThreadStarter.length == 0) {
  } else {
  }
  for (var a = 0; a < allImagesWithThreadStarter.length; a++) {
    let imageURL = allImagesWithThreadStarter[a];
    // gets the name and extension of the image url.
    let imageRegex = new RegExp(`(?:[^/][\d\w\.]+)+$`);
    ///.*\.(jpg|png|gif)$/
    let imagePathName = imageRegex.exec(imageURL);

    if (imagePathName && imagePathName.length === 2) {
      // let extension = imagePathName[1];
      var imageSource = await page.goto(imageURL);
      fs.writeFile(
        `./images/${urlTopicID}/${imagePathName}`,
        await imageSource.buffer(),
        function(err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    }
    console.log("saved images");
  }

  var json = {
    id: urlTopicID,
    url: url,
    title: pageTitle,
    startdate: pageStartDate
  };
  json = JSON.stringify(json);
  fs.writeFile(`./images/${urlTopicID}/info.json`, json, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("wrote json");
    }
  });

  // await page.waitForSelector('#jpg', {timeout: 60000});
  // console.log('waited');
  // await page.screenshot({path: 'images/example.png', fullPage: true});
  // })();
};
