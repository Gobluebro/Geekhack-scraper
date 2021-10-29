import {
  DownloadEndedStats,
  DownloaderHelper,
  DownloaderHelperOptions,
  DownloadInfoStats,
  RetryOptions,
} from "node-downloader-helper";
import fs from "fs";

import { Image } from "./threadscrape";
import { Environment } from "../utils/constants";

const downloadImageAndReturnFilename = (url: string, path: string): Promise<string | null> => {
  const options: DownloaderHelperOptions = {
    method: "GET", // Request Method Verb
    /* override
    object: { skip: skip if already exists, skipSmaller: skip if smaller }
    boolean: true to override file, false to append '(number)' to new file name
    */
    retry: { maxRetries: 3, delay: 3000 }, // { maxRetries: number, delay: number in ms } or false to disable (default)
    override: { skip: true, skipSmaller: true },
    forceResume: false, // If the server does not return the "accept-ranges" header but it does support it
    removeOnStop: true, // remove the file when is stopped (default:true)
    removeOnFail: true, // remove the file when fail (default:true)
  };

  return new Promise((resolve, reject) => { 
    const download = new DownloaderHelper(url, path, options);
    download
    .on("skip", (skipInfo) =>
    {
      console.log("Download skipped. File already exists: ", skipInfo)
      reject(null);
    })
    .on("download", (downloadInfo: DownloadInfoStats) =>
      console.log("Download Begins: ", {
        name: downloadInfo.fileName,
        total: downloadInfo.totalSize,
      })
    )
    .on("retry", (attempt: number, opts: RetryOptions, err: Error) => {
      console.log({
        RetryAttempt: `${attempt}/${opts.maxRetries}`,
        StartsOn: `${opts.delay / 1000} secs`,
        Reason: err ? err.message : "unknown",
      });
    })
    .on("end", (downloadInfo: DownloadEndedStats) => {
      console.log("Download complete: ", downloadInfo);
      resolve(downloadInfo.fileName);
    })
    .on("error", (err: Error) => {
      console.error(err);
      reject(null);
    });
    download.start();
  })
};

export default async (imageToDowload: Image): Promise<Image | null> => {
  const { orderNumber, url, thread_id } = imageToDowload;

  const path = `${Environment.imagePath}/${thread_id}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  if (url) {
    try{
      const filename = await downloadImageAndReturnFilename(url, path);

      if (filename){
        const downloadedImage: Image | null = {
          thread_id,
          name: filename,
          url,
          orderNumber,
        };
        return downloadedImage;
      }
    }
    catch(err){
      console.log(err);
      return null;
    }
  }
  return null;
};
