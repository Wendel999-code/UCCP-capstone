"use client";

import { useSidebarData } from "@/app/hooks/useSideBar";
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
import { addMemberAction } from "@/lib/supabase/actions/member";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

interface AddMemberModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AddMemberModal = ({ open, setOpen }: AddMemberModalProps) => {
  const { data, isLoading } = useSidebarData();

  const [state, formAction, pending] = useActionState(addMemberAction, {
    success: false,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success) {
      toast.success("Member added successfully!");
      queryClient.invalidateQueries({ queryKey: ["membersByChurchId"] });
      queryClient.invalidateQueries({ queryKey: ["membersBySuperAdmin"] });
      setOpen(false);
    } else if (state?.errors) {
      toast.error("Saving member error please try again.");
      console.log(state.errors);
    }
  }, [state, setOpen, queryClient]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full bg-amber-50 dark:bg-zinc-900 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-red-900 dark:text-amber-400 text-2xl font-bold text-center">
            Add new Member
          </DialogTitle>
        </DialogHeader>

        <form
          action={formAction}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
        >
          <InputBlock
            name="firstName"
            label="First Name"
            error={state?.errors?.firstName}
          />
          <InputBlock
            name="lastName"
            label="Last Name"
            error={state?.errors?.lastName}
          />

          <InputBlock
            name="date_of_birth"
            label="Date of Birth"
            type="date"
            error={state?.errors?.date_of_birth}
          />

          <InputBlock
            name="age"
            label="Age"
            type="number"
            error={state?.errors?.age}
          />

          <div>
            <Label htmlFor="gender" className="text-xs text-gray-600">
              Gender
            </Label>
            <Select name="gender">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.category.join(", ")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="marital_status" className="text-xs text-gray-600">
              Marital Status
            </Label>
            <Select name="marital_status">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select  marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
                <SelectItem value="Separated">Separated</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.marital_status && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.marital_status.join(", ")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="category" className="text-xs text-gray-600">
              Category
            </Label>
            <Select name="category">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CHILDREN">CHILDREN</SelectItem>
                <SelectItem value="CYAF">CYAF</SelectItem>
                <SelectItem value="CYF">CYF</SelectItem>
                <SelectItem value="CWA">CWA</SelectItem>
                <SelectItem value="UCM">UCM</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.category.join(", ")}
              </p>
            )}
          </div>
          <InputBlock
            name="member_email"
            label="Email Address"
            type="email"
            error={state?.errors?.member_email}
          />

          <InputBlock
            name="address"
            label="Address"
            error={state?.errors?.address}
            className="sm:col-span-2"
          />

          <div>
            <Label className="text-xs text-gray-600">Local Church</Label>
            {isLoading ? (
              <Skeleton className="h-9 mt-1 rounded-md" />
            ) : (
              <Input
                name="circuit"
                value={data?.church?.brgy ?? ""}
                className="mt-1 text-amber-500"
                readOnly
              />
            )}
          </div>

          <input
            type="hidden"
            name="church_id"
            value={data?.church?.id ?? ""}
          />

          <InputBlock
            name="baptismDate"
            label="Baptism Date"
            type="date"
            error={state?.errors?.baptismDate}
          />
          <InputBlock
            name="officiant"
            label="Officiant"
            error={state?.errors?.officiant}
          />

          <Button
            type="submit"
            disabled={pending}
            className="sm:col-span-2 cursor-pointer mt-2 bg-amber-600 text-white hover:bg-amber-700"
          >
            {pending ? (
              <>
                <Loader className="animate-spin" /> Adding Member
              </>
            ) : (
              "Add Member"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;

function InputBlock({
  name,
  label,
  type = "text",
  error,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-xs text-gray-600">
        {label}
      </Label>
      <Input name={name} type={type} className="mt-1" />
      {error && <p className="text-red-500 text-xs mt-1">{error.join(", ")}</p>}
    </div>
  );
}
