import { JSDOM } from "jsdom";
import { TopicEnum, WebsiteEnum } from "../utils/constants";
import { Image, PageInfo, Thread } from "../utils/types";
import { GroupBuyPage } from "./grabGHGroupBuyLinks";

export function getAuthor(dom: JSDOM): string {
  const authorLink =
    dom.window.document.querySelector<HTMLAnchorElement>(".poster > h4 > a");

  if (authorLink) {
    return authorLink.text;
  }

  return "";
}

export function getFormattedStartDate(dom: JSDOM): Date | null {
  // query selctor means this gets the first post
  const firstPostStartDate = dom.window.document.querySelector<HTMLDivElement>(
    ".keyinfo > .smalltext"
  );
  let formattedDate = null;

  if (firstPostStartDate) {
    const temp = firstPostStartDate.innerHTML
      .replace("« <strong> on:</strong> ", "")
      .replace(" »", "");
    formattedDate = new Date(temp);
  }

  return formattedDate;
}

export function getFormattedModDate(dom: JSDOM): Date | null {
  // There is always a div for the last edit, even if there is no edit.
  // looks something like Last Edit: Tue, 05 March 2019, 08:47:56 by author
  const modDate = dom.window.document.querySelector("[id^='modified_'] > em");

  let formattedDate = null;

  if (modDate) {
    const temp = modDate.textContent?.split("Edit:")[1].split("by")[0];
    if (temp) {
      formattedDate = new Date(temp);
    }
  }

  return formattedDate;
}

export function getFormattedTitle(dom: JSDOM): string | undefined {
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

export function getImageLinks(dom: JSDOM): (string | undefined)[] {
  const allPosts: Array<HTMLDivElement> = Array.from(
    dom.window.document.querySelectorAll<HTMLDivElement>(".post_wrapper")
  );
  const limitedPostLength = allPosts.length >= 3 ? 3 : allPosts.length;
  const firstThreePosts = allPosts.slice(0, limitedPostLength);
  //slice this into 3 instead and then map
  const imgLinks = firstThreePosts.map(
    (post: HTMLDivElement): (string | undefined)[] => {
      let imageLinks: (string | undefined)[] = [];
      const threadStarterCheck = post.querySelector(".threadstarter");
      // is the post made by the threadstarter? get all images links then
      if (threadStarterCheck !== null) {
        // TODO: collect some URLs for testing this to make sure all wanted images come back.
        const allImgElements = Array.from(
          post.querySelectorAll<HTMLImageElement>(
            ".post img.bbc_img:not(.resized), img:not(.resized)[src*='action=dlattach;topic=']"
          )
        );

        imageLinks = allImgElements.map((img: HTMLImageElement) => {
          if (img.src.includes("PHPSESSID")) {
            // looks something like ?PHPSESSID= with a GUID and then &action
            const firstIndex = img.src.indexOf("PHPSESSID");
            const secondIndex = img.src.indexOf("&");
            const subString = img.src.substring(firstIndex, secondIndex + 1);

            return img.src.replace(subString, "");
          } else {
            return img.src;
          }
        });
      }
      return imageLinks;
    }
  );
  // remove array of arrays, and remove empty strings
  const flattenedImgLinkArray = imgLinks.flat().filter((link) => {
    return link;
  });
  // remove duplicates
  return [...new Set(flattenedImgLinkArray)];
}

export default (page: GroupBuyPage): PageInfo => {
  const imageLinks = getImageLinks(page.BodyDom);
  const urlTopicID = parseInt(page.PageLink.split("=")[1].split(".")[0], 10);

  const thread: Thread = {
    id: urlTopicID,
    website: WebsiteEnum.geekhack,
    title: getFormattedTitle(page.BodyDom),
    start: getFormattedStartDate(page.BodyDom),
    scraped: new Date(),
    updated: getFormattedModDate(page.BodyDom),
    topic: TopicEnum.GB,
    author: getAuthor(page.BodyDom),
  };

  const images = imageLinks.map(
    (image: string | undefined, index: number): Image => ({
      thread_id: urlTopicID,
      url: image,
      sort_order: index,
    })
  );

  const pageInfo: PageInfo = { thread: thread, image: images };
  return pageInfo;
};
