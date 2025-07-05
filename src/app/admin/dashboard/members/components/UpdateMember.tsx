"use client";

import { useMemberDetails, useUpdateMember } from "@/app/hooks/useMember";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface EditMemberModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  memberID: string;
}

export function UpdateMember({
  open,
  setOpen,
  memberID,
}: EditMemberModalProps) {
  const { data: member, isLoading: isFetching } = useMemberDetails(
    memberID,
    open
  );
  const { mutate: updateMember, isPending } = useUpdateMember();

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        date_of_birth: member.date_of_birth
          ? member.date_of_birth.split("T")[0]
          : "",
        baptism_date: member.baptism_date
          ? member.baptism_date.split("T")[0]
          : "",
      });
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMember(
      { memberID, updatedData: formData },
      {
        onSuccess: () => {
          toast.success("Member updated successfully.");
          setOpen(false);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to update member.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full bg-amber-50 dark:bg-zinc-900 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-red-900 dark:text-amber-400 text-2xl font-bold text-center">
            Update Member Details
          </DialogTitle>
        </DialogHeader>

        {isFetching || !formData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
          >
            <div>
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Input
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Address</Label>
              <Input
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Member Status</Label>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs px-3 py-1",
                    formData.activeStatus === "active"
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                  )}
                >
                  {formData.activeStatus}
                </Badge>
              </div>
            </div>
            <div>
              <Label>Marital Status</Label>
              <Input
                name="marital_status"
                value={formData.marital_status ?? "N/A"}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Local Church</Label>
              <Input value={formData.Church?.brgy ?? "N/A"} disabled />
            </div>
            <div>
              <Label>Baptism Status</Label>
              <Input
                name="baptism_status"
                value={formData.baptism_status ?? ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Date of Baptism</Label>
              <Input
                type="date"
                name="baptism_date"
                value={formData.baptism_date || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Officiant</Label>
              <Input
                name="officiant"
                value={formData.officiant ?? ""}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="sm:col-span-2 mt-2 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Member"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
