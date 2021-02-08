require("dotenv").config({ path: __dirname + "/../.env" });
const main = require("./main.js");

(async () => {
  await main();
})();
