require("dotenv").config({ path: `${__dirname}/../.env` });
import main from "./main";

(async () => {
  await main();
})();
