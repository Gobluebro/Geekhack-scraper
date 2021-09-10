import { config } from "dotenv";
import main from "./main";
config({ path: `${__dirname}/../.env` });

(async () => {
  await main();
})();
