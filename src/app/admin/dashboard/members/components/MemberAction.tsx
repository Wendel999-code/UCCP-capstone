"use client";

import { useState } from "react";
import { useDeleteMember } from "@/app/hooks/useMember";
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader, MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";

const MemberAction = ({ memberID }: { memberID: string }) => {
  const [open, setOpen] = useState(false);
  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();

  const handleCopy = () => {
    navigator.clipboard.writeText(memberID);
    toast.success("Member ID copied to clipboard!");
  };

  const handleDeleteConfirmed = () => {
    deleteMember(memberID, {
      onSuccess: () => {
        toast.success("Member deleted successfully");
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
        setOpen(false);
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
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopy}>
            Copy member ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View member</DropdownMenuItem>
          <DropdownMenuItem>Edit details</DropdownMenuItem>
          <DropdownMenuItem>Send message</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-500 hover:bg-red-600 hover:text-white"
          >
            Delete member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this member?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently remove this
              member’s data from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <>
                  {" "}
                  <Loader className="animate-spin " /> "Deleting..."{" "}
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MemberAction;
