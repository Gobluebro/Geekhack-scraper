const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require(__dirname + "/../../database/initdb.js");
const config = require("../../config.json");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

require("./routes")(app);

sequelize
  .sync()
  .then(() => {
    app.listen(config.port || 8081);
    console.log(`Server start on port ${config.port}`);
  })
  .catch(err => console.log("Error: " + err));
