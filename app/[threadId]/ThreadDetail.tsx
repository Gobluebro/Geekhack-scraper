"use client";
import { downloadImages } from "@/api/fileDownload/download";
import { Image, Thread, Vendor } from "@/utils/types";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Link, Card, CardBody } from "@nextui-org/react";
import { formatDate, formatEnum } from "../util/common";
import { Region } from "@/utils/regions";

export default function ThreadDetail ({
  threadData,
  imageData,
  vendorData,
}: {
  threadData: Thread;
  imageData: Image[];
  vendorData: Vendor[];
}) {
  const download = async () => {
    await downloadImages(imageData, threadData.title || "");
  };

  return threadData?.post ? (
    <>
      <Card className='bg-zinc-800 mb-5'>
        <CardBody>
          <div className='grid grid-cols-6 gap-4'>
            <div className='text-center col-start-2 col-span-4'>
              <h1 className='text-3xl'>
                <b>{threadData.title}</b>
              </h1>
              <h2 className='text-gray-300 text-sm'>
                {threadData.author}
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
          <div className='grid grid-cols-2 text-sm'>
            <div>
              {vendorData.length > 0 ? (
                <>
                  <p className='text-gray-200'>
                    <b>Vendor Links:</b>
                  </p>
                  <div className='text-gray-300 grid grid-cols-5'>
                    {vendorData.map(vendor => (
                      <>
                        <p>{formatEnum(Region[vendor.location])}: </p>
                        <Link className='col-span-4' size='sm' isExternal>
                          {vendor.url}
                        </Link>
                      </>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div className='text-right'>
              <p className='text-gray-200'>
                Last Modified: {formatDate(threadData.updated)}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
      <div dangerouslySetInnerHTML={{ __html: threadData.post }}></div>
    </>
  ) : (
    "Not Found"
  );
}
