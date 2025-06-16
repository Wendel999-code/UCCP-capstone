"use client";
import ApplicationAction from "./ApplicationAction";
import { Member } from "../../members/page";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";

const getCategoryColor = (category: string) => {
  switch (category?.toUpperCase()) {
    case "UCM":
      return " text-purple-800 px-2 py-1 rounded-md font-medium w-auto";
    case "CWA":
      return "text-pink-800 px-2 py-1 rounded-md font-medium w-auto";
    case "CYAF":
      return "text-blue-800 px-2 py-1 rounded-md font-medium w-auto";
    case "CYF":
      return " text-green-800 px-2 py-1 rounded-md font-medium w-auto";
    case "CHILDREN":
      return " text-yellow-800 px-2 py-1 rounded-md font-medium w-auto";
    default:
      return "text-gray-800 px-2 py-1 rounded-md font-medium w-auto";
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
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Age
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <p className="ml-3">{row.getValue("age")}</p>,
    },
    {
      accessorKey: "gender",
      header: "gender",
      cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <p className={getCategoryColor(category)}>
            {category?.toUpperCase() || "N/A"}
          </p>
        );
      },
    },
    {
      accessorKey: "activeStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("activeStatus") as string;
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
      accessorKey: "address",
      header: "Address",
      // Add maxWidth to make column wider
      maxSize: 300,
      cell: ({ row }) => {
        const address = row.getValue("address") as string;
        return (
          <div className="min-w-[200px] max-w-[300px] whitespace-normal break-words text-sm">
            {address
              ? address.charAt(0).toUpperCase() + address.slice(1)
              : "Unknown"}
          </div>
        );
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
            Applied Date
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
      cell: ({ row }) => {
        const member = row.original;

        return <ApplicationAction memberID={member.id} />;
      },
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
