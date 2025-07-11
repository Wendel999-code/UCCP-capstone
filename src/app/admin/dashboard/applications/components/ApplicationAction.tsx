"use client";

import { useDeleteMember } from "@/app/hooks/useMember";
import {
  AlertDialog,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

const ApplicationAction = ({ memberID }: { memberID: string }) => {
  const { mutateAsync: deleteMember, isPending: isDeleting } =
    useDeleteMember();
  const [open, setOpen] = useState(false);

  const handleDeleteApplication = async () => {
    try {
      const res = await deleteMember(memberID);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success("Application deleted successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete application");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ApplicationDetailsModal memberID={memberID} />

        <DropdownMenuSeparator />

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="text-red-600 border-none w-full cursor-pointer"
            >
              <Trash className="text-red-600 mr-2" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete this application. This
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isDeleting}
                onClick={handleDeleteApplication}
              >
                {isDeleting ? (
                  <>
                    <Loader className="animate-spin mr-2" /> Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationAction;
