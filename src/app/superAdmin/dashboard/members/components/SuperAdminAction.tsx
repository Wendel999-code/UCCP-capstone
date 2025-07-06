"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetMemberByIDBySuperAdmin } from "@/lib/supabase/actions/member";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ViewMemberBySuperAdmin } from "./ViewMemberBySuperAdmin";

const SuperAdminAction = ({ memberID }: { memberID: string }) => {
  const [openViewMember, setOpenViewMember] = useState(false);
  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["member-details-super-admin", memberID],
      queryFn: async () => {
        const res = await GetMemberByIDBySuperAdmin(memberID);
        if (!res.success) throw new Error(res.message);
        return res.data;
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-sky-500 "
            onClick={() => setOpenViewMember(true)}
            onMouseEnter={handlePrefetch}
          >
            <Eye className="text-sky-500" /> View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewMemberBySuperAdmin
        open={openViewMember}
        setOpen={setOpenViewMember}
        memberID={memberID}
      />
    </>
  );
};

export default SuperAdminAction;
