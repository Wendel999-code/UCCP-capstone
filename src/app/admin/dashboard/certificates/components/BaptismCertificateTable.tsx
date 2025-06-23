"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CertificateRequest } from "@/global/type";

export default function BaptismCertificateTable() {
  const dummyData: CertificateRequest[] = [];
  const [selected, setSelected] = React.useState<CertificateRequest | null>(
    null
  );

  const columns: ColumnDef<CertificateRequest>[] = [
    { accessorKey: "Firstname", header: "Firstname" },
    { accessorKey: "Lastname", header: "Lastname" },
    { accessorKey: "dateOfBirth", header: "Date of Birth" },
    { accessorKey: "requestedDate", header: "Requested On" },
    { accessorKey: "status", header: "Status" },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSelected(row.original)}
        >
          Preview
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-md ">
            Baptismal Certificate Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader className="bg-muted dark:bg-zinc-900">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-xs uppercase">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
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
                    <TableCell colSpan={columns.length} className="text-center">
                      No certificate requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogTitle>{""}</DialogTitle>
        <DialogContent className="w-full max-w-3xl p-6">
          {selected && (
            <div className="w-full border-4 border-yellow-600 p-10 text-center bg-white text-black rounded-md space-y-2">
              <h2 className="text-lg font-bold">CERTIFICATE OF BAPTISM</h2>
              <p>This certifies that</p>
              <h1 className="text-2xl font-bold underline">wendel</h1>
              <p>
                was baptized by immersion in the name of the Lord Jesus Christ
                on
                <strong>june</strong>
              </p>
              <p>
                <br />
                <strong> Cana Circuit Church</strong>
              </p>
              <div className="flex justify-around mt-8 text-sm">
                <div>
                  <p>______________________</p>
                  <p>Church Minister</p>
                </div>
                <div>
                  <p>______________________</p>
                  <p>Presiding Pastor</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
