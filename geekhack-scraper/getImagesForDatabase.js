const download = require("./downloadImage");

module.exports = async imagesToTryToDownload => {
  let downloadedImages = [];
  for (let i = 0; i < imagesToTryToDownload.length; i++) {
    for (let a = 0; a < imagesToTryToDownload[i].length; a++) {
      let imageToSave = await download(imagesToTryToDownload[i][a]);
      if (typeof imageToSave === "object" && imageToSave !== null) {
        downloadedImages.push(imageToSave);
      }
    }
  }
  return downloadedImages;
};
