import { WebsiteEnum, TopicEnum } from "../utils/constants";

export type PageInfo = {
  thread: Thread;
  image: Image[];
};

export type Thread = {
  id: number;
  website: WebsiteEnum;
  title: string | undefined;
  start: Date | null;
  scraped: Date;
  updated: Date | null;
  topic: TopicEnum;
  author: string | undefined;
};

export type Image = {
  thread_id: number;
  url: string | undefined;
  sort_order: number;
  name?: string;
};
