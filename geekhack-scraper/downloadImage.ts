import {
  DownloadEndedStats,
  DownloaderHelper,
  DownloadInfoStats,
} from "node-downloader-helper";
import { Image } from "./threadscrape";
import fs from "fs";
import { Environment } from "../utils/constants";

export default async (imageToDowload: Image): Promise<Image | null> => {
  const { orderNumber, url, thread_id } = imageToDowload;

  const path = `${Environment.imagePath}/${thread_id}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  if (url) {
    const download = new DownloaderHelper(url, path);
    download
      .on("skip", (skipInfo) =>
        console.log("Download skipped. File already exists: ", skipInfo)
      )
      .on("download", (downloadInfo: DownloadInfoStats) =>
        console.log("Download Begins: ", {
          name: downloadInfo.fileName,
          total: downloadInfo.totalSize,
        })
      )
      .on("end", (downloadInfo: DownloadEndedStats) => {
        console.log("Download Info: ", downloadInfo);
        const downloadedImage = {
          thread_id,
          name: downloadInfo.fileName,
          url,
          order_number: orderNumber,
        };
        return downloadedImage;
      })
      .on("error", (err: Error) =>
        console.error(
          `failed to download at ${url} on thread number ${thread_id}`,
          err
        )
      );
  }
  return null;
};
