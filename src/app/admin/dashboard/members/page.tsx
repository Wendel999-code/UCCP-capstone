"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";
import { GetAllMembers } from "@/lib/supabase/supabaseServer/member";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MembersTable from "./components/MembersTable";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  category: string;
  hasChildren: boolean;
  gender: string;
  activeStatus: string;
  created_at: string;
}

const MembersPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);

  const [fetchingMembers, setFetchingMembers] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      if (user?.id) {
        const res = await GetAllMembers(user.id);
        if (!res?.success)
          toast.error(res?.message || "Failed to fetch members");

        setMembers(res?.data);
        setFetchingMembers(false);
      }
    };

    if (!loading) {
      if (!user) {
        redirect("/");
      } else if (user.role !== "admin") {
        router.push("/member/dashboard");
      } else {
        fetchMembers();
      }
    }
  }, [user, loading, router]);

  if (loading || fetchingMembers) return <TableSkeleton />;

  return (
    <>
      <MembersTable members={members} />
    </>
  );
};

export default MembersPage;
