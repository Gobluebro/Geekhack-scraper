const download = require("@jinphen/download2");
const images = require("../database/images-model");
const fs = require("fs");

module.exports = async (imageURL, path, threadID, isTrueLast) => {
  // I love this download module. It does all the work for me and allows me to save images I had trouble with in the past.
  download(imageURL, path)
    .then(({ data, filename }) => {
      if (!fs.existsSync(path + `/${filename}`)) {
        console.log(filename + " image already saved");
      } else {
        fs.writeFileSync(path + `/${filename}`, data);
        console.log(
          "thread: " + threadID + " filename: " + filename + " saved to " + path
        );
      }
      images
        .findOrCreate({
          where: { thread_id: threadID, url: imageURL },
          defaults: {
            threadID: threadID,
            name: filename,
            url: imageURL,
            is_hidden: false
          }
        })
        .then(([image, created]) => {
          if (!created) {
            console.log(
              "thread: " +
                threadID +
                " filename: " +
                filename +
                " has already been created in database"
            );
          }
          if (isTrueLast) {
            setTimeout(function() {
              console.log("the last one " + threadID + " " + filename);
              return process.exit();
            }, 10000);
          }
        })
        .catch(err => {
          console.log("failed to save " + filename + " to the database.");
          console.error(err);
        });
    })
    .catch(err => {
      console.log(
        "failed to download at " + imageURL + " on thread number " + threadID
      );
      console.error(err);
    });
};
