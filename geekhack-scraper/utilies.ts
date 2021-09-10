export enum topicEnum {
  IC,
  GB,
};

export enum websiteEnum {
  geekhack,
  // scrape others in the future
};

const basicGeekhackURL: string = "https://geekhack.org/index.php?board="
export const GroupBuyURL: string = basicGeekhackURL + "70.0";
export const InterestCheckURL: string = basicGeekhackURL + "132.0";