"use client";

import { Image, Thread } from "@/utils/types";
import SimpleTable, { Column } from "./SimpleTable";
import { TopicEnum, TopicURL } from "@/utils/constants";
import { KeycapIdentifier } from "@/utils/keycaps";
import { Link } from "@nextui-org/link";
import { Button, User } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { formatDate, sortDate } from "../util/common";

export default function GeekHackTable ({ data }: { data: (Thread & Image)[] }) {
  const columns: Column<Thread & Image>[] = [
    {
      accessor: "title",
      name: "Title",
      Cell: ({ row }) => (
        <User
          name={
            <Link href={`/${row.thread_id.toString()}`} size='lg'>
              {row.title}
            </Link>
          }
          description={row.author}
          avatarProps={{
            src: row.url,
            size: "lg",
            name: row.author,
            radius: "sm",
          }}
        />
      ),
      allowsSorting: true,
    },
    {
      accessor: row => TopicEnum[row.topic],
      name: "Topic",
      allowsSorting: true,
    },
    {
      accessor: "author",
      name: "Author",
      allowsSorting: true,
    },
    {
      accessor: row => KeycapIdentifier[row.keycap_identifier],
      name: "Keycap Type",
      allowsSorting: true,
    },
    {
      accessor: row => formatDate(row.updated),
      name: "Last Modified",
      allowsSorting: true,
      sortMethod: (rowA, rowB) => sortDate(rowA.updated, rowB.updated),
    },
    {
      accessor: "thread_id",
      name: "Geekhack",
      Cell: ({ value }) => (
        <Button
          as={Link}
          href={`${TopicURL}${value}`}
          isExternal
          isIconOnly
          aria-label='geekhack-link'
          color='primary'
          className='bg-gradient-to-tr from-indigo-500 to-teal-500 text-white shadow-lg'
        >
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            color='white'
            className='m-2'
          />
        </Button>
      ),
    },
  ];
  return <SimpleTable columns={columns} data={data} />;
}
