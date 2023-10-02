import { getThreadById } from "@/api/db/threads";
import { Image, Thread, Vendor } from "@/utils/types";
import { getImagesByThreadId } from "@/api/db/images";
import ThreadDetail from "./ThreadDetail";
import { jsonify } from "../util/common";
import { getVendorsByThreadId } from "@/api/db/vendors";

export default async function Page ({
  params,
}: {
  params: { threadId: number };
}) {
  const threadData: Thread = jsonify(await getThreadById(params.threadId));
  const imageData: Image[] = jsonify(
    await getImagesByThreadId(params.threadId)
  );
  const vendorData: Vendor[] = jsonify(
    await getVendorsByThreadId(params.threadId)
  );

  return (
    <ThreadDetail
      threadData={threadData}
      imageData={imageData}
      vendorData={vendorData}
    />
  );
}
