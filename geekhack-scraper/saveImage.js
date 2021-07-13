const images = require("../database/images-model");

module.exports = async (imagesToSaveToDatabase) => {
  // need to set the thread first since images uses the ID as a FK
  await images.bulkCreate(imagesToSaveToDatabase, {
    ignoreDuplicates: true,
  });
};
