"use client";

import React from "react";
import MemberAction from "./MemberAction";
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
import { Member } from "@/global/type";

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

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return " text-green-800 px-2 py-1 rounded-md font-medium w-full";
    case "pending":
      return " text-orange-500 px-2 py-1 rounded-md font-medium w-full";
    case "inactive":
      return " text-red-800 px-2 py-1 rounded-md font-medium w-full";
    default:
      return " text-gray-800 px-2 py-1 rounded-md font-medium w-full";
  }
};

export function TablesData({ members }: { members: Member[] }) {
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
            className="text-[12px] "
          >
            Firstname
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="font-medium ml-3 text-[10px] ">
            {row.getValue("firstName")}
          </p>
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
            className="text-[12px] px-2"
          >
            Lastname
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="lowercase ml-3 text-[10px] ">
          {row.getValue("lastName")}
        </p>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-[12px] px-2"
          >
            Age
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="ml-3 text-[10px]">{row.getValue("age")}</p>
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => {
        return (
          <span
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-[12px] cursor-pointer"
          >
            Gender
          </span>
        );
      },
      cell: ({ row }) => (
        <p className="text-[10px]">{row.getValue("gender")}</p>
      ),
    },

    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <p className={`${getCategoryColor(category)} text-[10px]`}>
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "N/A"}
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
          <p className={`${getStatusColor(status)} text-[10px]`}>
            {status
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : "Unknown"}
          </p>
        );
      },
    },
    {
      accessorKey: "baptism_status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Baptism
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const baptism = row.getValue("baptism_status") as string;
        return <p className="text-[10px]"> {baptism}</p>;
      },
    },

    {
      accessorKey: "circuit",
      header: "circuit",
      cell: ({ row }) => {
        const circuit = row.original.Church?.brgy as string;
        return <p className="text-[10px]"> {circuit}</p>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const member = row.original;

        return <MemberAction memberID={member.id} />;
      },
    },
  ];

  const table = useReactTable({
    data: members,
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
