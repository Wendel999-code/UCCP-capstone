"use client";

import { useDeleteMemberBySuperAdmin } from "@/app/hooks/useMember";
import {
  AlertDialog,
  AlertDialogAction,
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
import { GetMemberByIDBySuperAdmin } from "@/lib/supabase/actions/member";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, Loader, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ViewMemberBySuperAdmin } from "./ViewMemberBySuperAdmin";

const SuperAdminAction = ({ memberID }: { memberID: string }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openViewMember, setOpenViewMember] = useState(false);

  const { mutate: deleteMember, isPending: isDeleting } =
    useDeleteMemberBySuperAdmin();

  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["member-details-super-admin", memberID],
      queryFn: async () => {
        const res = await GetMemberByIDBySuperAdmin(memberID);
        if (!res.success) throw new Error(res.message);
        return res.data;
      },
    });
  };

  const handleDeleteConfirmed = () => {
    if (!memberID) {
      toast.error("Member ID is required");
      setOpenDeleteDialog(false);
      return;
    }

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
            className="cursor-pointer text-sky-500 "
            onClick={() => setOpenViewMember(true)}
            onMouseEnter={handlePrefetch}
          >
            <Eye className="text-sky-500" /> View
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer text-amber-400 ">
            {" "}
            <Edit className="text-amber-400" /> Edit{" "}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Send message</DropdownMenuItem> */}
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpenDeleteDialog(true)}
            className="text-red-500 cursor-pointer hover:bg-red-600 hover:text-white"
          >
            <Trash className="text-red-700" /> Delete
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
                  <Loader className="animate-spin " /> Deleting...{" "}
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ViewMemberBySuperAdmin
        open={openViewMember}
        setOpen={setOpenViewMember}
        memberID={memberID}
      />
    </>
  );
};

export default SuperAdminAction;
