const download = require("download");
const images = require("./database/images-model.js");
const fs = require("fs");

module.exports = async function(imageURL, path, threadID) {
  // gets the name and extension of the image url.
  let imageRegex = new RegExp("(?:[^/][\\d\\w\\.]+)+$", "g");
  ///.*\.(jpg|png|gif)$/
  let imageName = imageRegex.exec(imageURL);
  // possibly due to bad url eg:http:/[Imgur](https:/i.imgur.com/something.jpg)
  if (imageName != null) {
    if (imageName[0].includes("?")) {
      imageName[0] = imageName[0].split("?")[0];
    }

    if (imageName && imageName.length === 1) {
      // let extension = imagePathName[1];
      let newPath = path + `/${imageName[0]}`;
      if (!fs.existsSync(newPath)) {
        download(imageURL)
          .then(data => {
            fs.writeFileSync(newPath, data);
            console.log(imageName[0] + " saved");
          })
          .then(
            images
              .findOrCreate({
                where: { thread_id: threadID, url: imageURL },
                defaults: {
                  threadID: threadID,
                  name: imageName[0],
                  url: imageURL,
                  is_hidden: false
                }
              })
              .then(([image, created]) => {
                console.log(
                  image.get({
                    plain: true
                  })
                );
                if (!created) {
                  console.log(
                    imageName[0] + " has already been created in database"
                  );
                }
              })
          )
          .catch(err => {
            console.log(
              "failed to download at " +
                imageURL +
                " on thread number " +
                threadID
            );
            console.error(err);
          });
      } else {
        console.log(imageName[0] + " image already saved");
      }
    }
  }
};
