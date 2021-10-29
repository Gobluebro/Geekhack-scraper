import express from "express";
import scan from "../geekhack-scraper";
import { Environment } from "../utils/constants";

const app = express();

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
