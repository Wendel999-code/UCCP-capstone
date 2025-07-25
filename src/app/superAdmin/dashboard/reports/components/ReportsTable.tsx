"use client";

import { useGetAllActivity } from "@/app/hooks/useActivity";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivityLog } from "@/global/type";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

function ReportsTable() {
  const { data, isLoading, isError, error } = useGetAllActivity();

  const columns = useMemo<ColumnDef<ActivityLog>[]>(
    () => [
      {
        accessorKey: "action",
        header: "Action",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "Church.brgy",
        header: "Local Church",
        cell: (info) => info.getValue(),
      },

      //Todo implment filter and view metadata
      {
        accessorKey: "created_at",
        header: "Date & Time",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl text-red-900 dark:text-yellow-500">
          Operational Logs for All Churches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-amber-500">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="font-sans text-[12px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ReportsTable;
