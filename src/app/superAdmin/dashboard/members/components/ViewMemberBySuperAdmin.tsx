"use client";

import { useMemberDetailsBySuperAdmin } from "@/app/hooks/useMember";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface ViewMemberModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  memberID: string;
}

const RenderField = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div>
    <Label className="text-xs text-gray-600">{label}</Label>
    <Input readOnly className="mt-1" value={value} />
  </div>
);

export function ViewMemberBySuperAdmin({
  open,
  setOpen,
  memberID,
}: ViewMemberModalProps) {
  const { data: member, isLoading: isFetching } = useMemberDetailsBySuperAdmin(
    memberID,
    open
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg w-full rounded-2xl border border-gray-200 dark:border-gray-800
    shadow-xl bg-gradient-to-b from-white to-amber-50 
    dark:from-gray-950 dark:to-gray-900"
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-amber-900 dark:text-amber-400">
            Member Details
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {isFetching ? (
            <>
              <Skeleton className="h-10 rounded-md bg-amber-100 dark:bg-amber-800/40" />
              <Skeleton className="h-10 rounded-md bg-amber-100 dark:bg-amber-800/40" />
              <Skeleton className="h-10 rounded-md bg-amber-100 dark:bg-amber-800/40" />
              <Skeleton className="h-10 rounded-md bg-amber-100 dark:bg-amber-800/40" />
            </>
          ) : member ? (
            <>
              <RenderField label="First Name" value={member.firstName} />
              <RenderField label="Last Name" value={member.lastName} />
              <RenderField label="Age" value={member.age} />
              <RenderField
                label="Date of Birth"
                value={
                  member.date_of_birth
                    ? format(new Date(member.date_of_birth), "MMMM d, yyyy")
                    : "N/A"
                }
              />
              <RenderField label="Gender" value={member.gender} />
              <RenderField label="Category" value={member.category} />

              {/* Address */}
              <div className="sm:col-span-2">
                <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Address
                </Label>
                <Input
                  readOnly
                  className="mt-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
                  value={member.address}
                />
              </div>

              {/* Status */}
              <div>
                <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Status
                </Label>
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-3 py-1 rounded-full border font-semibold",
                      member.activeStatus === "active"
                        ? "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400"
                        : "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400"
                    )}
                  >
                    {member.activeStatus}
                  </Badge>
                </div>
              </div>

              {/* Church Info */}
              <RenderField
                label="Local Church"
                value={member.Church?.brgy ?? "N/A"}
              />
              <RenderField
                label="Baptism Status"
                value={member.baptism_status ?? "Not Baptized"}
              />
              <RenderField
                label="Date of Baptism"
                value={
                  member.baptism_date
                    ? format(new Date(member.baptism_date), "MMMM d, yyyy")
                    : "N/A"
                }
              />
              <RenderField
                label="Officiant"
                value={member.officiant ?? "N/A"}
              />
            </>
          ) : (
            <p className="col-span-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Member not found.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
