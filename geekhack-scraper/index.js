require("dotenv").config({ path: `${__dirname}/../.env` });
const main = require("./main");

(async () => {
  await main();
})();
