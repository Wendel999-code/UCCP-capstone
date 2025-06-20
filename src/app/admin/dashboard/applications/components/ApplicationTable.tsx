"use client";

import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import { ChevronDown, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationTableData } from "./ApplicationTableData";
import ApplicationPagination from "./ApplicationPagination";
import { Member } from "@/global/type";

export default function ApplicationTable({
  pendingMember,
}: {
  pendingMember: Member[];
}) {
  const { table, columns } = ApplicationTableData({ pendingMember });

  return (
    <>
      <div className="space-y-2 w-full ">
        {/* Header */}

        {/* Filters and Actions */}
        <Card className="dark:bg-black">
          <CardHeader>
            <div className="flex items-center justify-between space-x-2">
              <div>
                {" "}
                <CardTitle className="text-xl">
                  Applied for membership
                </CardTitle>
                <CardDescription className="text-gray-600">
                  A comprehensive list of all pending members
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-wrap gap-2 py-2">
              <div className="flex items-center flex-wrap gap-2">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-2 top-[6px] h-3 w-3 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={
                      (table
                        .getColumn("firstName")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) =>
                      table
                        .getColumn("firstName")
                        ?.setFilterValue(e.target.value)
                    }
                    className="pl-6 w-[120px] h-7 text-[11px] text-muted-foreground"
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
                  <SelectTrigger className="w-[110px] h-7 text-xs">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["all", "UCM", "CWA", "CYAF", "CYF", "CHILDREN"].map(
                      (val) => (
                        <SelectItem
                          key={val}
                          className="text-[11px]"
                          value={val}
                        >
                          {val === "all" ? "All" : val}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Column Toggle */}
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      <Filter className="mr-1 h-3 w-3" />
                      Columns
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize text-xs"
                          checked={column.getIsVisible()}
                          onCheckedChange={(val) =>
                            column.toggleVisibility(!!val)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
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
                        className="h-24 text-center"
                      >
                        No results.
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
    </>
  );
}
