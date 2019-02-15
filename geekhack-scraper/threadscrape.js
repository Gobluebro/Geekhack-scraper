const fs = require("fs");
const mkdirp = require("mkdirp");
const download = require("download");

module.exports = async function(browser, url, db, topic) {
  // (async () => {

  const page = await browser.newPage();
  // await page.goto('https://geekhack.org');
  // page.setViewport({ width: 1920, height: 978 });

  await page.goto(url, { waitUntil: "networkidle0" });
  console.log("went to the site");
  const pageStartDate = await page.evaluate(() =>
    document
      .querySelector(
        "#quickModForm > div:nth-child(1) > div > div.postarea > div.flow_hidden > div > div.smalltext"
      )
      .innerHTML.replace("« <strong> on:</strong> ", "")
      .replace(" »", "")
  );
  const pageTitle = await page.evaluate(
    () => document.querySelector("[id^='subject_']").innerText
  );
  const urlTopicID = url.split("=")[1].split(".")[0];
  console.log("ID = " + urlTopicID);

  const allImagesWithThreadStarter = await page.evaluate(() => {
    let allPosts = document.querySelectorAll(".post_wrapper");
    let wantedImgLinks = [];
    for (var i = 0; i < allPosts.length; i++) {
      let threadStarterCheck;
      if (
        allPosts[i].children[0].children[1].children[1].className ==
        "membergroup"
      ) {
        threadStarterCheck =
          allPosts[i].children[0].children[1].children[2].className;
      } else {
        threadStarterCheck =
          allPosts[i].children[0].children[1].children[1].className;
      }

      if (threadStarterCheck == "threadstarter") {
        // the post of the thread starter
        console.log("threadstarter");
        // https://www.aymen-loukil.com/en/blog-en/google-puppeteer-tutorial-with-examples/
        let wantedPosts = Array.from(
          allPosts[i].children[1].querySelectorAll("img.bbc_img:not(.resized)")
        );
        let wantedImages = wantedPosts.map(img => img.src).slice(0, 10);
        wantedImgLinks = wantedImgLinks.concat(wantedImages);
      }
    }
    return wantedImgLinks;
  });

  let path = __dirname + `/images/${urlTopicID}`;

  if (!fs.existsSync(path)) {
    mkdirp(path, function(err) {
      if (err) console.log(err);
      else console.log("directory created");
    });
  }

  await page._client.send("Network.enable", {
    maxResourceBufferSize: 1024 * 1204 * 100,
    maxTotalBufferSize: 1024 * 1204 * 200
  });

  if (allImagesWithThreadStarter.length <= 0) {
    console.log("no images to save");
  } else {
    for (var a = 0; a < allImagesWithThreadStarter.length; a++) {
      let imageURL = allImagesWithThreadStarter[a];
      if (imageURL.includes("photobucket.com")) {
        continue;
      }
      var isHeaderRequiredLink = false;
      if (
        !imageURL.includes(".jpg") &&
        !imageURL.includes(".png") &&
        !imageURL.includes(".jpeg") &&
        !imageURL.includes(".gif")
      ) {
        if (
          imageURL.includes("googleusercontent") ||
          imageURL.includes("topic=" + urlTopicID + ".0;attach=")
        ) {
          isHeaderRequiredLink = true;
        } else {
          continue;
        }
      }

      if (isHeaderRequiredLink) {
        console.log(
          "it's an images link that requires header info to determine the name"
        );
        const responseHeaderSave = require("./responseHeaderSaveImage.js");
        await responseHeaderSave(page, imageURL, path);
      } else {
        // gets the name and extension of the image url.
        let imageRegex = new RegExp("(?:[^/][\\d\\w\\.]+)+$", "g");
        ///.*\.(jpg|png|gif)$/
        let imageName = imageRegex.exec(imageURL);
        // possibly due to bad url eg:http:/[Imgur](https:/i.imgur.com/something.jpg)
        if (imageName != null) {
          if (imageName[0].includes("?")) {
            imageName[0] = imageName[0].split("?")[0];
          }

          if (imageName && imageName.length === 1) {
            // let extension = imagePathName[1];
            let newPath = path + `/${imageName[0]}`;
            if (!fs.existsSync(newPath)) {
              download(imageURL)
                .then(data => {
                  fs.writeFileSync(newPath, data);
                  console.log(imageName + " saved");
                  const image = Images.build({
                    imagename: imageName,
                    ishidden: false
                  });
                  db.images.Upsert;
                })
                .catch(err => {
                  console.log(
                    "failed to download at " +
                      imageURL +
                      " on thread number " +
                      urlTopicID
                  );
                  console.error(err);
                });
              //const standardSaveImage = require("./responseBufferSaveImage.js");
              //await standardSaveImage(fs, page, newPath, imageURL);
            }
          }
        }
      }
    }
  }

  await page.close();
  let timeUpdated = new Date().toUTCString();
  // db stuff here instead
  // upsert http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert

  var json = {
    id: urlTopicID,
    url: url,
    title: pageTitle,
    startdate: pageStartDate,
    lastupdated: timeUpdated,
    topic: topic
  };
  json = JSON.stringify(json);
  fs.writeFile(path + `/info.json`, json, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("wrote json");
    }
  });
  console.log("-------done-------");
  // await page.waitForSelector('#jpg', {timeout: 60000});
  // console.log('waited');
  // await page.screenshot({path: 'images/example.png', fullPage: true});
  // })();
};
