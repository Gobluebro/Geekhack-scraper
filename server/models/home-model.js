const Threads = require("../../database/threads-model");
const Images = require("../../database/images-model");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 30000, useClones: false });

module.exports = {
  async getThreads() {
    let threads = await Threads.findAll({
      order: [["id", "DESC"]]
    });
    myCache.set("threads", threads);
  },
  async getImages() {
    let images = await Images.findAll({
      order: [["order_number"]]
    });
    myCache.set("images", images);
  },
  async getCache(key) {
    let cache = myCache.get(key);
    if (cache === undefined) {
      if (key === "threads") {
        await this.getThreads();
      } else if (key === "images") {
        await this.getImages();
      }
      cache = myCache.get(key);
    }
    return cache;
  }
};
