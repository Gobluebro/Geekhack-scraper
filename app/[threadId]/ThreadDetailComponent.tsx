"use client";
import { downloadImages } from "@/api/fileDownload/download";
import { Image, Thread } from "@/utils/types";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider } from "@nextui-org/react";
import { formatDate } from "../util/common";

export default function ThreadDetailComponent ({
  threadData,
  imageData,
}: {
  threadData: Thread;
  imageData: Image[];
}) {
  const download = async () => {
    await downloadImages(imageData, threadData.title || "");
  };

  return threadData?.post ? (
    <>
      <div className='grid grid-cols-6 gap-4'>
        <div className='text-center col-start-2 col-span-4'>
          <h1 className='text-3xl'>
            <b>{threadData.title}</b>
          </h1>
          <h2 className='text-gray-400 text-lg'>
            {threadData.author} - {formatDate(threadData.updated)}
          </h2>
        </div>
        <div className='self-center'>
          <Button
            className='bg-gradient-to-tr from-indigo-500 to-teal-500 text-white shadow-lg'
            radius='full'
            endContent={<FontAwesomeIcon icon={faDownload} color='white' />}
            onClick={download}
          >
            Images
          </Button>
        </div>
      </div>
      <Divider className='my-5' />
      <div dangerouslySetInnerHTML={{ __html: threadData.post }}></div>
    </>
  ) : (
    "Not Found"
  );
}
