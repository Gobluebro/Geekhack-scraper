import { getCleanedGroupBuyLinks } from "../geekhack-scraper/grabGHGroupBuyLinks";
import axios from 'axios'
import nock from 'nock';
import { GroupBuyURL } from "../utils/constants";
import { JSDOM } from "jsdom";

//https://cobaltintelligence.com/blog/jordan-unit-tests-web-scraping-done-with-request/
test('grabs Geekhack group buy links', async() => {
    const gbUrlSplit:Array<string> = GroupBuyURL.split('org');
    const scope = nock(gbUrlSplit[0] + 'org').get(gbUrlSplit[1]).reply(200).persist();

    const response = await axios.get(GroupBuyURL);

    // Assert that the expected request was made.
    scope.done();

    const dom = new JSDOM(response.data);

    const cleanedLinks = getCleanedGroupBuyLinks(dom);

    // Can't expect all the page info to be the same every time.
    // So check if it's not just a blank array coming back. 
    expect(cleanedLinks).not.toBe([]);

    //Memory Issues with Jest: Memory issues can be avoided by calling nock.restore() after each test suite.
    nock.restore();
})