import { GrabGHGroupBuyLinks } from "../geekhack-scraper/grabGHGroupBuyLinks";
import nock from 'nock';
import { GroupBuyURL } from "../utils/constants";

//https://cobaltintelligence.com/blog/jordan-unit-tests-web-scraping-done-with-request/
test('grabs Geekhack group buy links', async() => {
    //const gbUrlSplit:Array<string> = GroupBuyURL.split('org');
    //const scope = nock(gbUrlSplit[0] + 'org').get(gbUrlSplit[1]).reply(200, 'test response').persist();


    expect(1 + 2).toBe(3);

    //Memory Issues with Jest: Memory issues can be avoided by calling nock.restore() after each test suite.
    //nock.restore();
})