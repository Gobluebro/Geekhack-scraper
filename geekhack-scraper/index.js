const db = require("../database/initdb");
const gbLinksGH = require("./grabGHGroupBuyLinks");
const threadscrape = require("./threadscrape");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

(async () => {
  let ghGBThreadLinks = await gbLinksGH();

  var isLast = false;
  for (let i = 0; i < ghGBThreadLinks.length; i++) {
    console.log("going to " + ghGBThreadLinks[i]);
    if (i === ghGBThreadLinks.length - 1) {
      isLast = true;
    }
    await threadscrape(ghGBThreadLinks[i], isLast);
  }
  console.log("all links visited");
})();
