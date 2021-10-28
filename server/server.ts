import express from "express";
const app = express();
import scan from "../geekhack-scraper/main";
import { Environment } from "../utils/constants";

app.post("/scan", async () => {
  try {
    await scan();
  } catch (error) {
    console.error(error);
  }
});

const port = Environment.serverPort;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
