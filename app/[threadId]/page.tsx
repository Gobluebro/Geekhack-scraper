import { getThreadById } from "@/api/db/threads";
import { Image, Thread } from "@/utils/types";
import ThreadDetailComponent from "./ThreadDetailComponent";
import { getImagesByThreadId } from "@/api/db/images";

export default async function ThreadDetail ({
  params,
}: {
  params: { threadId: number };
}) {
  const threadData: Thread = JSON.parse(
    JSON.stringify(await getThreadById(params.threadId))
  );
  const imageData: Image[] = JSON.parse(
    JSON.stringify(await getImagesByThreadId(params.threadId))
  );

  return (
    <ThreadDetailComponent threadData={threadData} imageData={imageData} />
  );
}
