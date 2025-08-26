"use client";

import { flexRender } from "@tanstack/react-table";
import { ChevronDown, Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Member } from "@/global/type";
import ApplicationPagination from "./ApplicationPagination";
import { ApplicationTableData } from "./ApplicationTableData";

export default function ApplicationTable({
  pendingMember,
  isLoading,
}: {
  pendingMember: Member[];
  isLoading: boolean;
}) {
  const { table, columns } = ApplicationTableData({ pendingMember });

  return (
    <div className="space-y-4 w-full min-h-screen">
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl dark:bg-black">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight">
                Pending Member Applications
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                Review and manage all pending member requests.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={
                    (table
                      .getColumn("firstName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) =>
                    table.getColumn("firstName")?.setFilterValue(e.target.value)
                  }
                  className="pl-8 w-[160px] h-9 text-sm rounded-xl"
                />
              </div>

              {/* Category Filter */}
              <Select
                value={
                  (table.getColumn("category")?.getFilterValue() as string) ??
                  ""
                }
                onValueChange={(val) =>
                  table
                    .getColumn("category")
                    ?.setFilterValue(val === "all" ? "" : val)
                }
              >
                <SelectTrigger className="w-[130px] h-9 text-sm rounded-xl">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {["all", "UCM", "CWA", "CYAF", "CYF", "CHILDREN"].map(
                    (val) => (
                      <SelectItem key={val} className="text-sm" value={val}>
                        {val === "all" ? "All" : val}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Column Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 text-sm rounded-xl"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Columns
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-sm"
                      checked={column.getIsVisible()}
                      onCheckedChange={(val) => column.toggleVisibility(!!val)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, idx) => (
                    <TableRow key={`skeleton-${idx}`}>
                      {table.getVisibleFlatColumns().map((column) => (
                        <TableCell key={column.id}>
                          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, i) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={
                        i % 2 === 0
                          ? "bg-white dark:bg-black"
                          : "bg-gray-50 dark:bg-gray-950"
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-sm py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-gray-500 text-sm"
                    >
                      No pending members
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <ApplicationPagination table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
