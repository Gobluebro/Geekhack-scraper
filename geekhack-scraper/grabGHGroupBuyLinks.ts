import axios from "axios";
import { JSDOM } from "jsdom";

export interface GroupBuyPage {
  PageLink: string;
  BodyDom: JSDOM;
}

export const GrabGHGroupBuyLinks = async (
  gbUrl: string
): Promise<GroupBuyPage[]> => {
  let pages: GroupBuyPage[] = [];

  try {
    const response = await axios.get(gbUrl);
    const dom = new JSDOM(response.data);

    // There are 50 posts on one page.
    // We are looking for the link to the group buy.
    // So we get the td that includes the link. It is marked by a subject class.
    // Stickied posts have separate classes, so we want the windowbg2 class.
    // Each td contains an empty div, followed by a span, then by a url for the group buy.
    const anchorListWithNoStickiedPosts: NodeListOf<HTMLAnchorElement> =
      dom.window.document.querySelectorAll(
        ".subject.windowbg2 > div > span > a"
      );

    const urlArray = Array.from(anchorListWithNoStickiedPosts, (a) => a.href);

    // I don't know what PHPSESSID but I don't like the look of it so remove it.
    const baseLink = "https://geekhack.org/index.php?topic=";
    const cleanLinks: string[] = urlArray.map((link) => baseLink + link?.split("=")[2]);

    const threadDoms: JSDOM[] = await Promise.all(
      cleanLinks.map(async (link) => {
        const response = await axios.get(link);
        const dom = new JSDOM(response.data);
        return dom;
      })
    );

    pages = cleanLinks.map((link, index) => {
      return { PageLink: link, BodyDom: threadDoms[index] };
    });
  } catch (err) {
    console.error(err);
  }

  return pages;
};
