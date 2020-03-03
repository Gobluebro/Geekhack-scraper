const utils = require("./utilies");
const request = require("request-promise");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async url => {
  let options = {
    uri: url,
    encoding: "latin1"
  };
  let response = await request(options);
  const dom = new JSDOM(response);
  let pageStartDate = dom.window.document
    .querySelector(
      "#quickModForm > div:nth-child(1) > div > div.postarea > div.flow_hidden > div > div.smalltext"
    )
    .innerHTML.replace("« <strong> on:</strong> ", "")
    .replace(" »", "");
  pageStartDate = Date.parse(pageStartDate);
  let title = dom.window.document.querySelector("[id^='subject_']").textContent;
  if (title.includes("\t")) {
    title = title.replace("\t", "");
  }
  if (title.includes("\n")) {
    title = title.replace("\n", "");
  }
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

  // limit the amount of posts to just 3 possible posts a threader starter could make (trying to catch anything in "reserved" posts)
  for (let i = 0; i < 3; i++) {
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
      wantedPosts1.forEach(function(element, index, postArray) {
        if (
          element.toLowerCase().includes(".jpg") ||
          element.toLowerCase().includes(".png") ||
          element.toLowerCase().includes(".jepg") ||
          element.toLowerCase().includes(".gif")
        ) {
          let regPat = new RegExp(
            /(http(s?):)([/|.|\w|\s|\%|-])*\.(?:jpg|gif|jpeg|png)/g
          );
          let validatedURL = element.match(regPat);
          if (validatedURL != null) {
            validatedURL = validatedURL.join("");
            postArray[index] = validatedURL;
          }
        }
      });
      wantedPosts2 = wantedPosts2.map(url => url.href);
      wantedPosts2.forEach(function(element, index, postArray) {
        let firstIndex = element.indexOf("PHPSESSID");
        let secondIndex = element.indexOf("&");
        let subString = element.substring(firstIndex, secondIndex + 1);
        let replaceString = element.replace(subString, "");
        let validatedURL = replaceString;
        if (
          replaceString.toLowerCase().includes(".jpg") ||
          replaceString.toLowerCase().includes(".png") ||
          replaceString.toLowerCase().includes(".jpeg") ||
          replaceString.toLowerCase().includes(".gif")
        ) {
          let regPat = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|jpeg|png)/g;
          validatedURL = replaceString.match(regPat).join("");
        }

        postArray[index] = validatedURL;
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

  let timeLastScraped = new Date().toUTCString();

  console.log("ID = " + urlTopicID);
  let thread = {
    id: urlTopicID,
    website: utils.websiteEnum.geekhack,
    title: title,
    start: pageStartDate,
    scraped: timeLastScraped,
    updated: updateDate,
    topic: utils.topicEnum.GB,
    author: author
  };

  let images = [];
  for (let i = 0; i < wantedImgLinks.length; i++) {
    let image = {
      thread_id: urlTopicID,
      url: wantedImgLinks[i],
      orderNumber: i
    };
    images.push(image);
  }
  let pageInfo = { thread, images };
  console.log("-------done-------");
  return pageInfo;
};
