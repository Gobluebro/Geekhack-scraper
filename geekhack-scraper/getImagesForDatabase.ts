import { DownloadImage } from "./downloadImage";
import { Image } from "../utils/types";
import { spawn, Pool, Worker } from "threads";

export default async (imagesToTryToDownload: Image[]): Promise<Image[]> => {
  // const downloadedImages = imagesToTryToDownload.map(async (image) => {
  //   const downloadedImage = await piscina.run(image);
  //   return downloadedImage;
  // });

  const pool = Pool(() => spawn<DownloadImage>(new Worker("./downloadImage")));

  const tasks = imagesToTryToDownload.map((image) => {
    const task = pool.queue((worker) => worker(image));
    return task;
  });

  const downloadedImages = await Promise.all(tasks);

  // const downloadedImages = await Promise.all(
  //   imagesToTryToDownload.map(async (image: Image) => {
  //     const imageToSave = await download(image);
  //     if (imageToSave) {
  //       return imageToSave;
  //     }
  //     return null;
  //   })
  // );
  // remove nulls
  const filteredDownloadedImages: Image[] = downloadedImages.filter(
    (image): image is Image => image !== null
  );
  return filteredDownloadedImages;
};
