"use client";

import { Button } from "@/components/ui/button";
import { Member } from "@/global/type";
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
import { ArrowUpDown } from "lucide-react";
import React from "react";
import ApplicationAction from "./ApplicationAction";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";

const getCategoryColor = (category: string) => {
  switch (category?.toUpperCase()) {
    case "UCM":
      return "text-purple-700";
    case "CWA":
      return "text-pink-700";
    case "CYAF":
      return "text-blue-700";
    case "CYF":
      return "text-green-700";
    case "CHILDREN":
      return "text-yellow-700";
    default:
      return "text-gray-600";
  }
};

export function ApplicationTableData({
  pendingMember,
}: {
  pendingMember: Member[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 text-sm"
        >
          First Name
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="font-medium ml-3  capitalize">
          {row.getValue("firstName")}
        </p>
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 text-sm"
        >
          Last Name
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="capitalize ml-3">{row.getValue("lastName")}</p>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 text-sm"
        >
          Age
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => <p>{row.getValue("age")}</p>,
    },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 text-sm"
        >
          Date of Birth
          <ArrowUpDown className="ml-1 h-3 w-3" />
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

        return <p className="text-sm">{formatted}</p>;
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <p className="capitalize">{row.getValue("gender")}</p>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <span
            className={cn(
              "capitalize font-medium text-sm px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-900",
              getCategoryColor(category)
            )}
          >
            {category || "N/A"}
          </span>
        );
      },
    },
    {
      accessorKey: "activeStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("activeStatus") as string;
        return (
          <span
            className={cn(
              "text-sm font-medium",
              status === "active" ? "text-green-600" : "text-red-600"
            )}
          >
            {status
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : "Unknown"}
          </span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 text-sm"
        >
          Applied Date
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return <p className="text-sm">{date.toLocaleDateString()}</p>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ApplicationAction memberID={row.original.id} />,
    },
  ];

  const table = useReactTable({
    data: pendingMember,
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
