"use client";

import React from "react";

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
import SuperAdminAction from "./SuperAdminAction";

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

export function SuperAdminTablesData({ members }: { members: Member[] }) {
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
            FIRSTNAME
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className=" ml-3 text-[14px]  ">{row.getValue("firstName")}</p>
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
            LASTNAME
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="lowercase text-[14px]  ml-3 ">
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
            AGE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="ml-3 text-[14px] ">{row.getValue("age")}</p>
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
            GENDER
          </span>
        );
      },
      cell: ({ row }) => (
        <p className="text-[14px] ">{row.getValue("gender")}</p>
      ),
    },

    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <p className={`${getCategoryColor(category)} text-[14px] `}>
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
          <p className={`${getStatusColor(status)} text-[14px] `}>
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
        return (
          <p
            className={`text-[14px] ${
              baptism === "Baptized" ? "text-green-500" : "text-red-500"
            }`}
          >
            {" "}
            {baptism}
          </p>
        );
      },
    },

    {
      accessorFn: (row) => row.Church?.brgy ?? "",
      id: "circuit",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Circuit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="capitalize text-[14px]  text-amber-500">
          {row.original.Church?.brgy}
        </p>
      ),
      enableSorting: true,
      enableHiding: true,
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const member = row.original;

        return <SuperAdminAction memberID={member.id} />;
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
