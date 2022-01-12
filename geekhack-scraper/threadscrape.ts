import { JSDOM } from "jsdom";
import { WebsiteEnum } from "../utils/constants";
import { Image, PageInfo, Thread, Vendor } from "../utils/types";
import { GroupBuyPage } from "./grabGHGroupBuyLinks";
import { VendorsList } from "../utils/vendors";
import { Region, Regions } from "../utils/regions";
import { KeycapIdentifier, KeycapInfo, KeycapInfoType } from "../utils/keycaps";

export function getAuthor(dom: JSDOM): string {
  const authorLink =
    dom.window.document.querySelector<HTMLAnchorElement>(".poster > h4 > a");

  if (authorLink) {
    return authorLink.text;
  }

  return "";
}

export function getBrand(title: string): KeycapInfoType | undefined {
  const formattedTitle = title
    .replace("[GB]", "")
    .replace("[IC]", "")
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .trim();

  const guessBrand = KeycapInfo.find(
    (keycap) =>
      formattedTitle.includes(` ${keycap.searchTerm}`) ||
      formattedTitle.includes(`${keycap.searchTerm} `)
  );

  return guessBrand;
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

export function getFormattedTitle(title: string): string {
  const cleanedTitle = title
    .replace("\n", "")
    .replace("\t", "")
    .replace("[GB]", "")
    .replace("[IC]", "")
    .replace(/\s+/g, " ")
    .trim();

  return cleanedTitle;
}

export function getImageLinks(dom: JSDOM): string[] {
  const allPosts: Array<HTMLDivElement> = Array.from(
    dom.window.document.querySelectorAll<HTMLDivElement>(".post_wrapper")
  );
  // some people had their first post which was the main part of the images, then they had reserved the posts after for other things such as update images.
  const limitedPostLength = allPosts.length >= 3 ? 3 : allPosts.length;
  const firstThreePosts = allPosts.slice(0, limitedPostLength);
  //slice this into 3 instead and then map
  const imageLinks: string[] = [];
  for (const post of firstThreePosts) {
    const threadStarterCheck = post.querySelector(".threadstarter");
    // only get images from the thread starter
    if (threadStarterCheck !== null) {
      const allImgElements: NodeListOf<HTMLImageElement> =
        post.querySelectorAll<HTMLImageElement>(
          ".post img.bbc_img:not(.resized), img:not(.resized)[src*='action=dlattach;topic=']"
        );

      for (const imageElement of allImgElements) {
        // we cannot download a whole album at the moment. TODO see imgurAPISaveImage.ts
        if (imageElement.src.includes("imgur.com/a/")) {
          continue;
        }
        if (imageElement.src.includes("PHPSESSID")) {
          // looks something like ?PHPSESSID= with a GUID and then &action
          const firstIndex = imageElement.src.indexOf("PHPSESSID");
          const secondIndex = imageElement.src.indexOf("&");
          const subString = imageElement.src.substring(
            firstIndex,
            secondIndex + 1
          );

          imageLinks.push(imageElement.src.replace(subString, ""));
        } else {
          imageLinks.push(imageElement.src);
        }
      }
    }
  }
  // remove duplicates
  return [...new Set(imageLinks)];
}

function tryGetSiblingOrParent(
  isPrevious: boolean,
  currentVendor: {
    names: string[];
    urls: string[];
    locations: Region[];
  },
  foundVendor: HTMLAnchorElement
): Region {
  // attempt to find it if it was labeled with bolded lettering, stop search at max cut off or if we hit a br tag.
  const maxCutOff = 5;
  let element: any = foundVendor;
  for (let i = 0; i < maxCutOff; i++) {
    if (element.tagName === "DIV") {
      break;
    }

    const siblingElement = isPrevious
      ? element.previousSibling
      : element.nextSibling;

    const siblingText = isPrevious
      ? element.previousSibling?.textContent
      : element.nextSibling?.textContent;

    if (siblingElement) {
      if (siblingText) {
        const vendorGuess = tryToGuessVendor(currentVendor, siblingText);
        if (vendorGuess !== Region.NoRegion) {
          return vendorGuess;
        }
      }
      element = siblingElement;
      continue;
    } else if (element.parentElement && element.parentElement.textContent) {
      if (element.parentElement.textContent.length > 50) {
        break;
      }
      const vendorGuess = tryToGuessVendor(
        currentVendor,
        element.parentElement.textContent
      );
      if (vendorGuess !== Region.NoRegion) {
        return vendorGuess;
      } else {
        element = element.parentElement;
        continue;
      }
    }
  }
  return Region.NoRegion;
}

export function tryToGuessVendor(
  currentVendor: {
    names: string[];
    urls: string[];
    locations: Region[];
  },
  foundVendor: string
): Region {
  // removes everything but letters and periods. you will generally find a user will add some symbol between the location and the link.
  const tempVendorGuess = foundVendor
    .replace(/[^\w\s.]/g, " ")
    .toLowerCase()
    .trim();

  // we match the region from the vendor to the list of name of locations in that region.
  // then put them in an array of locations all together.
  const vendorRegions = Regions.filter(({ region }) => {
    const location = currentVendor.locations.find(
      (location) => region === location
    );
    if (location) {
      return location;
    }
  });

  for (const region of vendorRegions) {
    for (const vendorLocation of region.names) {
      // check if the string and vendor match before we start removing other text.
      if (
        tempVendorGuess.includes(` ${vendorLocation}`) ||
        tempVendorGuess.includes(`${vendorLocation} `) ||
        vendorLocation === tempVendorGuess
      ) {
        return region.region;
      }
      let skipRest = false;
      // remove any url from the text.
      for (const url of currentVendor.urls) {
        const urlGuessAttempt = tempVendorGuess.replace(url, "").trim();
        // if there is nothing left, then this won't have what we are looking for and we will only get false positives as we go forward.
        if (urlGuessAttempt === "") {
          skipRest = true;
          break;
        }
        if (urlGuessAttempt !== tempVendorGuess) {
          if (
            tempVendorGuess.includes(` ${vendorLocation}`) ||
            tempVendorGuess.includes(`${vendorLocation} `) ||
            tempVendorGuess === vendorLocation
          ) {
            return region.region;
          }
        }
      }

      if (skipRest) {
        break;
      }

      // remove any names found in the text.
      for (const name of currentVendor.names) {
        const tempName = name
          .replace(/[^\w\s!?]/g, " ")
          .toLowerCase()
          .trim();
        const nameGuessAttempt = tempVendorGuess.replace(tempName, "").trim();
        // if there is nothing left, then this won't have what we are looking for and we will only get false positives as we go forward.
        if (nameGuessAttempt === "") {
          break;
        }
        if (nameGuessAttempt !== tempVendorGuess) {
          if (
            tempVendorGuess.includes(` ${vendorLocation}`) ||
            tempVendorGuess.includes(`${vendorLocation} `) ||
            tempVendorGuess === vendorLocation
          ) {
            return region.region;
          }
        }
      }
    }
  }
  return Region.NoRegion;
}

export function getVendors(dom: JSDOM, urlTopicID: number): Vendor[] {
  const scrappedVendors: Vendor[] = [];

  // it is unlikely that vendors will appear in anything but the first post so use that as our dom.
  const firstPost =
    dom.window.document.querySelector<HTMLDivElement>(".post_wrapper");

  for (const vendor of VendorsList) {
    for (const url of vendor.urls) {
      // first post could possibly be null in theory if the styling changed but it hasn't since I started this.
      // this css selector looks for anchor elements with bbc_link as the class.
      // then it looks at the href to see if any part of it contains something from our list of urls.
      const foundVendor = firstPost?.querySelector<HTMLAnchorElement>(
        `a.bbc_link[href*='${url}'`
      ); // do I want more than 1? querySelectorAll could provide me with multiple links in the case of 102849 which would mean I would get the right one on the second try
      if (foundVendor) {
        let location = Region.NoRegion;

        location = tryGetSiblingOrParent(true, vendor, foundVendor);

        if (location === Region.NoRegion) {
          location = tryGetSiblingOrParent(false, vendor, foundVendor);
        }

        // try to find it in the text of the anchor.
        if (location === Region.NoRegion) {
          const locationAnchorTextGuess = tryToGuessVendor(
            vendor,
            foundVendor.text
          );
          location = locationAnchorTextGuess;
        }

        const scrappedVendor: Vendor = {
          thread_id: urlTopicID,
          location,
          url: foundVendor.href,
        };

        scrappedVendors.push(scrappedVendor);
      }
    }
  }

  return scrappedVendors;
}

export default (page: GroupBuyPage): PageInfo => {
  const imageLinks = getImageLinks(page.bodyDom);
  const urlThreadId = parseInt(page.pageLink.split("=")[1], 10);
  const keycapInfo = getBrand(page.pageTitle);

  const thread: Thread = {
    id: urlThreadId,
    website: WebsiteEnum.geekhack,
    title: getFormattedTitle(page.pageTitle),
    start: getFormattedStartDate(page.bodyDom),
    scraped: new Date(),
    updated: getFormattedModDate(page.bodyDom),
    topic: page.pageTopic,
    author: getAuthor(page.bodyDom),
    keycap_identifier: keycapInfo?.type || KeycapIdentifier.Unknown,
  };

  const images = imageLinks.map(
    (image: string, index: number): Image => ({
      thread_id: urlThreadId,
      url: image,
      sort_order: index,
    })
  );

  const vendors = getVendors(page.bodyDom, urlThreadId);

  const pageInfo: PageInfo = {
    thread: thread,
    images: images,
    vendors: vendors,
  };
  return pageInfo;
};
