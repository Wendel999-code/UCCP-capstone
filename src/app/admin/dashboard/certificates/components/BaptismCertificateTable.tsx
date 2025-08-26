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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CertificateRequest } from "@/global/type";
import CertificatePagination from "./CertificatePagination";
import { CertificateTableData } from "./CertificateTableData";

export default function BaptismCertificateTable({
  certificates,
  isLoading,
}: {
  certificates: CertificateRequest[];
  isLoading: boolean;
}) {
  const { table, columns } = CertificateTableData({ certificates });

  return (
    <>
      <div className="space-y-2 w-full ">
        {/* Header */}

        {/* Filters and Actions */}
        <Card className="dark:bg-black ">
          <CardHeader>
            <div className="flex items-center justify-between space-x-2">
              <div>
                {" "}
                <CardTitle className="text-xl">Baptism Certificate</CardTitle>
                <CardDescription className="text-gray-600">
                  A comprehensive list of requested baptism certificates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-wrap gap-2 py-2">
              <div className="flex items-center flex-wrap gap-2">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-2 top-[6px] h-5 w-3 text-muted-foreground" />
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
                    className="pl-6 w-[200px] h-[36px] text-[11px] text-muted-foreground"
                  />
                </div>
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
                  {isLoading ? (
                    Array.from({ length: 10 }).map((_, idx) => (
                      <TableRow key={`skeleton-${idx}`}>
                        {table.getVisibleFlatColumns().map((column) => (
                          <TableCell key={column.id}>
                            <div className="h-4 w-full rounded bg-muted animate-pulse" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : table.getRowModel().rows?.length ? (
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
            <CertificatePagination table={table} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
