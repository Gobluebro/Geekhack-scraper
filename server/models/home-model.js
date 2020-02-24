const Threads = require("../../database/threads-model");
const Images = require("../../database/images-model");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 6000 });

module.exports = {
  async getThreads() {
    let threads = await Threads.findAll({
      order: [["id", "DESC"]]
    });
    myCache.set("threads", threads);
  },
  async getImages() {
    const images = await Images.findAll({
      order: [["order_number"]]
    });
    myCache.set("images", images);
  },
  async getCache(key) {
    const cache = myCache.get(key);
    if (cache === undefined) {
      if (key === "threads") {
        await getThreads();
      } else if (key === "images") {
        await getImages();
      }
      cache = myCache.get(key);
    }
    return cache;
  }
};
