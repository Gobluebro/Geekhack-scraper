import { searchThreadTitlesWithImage } from "@/api/db/threads";
import { Image, Thread } from "@/utils/types";
import { getImagesByThreadId } from "@/api/db/images";
import GeekHackTable from "../components/GeekHackTable";
import { jsonify } from "../util/common";

export default async function Page ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const threadData: (Thread & Image)[] = jsonify(
    await searchThreadTitlesWithImage(searchParams.query || "")
  );

  return <GeekHackTable data={threadData} />;
}
