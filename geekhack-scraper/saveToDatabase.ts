import images from "../database/images-model";
import threads from "../database/threads-model";
import vendors from "../database/vendors-model";
import { Image, PageInfo, Thread, Vendor } from "../utils/types";
import downloadImages from "./getImagesForDatabase";

export const SaveToDatabase = async (pages: PageInfo[]): Promise<void> => {
  const threadsToSaveToDatabase: Thread[] = pages.map(
    (page: PageInfo) => page.thread
  );

  // need to set the thread first since images uses the ID as a FK
  const threadsSaved = await threads.bulkCreate(threadsToSaveToDatabase, {
    updateOnDuplicate: ["website", "title", "scraped", "updated", "post"],
  });

  if (threadsSaved) {
    const imagesToTryToDownload: Image[] = pages
      .map((page) => page.images)
      .flat();
    //const imagesToSaveToDatabase:Array<Image> = await downloadImages(imagesToTryToDownload);

    await images.bulkCreate(imagesToTryToDownload, {
      ignoreDuplicates: true,
    });

    const vendorsToSaveToDatabase: Vendor[] = pages
      .map((page: PageInfo) => page.vendors)
      .flat();

    await vendors.bulkCreate(vendorsToSaveToDatabase, {
      ignoreDuplicates: true,
    });
  }
};
