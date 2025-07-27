"use client";
import { useDeleteUser } from "@/app/hooks/useUserAccount";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { Eye, Loader, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function SuperAdminAction({ userId }: { userId: string }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleDeleteConfirmed = () => {
    try {
      deleteUser(userId, {
        onSuccess: () => {
          toast.success("User deleted successfully");
          setOpenDeleteDialog(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } catch (error) {
      console.log("error in deleting user", error);
      toast.error("Something went wrong upon deletions");
    }
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

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-sky-500 cursor-pointer"
            // onClick={() => setOpenViewMember(true)}
            // onMouseEnter={handlePrefetch}
          >
            <Eye className="text-sky-500" /> View
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpenDeleteDialog(true)}
            className="text-red-500 hover:bg-red-600 cursor-pointer hover:text-white"
          >
            <Trash className="text-red-500" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently remove this
              user’s data from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button
              onClick={handleDeleteConfirmed}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <>
                  {" "}
                  <Loader className="animate-spin " /> Deleting...{" "}
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
