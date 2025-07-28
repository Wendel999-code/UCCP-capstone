"use client";
import { useDeleteUser, useUserToggleBlock } from "@/app/hooks/useUserAccount";
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
import {
  Loader,
  MoreHorizontal,
  Trash,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function SuperAdminAction({
  userId,
  isBlock,
}: {
  userId: string;
  isBlock: boolean;
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const { mutate: toggleBlock, isPending: isToggling } = useUserToggleBlock();

  const [block, setBlock] = useState(isBlock);

  const handleToggleBlock = () => {
    try {
      toggleBlock(
        { userId, isBlock: !block },
        {
          onSuccess: () => {
            setBlock(!block);
            toast.success(
              !block
                ? "User blocked successfully"
                : "User unblocked successfully"
            );
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } catch (error) {
      console.log("error in blocking user", error);
      toast.error("Something went wrong upon blocking");
    }
  };

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
            onClick={handleToggleBlock}
            disabled={isToggling}
            className={`
    flex items-center gap-2
    cursor-pointer text-sm font-medium  hover:bg-none
    ${isToggling ? "cursor-not-allowed opacity-70" : ""}
  `}
          >
            {block ? (
              <Button
                size={"sm"}
                className="border cursor-pointer  bg-sky-900 hover:bg-sky-600  w-[5.5rem] text-white"
              >
                <UserRoundCheck className="w-2 h-4 text-white " />
                Unblock
              </Button>
            ) : (
              <Button
                size={"sm"}
                variant="ghost"
                className=" cursor-pointer  hover:border-red-500 text-red-600 hover:text-red-500 "
              >
                <UserRoundX className="w-4 h-4 mr-1 text-red-600" />
                Block
              </Button>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpenDeleteDialog(true)}
            className=" cursor-pointer "
          >
            <Button
              className="cursor-pointer bg-red-900 hover:bg-red-500 text-white"
              size={"sm"}
            >
              {" "}
              <Trash className="text-white" /> Delete
            </Button>
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
