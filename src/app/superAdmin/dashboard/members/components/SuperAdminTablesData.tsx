"use client";

import React, { useEffect, useState } from "react";

import { useGetAllmemberBySuperAdmin } from "@/app/hooks/useMember";
import { Button } from "@/components/ui/button";
import { Member } from "@/global/type";
import supabase from "@/lib/supabase/client";
import {
  getCoreRowModel,
  PaginationState,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { format } from "date-fns";
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

// const getStatusColor = (status: string) => {
//   switch (status?.toLowerCase()) {
//     case "active":
//       return " text-green-800 px-2 py-1 rounded-md font-medium w-full";
//     case "pending":
//       return " text-orange-500 px-2 py-1 rounded-md font-medium w-full";
//     case "inactive":
//       return " text-red-800 px-2 py-1 rounded-md font-medium w-full";
//     default:
//       return " text-gray-800 px-2 py-1 rounded-md font-medium w-full";
//   }
// };

export function SuperAdminTablesData() {
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

  const [circuit, setcircuit] = useState("");

  const {
    data: membersData,
    isLoading,
    refetch,
  } = useGetAllmemberBySuperAdmin(
    pagination.pageIndex + 1,
    pagination.pageSize,
    globalFilter.search,
    sortBy,
    sortOrder,
    globalFilter.category,
    circuit
  );

  console.log("membersData", membersData);

  useEffect(() => {
    const channel = supabase
      .channel("super_admin-member")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "member",
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
      cell: ({ row }) => {
        return (
          <p className="ml-3 text-[14px] capitalize ">
            {row.getValue("lastName")}
          </p>
        );
      },
    },

    {
      accessorKey: "firstName",
      header: "firstName",
      cell: ({ row }) => {
        return (
          <p className=" ml-3 text-[14px] capitalize ">
            {row.getValue("firstName")}
          </p>
        );
      },
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => (
        <p className="ml-3 capitalize text-[14px] ">{row.getValue("age")}</p>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <p className="text-[14px] capitalize">{row.getValue("gender")}</p>
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
      accessorFn: (row) => row.Church?.brgy ?? "",
      id: "circuit",
      header: "Local Church",
      cell: ({ row }) => (
        <p className="capitalize text-[14px] ml-4  text-amber-500">
          {row.original.Church?.brgy}
        </p>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const member = row.original;
        return <SuperAdminAction memberID={member?.id} />;
      },
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
    circuit,
    setcircuit,
  };
}
