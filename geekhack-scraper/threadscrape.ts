import axios from "axios";
import { JSDOM } from "jsdom";
import { websiteEnum, topicEnum } from "./utilities";

type thread = {
  id: number;
  website: websiteEnum;
  title: string;
  start: Date;
  scraped: Date;
  updated: Date;
  topic: topicEnum;
  author: string;
};

type image = {
  thread_id: number;
  url: string;
  orderNumber: number;
};

function getFormattedStartDate(dom: JSDOM): number | null {
  // query selctor means this gets the first post
  const firstPostStartDate = dom.window.document.querySelector<HTMLDivElement>(
    ".keyinfo > .smalltext"
  );
  let formattedDate = null;

  if (firstPostStartDate) {
    const temp = firstPostStartDate.innerHTML
      .replace("« <strong> on:</strong> ", "")
      .replace(" »", "");

    try {
      formattedDate = Date.parse(temp);
      if (isNaN(formattedDate)) {
        formattedDate = null;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return formattedDate;
}

function getFormattedTitle(dom: JSDOM): string | undefined {
  // even though HTML Heading Element extends HTMLElement which contains .innerText I am unable to get anything back from it.
  // so I need to use textContent and rip out all tabs and new lines added.
  const title =
    dom.window.document.querySelector<HTMLHeadingElement>("[id^='subject_']");
  const cleanedTitle = title?.textContent
    ?.replace("\n", "")
    .replace("\t", "")
    .replace("[GB]", "")
    .replace("[IC]", "")
    .replace(/\s+/g, " ")
    .trim();

  return cleanedTitle;
}

function getAuthor(dom: JSDOM): string | undefined {
  const authorLink =
    dom.window.document.querySelector<HTMLAnchorElement>(".poster > h4 > a");

  return authorLink?.text;
}

function getFormattedModDate(dom: JSDOM): number | null {
  // There is always a div for the last edit, even if there is no edit.
  // looks something like Last Edit: Tue, 05 March 2019, 08:47:56 by author
  const modDate = dom.window.document.querySelector("[id^='modified_'] > em");

  let formattedDate = null;
  if (modDate) {
    const temp = modDate.textContent?.split("Edit:")[1].split("by")[0];
    if (temp) {
      try {
        formattedDate = Date.parse(temp);
        if (isNaN(formattedDate)) {
          formattedDate = null;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  return formattedDate;
}

export default async (
  url: string
): Promise<{ thread: thread; images: image[] }> => {
  const response = await axios.get(url);
  const dom = new JSDOM(response.data);

  const cleanedStartDate = getFormattedStartDate(dom);

  const cleanedTitle = getFormattedTitle(dom);

  const author = getAuthor(dom);

  const cleanedModDate = getFormattedModDate(dom);

  const allPosts = dom.window.document.querySelectorAll(".post_wrapper");
  let wantedImgLinks = [];

  // limit the amount of posts to just 3 posts max that a threader starter could make
  // trying to catch anything in "reserved" posts
  const limitedPostLength = allPosts.length >= 3 ? 3 : allPosts.length;

  for (let i = 0; i < limitedPostLength; i++) {
    const threadStarterCheck = allPosts[i].querySelector(".threadstarter");
    // is the post made by the threadstarter? get all images links then
    if (threadStarterCheck !== null) {
      let wantedPosts1 = Array.from(
        allPosts[i].querySelectorAll("div.post img.bbc_img:not(.resized)")
      );
      let wantedPosts2 = Array.from(
        allPosts[i].querySelectorAll("[href*='action=dlattach;topic=']")
      );
      wantedPosts1 = wantedPosts1.map((img) => img.src);
      wantedPosts1.forEach((element, index, postArray) => {
        if (
          element.toLowerCase().includes(".jpg") ||
          element.toLowerCase().includes(".png") ||
          element.toLowerCase().includes(".jepg") ||
          element.toLowerCase().includes(".gif")
        ) {
          const regPat = new RegExp(
            /(http(s?):)([/|.|\w|\s|\%|-])*\.(?:jpg|gif|jpeg|png)/g
          );
          let validatedURL = element.match(regPat);
          if (validatedURL != null) {
            validatedURL = validatedURL.join("");
            postArray[index] = validatedURL;
          }
        }
      });
      wantedPosts2 = wantedPosts2.map((url) => url.href);
      wantedPosts2.forEach((element, index, postArray) => {
        const firstIndex = element.indexOf("PHPSESSID");
        const secondIndex = element.indexOf("&");
        const subString = element.substring(firstIndex, secondIndex + 1);
        const replaceString = element.replace(subString, "");
        let validatedURL = replaceString;
        if (
          replaceString.toLowerCase().includes(".jpg") ||
          replaceString.toLowerCase().includes(".png") ||
          replaceString.toLowerCase().includes(".jpeg") ||
          replaceString.toLowerCase().includes(".gif")
        ) {
          const regPat = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|jpeg|png)/g;
          validatedURL = replaceString.match(regPat).join("");
        }

        postArray[index] = validatedURL;
      });

      // ES2015, removing any url that is an imgur album
      // TODO: use imgur api to get images and download them
      wantedPosts2 = wantedPosts2.filter(
        (item) => !item.includes(`imgur.com/a/`)
      );
      const imagesArray = Array.from(
        new Set(wantedPosts1.concat(wantedPosts2))
      );

      wantedImgLinks = wantedImgLinks.concat(imagesArray);
    }
  }
  const urlTopicID = url.split("=")[1].split(".")[0];

  const timeLastScraped = new Date().toUTCString();

  const thread = {
    id: urlTopicID,
    website: websiteEnum.geekhack,
    title: cleanedTitle,
    start: cleanedStartDate,
    scraped: timeLastScraped,
    updated: cleanedModDate,
    topic: topicEnum.GB,
    author,
  };

  const images = wantedImgLinks.map((image: string, index: number) => ({
    thread_id: urlTopicID,
    url: image,
    orderNumber: index,
  }));

  const pageInfo = { thread: thread, images };
  return pageInfo;
};
