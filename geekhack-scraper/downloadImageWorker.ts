import {
  DownloadEndedStats,
  DownloaderHelper,
  DownloaderHelperOptions,
  DownloadInfoStats,
  RetryOptions,
} from "node-downloader-helper";

import { expose } from "threads/worker";

import { Image } from "../utils/types";
import { Environment } from "../utils/constants";

const downloadImageAndReturnFilename = (
  url: string,
  path: string
): Promise<string | null> => {
  const options: DownloaderHelperOptions = {
    method: "GET", // Request Method Verb
    /* override
    object: { skip: skip if already exists, skipSmaller: skip if smaller }
    boolean: true to override file, false to append '(number)' to new file name
    */
    retry: { maxRetries: 1, delay: 3000 }, // { maxRetries: number, delay: number in ms } or false to disable (default)
    override: { skip: true, skipSmaller: true },
    forceResume: false, // If the server does not return the "accept-ranges" header but it does support it
    removeOnStop: true, // remove the file when is stopped (default:true)
    removeOnFail: true, // remove the file when fail (default:true)
    httpRequestOptions: { timeout: 5000 },
  };

  return new Promise((resolve, reject) => {
    const download = new DownloaderHelper(url, path, options);
    download
      .on("skip", (skipInfo) => {
        console.log("Download skipped. File already exists: ", skipInfo);
        download.stop();
        reject(null);
      })
      .on("download", (downloadInfo: DownloadInfoStats) =>
        console.log("Download Begins: ", {
          name: downloadInfo.fileName,
          total: downloadInfo.totalSize,
        })
      )
      .on("timeout", () => {
        console.log("timed out");
        download.stop();
        reject(null);
      })
      // for debugging purposes
      // .on("progress.throttled", (stats: Stats) => {
      //   console.log("Stats: ", stats);
      // })
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
        download.stop();
        reject(null);
      });
    download.start();
  });
};

const downloadImage = async (imageToDowload: Image): Promise<Image | null> => {
  const { sort_order, url, thread_id } = imageToDowload;

  const path = `${Environment.imagePath}/${thread_id}`;

  if (url) {
    try {
      const filename = await downloadImageAndReturnFilename(url, path);

      if (filename) {
        const downloadedImage: Image | null = {
          thread_id,
          name: filename,
          url,
          sort_order,
        };
        return downloadedImage;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  return null;
};

export type DownloadImage = typeof downloadImage;

expose(downloadImage);
