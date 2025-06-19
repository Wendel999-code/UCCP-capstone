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
import React, { useEffect, useState } from "react";
import { GetApplicationID } from "@/lib/supabase/actions/member";

type MemberDetails = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  category: string;
  address: string;
  activeStatus: string;
  hasChildren: boolean;
  Church: {
    brgy: string;
  };
};

export default function ApplicationDetailsModal({
  memberID,
}: {
  memberID: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<MemberDetails | null>(null);

  useEffect(() => {
    if (!open) return;

    const fetchMember = async () => {
      setLoading(true);
      const res = await GetApplicationID(memberID);
      if (res?.success) {
        setMember(res.data);
      }
      setLoading(false);
    };

    fetchMember();
  }, [open, memberID]);

  const RenderField = ({
    label,
    value,
  }: {
    label: string;
    value?: string | number;
  }) => (
    <div>
      <Label className="text-xs text-gray-600">{label}</Label>
      {loading ? (
        <Skeleton className="h-9 mt-1 rounded-md" />
      ) : (
        <Input readOnly value={String(value)} />
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-yellow-900 border-none w-full text-left"
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
          <RenderField label="First Name" value={member?.firstName} />
          <RenderField label="Last Name" value={member?.lastName} />
          <RenderField label="Age" value={member?.age} />
          <RenderField label="Gender" value={member?.gender} />
          <RenderField label="Category" value={member?.category} />

          <div className="sm:col-span-2">
            <Label className="text-xs text-gray-600">Address</Label>
            {loading ? (
              <Skeleton className="h-9 mt-1 rounded-md" />
            ) : (
              <Input readOnly value={member?.address} />
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
                  {member?.activeStatus}
                </Badge>
              )}
            </div>
          </div>

          <RenderField
            label="Has Children"
            value={member?.hasChildren ? "Yes" : "No"}
          />

          <div className="sm:col-span-2">
            <RenderField label="Circuit" value={member?.Church?.brgy} />
          </div>
        </div>
        <Button className="w-full text-medium text-black cursor-pointer hover:bg-amber-700">
          Approve application
        </Button>
      </DialogContent>
    </Dialog>
  );
}
