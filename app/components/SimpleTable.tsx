"use client";

import { useCallback, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination
} from "@nextui-org/react";

export type Column<T> = {
  accessor: string | ((arg0: T) => string);
  name: string;
  Cell?: ({ row, value }: { row: T; value: any }) => {};
};

export default function SimpleTable<T extends Record<string, any>> ({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 50;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const columnDict = Object.assign(
    {},
    ...columns.map(col => ({ [col.name]: col }))
  );

  const renderCell = useCallback((data: T, columnKey: React.Key) => {
    const column = columnDict[columnKey as string];
    let value = "";

    if (typeof column.accessor === "function") {
      value = column.accessor(data);
    } else {
      value = data[column.accessor];
    }

    if (column.Cell) {
      return column.Cell({ row: data, value: value });
    }

    return value;
  }, []);

  return (
    <Table
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            page={page}
            total={pages}
            onChange={page => setPage(page)}
            className='bg-gradient-to-tr from-indigo-500 to-teal-500 text-white shadow-lg rounded-xl'
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.name}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
