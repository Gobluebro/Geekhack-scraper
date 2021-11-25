import fs from "fs";
import { Environment } from "../utils/constants";
import { PageInfo } from "../utils/types";

export default (pages: PageInfo[]) => {
  pages.map((page: PageInfo) => {
    const path = `${Environment.imagePath}/${page.thread.id}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  });
};
