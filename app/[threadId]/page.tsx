import { getThreadById } from "@/api/db/threads";
import { Image, Thread } from "@/utils/types";
import { getImagesByThreadId } from "@/api/db/images";
import ThreadDetail from "./ThreadDetail";

export default async function Page ({
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

  return <ThreadDetail threadData={threadData} imageData={imageData} />;
}
