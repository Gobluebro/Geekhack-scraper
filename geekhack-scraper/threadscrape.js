const utils = require("./utilies");
const threads = require("../database/threads-model");
const request = require("request-promise");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async (url, isLast) => {
  let options = {
    uri: url,
    encoding: "latin1"
  };
  var response = await request(options);
  const dom = new JSDOM(response);
  let pageStartDate = dom.window.document
    .querySelector(
      "#quickModForm > div:nth-child(1) > div > div.postarea > div.flow_hidden > div > div.smalltext"
    )
    .innerHTML.replace("« <strong> on:</strong> ", "")
    .replace(" »", "");
  pageStartDate = Date.parse(pageStartDate);
  let title = dom.window.document.querySelector("[id^='subject_']").textContent;
  if (title.includes("[GB]" || "[IC]")) {
    title = title
      .replace("[GB]", "")
      .replace("[IC]", "")
      .replace(/\s+/g, " ")
      .trim();
  }
  let allPosts = dom.window.document.querySelectorAll(".post_wrapper");
  let wantedImgLinks = [];
  let author = allPosts[0].children[0].children[0].children[1].text;
  // looks something like Last Edit: Tue, 05 March 2019, 08:47:56 by author
  let modDatePost = allPosts[0]
    .querySelector("[id^='modified_']")
    .textContent.trim();
  let replaced = modDatePost.replace("Last Edit: ", "");
  var res = replaced.split(" by")[0].replace("« ", "");
  let updateDate = Date.parse(res);
  if (isNaN(updateDate)) {
    updateDate = null;
  }

  for (var i = 0; i < allPosts.length; i++) {
    let threadStarterCheck;
    if (
      allPosts[i].children[0].children[1].children[1].className == "membergroup"
    ) {
      threadStarterCheck =
        allPosts[i].children[0].children[1].children[2].className;
    } else {
      threadStarterCheck =
        allPosts[i].children[0].children[1].children[1].className;
    }
    // is the post made by the threadstarter? get all images links then
    if (threadStarterCheck === "threadstarter") {
      let wantedPosts1 = Array.from(
        allPosts[i].querySelectorAll("div.post img.bbc_img:not(.resized)")
      );
      let wantedPosts2 = Array.from(
        allPosts[i].querySelectorAll("[href*='action=dlattach;topic=']")
      );
      wantedPosts1 = wantedPosts1.map(img => img.src);
      wantedPosts2 = wantedPosts2.map(url => url.href);
      wantedPosts2.forEach(function(element, index, postArray) {
        let firstIndex = element.indexOf("PHPSESSID");
        let secondIndex = element.indexOf("&");
        let subString = element.substring(firstIndex, secondIndex + 1);
        let replaceString = element.replace(subString, "");
        postArray[index] = replaceString;
      });

      //ES2015, removing any url that is an imgur album
      //TODO: use imgur api to get images and download them
      wantedPosts2 = wantedPosts2.filter(
        item => !item.includes(`imgur.com/a/`)
      );
      let imagesArray = Array.from(new Set(wantedPosts1.concat(wantedPosts2)));

      wantedImgLinks = wantedImgLinks.concat(imagesArray);
    }
  }
  let urlTopicID = url.split("=")[1].split(".")[0];
  let path = __dirname + `/../website/src/assets/images/${urlTopicID}`;

  let timeLastScraped = new Date().toUTCString();

  console.log("ID = " + urlTopicID);

  // need to set the thread first since images uses the ID as a FK
  // upsert http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
  await threads.upsert({
    id: urlTopicID,
    website: utils.websiteEnum.geekhack,
    title: title,
    start: pageStartDate,
    topic: utils.topicEnum.GB,
    scraped: timeLastScraped,
    updated: updateDate,
    author: author
  });
  // .then(async () => {

  // })
  // .catch(err => {
  //   console.log("error upserting thread " + urlTopicID);
  //   console.error(err);
  // });
  if (wantedImgLinks.length <= 0) {
    console.log("no images to save");
  } else {
    var isTrueLast = false;
    for (var a = 0; a < wantedImgLinks.length; a++) {
      let imageURL = wantedImgLinks[a];
      if (isLast && a === wantedImgLinks.length - 1) {
        isTrueLast = true;
      }
      const regularImageSave = require("./saveImage");
      await regularImageSave(imageURL, path, urlTopicID, isTrueLast);
    }
    console.log("-------done-------");
  }
};
