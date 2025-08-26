"use client";

import { useApplicationDetails, useApproveMember } from "@/app/hooks/useMember";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { GetApplicationID } from "@/lib/supabase/actions/member";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ApplicationDetailsModal({
  memberID,
}: {
  memberID: string;
}) {
  const [open, setOpen] = useState(false);

  const [acceptanceDate, setAcceptanceDate] = useState("");
  const [officiant, setOfficiant] = useState("");

  const { data: member, isLoading: isFetching } = useApplicationDetails(
    memberID,
    open
  );

  const { mutate: approveMember, isPending } = useApproveMember();

  const handleApprove = async () => {
    if (!memberID || !acceptanceDate || !officiant) {
      toast.error("All fields are required");
      return;
    }

    try {
      approveMember({ memberID, acceptanceDate, officiant });
      toast.success("Member approved!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong during approval");
    }
  };

  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["application-details", memberID],
      queryFn: async () => {
        const res = await GetApplicationID(memberID);
        if (!res.success) throw new Error(res.message);
        return res.data;
      },
    });
  };

  const RenderField = ({
    label,
    value,
  }: {
    label: string;
    value?: string | number;
  }) => (
    <div>
      <Label className="text-xs text-gray-600">{label}</Label>
      {isFetching ? (
        <Skeleton className="h-9 mt-1 rounded-md" />
      ) : (
        <Input className="text-pretty" readOnly value={String(value) ?? ""} />
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onMouseEnter={handlePrefetch}
          className="cursor-pointer w-full bg-sky-900 hover:bg-sky-500 text-white"
          size={"sm"}
        >
          <Eye className="text-white mr-2" /> View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full bg-amber-50 dark:bg-zinc-900 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-red-900 dark:text-amber-400 text-2xl font-bold text-center">
            Cana Circuit Applicant
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <RenderField label="First Name" value={member?.firstName ?? ""} />
          <RenderField label="Last Name" value={member?.lastName ?? ""} />
          <RenderField label="Age" value={member?.age ?? ""} />
          <RenderField label="Gender" value={member?.gender ?? ""} />
          <RenderField label="Category" value={member?.category ?? ""} />
          <RenderField
            label="Email Address"
            value={member?.member_email ?? ""}
          />

          <div className="sm:col-span-2">
            <Label className="text-xs text-gray-600">Address</Label>
            {isFetching ? (
              <Skeleton className="h-9 mt-1 rounded-md" />
            ) : (
              <Input readOnly value={member?.address ?? ""} />
            )}
          </div>

          <div>
            <Label className="text-xs text-gray-600">Status</Label>
            <div className="mt-1">
              {isFetching ? (
                <Skeleton className="h-9 rounded-md" />
              ) : (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs px-3 py-1",
                    member?.activeStatus === "active"
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                  )}
                >
                  {member?.activeStatus ?? ""}
                </Badge>
              )}
            </div>
          </div>

          <RenderField
            label="Marital Status"
            value={member?.marital_status ?? "Single"}
          />

          <div className="sm:col-span-2">
            <RenderField
              label="Local Church"
              value={member?.Church?.brgy ?? ""}
            />
          </div>

          {/* Acceptance Date (Required) */}
          <div className="sm:col-span-2">
            <Label className="text-xs text-gray-600">
              Date of Acceptance <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={acceptanceDate}
              onChange={(e) => setAcceptanceDate(e.target.value)}
            />
          </div>

          {/* Officiant (Required) */}
          <div className="sm:col-span-2">
            <Label className="text-xs text-gray-600">
              Officiant <span className="text-red-500">*</span>
            </Label>
            <Input
              value={officiant}
              onChange={(e) => setOfficiant(e.target.value)}
            />
          </div>
        </div>

        {/* Approve Button */}

        <Button
          onClick={handleApprove}
          disabled={isPending}
          className="h-11 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500  hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl 
            shadow-md hover:shadow-lg transition-all duration-300"
        >
          {isPending ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            "Approve Membership"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
