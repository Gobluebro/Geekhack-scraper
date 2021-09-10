Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestCheckURL =
  exports.GroupBuyURL =
  exports.websiteEnum =
  exports.topicEnum =
    void 0;
let topicEnum;
(function (topicEnum) {
  topicEnum[(topicEnum.IC = 0)] = "IC";
  topicEnum[(topicEnum.GB = 1)] = "GB";
})((topicEnum = exports.topicEnum || (exports.topicEnum = {})));
let websiteEnum;
(function (websiteEnum) {
  websiteEnum[(websiteEnum.geekhack = 0)] = "geekhack";
  // scrape others in the future
})((websiteEnum = exports.websiteEnum || (exports.websiteEnum = {})));
const basicGeekhackURL = "https://geekhack.org/index.php?board=";
exports.GroupBuyURL = `${basicGeekhackURL}70.0`;
exports.InterestCheckURL = `${basicGeekhackURL}132.0`;
