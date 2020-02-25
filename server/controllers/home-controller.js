const model = require("../models/home-model");

module.exports = {
  async getthreads(req, res) {
    try {
      let threads = await model.getCache("threads");
      res.send(JSON.stringify(threads));
    } catch (err) {
      res.status(400).send({
        error: `There was an issue getting back the threads. ${err}`
      });
    }
  },
  async getimages(req, res) {
    try {
      let images = await model.getCache("images");
      res.send(JSON.stringify(images));
    } catch (err) {
      res.status(400).send({
        error: `There was an issue getting back the images. ${err}`
      });
    }
  }
};
