"use client";

import { useGetAllChurches } from "@/app/hooks/useChurch";
import { useMemberDetails, useUpdateMember } from "@/app/hooks/useMember";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const { data: churches, isLoading } = useGetAllChurches();

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        activeStatus: member.activeStatus || "",
        church_id: member.church_id || "",
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

  const handleSelectChange = (name: string, value: string) => {
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4"
          >
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                First Name
              </Label>
              <Input
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Last Name
              </Label>
              <Input
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Age
              </Label>
              <Input
                type="number"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Date of Birth
              </Label>
              <Input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500">
                Gender
              </Label>
              <Select
                value={formData.gender || ""}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Category
              </Label>
              <Select
                value={formData.category ?? ""}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CHILDREN">CHILDREN</SelectItem>
                  <SelectItem value="CYF">CYF</SelectItem>
                  <SelectItem value="CYAF">CYAF</SelectItem>
                  <SelectItem value="UCM">UCM</SelectItem>
                  <SelectItem value="CWA">CWA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500">
                Member Status
              </Label>
              <Select
                value={formData.activeStatus || ""}
                onValueChange={(value) =>
                  handleSelectChange("activeStatus", value)
                }
              >
                <SelectTrigger
                  className={cn(
                    "w-full text-xs px-3 py-1",
                    formData.activeStatus === "active"
                      ? "text-green-600 border-green-600 font-bold"
                      : "text-red-600 border-red-600 font-bold"
                  )}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="not active">Not Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Marital Status
              </Label>

              <Select
                value={formData.marital_status ?? ""}
                onValueChange={(value) =>
                  handleSelectChange("marital_status", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Marital Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                  <SelectItem value="Separated">Separated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500">
                Local Church
              </Label>
              <Select
                value={formData.church_id || ""}
                onValueChange={(value) =>
                  handleSelectChange("church_id", value)
                }
              >
                <SelectTrigger className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  <SelectValue placeholder="Select your church" />
                </SelectTrigger>
                <SelectContent className="z-50 max-h-64 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-2 text-sm text-gray-500">
                      Loading churches...
                    </div>
                  ) : churches && churches.length > 0 ? (
                    churches
                      .slice()
                      .sort((a, b) => a.brgy.localeCompare(b.brgy))
                      .map((church) => (
                        <SelectItem key={church.id} value={church.id}>
                          {church.brgy}
                        </SelectItem>
                      ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      No churches found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Baptism Status
              </Label>
              <Input
                name="baptism_status"
                value={formData.baptism_status ?? ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Date of Baptism
              </Label>
              <Input
                type="date"
                name="baptism_date"
                value={formData.baptism_date || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Officiant
              </Label>
              <Input
                name="officiant"
                value={formData.officiant ?? ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Email Address
              </Label>
              <Input
                name="member_email"
                value={formData.member_email ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-1 text-[12px] text-gray-800 dark:text-gray-500 ">
                Address
              </Label>
              <Input
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="sm:col-span-2 mt-2 cursor-pointer text-white hover:bg-amber-600 bg-amber-700"
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
