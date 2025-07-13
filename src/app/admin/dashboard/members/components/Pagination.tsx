import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Member } from "@/global/type";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  table,
  totalMember,
}: {
  table: Table<Member>;
  totalMember: number;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 py-4 flex-wrap">
      <div className="flex-1 text-[12px] text-muted-foreground">
        <div className="flex-1 text-[12px] text-muted-foreground">
          Total members: {totalMember}
        </div>
      </div>

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
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-7 px-2 cursor-pointer disabled:cursor-not-allowed  border hover:border-red-900  dark:hover:border-yellow-400"
        >
          <ChevronLeft className="h-7 w-7" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-7 px-2 cursor-pointer border hover:border-red-900  dark:hover:border-yellow-400"
        >
          <ChevronRight className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
