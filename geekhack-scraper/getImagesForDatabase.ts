import { DownloadImage } from "./downloadImage";
import { Image } from "../utils/types";
import { spawn, Pool, Worker } from "threads";

export default async (imagesToTryToDownload: Image[]): Promise<Image[]> => {
  const pool = Pool(() => spawn<DownloadImage>(new Worker("./downloadImage")));

  const tasks = imagesToTryToDownload.map((image) => {
    const task = pool.queue((worker) => worker(image));
    return task;
  });

  const downloadedImages = await Promise.all(tasks);

  // remove nulls
  const filteredDownloadedImages: Image[] = downloadedImages.filter(
    (image): image is Image => image !== null
  );
  return filteredDownloadedImages;
};
