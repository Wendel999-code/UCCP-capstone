"use client";
import { Button } from "@/components/ui/button";
import { CertificateRequest } from "@/global/type";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export function CertificateTableData({
  certificates,
}: {
  certificates: CertificateRequest[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<CertificateRequest>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 "
          >
            Firstname
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="font-medium ml-3">{row.getValue("firstName")}</div>
        );
      },
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Lastname
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase ml-3 ">{row.getValue("lastName")}</div>
      ),
    },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[12px] px-2"
        >
          Date of Birth
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const rawDate = row.getValue("date_of_birth");
        const parsedDate =
          rawDate && typeof rawDate === "string"
            ? new Date(rawDate)
            : undefined;

        const formatted =
          parsedDate && !isNaN(parsedDate.getTime())
            ? format(parsedDate, "MMMM d, yyyy")
            : "N/A";

        return <p className="ml-3 text-[14px]">{formatted}</p>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <p className="text-red-600">
            {status
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : "Unknown"}
          </p>
        );
      },
    },
    {
      accessorKey: "brgy",
      header: "circuit",
      cell: ({ row }) => {
        const circuit = row.original.Church?.brgy;
        return <p className="text-amber-500"> {circuit}</p>;
      },
    },

    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Date Requested
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return <p className="text-xs ml-4">{date.toLocaleDateString()}</p>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      // cell: ({ row }) => {
      //   const certificate = row.original;

      //   return <CertificateAction  />;
      // },
    },
  ];

  const table = useReactTable({
    data: certificates,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return { table, columns };
}
