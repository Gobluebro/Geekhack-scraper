import { config } from "dotenv";
import express from "express";
const app = express();
import scan from "../geekhack-scraper/main.js";
config({ path: __dirname + "/../.env" });

app.post("/scan", async (req, res) => {
  try {
    await scan();
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
