import { JSDOM } from "jsdom";

export interface GroupBuyPage {
  pageLink: string;
  pageTitle: string;
  bodyDom: JSDOM;
}

export function getCleanedPageLinksAndTitle(dom: JSDOM) {
  const anchorListWithNoStickiedPosts: NodeListOf<HTMLAnchorElement> =
    dom.window.document.querySelectorAll(".subject.windowbg2 > div > span > a");

  // use this to remove PHPSESSID from the link.
  const baseLink = "https://geekhack.org/index.php?topic=";

  const urlArray = Array.from(anchorListWithNoStickiedPosts, (a) => {
    return {
      link: baseLink + a.href.split("=")[2],
      title: a.textContent || "",
    };
  });

  return urlArray;
}

export const GrabGHGroupBuyLinks = async (
  gbUrl: string
): Promise<GroupBuyPage[]> => {
  let pages: GroupBuyPage[] = [];

  try {
    const dom = await JSDOM.fromURL(gbUrl);

    // There are 50 posts on one page.
    // We are looking for the link to the group buy.
    // So we get the td that includes the link. It is marked by a subject class.
    // Stickied posts have separate classes, so we want the windowbg2 class.
    // Each td contains an empty div, followed by a span, then by a url for the group buy.
    const threads: {
      link: string;
      title: string;
    }[] = getCleanedPageLinksAndTitle(dom);

    const threadDoms: JSDOM[] = await Promise.all(
      threads.map(async (thread) => {
        const dom = await JSDOM.fromURL(thread.link);
        return dom;
      })
    );

    pages = threads.map((thread, index) => {
      return {
        pageLink: thread.link,
        pageTitle: thread.title,
        bodyDom: threadDoms[index],
      };
    });
  } catch (err) {
    console.error(err);
  }

  return pages;
};
