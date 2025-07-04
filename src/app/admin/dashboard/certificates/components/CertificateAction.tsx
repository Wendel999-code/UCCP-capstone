"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DeleteReqCertificate,
  GetReqCertificateByID,
} from "@/lib/supabase/actions/certificate";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import CertificatePreview from "./CertificatePreview";
import DeleteDialog from "./DeleteDialog";

const CertificateAction = ({ reqID }: { reqID: string }) => {
  const [openCertPreview, setOpenCertPreview] = useState(false);
  const queryClient = useQueryClient();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await DeleteReqCertificate(reqID);
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["req-certificate"] });
      } else if (!res.success) {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
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
            className=" cursor-pointer hover:bg-sky-900 "
          >
            <Eye className="h-4 w-4 text-sky-500" />
            <span className="cursor-pointer text-sky-500  ">Preview </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete Confirmation */}
          <DropdownMenuItem
            onClick={() => setOpenDelete(true)}
            className="hover:bg-red-100 dark:hover:bg-red-950"
          >
            <Trash2 className=" h-4 w-4 text-red-900 dark:text-red-500" />
            <span className="text-red-900 dark:text-red-400 cursor-pointer">
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CertificatePreview
        reqID={reqID}
        openCertPreview={openCertPreview}
        setOpenCertPreview={setOpenCertPreview}
      />
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={handleDelete}
        title="Delete Certificate"
        description="Are you sure you want to delete this  requested  certificate? This action cannot be undone."
      />
    </>
  );
};

export default CertificateAction;
