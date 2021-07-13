const threads = require("../database/threads-model");

module.exports = async (threadInfo) => {
  // need to set the thread first since images uses the ID as a FK
  await threads.bulkCreate(threadInfo, {
    updateOnDuplicate: ["website", "title", "scraped", "updated"],
  });
};
