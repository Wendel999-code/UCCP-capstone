import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Member } from "@/global/type";

const Pagination = ({ table }: { table: Table<Member> }) => {
  return (
    <div className="flex items-center justify-between gap-2 py-4 flex-wrap">
      {/* <div className="flex-1 text-[12px] text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}

      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <p className="text-[12px] font-medium text-muted-foreground">
          Rows per page
        </p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="h-5 text-[10px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className="text-[10px]"
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-4 px-2 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-4 px-2 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
