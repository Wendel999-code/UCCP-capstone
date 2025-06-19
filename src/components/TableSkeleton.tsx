import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <div className="w-full rounded-md border overflow-auto bg-white dark:bg-black">
      <Table className="min-w-[800px] text-sm">
        <TableHeader className="bg-muted dark:bg-neutral-900">
          <TableRow>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableHead key={i} className="px-4 py-2">
                <Skeleton className="h-3 w-16 rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/50">
              {Array.from({ length: 8 }).map((_, cellIndex) => (
                <TableCell key={cellIndex} className="px-4 py-2">
                  <Skeleton className="h-4 w-24 rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
