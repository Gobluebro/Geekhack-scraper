const db = require("./database/initdb.js");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

(async () => {
  // geekhack group buy
  const gbLinksGH = require("./grabGHGroupBuyLinks.js");
  let ghGBThreadLinks = await gbLinksGH();

  const threadscrape = require("./threadscrape.js");

  Promise.all(ghGBThreadLinks.map(threadscrape)).then(function() {
    console.log("all links visited");
    process.exit();
  });
})();
