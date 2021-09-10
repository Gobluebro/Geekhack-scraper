import axios from "axios";
import { JSDOM } from "jsdom";

export const GrabGHGroupBuyLinks = async (url: string): Promise<string[]> => {
  let cleanLinks: string[] = [];
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);

    // There are 50 posts on one page.
    // Looking for subject cell, which is marked by a subject class.
    // Not looking for a stickied post since they don't contain group buys, so filter them out.
    // Each cell contains an empty div, followed by a span marked with an id starting with "msg_"
    // The span contains only a remaining anchor which includes the link to the post.
    const anchorListWithNoStickiedPosts: NodeListOf<HTMLAnchorElement> = dom.window.document.querySelectorAll("td.subject:not(.stickybg) > div > [id^='msg_'] > a");
    
    const urlArray = Array.from(anchorListWithNoStickiedPosts, a => a.href);

    // I don't know what PHPSESSID but I don't like the look of it so remove it.
    const baseLink = "https://geekhack.org/index.php?topic=";
    cleanLinks = urlArray.map(link => baseLink + link?.split('=')[2]);
  } catch (err) {
    console.error(err);
  } finally {
    return cleanLinks;
  }
};
