const fs = require("fs");

modules.export = async function(page, imageURL, path) {
  try {
    var imageSource = await page.goto(imageURL);
  } catch (err) {
    return;
  }
  fs.open(path, "wx", function(err) {
    if (err) {
      if (err.code === "EEXIST") {
        console.log("image already saved. skipping");
        return;
      }
      throw err;
    }

    fs.writeFile(path, imageSource.buffer(), "wx", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("saved image");
    });
  });
};
