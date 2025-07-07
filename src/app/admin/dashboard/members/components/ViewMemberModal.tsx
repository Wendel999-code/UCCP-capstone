"use client";

import { useMemberDetails } from "@/app/hooks/useMember";
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

export function ViewMemberModal({
  open,
  setOpen,
  memberID,
}: ViewMemberModalProps) {
  const { data: member, isLoading: isFetching } = useMemberDetails(
    memberID,
    open
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full bg-amber-50 dark:bg-zinc-900 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-red-900 dark:text-amber-400 text-2xl font-bold text-center">
            Member Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {isFetching ? (
            <>
              <Skeleton className="h-9" />
              <Skeleton className="h-9" />
              <Skeleton className="h-9" />
              <Skeleton className="h-9" />
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
                    ? format(new Date(member.date_of_birth), "MMMM/d/yyyy")
                    : "N/A"
                }
              />
              <RenderField label="Gender" value={member.gender} />
              <RenderField label="Category" value={member.category} />

              <div>
                <Label className="text-xs text-gray-600">Member Status</Label>
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-3 py-1",
                      member.activeStatus === "active"
                        ? "text-green-600 border-green-600"
                        : "text-red-600 border-red-600"
                    )}
                  >
                    {member.activeStatus}
                  </Badge>
                </div>
              </div>
              <RenderField
                label="Marital Status"
                value={member.marital_status ?? "Single"}
              />
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
                    ? format(new Date(member.baptism_date), "MMMM/d/yyyy")
                    : "N/A"
                }
              />

              <RenderField
                label="Officiant"
                value={member.officiant ?? "N/A"}
              />
              <RenderField
                label="Email Address"
                value={member.member_email ?? "N/A"}
              />

              <div className="sm:col-span-2">
                <Label className="text-xs text-gray-600">Address</Label>
                <Input
                  readOnly
                  className="mt-1"
                  value={member.address ?? "N/A"}
                />
              </div>
            </>
          ) : (
            <p className="col-span-2 text-center text-sm text-gray-500">
              Member not found.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
