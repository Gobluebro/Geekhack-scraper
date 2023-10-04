import { JSDOM } from "jsdom";
import {
  GroupBuyURL,
  InterestCheckURL,
  TopicEnum,
  postsPerPage,
} from "../utils/constants";

export interface GroupBuyPage {
  pageLink: string;
  pageTitle: string;
  pageTopic: TopicEnum;
  bodyDom: JSDOM;
}

export const getTotalPages = async (topic: TopicEnum): Promise<number> => {
  const url = topic === TopicEnum.GB ? GroupBuyURL : InterestCheckURL;
  const dom = await JSDOM.fromURL(url);
  const pageLinks: Array<number> = Array.from(
    dom.window.document.querySelectorAll(".pagelinks > a")
  )
    .map(value => parseInt(value.textContent || ""))
    .filter(value => !isNaN(value));
  return Math.max(...pageLinks);
};

export function getCleanedPageLinksAndTitleAndDate (dom: JSDOM) {
  const anchorListWithNoStickiedPosts: NodeListOf<HTMLAnchorElement> =
    dom.window.document.querySelectorAll(".subject.windowbg2 > div > span > a");
  const dateListWithNoStickiedPosts = dom.window.document.querySelectorAll(
    ".lastpost.windowbg2"
  );

  // use this to remove PHPSESSID from the link.
  const baseLink = "https://geekhack.org/index.php?topic=";

  const urlArray = Array.from(anchorListWithNoStickiedPosts, (a, i) => {
    const date =
      dateListWithNoStickiedPosts[i].querySelector("br")?.previousSibling
        ?.textContent;
    return {
      link: baseLink + a.href.split("=")[2],
      title: a.textContent || "",
      date: date ? new Date(date) : null,
    };
  });

  return urlArray;
}

export const GrabGHGroupBuyLinks = async (
  topic: TopicEnum,
  page: number,
  since?: Date
) => {
  let pages: GroupBuyPage[] = [];
  let hitLastScanned = false;

  try {
    const url =
      (topic === TopicEnum.GB ? GroupBuyURL : InterestCheckURL) +
      "." +
      page * postsPerPage;
    const dom = await JSDOM.fromURL(url);

    // There are 50 posts on one page.
    // We are looking for the link to the group buy.
    // So we get the td that includes the link. It is marked by a subject class.
    // Stickied posts have separate classes, so we want the windowbg2 class.
    // Each td contains an empty div, followed by a span, then by a url for the group buy.
    const threads: {
      link: string;
      title: string;
      date: Date | null;
    }[] = getCleanedPageLinksAndTitleAndDate(dom).filter(thread => {
      if (since === undefined || thread.date === null || thread.date >= since) {
        return true;
      } else if (thread.date < since) {
        hitLastScanned = true;
      }
      return false;
    });

    const threadDoms: JSDOM[] = await Promise.all(
      threads.map(async thread => {
        const dom = await JSDOM.fromURL(thread.link);
        return dom;
      })
    );

    pages = threads.map((thread, index) => {
      return {
        pageLink: thread.link,
        pageTitle: thread.title,
        pageTopic: topic,
        bodyDom: threadDoms[index],
      };
    });
  } catch (err) {
    console.error(err);
  }

  return { pages: pages, hitLastScanned: hitLastScanned };
};
