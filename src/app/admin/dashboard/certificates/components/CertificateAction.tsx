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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const CertificateAction = ({ memberID }: { memberID: string }) => {
  const handleCopyMemberId = async () => {
    await navigator.clipboard.writeText(memberID);
    toast.success("Member ID copied to clipboard!");
  };

  const handleDelete = async () => {
    toast.success("Deleted (hook placeholder).");
  };

  return (
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
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4 text-amber-600" />
              <span>Preview Certificate</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogTitle>Certificate Preview</DialogTitle>
            {/* <CertificatePreview memberID={memberID} /> */}
          </DialogContent>
        </Dialog>

        <DropdownMenuSeparator />

        {/* Copy Member ID */}
        <DropdownMenuItem onClick={handleCopyMemberId}>
          <Copy className="mr-2 h-4 w-4 text-blue-600" />
          <span>Copy Member ID</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete Confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              <span className="text-red-600">Delete</span>
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
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CertificateAction;
