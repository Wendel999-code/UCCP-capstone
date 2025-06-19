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
import { ApproveMembership } from "@/lib/supabase/actions/member";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

const ApplicationAction = ({ memberID }: { memberID: string }) => {
  const [loading, setLoading] = React.useState(false);

  const handleApproveMember = async () => {
    try {
      setLoading(true);
      const res = await ApproveMembership(memberID);

      if (!res.success) {
        toast.error(res.message || "Failed to approve member.");
        return;
      }
      toast.success("Member approved successfully!");
    } catch (error) {
      console.error("Error approving member:", error);
      toast.error("Failed to approve member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async () => {
    toast.info("Delete member logic not implemented yet.");
    // TODO: Add delete logic here
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

        <ApplicationDetailsModal memberID={memberID} />

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
                onClick={handleApproveMember}
              >
                {loading ? "Approving..." : "Confirm"}
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
                Delete member
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete this member. This cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteMember}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationAction;
