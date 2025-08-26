"use client";

import { useGetAllActivity } from "@/app/hooks/useActivity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivityLog } from "@/global/type";
import supabase from "@/lib/supabase/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useMemo } from "react";

function ReportsTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const {
    data: membersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllActivity(pagination.pageIndex + 1, pagination.pageSize);

  // const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("log-events")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activity_log",
        },
        () => {
          refetch();
        }
      )

      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [refetch]);

  const columns = useMemo<ColumnDef<ActivityLog>[]>(
    () => [
      {
        accessorKey: "rowNumber",
        header: "#",
        cell: ({ row, table }) => {
          const pageIndex = table.getState().pagination.pageIndex ?? 0;
          const pageSize = table.getState().pagination.pageSize ?? 10;
          return (
            <span className="text-[12px] text-muted-foreground">
              {pageIndex * pageSize + row.index + 1}
            </span>
          );
        },
        size: 10,
      },
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
      {
        accessorKey: "created_at",
        header: "Date & Time",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: membersData?.data ?? [],
    columns,
    pageCount: Math.ceil((membersData?.count ?? 0) / pagination.pageSize),
    state: { pagination },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  // const handleExportPDF = async () => {
  //   setExporting(true);

  //   if (isLoading) return;

  //   try {
  //     exportToPDF(table, {
  //       title: `Cana Circuit Event Logs`,
  //       filename: `Cana Circuit Event Logs.pdf`,
  //     });

  //     toast.success("PDF exported successfully");
  //   } catch (error) {
  //     console.log("Error exporting PDF:", error);
  //     toast.error("Error exporting PDF");
  //   } finally {
  //     setExporting(false);
  //   }
  // };

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <Card
      className="border border-gray-200 dark:border-gray-800
    shadow-xl bg-gradient-to-b from-white to-amber-50 
    dark:from-gray-950 dark:to-gray-900"
    >
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-3">
        <CardTitle className="text-lg sm:text-xl font-bold text-amber-900 dark:text-yellow-400 tracking-wide text-center sm:text-left">
          Operational Reports for All Churches
        </CardTitle>

        {/* Future Export Button (hidden for now) */}
        {/* <Button
      onClick={handleExportPDF}
      variant="ghost"
      className="h-8 px-3 text-xs cursor-pointer border rounded-lg 
                 hover:text-amber-900 hover:border-amber-900 
                 dark:hover:text-yellow-400 dark:hover:border-yellow-400 
                 transition-all flex items-center gap-1"
    >
      <Download className="h-3.5 w-3.5" />
      {exporting ? "Exporting..." : "Export"}
    </Button> */}
      </CardHeader>

      {/* Content */}
      <CardContent className="mt-4">
        {/* Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-amber-100/50 dark:bg-zinc-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-[11px] sm:text-xs font-semibold tracking-wide text-amber-700 dark:text-yellow-400 px-3 py-2"
                    >
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
              {isLoading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      {columns.map((_, j) => (
                        <TableCell key={j} className="px-3 py-2">
                          <Skeleton className="h-4 w-full rounded" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-amber-50/40 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="font-sans text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 px-3 py-2"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 text-xs">
          {/* Total Logs */}
          <div className="text-muted-foreground">
            Total Logs:{" "}
            <span className="font-semibold text-amber-800 dark:text-yellow-300">
              {membersData?.count ?? 0}
            </span>
          </div>

          {/* Pagination + Rows per Page */}
          <div className="flex items-center gap-4">
            {/* Rows per page */}
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="h-6 text-xs rounded-lg px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem
                      key={pageSize}
                      value={`${pageSize}`}
                      className="text-xs"
                    >
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-7 w-7 p-0 flex items-center justify-center border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:border-amber-800 dark:hover:border-yellow-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-7 w-7 p-0 flex items-center justify-center border rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:border-amber-800 dark:hover:border-yellow-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportsTable;
