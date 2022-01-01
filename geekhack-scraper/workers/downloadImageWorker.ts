import {
  DownloadEndedStats,
  DownloaderHelper,
  DownloaderHelperOptions,
  DownloadInfoStats,
  RetryOptions,
  // Stats,
} from "node-downloader-helper";

import { decode } from "html-entities";

import { Image } from "../../utils/types";
import { Environment } from "../../utils/constants";

const downloadImageAndReturnFilename = (
  url: string,
  path: string,
  uniqueImageNumber: string
): Promise<string | null> => {
  const options: DownloaderHelperOptions = {
    method: "GET", // Request Method Verb
    /* override:
    object: { skip: skip if already exists, skipSmaller: skip if smaller }
    boolean: true to override file, false to append '(number)' to new file name
    */
    fileName: (filename) => {
      // make sure the file name is decoded for other languages.
      const decodedFileName = decode(filename);
      if (uniqueImageNumber) {
        if (uniqueImageNumber !== decodedFileName.split(".")[0]) {
          return `${uniqueImageNumber}_${decodedFileName}`;
        }
      }

      return decodedFileName;
    },
    retry: { maxRetries: 1, delay: 3000 }, // { maxRetries: number, delay: number in ms } or false to disable (default)
    override: { skip: true, skipSmaller: true },
    forceResume: false, // If the server does not return the "accept-ranges" header but it does support it
    removeOnStop: true, // remove the file when is stopped (default:true)
    removeOnFail: true, // remove the file when fail (default:true)
    httpRequestOptions: {
      timeout: 15000,
    },
  };

  return new Promise((resolve, reject) => {
    const download = new DownloaderHelper(url, path, options);
    download
      .on("skip", (skipInfo) => {
        console.log("Download skipped. File already exists: ", skipInfo);
        download.stop();
        reject(null);
      })
      .on("download", (downloadInfo: DownloadInfoStats) => {
        console.log("Download Begins: ", {
          name: downloadInfo.fileName,
          total: downloadInfo.totalSize,
        });

        // we need to check to see if the imgur file has been removed, we can't tell until we start the download.
        const urlChecker = new URL(url);
        if (
          urlChecker.hostname.includes("imgur") &&
          downloadInfo.fileName.includes("removed")
        ) {
          download.stop();
          reject(null);
        }
      })
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
    // looks weird but this was recommended for preventing crashing errors due to 404s and 500 errors
    // https://github.com/hgouveia/node-downloader-helper/issues/61
    download.start().catch((err) => {
      console.error(err);
      reject(null);
    });
  });
};

export const downloadImage = async (
  imageToDowload: Image
): Promise<Image | null> => {
  const { sort_order, url, thread_id } = imageToDowload;

  const path = `${Environment.imagePath}/${thread_id}`;

  if (url) {
    try {
      const urlChecker = new URL(url);

      // geekhack images have a unique number for their images.
      // the filename may be duplicate, but the attach number will be unique.
      // ?action=dlattach;topic=123456.0;attach=123456;image
      const isGeekhackImage = urlChecker.searchParams.has("action");

      // discord images can have duplicate file name names.
      // they also come with a unique number for their images.
      // 123456789010111213/file.png
      // can be cdn.discordapp.com or media.discordapp.net
      const isDiscordImage = urlChecker.hostname.includes("discordapp");

      // this is specifically for imgur images that become removed. They lose their unique id once they are removed.
      const isImgurImage = urlChecker.hostname.includes("imgur");

      let uniqueImageNumber = "";
      if (isGeekhackImage) {
        uniqueImageNumber = url.split("attach=")[1].split(";")[0];
      } else if (isDiscordImage) {
        const tempUrl = urlChecker.pathname.split("/");
        // get the random number before the file name
        uniqueImageNumber = tempUrl[tempUrl.length - 2];
      } else if (isImgurImage) {
        // looks something like "/AAEI7s1.png"
        const uniqueId = urlChecker.pathname.split(".")[0].replace("/", "");
        uniqueImageNumber = uniqueId;
      }

      const filename = await downloadImageAndReturnFilename(
        url,
        path,
        uniqueImageNumber
      );

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
