const download = require("@jinphen/download2");
const fs = require("fs");

module.exports = async (imageToDowload) => {
  let orderNumber = imageToDowload.orderNumber;
  let url = imageToDowload.url;
  let thread_id = imageToDowload.thread_id;

  let path = process.env.IMAGES_PATH + `/${thread_id}`;
  // I love this download module. It does all the work for me and allows me to save images I had trouble with in the past.
  let image = download(url, path)
    .then(({ data, filename }) => {
      if (!fs.existsSync(path + `/${filename}`)) {
        console.log(filename + " image already saved");
      } else {
        fs.writeFileSync(path + `/${filename}`, data);
        console.log(
          "thread: " +
            thread_id +
            " filename: " +
            filename +
            " saved to " +
            path
        );
        let downloadedImage = {
          thread_id: thread_id,
          name: filename,
          url: url,
          order_number: orderNumber,
        };
        return downloadedImage;
      }
    })
    .catch((err) => {
      console.log(
        "failed to download at " + url + " on thread number " + thread_id
      );
      console.error(err);
    });
  return image;
};
