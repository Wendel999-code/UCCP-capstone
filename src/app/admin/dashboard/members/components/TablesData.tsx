"use client";

import { useGetMembersByChurchId } from "@/app/hooks/useMember";
import { Button } from "@/components/ui/button";
import { Member } from "@/global/type";
import {
  getCoreRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";
import MemberAction from "./MemberAction";

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

export function TablesData() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState({
    search: "",
    category: "",
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const sortBy = sorting[0]?.id ?? "";
  const sortOrder = sorting[0]?.desc ? "desc" : "asc";

  const { data: membersData, isLoading } = useGetMembersByChurchId(
    pagination.pageIndex + 1,
    pagination.pageSize,
    globalFilter.search,
    sortBy,
    sortOrder,
    globalFilter.category
  );

  const totalMember = membersData?.count ?? 0;

  const columns: ColumnDef<Member>[] = [
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
      accessorKey: "lastName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[12px] px-2"
        >
          LASTNAME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="ml-3 text-[14px]">{row.getValue("lastName")}</p>
      ),
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[12px] px-2"
        >
          FIRSTNAME
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="ml-3 text-[14px]">{row.getValue("firstName")}</p>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[12px] px-2"
        >
          AGE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="ml-3 text-[14px]">{row.getValue("age")}</p>
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
      accessorKey: "gender",
      header: "GENDER",
      cell: ({ row }) => (
        <p className="text-[14px]">{row.getValue("gender")}</p>
      ),
    },

    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <p className={`${getCategoryColor(category)} text-[14px]`}>
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "N/A"}
          </p>
        );
      },
    },
    {
      accessorFn: (row) => row.Church?.brgy ?? "",
      id: "circuit",
      header: "Local Church",
      cell: ({ getValue }) => (
        <p className="text-[14px] text-amber-500">{getValue() as string}</p>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <MemberAction memberID={row.original.id} />,
    },
  ];

  const table = useReactTable({
    data: membersData?.data ?? [],
    columns,
    pageCount: Math.ceil((membersData?.count ?? 0) / pagination.pageSize),
    state: { pagination, globalFilter, sorting },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    columns,
    isLoading,
    globalFilter,
    setGlobalFilter,
    totalMember,
  };
}
