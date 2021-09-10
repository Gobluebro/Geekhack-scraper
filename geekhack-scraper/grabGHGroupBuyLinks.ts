import axios from "axios";
import { JSDOM } from "jsdom";

export const GrabGHGroupBuyLinks = async (url: string): Promise<string[]> => {
  let hyperlinks: string[] = [];
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);

    // There are 50 posts on one page.
    // Looking for subject cell, which is marked by a subject class.
    // Not looking for a stickied post since they don't contain group buys, so filter them out.
    // Each cell contains an empty div, followed by a span marked with an id starting with "msg_"
    // The span contains only a remaining anchor which includes the link to the post.
    const anchorNodeListNoStickPosts = dom.window.document.querySelectorAll("td.subject:not(.stickybg) > div > [id^='msg_'] > a");
    const urlArray = Array.from(anchorNodeListNoStickPosts, a => a.getAttribute("href"));

    // for (let i = 0; i < linkTableRows.length; i++) {
    //   if (!linkTableRows[i].children[0].className.includes("stickybg")) {
    //     let tempLink =
    //       linkTableRows[i].children[2].children[0].children[0].children[0].href;
    //     tempLink =
    //       "https://geekhack.org/index.php?" +
    //       tempLink.split("?")[1].split("&")[1];

    //     hyperlinks.push(tempLink);
    //   }
    // }
  } catch (err) {
    console.error(err);
  } finally {
    return hyperlinks;
  }
};
