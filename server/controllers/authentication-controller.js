const Threads = require("../../database/threads-model");
const Images = require("../../database/images-model");

module.exports = {
  async getthreads(req, res) {
    try {
      const threads = await Threads.findAll();
      res.send(JSON.stringify(threads));
    } catch (err) {
      res.status(400).send({
        error: `There was an issue getting back the threads. ${err}`
      });
    }
  },
  async getimages(req, res) {
    try {
      const images = await Images.findAll();
      res.send(JSON.stringify(images));
    } catch (err) {
      res.status(400).send({
        error: `There was an issue getting back the images. ${err}`
      });
    }
  }
};