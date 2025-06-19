"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MembersTable from "./components/MembersTable";
import { GetAllMembersByChurchId } from "@/lib/supabase/actions/member";

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
    if (loading) return;

    if (!user) {
      redirect("/");
    }

    if (user.role !== "church_admin") {
      router.push("/member/dashboard");
      return;
    }

    const fetchMembers = async () => {
      const res = await GetAllMembersByChurchId();
      if (!res?.success) {
        toast.error(res?.message || "Failed to fetch members");
        setFetchingMembers(false);
        return;
      }
      setMembers(res.data);
      setFetchingMembers(false);
    };

    fetchMembers();
  }, [user, loading, router]);

  if (loading || fetchingMembers) return <TableSkeleton />;

  return <MembersTable members={members} />;
};

export default MembersPage;
