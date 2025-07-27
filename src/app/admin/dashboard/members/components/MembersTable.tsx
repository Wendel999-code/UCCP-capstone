"use client";

import { Button } from "@/components/ui/button";
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
import { flexRender } from "@tanstack/react-table";
import { ChevronDown, Download, Filter, Plus, Search } from "lucide-react";

import { useSidebarData } from "@/app/hooks/useSideBar";
import DebouncedSearchInput from "@/components/DebounceInput";
import { exportToPDF } from "@/lib/utils/exportPDF";
import { useState } from "react";
import { toast } from "react-toastify";
import AddMemberModal from "./AddMemberModal";
import Pagination from "./Pagination";
import { TablesData } from "./TablesData";

export default function MembersTable() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [isExporting, setIsExporting] = useState(false);

  const { data, isLoading } = useSidebarData();

  const {
    table,
    columns,
    isLoading: isLoadingTable,
    globalFilter,
    setGlobalFilter,
    totalMember,
  } = TablesData();

  const handleExportPDF = async () => {
    setIsExporting(true);

    if (isLoading || isLoadingTable) return;

    try {
      exportToPDF(table, {
        title: `${data?.church?.brgy} Local Church Members`,
        filename: `${data?.church?.brgy} Local Church.pdf`,
      });

      toast.success("PDF exported successfully");
    } catch (error) {
      console.log("Error exporting PDF:", error);
      toast.error("Error exporting PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Card className="dark:bg-black">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg">Member Directory</CardTitle>
              <CardDescription className="text-xs text-gray-500">
                A comprehensive list of church members
              </CardDescription>
            </div>
            <Button
              onClick={() => setAddModalOpen(true)}
              size={"sm"}
              className="h-7 px-3 text-[12px] cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black "
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Member
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-2 top-[8px] h-5 w-3 text-muted-foreground" />
                <DebouncedSearchInput
                  defaultValue={globalFilter.search}
                  searchMember={(searchValue) =>
                    setGlobalFilter((prev) => ({
                      ...prev,
                      search: searchValue,
                    }))
                  }
                />
              </div>

              {/* Category Filter */}
              <Select
                value={globalFilter.category}
                onValueChange={(val) =>
                  setGlobalFilter((prev) => ({
                    ...prev,
                    category: val === "all" ? "" : val,
                  }))
                }
              >
                <SelectTrigger className="w-[110px] h-7 text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {["all", "UCM", "CWA", "CYAF", "CYF", "CHILDREN"].map(
                    (val) => (
                      <SelectItem key={val} className="text-[10px]" value={val}>
                        {val === "all" ? "ALL" : val}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Column Toggle + Export */}
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-7 px-2 text-xs">
                    <Filter className="mr-1 h-2.5 w-2.5" />
                    Columns
                    <ChevronDown className="ml-1 h-2.5 w-2.5" />
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

              <Button
                disabled={isExporting}
                onClick={handleExportPDF}
                variant={"ghost"}
                className="h-7 px-2 text-xs cursor-pointer border hover:text-red-900 hover:border-red-900 dark:hover:text-yellow-400  dark:hover:border-yellow-400 transition-all  "
              >
                <Download className="mr-1 h-2.5 w-2.5 " />
                {isExporting ? "Exporting..." : "Export "}
              </Button>
            </div>
          </div>

          {/* Table */}

          <div className="rounded-md border overflow-auto bg-white dark:bg-black">
            <Table className="min-w-[800px] text-sm">
              <TableHeader className="sticky top-0 z-10 bg-muted dark:bg-neutral-900 shadow-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="px-4 py-2 font-medium text-muted-foreground uppercase tracking-wide text-[11px]"
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
                {isLoadingTable ? (
                  Array.from({ length: 10 }).map((_, idx) => (
                    <TableRow key={`skeleton-${idx}`}>
                      {table.getVisibleFlatColumns().map((column) => (
                        <TableCell key={column.id}>
                          <div className="h-4 w-full rounded bg-muted animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-4 py-2 align-middle"
                        >
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
                      className="h-24 text-center text-muted-foreground text-sm"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination table={table} totalMember={totalMember} />
        </CardContent>
      </Card>

      <AddMemberModal open={addModalOpen} setOpen={setAddModalOpen} />
    </div>
  );
}
