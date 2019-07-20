const Threads = require("../../database/threads-model");

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
  }
};
