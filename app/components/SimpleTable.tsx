"use client";

import { useCallback, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Skeleton,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

export type Column<T> = {
  accessor: string | ((arg0: T) => string);
  name: string;
  allowsSorting?: boolean;
  sortMethod?: (arg0: T, arg1: T) => number;
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

  const getAccessorValue = (row: T, column: Column<T>) => {
    let value = "";
    if (typeof column.accessor === "function") {
      value = column.accessor(row);
    } else {
      value = row[column.accessor];
    }
    return value;
  };

  const columnDict = Object.assign(
    {},
    ...columns.map(col => ({ [col.name]: col }))
  );

  const renderCell = useCallback((data: T, columnKey: React.Key) => {
    const column = columnDict[columnKey as string];
    const value = getAccessorValue(data, column);

    if (column.Cell) {
      return column.Cell({ row: data, value: value });
    }

    return value;
  }, []);

  const list = useAsyncList({
    async load () {
      return {
        items: data,
      };
    },
    async sort ({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const columnKey = (sortDescriptor.column as string) || "";
          const column = columnDict[columnKey];
          let cmp = 0;

          if (typeof column?.sortMethod === "function") {
            cmp = column.sortMethod(a, b);
          } else {
            const first = getAccessorValue(a, column);
            const second = getAccessorValue(b, column);
            cmp = first.localeCompare(second);
          }

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const items = useMemo(() => {
    let content = data;
    if (list.items.length) content = list.items;
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return content.slice(start, end);
  }, [page, list.items]);

  return (
    <Table
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
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
        {column => (
          <TableColumn
            key={column.name}
            allowsSorting={column?.allowsSorting || false}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={list.isLoading}
        emptyContent={"No rows to display."}
        loadingContent={<Skeleton />}
        items={items}
      >
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
