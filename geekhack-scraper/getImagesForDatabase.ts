import download from "./downloadImage";
import { Image } from "../utils/types";

export default async (imagesToTryToDownload: Image[]): Promise<Image[]> => {
  const downloadedImages = await Promise.all(
    imagesToTryToDownload.map(async (image: Image) => {
      const imageToSave = await download(image);
      if (imageToSave) {
        return imageToSave;
      }
      return null;
    })
  );
  // remove nulls
  const filteredDownloadedImages: Image[] = downloadedImages.filter(
    (image): image is Image => image !== null
  );
  return filteredDownloadedImages;
};
