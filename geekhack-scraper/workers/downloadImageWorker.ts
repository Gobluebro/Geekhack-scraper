import {
  DownloadEndedStats,
  DownloaderHelper,
  DownloaderHelperOptions,
  DownloadInfoStats,
  // RetryOptions,
  // Stats,
} from "node-downloader-helper";

import { decode } from "html-entities";

import { Image } from "../../utils/types";
import { Environment } from "../../utils/constants";

const decodeFileName = (fileName: string, uniqueImageNumber: string) => {
  const decodedFileName = decode(fileName);
  const noIllegalCharactersDecodedFilename = decodedFileName.replace(
    /[/\\?%*:|"<>]/g,
    ""
  );

  if (uniqueImageNumber) {
    if (
      uniqueImageNumber !== noIllegalCharactersDecodedFilename.split(".")[0]
    ) {
      return `${uniqueImageNumber}_${noIllegalCharactersDecodedFilename}`;
    }
  }

  return decodedFileName;
};

const downloadImageAndReturnFilename = (
  url: string,
  path: string,
  uniqueImageNumber: string
): Promise<string | null> => {
  const options: DownloaderHelperOptions = {
    method: "GET", // Request Method Verb
    fileName: (filename: string) => decodeFileName(filename, uniqueImageNumber),
    retry: false, //{ maxRetries: 1, delay: 3000 }, // { maxRetries: number, delay: number in ms } or false to disable (default)
    /* override:
    object: { skip: skip if already exists, skipSmaller: skip if smaller }
    boolean: true to override file, false to append '(number)' to new file name
    */
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
      .on("skip", skipInfo => {
        console.log("Download skipped. File already exists: ", skipInfo);
        resolve(skipInfo.fileName);
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
      // .on("retry", (attempt: number, opts: RetryOptions, err: Error) => {
      //   console.log({
      //     RetryAttempt: `${attempt}/${opts.maxRetries}`,
      //     StartsOn: `${opts.delay / 1000} secs`,
      //     Reason: err ? err.message : "unknown",
      //   });
      // })
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
    download.start().catch(err => {
      console.error(err);
      reject(null);
    });
  });
};

const getUniqueImageNumber = (url: string) => {
  const urlChecker = new URL(url);

  // geekhack images have a unique number for their images.
  // the filename may be duplicate, but the attach number will be unique.
  // ?action=dlattach;topic=123456.0;attach=123456;image
  const isGeekhackImage = urlChecker.searchParams.has("action");

  // discord images can have duplicate file name names.
  // they also come with a unique number for their images.
  // 123456789010111213/file.png
  // can be cdn.discordapp.com or media.discordapp.net
  // some people are using giphy for group buys. luckily we can reuse code.
  const isDiscordOrGiphyImage = ["discord", "giphy"].some(website =>
    urlChecker.hostname.includes(website)
  );

  // this is specifically for imgur images that become removed. They lose their unique id once they are removed.
  const isImgurImage = urlChecker.hostname.includes("imgur");

  let uniqueImageNumber = "";
  if (isGeekhackImage) {
    uniqueImageNumber = url.split("attach=")[1].split(";")[0];
  } else if (isDiscordOrGiphyImage) {
    const tempUrl = urlChecker.pathname.split("/");
    // get the random number before the file name
    uniqueImageNumber = tempUrl[tempUrl.length - 2];
  } else if (isImgurImage) {
    // looks something like "/AAEI7s1.png"
    const uniqueId = urlChecker.pathname.split(".")[0].replace("/", "");
    uniqueImageNumber = uniqueId;
  }
  return uniqueImageNumber;
};

export const getFilename = (url: string): string => {
  let fileName = url?.substring(url.lastIndexOf("/") + 1);
  const uniqueImageNumber = getUniqueImageNumber(url || "");
  fileName = decodeFileName(fileName || "", uniqueImageNumber);

  return fileName;
};

export const downloadImage = async (
  imageToDowload: Image
): Promise<Image | null> => {
  const { sort_order, url, thread_id } = imageToDowload;

  const path = `${Environment.imagePath}/${thread_id}`;

  if (url) {
    try {
      const uniqueImageNumber = getUniqueImageNumber(url);

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
