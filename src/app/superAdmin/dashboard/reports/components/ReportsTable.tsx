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
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle className="ml-90  text-xl text-red-900 dark:text-yellow-500">
          Log Events for All Churches
        </CardTitle>
        {/* <Button
          onClick={handleExportPDF}
          variant={"ghost"}
          className="h-7 px-2 text-xs cursor-pointer border hover:text-red-900 hover:border-red-900 dark:hover:text-yellow-400  dark:hover:border-yellow-400 transition-all  "
        >
          <Download className="mr-1 h-2.5 w-2.5 " />
          {exporting ? "Exporting..." : "Export "}
        </Button> */}
      </CardHeader>
      <CardContent className="mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-semibold text-amber-600"
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
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="font-sans text-xs text-muted-foreground"
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

        <div className="flex items-center justify-between gap-2 py-4 flex-wrap">
          <div className="flex-1 text-[12px] text-muted-foreground">
            <div className="flex-1 text-[12px] text-muted-foreground">
              Total Logs : {membersData?.count ?? 0}
            </div>
          </div>

          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <p className="text-[12px] font-medium text-muted-foreground">
              Rows per page
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-5 text-[10px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={`${pageSize}`}
                    className="text-[10px]"
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
              className="h-7 px-2 cursor-pointer disabled:cursor-not-allowed  border hover:border-red-900  dark:hover:border-yellow-400"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-7 px-2 cursor-pointer border hover:border-red-900  dark:hover:border-yellow-400"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportsTable;
