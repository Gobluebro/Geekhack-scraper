import { Image } from "../utils/types";
import path from "path";
import Piscina from "piscina";

export default async (imagesToTryToDownload: Image[]): Promise<Image[]> => {
  const piscina = new Piscina({
    filename: path.resolve(__dirname, "workers/tsImport.js"),
  });

  const tasks = imagesToTryToDownload.map(async (image) => {
    return await piscina.run(image);
  });

  const downloadedImages = await Promise.all(tasks);

  // remove nulls
  const filteredDownloadedImages: Image[] = downloadedImages.filter(
    (image): image is Image => image !== null
  );
  return filteredDownloadedImages;
};
