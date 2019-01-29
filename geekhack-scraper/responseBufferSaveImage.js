module.exports = async function(fs, page, path, imageURL) {
  var imageSource = await page.goto(imageURL);

  fs.writeFile(path, await imageSource.buffer(), err => {
    if (err) {
      return console.log(err);
    }
    console.log("saved image");
  });
};
