import { WebsiteEnum, TopicEnum } from "../utils/constants";
import { KeycapIdentifier } from "./keycaps";
import { Region } from "./regions";

export type PageInfo = {
  thread: Thread;
  images: Image[];
  vendors: Vendor[];
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
  keycap_identifier: KeycapIdentifier;
};

export type Image = {
  thread_id: number;
  url: string | undefined;
  sort_order: number;
  name?: string;
};

export type Vendor = {
  thread_id: number;
  location: Region;
  url: string;
};
