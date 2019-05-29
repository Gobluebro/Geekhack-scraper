const db = require("./database/initdb.js");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

(async () => {
  // geekhack group buy
  const gbLinksGH = require("./grabGHGroupBuyLinks.js");
  let ghGBThreadLinks = await gbLinksGH();

  const threadscrape = require("./threadscrape.js");
  //the async/await friendly looping through every url
  for (const item of ghGBThreadLinks) {
    console.log("going to " + item);
    await threadscrape(item);
  }
  console.log("all links visited");
})();
