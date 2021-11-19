import { WebsiteEnum, TopicEnum } from "../utils/constants";

export type PageInfo = {
    thread: Thread;
    image: Image[];
};
  
export type Thread = {
    id: number;
    website: WebsiteEnum;
    title: string | undefined;
    start: number | null;
    scraped: Date;
    updated: number | null;
    topic: TopicEnum;
    author: string | undefined;
};

export type Image = {
    thread_id: number;
    url: string | undefined;
    orderNumber: number;
    name?: string;
};