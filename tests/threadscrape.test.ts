import { JSDOM } from "jsdom";
import { beforeAll, describe, expect, test } from "@jest/globals";
import {
  getAuthor,
  getFormattedModDate,
  getFormattedStartDate,
  getFormattedTitle,
  getImageLinks,
  getVendors,
} from "../geekhack-scraper/threadscrape";

// some issues with tests taking a while to run when getting doms for beforeAll.
jest.setTimeout(30000);

describe("threadscape", () => {
  let dom: JSDOM;
  let extraImageCheckDom: JSDOM;
  let keycapGbDom: JSDOM;
  beforeAll(async () => {
    dom = await JSDOM.fromURL("https://geekhack.org/index.php?topic=92066.0");
    extraImageCheckDom = await JSDOM.fromURL(
      "https://geekhack.org/index.php?topic=115405"
    );
    keycapGbDom = await JSDOM.fromURL(
      "https://geekhack.org/index.php?topic=115099.0"
    );
  });

  test("getAuthor returns the author of the thread", () => {
    const author = getAuthor(dom);

    expect(author).toBe("xondat");
  });

  test("getFormattedStartDate returns the date when the thread was started", () => {
    const mockDate = new Date("Fri, 13 October 2017, 21:52:42");
    const startDate = getFormattedStartDate(dom);

    expect(startDate).toEqual(mockDate);
  });

  test("getFormattedModDate returns the date when the thread was modified", () => {
    const mockDate = new Date("Fri, 24 April 2020, 16:08:01");
    const modDate = getFormattedModDate(dom);

    expect(modDate).toEqual(mockDate);
  });

  test("getFormattedTitle returns the title of the thread", () => {
    const title = getFormattedTitle(dom);

    expect(title).toBe("Noxary 268 (100% Shipped)");
  });

  test("getImageLinks returns an array of image links on the thread", () => {
    const expectedImageLinks = [
      "https://i.imgur.com/rwqp3Au.jpg",
      "https://i.imgur.com/CXEJ4sn.jpg",
      "https://i.imgur.com/N3owNLK.jpg",
      "https://i.imgur.com/ETQAiNS.png",
      "https://i.imgur.com/dF6UXLZ.png",
    ];

    const imageLinks = getImageLinks(dom);

    expect(imageLinks).toEqual(expect.arrayContaining(expectedImageLinks));

    const expectedGHUploadedImageLink = [
      "https://geekhack.org/index.php?action=dlattach;topic=115405.0;attach=279004;image",
    ];

    const extraImageLink = getImageLinks(extraImageCheckDom);

    expect(extraImageLink).toEqual(
      expect.arrayContaining(expectedGHUploadedImageLink)
    );
  });

  test("getVendors returns the vendors on the thread page", () => {
    const expectedVendors = [
      {
        thread_id: 115099,
        location: "UK",
        url: "https://prototypist.net/collections/live-group-buys/products/group-buy-gmk-panda",
      },
      {
        thread_id: 115099,
        location: "SEA",
        url: "https://ilumkb.com/products/gmk-panda",
      },
      {
        thread_id: 115099,
        location: "KR",
        url: "https://swagkeys.com/products/gb-gmk-panda",
      },
      {
        thread_id: 115099,
        location: "CA",
        url: "https://www.ashkeebs.com/product/gmk-panda-keycaps/",
      },
      {
        thread_id: 115099,
        location: "EU",
        url: "https://candykeys.com/group-buys/gmk-panda",
      },
      {
        thread_id: 115099,
        location: "OCE",
        url: "https://www.switchkeys.com.au/products/gmk-panda-group-buy",
      },
      {
        thread_id: 115099,
        location: "CN",
        url: "https://www.zfrontier.com/app/mch/BpVxweVJ896l",
      },
      {
        thread_id: 115099,
        location: "IN",
        url: "https://rectangles.store/products/group-buy-gmk-panda",
      },
      {
        thread_id: 115099,
        location: "NA",
        url: "https://vala.supply/products/gmk-panda",
      },
    ];

    const vendors = getVendors(keycapGbDom, 115099);

    expect(vendors).toEqual(expectedVendors);
  });
});
