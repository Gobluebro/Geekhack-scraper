const result = require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const app = express();
const scan = require("../geekhack-scraper/main.js");

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

app.post("/scan", async (req, res) => {
  try {
    await scan();
  } catch (error) {
    console.error(error);
  }
});

let port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
