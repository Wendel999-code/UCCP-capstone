import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {

  const rows = Array.from({ length: 7 });

  return (
  <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <Table>
      <TableCaption>
        <Skeleton className="h-[24px] w-[50px]" /> 
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">
            <Skeleton className="h-40 w-300 rounded-2xl" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-20" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="h-4 w-20 ml-auto" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-24 ml-auto" />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
  );
}
