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
      // is the post made by the threadstarter? get all images links then
      if (threadStarterCheck == "threadstarter") {
        let wantedPosts1 = Array.from(
          allPosts[i].querySelectorAll("div.post img.bbc_img:not(.resized)")
        );
        let wantedPosts2 = Array.from(
          allPosts[i].querySelectorAll("div.post a > img")
        );
        let imagesArray = Array.from(
          new Set(wantedPosts1.concat(wantedPosts2))
        );
        let wantedImages = imagesArray.map(img => img.src);
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

  let urlTopicID = url.split("=")[1].split(".")[0];
  let path = __dirname + `/images/${urlTopicID}`;

  // await page._client.send("Network.enable", {
  //   maxResourceBufferSize: 1024 * 1204 * 100,
  //   maxTotalBufferSize: 1024 * 1204 * 200
  // });

  let timeLastScraped = new Date().toUTCString();

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
    .then(async () => {
      if (threadScrappedInfo.wantedImgLinks.length <= 0) {
        console.log("no images to save");
      } else {
        for (var a = 0; a < threadScrappedInfo.wantedImgLinks.length; a++) {
          let imageURL = threadScrappedInfo.wantedImgLinks[a];
          const regularImageSave = require("./saveImage.js");
          await regularImageSave(imageURL, path, urlTopicID);
        }
        console.log("-------done-------");
      }
    })
    .catch(err => console.log(err));
  await page.close();
};
