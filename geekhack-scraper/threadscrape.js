const fs = require("fs");
const mkdirp = require("mkdirp");
const utils = require("./utilies.js");
const threads = require("./database/threads-model.js");

module.exports = async function(browser, url) {
  // (async () => {

  const page = await browser.newPage();
  // page.setViewport({ width: 1920, height: 978 });

  await page
    .goto(url, { waitUntil: "networkidle0" })
    .then(console.log("went to the site"));

  // this is an object of all the values we are looking to get back from the page through javascript
  const threadScrappedInfo = await page.evaluate(() => {
    let pageStartDate = document
      .querySelector(
        "#quickModForm > div:nth-child(1) > div > div.postarea > div.flow_hidden > div > div.smalltext"
      )
      .innerHTML.replace("« <strong> on:</strong> ", "")
      .replace(" »", "");
    let title = document.querySelector("[id^='subject_']").innerText;
    if (title.includes("[GB]" || "[IC]")) {
      title = title
        .replace("[GB]", "")
        .replace("[IC]", "")
        .trim();
    }
    let allPosts = document.querySelectorAll(".post_wrapper");
    let wantedImgLinks = [];
    let author = allPosts[0].children[0].children[0].children[1].text;
    // looks something like Last Edit: Tue, 05 March 2019, 08:47:56 by author
    let modDatePost = allPosts[0].querySelector("[id^='modified_']").innerText;
    let replaced = modDatePost.replace("Last Edit: ", "");
    var res = replaced.split(" by");
    let moddate = Date.parse(res[0]);

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
        // https://www.aymen-loukil.com/en/blog-en/google-puppeteer-tutorial-with-examples/
        let wantedPosts = Array.from(
          allPosts[i].children[1].querySelectorAll("img.bbc_img:not(.resized)")
        );
        let wantedImages = wantedPosts.map(img => img.src);
        wantedImgLinks = wantedImgLinks.concat(wantedImages);
      }
    }
    let threadInfo = {
      author,
      moddate,
      pageStartDate,
      title,
      wantedImgLinks
    };
    return threadInfo;
  });

  let path = __dirname + `/images/${urlTopicID}`;

  if (!fs.existsSync(path)) {
    mkdirp(path, function(err) {
      if (err) console.log(err);
      else console.log("directory created");
    });
  }

  // await page._client.send("Network.enable", {
  //   maxResourceBufferSize: 1024 * 1204 * 100,
  //   maxTotalBufferSize: 1024 * 1204 * 200
  // });

  let timeLastScraped = new Date().toUTCString();
  let urlTopicID = url.split("=")[1].split(".")[0];

  let pageStartDate = threadScrappedInfo.pageStartDate;

  let updateDate = threadScrappedInfo.moddate;
  let author = threadScrappedInfo.author;
  console.log("ID = " + urlTopicID);
  // need to set the thread first since images uses the ID as a FK
  // upsert http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
  threads
    .upsert({
      id: urlTopicID,
      website: utils.websiteEnum.geekhack,
      title: threadScrappedInfo.title,
      start: pageStartDate,
      topic: utils.topicEnum.GB,
      scraped: timeLastScraped,
      updated: updateDate,
      author: author
    })
    .catch(err => console.log(err));

  if (threadScrappedInfo.wantedImgLinks.length <= 0) {
    console.log("no images to save");
  } else {
    for (var a = 0; a < threadScrappedInfo.wantedImgLinks.length; a++) {
      let imageURL = threadScrappedInfo.wantedImgLinks[a];
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
        const regularImageSave = require("./regularSaveImage.js");
        await regularImageSave(imageURL, path, urlTopicID);
      }
    }
  }

  await page.close();
  console.log("-------done-------");
};
