"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Loader, MoreHorizontal } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import { useApproveMember, useDeleteMember } from "@/app/hooks/useMember";

const ApplicationAction = ({ memberID }: { memberID: string }) => {
  const { mutate: approveMember, isPending } = useApproveMember();

  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();

  const handleApprove = () => {
    approveMember(memberID, {
      onSuccess: () => toast.success("Member approved!"),
      onError: (error) => toast.error(error.message),
    });
  };

  const handleDeleteApplication = async () => {
    deleteMember(memberID, {
      onSuccess: () => toast.success("Application deleted successfully"),
      onError: (error) => toast.error(error.message),
    });
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
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ApplicationDetailsModal
          memberID={memberID}
          onApprove={handleApprove}
          loading={isPending}
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              {" "}
              <Button
                variant={"outline"}
                className="text-green-600 cursor-pointer border-none"
              >
                Approve member
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve this member?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                This will mark the application as approved and grant access to
                the member.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-black font-medium"
                onClick={handleApprove}
              >
                {isPending ? "Approving..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenuSeparator />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              {" "}
              <Button
                variant={"outline"}
                className="text-red-600 border-none cursor-pointer"
              >
                Delete application
              </Button>
            </div>
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
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isDeleting}
                onClick={handleDeleteApplication}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationAction;
