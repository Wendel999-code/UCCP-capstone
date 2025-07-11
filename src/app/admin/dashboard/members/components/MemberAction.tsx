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
import { GetMemberByID } from "@/lib/supabase/actions/member";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, Loader, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { UpdateMember } from "./UpdateMember";
import { ViewMemberModal } from "./ViewMemberModal";

const MemberAction = ({ memberID }: { memberID: string }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openViewMember, setOpenViewMember] = useState(false);

  const [openEditMember, setOpenEditMember] = useState(false);

  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();

  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["member-details", memberID],
      queryFn: async () => {
        const res = await GetMemberByID(memberID);
        if (!res.success) throw new Error(res.message);
        return res.data;
      },
    });
  };

  const handleDeleteConfirmed = () => {
    try {
      deleteMember(memberID, {
        onSuccess: () => {
          toast.success("Member deleted successfully");
          setOpenDeleteDialog(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } catch (error) {
      console.log("error in deleting member", error);
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
            onClick={() => setOpenViewMember(true)}
            onMouseEnter={handlePrefetch}
          >
            <Eye className="text-sky-500" /> View
          </DropdownMenuItem>

          <DropdownMenuItem
            onMouseEnter={handlePrefetch}
            onClick={() => setOpenEditMember(true)}
            className="text-amber-500 cursor-pointer"
          >
            {" "}
            <Edit className="text-amber-500" /> Edit{" "}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Send message</DropdownMenuItem> */}
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
              Are you sure you want to delete this member?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently remove this
              member’s data from the database.
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

      <ViewMemberModal
        open={openViewMember}
        setOpen={setOpenViewMember}
        memberID={memberID}
      />

      <UpdateMember
        open={openEditMember}
        setOpen={setOpenEditMember}
        memberID={memberID}
      />
    </>
  );
};

export default MemberAction;
