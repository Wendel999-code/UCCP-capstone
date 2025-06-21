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
import { ViewMemberModal } from "./ViewMemberModal";
import { GetMemberByID } from "@/lib/supabase/actions/member";
import { useQueryClient } from "@tanstack/react-query";

const MemberAction = ({ memberID }: { memberID: string }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openViewMember, setOpenViewMember] = useState(false);

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
    deleteMember(memberID, {
      onSuccess: () => {
        toast.success("Member deleted successfully");
        setOpenDeleteDialog(false);
      },
      onError: (error) => {
        toast.error(error.message);
        setOpenDeleteDialog(false);
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

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpenViewMember(true)}
            onMouseEnter={handlePrefetch}
          >
            View member
          </DropdownMenuItem>

          <DropdownMenuItem>Edit details</DropdownMenuItem>
          <DropdownMenuItem>Send message</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpenDeleteDialog(true)}
            className="text-red-500 hover:bg-red-600 hover:text-white"
          >
            Delete member
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

      <ViewMemberModal
        open={openViewMember}
        setOpen={setOpenViewMember}
        memberID={memberID}
      />
    </>
  );
};

export default MemberAction;
