const authenticationController = require("../controllers/authentication-controller");
const cors = require("cors");

module.exports = app => {
  //this means that we will only allow this specific origin to access the API
  const corsOptions = {
    origin: "http://localhost:8080"
  };
  app.get(
    "/GetThreads",
    cors(corsOptions),
    authenticationController.getthreads
  );
  app.get("/GetImages", cors(corsOptions), authenticationController.getimages);
};
