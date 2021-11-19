import { getCleanedGroupBuyLinks } from "../geekhack-scraper/grabGHGroupBuyLinks";
import { JSDOM } from "jsdom";

describe('getCleanedGroupBuyLinks', () => {
    let dom:JSDOM;
    let cleanedLinks:string[]
    beforeAll(async () => {
        dom = await JSDOM.fromFile("./tests/group-buy-links-test-page.html");
        cleanedLinks = getCleanedGroupBuyLinks(dom);
    })
    
    test('check if multiple group buy links exist', () => {
        // Can't expect all of the links to not be sticky posts.
        // So check if it's not just a blank array coming back. 
        expect(cleanedLinks.length).toBeGreaterThanOrEqual(1);
    })

    test('make sure there is no PHPSESSID links', () => {
        const checkIfPHPSessionExists = cleanedLinks.some(link => link.toUpperCase().includes("PHPSESSID"))
        expect(checkIfPHPSessionExists).toBe(false);
    })
})
