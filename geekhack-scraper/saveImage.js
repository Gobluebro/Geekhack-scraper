const download = require("@jinphen/download2");
const images = require("./database/images-model.js");
const fs = require("fs");

module.exports = async function(imageURL, path, threadID) {
  return new Promise((resolve, reject) => {
    // I love this download module. It does all the work for me and allows me to save images I had trouble with in the past.
    download(imageURL, path)
      .then(({ data, filename }) => {
        if (!fs.existsSync(path + `/${filename}`)) {
          console.log(filename + " image already saved");
        } else {
          fs.writeFileSync(path + `/${filename}`, data);
          console.log(
            "thread: " + threadID + " filename: " + filename + " saved"
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
              resolve("good");
            }
          })
          .catch(err => {
            console.log("failed to save " + filename + " to the database.");
            console.error(err);
            reject(err);
          });
      })
      .catch(err => {
        console.log(
          "failed to download at " + imageURL + " on thread number " + threadID
        );
        console.error(err);
        reject(err);
      });
  });
};
