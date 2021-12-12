/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require("ts-node").register({ transpileOnly: true });
const { downloadImage } = require("./downloadImageWorker");

module.exports = downloadImage;
