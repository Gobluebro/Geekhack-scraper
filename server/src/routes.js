const authenticationController = require("../controllers/authentication-controller");

module.exports = app => {
  app.get("/GetThreads", authenticationController.getthreads);
  app.get("/GetImages", authenticationController.getimages);
};
