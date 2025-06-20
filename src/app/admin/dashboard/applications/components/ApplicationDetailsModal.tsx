"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/app/lib/utils";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useApplicationDetails } from "@/app/hooks/useMember";
import { useQueryClient } from "@tanstack/react-query";
import { GetApplicationID } from "@/lib/supabase/actions/member";

export default function ApplicationDetailsModal({
  memberID,
  onApprove,
  loading,
}: {
  memberID: string;
  onApprove: () => void;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);

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

  const { data: member, isLoading: isFetching } = useApplicationDetails(
    memberID,
    open
  );

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
            Cana Circuit Application
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
            {loading ? (
              <Skeleton className="h-9 mt-1 rounded-md" />
            ) : (
              <Input readOnly value={member?.address ?? ""} />
            )}
          </div>

          <div>
            <Label className="text-xs text-gray-600">Status</Label>
            <div className="mt-1">
              {loading ? (
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
            label="Has Children"
            value={member?.hasChildren ?? "" ? "Yes" : "No"}
          />

          <div className="sm:col-span-2">
            <RenderField label="Circuit" value={member?.Church?.brgy ?? ""} />
          </div>
        </div>
        <Button
          onClick={onApprove}
          disabled={loading}
          className="w-full text-medium text-black cursor-pointer hover:bg-amber-700"
        >
          {loading ? (
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
