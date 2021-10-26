import images from "../database/images-model";
import threads from "../database/threads-model";
import { Thread, Image, PageInfo } from "./threadscrape";

export const SaveToDataBase = async (pages: PageInfo[]): Promise<void> => {
  const threadsToSaveToDatabase: Thread[] = pages.map(
    (page: PageInfo) => page.thread
  );
  const imagesToSaveToDatabase: Image[] = pages
    .map((page) => page.image)
    .flat();

  // need to set the thread first since images uses the ID as a FK
  const threadsSaved = await threads.bulkCreate(threadsToSaveToDatabase, {
    updateOnDuplicate: ["website", "title", "scraped", "updated"],
  });

  if (threadsSaved) {
    await images.bulkCreate(imagesToSaveToDatabase, {
      ignoreDuplicates: true,
    });
  }
};
