"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetReqCertificateByID } from "@/lib/supabase/actions/certificate";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import CertificatePreview from "./CertificatePreview";

const CertificateAction = ({ reqID }: { reqID: string }) => {
  const [openCertPreview, setOpenCertPreview] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    toast.success("Deleted (hook placeholder).");
    // TODO: Implement actual delete logic
  };

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["req-certificate-ByID", reqID],
      queryFn: async () => {
        const res = await GetReqCertificateByID(reqID);
        if (!res.success || !res.data) {
          throw new Error(res.error || "No certificate data found.");
        }
        return res.data;
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Preview Certificate */}
          <DropdownMenuItem
            onClick={() => setOpenCertPreview(true)}
            onMouseEnter={handlePrefetch}
            className="hover:bg-amber-100 cursor-pointer dark:hover:bg-amber-900"
          >
            <Eye className="mr-1 h-4 w-4 text-amber-500" />
            <span>Preview Certificate</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete Confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="hover:bg-red-100 dark:hover:bg-red-950">
                <Trash2 className="mr-2 h-4 w-4 text-red-900 dark:text-red-500" />
                <span className="text-red-900 dark:text-red-400">Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this certificate request. This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-900 hover:bg-red-800 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <CertificatePreview
        reqID={reqID}
        openCertPreview={openCertPreview}
        setOpenCertPreview={setOpenCertPreview}
      />
    </>
  );
};

export default CertificateAction;
