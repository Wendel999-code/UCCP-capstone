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
import { Loader2 } from "lucide-react";
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

  const handleApprove = () => {
    if (!memberID || !acceptanceDate || !officiant) {
      toast.error("All fields is required");
      return;
    }

    approveMember(
      { memberID, acceptanceDate, officiant },
      {
        onSuccess: () => toast.success("Member approved!"),
        onError: (error) => toast.error(error.message),
      }
    );
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
        <Input readOnly value={String(value) ?? ""} />
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onMouseEnter={handlePrefetch}
          variant="outline"
          className="text-amber-500 border-none w-full text-left cursor-pointer"
        >
          View applications
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
            label="Have Children"
            value={member?.hasChildren ? "Yes" : "No"}
          />

          <div className="sm:col-span-2">
            <RenderField label="Circuit" value={member?.Church?.brgy ?? ""} />
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
          className="w-full mt-4 text-medium text-black cursor-pointer hover:bg-amber-700"
        >
          {isPending ? (
            <span className="flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Approving...
            </span>
          ) : (
            "Approve application"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
