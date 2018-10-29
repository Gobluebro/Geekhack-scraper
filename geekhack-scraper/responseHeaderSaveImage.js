const fs = require("fs");

module.exports = async function(page, imageURL) {
  page.on("response", async resp => {
    headers = resp.headers();
    filename = headers["content-disposition"];
    if (!typeof filename == "undefined") {
      filename.split("=")[1].replace(/\"/g, "");
      const buffer = await resp.buffer();
      fs.writeFileSync(__dirname + "\\" + filename, buffer);
    }
  });
  await page.goto(imageURL);
};
