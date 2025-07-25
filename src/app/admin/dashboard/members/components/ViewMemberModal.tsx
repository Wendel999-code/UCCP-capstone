"use client";

import { useMemberDetails } from "@/app/hooks/useMember";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { SendMemberID } from "@/lib/utils/resend";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

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

  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleOpenSendEmail = (email: string) => {
    setIsSending(true);
    setEmail(email);
    setOpen(false);
  };

  const handleSendMemberID = async () => {
    setLoading(true);
    try {
      const res = await SendMemberID({ email, memberID });

      if (!res.success) {
        toast.error(res.message);
      }
      toast.success(res.message);

      setIsSending(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send member ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
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

                <div className="sm:col-span-2">
                  <Label className="text-xs text-gray-600">Address</Label>
                  <Input
                    readOnly
                    className="mt-1"
                    value={member.address ?? "N/A"}
                  />
                </div>
                <RenderField
                  label="Email Address"
                  value={member.member_email ?? "N/A"}
                />

                <div className="mt-5 w-full">
                  <Button
                    onClick={() => handleOpenSendEmail(member.member_email)}
                    className="w-full cursor-pointer hover:bg-yellow-700 text-black"
                  >
                    Send Member ID
                  </Button>
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
      <Dialog open={isSending} onOpenChange={setIsSending}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-900 dark:text-amber-400 text-2xl font-bold text-center">
              Retrieve Member ID
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex flex-col">
            <Label className="text-xs text-gray-600">Email Address</Label>
            <Input
              type="email"
              required
              className="mt-1"
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label className="text-xs text-gray-600 mt-3">Member ID</Label>
            <Input readOnly className="mt-1" value={memberID} />
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              onClick={handleSendMemberID}
              disabled={loading}
              className="w-full mt-5 bg-sky-700 cursor-pointer transition-all text-white hover:bg-sky-600"
            >
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Send Member ID"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
